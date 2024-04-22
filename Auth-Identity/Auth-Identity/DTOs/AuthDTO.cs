namespace Auth_Identity.DTOs
{
    public class AuthDTO
    {
        public string? Token { get; set; }
        public string? Message { get; set; }
        public int StatusCode { get; set; }
        public bool isSuccess { get; set; } = false;
    }
}
