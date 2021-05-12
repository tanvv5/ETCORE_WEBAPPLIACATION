using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETCORE_WEBAPPLIACATION.Models
{
    public interface IProductsRepository
    {
        Products GetProducts(int ProId);
        List<Products> GetALLProducts();
        Products Add(Products products);
        Products Delete(int ProId);
        Products Update(Products products);
    }
}
