'use strict';
$(document).ready(
  function() {

    myApp.libraryPagination = (function() {
      /* display - 1: kafelki, 2: list  */
    var listElement, _per_page, numItems, num_pages, _display=1, _page, _config;

    function init(config) {
      _config = config;
      listElement = document.getElementsByClassName("thumbs-el");
      _per_page = _config["pagination"];
      numItems = listElement.length;
      num_pages = Math.ceil(numItems/_per_page);
      _page = 0;
      create_pageLinks();
      displayElements(_page, _per_page);
      addListeners();
    }

    function create_pageLinks() {
      var curr = 0;
      var _pagerels = document.getElementsByClassName("pager-el");

      if (_pagerels.length > 0) {
        var _pager = _pagerels[0].parentElement;
        for(var i = _pagerels.length-1; i >= 0; i--) {
          _pager.removeChild(_pagerels[i]);
        }
      }

      while(num_pages > curr) {
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


    function displayElements(startAt, _per_page) {
      var childNodesArr = Array.prototype.slice.call(listElement);
      childNodesArr.forEach(function(element) {
        element.style.display = "none";
      });

      childNodesArr = childNodesArr.slice(startAt, _per_page);
      childNodesArr.forEach(function(element) {
        element.style.display = (_display === 1) ? "inline-block" : "block";
      });

    }

    function addListeners() {
      var _pagerNodes = document.getElementsByClassName("pager-el");
      _pagerNodes = Array.prototype.slice.call(_pagerNodes);
      _pagerNodes.forEach(function(item) {
        item.addEventListener('click', goTo);
      });
    }

    function goTo(e){
      var el = e.target;
      _page = ~~el.innerHTML - 1;
      var startAt = _page * _per_page;
      var endOn = startAt + _per_page;


      displayElements(startAt, endOn);
    }

    function renderThumbs(display, per_page) {
      _display = display;
      _per_page = ~~per_page;
      var startAt = _page * _per_page;
      var endOn = startAt + _per_page;
      displayElements(startAt, endOn);
    }

    return {
      init: init,
      renderThumbs: renderThumbs
    }

  }());
});
