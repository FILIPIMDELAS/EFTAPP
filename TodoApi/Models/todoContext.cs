﻿using Microsoft.EntityFrameworkCore;


namespace TodoApi.Models
{
    public class TodoContext : DbContext
    {

        public TodoContext(DbContextOptions<TodoContext> options) : base(options) => Database.EnsureCreated();

        public DbSet<Usuarios> usuarios { get; set; } = null!;
    }
}
