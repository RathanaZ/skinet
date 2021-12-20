using Core.Entities;
using Core.Specification;

namespace Infrastructure.Data
{
    public class ProductWIthFilterForCountSpecification : BaseSpecification<Product>
    {
        public ProductWIthFilterForCountSpecification(ProductSpecParams productSpecParams): 
                    base(x => 
                                (string.IsNullOrEmpty(productSpecParams.Search) || x.Name.ToLower().Contains(productSpecParams.Search)) &&
                                (!productSpecParams.BrandId.HasValue || x.ProductBrandId == productSpecParams.BrandId) &&
                                (!productSpecParams.TypeId.HasValue || x.ProductTypeId == productSpecParams.TypeId)
                    )
        {
        }
    }
}