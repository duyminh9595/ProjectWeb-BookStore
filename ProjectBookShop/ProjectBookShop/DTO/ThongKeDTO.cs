using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectBookShop.DTO
{
    public class ThongKeDTO
    {
        public List<TheLoaiTrongThangDTO> theLoais { get; set; }
        public List<NxbTrongThangDTO> nxbs { get; set; }
    }
}
