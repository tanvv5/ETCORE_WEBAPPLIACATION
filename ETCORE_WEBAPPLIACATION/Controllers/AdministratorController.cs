using ETCORE_WEBAPPLIACATION.Models;
using ETCORE_WEBAPPLIACATION.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ETCORE_WEBAPPLIACATION.Controllers
{
    //[Authorize(Roles = "Admin,SupperAdmin")]
    [Authorize()]
    public class AdministratorController : Controller
    {
        private readonly RoleManager<IdentityRole> _roleManager1;
        private readonly UserManager<ApplicationUser> userManager;

        public AdministratorController(RoleManager<IdentityRole> roleManager, UserManager<ApplicationUser> userManager)
        {
            this._roleManager1 = roleManager;
            this.userManager = userManager;
        }
        [HttpGet]
        public IActionResult IndexRole()
        {
            var roles = _roleManager1.Roles;
            return View(roles);
        }
        [HttpGet]
        public IActionResult CreateRole()
        {
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> CreateRole(CreateRoleViewModel createRoleViewModel)
        {
            if (ModelState.IsValid)
            {
                IdentityRole identityRole = new IdentityRole
                {
                    Name = createRoleViewModel.RoleName
                };
                var result = await _roleManager1.CreateAsync(identityRole);
                if (result.Succeeded)
                {
                    return RedirectToAction("IndexRole", "Administrator");
                }
                else
                {
                    foreach (var error in result.Errors)
                    {
                        ModelState.AddModelError("", error.Description);
                    }
                }
            }
            return View();
        }
        [HttpGet]
        public async Task<ActionResult> EditRole(string id)
        {
            var role = await _roleManager1.FindByIdAsync(id ?? "");
            if (role == null)
            {
                ViewBag.ErrorMessage = $"Role with id = {id} can not found";
                return View("NotFound");
            }
            EditRoleViewModel roleedit1 = new EditRoleViewModel();
            roleedit1.RoleName = role.Name;
            roleedit1.Id = role.Id;
            foreach (var user in userManager.Users.ToList())
            {
                if (await userManager.IsInRoleAsync(user, role.Name))
                {
                    roleedit1.Users.Add(user.UserName);
                }
            }
            return View(roleedit1);
        }
        [HttpPost]
        public async Task<IActionResult> EditRole(EditRoleViewModel editRoleViewModel)
        {
            var role = await _roleManager1.FindByIdAsync(editRoleViewModel.Id ?? "");
            if (role == null)
            {
                ViewBag.ErrorMessage = $"Role with id = {editRoleViewModel.Id} can not found";
                return View("NotFound");
            }
            else
            {
                role.Name = editRoleViewModel.RoleName;
                var result = await _roleManager1.UpdateAsync(role);
                if (result.Succeeded)
                {
                    return RedirectToAction("IndexRole", "Administrator");
                }
                else
                {
                    foreach (var error in result.Errors)
                    {
                        ModelState.AddModelError("", error.Description);
                    }
                }
            }
            return View(editRoleViewModel);
        }
        [HttpGet]
        public async Task<ActionResult> EditUserRole(string Roleid)
        {
            ViewBag.roleId = Roleid;
            var role = await _roleManager1.FindByIdAsync(Roleid ?? "");
            if (role == null)
            {
                ViewBag.ErrorMessage = $"Role with id = {Roleid} can not found";
                return View("NotFound");
            }
            var model = new List<UserRoleViewModel>();
            foreach (var user in userManager.Users.ToList())
            {
                UserRoleViewModel userRoleViewModel = new UserRoleViewModel()
                {
                    UserId = user.Id,
                    UserName = user.UserName
                };
                userRoleViewModel.RoleId = Roleid;

                if (await userManager.IsInRoleAsync(user, role.Name))
                {
                    userRoleViewModel.IsSelected = true;
                }
                else
                {
                    userRoleViewModel.IsSelected = false;
                }
                model.Add(userRoleViewModel);
            }
            return View(model);
        }
        [HttpPost]
        public async Task<ActionResult> EditUserRole(List<UserRoleViewModel> model, string roleId)
        {
            var role = await _roleManager1.FindByIdAsync(roleId ?? "");
            if (role == null)
            {
                ViewBag.ErrorMessage = $"Role with id = {roleId} can not found";
                return View("NotFound");
            }
            var lastitem = model.Last();
            foreach (var userrole in model)
            {
                IdentityResult result;
                var user = await userManager.FindByIdAsync(userrole.UserId);
                if (userrole.IsSelected && !(await userManager.IsInRoleAsync(user, role.Name)))
                {
                    result = await userManager.AddToRoleAsync(user, role.Name);
                }
                else if (!userrole.IsSelected && (await userManager.IsInRoleAsync(user, role.Name)))
                {
                    result = await userManager.RemoveFromRoleAsync(user, role.Name);
                }
                else
                {
                    continue;
                }
                if (result.Succeeded)
                {
                    if (!lastitem.Equals(userrole))
                    {
                        continue;
                    }
                    else
                    {
                        return RedirectToAction("EditRole", new { id = roleId });
                    }
                }
            }
            return RedirectToAction("EditRole", new { id = roleId });
        }
        [HttpGet]
        public IActionResult ListUser()
        {
            var roles = userManager.Users.ToList();
            return View(roles);
        }
        [HttpGet]
        //[Authorize(Policy = "EditRolePolicy")]
        public async Task<ActionResult> EditUser(string id)
        {
            ViewBag.roleId = id;
            var useredit = await userManager.FindByIdAsync(id ?? "");
            if (useredit == null)
            {
                ViewBag.ErrorMessage = $"useredit with id = {useredit} can not found";
                return View("NotFound");
            }
            var userroles = await userManager.GetRolesAsync(useredit);
            var userclaims = await userManager.GetClaimsAsync(useredit);
            var model = new EditUserViewModel
            {
                Id = useredit.Id,
                UserName = useredit.UserName,
                Email = useredit.Email,
                Avartar = useredit.Avartar,
                Roles = userroles.ToList(),
                Depathment = useredit.Depathment,
                Claims = userclaims.Select(c => c.Value).ToList()
            };
            return View(model);
        }
        [HttpPost]
        public async Task<ActionResult> EditUser(EditUserViewModel _user)
        {
            if (ModelState.IsValid)
            {
                var ueredit = await userManager.FindByIdAsync(_user.Id);
                if (ueredit == null)
                {
                    ViewBag.ErrorMessage = $"useredit with id = {ueredit} can not found";
                    return View("NotFound");
                }
                ueredit.Depathment = _user.Depathment;
                ueredit.Email = _user.Email;
                ueredit.UserName = _user.UserName;
                var result = await userManager.UpdateAsync(ueredit);
                if (result.Succeeded)
                {
                    return RedirectToAction("ListUser", "Administrator");
                }
                else
                {
                    ModelState.AddModelError("", "Invalid Login Attempt");
                }
            }
            return View(_user);
        }
        [HttpPost]
        [Authorize(Policy = "DeleteRolePolicy")]
        public async Task<ActionResult> DeleteUser(String id)
        {
            var user = await userManager.FindByIdAsync(id);
            if (user == null)
            {
                ViewBag.ErrorMessage = $"user with id = {id} can not found";
                return View("NotFound");
            }
            else
            {
                var result = await userManager.DeleteAsync(user);
                if (result.Succeeded)
                {
                    return RedirectToAction("ListUser", "Administrator");
                }
                foreach (var e in result.Errors)
                {
                    ModelState.AddModelError("", "Invalid Login Attempt");
                }
            }
            return View("ListUser");
        }
        [HttpGet]
        [Authorize(Policy = "EditRolePolicy")]
        public async Task<ActionResult> ManagementRole(string UserId)
        {
            ViewBag.UserId = UserId;
            var userm = await userManager.FindByIdAsync(UserId ?? "");
            if (userm == null)
            {
                ViewBag.ErrorMessage = $"user with id = {UserId} can not found";
                return View("NotFound");
            }

            var model = new List<UserRolesViewModel>();
            foreach (var role in _roleManager1.Roles.ToList())
            {
                var userRolesViewModel = new UserRolesViewModel
                {
                    RoleId = role.Id,
                    RoleName = role.Name
                };
                if (await userManager.IsInRoleAsync(userm, role.Name))
                {
                    userRolesViewModel.IsSelected = true;
                }
                else
                {
                    userRolesViewModel.IsSelected = false;
                }
                model.Add(userRolesViewModel);
            };
            return View(model);
        }
        [HttpPost]
        [Authorize(Policy = "EditRolePolicy")]
        public async Task<ActionResult> ManagementRole(List<UserRolesViewModel> userRolesViewModel, string UserId)
        {
            if (ModelState.IsValid)
            {
                var uereaddrole = await userManager.FindByIdAsync(UserId);
                if (uereaddrole == null)
                {
                    ViewBag.ErrorMessage = $"useredit with id = {uereaddrole} can not found";
                    return View("NotFound");
                }
                //xóa toàn bộ role của user cũ
                var roles = await userManager.GetRolesAsync(uereaddrole);
                var result = await userManager.RemoveFromRolesAsync(uereaddrole, roles);
                if (!result.Succeeded)
                {
                    ModelState.AddModelError("", "Cannot remove user existing roles");
                    return View(userRolesViewModel);
                }
                //cập nhật lại các role được chọn
                result = await userManager.AddToRolesAsync(uereaddrole, userRolesViewModel.Where(x => x.IsSelected == true).Select(y => y.RoleName));
                if (!result.Succeeded)
                {
                    ModelState.AddModelError("", "Cannot add selected roles to user");
                    return View(userRolesViewModel);
                }
                return RedirectToAction("EditUser", "Administrator", new { Id = UserId });
            }
            return View(userRolesViewModel);
        }

        [HttpGet]
        public async Task<ActionResult> ManagementClaim(string UserId)
        {
            ViewBag.UserId = UserId;
            var userm = await userManager.FindByIdAsync(UserId ?? "");
            if (userm == null)
            {
                ViewBag.ErrorMessage = $"user with id = {UserId} can not found";
                return View("NotFound");
            }

            var existingUserClaims = await userManager.GetClaimsAsync(userm);
            var model = new UserClaimsModelView
            {
                UserId= userm.Id
            };
            foreach (Claim claim in ClaimsStore.AllClaims)
            {
                var userClaim = new UserClaim
                {
                    claimType = claim.Type
                };
                if (existingUserClaims.Any(c=>c.Type==claim.Type))
                {
                    userClaim.IsSelected = true;
                }
                else
                {
                    userClaim.IsSelected = false;
                }
                model.claims.Add(userClaim);
            };
            return View(model);
        }
        [HttpPost]
        public async Task<ActionResult> ManagementClaim(UserClaimsModelView userClaimsModelView)
        {
            if (ModelState.IsValid)
            {
                var uereadclaim = await userManager.FindByIdAsync(userClaimsModelView.UserId);
                if (uereadclaim == null)
                {
                    ViewBag.ErrorMessage = $"User with id = {userClaimsModelView.UserId} can not found";
                    return View("NotFound");
                }
                //xóa toàn bộ Claim của user cũ
                var claims = await userManager.GetClaimsAsync(uereadclaim);
                var result = await userManager.RemoveClaimsAsync(uereadclaim, claims);
                if (!result.Succeeded)
                {
                    ModelState.AddModelError("", "Cannot remove user existing Claim");
                    return View(userClaimsModelView);
                }

                //cập nhật lại các Claim được chọn
                result = await userManager.AddClaimsAsync(uereadclaim, userClaimsModelView.claims.Where(x => x.IsSelected == true).Select(y => new Claim(y.claimType,y.claimType)));
                if (!result.Succeeded)
                {
                    ModelState.AddModelError("", "Cannot add selected roles to user");
                    return View(userClaimsModelView);
                }
                return RedirectToAction("EditUser", "Administrator", new { Id = userClaimsModelView.UserId });
            }
            return View(userClaimsModelView);
        }
        [HttpGet]
        [AllowAnonymous]
        public ActionResult AccessDenied()
        {
            return View();
        }
    }
}
