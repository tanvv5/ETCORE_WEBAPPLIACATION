using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETCORE_WEBAPPLIACATION.Models
{
    public interface IProductsRepository
    {
        ProductsViewModel GetProducts(int ProId);
        List<ProductsViewModel> GetALLProducts();
        ProductsViewModel Add(ProductsViewModel productcreate);
        Products Delete(int ProId);
        ProductsViewModel Update(ProductsViewModel productsedit);
        List<Category> getCategory();
    }
}
