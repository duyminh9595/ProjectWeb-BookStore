using Google.Apis.Auth.OAuth2;
using Google.Apis.Drive.v3;
using Google.Apis.Services;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace ProjectBookShop.Service
{
    public class UploadImageToGoogleDriveService : IUploadImageToGoogleDrive
    {
        public async Task<string> UploadImageAccountAvatar(Stream content, string extension, int userId, string email)
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
                Name = $"User:'{userId}-{email}'",
                Parents = new List<string>()
                {
                    "1wD9Mjso7HSIN5KWE0_KSaLz9Hdx9SAfn"
                }
            };
            var request = service.Files.Create(fileMetaData, content, $"image/{extension}");
            request.Fields = "id";
            var results = await request.UploadAsync(CancellationToken.None);

            var uploadedFile = await service.Files.Get(request.ResponseBody?.Id).ExecuteAsync();
            return (uploadedFile.Id).ToString();
        }

        public async Task<string> UploadImageThumbnailOfArticle(Stream content, string extension, int articleId)
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
                Name = $"Article:{articleId}",
                Parents = new List<string>()
                {
                    "1DWhp-q2uxlwN2GKvxqCSg_wvJtvY12EU"
                }
            };
            var request = service.Files.Create(fileMetaData, content, $"image/{extension}");
            request.Fields = "id";
            var results = await request.UploadAsync(CancellationToken.None);

            var uploadedFile = await service.Files.Get(request.ResponseBody?.Id).ExecuteAsync();
            return (uploadedFile.Id).ToString();
        }

        public async Task<string> UploadImageThumbnailOfBook(Stream content, string extension, int countImage, int bookId)
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
                Name = $"BookId:{bookId}-{countImage + 1}",
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
