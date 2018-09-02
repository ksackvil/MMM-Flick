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
			this.config.swipeState = payload.action
			this.updateDom()
			this.sendNotification('SENSOR_SWIPED', {action:payload.action});
		}
	},

	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");
		wrapper.className = "test"
		wrapper.innerHTML = this.config.swipeState
		return wrapper;
	},
});
