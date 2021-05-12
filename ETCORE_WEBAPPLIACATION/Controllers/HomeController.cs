using ETCORE_WEBAPPLIACATION.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ETCORE_WEBAPPLIACATION.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private IProductsRepository _productsRepository;
        [Obsolete]
        private readonly IHostingEnvironment _hostingEnvironment1;

        [Obsolete]
        public HomeController(ILogger<HomeController> logger, IProductsRepository productsRepository, IHostingEnvironment hostingEnvironment)
        {
            _logger = logger;
            _productsRepository = productsRepository;
            _hostingEnvironment1 = hostingEnvironment;
        }
        [AllowAnonymous]
        public ActionResult Index()
        {
            ViewBag.Title = "Test page title";
            List<Products> _products = _productsRepository.GetALLProducts();
            ViewData["Products"] = _products;
            return View();
        }
        [Route("Home/viewdata")]
        public JsonResult Json()
        {
            return Json(new { id = 1, name = "vantan" });
        }
        [HttpGet]
        public IActionResult Detail(int? id)
        {
            ViewBag.Title = "Detail Product title";
            Products _product = _productsRepository.GetProducts(id ?? 1);
            if(_product == null)
            {
                Response.StatusCode = 404;
                return View("NotFound");
            }
            return View(_product);
        }

        [HttpGet]
        public ActionResult Register()
        {
            return View();
        }
        [HttpPost]
        [Obsolete]
        public IActionResult Register(ProductsCeateModel products)
        {
            if (ModelState.IsValid)
            {
                string fullnamefile = null;
                string UniqueFilename = null;
                if (products.image != null)
                {
                    foreach (IFormFile formFile in products.image)
                    {
                        string uploadFodel = Path.Combine(_hostingEnvironment1.WebRootPath + "\\images");
                        UniqueFilename = Guid.NewGuid().ToString() + "_" + formFile.FileName;
                        string filepath = Path.Combine(uploadFodel + "\\" + UniqueFilename);
                        formFile.CopyTo(new FileStream(filepath, FileMode.Create));
                        fullnamefile += UniqueFilename + ";";
                    }
                }
                Products productsmodel = new Products
                {
                    ProName = products.ProName,
                    ProCategory = products.ProCategory,
                    StockQuatity = products.StockQuatity ?? 0,
                    Unit = products.Unit,
                    image = fullnamefile
                };
                Products products1 = _productsRepository.Add(productsmodel);
                return RedirectToAction("Detail", new { id = products1.ProId });
            }
            return View();
        }
        [HttpGet]
        public ActionResult edit(int id)
        {
            ProductsEditModel productsedit1 = new ProductsEditModel();
            var products1 = _productsRepository.GetProducts(id);
            productsedit1.ProId = products1.ProId;
            productsedit1.ProName = products1.ProName;
            productsedit1.ProCategory = products1.ProCategory;
            productsedit1.ExistImage = products1.image;
            productsedit1.Unit = products1.Unit;
            productsedit1.StockQuatity = products1.StockQuatity;
            return View(productsedit1);
        }
        [HttpPost]
        [Obsolete]
        public IActionResult edit(ProductsEditModel products)
        {
            if (ModelState.IsValid)
            {
                var productsedit = _productsRepository.GetProducts(products.ProId);
                string fullnamefile = NewMethodProcessImage(products);
                if (fullnamefile != null)
                {
                    productsedit.image = fullnamefile;
                    //xóa file cũ
                    if(products.ExistImage!= null)
                    {
                        foreach(string p in products.ExistImage.Split(";"))
                        {
                            if (!string.IsNullOrEmpty(p))
                            {
                                string oldPath = Path.Combine(_hostingEnvironment1.WebRootPath + "\\images\\" + p);
                                System.IO.File.Delete(oldPath);
                            }
                        }
                    }
                }
                productsedit.ProName = products.ProName;
                productsedit.ProCategory = products.ProCategory;
                productsedit.StockQuatity = products.StockQuatity ?? 0;
                productsedit.Unit = products.Unit;

                Products products1 = _productsRepository.Update(productsedit);
                return RedirectToAction("Detail", new { id = products1.ProId });
            }
            return View();
        }

        [Obsolete]
        private string NewMethodProcessImage(ProductsEditModel products)
        {
            string fullnamefile = null;
            string UniqueFilename = null;
            if (products.image != null)
            {
                foreach (IFormFile formFile in products.image)
                {
                    string uploadFodel = Path.Combine(_hostingEnvironment1.WebRootPath + "\\images");
                    UniqueFilename = Guid.NewGuid().ToString() + "_" + formFile.FileName;
                    string filepath = Path.Combine(uploadFodel + "\\" + UniqueFilename);
                    formFile.CopyTo(new FileStream(filepath, FileMode.Create));
                    fullnamefile += UniqueFilename + ";";
                }
            }

            return fullnamefile;
        }
        [Route("Error")]
        [AllowAnonymous]
        public IActionResult Error()
        {
            _logger.LogError("vantan test log config");
            var exception = HttpContext.Features.Get<IExceptionHandlerPathFeature>();
            ViewBag.ExceptionPath = exception.Path;
            ViewBag.ExceptionMessage = exception.Error.ToString();
            ViewBag.StackTrace = exception.Error.StackTrace;
            return View("Error");
        }
        [Route("Error/{statuscode}")]
        public IActionResult Error(int statuscode)
        {
            switch (statuscode)
            {
                case 404:
                    ViewBag.ErrorPage = "Sorry Page not found";
                    break;
            }
            return View("NotFound");
        }
    }
}
