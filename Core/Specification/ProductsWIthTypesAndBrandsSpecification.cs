using System;
using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specification
{
    public class ProductsWIthTypesAndBrandsSpecification : BaseSpecification<Product>
    {
        public ProductsWIthTypesAndBrandsSpecification()
        {
            AddInclude(y => y.ProductType);
            AddInclude(x => x.ProductBrand);
            
        }

        public ProductsWIthTypesAndBrandsSpecification(int id) : base(x =>x.Id == id)
        {
             AddInclude(x => x.ProductType);
             AddInclude(x => x.ProductBrand);
        }
    }
}