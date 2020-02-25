using System;
using System.Collections.Generic;

using Microsoft.AspNetCore.Mvc;
using MyAngular.Services;
using MyAngular.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;

namespace MyAngular.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        public LoginContext _loginContext;
        public IUserService _userService;
        private readonly ILogger<LoginController> _logger;
        public LoginController(IUserService userService,ILogger<LoginController> logger)
        {
           // _loginContext = loginContext;
            _userService = userService;
            _logger = logger;
            _logger.LogInformation("I am Vijay, Vijay Pandey...");
        }
        
        List<Models.User> lstUser = new List<Models.User>();
        
        // GET api/values
        [HttpGet, Authorize]
        public ActionResult<IEnumerable<Models.User>> Get()
        {

            List<User> user = _userService.GetAll();
            return user;
        }

        [AllowAnonymous]
        [HttpPost]
        public ActionResult<IEnumerable<Models.User>> Authenticate([FromBody] Models.Authenticate model)
        {
            User user = _userService.Authenticate(model.UserName,model.Password);
            _logger.LogInformation("Hey Logged by Vijay");
            if (user == null)
                return BadRequest(new { message = "UserName Not Found!!!" });

            return Ok(user);
        }

    }
}