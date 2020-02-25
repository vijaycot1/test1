using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;


namespace MyAngular.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        //List<Models.User> lstUser = new List<Models.User>();
        //public SqlConnection conn = new SqlConnection();
        //private DataTable dataTable = new DataTable();
        // GET api/values



        [HttpGet]
        public ActionResult<IEnumerable<String>> Get()
        {

            return new string[] { "testchange", "value2" };
            
            //conn.ConnectionString = @"Server=tcp:devfrontline.database.windows.net,1433;Initial Catalog=Frontline;Persist Security Info=False;User ID=vijay;Password=P@ssw0rd;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";
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

            // return lstUser;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "value1";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
