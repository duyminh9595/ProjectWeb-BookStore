using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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
using System.Net;
using System.Threading.Tasks;

namespace ProjectBookShop.Controllers
{
    [ApiController]
    [Route("api/article")]
    public class ArticleController:ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;
        private readonly IArticleService articleService;
        private readonly IUploadImageToGoogleDrive uploadImageToGoogleDrive;

        public ArticleController(ApplicationDbContext context, IMapper mapper,IArticleService articleService,IUploadImageToGoogleDrive uploadImageToGoogleDrive)
        {
            this.context = context;
            this.mapper = mapper;
            this.articleService = articleService;
            this.uploadImageToGoogleDrive = uploadImageToGoogleDrive;
        }

        [HttpGet]
        public async Task<ActionResult<List<ArticleShowDTO>>>GetAritcle([FromQuery] PaginationDTO pagination)
        {
            var queryable =  context.Article.AsQueryable();
            await HttpContext.InsertPaginationParametersInResponse(queryable, pagination.RecordsPerPage);
            var articles =queryable.Where(x => x.Approve == true).OrderByDescending(x => x.DateOfApproved).Paginate(pagination).ToList();
            var articlesShow = mapper.Map<List<ArticleShowDTO>>(articles);
            var customers = context.Customer.ToList();
            foreach (var item in articlesShow)
            {
                var customer = customers.FirstOrDefault(x => x.Id == item.CustomerId);
                item.AuthorName = customer.Email;
            }
            return articlesShow;
        }
        [HttpGet("admin-user")]
        public async Task<ActionResult<List<ArticleShowDTO>>> GetAritcle([FromQuery] PaginationDTO pagination,int id)
        {
            var queryable = context.Article.AsQueryable();
            await HttpContext.InsertPaginationParametersInResponse(queryable, pagination.RecordsPerPage);
            var articles = queryable.Where(x => x.CustomerId==id).OrderByDescending(x => x.DateOfApproved).Paginate(pagination).ToList();
            var articlesShow = mapper.Map<List<ArticleShowDTO>>(articles);
            var customers = context.Customer.ToList();
            foreach (var item in articlesShow)
            {
                var customer = customers.FirstOrDefault(x => x.Id == item.CustomerId);
                item.AuthorName = customer.Email;
            }
            return articlesShow;
        }
        [HttpGet("all-article")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
        public async Task<ActionResult<List<ArticleShowDTO>>> GetAllAritcle([FromQuery] PaginationDTO pagination)
        {
            var queryable = context.Article.AsQueryable();
            await HttpContext.InsertPaginationParametersInResponse(queryable, pagination.RecordsPerPage);
            var articles = queryable.OrderByDescending(x => x.DateOfApproved).Paginate(pagination).ToList();
            var articlesShow = mapper.Map<List<ArticleShowDTO>>(articles);
            var customers = context.Customer.ToList();
            foreach (var item in articlesShow)
            {
                var customer = customers.FirstOrDefault(x => x.Id == item.CustomerId);
                item.AuthorName = customer.Email;
            }
            return articlesShow;
        }
        [HttpPost("articlebyname")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
        public async Task<ActionResult<List<ArticleShowDTO>>> GetAllAritcleByName([FromQuery] PaginationDTO pagination,[FromBody]NameDTO nameDTO)
        {
            var queryable = context.Article.AsQueryable();
            await HttpContext.InsertPaginationParametersInResponse(queryable, pagination.RecordsPerPage);
            var articles = queryable.Where(x=>x.Title.Contains(nameDTO.name)).OrderByDescending(x => x.DateOfApproved).Paginate(pagination).ToList();
            var articlesShow = mapper.Map<List<ArticleShowDTO>>(articles);
            var customers = context.Customer.ToList();
            foreach (var item in articlesShow)
            {
                var customer = customers.FirstOrDefault(x => x.Id == item.CustomerId);
                item.AuthorName = customer.Email;
            }
            return articlesShow;
        }
        [HttpGet("account")]
        public async Task<ActionResult<List<ArticleShowDTO>>> GetAritcleByAccount()
        {
            var queryable = context.Article.AsQueryable();
            var user = await checkUserEmailInToken();
            if (user == null)
            {
                return NotFound();
            }
            else
            {

                var articles = queryable.Where(x=>x.CustomerId==user.Id).OrderByDescending(x => x.DateOfCreated).ToList();
                var articlesShow = mapper.Map<List<ArticleShowDTO>>(articles);
                var customers = context.Customer.ToList();
                foreach (var item in articlesShow)
                {
                    var customer = user;
                    item.AuthorName = user.Email;
                }
                return articlesShow;
            }
        }
        [HttpDelete("account/{id:int}")]
        public async Task<ActionResult<List<ArticleShowDTO>>> DelAritcleByAccount(int id)
        {
            var queryable = context.Article.AsQueryable();
            var user = await checkUserEmailInToken();
            if (user == null)
            {
                return NotFound();
            }
            else
            {

                var articles =await queryable.FirstOrDefaultAsync(x => (x.CustomerId == user.Id && x.Id==id && x.Approve==false));
                if (articles == null)
                    return NotFound();
                else
                {
                    context.Article.Remove(articles);
                    await context.SaveChangesAsync();
                    return Ok();
                }
            }
        }
        [HttpGet("{id:int}", Name = "getArticle")]
        public async Task<ActionResult<ArticleShowDTO>>GetArticleById(int id)
        {
            var aricle = await articleService.GetArticleById(id);
            if(aricle==null)
            {
                return BadRequest();
            }
            else
                return Ok(aricle);
        }
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin,User")]
        public async Task<ActionResult>CreateArtice([FromBody]ArticleCreateDTO articleCreateDTO)
        {
            var user = await checkUserEmailInToken();
            if(user==null)
            {
                return BadRequest();
            }
            else
            {
                var data = mapper.Map<Article>(articleCreateDTO);
                data.DateOfCreated = DateTime.Now;
                data.CustomerId = user.Id;
                var checks = await findRoles(user.Id);
                foreach (var item in checks)
                {
                    if(item.Role_Name.Equals("Admin"))
                    {
                        data.Approve = true;
                        data.AdminId = item.UserInfoId;
                        data.DateOfApproved = DateTime.Now;
                    }
                }
                context.Add(data);
                await context.SaveChangesAsync();
                var articleShowDTO = mapper.Map<ArticleShowDTO>(data);
                return new CreatedAtRouteResult("getArticle", new { id = articleShowDTO.Id }, articleShowDTO);
            }
        }
        [HttpPost("image/article/{id:int}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin,User")]
        public async Task<ActionResult>UploadImageArticle([FromForm] IFormFile picture,int id)
        {
            var article = await context.Article.FirstOrDefaultAsync(x => x.Id == id);
            if (article != null)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await picture.CopyToAsync(memoryStream);
                    var content = memoryStream;
                    var extension = Path.GetExtension(picture.FileName);
                    string imageId = await uploadImageToGoogleDrive.UploadImageThumbnailOfArticle(content, extension, id);
                    article.UrlImageArtice = "https://drive.google.com/uc?id=" + imageId;
                    await context.SaveChangesAsync();
                    return Ok();
                }
            }
            else
                return NotFound();
        }
        [HttpPost("approve/{id:int}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
        public async Task<ActionResult>ApproveArticle(int id)
        {
            var user = await checkUserEmailInTokenAdmin();
            if(user==null)
            {
                return BadRequest();
            }
            else
            {
                var article = await context.Article.FirstOrDefaultAsync(x => x.Id == id);
                if (article == null )
                {
                    return BadRequest();
                }
                else
                {
                    article.AdminId = user.Id;
                    article.DateOfApproved = DateTime.Now;
                    article.Approve = !article.Approve;
                    await context.SaveChangesAsync();
                    return Ok();
                }
            }
        }
        private async Task<UserInfo> checkUserEmailInToken()
        {
            var handler = new JwtSecurityTokenHandler();
            string authHeader = Request.Headers["Authorization"];
            authHeader = authHeader.Replace("Bearer ", "");
            var jsonToken = handler.ReadToken(authHeader);
            var tokenS = handler.ReadToken(authHeader) as JwtSecurityToken;
            var emailInToken = tokenS.Claims.First(claim => claim.Type == "email").Value;
            var idInToken = tokenS.Claims.First(claim => claim.Type == "unique_name").Value;
            string emailHeader = Request.Headers["Email"];
            var user = await context.Customer.FirstOrDefaultAsync(x => (x.Id == Int32.Parse(idInToken) && x.Email == emailHeader && x.Email == emailInToken && x.Status == true));
            return user;
        }
        private async Task<AdminUser> checkUserEmailInTokenAdmin()
        {
            var handler = new JwtSecurityTokenHandler();
            string authHeader = Request.Headers["Authorization"];
            authHeader = authHeader.Replace("Bearer ", "");
            var jsonToken = handler.ReadToken(authHeader);
            var tokenS = handler.ReadToken(authHeader) as JwtSecurityToken;
            var emailInToken = tokenS.Claims.First(claim => claim.Type == "email").Value;
            var idInToken = tokenS.Claims.First(claim => claim.Type == "unique_name").Value;
            string emailHeader = Request.Headers["Email"];
            var user = await context.AdminUser.FirstOrDefaultAsync(x => (x.Id == Int32.Parse(idInToken) && x.Email == emailHeader && x.Email == emailInToken && x.Status == true));
            return user;
        }
        private async Task<List<UserRole>>findRoles(int id)
        {
            var roles = await context.UserRole.Where(x => x.UserInfoId == id).ToListAsync();
            return roles;
        }

    }
}
