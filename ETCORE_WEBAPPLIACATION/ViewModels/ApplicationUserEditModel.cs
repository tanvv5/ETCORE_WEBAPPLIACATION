using ETCORE_WEBAPPLIACATION.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ETCORE_WEBAPPLIACATION.ViewModels
{
    public class ApplicationUserEditModel
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public string Avartar { get; set; }
        public string Depathment { get; set; }
        public IFormFile image { get; set; }
    }
}
