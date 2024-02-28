using System;

namespace PortalProject.models
{
    public class ContentModel
    {
        public string caption { get; set; }
        public string body { get; set; }
        public int CategoryId { get; set; }
        public DateTime createDateTime { get; set; }
    }
}
