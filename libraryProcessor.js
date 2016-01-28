var libraryProcessor = (function() {

	var config = {
		thumbs: "thumbs",
		thumbWidth : 300,
		thumbHeight : 300,
		canvasWidth : "1920",
		canvasHeight : "1080",
		canvasColor : "#000000",
		
	};

	function init(localConfig) {
		if (typeof localConfig !== "undefined")  {
			config = commonComponents.overwrite(config, localConfig);
		}

		libraryManagement.init(config);
		libraryView.init(config)

	}

	return {
		init : init
	}



}());