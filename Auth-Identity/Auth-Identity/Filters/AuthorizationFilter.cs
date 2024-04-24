using Microsoft.AspNetCore.Mvc.Filters;

namespace Auth_Identity.Filters
{
    public class AuthorizationFilter : Attribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            Console.WriteLine("Authorizing???");
        }
    }
}
