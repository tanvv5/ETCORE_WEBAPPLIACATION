using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETCORE_WEBAPPLIACATION.Areas.admin.Controllers
{
    public class DashboardController : Controller
    {
        [Area("admin")]
        [Authorize(Roles = "Admin,SupperAdmin")]
        [Route("admin/dashboard")]
        public IActionResult Index()
        {
            return View();
        }
    }
}
