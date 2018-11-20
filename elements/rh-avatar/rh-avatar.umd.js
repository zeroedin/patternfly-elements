!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e(require("../rhelement/rhelement.umd.js")):"function"==typeof define&&define.amd?define(["../rhelement/rhelement.umd.js"],e):t.RhAvatar=e(t.RHElement)}(this,function(i){"use strict";function u(t,e,r){return r<0&&(r+=1),1<r&&(r-=1),6*r<1?t+6*(e-t)*r:2*r<1?e:3*r<2?t+(e-t)*(2/3-r)*6:t}i=i&&i.hasOwnProperty("default")?i.default:i;var e=function(){function n(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(t,e,r){return e&&n(t.prototype,e),r&&n(t,r),t}}(),o=function t(e,r,n){null===e&&(e=Function.prototype);var a=Object.getOwnPropertyDescriptor(e,r);if(void 0===a){var i=Object.getPrototypeOf(e);return null===i?void 0:t(i,r,n)}if("value"in a)return a.value;var o=a.get;return void 0!==o?o.call(n):void 0},s=function(t){if(Array.isArray(t)){for(var e=0,r=Array(t.length);e<t.length;e++)r[e]=t[e];return r}return Array.from(t)},t=function(t){function a(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,a),function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(a.__proto__||Object.getPrototypeOf(a)).call(this,a))}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(a,i),e(a,[{key:"html",get:function(){return'\n<style>\n:host {\n  --rh-avatar--pattern-color1: var(\n    --rh-avatar--color--background,\n    var(--rh-theme--color--ui-accent, #cce6ff)\n  );\n  --rh-avatar--pattern-color2: var(\n    --rh-avatar--color--foreground,\n    var(--rh-theme--color--ui-accent--hover, #cce6ff)\n  );\n  --rh-avatar--text-color: var(--rh-theme--color--text--on-dark, #333);\n  --rh-avatar--font-size: var(--rh-theme--font-size--heading--alpha, 1em);\n  --rh-avatar--width: 128px;\n  display: block;\n  position: relative;\n  width: var(--rh-avatar--width);\n  height: var(--rh-avatar--width); }\n  :host canvas {\n    width: 100%;\n    height: 100%;\n    image-rendering: optimizeSpeed;\n    \n    image-rendering: -moz-crisp-edges;\n    \n    image-rendering: -webkit-optimize-contrast;\n    \n    image-rendering: -o-crisp-edges;\n    \n    image-rendering: pixelated;\n    \n    -ms-interpolation-mode: nearest-neighbor;\n     }\n  :host #initials {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    color: var(--rh-avatar--text-color);\n    font-size: calc(2 * var(--rh-avatar--font-size));\n    line-height: 1em;\n    font-weight: bold;\n    text-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3); }\n\n:host([shape="rounded"]) img,\n:host([shape="rounded"]) canvas {\n  border-radius: calc(var(--rh-avatar--width) / 8 + 1px); }\n\n:host([shape="circle"]) img,\n:host([shape="circle"]) canvas {\n  border-radius: 50%; }\n\n:host([src]) canvas {\n  display: none; }\n\n:host([src]) img {\n  display: block;\n  width: 100%;\n  height: 100%;\n  object-fit: cover; }\n\n:host(:not([src])) img {\n  display: none; }\n\n:host(:not([show-initials])) #initials {\n  display: none; }\n\n:host([hidden]) {\n  display: none; }\n</style>\n<div id="initials"></div>\n<canvas></canvas>\n<img>'}},{key:"templateUrl",get:function(){return"rh-avatar.html"}},{key:"styleUrl",get:function(){return"rh-avatar.scss"}},{key:"name",get:function(){return this.getAttribute("name")},set:function(t){return this.setAttribute("name",t)}},{key:"src",get:function(){return this.getAttribute("src")},set:function(t){return this.setAttribute("src",t)}},{key:"pattern",get:function(){return this.getAttribute("pattern")||a.patterns.squares},set:function(t){if(a.patterns[t])return this.setAttribute("pattern",t);this.log('invalid pattern "'+t+'", valid patterns are: '+Object.values(a.patterns))}}],[{key:"tag",get:function(){return"rh-avatar"}},{key:"observedAttributes",get:function(){return["name","pattern","src","shape"]}},{key:"patterns",get:function(){return{triangles:"triangles",squares:"squares"}}}]),e(a,[{key:"connectedCallback",value:function(){o(a.prototype.__proto__||Object.getPrototypeOf(a.prototype),"connectedCallback",this).call(this),this._initCanvas(),this.dispatchEvent(new CustomEvent(a.tag+":connected",{bubbles:!1}))}},{key:"attributeChangedCallback",value:function(t,e,r){var n=this;o(a.prototype.__proto__||Object.getPrototypeOf(a.prototype),"attributeChangedCallback",this).apply(this,arguments),this.connected?this.update():this.addEventListener(a.tag+":connected",function(){return n.update()})}},{key:"_initCanvas",value:function(){this._canvas=this.shadowRoot.querySelector("canvas");var t=this.var("--rh-avatar--width").replace(/px$/,"");this._canvas.width=t,this._canvas.height=t,this._squareSize=this._canvas.width/8,this._triangleSize=this._canvas.width/4,this._ctx=this._canvas.getContext("2d")}},{key:"_findInitials",value:function(t){if(!t||0===t.length)return[];var e=t.trim().split(/\s+/);return[e[0][0],1<e.length?e[e.length-1][0]:""]}},{key:"_setInitials",value:function(t){this.shadowRoot.querySelector("#initials").textContent=t.join("")}},{key:"update",value:function(){if(this._setInitials(this._findInitials(this.name)),this.hasAttribute("src"))this.shadowRoot.querySelector("img").src=this.src;else{var t=function(t){for(var e=5381,r=t.length;r;)e=33*e^t.charCodeAt(--r);return e>>>0}(this.name).toString(2),e=t.split("").map(function(t){return Number(t)});this._colorIndex=Math.floor(a.colors.length*parseInt(t,2)/Math.pow(2,32)),this.color1=a.colors[this._colorIndex].color1,this.color2=a.colors[this._colorIndex].color2,this._clear(),this._drawBackground(),this.pattern===a.patterns.squares?this._drawSquarePattern(e):this.pattern===a.patterns.triangles&&this._drawTrianglePattern(e)}}},{key:"_clear",value:function(){this._ctx.clearRect(0,0,this._canvas.width,this._canvas.height)}},{key:"_drawBackground",value:function(){this._ctx.fillStyle=this.color1,this._ctx.fillRect(0,0,this._canvas.width,this._canvas.height)}},{key:"_drawSquarePattern",value:function(t){if(this._ctx.fillStyle=this.color2,this._ctx)for(var e=t.length;e--;)t[e]&&this._drawMirroredSquare(e%4,Math.floor(e/4))}},{key:"_drawMirroredSquare",value:function(t,e){this._ctx&&(this._drawSquare(t,e),this._drawSquare(7-t,e))}},{key:"_drawSquare",value:function(t,e){this._ctx.fillRect(this._squareSize*t,this._squareSize*e,this._squareSize,this._squareSize)}},{key:"_drawTrianglePattern",value:function(t){if(this._ctx.fillStyle=this.color2,this._ctx)for(var e=t.length;e--;)if(t[e]){var r=Math.floor(e/2)%2,n=Math.floor(e/4),a=[r,n],i=[r,n],o=[r,n];switch(e%4){case 0:i[1]++,o[0]++,o[1]++;break;case 1:i[0]++,o[0]++,o[1]++;break;case 2:i[0]++,o[1]++;break;case 3:a[0]++,i[0]++,i[1]++,o[1]++}this._drawMirroredTriangle(a,i,o)}}},{key:"_drawMirroredTriangle",value:function(t,e,r){this._ctx&&(this._drawTriangle(t,e,r),this._drawTriangle([4-t[0],t[1]],[4-e[0],e[1]],[4-r[0],r[1]]))}},{key:"_drawTriangle",value:function(t,e,r){var n,a,i,o=this;this._ctx.beginPath(),(n=this._ctx).moveTo.apply(n,s(t.map(function(t){return t*o._triangleSize}))),(a=this._ctx).lineTo.apply(a,s(e.map(function(t){return t*o._triangleSize}))),(i=this._ctx).lineTo.apply(i,s(r.map(function(t){return t*o._triangleSize}))),this._ctx.closePath(),this._ctx.fill(),this._ctx.fill()}},{key:"_drawGradient",value:function(){var t=this._ctx.createLinearGradient(0,this._canvas.height,this._canvas.width,0),e=this.color2,r=e,n=e;/^#[A-f0-9]{3}$/.test(e)?(r+="c",n+="0"):/^#[A-f0-9]{6}$/.test(e)&&(r+="cc",n+="00"),t.addColorStop(0,r),t.addColorStop(1,n),t.addColorStop(1,r),this._ctx.fillStyle=t,this._ctx.fillRect(0,0,this._canvas.width,this._canvas.height)}}],[{key:"_registerColors",value:function(){var a=this;return this.colors=[],i.var("--rh-avatar--colors").split(/\s+/).forEach(function(t){var e=void 0;switch(t.length){case 4:if(e=/^#([A-f0-9])([A-f0-9])([A-f0-9])$/.exec(t)){e.shift();var r=e.map(function(t){return parseInt(t+t,16)});a._registerColor(r)}else i.log("[rh-avatar] invalid color "+t);break;case 7:if(e=/^#([A-f0-9]{2})([A-f0-9]{2})([A-f0-9]{2})$/.exec(t)){e.shift();var n=e.map(function(t){return parseInt(t,16)});a._registerColor(n)}else i.log("[rh-avatar] invalid color "+t)}}),this.colors}},{key:"_registerColor",value:function(t){a.colors.push({color1:"rgb("+t.join(",")+")",color2:"rgb("+this._adjustColor(t).join(",")+")"})}},{key:"_adjustColor",value:function(t){var e=function(t,e,r){var n,a=void 0,i=void 0,o=Math.max(0,Math.min(255,t))/255,s=Math.max(0,Math.min(255,e))/255,h=Math.max(0,Math.min(255,r))/255,c=Math.min(Math.min(o,s),h),l=Math.max(Math.max(o,s),h),u=l-c;if(n=(l+c)/2,0===u)i=a=0;else{i=n<.5?u/(l+c):u/(2-l-c);var f=((l-o)/6+u/2)/u,d=((l-s)/6+u/2)/u,v=((l-h)/6+u/2)/u;o==l?a=v-d:s==l?a=1/3+f-v:h==l&&(a=2/3+d-f),a<0?a+=1:1<a&&(a-=1)}return[a,i,n]}.apply(void 0,s(t));return e[2]+=.1<e[2]?-.1:.1,function(t,e,r){var n=void 0,a=void 0,i=void 0,o=Math.max(0,Math.min(1,t)),s=Math.max(0,Math.min(1,e)),h=Math.max(0,Math.min(1,r));if(0==s)i=a=n=255*h;else{var c,l=void 0;n=255*u(c=2*h-(l=h<.5?h*(1+s):h+s-s*h),l,o+1/3),a=255*u(c,l,o),i=255*u(c,l,o-1/3)}return[n,a,i]}.apply(void 0,s(e))}}]),a}();return t._registerColors(),i.create(t),t});
//# sourceMappingURL=rh-avatar.umd.js.map
