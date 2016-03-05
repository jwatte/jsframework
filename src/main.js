/* jsframework
   the lightest weight framework!
   Copyright 2016 Jon Watte.
   Released under the MIT license.
   See http://github.com/jwatte/jsframework
 */
var JS = {
    cache: {},
    asynchronize: function (f) {
        setTimeout(f, 0);
    },
    error: function(s) {
        if (console && console.log) {
            console.log("jsframework: " + s);
        }
    }
};
(function() {
  JS.require = function(url, complete) {
    var thing = this.cache[url];
    if (thing) {
        this.asynchronize(function() {
            complete(thing);
        });
        return;
    }
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    var self = this;
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            try {
                var v = eval("" + xhr.responseText);
                self.cache[url] = v;
                complete(v);
            } catch (x) {
                self.error("Fetching " + url + " didn't work out: " + x);
            }
        }
    }
    xhr.send();
  }
})();
