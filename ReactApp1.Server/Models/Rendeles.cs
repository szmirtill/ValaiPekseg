using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyApp.Models
{
    public class Rendeles
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int vevo_id { get; set; }

        [Required]
        public DateTime rendeles_datum { get; set; } = DateTime.Now;

        [Required]
        public string allapot { get; set; } = "Függőben";

        public List<RendelesTetel> Termekek { get; set; } = new List<RendelesTetel>();

        public string Keresztnev { get; set; }
        public string Vezeteknev { get; set; }
        public string SzallitasiMod { get; set; } 
        public string? Iranyitoszam { get; set; }
        public string? Varos { get; set; }
        public string? Utca { get; set; }
        public string? Hazszam { get; set; }


    }
}
