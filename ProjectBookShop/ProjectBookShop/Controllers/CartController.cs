using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectBookShop.DTO;
using ProjectBookShop.Entities;
using ProjectBookShop.Helpers;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectBookShop.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/cart")]
    public class CartController: ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public CartController(ApplicationDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }
        //get list of cart of user
        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "User,Admin")]
        public async Task<ActionResult>GetAllCart([FromHeader] string email, [FromQuery] PaginationDTO pagination)
        {
            var handler = new JwtSecurityTokenHandler();
            string authHeader = Request.Headers["Authorization"];
            authHeader = authHeader.Replace("Bearer ", "");
            var jsonToken = handler.ReadToken(authHeader);
            var tokenS = handler.ReadToken(authHeader) as JwtSecurityToken;
            var emailInToken = tokenS.Claims.First(claim => claim.Type == "email").Value;
            var idInToken = tokenS.Claims.First(claim => claim.Type == "unique_name").Value;
            var userInfo = await context.Customer.FirstOrDefaultAsync(x => (x.Email == emailInToken && x.Status == true));
            if (email == emailInToken && userInfo!=null)
            {
                var queryable = context.Cart.AsQueryable().Where(s => s.CustomerId == Int32.Parse(idInToken));
                await HttpContext.InsertPaginationParametersInResponse(queryable, Int32.MaxValue);
                var carts = await queryable.OrderByDescending(x=>x.DateOfCreated).Paginate(pagination).ToListAsync();
                var cartsDTO = mapper.Map<List<ListCartDTO>>(carts);
                var coupons = await context.CouponDiscount.ToListAsync();
                foreach (var item in cartsDTO)
                {
                    item.PercentDiscount=coupons.FirstOrDefault(x => x.Id == item.CouponDiscountId).PercenDiscount;
                }
                return Ok(cartsDTO);
            }
            else
                return BadRequest("Email không trùng với Email trong Token");
        }
        //get list of cart of admin
        [HttpGet("admin")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
        public async Task<ActionResult> GetAllCartByAdmin([FromHeader] string email, [FromQuery] PaginationDTO pagination)
        {
            var handler = new JwtSecurityTokenHandler();
            string authHeader = Request.Headers["Authorization"];
            authHeader = authHeader.Replace("Bearer ", "");
            var jsonToken = handler.ReadToken(authHeader);
            var tokenS = handler.ReadToken(authHeader) as JwtSecurityToken;
            var emailInToken = tokenS.Claims.First(claim => claim.Type == "email").Value;
            var idInToken = tokenS.Claims.First(claim => claim.Type == "unique_name").Value;
            var userInfo = await context.Customer.FirstOrDefaultAsync(x => (x.Email == emailInToken && x.Status == true));
            if (email == emailInToken && userInfo != null)
            {
                var queryable = context.Cart.AsQueryable();
                await HttpContext.InsertPaginationParametersInResponse(queryable, pagination.RecordsPerPage);
                var carts = await queryable.Paginate(pagination).ToListAsync();
                var cartsDTO = mapper.Map<List<ListCartDTO>>(carts);
                return Ok(cartsDTO);
            }
            else
                return BadRequest();
        }
        //get cart by id by admin
        [HttpGet("admin/{id:int}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
        public async Task<ActionResult<CreateCartSuccessDTO>> GetCartByIdByAdmin([FromQuery] PaginationDTO pagination, int id)
        {
            var queryablecart = context.Cart.AsQueryable().Where(s => s.Id == id);
            await HttpContext.InsertPaginationParametersInResponse(queryablecart, Int32.MaxValue);

            var carts = await queryablecart.OrderByDescending(x => x.DateOfCreated).Paginate(pagination).ToListAsync();
            var cartsDTO = mapper.Map<List<ListCartDTO>>(carts);
            var coupons = await context.CouponDiscount.ToListAsync();
            foreach (var item in cartsDTO)
            {
                item.PercentDiscount = coupons.FirstOrDefault(x => x.Id == item.CouponDiscountId).PercenDiscount;
            }
            return Ok(cartsDTO);

        }
        //get cart by id by admin
        [HttpGet("find/{id:int}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
        public async Task<ActionResult<List<CartOnAdminUIDTO>>> SearchGetCartByIdByAdmin([FromQuery] PaginationDTO pagination, int id)
        {
            var carts = await context.Cart.Where(x=>x.Id==id).ToListAsync();
            List<CartOnAdminUIDTO> cartOnAdminUIDTOs = new List<CartOnAdminUIDTO>();
            foreach (var item in carts)
            {
                CartOnAdminUIDTO cartOnAdminUIDTO = new CartOnAdminUIDTO();
                cartOnAdminUIDTO.admin_approve = item.AdminApprove;
                cartOnAdminUIDTO.date_created = item.DateOfCreated.ToString();
                cartOnAdminUIDTO.id = item.Id;
                cartOnAdminUIDTO.status = item.Status;
                cartOnAdminUIDTO.admin_approve_id = item.AdminUserId;
                cartOnAdminUIDTOs.Add(cartOnAdminUIDTO);
            }
            cartOnAdminUIDTOs.Sort((x, y) => y.date_created.CompareTo(x.date_created));
            return cartOnAdminUIDTOs;
        }
        //get cart by id by admin
        [HttpGet("getcartbaseoncoupon")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
        public async Task<ActionResult<List<CartOnAdminUIDTO>>> SearchGetCartByCouponIdByAdmin([FromQuery] PaginationDTO pagination, int coupon)
        {
            var carts = await context.Cart.Where(x => x.CouponDiscountId == coupon).ToListAsync();
            List<CartOnAdminUIDTO> cartOnAdminUIDTOs = new List<CartOnAdminUIDTO>();
            foreach (var item in carts)
            {
                CartOnAdminUIDTO cartOnAdminUIDTO = new CartOnAdminUIDTO();
                cartOnAdminUIDTO.admin_approve = item.AdminApprove;
                cartOnAdminUIDTO.date_created = item.DateOfCreated.ToString();
                cartOnAdminUIDTO.id = item.Id;
                cartOnAdminUIDTO.status = item.Status;
                cartOnAdminUIDTO.admin_approve_id = item.AdminUserId;
                cartOnAdminUIDTOs.Add(cartOnAdminUIDTO);
            }
            cartOnAdminUIDTOs.Sort((x, y) => y.date_created.CompareTo(x.date_created));
            return cartOnAdminUIDTOs;
        }
        [HttpGet("getcartbaseoncouponandcartid")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
        public async Task<ActionResult<List<CartOnAdminUIDTO>>> SearchGetCartByCouponIdAndCartIdByAdmin([FromQuery] PaginationDTO pagination, int coupon,int cartid)
        {
            var carts = await context.Cart.Where(x => x.CouponDiscountId == coupon && x.Id==cartid).ToListAsync();
            List<CartOnAdminUIDTO> cartOnAdminUIDTOs = new List<CartOnAdminUIDTO>();
            foreach (var item in carts)
            {
                CartOnAdminUIDTO cartOnAdminUIDTO = new CartOnAdminUIDTO();
                cartOnAdminUIDTO.admin_approve = item.AdminApprove;
                cartOnAdminUIDTO.date_created = item.DateOfCreated.ToString();
                cartOnAdminUIDTO.id = item.Id;
                cartOnAdminUIDTO.status = item.Status;
                cartOnAdminUIDTO.admin_approve_id = item.AdminUserId;
                cartOnAdminUIDTOs.Add(cartOnAdminUIDTO);
            }
            cartOnAdminUIDTOs.Sort((x, y) => y.date_created.CompareTo(x.date_created));
            return cartOnAdminUIDTOs;
        }
        [HttpGet("admin-user/{id:int}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
        public async Task<ActionResult> GetCartByUserIdByAdmin([FromQuery] PaginationDTO pagination, int id)
        {
            var queryablecart = context.Cart.AsQueryable().Where(s => s.CustomerId == id);
            await HttpContext.InsertPaginationParametersInResponse(queryablecart, Int32.MaxValue);
            var carts = await queryablecart.OrderByDescending(x => x.DateOfCreated).Paginate(pagination).ToListAsync();
            var cartsDTO = mapper.Map<List<ListCartDTO>>(carts);
            var coupons = await context.CouponDiscount.ToListAsync();
            foreach (var item in cartsDTO)
            {
                item.PercentDiscount = coupons.FirstOrDefault(x => x.Id == item.CouponDiscountId).PercenDiscount;
            }
            return Ok(cartsDTO);

        }

        //get cart by id by user

        [HttpGet("{id:int}", Name = "getCart")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "User,Admin")]
        public async Task<ActionResult<CreateCartSuccessDTO>> GetCartById([FromHeader] string email, [FromQuery] PaginationDTO pagination,int id)
        {
            var handler = new JwtSecurityTokenHandler();
            string authHeader = Request.Headers["Authorization"];
            authHeader = authHeader.Replace("Bearer ", "");
            var jsonToken = handler.ReadToken(authHeader);
            var tokenS = handler.ReadToken(authHeader) as JwtSecurityToken;
            var emailInToken = tokenS.Claims.First(claim => claim.Type == "email").Value;
            var idInToken = tokenS.Claims.First(claim => claim.Type == "unique_name").Value;
            var userInfo = await context.Customer.FirstOrDefaultAsync(x => (x.Email == emailInToken && x.Status == true));
            if (email == emailInToken && userInfo != null)
            {
                var queryablecart= context.Cart.AsQueryable().Where(s => s.CustomerId == Int32.Parse(idInToken));
                await HttpContext.InsertPaginationParametersInResponse(queryablecart, Int32.MaxValue);

                var detail = queryablecart.Where(x => x.Id == id);
                if(detail==null)
                {
                    return Ok($"Cart ID {id} không tồn tại với email {emailInToken}");
                }
                else
                {
                    var cart =await  context.Cart.FirstOrDefaultAsync(x => x.Id == id);
                    if (cart == null)
                        return NotFound();
                    return await showBookInCreateCartSucces(cart.Id, cart);
                }
            }
            else
                return BadRequest("Email không trùng với Email trong Token");
        }


        [HttpGet("detailcartadmin/{id:int}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
        public async Task<ActionResult<CreateCartSuccessDTO>> GetAdminCartById( [FromQuery] PaginationDTO pagination, int id)
        {
            var queryablecart = context.Cart.AsQueryable().Where(s => s.Id == id);
            await HttpContext.InsertPaginationParametersInResponse(queryablecart, Int32.MaxValue);

            var detail = queryablecart.Where(x => x.Id == id);
            var cart = await context.Cart.FirstOrDefaultAsync(x => x.Id == id);
            if (cart == null)
                return NotFound();
            return await showBookInCreateCartSucces(cart.Id, cart);
        }

        [HttpGet("bookbaseoncart/{id:int}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
        public async Task<ActionResult<List<CartBaseOnBookIdDTO>>>GetAllCartBaseOnBookId([FromHeader] string email, [FromQuery] PaginationDTO pagination, int id)
        {
            var handler = new JwtSecurityTokenHandler();
            string authHeader = Request.Headers["Authorization"];
            authHeader = authHeader.Replace("Bearer ", "");
            var jsonToken = handler.ReadToken(authHeader);
            var tokenS = handler.ReadToken(authHeader) as JwtSecurityToken;
            var emailInToken = tokenS.Claims.First(claim => claim.Type == "email").Value;
            var idInToken = tokenS.Claims.First(claim => claim.Type == "unique_name").Value;
            var adminInfo = await context.AdminUser.FirstOrDefaultAsync(x => (x.Email == emailInToken && x.Status == true));
            if (email == emailInToken && adminInfo != null)
            {
                var carts = await context.DetailCart.Where(x => x.BookId == id).ToListAsync() ;
                if (carts == null)
                    return null;
                else
                {
                    List<CartBaseOnBookIdDTO> cartBaseOnBookIdDTOs = new List<CartBaseOnBookIdDTO>();
                    foreach(var item in carts)
                    {
                        CartBaseOnBookIdDTO data = new CartBaseOnBookIdDTO();
                        var cart = await context.Cart.FirstOrDefaultAsync(x => x.Id == item.CartId);
                        if(cart.AdminUser!=null)
                        {
                            data.AdminApprove = cart.AdminApprove;
                            data.AdminUserId = cart.AdminUser.Id;

                            
                        }
                        data.AdminApprove = cart.AdminApprove;
                        data.DateAdminApprove = cart.DateAdminApprove;
                        data.DateOfCreated = cart.DateOfCreated;
                        data.DateOfDisabled = cart.DateOfDisabled;
                        data.Id = cart.Id;
                        data.Status = cart.Status;
                        data.Reason = cart.Reason;
                        cartBaseOnBookIdDTOs.Add(data);
                    }
                    cartBaseOnBookIdDTOs.Reverse();
                    return cartBaseOnBookIdDTOs;
                }
            }
                return BadRequest("Email không trùng với Email trong Token");
        }


        [HttpGet("getallcommendbookidadmin/{id:int}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
        public async Task<ActionResult<List<CommendOnBookAllDTO>>>GetAllCommendBaseOnBookId([FromHeader] string email,[FromQuery] PaginationDTO pagination,int id)
        {
            var handler = new JwtSecurityTokenHandler();
            string authHeader = Request.Headers["Authorization"];
            authHeader = authHeader.Replace("Bearer ", "");
            var jsonToken = handler.ReadToken(authHeader);
            var tokenS = handler.ReadToken(authHeader) as JwtSecurityToken;
            var emailInToken = tokenS.Claims.First(claim => claim.Type == "email").Value;
            var idInToken = tokenS.Claims.First(claim => claim.Type == "unique_name").Value;
            var adminInfo = await context.AdminUser.FirstOrDefaultAsync(x => (x.Email == emailInToken && x.Status == true));
            if (email == emailInToken && adminInfo != null)
            {
                var commend= await context.RatingStarBook.Where(x => x.BookId == id).ToListAsync();
                List<CommendOnBookAllDTO> commendAndRatingDTOs = new List<CommendOnBookAllDTO>();
                foreach (var item in commend)
                {
                    CommendOnBookAllDTO commendAndRatingDTO = new CommendOnBookAllDTO();
                    commendAndRatingDTO.Commend = item.Commend;
                    commendAndRatingDTO.DateOfCreated = item.DateOfCreated;
                    commendAndRatingDTO.Rating = item.Rating;
                    commendAndRatingDTO.Status = item.Status;
                    commendAndRatingDTO.UserInfoId = item.UserInfoId;
                    commendAndRatingDTOs.Add(commendAndRatingDTO);
                }
                return commendAndRatingDTOs;
            }
            return BadRequest("Email không trùng với Email trong Token");
        }

        [HttpPost("getallcommendbookidadmin/{id:int}/userid/{userid:int}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
        public async Task<ActionResult> ShowHideCommendBaseOnBookId([FromHeader] string email, [FromQuery] PaginationDTO pagination, int id,int userid)
        {
            var handler = new JwtSecurityTokenHandler();
            string authHeader = Request.Headers["Authorization"];
            authHeader = authHeader.Replace("Bearer ", "");
            var jsonToken = handler.ReadToken(authHeader);
            var tokenS = handler.ReadToken(authHeader) as JwtSecurityToken;
            var emailInToken = tokenS.Claims.First(claim => claim.Type == "email").Value;
            var idInToken = tokenS.Claims.First(claim => claim.Type == "unique_name").Value;
            var adminInfo = await context.AdminUser.FirstOrDefaultAsync(x => (x.Email == emailInToken && x.Status == true));
            if (email == emailInToken && adminInfo != null)
            {
                var commend = await context.RatingStarBook.FirstOrDefaultAsync(x => x.UserInfoId == userid && x.BookId == id);
                commend.Status = !commend.Status;
                await context.SaveChangesAsync();
                return Ok();
            }
            return BadRequest("Email không trùng với Email trong Token");
        }



        [HttpGet("getallcartadmin")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
        public async Task<ActionResult<List<CartOnAdminUIDTO>>>AllCartOnAdminUI()
        {
            var carts = await context.Cart.ToListAsync();
            List<CartOnAdminUIDTO> cartOnAdminUIDTOs = new List<CartOnAdminUIDTO>();
            foreach (var item in carts)
            {
                CartOnAdminUIDTO cartOnAdminUIDTO = new CartOnAdminUIDTO();
                cartOnAdminUIDTO.admin_approve = item.AdminApprove;
                cartOnAdminUIDTO.date_created = item.DateOfCreated.ToString();
                cartOnAdminUIDTO.id = item.Id;
                cartOnAdminUIDTO.status = item.Status;
                cartOnAdminUIDTO.admin_approve_id = item.AdminUserId;
                cartOnAdminUIDTOs.Add(cartOnAdminUIDTO);
            }
            cartOnAdminUIDTOs.Sort((x, y) => y.date_created.CompareTo(x.date_created));
            return cartOnAdminUIDTOs;
        }
        [HttpPost("approve/{id:int}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
        public async Task<ActionResult> ApproveCart(int id)
        {
            var carts = await context.Cart.FirstOrDefaultAsync(x => x.Id == id);
            if (carts == null)
                return BadRequest();
            if(carts.Status)
            {
                carts.AdminApprove = true;
                var handler = new JwtSecurityTokenHandler();
                string authHeader = Request.Headers["Authorization"];
                authHeader = authHeader.Replace("Bearer ", "");
                var jsonToken = handler.ReadToken(authHeader);
                var tokenS = handler.ReadToken(authHeader) as JwtSecurityToken;
                var emailInToken = tokenS.Claims.First(claim => claim.Type == "email").Value;
                var admin = await context.AdminUser.FirstOrDefaultAsync(x => x.Email.Equals(emailInToken));
                if(admin!=null)
                {
                    carts.AdminUser = admin;
                    await context.SaveChangesAsync();
                    return Ok();
                }
            }
            return BadRequest();
        }

        //add to cart
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "User,Admin")]
        public async Task<ActionResult>WriteCartDetailToDb([FromBody]CreateDetailCart createDetailCart)
        {
            var handler = new JwtSecurityTokenHandler();
            string authHeader = Request.Headers["Authorization"];
            authHeader = authHeader.Replace("Bearer ", "");
            var jsonToken = handler.ReadToken(authHeader);
            var tokenS = handler.ReadToken(authHeader) as JwtSecurityToken;
            var emailInToken = tokenS.Claims.First(claim => claim.Type == "email").Value;
            var idInToken = Int16.Parse(tokenS.Claims.First(claim => claim.Type == "unique_name").Value);

            var userInfo = await context.Customer.FirstOrDefaultAsync(x => (x.Id == idInToken && x.Email == emailInToken && x.Status == true));

            var couponCode = await context.CouponDiscount.FirstOrDefaultAsync(x => x.CouponCode == createDetailCart.CouponCode);

            if(userInfo==null)
            {
                return BadRequest();
            }
            else
            {
                if (!string.IsNullOrEmpty(createDetailCart.CouponCode))
                {
                    if (createDetailCart.CouponCode.ToUpper().Equals("NO") || string.IsNullOrEmpty(createDetailCart.CouponCode.Trim()))
                    {
                        return await doAddCartDetail(createDetailCart, idInToken, couponCode.Id, null,userInfo);
                    }
                    else
                    {
                        if (couponCode.DateOfEnded < DateTime.Now)
                        {
                            return BadRequest("Quá hạn sử dụng của Coupon");
                        }
                        if (couponCode.MaxCountUse != 0 && couponCode.CountUse == couponCode.MaxCountUse)
                        {
                            return BadRequest("Coupon đã quá số lần sử dụng");
                        }
                        return await doAddCartDetail(createDetailCart, idInToken, couponCode.Id, couponCode,userInfo);
                    }


                }
                else
                    return await doAddCartDetail(createDetailCart, idInToken, couponCode.Id, couponCode, userInfo);
            }
        }
        private async Task<ActionResult>doAddCartDetail(CreateDetailCart createDetailCart,int idInToken,int idCouponCode,CouponDiscount couponCode,UserInfo userInfo)
        {
            var booksInCartDetail = mapper.Map<List<Book>>(createDetailCart.BookInDetailCartDTOs);
            Cart cart = new Cart();
            cart.DetailCarts = new List<DetailCart>();
            cart.CustomerId = idInToken;
            cart.CouponDiscountId = idCouponCode;
            cart.TotalPrice = 0;
            foreach (var item in booksInCartDetail)
            {
                var book = await context.Book.FirstOrDefaultAsync(x => x.Id == item.Id);
                if (item.Quantity>book.Quantity)
                    return BadRequest("Thêm không thành công, kiểm tra số lượng sách");
                DetailCart detailCart = new DetailCart();
            
                detailCart.BookId = item.Id;
                detailCart.Quantity = item.Quantity;
                book.Quantity = book.Quantity - item.Quantity;
                cart.TotalPrice += item.Quantity * book.Price;
                detailCart.Cart = cart;
                cart.DetailCarts.Add(detailCart);
            }
            cart.DateOfCreated = DateTime.Now;
            cart.Address = createDetailCart.Address;
            cart.Note = createDetailCart.Note;
            cart.AdminUserId = 1;
            cart.NameReceiveProduct = createDetailCart.NameReceiveProduct;
            cart.SDT = createDetailCart.Sdt.ToString();
            if(couponCode==null)
            {
                cart.TotalPriceAfterDiscount = cart.TotalPrice;
            }
            else
            {
                cart.TotalPriceAfterDiscount = (int)(cart.TotalPrice - (cart.TotalPrice * couponCode.PercenDiscount / 100));
            }
            cart.Customer = userInfo;
            context.Add(cart);
            await context.SaveChangesAsync();


            CreateCartSuccessDTO dataReturn = await showBookInCreateCartSucces(cart.Id, cart);
            //await showBookInCreateCartSucces(cart.Id,cart);

            return new CreatedAtRouteResult("getCart", new { id = cart.Id }, dataReturn);
        }

        private async Task<CreateCartSuccessDTO>showBookInCreateCartSucces(int id, Cart cart)
        {
            var books = await context.Book.ToListAsync();
            CreateCartSuccessDTO createCartSuccessDTO = new CreateCartSuccessDTO();
            createCartSuccessDTO.CartId = id;
            createCartSuccessDTO.TotalPrice = cart.TotalPrice;
            createCartSuccessDTO.TotalPriceAfterDisCount = cart.TotalPriceAfterDiscount;
            createCartSuccessDTO.date_created = cart.DateOfCreated.ToString();
            createCartSuccessDTO.userid = cart.CustomerId;
            var detailCarts = await context.DetailCart.Where(data => data.CartId == id).ToListAsync();
            createCartSuccessDTO.BookInDetailCartDTOs = new List<BookInCreateCartSuccessDTO>();
            foreach (var item in detailCarts)
            {
                BookInCreateCartSuccessDTO data = new BookInCreateCartSuccessDTO();
                Book book=books.Find(x=>x.Id==item.BookId);
                data.Id = book.Id;
                data.Name = book.Name;
                data.ImageUrl = context.Book.FirstOrDefault(x=>(x.Id==book.Id )).UrlBookImageShow;
                data.Price = book.Price;
                data.Quantity = item.Quantity;
                createCartSuccessDTO.BookInDetailCartDTOs.Add(data);
            }
            var coupon = await context.CouponDiscount.FirstOrDefaultAsync(x => x.Id == cart.CouponDiscountId);
            createCartSuccessDTO.CouponCode = coupon.CouponCode;
            createCartSuccessDTO.PercentDiscount = coupon.PercenDiscount;
            createCartSuccessDTO.Address= cart.Address;
            createCartSuccessDTO.NameReceiveProduct = cart.NameReceiveProduct;
            createCartSuccessDTO.SDT = cart.SDT;
            createCartSuccessDTO.Note = cart.Note;
            return createCartSuccessDTO;
        }
    }
}
