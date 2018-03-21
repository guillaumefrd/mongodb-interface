var hostname = "localhost";
var tempTab = [];
var humidityTab = [];
var luminosityTab = [];
var dateTab = [];
var xhrResponse;

//getting all the data from the database
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    xhrResponse = JSON.parse(xhr.responseText);
    console.log(xhrResponse);
    xhrResponse.forEach(function(element){
      tempTab.push(element.temperature);
      humidityTab.push(element.humidity);
      luminosityTab.push(element.luminosity);
      var annee = element.datetime.split("-")[0];
      var mois = element.datetime.split("-")[1];
      var day = element.datetime.split("-")[2].split("T")[0];
      var time = element.datetime.split("-")[2].split("T")[1].split(".")[0];
      var date = day + "/" + mois +"/"+ annee +" "+time;
      dateTab.push(date);
    });
    charts();
  }
};
xhr.open('GET', "http://"+hostname+":3000/data", true);
xhr.send();


function charts(){
  var temp = document.getElementById('temp').getContext('2d');
  var hum = document.getElementById('hum').getContext('2d');
  var lum = document.getElementById('lum').getContext('2d');
  var tempChart = new Chart(temp, {
    type: 'line',
    data: {
        labels: dateTab,
        datasets: [{
          label: 'temperature',
          data: tempTab,
          backgroundColor: "rgba(255,0,0,0.4)",
          borderColor: "rgba(255,0,0)"
        }]
      },
      options: {
        scales: {
          yAxes : [{
            display: true,
                  ticks: {
                    min: 0,
                    max: 35
                  }
          }]
        }
      }
  });
  var lumChart = new Chart(lum, {
    type: 'line',
    data: {
        labels: dateTab,
        datasets: [{
          label: 'luminosity',
          data: luminosityTab,
          backgroundColor: "rgba(0,0,255,0.4)",
          borderColor: "rgba(0,0,255)"
        }]
      },
      options: {
        scales: {
          yAxes : [{
            display: true,
                  ticks: {
                    min: 0,
                    max: 1000
                  }
          }]
        }
      }
  });
  var humChart = new Chart(hum, {
    type: 'line',
    data: {
        labels: dateTab,
        datasets: [{
          label: 'humidity',
          data: humidityTab,
          backgroundColor: "rgba(0,255,0,0.4)",
          borderColor: "rgba(0,255,0)"
        }]
      },
      options: {
        scales: {
          yAxes : [{
            display: true,
                  ticks: {
                    min: 0,
                    max: 50
                  }
          }]
        }
      }
  });
}
