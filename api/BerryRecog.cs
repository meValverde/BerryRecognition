using System;
using System.Net.Http.Headers;
using System.Text;
using System.Net.Http;
using System.Web;


namespace BerryApp
{
    public static class BerryRecog
    {
        [FunctionName("BerryRecog")]

        static void Main()
        {
            MakeRequest();
            Console.WriteLine("Hit ENTER to exit...");
            Console.ReadLine();
        }
        
        static async void MakeRequest()
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
            byte[] byteData = Encoding.UTF8.GetBytes("{body}");

            using (var content = new ByteArrayContent(byteData))
            {
               content.Headers.ContentType = new MediaTypeHeaderValue("<application/json >");
               response = await client.PostAsync(uri, content);
            }

        }
    }
}
