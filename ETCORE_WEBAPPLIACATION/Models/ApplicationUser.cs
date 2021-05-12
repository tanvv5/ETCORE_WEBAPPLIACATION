using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETCORE_WEBAPPLIACATION.Models
{
    public class ApplicationUser :IdentityUser
    {
        public string Avartar { get; set; }
        public string Depathment { get; set; }
    }
}
