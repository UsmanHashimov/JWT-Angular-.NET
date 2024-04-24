using Microsoft.AspNetCore.Mvc.Filters;

namespace Auth_Identity.Filters
{
    public class ActionFIlter : Attribute, IActionFilter
    {
        public void OnActionExecuted(ActionExecutedContext context)
        {
            throw new NotImplementedException();
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            throw new NotImplementedException();
        }
    }
}
