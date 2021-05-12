using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ETCORE_WEBAPPLIACATION.Ultilities
{
    //dùng để customer validate trên form sử dụng remote dataanomotion
    public class ValidEmailDomainAttribute :ValidationAttribute
    {
        private readonly string _alowdomain;
        public ValidEmailDomainAttribute(string alowdomain)
        {
            _alowdomain = alowdomain;
        }
        public override bool IsValid(object value)
        {
            //custome validate ở đây lấy giá trị truyền vào từ form để custome validate
            if (!string.IsNullOrEmpty(value.ToString()))
            {
                string[] domainvalid = value.ToString().Split("@");
                return domainvalid[0].ToUpper() == _alowdomain.ToUpper();
            }
            return base.IsValid(value);
        }
    }
}
