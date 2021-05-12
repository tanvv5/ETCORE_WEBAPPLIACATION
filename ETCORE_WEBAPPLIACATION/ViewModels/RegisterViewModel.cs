using ETCORE_WEBAPPLIACATION.Models;
using ETCORE_WEBAPPLIACATION.Ultilities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ETCORE_WEBAPPLIACATION.ViewModels
{
    public class RegisterViewModel
    {
        [Required]
        [RegularExpression(@"^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$")]
        [EmailAddress]
        [Remote(action: "IsvalidEmail",controller:"Account")]
        //[ValidEmailDomain(alowdomain:"vantandomain",ErrorMessage = "Chỉ chấp nhận domain @vantandomain")]
        public string Email { get; set; }
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
        [Required]
        [DataType(DataType.Password)]
        [Display(Name ="Confirm Password")]
        [Compare("Password",ErrorMessage = "Password confirm and Password do not match")]
        public string ConfirmPassword { get; set; }
        public IFormFile image { get; set; }
    }
}
