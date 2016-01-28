/* A Module that registers all the events application.
 Mainly it is to add listeners of appropriate type for the given DOM element.
 The last handler argument provides callback function.*/
 var registerHandlersModule = ( function() {

  function addHandler(element, type, handler) {
    if (element.addEventListener) {
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent("on" + type, handler);
    } else {
      element["on" + type] = handler;
    }
  }

  function removeHandler(element, type, handler) {
    if (element.removeEventListener) {
      element.removeEventListener(type, handler, false);
    } else if (element.detachEvent) {
      element.detachEvent("on" + type, handler);
    } else {
      element["on" + type] = null;
    }
  }

  return {
    addHandler : addHandler,
    removeHandler : removeHandler
  }

}()); 