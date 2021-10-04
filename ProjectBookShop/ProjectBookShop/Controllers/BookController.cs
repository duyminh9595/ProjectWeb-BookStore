using AutoMapper;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Drive.v3;
using Google.Apis.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectBookShop.DTO;
using ProjectBookShop.Entities;
using ProjectBookShop.Helpers;
using System;
using System.Collections.Generic;
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
            return mapper.Map<List<BookReadDTO>>(books);
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
        public async Task<ActionResult>PostNewBook([FromBody]BookCreateDTO bookCreateDTO)
        {
            var book = mapper.Map<Book>(bookCreateDTO);
            var publisher = await context.Publisher.FirstOrDefaultAsync(x => x.Id == bookCreateDTO.PublisherId);
            var type = await context.Type.FirstOrDefaultAsync(x => x.Id == bookCreateDTO.TypeId);
            book.Publisher = publisher;
            book.Type = type;
            context.Add(book);
            type.Books.Add(book);
            publisher.Books.Add(book);
            await context.SaveChangesAsync();
            var bookReadDTO = mapper.Map<BookReadDTO>(book);
            return new CreatedAtRouteResult("getBook", new { id = bookReadDTO.Id }, bookReadDTO);
        }
        [HttpPost("image/{id}")]
        public async Task<ActionResult>UpImage(int id,[FromForm]BookUploadImageDTO bookUploadImageDTO)
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
            return Ok();
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
