  const img = document.getElementById("img");
  var watts= Number(localStorage.getItem("watts"))|0;
  var co2= Number(localStorage.getItem("co2"))|0;
  var counter= Number(localStorage.getItem("counter"))|1;
  let batteryInfo = {
    level: '',
    levelText: '',
    time: '',
    timeText: '',
    wattsText:"used",
    co2Text:"of CO2 emitted",
  }


document.addEventListener('DOMContentLoaded', function() {

  navigator.getBattery().then(battery => {
    let date = new Date(null);
    var percentage = (battery.level * 100).toFixed();
    batteryInfo.level = percentage;
    if(percentage<localStorage.getItem("battery"))
    {
      var num = localStorage.getItem("battery")-percentage;
      localStorage.setItem("watts",watts+num);
      localStorage.setItem("counter",counter+num);
    }
    if(localStorage.getItem("counter")>1000)
    {
      localStorage.setItem("co2",co2+1);
      localStorage.setItem("counter",0);
    }
    localStorage.setItem("battery",percentage);


    if (battery.charging) {
      document.getElementById("img").src = "./images/icon-charging.png";
      batteryInfo.levelText = 'Charged';

      if (isFinite(battery.chargingTime) && battery.level !== 1) {
        date.setSeconds(battery.chargingTime);
        batteryInfo.time = date.toISOString().substr(11, 5);
        batteryInfo.timeText = 'Until Full';
      } else if (isFinite(battery.chargingTime) && battery.level === 1) {
        batteryInfo.levelText += ' ⚡️';
      } else {
        batteryInfo.timeText = '';
      }
    } else {

      document.getElementById("img").src = "./images/icon-not-charging.png";
      batteryInfo.levelText = 'Power Left';

      if (isFinite(battery.dischargingTime)) {
        date.setSeconds(battery.dischargingTime);
        batteryInfo.time = date.toISOString().substr(11, 5);
        batteryInfo.timeText = 'remaining';
      } else {
        batteryInfo.timeText = '';
      }
    }

    document.getElementById("batteryLife").innerText=batteryInfo.level+"% "+batteryInfo.levelText;
    document.getElementById("batteryTime").innerText=batteryInfo.time+" "+batteryInfo.timeText;
    document.getElementById("watts").innerText=watts+" watts "+batteryInfo.wattsText;
    document.getElementById("co2").innerText=co2+"lbs "+batteryInfo.co2Text;
  });
  document.getElementById("reset").addEventListener("click", reset);
  function reset()
  {
    localStorage.setItem("watts",0);
    localStorage.setItem("co2",0);
    document.getElementById("watts").innerText=0+" watts "+batteryInfo.wattsText;
    document.getElementById("co2").innerText=0+"lbs "+batteryInfo.co2Text;
  }
});
