using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ETCORE_WEBAPPLIACATION.Models
{
    public class ProductsViewModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ProId { get; set; }
        [Required]
        public string ProName { get; set; }
        [Required]
        public int ProCategory { get; set; }
        [Required]
        public string Unit { get; set; }
        [Required]
        [Range(0, 100000)]
        public int StockQuatity { get; set; }
        [Required]
        public double Price { get; set; }
        [Required]
        public string Status { get; set; }
        public string Description { get; set; }
        public List<Photo> Photos { get; set; }
    }
}
