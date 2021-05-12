using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETCORE_WEBAPPLIACATION.Models
{
    public class SQLProductsRespository : IProductsRepository
    {
        private readonly AppDbContext _appDbContext;
        public SQLProductsRespository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        public Products Add(Products product)
        {
            _appDbContext.Products.Add(product);
            _appDbContext.SaveChanges();
            return product;
        }


        public Products Delete(int ProId)
        {
            Products product = _appDbContext.Products.Find(ProId);
            if (product != null)
            {
                _appDbContext.Products.Remove(product);
                _appDbContext.SaveChanges();
            }
            return product;
        }

        public List<Products> GetALLProducts()
        {
            return _appDbContext.Products.ToList();
        }

        public Products GetProducts(int ProId)
        {
            Products product= _appDbContext.Products.Find(ProId);
            return product;
        }

        public Products Update(Products products)
        {
            var pr =_appDbContext.Products.Attach(products);
            pr.State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            _appDbContext.SaveChanges();
            return products;
        }
    }
}
