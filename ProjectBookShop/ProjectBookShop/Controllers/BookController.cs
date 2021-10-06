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

        public BookController(ApplicationDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
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
            return Ok(bookReadDTO);
        }
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
        public async Task<ActionResult>PostNewBook([FromBody]BookCreateDTO bookCreateDTO)
        {
            var book = mapper.Map<Book>(bookCreateDTO);
            var publisher = await context.Publisher.FirstOrDefaultAsync(x => x.Id == bookCreateDTO.PublisherId);
            var type = await context.Type.FirstOrDefaultAsync(x => x.Id == bookCreateDTO.TypeId);
            book.Publisher = publisher;
            book.Type = type;
            book.DateOfCreated = DateTime.Now;
            context.Add(book);
            type.Books.Add(book);
            publisher.Books.Add(book);
            await context.SaveChangesAsync();
            var bookReadDTO = mapper.Map<BookReadDTO>(book);
            return new CreatedAtRouteResult("getBook", new { id = bookReadDTO.Id }, bookReadDTO);
        }
        [HttpPost("image/{id:int}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
        public async Task<ActionResult> UpImageShowForBook(int id, [FromForm] BookUploadImageDTO bookUploadImageDTO, [FromHeader] string email)
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
                var book = await context.Book.FirstOrDefaultAsync(x => x.Id == id);
                if (book != null)
                {
                    using (var memoryStream = new MemoryStream())
                    {
                        await bookUploadImageDTO.Picture.CopyToAsync(memoryStream);
                        var content = memoryStream;
                        var extension = Path.GetExtension(bookUploadImageDTO.Picture.FileName);
                        int countImage = book.BookImages.Count();
                        string imageId = await UploadImageToDrive(content, extension, countImage, book.Id);

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
                    string imageId=await UploadImageToDrive(content,extension,countImage,book.Id);
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
        private async Task<string> UploadImageToDrive(Stream content,string extension,int countImage,int bookId)
        {
            var credential = GoogleCredential.FromFile("service_account.json")
                .CreateScoped(new[] { DriveService.ScopeConstants.Drive });

            var service = new DriveService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = credential
            });

            //upload file
            var fileMetaData = new Google.Apis.Drive.v3.Data.File()
            {
                Name = $"BookId:{bookId}-{countImage+1}",
                Parents = new List<string>()
                {
                    "1wZs_e1q1rTF2cbeC3DL7PFhywkeVUowY"
                }
            };
            var request = service.Files.Create(fileMetaData, content, $"image/{extension}");
            request.Fields = "id";
            var results = await request.UploadAsync(CancellationToken.None);

            var uploadedFile = await service.Files.Get(request.ResponseBody?.Id).ExecuteAsync();
            return (uploadedFile.Id).ToString();
        }
    }
}
