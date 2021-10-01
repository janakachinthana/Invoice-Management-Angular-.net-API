using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Heyleys.Assignment.Data;
using Heyleys.Assignment.Models;

namespace Heyleys.Assignment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoiceProductsController : ControllerBase
    {
        private readonly HeyleysAssignmentContext _context;

        public InvoiceProductsController(HeyleysAssignmentContext context)
        {
            _context = context;
        }

        // GET: api/InvoiceProducts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<InvoiceProduct>>> GetInvoiceProduct()
        {
            return await _context.InvoiceProduct.ToListAsync();
        }

        // GET: api/InvoiceProducts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<InvoiceProduct>> GetInvoiceProduct(Guid id)
        {
            var invoiceProduct = await _context.InvoiceProduct.FindAsync(id);

            if (invoiceProduct == null)
            {
                return NotFound();
            }

            return invoiceProduct;
        }

        // PUT: api/InvoiceProducts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutInvoiceProduct(Guid id, InvoiceProduct invoiceProduct)
        {
            if (id != invoiceProduct.Id)
            {
                return BadRequest();
            }

            _context.Entry(invoiceProduct).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InvoiceProductExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/InvoiceProducts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<InvoiceProduct>> PostInvoiceProduct(InvoiceProduct invoiceProduct)
        {
            _context.InvoiceProduct.Add(invoiceProduct);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetInvoiceProduct", new { id = invoiceProduct.Id }, invoiceProduct);
        }

        // DELETE: api/InvoiceProducts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInvoiceProduct(Guid id)
        {
            var invoiceProduct = await _context.InvoiceProduct.FindAsync(id);
            if (invoiceProduct == null)
            {
                return NotFound();
            }

            _context.InvoiceProduct.Remove(invoiceProduct);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool InvoiceProductExists(Guid id)
        {
            return _context.InvoiceProduct.Any(e => e.Id == id);
        }
    }
}
