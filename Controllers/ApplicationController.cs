using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using PortalService;
using System.Threading.Tasks;
using PortalProject;
using System;
using PortalProject.Logger;
using System.Collections.Generic;
using System.Linq;
using PortalProject.models;
using System.Security.Principal;
using Microsoft.Extensions.Configuration;
using Dapper;
using System.Data;
using System.Data.SqlClient;
using System.Text.Json;
using Microsoft.Data.SqlClient;
using System.Drawing;
using System.IO;

namespace PortalProject.Controllers
{

    [ApiController]
    public class ApplicationContoller : ControllerBase
    {
        private ILoggerService _logger;

        private readonly IConfiguration _configuration;

        public ApplicationContoller(ILoggerService logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
        }
        public static TEVPortalProjectServicesClient GetTEVPortalProjectServicesClient(string user, string pass)
        {
            TEVPortalProjectServicesClient client = new TEVPortalProjectServicesClient();
            try
            {
                client.ClientCredentials.UserName.UserName = user;
                client.ClientCredentials.UserName.Password = pass;
                client.ClientCredentials.Windows.ClientCredential.UserName = user;
                client.ClientCredentials.Windows.ClientCredential.Password = pass;
                client.ClientCredentials.Windows.AllowedImpersonationLevel = System.Security.Principal.TokenImpersonationLevel.Impersonation;

            } catch (Exception ex) { }
            return client;
        }

        [HttpPost("api/getInfo")]
        public async Task<ActionResult<TEVPortalProjectInfoReturnClass>> getInfo(UserData userData)
        {
            try
            {
                _logger.LogInfo("Fetching All Purchase orders");
                CallContext callContext = new CallContext();
                callContext.Company = "TV34";
                return GetTEVPortalProjectServicesClient(userData.user, userData.pass).getHomePageData(callContext, userData.user);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                TEVPortalProjectReturnClass error = new TEVPortalProjectReturnClass();
                error.result = false;
                error.message = ex.Message;

                return StatusCode(400, error);
            }
        }

        public static string GetWindowsUserName(HttpContext context)
        {
            IPrincipal principal = context.User;
            return principal.Identity.Name;
        }

   
        [HttpPost("uygulamalar/api/SendApprove")]
        public async Task<ActionResult<TEVPortalProjectReturnClass>> SendApprove(WorkerDayOffSendApprove workerSendApprove)
        {
            try
            {
                CallContext callContext = new CallContext();
                callContext.Company = "TV34";
                return GetTEVPortalProjectServicesClient(workerSendApprove.user, workerSendApprove.pass).daysOffSendForApprove(callContext, workerSendApprove.user, workerSendApprove.recId);
            }
            catch (Exception e)
            {
                TEVPortalProjectReturnClass error = new TEVPortalProjectReturnClass();
                error.result = false;
                error.message = e.Message;

                return StatusCode(400, error);
            }

        }
        [HttpPost("uygulamalar/api/GetWorkerDaysOff")]
        public async Task<ActionResult<List<TEVPortalWorkerDayOffModelClass>>> GetWorkerDayOff(UserData userData)
        {
            try
            {
                CallContext callContext = new CallContext();
                callContext.Company = "TV34";
                return GetTEVPortalProjectServicesClient(userData.user, userData.pass).getWorkerDaysOffList(callContext, userData.user).ToList();

            } catch (Exception e)
            {
                TEVPortalProjectReturnClass error = new TEVPortalProjectReturnClass();
                error.result = false;
                error.message = e.Message;

                return StatusCode(400, error);
            }
        }
        [HttpPost("uygulamalar/api/GetWorkersDayOffFilter")]
        public async Task<ActionResult<List<TEVPortalWorkerDayOffModelClass>>> GetWorkerDayOffFilter(UserData userData)
        {
            try
            {
                CallContext callContext = new CallContext();
                callContext.Company = "TV34";
                return GetTEVPortalProjectServicesClient(userData.user, userData.pass).getWorkersDaysOffListFilter(callContext, userData.user).ToList();
            }
            catch (Exception e)
            {
                TEVPortalProjectReturnClass error = new TEVPortalProjectReturnClass();
                error.result = false;
                error.message = e.Message;
                return StatusCode(400, error);
            }
        }
        
        [HttpPost("uygulamalar/api/getWorkerDayOffForm")]
        public async Task<ActionResult<TEVPortalDayOffFormModel>> GetWorkerDayOffForm(WorkerDayOffSendApprove userData)
        {
            try
            {
                CallContext callContext = new CallContext();
                callContext.Company = "TV34";
                return GetTEVPortalProjectServicesClient(userData.user, userData.pass).getDayOffForm(callContext,userData.user, userData.recId);
            }
            catch (Exception e)
            {
                TEVPortalProjectReturnClass error = new TEVPortalProjectReturnClass();
                error.result = false;
                error.message = e.Message;
                return StatusCode(400, error);
            }
        }
        /*
        [HttpPost("api/getHowLongWorkingTEV")]
        public async Task<ActionResult<TEVPortalHowLongWorking>> getHowLongWorking(WorkerDayOffSendApprove userData)
        {
            try
            {
                CallContext callContext = new CallContext();
                callContext.Company = "TV34";
                return GetTEVPortalProjectServicesClient(userData.user, userData.pass).getHowLongWorking(callContext, userData.user);
            }
            catch (Exception e)
            {
                TEVPortalProjectReturnClass error = new TEVPortalProjectReturnClass();
                error.result = false;
                error.message = e.Message;
                return StatusCode(400, error);
            }
        }
        
        */
        [HttpPost("uygulamalar/api/CreateWorkerDaysOff")]
        public async Task<ActionResult<TEVPortalProjectReturnClass>> CreateWorkerDaysOff(CreateWorkerDayOffModel workerData)
        {
            try
            {
                CallContext callContext = new CallContext();
                callContext.Company = "TV34";
                return GetTEVPortalProjectServicesClient(workerData.user, workerData.pass).createWorkerDaysOff(callContext, workerData.user, workerData.description,
                                                                                                                workerData.daysCount, workerData.dayOffTypes, workerData.fromDate, workerData.toDate, workerData.HalfTimeType);
            }
            catch (Exception e) 
            {
                TEVPortalProjectReturnClass error = new TEVPortalProjectReturnClass();
                error.result = false;
                error.message = e.Message;
                return StatusCode(400, error);
            }
        }

        //seda
        [HttpPost("api/CreateDeviceInfo")]
        public async Task<ActionResult<TEVPortalProjectReturnClass>> CreateDeviceInfo(CreateDeviceInfoModel workerData)
        {
            try
            {
                CallContext callContext = new CallContext();
                callContext.Company = "TV34";
                /*
                return GetTEVPortalProjectServicesClient("axuser1","Tev1967Tev").createDeviceInfo(callContext, workerData.CompScholarshipId, workerData.DeviceType, workerData.DeviceBrandName,
                                                                                                            workerData.DeviceModel, workerData.DeviceTechSpecs, workerData.DeviceSerialNumber, workerData.DeviceBatteryLife,
                                                                                                            workerData.DeviceAdapterIsOK, workerData.DeviceCameraIsOK, workerData.DeviceMicIsOK, workerData.DeviceWifiIsOK,workerData.notes);
                */
                return GetTEVPortalProjectServicesClient("axuser1", "Tev1967Tev").createDeviceInfo(callContext, workerData.CompScholarshipId, workerData.DeviceType, workerData.DeviceBrandName,
                                                                                                            workerData.DeviceModel, workerData.DeviceTechSpecs, workerData.DeviceSerialNumber, workerData.DeviceBatteryLife,
                                                                                                            workerData.DeviceAdapterIsOK, workerData.DeviceCameraIsOK, workerData.DeviceMicIsOK, workerData.DeviceWifiIsOK);
            }
            catch (Exception e)
            {
                TEVPortalProjectReturnClass error = new TEVPortalProjectReturnClass();
                error.result = false;
                error.message = e.Message;
                return StatusCode(401, error);
            }
        }

        [HttpPost("uygulamalar/api/setIsAccepted")]
        public async Task<ActionResult<TEVPortalProjectReturnClass>> SetIsAccepted(UserData userData)
        {
            try
            {
                CallContext callContext = new CallContext();
                callContext.Company = "TV34";
                return GetTEVPortalProjectServicesClient(userData.user, userData.pass).setWorkerDayOffIsAccepted(callContext);

            }
            catch (Exception e)
            {

                TEVPortalProjectReturnClass error = new TEVPortalProjectReturnClass();
                error.result = false;
                error.message = e.Message;
                return StatusCode(401, error);
            }
        }
        //seda


        [HttpPost("api/getFindWorkerWithName")]
        public async Task<ActionResult<List<TEVFindWorkerDataModel>>> GetFindWorkerDataList(TEVFindWorkerModel userData)
        {
            try
            {
                CallContext callContext = new CallContext(); 
                callContext.Company = "TV34";
                return GetTEVPortalProjectServicesClient(userData.user, userData.pass).getWorkerWithName(callContext, userData.filter).ToList();
            }
            catch (Exception e)
            {
                TEVPortalProjectReturnClass error = new TEVPortalProjectReturnClass();
                error.result = false;
                error.message = e.Message;
                return StatusCode(400, error);
            }
        }
        [HttpPost("api/getProfileDataList")]
        public async Task<ActionResult<TEVPortalProfileMainClass>> GetProfileDataList(UserData userData)
        {
            try
            {
                CallContext callContext = new CallContext();
                callContext.Company = "TV34";
                return GetTEVPortalProjectServicesClient(userData.user, userData.pass).getProfileData(callContext, userData.user);
            }catch ( Exception e)
            {
                TEVPortalProjectReturnClass error = new TEVPortalProjectReturnClass();
                error.result = false;
                error.message = e.Message;

                return StatusCode(400, error);

            }
        }
        /*

        [HttpPost("api/createWorkerContract")]
        public async Task<ActionResult<TEVPortalProjectReturnClass>> CreateWorkerContract(CreateWorkerContractModel contractModel)
        {
            try
            {
                CallContext callContext = new CallContext();
                callContext.Company = "TV34";
                return GetTEVPortalProjectServicesClient(contractModel.user, contractModel.pass).createWorkerContract(callContext,contractModel.user,contractModel.blood, contractModel.name,contractModel.gender, contractModel.TCIDNumber,contractModel.phone, contractModel.piType);
            }
            catch (Exception e)
            {

                TEVPortalProjectReturnClass error = new TEVPortalProjectReturnClass();
                error.result = false;
                error.message = e.Message;

                return StatusCode(400, error);
            }
        }
        */

        [HttpPost("api/CreateNotification")]
        public async Task<ActionResult<TEVPortalProjectReturnClass>> CreateNotification(CreateNotificationModel notificationModel)
        {
            try
            {
                CallContext callContext = new CallContext();
                callContext.Company = "TV34";
                return GetTEVPortalProjectServicesClient(notificationModel.user, notificationModel.pass).createNotifications(callContext, notificationModel.user, notificationModel.description);
   
            }
            catch (Exception e)
            {
                TEVPortalProjectReturnClass error = new TEVPortalProjectReturnClass();
                error.result = false;
                error.message = e.Message;

                return StatusCode(400, error);
            }

        }

        [HttpPost("api/CreateDayOffNotification")]
        public async Task<ActionResult<TEVPortalProjectReturnClass>> createDayOffNotifications(CreateNotificationModel dayyOffNotes)
        {
            try
            {
                CallContext callContext = new CallContext();
                callContext.Company = "TV34";
                return GetTEVPortalProjectServicesClient(dayyOffNotes.user, dayyOffNotes.pass).createDayOffNotifications(callContext, dayyOffNotes.user, dayyOffNotes.description);
            }
            catch (Exception e)
            {

                TEVPortalProjectReturnClass error = new TEVPortalProjectReturnClass();
                error.result = false;
                error.message = e.Message;

                return StatusCode(400, error);
            }
        }
        [HttpPost("api/CreateWorkerShift")]
        public async Task<ActionResult<TEVPortalProjectReturnClass>> createWorkerOverTime(WorkerShiftModel workerShiftModel)
        {
            try
            {
                CallContext callContext = new CallContext();
                callContext.Company = "TV34";
                return GetTEVPortalProjectServicesClient(workerShiftModel.user,workerShiftModel.pass).createWorkerOverTime(callContext,workerShiftModel.user,workerShiftModel.description,workerShiftModel.fromDate,
                                                                                workerShiftModel.startHours, workerShiftModel.endHours,workerShiftModel.totalHours);
            }catch (Exception e)
            {
                TEVPortalProjectReturnClass ret = new TEVPortalProjectReturnClass();
                ret.result = false;
                ret.message = e.Message;
                return StatusCode(400, ret);
            }
        }
        /*
        [HttpPost("api/getWorkerShift")]
        public async Task<ActionResult<List<TEVPortalWorkerShiftModelClass>>> GetWorkerShift(UserData userData)
        {
            try
            {
                CallContext callContext = new CallContext();
                callContext.Company = "TV34";
                return GetTEVPortalProjectServicesClient(userData.user, userData.pass).getOverTimeDataList(userData.user); 

            }
            catch (Exception e)
            {

                TEVPortalProjectReturnClass ret = new TEVPortalProjectReturnClass();
                ret.result = false;
                ret.message = e.Message;
                return StatusCode(400, ret);
            }
        }
        */


        [HttpPost("api/WorkerSendShift")]
        public async Task<ActionResult<TEVPortalProjectReturnClass>> SendWorkerShift(WorkerDayOffSendApprove shiftSendShift)
        {
            try
            {
                CallContext callContext = new CallContext();
                callContext.Company = "TV34";
                return GetTEVPortalProjectServicesClient(shiftSendShift.user, shiftSendShift.pass).enableWorkflowOverTime(callContext, shiftSendShift.recId, shiftSendShift.user);
            }
            catch (Exception e)
            {
                TEVPortalProjectReturnClass ret = new TEVPortalProjectReturnClass();
                ret.result = false;
                ret.message = e.Message;
                return StatusCode(400, ret);

                throw;
            }
        }

        [HttpGet("api/GetCategoryList")]
        public async Task<List<CategoryModel>> GetCategoryList()
        {
            try
            {
                List<CategoryModel> resultList = new List<CategoryModel>();
                string sqlCategoryString = "select id, category, categoryId, categoryUrl from CategoryTable WHERE categoryId = 0";
                string sqlSubCategoryString = "select id, category, categoryId, categoryUrl from CategoryTable WHERE categoryId = @categoryId";
                Microsoft.Data.SqlClient.SqlConnectionStringBuilder  builder = new Microsoft.Data.SqlClient.SqlConnectionStringBuilder(_configuration.GetConnectionString("PortalIcerikYonetim"));
                builder.TrustServerCertificate = true;
                using (var conn = new Microsoft.Data.SqlClient.SqlConnection(builder.ConnectionString))
                {
                    conn.Open();
                    List<CategoryModel> idList = conn.Query<CategoryModel>(sqlCategoryString).ToList();
                    foreach (var item in idList)
                    {
                        var parameter = new { categoryId = item.Id };
                        List<CategoryModel> subCategoryList = conn.Query<CategoryModel>(sqlSubCategoryString, parameter).ToList();
                        item.SubCategoryList = subCategoryList;
                        resultList.Add(item);
                    }
                    conn.Close();
                }
                return resultList;
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet("api/GetContent/{categoryId}")]
        public JsonResult GetContent(int categoryId)
        {
            string query = $@"
                    SELECT TOP 1 caption, body FROM dbo.ContentTable 
                    WHERE CategoryId = {categoryId} 
                    ORDER BY createDateTime DESC";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("PortalIcerikYonetim");
            Microsoft.Data.SqlClient.SqlDataReader myReader;

            using (Microsoft.Data.SqlClient.SqlConnection myCon = new Microsoft.Data.SqlClient.SqlConnection(sqlDataSource))
            {
                myCon.Open();

                using (Microsoft.Data.SqlClient.SqlCommand myCommand = new Microsoft.Data.SqlClient.SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }


        [HttpGet("api/GetAllPdfByContentId")]
        public JsonResult GetAllPdfByContentId()
        {
            string query = @"
                    SELECT contentId, filePath, description
                    FROM (
                        SELECT contentId, filePath, description,
                               ROW_NUMBER() OVER (PARTITION BY contentId ORDER BY createDateTime DESC) AS RowNum
                        FROM dbo.MediaFilesTable
                    ) AS ranked
                    WHERE RowNum = 1";


            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("PortalIcerikYonetim");
            Microsoft.Data.SqlClient.SqlDataReader myReader;

            using (Microsoft.Data.SqlClient.SqlConnection myCon = new Microsoft.Data.SqlClient.SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (Microsoft.Data.SqlClient.SqlCommand myCommand = new Microsoft.Data.SqlClient.SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }



        [HttpGet("api/GetFile")]
        public async Task <GetFileDTO> GetFile(int contentId)
        {
            try
            {
                var parameter = new {ContentId = contentId}; 
                string query = "SELECT filePath, fileType FROM dbo.MediaFilesTable WHERE contentId = @ContentId  ORDER BY createDateTime DESC";

                Microsoft.Data.SqlClient.SqlConnectionStringBuilder builder = new Microsoft.Data.SqlClient.SqlConnectionStringBuilder(_configuration.GetConnectionString("PortalIcerikYonetim"));
                using (var conn = new Microsoft.Data.SqlClient.SqlConnection(builder.ConnectionString))
                {
                    conn.Open();

                    return conn.Query<GetFileDTO>(query, parameter).FirstOrDefault();

                    conn.Close();
                }


            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [HttpGet("api/PersonelGirisCikisView")]
        public IActionResult PersonelGirisCikisView()
        {
            string connectionString = _configuration.GetConnectionString("PortalIcerikYonetim");

            string sqlQuery = "SELECT personelNo, Adi, Departman, Tarih, Giris, Cikis, CalismaSuresi FROM PersonelGirisCikisView";

            using (Microsoft.Data.SqlClient.SqlConnection connection = new Microsoft.Data.SqlClient.SqlConnection(connectionString))
            {
                connection.Open();

                using (Microsoft.Data.SqlClient.SqlCommand command = new Microsoft.Data.SqlClient.SqlCommand(sqlQuery, connection))
                {
                    using (Microsoft.Data.SqlClient.SqlDataAdapter dataAdapter = new Microsoft.Data.SqlClient.SqlDataAdapter(command))
                    {
                        DataTable dataTable = new DataTable();
                        dataAdapter.Fill(dataTable);

                        return Ok(dataTable);
                    }
                }
            }
        }

        [HttpGet("api/PersonelDepartman")]
        public IActionResult PersonelGirisCikisDepartmanView()
        {
            string connectionString = _configuration.GetConnectionString("PortalIcerikYonetim");

            string sqlQuery = "SELECT  DISTINCT Departman FROM PersonelGirisCikisView";

            using (Microsoft.Data.SqlClient.SqlConnection connection = new Microsoft.Data.SqlClient.SqlConnection(connectionString))
            {
                connection.Open();

                using (Microsoft.Data.SqlClient.SqlCommand command = new Microsoft.Data.SqlClient.SqlCommand(sqlQuery, connection))
                {
                    using (Microsoft.Data.SqlClient.SqlDataAdapter dataAdapter = new Microsoft.Data.SqlClient.SqlDataAdapter(command))
                    {
                        DataTable dataTable = new DataTable();
                        dataAdapter.Fill(dataTable);

                        return Ok(dataTable);
                    }
                }
            }
        }





    }

}


