using ETCORE_WEBAPPLIACATION.Models;
using ETCORE_WEBAPPLIACATION.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Claims;

namespace ETCORE_WEBAPPLIACATION.Controllers
{
    [Authorize]
    public class AccountController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private UserManager<ApplicationUser> _userManager;
        private SignInManager<ApplicationUser> _signInManager;
        [Obsolete]
        private readonly IHostingEnvironment _hostingEnvironment1;

        [Obsolete]
        public AccountController(ILogger<HomeController> logger, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IHostingEnvironment hostingEnvironment)
        {
            _logger = logger;
            _userManager = userManager;
            _signInManager = signInManager;
            _hostingEnvironment1 = hostingEnvironment;
        }
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult> Index()
        {
            var listuser = await _userManager.Users.ToListAsync();
            ViewData["Listuser"] = listuser;
            return View();
        }
        // GET: AccountController
        [HttpGet]
        [AllowAnonymous]
        public ActionResult Register()
        {
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        [Obsolete]
        public async Task<ActionResult> Register(RegisterViewModel registerViewModel)
        {
            if (ModelState.IsValid)
            {
                string UniqueFilename = null;
                if (registerViewModel.image != null)
                {
                    string uploadFodel = Path.Combine(_hostingEnvironment1.WebRootPath + "\\images\\Avarta");
                    UniqueFilename = Guid.NewGuid().ToString() + "_" + registerViewModel.image.FileName;
                    string filepath = Path.Combine(uploadFodel + "\\" + UniqueFilename);
                    registerViewModel.image.CopyTo(new FileStream(filepath, FileMode.Create));
                }
                var user = new ApplicationUser { UserName = registerViewModel.Email, Email = registerViewModel.Email, Avartar = "\\images\\Avarta\\" + UniqueFilename };
                var result = _userManager.CreateAsync(user, registerViewModel.Password);
                if (result.Result.Succeeded)
                {
                    if (_signInManager.IsSignedIn(User) && User.IsInRole("Admin"))
                    {
                        return RedirectToAction("ListUser", "Administrator");
                    }
                    await _signInManager.SignInAsync(user, isPersistent: false);
                    return RedirectToAction("Index", "Home");
                }
                foreach (var error in result.Result.Errors)
                {
                    ModelState.AddModelError("", error.Description);
                }
            }
            return View(registerViewModel);
        }
        [HttpPost]
        public async Task<ActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return RedirectToAction("Index", "Home");
        }
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> Login(string returnUrl = "")
        {
            LoginViewModel loginViewModel = new LoginViewModel
            {
                ReturnUrl = returnUrl,
                ExternalLogins = (await _signInManager.GetExternalAuthenticationSchemesAsync()).ToList()
            };
            return View(loginViewModel);
        }
        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult> Login(LoginViewModel model, string returnUrl)
        {
            if (ModelState.IsValid)
            {
                var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, false);
                if (result.Succeeded)
                {
                    if (!string.IsNullOrEmpty(returnUrl))
                    {
                        return Redirect(returnUrl);
                        //nếu trên môi trường Production thì dùng
                        //return LocalRedirect(returnUrl);
                    }
                    return RedirectToAction("Index", "Home");
                }
                ModelState.AddModelError("", "Invalid Login Attempt");
            }
            return View(model);
        }
        [AllowAnonymous]
        [AcceptVerbs("Get", "Post")]
        public async Task<ActionResult> IsvalidEmail(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return Json(true);
            }
            else
            {
                return Json($"Email {email} is Registed");
            }
        }
        [HttpGet]
        public async Task<ActionResult> Edit(string id)
        {
            ApplicationUserEditModel useredit1 = new ApplicationUserEditModel();
            var user1 = await _userManager.FindByIdAsync(id ?? "");
            useredit1.Avartar = user1.Avartar;
            useredit1.Email = user1.Email;
            useredit1.Depathment = user1.Depathment;

            if (user1 == null)
            {
                Response.StatusCode = 404;
                return View("NotFound");
            }
            return View(useredit1);
        }
        [HttpPost]
        [Obsolete]
        public async Task<ActionResult> Edit(ApplicationUserEditModel _user)
        {
            if (ModelState.IsValid)
            {
                var ueredit = await _userManager.FindByIdAsync(_user.Id);
                string fullnamefile = NewMethodProcessImage(_user);
                string FilepathOld = ueredit.Avartar;
                if (fullnamefile != null)
                {
                    ueredit.Avartar = fullnamefile;
                    ueredit.Depathment = _user.Depathment;
                }

                var result = await _userManager.UpdateAsync(ueredit);
                if (result.Succeeded)
                {
                    //xóa file cũ
                    if (_user.Avartar != null)
                    {
                        string oldPath = Path.Combine(_hostingEnvironment1.WebRootPath + FilepathOld);
                        System.IO.File.Delete(oldPath);
                    }
                    return RedirectToAction("Index", "Account");
                }
                else
                {
                    ModelState.AddModelError("", "Invalid Login Attempt");
                }
            }
            return View(_user);
        }

        [Obsolete]
        private string NewMethodProcessImage(ApplicationUserEditModel _user1)
        {
            string UniqueFilename = null;
            if (_user1.image != null)
            {
                string uploadFodel = Path.Combine(_hostingEnvironment1.WebRootPath + "\\images\\Avarta");
                UniqueFilename = Guid.NewGuid().ToString() + "_" + _user1.image.FileName;
                string filepath = Path.Combine(uploadFodel + "\\" + UniqueFilename);
                _user1.image.CopyTo(new FileStream(filepath, FileMode.Create));
            }

            return "\\images\\Avarta\\" + UniqueFilename;
        }
        [HttpPost]
        [AllowAnonymous]
        public IActionResult ExternalLogin(string provider, string returnUrl)
        {
            var redirectUrl = Url.Action("ExtenelLoginCallback", "Account", new { ReturnUrl = returnUrl });
            var properties = _signInManager.ConfigureExternalAuthenticationProperties(provider, redirectUrl);
            return new ChallengeResult(provider, properties);
        }
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> ExtenelLoginCallback(string returnUrl = null, string ErrorRemote = null)
        {
            returnUrl = returnUrl ?? Url.Content("~/");
            LoginViewModel loginViewModel = new LoginViewModel
            {
                ReturnUrl = returnUrl,
                ExternalLogins = (await _signInManager.GetExternalAuthenticationSchemesAsync()).ToList()
            };
            if (ErrorRemote != null)
            {
                ModelState.AddModelError(string.Empty, $"Error from External provider: {ErrorRemote}");
                return View("Login", loginViewModel);
            }
            var info = await _signInManager.GetExternalLoginInfoAsync();
            if (info == null)
            {
                ModelState.AddModelError(string.Empty, $"Error Loading External login infomation");
                return View("Login", loginViewModel);
            }
            var signInResult = await _signInManager.ExternalLoginSignInAsync(info.LoginProvider, info.ProviderKey
                , isPersistent: false, bypassTwoFactor: true);
            if (signInResult.Succeeded)
            {
                return LocalRedirect(returnUrl);
            }
            else
            {
                //lấy thông tin email mà người dùng nhập để login nếu chưa có thì tạo 1 tài khoản luôn, nhưng password trống
                //người dùng sẽ có 1 chức năng khác đổi pass hoặc lần sau sẽ phải đăng nhập bằng google tiếp thôi
                var email = info.Principal.FindFirstValue(ClaimTypes.Email);
                if (email != null)
                {
                    var user = await _userManager.FindByEmailAsync(email);
                    if (user == null)
                    {
                        user = new ApplicationUser
                        {
                            UserName = email,
                            Email = email
                        };
                        await _userManager.CreateAsync(user);
                    }
                    await _userManager.AddLoginAsync(user, info);
                    await _signInManager.SignInAsync(user, isPersistent: false);
                    //đăng nhập hệ thống
                    return LocalRedirect(returnUrl);
                }
                ViewBag.ErrorTitle = "";
                ViewBag.ErrorMessage = "Please contact support via email tan.hondacuoi@gmail.com";
                return View("Error");
            }
        }
    }
}
