using Application.Accounts.Users;
using Application.Core;
using AutoMapper;
using Domain.Contracts;
using Domain.Entities;
using Domain.Enums;
using FluentValidation;
using MediatR;

namespace Application.Accounts.Register
{
    public class Register
    {
        public record RegisterCommand(RegisterDto Register) : IRequest<Result<UserDto>>;

        public class CommandValidator : AbstractValidator<RegisterCommand>
        {
            private readonly IUserRepository _userRepository;
            public CommandValidator(IUserRepository userRepository)
            {
                _userRepository = userRepository;
                RuleFor(x => x.Register)
                    .SetValidator(new RegisterValidator(_userRepository));
            }

        }

        public class RegisterCommandHandler(IUserRepository _userRepository, ITokenRepository _tokenRepository, IMapper _mapper)
            : IRequestHandler<RegisterCommand, Result<UserDto>>
        {
            public async Task<Result<UserDto>> Handle(RegisterCommand request, CancellationToken cancellationToken)
            {
                if (request.Register is null) return Result<UserDto>.Failure(ErrorType.BadRequest, "Problem while registering the user!");

                var user = new AppUser
                {
                    Email = request.Register.Email,
                    Name = request.Register.Name,
                    LastName = request.Register.LastName,
                    UserName = request.Register.UserName,
                };
                user.CreatedAt = DateTime.Now;
                user.UpdatedAt = DateTime.Now;

                if (Enum.TryParse(request.Register.Role, true, out UserRole roleEnum))
                {
                    user.Role = roleEnum;
                }
                else
                {
                    return Result<UserDto>.Failure(ErrorType.BadRequest, "Invalid role specified.");
                }

                var result = await _userRepository.CreateUserAsync(user, request.Register.Password);
                if (!result) return Result<UserDto>.Failure(ErrorType.BadRequest, "Failed to create the user! Try again.");

                var addToRole = await _userRepository.AddToRoleAsync(user, roleEnum.ToString());

                if (!addToRole) return Result<UserDto>.Failure(ErrorType.BadRequest, $"Failed to assign the user to the {roleEnum} role.");

                var userDto = _mapper.Map<UserDto>(user);
                userDto.Token = await _tokenRepository.CreateToken(user);

                return Result<UserDto>.Success(userDto);
            }
        }
    }
}
