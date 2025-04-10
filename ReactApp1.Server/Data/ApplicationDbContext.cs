using Microsoft.EntityFrameworkCore;
using MyApp.Models;

namespace MyApp.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        public DbSet<vevo> vevo { get; set; }
        public DbSet<Termek> Termekek { get; set; }
        public DbSet<Rendeles> rendelesek { get; set; }
        public object Rendelesek { get; internal set; }
        public DbSet<RendelesTetel> rendeles_tetelek { get; set; }
        public DbSet<Kategoria> Kategoriak { get; set; } 
        public DbSet<Admin> adminok { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<vevo>()
                .HasIndex(u => u.email)
                .IsUnique(); 

            modelBuilder.Entity<Rendeles>()
                .HasMany(r => r.Termekek)
                .WithOne(t => t.Rendeles)
                .HasForeignKey(t => t.rendeles_id);

            modelBuilder.Entity<Kategoria>()
                .HasMany(k => k.Termekek)
                .WithOne(t => t.Kategoria)
                .HasForeignKey(t => t.kategoria_id);
        }
    }
}
