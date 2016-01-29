var libraryProcessor = (function() {

	var _config = {
		thumbs: "thumbs",
		thumbWidth : 300,
		thumbHeight : 300,
		canvasWidth : "1920",
		canvasHeight : "1080",
		canvasColor : "#000000",
		
	};

	function init(localConfig) {
		if (typeof localConfig !== "undefined")  {
			_config = commonComponents.overwrite(_config, localConfig);
		}

		libraryManagement.init(_config);
		libraryActions.init(_config);
		libraryView.init(_config)

	}

	return {
		init : init
	}



}());