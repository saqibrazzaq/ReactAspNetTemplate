﻿using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Entities
{
    [Table("State")]
    [Index(nameof(StateCode), IsUnique = true)]
    [Index(nameof(StateName), IsUnique = true)]
    public class State
    {
        [Key]
        public int StateId { get; set; }
        [Required]
        public string? StateCode { get; set; }
        [Required]
        public string? StateName { get; set; }

        // Foreign keys
        public int? CountryId { get; set; }
        [ForeignKey(nameof(CountryId))]
        public Country? Country { get; set; }
    }
}
