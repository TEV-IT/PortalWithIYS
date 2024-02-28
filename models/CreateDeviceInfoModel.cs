using PortalService;
using System;

namespace PortalProject.models
{
    //seda
    public class CreateDeviceInfoModel
    {
        public string CompScholarshipId { get; set; }
        public TEVDeviceType DeviceType { get; set; }
        public string DeviceBrandName { get; set; }
        public string DeviceModel { get; set; }
        public string DeviceTechSpecs { get; set; }
        public string DeviceSerialNumber { get; set; }
        public int DeviceBatteryLife { get; set; }
        public NoYesCombo DeviceAdapterIsOK { get; set; }
        public NoYesCombo DeviceCameraIsOK { get; set; }
        public NoYesCombo DeviceMicIsOK { get; set; }
        public NoYesCombo DeviceWifiIsOK { get; set; }
        public string notes { get; set; }
        

        // public TEVDeviceControlResult DeviceControlResult { get; set; } //--> ax'ta girilen değerlere göre otomatik yazılacak.

    }
    //seda
}
