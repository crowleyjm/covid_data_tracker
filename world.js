//CS290 Project

document.addEventListener("DOMContentLoaded", bindButtons);  //listener for DOM content loaded

function bindButtons(){

  document.getElementById("inputSubmit").addEventListener("click", function(event){  //listener for submit button click

    var req = new XMLHttpRequest();

    var queryUrl = "https://api.covid19api.com/summary";  //construct url by state and age
    
    req.open("GET", queryUrl, true);  //construct url

    req.addEventListener('load',function(){  //asynchronous load
      if(req.status >= 200 && req.status < 400){
        var response = JSON.parse(req.responseText);
        var countries = response.Countries;
        countries.sort((a, b) => (a.TotalDeaths > b.TotalDeaths) ? -1 : 1);

        var loc = [];
        var tot = [];
        var colors = [];
        for(var i = 0; i < countries.length; i++) { 
          loc.push(countries[i].Country);
          tot.push(countries[i].TotalDeaths);
          colors.push("#b53334");
        }

        //display results
        document.getElementById("download").value = "Download data for world";
        new Chart(document.getElementById("horizontalBar"), {
        "type": "horizontalBar",
        "data": {
        "labels": loc,
        "datasets": [{
        "label": "Total Deaths by Country as of " + response.Date,
        "data": tot,
        "fill": false,
        "backgroundColor": colors,
        "borderColor": colors,
        "borderWidth": 1
        }]
        },
        "options": {
        "scales": {
        "xAxes": [{
        "ticks": { 
        "beginAtZero": true
        }
        }]
        }
        }
        });
      } else {
        console.log("Error in network request: " + req.statusText);
      }

   document.getElementById("download").addEventListener("click", function(){  //download file
        var filename = "test.txt";
    
       download(filename, response);
    }, false);

    });

    req.send(null);  //send no additional info
    event.preventDefault();  //prevent refresh

  });

  function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(text)));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

}


