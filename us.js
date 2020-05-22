//CS290 Project

document.addEventListener("DOMContentLoaded", bindButtons);  //listener for DOM content loaded

function bindButtons(){

  document.getElementById("inputSubmit").addEventListener("click", function(event){  //listener for submit button click

    var req = new XMLHttpRequest();
    var inputState = document.getElementById("State").value;  //user input state
    var inputSex = document.getElementById("Sex").value;  //user input sex
    var inputAge = document.getElementById("Age").value;  //user input age
    var appToken = "Fxcuw1MbpoA6KHvWEadazHzbU";

    var queryUrl = "https://data.cdc.gov/resource/9bhg-hcku.json?" + "state=" + inputState + "&sex=" + inputSex + "&age_group=" + inputAge + "&$$app_token=" + appToken;  //construct url by state and age
    
    req.open("GET", queryUrl, true);  //construct url

    req.addEventListener('load',function(){  //asynchronous load
      if(req.status >= 200 && req.status < 400){
        var response = JSON.parse(req.responseText)
        var obj = response[response.length-1]
        //display results
        if (typeof obj.covid_19_deaths === "undefined") {
        document.getElementById("c_death").textContent = "*"
        }
        else{
        document.getElementById("c_death").textContent = obj.covid_19_deaths;
		}

        if (typeof obj.influenza_deaths === "undefined") {
        document.getElementById("i_death").textContent = "*"
        }
        else{
        document.getElementById("i_death").textContent = obj.influenza_deaths;
		}

        if (typeof obj.pneumonia_deaths === "undefined") {
        document.getElementById("p_death").textContent = "*"
        }
        else{
        document.getElementById("p_death").textContent = obj.pneumonia_deaths;
		}

        if (typeof obj.pneumonia_and_covid_19_deaths === "undefined") {
        document.getElementById("p_c_death").textContent = "*"
        }
        else{
        document.getElementById("p_c_death").textContent = obj.pneumonia_and_covid_19_deaths;
		}

        if (typeof obj.pneumonia_influenza_or_covid === "undefined") {
        document.getElementById("p_i_c_death").textContent = "*"
        }
        else{
        document.getElementById("p_i_c_death").textContent = obj.pneumonia_influenza_or_covid;
		}
        
        document.getElementById("date").textContent = obj.data_as_of;
        document.getElementById("start").textContent = obj.start_week;
        document.getElementById("end").textContent = obj.end_week;
        document.getElementById("download").value = "Download all data for " + obj.state;

        if (typeof obj.footnote !== "undefined") {
        document.getElementById("note").textContent = "*Note: " + obj.footnote;
		}
        else {
        document.getElementById("note").textContent = obj.footnote
		}
      } else {
        console.log("Error in network request: " + req.statusText);
      }

    var rssUrl = "https://tools.cdc.gov/api/v2/resources/media/404952.rss";  //construct url
    
    req.open("GET", rssUrl, true);  //construct url

    req.addEventListener('load',function(){  //asynchronous load
      if(req.status >= 200 && req.status < 400){
        let doc = req.responseText;
        console.log(doc);
        doc.querySelectorAll('item').forEach((item) => {
        rss.textContent = item.querySelector('title').textContent;
        document.querySelector('output').appendChild(rss);
        })
       } else {
        console.log("Error in network request: " + req.statusText);
       }
    });

    document.getElementById("download").addEventListener("click", function(){  //download file
        var filename = "test.txt";
    
        download(filename, obj);
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
