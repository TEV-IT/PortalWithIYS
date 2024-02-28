using PortalService;

namespace PortalProject.models
{
    public class CreateWorkerContractModel
    {
        public string TCIDNumber { get; set; }
        public BorAxPIType piType { get; set; }
        public string phone { get; set; }
        public Gender gender { get; set; }
        public string name { get; set; }
        public BorAXBloodGroup blood { get; set; }
        public string user { get; set; }
        public string pass{ get; set; }
    }
}
