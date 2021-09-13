using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CryptoIOAPI.Models;

namespace CryptoIOAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CryptoIOController : ControllerBase
    {
        private readonly PaymentDetailContext _context;
        private readonly HttpClient client;

        public CryptoIOController(PaymentDetailContext context)
        {
            _context = context;
            client = new HttpClient()
            {
                BaseAddress = new Uri("https://monetization.api.unity.com")
            };
        }

        // GET: api/CryptoIO/ad_data/2021-09-01/2021-09-12
        [HttpGet("{start_date}/{end_date}")]
        public async Task<ActionResult<IEnumerable<AdsViewModel>>> GetUnityAdsData(string start_date, string end_date)
        {
            AdsViewModel revenueVM = new AdsViewModel();

            var url = string.Format("/stats/v1/operate/organizations/1790819?start={0}&end={1}", start_date, end_date);
            url += "&apikey=xxxxxxxxxxxxxxxxxxxxxx&fields=view_count,revenue_sum,available_sum&scale=all";
            var response = await client.GetAsync(url);
            if (response.IsSuccessStatusCode)
            {
                var stringResponse = await response.Content.ReadAsStringAsync();
                stringResponse = stringResponse.Replace("\n", "");

                revenueVM.view_count = int.Parse(stringResponse.Split(",")[4]);
                revenueVM.revenue_sum = float.Parse(stringResponse.Split(",")[5]);
                revenueVM.available_sum = float.Parse(stringResponse.Split(",")[6]);
            }
            else
            {
                return BadRequest(response.ReasonPhrase);
            }

            return Ok(revenueVM);
        }

        public class AdsViewModel
        {
            public int view_count { get; set; }
            public float revenue_sum { get; set; }
            public float available_sum { get; set; }
        }

    }
}
