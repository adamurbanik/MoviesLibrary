'use strict';
$(document).ready(
  function(){

    myApp.libraryPagination = (function() {    
    var listElement, perPage, numItems, numPages, _display=1, page;

    function init() {
      listElement = document.getElementsByClassName("thumbs-el");
      perPage = 2; 
      numItems = listElement.length;
      numPages = Math.ceil(numItems/perPage);

      createPageLinks();
      displayElements(0, perPage);
      addListeners();
    } 

    function createPageLinks() {
      var curr = 0;
      var pagerels = document.getElementsByClassName("pager-el");
      
      if (pagerels.length > 0) {
        var pager = pagerels[0].parentElement;
        for(var i = pagerels.length-1; i >= 0; i--) {
          pager.removeChild(pagerels[i]);
        }
      }

      while(numPages > curr) {
        var link = document.createElement("a");
        link.href = "#";
        link.setAttribute("class", "page_link");
        var text = document.createTextNode(curr+1);
        link.appendChild(text);
        var li = document.createElement("li");
        li.setAttribute('class', 'pager-el');
        li.appendChild(link);
        document.getElementsByClassName("pager")[0].appendChild(li);
        curr++;
      }
      document.getElementsByClassName("page_link")[0].classList.add("active");  
    }


    function displayElements(startAt, perPage) {
      var childNodesArr = Array.prototype.slice.call(listElement);
      childNodesArr.forEach(function(element) {
        element.style.display = "none";
      });

      childNodesArr = childNodesArr.slice(startAt, perPage);
      childNodesArr.forEach(function(element) {
        element.style.display = (_display === 1) ? "inline-block" : "block";
      });  

    }

    function addListeners() {
      var pagerNodes = document.getElementsByClassName("pager-el");
      pagerNodes = Array.prototype.slice.call(pagerNodes);
      pagerNodes.forEach(function(item) {
        item.addEventListener('click', goTo);
      });  
    }

    function goTo(e){
      var el = e.target;
      page = ~~el.innerHTML - 1;
      var startAt = page * perPage;
      var endOn = startAt + perPage;


      displayElements(startAt, endOn);
    }

    function renderThumbs(display) {
      _display = display;
      var startAt = page * perPage;
      var endOn = startAt + perPage;
      displayElements(startAt, endOn);
    }

    return {
      init: init,
      renderThumbs: renderThumbs
    }

  }());
});












