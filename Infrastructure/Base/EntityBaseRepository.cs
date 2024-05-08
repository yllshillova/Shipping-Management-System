﻿using Infrastructure;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using Domain.Base;

internal abstract class EntityBaseRepository<T>(DataContext _context) : IEntityBaseRepository<T> where T : class, new()
{
    public async Task<IEnumerable<T>> GetAllAsync()
    {
        var entities = await _context.Set<T>().AsNoTracking().ToListAsync();
        return entities;
    }
    public async Task<IEnumerable<T>> GetAllAsync(params Expression<Func<T, object>>[] includeProperties)
    {
        IQueryable<T> query = _context.Set<T>();
        query = includeProperties.Aggregate(query, (current, includeProperty) => current.Include(includeProperty));
        var entities = await query.AsNoTracking().ToListAsync();
        return entities;
    }
    public async Task<T> GetByIdAsync(Guid id)
    {
        var entity = await _context.Set<T>().FindAsync(id);
        return entity;
    }
    public async Task<bool> CreateAsync(T entity)
    {
        await _context.Set<T>().AddAsync(entity);
        var result = await _context.SaveChangesAsync() > 0;
        return result;
    }
    public async Task<bool> UpdateAsync(T entity)
    {
        EntityEntry entityEntry = _context.Entry(entity);
        entityEntry.State = EntityState.Modified;
        var result = await _context.SaveChangesAsync() > 0;
        return result;
    }
    public async Task<bool> DeleteAsync(T entity)
    {
        _context.Remove(entity);
        var result = await _context.SaveChangesAsync() > 0;
        return result;
    }
}