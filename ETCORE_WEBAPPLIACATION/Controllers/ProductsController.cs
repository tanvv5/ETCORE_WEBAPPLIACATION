using ETCORE_WEBAPPLIACATION.Data;
using ETCORE_WEBAPPLIACATION.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETCORE_WEBAPPLIACATION.Controllers
{
    public class ProductsController : Controller
    {
        // GET: Products
        private IProductsRepository _productsRepository;
        private UserRespository _userRespository;
        public ProductsController(IProductsRepository productsRepository, UserRespository userRespository)
        {
            _productsRepository = productsRepository;
            _userRespository = userRespository;
        }
        public async Task<ActionResult> Index()
        {
            ViewBag.Title = "Trang sản phẩm";
            //List<Products> _products = _productsRepository.GetALLProducts();
            List<Products> _products = await _userRespository.GetAllProduct();
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
            return View();
        }

        // POST: Products/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
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

        // GET: Products/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Products/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
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
