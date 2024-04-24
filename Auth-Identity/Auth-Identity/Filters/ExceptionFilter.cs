using Microsoft.AspNetCore.Mvc.Filters;

namespace Auth_Identity.Filters
{
    public class ExceptionFilter : Attribute, IExceptionFilter
    {
        public void OnException(ExceptionContext context)
        {
            Console.WriteLine("Exception???");
        }
    }
}
