using Microsoft.AspNetCore.Mvc;

namespace VoyogoAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TestController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(new { message = "Backend funcționează!", timestamp = DateTime.Now });
        }

        [HttpGet("data")]
        public IActionResult GetData()
        {
            var data = new[]
            {
                new { id = 1, name = "Destinație 1" },
                new { id = 2, name = "Destinație 2" },
                new { id = 3, name = "Destinație 3" }
            };
            return Ok(data);
        }
    }
}