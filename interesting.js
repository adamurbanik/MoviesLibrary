		// for(var prop in movies) { 
		// 	if(movies.hasOwnProperty(prop)) {

		// 		var img = new Image();
		// 		img.onload = (function(value) {
		// 			return function() {
		// 				var thumb = new Image();
		// 				thumb.src = movies[value].thumb;
		// 				registerHandlersModule.addHandler(thumb, "click", function(event) { 
		// 					log(event.currentTarget.src);
		// 				});
		// 				document.getElementById(config.thumbs).appendChild(thumb);
		// 			}	
		// 		})(prop);
		// 		img.src = movies[prop].thumb;
		// 	}
		// }

		// var now = new Date().toISOString().slice(0, 10);