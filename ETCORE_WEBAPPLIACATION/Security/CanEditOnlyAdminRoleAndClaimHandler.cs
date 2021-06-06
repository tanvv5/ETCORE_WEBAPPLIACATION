using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Filters;

namespace ETCORE_WEBAPPLIACATION.Security
{
    public class CanEditOnlyAdminRoleAndClaimHandler : AuthorizationHandler<ManagementAdminRoleAndClaimRequirement>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
            ManagementAdminRoleAndClaimRequirement requirement)
        {
            if ((context.User.IsInRole("Admin")
                && context.User.HasClaim(claim => claim.Type == "Edit Role"))
                || context.User.IsInRole("SupperAdmin")
               )
            {
                context.Succeed(requirement);
            }
            else
            {
                context.Fail();
            }
            return Task.CompletedTask;
        }
    }
}
