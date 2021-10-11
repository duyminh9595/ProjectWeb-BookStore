using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectBookShop.Service
{
    public interface IUploadImageToGoogleDrive
    {
        public Task<string> UploadImageAccountAvatar(Stream content, string extension, int userId, string email);
        public Task<string> UploadImageThumbnailOfBook(Stream content, string extension, int countImage, int bookId);
        public Task<string> UploadImageThumbnailOfArticle(Stream content, string extension, int articleId);

    }
}
