using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MyAngular.Helpers;
using MyAngular.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace MyAngular.Services
{

    public interface IUserService
    {
        User Authenticate(string username, string password);
        List<User> GetAll();
    }

    public class UserService : IUserService
    {
        public IConfiguration Configuration { get; }
        // users hardcoded for simplicity, store in a db with hashed passwords in production applications
        private List<User> _users = new List<User>
        {
            new User { Id = 1, Name = "Test", Username = "test", Password = "test" }
        };

        private readonly AppSettings _appSettings;

        public UserService(IOptions<AppSettings> appSettings, IConfiguration configuration)
        {
            _appSettings = appSettings.Value;
            Configuration = configuration;
        }

        public User Authenticate(string username, string password)
        {
            User user = GetAll().SingleOrDefault(x => x.Username == username && x.Password == password);

            // return null if user not found
            if (user == null)
                return null;

            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(Configuration.GetSection("AppSettings")["Secret"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);

            return user;
        }

        public List<User> GetAll()
        {
            List<Models.User> lstUser = new List<Models.User>();
            User test = new User();
            User test1 = new User();
            test.Id = 1;test.Name = "Vijay";test.Password = "password";test.Username = "vijay";
            lstUser.Add(test);
            test1.Id = 2; test1.Name = "Shiv"; test1.Password = "password"; test1.Username = "shiv";
            lstUser.Add(test1);

            //SqlConnection conn = new SqlConnection();
            //DataTable dataTable = new DataTable();
            //conn.ConnectionString = @"Server=tcp:zydusdatabase.database.windows.net,1433;Initial Catalog=Zydus2.0;Persist Security Info=False;User ID=zydusadmin;Password=P@ssw0rd;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";
            //string sqlText = "Select * from mstUser";
            //SqlCommand sqlCmd = new SqlCommand(sqlText, conn);

            //conn.Open();
            //SqlDataAdapter da = new SqlDataAdapter(sqlCmd);
            //da.Fill(dataTable);
            //conn.Close();
            //da.Dispose();

            //for (int i = 0; i < dataTable.Rows.Count; i++)
            //{
            //    Models.User user = new Models.User();
            //    user.Id = Convert.ToInt32(dataTable.Rows[i]["Id"]);
            //    user.Name = dataTable.Rows[i]["Name"].ToString();
            //    user.Password = dataTable.Rows[i]["Password"].ToString();
            //    user.Username = dataTable.Rows[i]["Username"].ToString();
            //    lstUser.Add(user);
            //}
            return lstUser;
        }





    }
}
