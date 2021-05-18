using ETCORE_WEBAPPLIACATION.Data;
using ETCORE_WEBAPPLIACATION.Models;
using ETCORE_WEBAPPLIACATION.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETCORE_WEBAPPLIACATION
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();
            services.AddMvc(option =>
            {
                var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
                option.Filters.Add(new AuthorizeFilter(policy));
            }).AddXmlSerializerFormatters();
            //add scop cho cho toàn bộ dùng entity 
            services.AddScoped<IProductsRepository, SQLProductsRespository>();
            services.AddDbContextPool<AppDbContext>(option => option.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            //add indentity này là mình thêm thuộc tính có sẵn của net core thì phải add thêm ở đây IdentityRole
            services.AddIdentity<ApplicationUser, IdentityRole>().AddEntityFrameworkStores<AppDbContext>();
            //add policy cho trường hợp claim
            services.AddAuthorization(option =>
            {
                option.AddPolicy("DeleteRolePolicy", policy => policy.RequireClaim("Delete Role"));
                //điều kiện hoặc là claim Edit Role and là User có Role Admin
                //option.AddPolicy("EditRolePolicy", policy => policy.RequireClaim("Edit Role")
                //                                            .RequireRole("Admin"));
                //custome policy với nhiều điều kiện and hoặc or ở đây
                //option.AddPolicy("EditRolePolicy", policy => policy.RequireAssertion(context =>
                //    context.User.IsInRole("Admin") &&
                //    context.User.HasClaim(claim => claim.Type == "Edit Role"
                //    || context.User.IsInRole("SupperAdmin"))
                //));
                //requite ment custome
                option.AddPolicy("EditRolePolicy", policy => policy.AddRequirements(new ManagementAdminRoleAndClaimRequirement()));
                option.AddPolicy("CreateRolePolicy", policy => policy.RequireClaim("Create Role"));
                option.AddPolicy("AdminRolePolicy", policy => policy.RequireRole("Admin"));
            }
            );
            //thay đôi rooter của acessdenied mặc định về router mình cần
            services.ConfigureApplicationCookie(option =>
            {
                option.AccessDeniedPath = new PathString("/Administrator/AccessDenied");
            });
            services.AddSingleton<IAuthorizationHandler, CanEditOnlyAdminRoleAndClaimHandler>();
            //add login by google authorization
            services.AddAuthentication()
                .AddGoogle(option =>
                {
                    option.ClientId = "227744340290-ue3ogjpdpm54lgbsokcb6q5mrhgak5lc.apps.googleusercontent.com";
                    option.ClientSecret = "8LYDtumzrlXgJkGWQDFNnFHZ";
                });
            //add scopt moi
            services.AddScoped<UserRespository>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILogger<Startup> logger)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                //Lỗi exception ở bất kỳ controller nào ghi: tạo trang bug lỗi bao gồm 3 thông số: path, exceptionMessage, StackTrace
                app.UseExceptionHandler("/Error");
                //Lỗi không tìm thấy đường dẫn trong hệ thống                
                app.UseStatusCodePagesWithReExecute("/Error/{0}");
            }

            app.UseStaticFiles();

            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Account}/{action=Index}/{id?}");
            });
        }
    }
}
