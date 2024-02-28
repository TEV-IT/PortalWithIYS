using PortalService;

namespace PortalProject.models
{
    public class WorkerShiftModel
    {        
        public string user { get; set; }
        public string pass { get; set; }   
        public string description { get; set; }
        
        public string fromDate { get; set; }

        public string startHours {  get; set; }       

        public string endHours { get; set; }

        public string totalHours { get; set; }


    }
}
