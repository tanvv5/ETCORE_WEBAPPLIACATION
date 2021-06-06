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
            List<ProductsViewModel> _products = _productsRepository.GetALLProducts();
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
            ProductsViewModel _product = _productsRepository.GetProducts(id ?? 1);
            if (_product == null)
            {
                Response.StatusCode = 404;
                return View("NotFound");
            }
            return View(_product);
        }

        [HttpGet]
        public ActionResult Register()
        {
            var rs = _productsRepository.getCategory();
            return View(rs);
        }
        [HttpPost]
        [Obsolete]
        public IActionResult Register(ProductsCeateModel products)
        {
            if (ModelState.IsValid)
            {
                List<Photo> listphoto = new List<Photo>();
                string fullnamefile = null;
                string UniqueFilename = null;
                if (products.image != null)
                {
                    foreach (IFormFile formFile in products.image)
                    {
                        string uploadFodel = Path.Combine(_hostingEnvironment1.WebRootPath + "\\user\\images");
                        UniqueFilename = Guid.NewGuid().ToString() + "_" + formFile.FileName;
                        string filepath = Path.Combine(uploadFodel + "\\" + UniqueFilename);
                        formFile.CopyTo(new FileStream(filepath, FileMode.Create));
                        fullnamefile += UniqueFilename + ";";
                        listphoto.Add(new Photo
                        {
                            Name = fullnamefile,
                            Featured = filepath,
                            Status = "1",
                        });
                    }
                }
                ProductsViewModel productsmodel = new ProductsViewModel
                {
                    ProName = products.ProName,
                    ProCategory = products.ProCategory,
                    StockQuatity = products.StockQuatity,
                    Unit = products.Unit,
                    Photos = listphoto
                };
                ProductsViewModel products1 = _productsRepository.Add(productsmodel);
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
            productsedit1.ExistImage = products1.Photos.Count > 0 ? products1.Photos[0].Featured : "";
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
                List<Photo> photo = NewMethodProcessImage(products);
                if (photo.Count>0)
                {
                    //xóa file cũ
                    if (products.ExistImage != null)
                    {
                        foreach (string p in products.ExistImage.Split(";"))
                        {
                            if (!string.IsNullOrEmpty(p))
                            {
                                string oldPath = Path.Combine(_hostingEnvironment1.WebRootPath + "\\user\\images\\" + p);
                                System.IO.File.Delete(oldPath);
                            }
                        }
                    }
                }
                productsedit.ProName = products.ProName;
                productsedit.ProCategory = products.ProCategory;
                productsedit.StockQuatity = products.StockQuatity;
                productsedit.Unit = products.Unit;

                ProductsViewModel products1 = _productsRepository.Update(productsedit);
                return RedirectToAction("Detail", new { id = products1.ProId });
            }
            return View();
        }

        [Obsolete]
        private List<Photo> NewMethodProcessImage(ProductsEditModel products)
        {
            List<Photo> photo = new List<Photo>();
            string UniqueFilename = null;
            if (products.image != null)
            {
                foreach (IFormFile formFile in products.image)
                {
                    string uploadFodel = Path.Combine(_hostingEnvironment1.WebRootPath + "\\user\\images");
                    UniqueFilename = Guid.NewGuid().ToString() + "_" + formFile.FileName;
                    string filepath = Path.Combine(uploadFodel + "\\" + UniqueFilename);
                    formFile.CopyTo(new FileStream(filepath, FileMode.Create));
                    photo.Add(new Photo
                    {
                        Name = UniqueFilename,
                        Featured = filepath,
                        ProductId = products.ProId
                    });
                }
            }
            return photo;
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
