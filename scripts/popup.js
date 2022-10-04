  const img = document.getElementById("img");
  var watts= Number(localStorage.getItem("watts"))|0;
  var co2= localStorage.getItem("co2")!==null ? localStorage.getItem("co2"):0;
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
      console.log("hi");
      var num = localStorage.getItem("battery")-percentage;
      localStorage.setItem("watts",watts+num);
      var temp = JSON.parse(localStorage.getItem("co2"));
      temp = Math.round((temp+0.385) * 1000) / 1000;
      temp= JSON.stringify(temp);
      co2=temp;
      localStorage.setItem("co2",temp);
    }
    localStorage.setItem("battery",percentage);
    console.log(localStorage.getItem("co2"));


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
    document.getElementById("co2").innerText=co2+"g "+batteryInfo.co2Text;
  });
  document.getElementById("reset").addEventListener("click", reset);
  function reset()
  {
    localStorage.setItem("watts",0);
    localStorage.setItem("co2",0);
    document.getElementById("watts").innerText=0+" watts "+batteryInfo.wattsText;
    document.getElementById("co2").innerText=0+"g "+batteryInfo.co2Text;
  }
});
