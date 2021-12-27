using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectBookShop.DTO
{
    public class Top5ThangDTO
    {
        public int UserId { get; set; }
        public string UserEmail { get; set; }
        public string UserName { get; set; }
        public int IdHoaDonGanNhat { get; set; }
        public string NgayHoaDonGanNhat { get; set; }
        public float TongTienTrongThang { get; set; }
        public string ImageUrl { get; set; }
    }
}
