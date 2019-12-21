using System.ComponentModel.DataAnnotations;

namespace DotNetCoreBack.DataTransmision
{
    public class UserForRegister
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "کلمه عبور بین چهار تا هشت کاراکتر می باشد")]
        public string Password { get; set; }

        [Required]
        public string Gender { get; set; }
    }
}