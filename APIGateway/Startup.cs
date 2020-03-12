namespace APIGateway
{    
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Ocelot.DependencyInjection;
    using Ocelot.Middleware;
    using System;
    using System.Text;
    using Microsoft.IdentityModel.Tokens;
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Serilog;
    using Serilog.Sinks.Elasticsearch;
    using Microsoft.Extensions.Logging;

    public class Startup
    {
        [Obsolete]
        public Startup(IHostingEnvironment env, ILogger<Startup> logger)
        {
            _logger = logger;
            var builder = new Microsoft.Extensions.Configuration.ConfigurationBuilder();
            builder.SetBasePath(env.ContentRootPath)
                   .AddJsonFile("appsettings.json")
                   //add configuration.json
                   .AddJsonFile("configuration.json", optional: false, reloadOnChange: true)
                   .AddEnvironmentVariables();

            Configuration = builder.Build();

            _logger.LogInformation("Inside Gateway after Startup");
        }

        public IConfigurationRoot Configuration { get; }
        private readonly ILogger<Startup> _logger;
        
        public void ConfigureServices(IServiceCollection services)
        {
            var audienceConfig = Configuration.GetSection("Audience");

            var signingKey = Encoding.ASCII.GetBytes(audienceConfig["Secret"]);

            //COnfigure ElasticDb Dlogging
            var elasticUri = Configuration["ElasticConfiguration:Uri"];

            Log.Logger = new LoggerConfiguration()
                .Enrich.FromLogContext()
                .WriteTo.Elasticsearch(new ElasticsearchSinkOptions(new Uri("http://elasticsearch:9200"))
                {
                    AutoRegisterTemplate = true,
                })
            .CreateLogger();
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                     builder => builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader());
            });

            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = "THIS IS USED TO SIGN AND VERIFY JWT TOKENS";
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
           .AddJwtBearer("THIS IS USED TO SIGN AND VERIFY JWT TOKENS",x =>
           {
               x.RequireHttpsMetadata = false;
               x.SaveToken = true;
               x.TokenValidationParameters = new TokenValidationParameters
               {
                   ValidateIssuerSigningKey = true,
                   IssuerSigningKey = new SymmetricSecurityKey(signingKey),
                   ValidateIssuer = false,
                   ValidateAudience = false
               };
           });
            services.AddOcelot(Configuration);

        
        }

        [Obsolete]
        public async void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
             _logger.LogInformation("Inside Gateway Startup Configure");
            app.UseCors("CorsPolicy");
            app.UseAuthentication();
            await app.UseOcelot();
           _logger.LogInformation("After configuring Ocelot Configuration file");
            loggerFactory.AddSerilog();
            

        }
    }
}
