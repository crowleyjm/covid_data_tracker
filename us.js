// CS290 Project Subpage1

document.addEventListener("DOMContentLoaded", bindButtons);  // listener for DOM content loaded

var obj = []
function bindButtons(){

  document.getElementById("inputSubmit").addEventListener("click", function(event){  // listener for submit button click
    var req = new XMLHttpRequest();
    var inputState = document.getElementById("State").value;  // user input state
    var inputSex = document.getElementById("Sex").value;  // user input sex
    var inputAge = document.getElementById("Age").value;  // user input age
    var appToken = "Fxcuw1MbpoA6KHvWEadazHzbU"; // app token from data.cdc.gov

    //construct url by state, sex, and age group
    var queryUrl = "https://data.cdc.gov/resource/9bhg-hcku.json?" + "state=" + inputState + "&sex=" + inputSex + "&age_group=" + inputAge + "&$$app_token=" + appToken;  
    
    req.open("GET", queryUrl, true);  // construct url for GET request

    req.addEventListener('load',function(){  // asynchronous load
      if(req.status >= 200 && req.status < 400){
        var response = JSON.parse(req.responseText)
        obj = response[response.length-1]

        // display current results in Bootstrap table
        // if footnote applies, display it and add "*" to appropriate cell in table
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
        document.getElementById("start").textContent = obj.start_date;
        document.getElementById("end").textContent = obj.end_date;
        document.getElementById("download").value = "Download selected data for " + obj.state;

        if (typeof obj.footnote !== "undefined" && (typeof obj.covid_19_deaths === "undefined" || 
        typeof obj.influenza_deaths === "undefined" || typeof obj.pneumonia_deaths === "undefined" || 
        typeof obj.pneumonia_and_covid_19_deaths === "undefined" || typeof obj.pneumonia_influenza_or_covid === "undefined")) {
        document.getElementById("note").textContent = "*Note: " + obj.footnote;
		}
        else {
        document.getElementById("note").textContent = ""
		}
      } else {
        console.log("Error in network request: " + req.statusText);
      }
    });

    req.send(null);  //send no additional info
    event.preventDefault();  //prevent refresh
  });
}

// download text file
document.getElementById("download").addEventListener("click", function(){  
  var filename = obj.state + "_" + obj.sex + "_" + obj.age_group + "_" + obj.data_as_of + ".txt";
  console.log(filename);
  download(filename, obj);
},false);


function download(filename, text) { // function to download as text file
  var element = document.createElement("a");
  element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(JSON.stringify(text)));
  element.setAttribute("download", filename); // filename constructed based on selections
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}