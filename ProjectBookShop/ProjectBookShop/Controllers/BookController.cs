using AutoMapper;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Drive.v3;
using Google.Apis.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectBookShop.DTO;
using ProjectBookShop.Entities;
using ProjectBookShop.Helpers;
using ProjectBookShop.Service;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace ProjectBookShop.Controllers
{
    [ApiController]
    [Route("api/book")]
    public class BookController:ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;
        private readonly IUploadImageToGoogleDrive uploadImageToGoogleDrive;
        private readonly IBookService bookService;

        public BookController(ApplicationDbContext context, IMapper mapper,IUploadImageToGoogleDrive uploadImageToGoogleDrive,IBookService bookService)
        {
            this.context = context;
            this.mapper = mapper;
            this.uploadImageToGoogleDrive = uploadImageToGoogleDrive;
            this.bookService = bookService;
        }
        [HttpGet("homepage")]
        public async Task<ActionResult<List<BookReadDTO>>> GetBooksInHomePage([FromQuery] PaginationDTO pagination)
        {
            var queryable = context.Book.AsQueryable();
            await HttpContext.InsertPaginationParametersInResponse(queryable, pagination.RecordsPerPage);
            var books = await queryable.OrderByDescending(x=>x.DateOfCreated).Paginate(pagination).ToListAsync();
            var publishers = await context.Publisher.AsNoTracking().ToListAsync();
            var types = await context.Type.AsNoTracking().ToListAsync();            
            var maxPage = books.Count() / 4;
            foreach (var book in books)
            {
                book.Publisher = publishers.FirstOrDefault(x => x.Id == book.PublisherId);
                book.Type = types.FirstOrDefault(x => x.Id == book.TypeId);
            }
            var data = mapper.Map<List<BookReadDTO>>(books);
            if(data.Count()!=0)
            {
                data[0].MaxPage = maxPage + 1;
                var ratingStars = await context.RatingStarBook.ToListAsync();
                foreach (var item in data)
                { 
                    if(ratingStars.Where(x => (x.Status == true && x.BookId == item.Id)).Count()!=0)
                    item.AverageStar = (ratingStars.Where(x => (x.Status == true && x.BookId == item.Id)).Sum(x => x.Rating) / (ratingStars.Where(x => (x.Status == true && x.BookId == item.Id)).Count()));
                    else
                    {
                        item.AverageStar = 0;
                    }
                }               
            }
            return data;
        }
        [HttpGet("homepage/searchbyname")]
        public async Task<ActionResult<List<BookReadDTO>>> GetBooksByName([FromQuery] PaginationDTO pagination,string name)
        {
            var queryable = context.Book.AsQueryable().Where(x=>x.Name.Contains(name));
            await HttpContext.InsertPaginationParametersInResponse(queryable, pagination.RecordsPerPage);
            var books = await queryable.OrderByDescending(x => x.DateOfCreated).Paginate(pagination).ToListAsync();
            var publishers = await context.Publisher.AsNoTracking().ToListAsync();
            var types = await context.Type.AsNoTracking().ToListAsync();
            var maxPage = books.Count() / 4;
            foreach (var book in books)
            {
                book.Publisher = publishers.FirstOrDefault(x => x.Id == book.PublisherId);
                book.Type = types.FirstOrDefault(x => x.Id == book.TypeId);
            }
            var data = mapper.Map<List<BookReadDTO>>(books);
            data[0].MaxPage = maxPage + 1;
            return data;
        }
        [HttpGet("type/{id:int}")]
        public async Task<ActionResult<List<BookReadDTO>>> GetBooksByTypeId([FromQuery] PaginationDTO pagination,int id)
        {
            var queryable = context.Book.AsQueryable().Where(x=>x.TypeId==id);
            await HttpContext.InsertPaginationParametersInResponse(queryable, pagination.RecordsPerPage);
            var books = await queryable.OrderByDescending(x => x.DateOfCreated).Paginate(pagination).ToListAsync();
            if(books.Count()==0)
            {
                return NotFound(id + " khong tìm thấy");
            }
            else
            {
                var publishers = await context.Publisher.AsNoTracking().ToListAsync();
                var types = await context.Type.AsNoTracking().ToListAsync();
                var booksAll = await context.Book.Where(x => x.TypeId == id).ToListAsync();
                var maxPage = booksAll.Count() / 4;
                foreach (var book in books)
                {
                    book.Publisher = publishers.FirstOrDefault(x => x.Id == book.PublisherId);
                    book.Type = types.FirstOrDefault(x => x.Id == book.TypeId);
                }
                var data = mapper.Map<List<BookReadDTO>>(books);
                if (books.Count() % 4 == 0)
                {
                    data[0].MaxPage = maxPage;
                }
                else
                    data[0].MaxPage = maxPage + 1;
                return data;
            }
        }

        [HttpGet("publisher/{id:int}")]
        public async Task<ActionResult<List<BookReadDTO>>> GetBooksByPublisherId([FromQuery] PaginationDTO pagination, int id)
        {
            var queryable = context.Book.AsQueryable().Where(x => x.PublisherId == id);
            await HttpContext.InsertPaginationParametersInResponse(queryable, pagination.RecordsPerPage);
            var books = await queryable.OrderByDescending(x => x.DateOfCreated).Paginate(pagination).ToListAsync();
            if (books.Count() == 0)
            {
                return NotFound(id + " khong tìm thấy");
            }
            else
            {
                var publishers = await context.Publisher.AsNoTracking().ToListAsync();
                var types = await context.Type.AsNoTracking().ToListAsync();
                var booksAll = await context.Book.Where(x=>x.PublisherId==id).ToListAsync();
                var maxPage = booksAll.Count() / 4;
                foreach (var book in books)
                {
                    book.Publisher = publishers.FirstOrDefault(x => x.Id == book.PublisherId);
                    book.Type = types.FirstOrDefault(x => x.Id == book.TypeId);
                }
                var data = mapper.Map<List<BookReadDTO>>(books);
                if(books.Count()%4==0)
                {
                    data[0].MaxPage = maxPage;
                }
                else
                    data[0].MaxPage = maxPage + 1;
                return data;
            }
        }
        [HttpGet]
        public async Task<ActionResult<List<BookReadDTO>>> GetBooksByTypeName([FromQuery] PaginationDTO pagination, string name)
        {
            var queryable = context.Book.AsQueryable().Where(x => x.Name.Contains(name));
            await HttpContext.InsertPaginationParametersInResponse(queryable, pagination.RecordsPerPage);
            var books = await queryable.OrderByDescending(x => x.DateOfCreated).Paginate(pagination).ToListAsync();
            var publishers = await context.Publisher.AsNoTracking().ToListAsync();
            var types = await context.Type.AsNoTracking().ToListAsync();
            var maxPage = books.Count() / 4;
            foreach (var book in books)
            {
                book.Publisher = publishers.FirstOrDefault(x => x.Id == book.PublisherId);
                book.Type = types.FirstOrDefault(x => x.Id == book.TypeId);
            }
            var data = mapper.Map<List<BookReadDTO>>(books);
            data[0].MaxPage = maxPage + 1;
            return data;
        }


        [HttpGet]
        public async Task<ActionResult<List<BookReadDTO>>>GetBooks([FromQuery] PaginationDTO pagination)
        {
            var queryable = context.Book.AsQueryable();
            await HttpContext.InsertPaginationParametersInResponse(queryable, pagination.RecordsPerPage);
            var books= await queryable.Paginate(pagination).ToListAsync();
            var publishers = await context.Publisher.AsNoTracking().ToListAsync();
            var types = await context.Type.AsNoTracking().ToListAsync();
            foreach (var book in books)
            {
                book.Publisher = publishers.FirstOrDefault(x => x.Id == book.PublisherId);
                book.Type = types.FirstOrDefault(x => x.Id == book.TypeId);
            }
            var data = mapper.Map<List<BookReadDTO>>(books);
            return data;
        }
        [HttpGet("{id:int}", Name = "getBook")]
        public async Task<ActionResult<BookReadDTO>>GetBook(int id)
        {
            var book = await context.Book.FirstOrDefaultAsync(x => x.Id == id);
            if (book == null)
            {
                return NotFound();
            }
            var bookReadDTO = mapper.Map<BookReadDTO>(book);
            var publisher = await context.Publisher.FirstOrDefaultAsync(x => x.Id == book.PublisherId);
            var type = await context.Type.FirstOrDefaultAsync(x => x.Id == book.TypeId);
            bookReadDTO.PublisherName = publisher.Name;
            bookReadDTO.TypeName = type.Name;
            var rating = await context.RatingStarBook.Where(x => x.BookId == bookReadDTO.Id).ToListAsync();
            if(rating.Count()==0)
            {
                bookReadDTO.AverageStar = 0;
            }
            else
            {
                bookReadDTO.AverageStar = (float)(rating.Sum(x => x.Rating) * 1.0 / rating.Count()); 
            }
            return Ok(bookReadDTO);
        }
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
        public async Task<ActionResult>PostNewBook([FromBody]BookCreateDTO bookCreateDTO, [FromHeader] string email)
        {
            var adminUser = await CheckEmailInTokenAdmin(email);
            if(adminUser != null)
            {
                var bookReadDTO = await bookService.CreateNewBook(bookCreateDTO, adminUser);
                return new CreatedAtRouteResult("getBook", new { id = bookReadDTO.Id }, bookReadDTO);
            }
            return
                BadRequest();
        }
        [HttpPost("image/{id:int}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
        public async Task<ActionResult> UpImageShowForBook(int id, [FromForm] BookUploadImageDTO bookUploadImageDTO, [FromHeader] string email)
        {
            var userInfo = await CheckEmailInTokenAdmin(email);
            if (userInfo != null)
            {
                var book = await context.Book.FirstOrDefaultAsync(x => x.Id == id);
                if (book != null)
                {
                    using (var memoryStream = new MemoryStream())
                    {
                        await bookUploadImageDTO.Picture.CopyToAsync(memoryStream);
                        var content = memoryStream;
                        var extension = Path.GetExtension(bookUploadImageDTO.Picture.FileName);
                        int countImage = book.BookImages.Count();
                        string imageId = await uploadImageToGoogleDrive.UploadImageThumbnailOfBook(content, extension, countImage, book.Id);
                        book.UrlBookImageShow = "https://drive.google.com/uc?id=" + imageId;
                        await context.SaveChangesAsync();
                        var bookReadDTO = mapper.Map<BookReadDTO>(book);
                        return new CreatedAtRouteResult("getBook", new { id = book.Id }, bookReadDTO);
                    }
                }
                else
                    return NotFound();
            }
            else
            {
                return BadRequest();
            }
        }
        [HttpGet("bookonallcart/{id:int}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
        public async Task<ActionResult<List<CartContentBookDTO>>>GetBookOnAllCart(int id, [FromQuery] PaginationDTO pagination)
        {
            var queryable = context.DetailCart.AsQueryable().Where(x => x.BookId == id);
            await HttpContext.InsertPaginationParametersInResponse(queryable, pagination.RecordsPerPage);
            var data = await queryable.OrderByDescending(x => x.CartId).Paginate(pagination).ToListAsync();
            List<CartContentBookDTO> cartContentBookDTOs = new List<CartContentBookDTO>();
            foreach (var item in data)
            {
                CartContentBookDTO cartContentBookDTO = new CartContentBookDTO();
                cartContentBookDTO.cartid = item.CartId;
                var cart = await context.Cart.FirstOrDefaultAsync(x => x.Id == item.CartId);
                cartContentBookDTO.date_created = cart.DateOfCreated.ToString();
                var customer = await context.Customer.FirstOrDefaultAsync(x => x.Id == cart.CustomerId);
                cartContentBookDTO.userid = customer.Id;
                cartContentBookDTO.email_customer = customer.Email;
                cartContentBookDTO.total_price = cart.TotalPrice;
                cartContentBookDTO.total_price_after_discount = cart.TotalPriceAfterDiscount;
                cartContentBookDTOs.Add(cartContentBookDTO);
            }
            return cartContentBookDTOs;
        }
        [HttpPost("update")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
        public async Task<ActionResult>UpdateBook(int id,[FromBody]UpdateSachDTO updateSachDTO)
        {
            var book = await context.Book.FirstOrDefaultAsync(x => x.Id == id);
            if(book!=null)
            {
                book.Name = updateSachDTO.name;
                book.Price = updateSachDTO.price;
                book.PublisherId = updateSachDTO.publisherId;
                book.TypeId = updateSachDTO.typeId;
                book.ShortReview = updateSachDTO.shortReview;
                book.AuthorName = updateSachDTO.authorName;
                await context.SaveChangesAsync();
                return Ok();
            }
            return BadRequest();
        }
        [HttpPost("image/info/{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
        public async Task<ActionResult>UpImages(int id,[FromForm]BookUploadImageDTO bookUploadImageDTO)
        {
            var book= await context.Book.FirstOrDefaultAsync(x => x.Id == id);
            if (book != null)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await bookUploadImageDTO.Picture.CopyToAsync(memoryStream);
                    var content = memoryStream;
                    var extension = Path.GetExtension(bookUploadImageDTO.Picture.FileName);
                    int countImage = book.BookImages.Count();
                    string imageId=await uploadImageToGoogleDrive.UploadImageThumbnailOfBook(content,extension,countImage,book.Id);
                    BookImage bookImage = new BookImage();
                    bookImage.BookId = id;
                    bookImage.Book = book;
                    bookImage.Url = "https://drive.google.com/uc?id=" + imageId;
                    context.Add(bookImage);
                    book.BookImages.Add(bookImage);
                    await context.SaveChangesAsync();
                    return Ok();
                }
            }
            else
                return NotFound();
        }

        private async Task<UserInfo> CheckEmailInToken(string email)
        {
            var handler = new JwtSecurityTokenHandler();
            string authHeader = Request.Headers["Authorization"];
            authHeader = authHeader.Replace("Bearer ", "");
            var jsonToken = handler.ReadToken(authHeader);
            var tokenS = handler.ReadToken(authHeader) as JwtSecurityToken;
            var emailInToken = tokenS.Claims.First(claim => claim.Type == "email").Value;
            var idInToken = tokenS.Claims.First(claim => claim.Type == "unique_name").Value;
            var userInfo = await context.Customer.FirstOrDefaultAsync(x => (x.Email == emailInToken && x.Status == true&&x.Email==email && x.Id == Int32.Parse(idInToken)));
            return userInfo;
        }
        private async Task<AdminUser> CheckEmailInTokenAdmin(string email)
        {
            var handler = new JwtSecurityTokenHandler();
            string authHeader = Request.Headers["Authorization"];
            authHeader = authHeader.Replace("Bearer ", "");
            var jsonToken = handler.ReadToken(authHeader);
            var tokenS = handler.ReadToken(authHeader) as JwtSecurityToken;
            var emailInToken = tokenS.Claims.First(claim => claim.Type == "email").Value;
            var idInToken = tokenS.Claims.First(claim => claim.Type == "unique_name").Value;
            var userInfo = await context.AdminUser.FirstOrDefaultAsync(x => (x.Email == emailInToken && x.Status == true && x.Email == email && x.Id == Int32.Parse(idInToken)));
            return userInfo;
        }
        [HttpPost("adminupdateimage")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
        public async Task<ActionResult> UpdateBookImage(int id, [FromBody] UpdateImageDTO updateSachDTO)
        {
            var book = await context.Book.FirstOrDefaultAsync(x => x.Id == id);
            if (book != null)
            {
                book.UrlBookImageShow = updateSachDTO.image_url;
                await context.SaveChangesAsync();
                return Ok();
            }
            return BadRequest();
        }
        [HttpPost("updatesl")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
        public async Task<ActionResult> UpdateBookSL(int id, [FromBody] SlSachDTO slSachDTO)
        {
            var book = await context.Book.FirstOrDefaultAsync(x => x.Id == id);
            if (book != null)
            {
                book.Quantity += slSachDTO.sl ;
                await context.SaveChangesAsync();
                return Ok();
            }
            return BadRequest();
        }
    }
}
