using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyAngular.Models
{
    public class User
    {
 //       [Id] INT NOT NULL PRIMARY KEY,
	//[Name] Varchar(50),
	//[Password] VARCHAR(50),
	//[Username]
 //       VARCHAR(20)
        public int Id { get; set; }
        public String Name { get; set; }
        public String Password { get; set; }
        public String Username { get; set; }
        public string Token { get;set; }
    }
}
