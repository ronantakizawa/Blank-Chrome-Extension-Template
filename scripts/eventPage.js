function updateBatteryLevel(level, isCharging) {
  const batteryLevelText = level !== 1 ? (level * 100).toFixed() : '';
  const chargingStatus = isCharging ? 'charging' : 'not-charging';

  chrome.browserAction.setIcon({
    path: `./images/icon-${ chargingStatus }.png`
  });
}

function getBatteryStatus() {
  navigator.getBattery().then(battery => {
    updateBatteryLevel(battery.level, battery.charging);
  });
}

chrome.runtime.onInstalled.addListener(getBatteryStatus);
