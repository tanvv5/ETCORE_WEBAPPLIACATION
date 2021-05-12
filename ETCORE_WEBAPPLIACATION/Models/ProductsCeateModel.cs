using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ETCORE_WEBAPPLIACATION.Models
{
    public class ProductsCeateModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ProId { get; set; }
        [Required]
        public string ProName { get; set; }
        [Required]
        public string ProCategory { get; set; }
        [Required]
        [RegularExpression(@"^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$")]
        public string Unit { get; set; }
        [Required]
        [Range(0, 100000)]
        public int? StockQuatity { get; set; }
        public List<IFormFile> image { get; set; }
    }
}
