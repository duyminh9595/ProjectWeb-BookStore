using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ProjectBookShop.Entities;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectBookShop
{
    public class ApplicationDbContext : IdentityDbContext

    {
        public ApplicationDbContext([NotNullAttribute] DbContextOptions options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<DetailCart>().HasKey(x => new { x.BookId, x.CartId });
            base.OnModelCreating(builder);
        }
        public DbSet<Book> Book { get; set; }
        public DbSet<BookImage> BookImage { get; set; }
        public DbSet<Cart> Cart { get; set; }
        public DbSet<CommendOnBook> CommendOnBook { get; set; }
        public DbSet<UserInfo> Customer { get; set; }
        public DbSet<DetailCart> DetailCart { get; set; }
        public DbSet<Publisher> Publisher { get; set; }
        public DbSet<Entities.Type> Type { get; set; }
        public DbSet<UserRole> UserRole { get; set; }
        public DbSet<CouponDiscount> CouponDiscount { get; set; }
    }
}
