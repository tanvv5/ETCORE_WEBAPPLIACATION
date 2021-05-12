using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ETCORE_WEBAPPLIACATION.ViewModels
{
    public class UserClaimsModelView
    {
        public UserClaimsModelView()
        {
            claims = new List<UserClaim>();
        }
        public string UserId { get; set; }
        public List<UserClaim> claims { get; set; }
    }
}
