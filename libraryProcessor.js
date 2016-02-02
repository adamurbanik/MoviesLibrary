$(document).ready(function($){
		window.myApp.libraryProcessor = (function() {

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

				myApp.libraryManagement.init(_config);
				myApp.libraryActions.init(_config);
				myApp.libraryView.init(_config);
				// myApp.libraryPagination.init();
			}

			return {
				init : init
			}

		}());
	}
);