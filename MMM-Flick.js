/**
 *	@Description:
 *  	This module reads data from skywriter gesture sensor and displays it
 *		on your magic mirror
 *	@Author:
 *  	Kai Sackville-Hii
 * 	@Date:
 * 		May, 2018
 */

Module.register("MMM-Flick", {
	// Default module config.
	defaults: {
		swipeState: "",
		inRange: false
	},

	getStyles() {
		return [this.file("/css/main.css")];
	},

	start() {
		Log.log('MMM-Flick started!');
		this.sendSocketNotification("START_PY", {os: window.navigator.platform});
	},

	socketNotificationReceived(notification, payload) {
		if (notification === "SENSOR_SWIPED") {
			this.config.swipeState = payload.action;
			this.updateDom();
			// this.sendNotification('SENSOR_SWIPED', {action:payload.action});
		}
	},

	getArrows() {
	  var leftClassName = "idle-menu-items";
	  var rightClassName = "idle-menu-items";
	  var airwheelClassName = "idle-menu-items";

		if(this.config.swipeState) {
			console.log(this.config.swipeState);
			if(this.config.swipeState === "left\r\n"){
				console.log(1);
			}
		}

		// switch (this.config.swipeState) {
		// 	case 'left':
		// 		console.log('1');
		// 		break;
		// 	case 'right':
		// 		console.log('2');
		// 		break;
		// 	default:
		// 		console.log(3);
		// 		break;
		// }

		// else if (this.config.swipeState === 'left') {
		// 	Log.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~ Flick ${this.config.swipeState}`)
		// 	leftClassName = 'test';
		// }
		// else if (this.config.swipeState === 'airwheel') {
		// 	airwheelClassName = 'test';
		// }

		var wrapper = document.createElement("div");

		wrapper.innerHTML = `
			<div>
			<img id="left" class=${leftClassName} src="modules/MMM-Flick/images/left_arrow.svg" alt="Kiwi standing on oval">
			<img class=${airwheelClassName} src="modules/MMM-Flick/images/airwheel.svg" alt="Kiwi standing on oval">
			<img class=${rightClassName} src="modules/MMM-Flick/images/right_arrow.svg" alt="Kiwi standing on oval">
			`;

		return wrapper;
	},

	// Override dom generator.
	getDom: function() {
		let content = this.getArrows();
		return content
	},
});
