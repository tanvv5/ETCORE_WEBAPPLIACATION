using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETCORE_WEBAPPLIACATION.Security
{
    public class SupperAdminHandler : AuthorizationHandler<ManagementAdminRoleAndClaimRequirement>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
            ManagementAdminRoleAndClaimRequirement requirement)
        {

            if (context.User.IsInRole("SupperAdmin"))
            {
                context.Succeed(requirement);
            }
            return Task.CompletedTask;
        }
    }
}
