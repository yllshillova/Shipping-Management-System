import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { faWarehouse } from '@fortawesome/free-solid-svg-icons';
import User from '../models/user';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../storage/redux/store';
import { clearToken, emptyUserState, setLoggedInUser } from '../storage/redux/userAuthSlice';
import toastNotify from '../helpers/toastNotify';

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData: User = useSelector((state: RootState) => state.userAuthStore);

    // Handle navigation for login and register buttons
    const handleLoginClick = () => navigate('/login');
    const handleRegisterClick = () => navigate('/register');
    const handleLogout = () => {
        localStorage.removeItem('token');

        dispatch(setLoggedInUser({ ...emptyUserState }));
        dispatch(clearToken());
        navigate('/login');

        // Optionally, you can display a logout confirmation message using a toast notification
        toastNotify('Logged out successfully', 'success');
    }
    return (
        <StickyHeader>
            <HeaderContainer>
                <LogoContainer>
                    <Logo onClick={() => navigate('/')} >Warehouse</Logo>
                    <MenuIcon icon={faWarehouse} />
                </LogoContainer>

                {!userData.nameid ? (
                    <ButtonContainer>
                        <Button onClick={handleLoginClick}>Login</Button>
                        <Button onClick={handleRegisterClick}>Register</Button>
                    </ButtonContainer>
                ) : (
                    <MessageContainer>
                        {`${userData.unique_name}`} 
                        <UserImage>
                            <img
                                src="https://media.geeksforgeeks.org/wp-content/uploads/20221210180014/profile-removebg-preview.png"
                                alt="dp"
                            />
                        </UserImage>
                        {/* Logout button */}
                            <Button onClick={handleLogout}>Logout</Button>
                    </MessageContainer>
                )}
            </HeaderContainer>
        </StickyHeader>
    );
}

const StickyHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
`;

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #002147;
  color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  @media screen and (max-width: 768px) {
        padding: 10px;
    }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  color: white;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: white;
  cursor: pointer;
`;

const MenuIcon = styled(FontAwesomeIcon)`
  font-size: 20px;
  margin-left: 10px;
  cursor: pointer;
  color: #FF003F;
`;

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;
  cursor: pointer;
`;

const UserImage = styled.div`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  overflow: hidden;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 10px; /* Spacing between buttons */
`;

const Button = styled.button`
    padding: 10px 20px;
    margin-right: 10px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    background-color: #FF003F; /* Red color */
    color: white;
    font-weight: bold;
    &:hover {
        background-color: #cc002f; /* Darker red color on hover */
    }
`;

export default Header;