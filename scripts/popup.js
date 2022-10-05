const img = document.getElementById("img");
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
    var watts= Number(localStorage.getItem("watts")!==null ?localStorage.getItem("watts"):100-percentage);
    var co2= localStorage.getItem("co2")!==null ? localStorage.getItem("co2"):0.385*(100-percentage);
    localStorage.setItem("watts",watts);
    localStorage.setItem("co2",co2);
    if(percentage<localStorage.getItem("battery"))
    {
      var num = localStorage.getItem("battery")-percentage;
      localStorage.setItem("watts",watts+num);
      var temp = JSON.parse(localStorage.getItem("co2"));
      temp = Math.round((temp+0.385) * 1000) / 1000;
      temp= JSON.stringify(temp);
      co2=temp;
      localStorage.setItem("co2",temp);
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
    document.getElementById("co2").innerText=co2+"g "+batteryInfo.co2Text;
  });
  document.getElementById("donate").addEventListener("click", donate);
  function donate()
  {
    window.open("https://paypal.me/ronantakizawa?country.x=US&locale.x=en_US","_blank");
  }
});
