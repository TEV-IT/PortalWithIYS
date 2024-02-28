using PortalService;
using System;

namespace PortalProject.models
{
    public class CreateWorkerDayOffModel
    {
        public string description { get; set; }
        public string fromDate { get; set; }
        public string toDate { get; set; }
        public TEVDayOffTypes dayOffTypes { get; set; }
        public decimal daysCount { get; set; }
        public string user { get; set; }
        public string pass { get; set; }

        public HalfTimeType HalfTimeType { get; set; }  
    }
}
