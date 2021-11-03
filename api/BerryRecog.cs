using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using System.Text;
using System.Net.Http;
using System.Web;

namespace BerryApp
{
    public static class BerryRecog
    {
        [FunctionName("BerryRecog")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            var client = new HttpClient();
            var queryString = HttpUtility.ParseQueryString(string.Empty);

            // Request headers
            client.DefaultRequestHeaders.Add("Prediction-key", "c577dc58f5374413a3fea829c4938399");

            // Request parameters
            queryString["application"] = "{string}";
            var uri = "https://berryprediction-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/1cd03d8e-e79a-4e17-ba18-a6d672ccd759/classify/iterations/berryR/url" + queryString;

            HttpResponseMessage response;

            // Request body
            byte[] byteData = Encoding.UTF8.GetBytes("https://www.amagerfaelled.dk/wp-content/uploads/2019/01/Sneb%C3%A6r-5-e1548490971374.jpg");

            using (var content = new ByteArrayContent(byteData))
            {
               content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
               response = await client.PostAsync(uri, content);
        }
    }
}
