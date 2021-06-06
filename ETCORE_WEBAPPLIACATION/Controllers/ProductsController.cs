using ETCORE_WEBAPPLIACATION.Data;
using ETCORE_WEBAPPLIACATION.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ETCORE_WEBAPPLIACATION.Controllers
{
    public class ProductsController : Controller
    {
        // GET: Products
        private IProductsRepository _productsRepository;
        private UserRespository _userRespository;
        private readonly ILogger<HomeController> _logger;
        [Obsolete]
        private readonly IHostingEnvironment _hostingEnvironment1;
        [Obsolete]
        public ProductsController(ILogger<HomeController> logger, IProductsRepository productsRepository, UserRespository userRespository, IHostingEnvironment hostingEnvironment)
        {
            _productsRepository = productsRepository;
            _userRespository = userRespository;
            _hostingEnvironment1 = hostingEnvironment;
            _logger = logger;
        }
        public async Task<ActionResult> Index()
        {
            ViewBag.Title = "Trang sản phẩm";
            //List<Products> _products = _productsRepository.GetALLProducts();
            List<ProductsViewModel> _products = await _userRespository.GetAllProduct();
            return View(_products);
        }

        // GET: Products/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: Products/Create
        public ActionResult Create()
        {
            var rs = _productsRepository.getCategory();
            ViewData["Category"] = rs;
            return View();
        }

        // POST: Products/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        [Obsolete]
        public IActionResult Create(ProductsCeateModel products)
        {
            try
            {
                var rs = _productsRepository.getCategory();
                ViewData["Category"] = rs;
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
                                Name = UniqueFilename,
                                Featured = "/user/images/" + UniqueFilename,
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
                        Photos = listphoto,
                        Status="1",
                        Description = products.Description
                    };
                    ProductsViewModel products1 = _productsRepository.Add(productsmodel);
                    return RedirectToAction("Index");
                }
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.StackTrace);
                return View();
            }
            return View();
        }

        // GET: Products/Edit/5
        public ActionResult Edit(int id)
        {
            ProductsEditModel productsedit1 = new ProductsEditModel();
            var products1 = _productsRepository.GetProducts(id);
            productsedit1.ProId = products1.ProId;
            productsedit1.ProName = products1.ProName;
            productsedit1.ProCategory = products1.ProCategory;
            string listimage = "";
            if(products1.Photos.Count>0)
               foreach(Photo p in products1.Photos)
                {
                    listimage += p.Featured+";";
                }
            productsedit1.ExistImage = listimage;
            productsedit1.Unit = products1.Unit;
            productsedit1.StockQuatity = products1.StockQuatity;
            productsedit1.Description = products1.Description;
            return View(productsedit1);
        }

        // POST: Products/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(ProductsEditModel products)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var productsedit = _productsRepository.GetProducts(products.ProId);
                    List<Photo> photo = NewMethodProcessImage(products);
                    if (photo.Count > 0)
                    {
                        //xóa file cũ
                        if (products.ExistImage != null)
                        {
                            foreach (string p in products.ExistImage.Split(";"))
                            {
                                if (!string.IsNullOrEmpty(p))
                                {
                                    string oldPath = Path.Combine(_hostingEnvironment1.WebRootPath + p.Replace("/","\\"));
                                    System.IO.File.Delete(oldPath);
                                }
                            }
                        }
                    }
                    productsedit.ProName = products.ProName;
                    productsedit.ProCategory = products.ProCategory;
                    productsedit.StockQuatity = products.StockQuatity;
                    productsedit.Unit = products.Unit;
                    productsedit.Description = products.Description;
                    productsedit.Photos = photo;

                    ProductsViewModel products1 = _productsRepository.Update(productsedit);
                    return RedirectToAction("Detail", new { id = products1.ProId });
                }
                return RedirectToAction("Edit", new { id = products.ProId });
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.StackTrace);
                return RedirectToAction("Edit", new { id = products.ProId });
            }
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
                        Featured = "/user/images/" + UniqueFilename,
                        ProductId = products.ProId
                    });
                }
            }
            return photo;
        }
        // GET: Products/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: Products/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
