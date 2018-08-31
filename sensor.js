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

function listen(os, nh){
  var cmd = null;

  // change spawn based on os
  if(os === 'Win32' || os === 'MacIntel') {
      cmd = spawn('cmd', ['/c', 'py', './modules/MMM-Flick/test.py']);
  }
  else if ( os === 'MacIntel') {
      cmd = span('python',['./modules/MMM-Flick/test.py'])
  }
  else {
      cmd = spawn('python',['./modules/MMM-Flick/FlickSensor.py'])
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
