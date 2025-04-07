using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyApp.Models
{
    public class Termek
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Nev { get; set; } = string.Empty;

        [Required]
        public decimal Ar { get; set; } = 0;

        [Required]
        public int kategoria_id { get; set; }

        [ForeignKey("kategoria_id")]
        public Kategoria? Kategoria { get; set; }

        // 🔹 ÚJ: képet tároló mező (BLOB)
        public byte[]? Kep { get; set; }
    }
}
