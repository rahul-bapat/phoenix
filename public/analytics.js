function toggleExpanded() {
  var ui = document.getElementById("ui");
  ui.classList.toggle("expanded");
}
var pagename="default";
var url = document.getElementById('analytics_link') ? document.getElementById('analytics_link').value : "https://www.us.jll.com";
if(url.charAt(url.length-1)==('/')){
   url= url.substring('0',url.length-1)
}
var url="MATCH '"+url+ "'";
var API_result='';
var itemId='';
var myHeaders = new Headers();
myHeaders.append("x-api-key", "fa8fb0d46f774bb995695e9a071d9ef4");
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Accept", "application/json");
myHeaders.append("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsIng1dSI6Imltc19uYTEta2V5LWF0LTEuY2VyIiwia2lkIjoiaW1zX25hMS1rZXktYXQtMSIsIml0dCI6ImF0In0.eyJpZCI6IjE2OTY3NzQzODM1MDJfNWEzMmExMDktMGI4YS00MTlmLTllMzItM2YwYTUyNDRmNzVlX3VlMSIsIm9yZyI6IjU0M0RGREFFNTlENzZEMUQwQTQ5NUM0NkBBZG9iZU9yZyIsInR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJjbGllbnRfaWQiOiJmYThmYjBkNDZmNzc0YmI5OTU2OTVlOWEwNzFkOWVmNCIsInVzZXJfaWQiOiIzOTkwMUUyRjY1MEQzMjRCMEE0OTVFQTVAdGVjaGFjY3QuYWRvYmUuY29tIiwiYXMiOiJpbXMtbmExIiwiYWFfaWQiOiIzOTkwMUUyRjY1MEQzMjRCMEE0OTVFQTVAdGVjaGFjY3QuYWRvYmUuY29tIiwiY3RwIjozLCJtb2kiOiJjYTA4YmM5MSIsImV4cGlyZXNfaW4iOiI4NjQwMDAwMCIsInNjb3BlIjoib3BlbmlkLEFkb2JlSUQsYWRkaXRpb25hbF9pbmZvLnByb2plY3RlZFByb2R1Y3RDb250ZXh0IiwiY3JlYXRlZF9hdCI6IjE2OTY3NzQzODM1MDIifQ.BAxL28FQVP43OaAQuwyCJ_drpAn39ynjy201GY-x_QBUtIJQ5OAXSoh0-J5chnAaBjGumJcF0mK-LZPUnxqtIh_Fl8COcLhlwzuX98gz4rMkhDG2op5eIi4sj9elEi1fVd9n4vqMEMhEqq5pY1JAyLXiwXa6kKwrIo-aIDD6hez08qlYU5cq6_SCgkAghDgfpzXq6kEaZvlej9VtK_d6D0ewlDlFX0kwkFEWAuWloV41ntMZlRSG8kgatsHqZ6QfgfTLRgdT9O50Wx-xNGbtn6mCb64_Y0ZCkv1XvOaklJ_Xe9REcZoeIJpEkWiwBhHGwHry9wdriXf4nrf9yG30vw");

var raw = JSON.stringify({
  "rsid": "vrs_jll0_jllusproduction",
  "globalFilters": [
    {
      "type": "dateRange",
      "dateRange": "2023-07-05T00:00:00.000/2023-10-05T00:00:00.000",
      "dateRangeId": "last90Days"
    }
  ],
  "search": {
    "clause": url
  },
  "metricContainer": {
    "metrics": [
      {
        "columnId": "0",
        "id": "metrics/occurrences",
        "sort": "desc"
      }
    ]
  },
  "dimension": "variables/prop5.page-url-without-params",
  "settings": {
    "limit": 5
  }
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://analytics.adobe.io/api/jll0/reports", requestOptions)
  .then(response => response.text())
  .then(result => next_action(result))
  .catch(error => console.log('error', error));

  function next_action(result){
  var itemId=JSON.parse(result).rows[0].itemId;
console.log(itemId);
if (itemId.length>0){
  fetch_pagedata(itemId);
}
  }

  function fetch_pagedata(itemId){
    var myHeaders = new Headers();
    myHeaders.append("x-api-key", "fa8fb0d46f774bb995695e9a071d9ef4");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsIng1dSI6Imltc19uYTEta2V5LWF0LTEuY2VyIiwia2lkIjoiaW1zX25hMS1rZXktYXQtMSIsIml0dCI6ImF0In0.eyJpZCI6IjE2OTY3NzQzODM1MDJfNWEzMmExMDktMGI4YS00MTlmLTllMzItM2YwYTUyNDRmNzVlX3VlMSIsIm9yZyI6IjU0M0RGREFFNTlENzZEMUQwQTQ5NUM0NkBBZG9iZU9yZyIsInR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJjbGllbnRfaWQiOiJmYThmYjBkNDZmNzc0YmI5OTU2OTVlOWEwNzFkOWVmNCIsInVzZXJfaWQiOiIzOTkwMUUyRjY1MEQzMjRCMEE0OTVFQTVAdGVjaGFjY3QuYWRvYmUuY29tIiwiYXMiOiJpbXMtbmExIiwiYWFfaWQiOiIzOTkwMUUyRjY1MEQzMjRCMEE0OTVFQTVAdGVjaGFjY3QuYWRvYmUuY29tIiwiY3RwIjozLCJtb2kiOiJjYTA4YmM5MSIsImV4cGlyZXNfaW4iOiI4NjQwMDAwMCIsInNjb3BlIjoib3BlbmlkLEFkb2JlSUQsYWRkaXRpb25hbF9pbmZvLnByb2plY3RlZFByb2R1Y3RDb250ZXh0IiwiY3JlYXRlZF9hdCI6IjE2OTY3NzQzODM1MDIifQ.BAxL28FQVP43OaAQuwyCJ_drpAn39ynjy201GY-x_QBUtIJQ5OAXSoh0-J5chnAaBjGumJcF0mK-LZPUnxqtIh_Fl8COcLhlwzuX98gz4rMkhDG2op5eIi4sj9elEi1fVd9n4vqMEMhEqq5pY1JAyLXiwXa6kKwrIo-aIDD6hez08qlYU5cq6_SCgkAghDgfpzXq6kEaZvlej9VtK_d6D0ewlDlFX0kwkFEWAuWloV41ntMZlRSG8kgatsHqZ6QfgfTLRgdT9O50Wx-xNGbtn6mCb64_Y0ZCkv1XvOaklJ_Xe9REcZoeIJpEkWiwBhHGwHry9wdriXf4nrf9yG30vw");
    
    var raw1 = JSON.stringify({
      "rsid": "vrs_jll0_jllusproduction",
      "globalFilters": [
        {
          "type": "dateRange",
          "dateRange": "2023-09-27T00:00:00.000/2023-10-03T00:00:00.000",
          "dateRangeId": "last7Days"
        }
      ],
      "metricContainer": {
        "metrics": [
          {
            "columnId": "1",
            "id": "metrics/pageviews",
            "filters": [
              "0"
            ]
          },
          {
            "columnId": "2",
            "id": "metrics/visits",
            "filters": [
              "1"
            ]
          },
          {
            "columnId": "3",
            "id": "metrics/visitors",
            "filters": [
              "2"
            ]
          },
          {
            "columnId": "4",
            "id": "metrics/bouncerate",
            "filters": [
              "3"
            ]
          },
          {
            "columnId": "5",
            "id": "metrics/event66",
            "filters": [
              "4"
            ]
          }
        ],
        "metricFilters": [
          {
            "id": "0",
            "type": "breakdown",
            "dimension": "variables/evar5.language-update-v5",
            "itemId": itemId
          },
          {
            "id": "1",
            "type": "breakdown",
            "dimension": "variables/evar5.language-update-v5",
            "itemId": itemId
          },
          {
            "id": "2",
            "type": "breakdown",
            "dimension": "variables/evar5.language-update-v5",
            "itemId": itemId
          },
          {
            "id": "3",
            "type": "breakdown",
            "dimension": "variables/evar5.language-update-v5",
            "itemId": itemId
          },
          {
            "id": "4",
            "type": "breakdown",
            "dimension": "variables/evar5.language-update-v5",
            "itemId": itemId
          }
        ]
      },
      "dimension": "variables/daterangeday",
      "settings": {
        "limit": 400,
        "page": 0,
        "dimensionSort": "asc",
        "nonesBehavior": "return-nones"
      }
    });
    
    var requestOptions1 = {
      method: 'POST',
      headers: myHeaders,
      body: raw1,
      redirect: 'follow'
    };
    
    fetch("https://analytics.adobe.io/api/jll0/reports", requestOptions1)
      .then(response => response.text())
      .then(result1 => next_Action1(result1))
      .catch(error => console.log('error', error));


  }

  function next_Action1(result1){
    var result1=JSON.parse(result1);
    console.log('page_data',result1);
   var page_data =result1.rows;
   console.log('page_data2',page_data);
   var page_data_string=JSON.stringify(page_data);
   var myHeaders2 = new Headers();
myHeaders2.append("Content-Type", "application/json");
myHeaders2.append("api-key", "11c293d759224b48b19e2bb069e61e10");
var content2="Below is the last 7 days adobe Analytics data of Pageviews, Visits, Unique Visitors, Bounce rate and page clicks for"+pagename+". Analyse the data and provide insights with numbers\n"+page_data_string;
console.log(content2);
var raw2 = JSON.stringify({
  "messages": [
    {
      "role": "user",
      "content": content2
    }
  ],
  "temperature": 0,
  "max_tokens": 3000,
  "stop": null
});

var requestOptions2 = {
  method: 'POST',
  headers: myHeaders2,
  body: raw2,
  redirect: 'follow'
};

fetch("https://salesforce-openai-playground.openai.azure.com/openai/deployments/gpt-35-turbo/chat/completions?api-version=2023-03-15-preview", requestOptions2)
  .then(response => response.text())
  .then(result2 => next_Action2(result2))
  .catch(error => console.log('error', error));
  }

  function next_Action2(result2){
result2=result2;
var insights=JSON.parse(result2).choices[0].message.content;
console.log(insights);
const paragraphs = insights.split('\n\n');

if (paragraphs[0] && paragraphs[0].startsWith("Insights:")) {
  paragraphs[0] = paragraphs[0].replace("Insights:", "");
  paragraphs.shift();
}


const insights_html = paragraphs.map((p) => `<p>${p}</p>`).join('\n');

console.log(insights_html);

var urlLink = url.replace('MATCH', '');

var insights_html_2= '<div id="ui" class="ui" onclick="toggleExpanded()">' +
                '<div class="ui-header">' +
                    '<h3>Analytics Insights</h3>' +
                '</div>' +
                '<div class="ui-content">' +
                   '<strong> Insights for : ' +  urlLink +'</strong>' +
                   '<div>'+insights_html+'</div>'+
                '</div>' +
             '</div>';
$('body').append(insights_html_2);

  }
