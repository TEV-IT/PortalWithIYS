using Microsoft.AspNetCore.Mvc;
using PortalProject.models;
using PortalService;
using System;
using System.Net;
using System.Threading.Tasks;

namespace PortalProject.Controllers
{
    [ApiController]
    public class ValidationController : ControllerBase
    {
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

            }
            catch (Exception ex) { }
            return client;
        }

        [HttpPost("api/Validate")]
        public async Task<ActionResult<TEVPortalProjectReturnClass>> ValidateUser(UserData user)
        {
            try
            {
                CallContext callContext = new CallContext();
                callContext.Company = "TV34";
                return GetTEVPortalProjectServicesClient(user.user, user.pass).validateUser(callContext, user.user, user.pass);

            }
            catch (Exception e)
            {
                TEVPortalProjectReturnClass error= new TEVPortalProjectReturnClass();
                error.result = false;
                error.message = e.Message;  

                return StatusCode(400, error);
            }
        }

    }
}
