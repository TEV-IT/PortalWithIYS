using System.Collections.Generic;

namespace PortalProject.models
{
    public class CategoryModel
    {
        public int Id { get; set; }
        public string category { get; set; }
        public string Description { get; set; }
        public int CategoryId { get; set; }
        public byte Status { get; set; }
        public string categoryUrl { get; set; }

        public List <CategoryModel> SubCategoryList { get; set; } 
    }
}
