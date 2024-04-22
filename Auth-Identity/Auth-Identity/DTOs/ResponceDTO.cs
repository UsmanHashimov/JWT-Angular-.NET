namespace Auth_Identity.DTOs
{
    public class ResponceDTO
    {
        public int StatusCode { get; set; }
        public string Message { get; set; }
        public bool isSuccess { get; set; } = false;
    }
}
