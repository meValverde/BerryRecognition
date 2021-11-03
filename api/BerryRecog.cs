using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Net.Http;
using System.Net.Http.Headers;


namespace BerryApp
{
    public static class BerryRecog
    {
        [FunctionName("BerryRecog")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            ILogger log, string imageFilePath)
        {
            var client = new HttpClient();

            client.DefaultRequestHeaders.Add("Prediction-Key", "c577dc58f5374413a3fea829c4938399");

            string url = "https://berryprediction-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/1cd03d8e-e79a-4e17-ba18-a6d672ccd759/classify/iterations/berryR/url";

            HttpResponseMessage response;
            imageFilePath="https://www.jespersplanteskole.dk/media/catalog/product/cache/1/image/1200x1200/9df78eab33525d08d6e5fb8d27136e95/s/y/symphoricarpos_doorenbosii_white_hedge_79_95_13.jpg";

            byte[] byteData = GetImageAsByteArray(imageFilePath);

            using (var content = new ByteArrayContent(byteData))
            {
                content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
                response = await client.PostAsync(url, content);
                Console.WriteLine(await response.Content.ReadAsStringAsync());
            }
        }
        private static byte[] GetImageAsByteArray(string imageFilePath)
        {
            FileStream fileStream = new FileStream(imageFilePath, FileMode.Open, FileAccess.Read);
            BinaryReader binaryReader = new BinaryReader(fileStream);
            return binaryReader.ReadBytes((int)fileStream.Length);
        }
    }
}