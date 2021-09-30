using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Heyleys.Assignment.Models
{
    public class Invoice : FullAuditedEntity<Guid>
    {
        public string InvoiceNumber { get; set; }
        public string CustomerName { get; set; }
        public DateTime TransactionDate { get; set; }
        public Guid ProductId { get; set; }
        public decimal Discount { get; set; }
        public int Quantity { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal Balance { get; set; }
    }
}
