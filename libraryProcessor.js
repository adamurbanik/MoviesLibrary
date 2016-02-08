$(document).ready(function($){
		myApp.libraryProcessor = (function() {

			var _config = {
				thumbs: "thumbs",
				pagination: 5,
				width: 400,
				height: 225

			};

			function init(localConfig) {
				if (typeof localConfig !== "undefined")  {
					_config = commonComponents.overwrite(_config, localConfig);
				}

				myApp.libraryManagement.init(_config);
				myApp.libraryActions.init(_config);
				myApp.libraryView.init(_config);
				
			}

			return {
				init : init
			}

		}());
	}
);
