using Microsoft.AspNetCore.Mvc.Filters;

namespace Auth_Identity.Filters
{
    public class ResultFilter : Attribute, IResultFilter
    {
        public void OnResultExecuted(ResultExecutedContext context)
        {
            Console.WriteLine("Bye");
        }

        public void OnResultExecuting(ResultExecutingContext context)
        {
            Console.WriteLine("Hello");
        }
    }
}
