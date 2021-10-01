using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Heyleys.Assignment.Models
{
    public class InvoiceProduct : FullAuditedEntity<Guid>
    {
        public Guid InvoiceId { get; set; }
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal LineTotal { get; set; }
    }
}
