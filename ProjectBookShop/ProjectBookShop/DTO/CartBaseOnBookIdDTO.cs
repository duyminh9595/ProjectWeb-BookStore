using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectBookShop.DTO
{
    public class CartBaseOnBookIdDTO
    {
        public int Id { get; set; }
        public DateTime DateOfCreated { get; set; }
        public bool Status { get; set; }
        public DateTime DateOfDisabled { get; set; }
        public string Reason { get; set; }
        public int AdminUserId { get; set; }
        public bool AdminApprove { get; set; }
        public DateTime DateAdminApprove { get; set; }
    }
}
