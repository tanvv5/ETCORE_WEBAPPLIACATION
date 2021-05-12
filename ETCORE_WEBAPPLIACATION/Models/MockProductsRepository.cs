using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETCORE_WEBAPPLIACATION.Models
{
    public class MockProductsRepository :IProductsRepository
    {
        List<Products> _Products;
        public MockProductsRepository()
        {
            _Products = new List<Products>(){ 
                new Products{ProId=1,ProName="Product1",ProCategory="Product Category 1",Unit="Chiếc",StockQuatity=3},
                new Products{ProId=1,ProName="Product2",ProCategory="Product Category 2",Unit="Chiếc",StockQuatity=4},
                new Products{ProId=1,ProName="Product3",ProCategory="Product Category 2",Unit="Chiếc",StockQuatity=1}
            };
        }
        public List<Products> GetALLProducts() {
            _Products= new List<Products>(){
                new Products(){ProId=1,ProName="Product1",ProCategory="Product Category 1",Unit="Chiếc",StockQuatity=3},
                new Products(){ProId=1,ProName="Product2",ProCategory="Product Category 2",Unit="Chiếc",StockQuatity=4},
                new Products(){ProId=1,ProName="Product3",ProCategory="Product Category 2",Unit="Chiếc",StockQuatity=1}
            };
            return _Products;
        }
        public Products GetProducts(int ProId)
        {
            return _Products.Where(r => r.ProId.Equals(ProId)).FirstOrDefault();
        }
        public Products Add(Products products)
        {
            products.ProId=_Products.Max(i=> i.ProId)+1;
            _Products.Add(products);
            return products;
        }

        public Products Delete(int ProId)
        {
            throw new NotImplementedException();
        }

        public Products Update(Products products)
        {
            throw new NotImplementedException();
        }
    }
}
