(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{"8937ca26cad1b574ef33":function(e,t,n){"use strict";n.r(t);var o=n("8af190b70a6bc55c6f1b"),r=n.n(o),a=(n("8a2d1b95e05b6a321e74"),n("d7dd51e1bf6bfc2c9c3d")),c=n("0d7f0986bcd2f33d8a2a"),i=n("ab039aecd4a1d4fedc0e"),u=n("a28fc3c963a1d4d1a2e5"),f=n("ab4cb61bcb2dc161defb"),d=n("adc20f99e57c573c589c"),s=n("d95b0cf107403b178365"),b=n("54f683fcda7806277002"),l="app/NotFoundPage/DEFAULT_ACTION",p=Object(b.fromJS)({});var y=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:p;switch((arguments.length>1?arguments[1]:void 0).type){case l:default:return e}},v=function(e){return e.get("notFoundPage",p)},h=function(){return Object(u.a)(v,function(e){return e.toJS()})},g=regeneratorRuntime.mark(m);function m(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}},g,this)}var w;Object(i.defineMessages)({header:{id:"".concat("app.containers.NotFoundPage",".header"),defaultMessage:"This is the NotFoundPage container!"}});function O(e,t,n,o){w||(w="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var r=e&&e.defaultProps,a=arguments.length-3;if(t||0===a||(t={children:void 0}),t&&r)for(var c in r)void 0===t[c]&&(t[c]=r[c]);else t||(t=r||{});if(1===a)t.children=o;else if(a>1){for(var i=new Array(a),u=0;u<a;u++)i[u]=arguments[u+3];t.children=i}return{$$typeof:w,type:e,key:void 0===n?null:""+n,ref:null,props:t,_owner:null}}function P(e){return(P="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function j(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function F(e,t){return!t||"object"!==P(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function N(e){return(N=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function S(e,t){return(S=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}n.d(t,"NotFoundPage",function(){return k});var _=O("div",{},void 0,O(c.Helmet,{},void 0,O("title",{},void 0,"NotFoundPage"),O("meta",{name:"description",content:"Description of NotFoundPage"})),O("div",{className:"notFoundBackgroundImage-r"},void 0,O("div",{className:"container outer-box-r"},void 0,O("div",{className:"not-found-box-r"},void 0,O("h1",{className:"heading-404-r"},void 0,"404"),O("h1",{className:"sub-heading-404-r"},void 0,"Page Not Found"))))),k=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),F(this,N(t).apply(this,arguments))}var n,o,a;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&S(e,t)}(t,r.a.Component),n=t,(o=[{key:"render",value:function(){return _}}])&&j(n.prototype,o),a&&j(n,a),t}(),T=Object(u.b)({notFoundPage:h()});var x=Object(a.connect)(T,function(e){return{dispatch:e}}),E=Object(s.a)({key:"notFoundPage",reducer:y}),J=Object(d.a)({key:"notFoundPage",saga:m});t.default=Object(f.compose)(E,J,x)(k)}}]);