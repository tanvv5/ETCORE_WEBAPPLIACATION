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
        public ProductsViewModel Add(ProductsViewModel productcreate)
        {
            Products product = new Products
            {
                Description = productcreate.Description,
                Price = productcreate.Price,
                ProCategory = productcreate.ProCategory,
                ProName = productcreate.ProName,
                Status = productcreate.Status,
                StockQuatity = productcreate.StockQuatity,
                Unit = productcreate.Unit
            };

            _appDbContext.Products.Add(product);
            _appDbContext.SaveChanges();
            int id_pro = product.ProId;
            //thêm mới photo cho products
            foreach (Photo pt in productcreate.Photos)
            {
                pt.ProductId = id_pro;
                _appDbContext.Photo.Add(pt);
            }
            _appDbContext.SaveChanges();
            return productcreate;
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

        public List<ProductsViewModel> GetALLProducts()
        {
            var rslist_products = _appDbContext.Products.Select(c => new ProductsViewModel
            {
                ProId = c.ProId,
                ProName = c.ProName,
                ProCategory = c.ProCategory,
                Unit = c.Unit,
                StockQuatity = c.StockQuatity,
                Price = c.Price,
                Status = c.Status,
                Description = c.Description,
                Photos = null
            }).ToList();
            foreach (ProductsViewModel products in rslist_products)
            {
                products.Photos = GetChildren(products.ProId);
            }
            return rslist_products;
        }
        private List<Photo> GetChildren(int ProId)
        {
            return _appDbContext.Photo
                    .Where(c => c.ProductId == ProId && c.Status == "1")
                    .ToList();
        }
        public ProductsViewModel GetProducts(int ProId)
        {
            Products product = _appDbContext.Products.Find(ProId);
            List<Photo> photo = _appDbContext.Photo.Where(x => x.ProductId == ProId).ToList();
            ProductsViewModel productViewModel = new ProductsViewModel
            {
                ProId = product.ProId,
                ProName = product.ProName,
                ProCategory = product.ProCategory,
                Unit = product.Unit,
                StockQuatity = product.StockQuatity,
                Price = product.Price,
                Status = product.Status,
                Description = product.Description,
                Photos = photo!=null?photo:null
            };
            return productViewModel;
        }
        public ProductsViewModel Update(ProductsViewModel productsedit)
        {
            Products product = _appDbContext.Products.Find(productsedit.ProId);
            product.Description = productsedit.Description;
            product.Price = productsedit.Price;
            product.ProCategory = productsedit.ProCategory;
            product.ProName = productsedit.ProName;
            product.Status = productsedit.Status;
            product.StockQuatity = productsedit.StockQuatity;
            product.Unit = productsedit.Unit;
            _appDbContext.SaveChanges();
            //xoa image va update 
            //thêm mới photo cho products
            //thêm mới photo cho products
            _appDbContext.Photo.Where(x => x.ProductId == product.ProId).ToList().ForEach(p => _appDbContext.Photo.Remove(p));
            _appDbContext.SaveChanges();
            foreach (Photo pt in productsedit.Photos)
            {
                pt.ProductId = product.ProId;
                pt.Status = "1";
                _appDbContext.Photo.Add(pt);
            }
            _appDbContext.SaveChanges();
            return productsedit;
        }

        public List<Category> getCategory()
        {
            List<Category> category = _appDbContext.Category.Where(r => r.Status == "1").Select(t => new Category
            {
                Id = t.Id,
                Status = t.Status,
                Created = t.Created,
                Name = t.Name,
                ParentId = t.ParentId
            }).ToList();
            return category;
        }
    }
}
