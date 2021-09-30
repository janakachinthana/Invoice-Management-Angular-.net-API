using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Heyleys.Assignment.Models
{
    public class Product : FullAuditedEntity<Guid>
    {
        public string Code { get; set; }
        public string ProductName { get; set; }
        public string Category { get; set; }
        public string Description { get; set; }
        public string CostPrice { get; set; }
        public string SellingPrice { get; set; }
        public string Quantity { get; set; }
    }
}
