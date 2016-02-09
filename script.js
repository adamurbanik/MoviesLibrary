window.myApp = {};

$(document).ready(function(){
		var config = {
			thumbs: "thumbs",
			pagination: 5,
			thumbWidth: 150,
			thumbHeight: 150,
			videoWidth : 480,
			videoHeight: 385

		};
		myApp.libraryProcessor.init(config);
	}
);
