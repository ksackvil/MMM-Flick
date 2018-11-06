/**
 *	@Description:
 *  	This file handles the child process nessisary to talk between the sensor
 *    (python) and magic mirror (js)
 *	@Author:
 *  	Kai Sackville-Hii
 * 	@Date:
 * 		May, 2018 ckk
 */

const { spawn } = require('child_process');

function listen(payload, nh){
  var cmd = null;
  var os = payload.os;
  var sensor = payload.sensor;

  // change spawn based on os and if sensor is connected
  if(os === 'Win32') {
      if (sensor) {
        cmd = spawn('cmd', ['/c', 'py', './modules/MMM-Flick/FlickSensor.py']);
      }
      else {
        // cmd = spawn('cmd', ['/c', 'py', './modules/MMM-Flick/test.py']);
      }
  }
  else {
      if (sensor) {
        cmd = spawn('python',['./modules/MMM-Flick/FlickSensor.py'])
      }
      else {
        cmd = spawn('python', ['./modules/MMM-Flick/test.py'])
      }
  }


  cmd.stdout.on('data', (data) => {
    var str_data = data.toString()
    str_data = str_data.slice(0,-1)
    nh.sendSocketNotification("SENSOR_SWIPED", {action: str_data});
  });
  cmd.stderr.on('data', (data) => {
    console.log(data.toString());
  });
  cmd.on('exit', (code) => {
    console.log(`Child exited with code ${code}`);
  });
}

module.exports = {
    listen,
};
