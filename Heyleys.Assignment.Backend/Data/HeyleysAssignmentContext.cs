using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Heyleys.Assignment.Models;

namespace Heyleys.Assignment.Data
{
    public class HeyleysAssignmentContext : DbContext
    {
        public HeyleysAssignmentContext (DbContextOptions<HeyleysAssignmentContext> options)
            : base(options)
        {
        }

        public DbSet<Heyleys.Assignment.Models.Product> Product { get; set; }

        public DbSet<Heyleys.Assignment.Models.Invoice> Invoice { get; set; }
    }
}
