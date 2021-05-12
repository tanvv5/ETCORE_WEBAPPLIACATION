﻿using System;
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
            //var authFilterContext = context.Resource as AuthorizationFilterContext;
            //if (authFilterContext == null)
            //{
            //    return Task.CompletedTask;
            //}
            //string loggedInAdminId = context.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;
            //string adminIdbeginEdited = authFilterContext.HttpContext.Request.Query["userId"];

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
