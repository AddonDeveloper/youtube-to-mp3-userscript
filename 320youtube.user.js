// ==UserScript==
// @name            YouTube mp3 320 kbps
// @description     The 320 kbps YouTube mp3 addon generates a 320 kbps - MP3 DOWNLOAD button on YouTube.com. Convert YouTube to mp3 and download the file to your device.
// @icon            https://www.320youtube.com/userscript/icon.png
//
// @author          Addon Developer
// @namespace       https://www.320youtube.com/
// @downloadURL     https://www.320youtube.com/userscript/320youtube.user.js
//
// @license         GPL-3.0-or-later
// @copyright       2019, Addon Developer
//
// @include         http://www.youtube.com/*
// @include         https://www.youtube.com/*
//
// @version         1.0
// @updateURL       https://www.320youtube.com/userscript/320youtube.user.js
//
// @run-at          document-end
// @unwrap
// ==/UserScript==

var mp3_button_onclick = function (){
  var path ='https://www.320youtube.com/convert?v='+encodeURIComponent(window.location);
  window.open(path,'_blank');
};

var getSpan = function(text, className) {
    var _tn = document.createTextNode(text);
    var span = document.createElement("span");
    span.className = className;
    span.appendChild(_tn);
    return span;
};

var myAppInterface = {
  init:function(){
    this.insertGlobalCSS()
  },
  addGlobalStyle: function(doc, css) {
    if(document.querySelector('.youtube320-css'))return;
    var head = doc.getElementsByTagName('head')[0];
    if (!head) {return; }
    var style = doc.createElement('style');
    style.id = 'youtube320-css';
    style.type = 'text/css';
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
    head.appendChild(style);
  },
  insertGlobalCSS: function(){
    var css = function (){
      /*start
      #youtube320.youtube-watch{padding-top:10px;overflow: auto;border-bottom: 1px solid #eee;padding-bottom: 10px;}
      #youtube320 .mp3_button{background-color: #cc0000;border: #cc0000;border-radius: 2px;color: #FFF;padding: 10px 16px; font-size: 1.4em;cursor:pointer;display:inline-block}
      @media (min-width: 657px){youtube-watch[theater] #youtube320.youtube-watch{margin-right:24px}}
      end*/
    }.toString().replace("/*start",'').replace("end*/",'').slice(14,-1);
    this.addGlobalStyle(document, css);
  },
}

var createButton = function() {
    var obj = document.querySelector('#primary-inner>#info');
    if(obj != null){
        // check if the button has already been created
        var btnRow = document.getElementById('youtube320');
        if(btnRow == null){
            myAppInterface.init()
            var youtube320 = document.createElement("div");
            youtube320.id = "youtube320";
            youtube320.className = "style-scope youtube-watch";

            var mp3_button = document.createElement("div");
            mp3_button.className = "style-scope mp3_button";

            mp3_button.appendChild(getSpan("320 kbps - MP3 DOWNLOAD"))

            mp3_button.onclick = mp3_button_onclick;

            obj.parentNode.insertBefore(youtube320, obj);
            youtube320.appendChild(mp3_button);
        }
    }
};

var intervalCheck = setInterval(function(){ createButton() }, 250);
