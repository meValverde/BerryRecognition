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
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req, ILogger log, ExecutionContext context)
        {
            var config = new ConfigurationBuilder()
            .SetBasePath(context.FunctionAppDirectory)
            .AddJsonFile("local.settings.json",optional:true, reloadOnChange:true)
            .AddEnvironmentVariables()
            .Build();
        

            var client = new HttpClient();
            var queryString = HttpUtility.ParseQueryString(string.Empty);

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            dynamic data=JsonConvert.DeserializeObject(requestBody);

            string body=data?.imageUrl;

            client.DefaultRequestHeaders.Add("Prediction-Key", config["CustomVisionKey"]);
           
            string uri = "https://berryprediction-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/1cd03d8e-e79a-4e17-ba18-a6d672ccd759/classify/iterations/berryR/url"; 
          
            HttpResponseMessage response;

            string responseBody;
            byte[] byteData = Encoding.UTF8.GetBytes("{'url':'"+body+"'}");

            using (var content = new ByteArrayContent(byteData))
            {
               content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
               response = await client.PostAsync(uri, content);
               responseBody = await response.Content.ReadAsStringAsync();
                
            }
           return new OkObjectResult(responseBody);

            
        }

            
              
    }
}
