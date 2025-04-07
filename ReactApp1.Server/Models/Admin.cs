using System.ComponentModel.DataAnnotations;

namespace MyApp.Models
{
    public class Admin
    {
        [Key]
        public int id { get; set; }

        [Required]
        public string felhasznalonev { get; set; } = string.Empty;

        [Required]
        public string jelszo { get; set; } = string.Empty;
    }
}
