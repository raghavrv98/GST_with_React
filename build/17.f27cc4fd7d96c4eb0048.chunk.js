(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{"52c04eee55174304c188":function(e,a,t){"use strict";t.r(a);var s=t("8af190b70a6bc55c6f1b"),r=t.n(s),o=(t("8a2d1b95e05b6a321e74"),t("d7dd51e1bf6bfc2c9c3d")),n=t("0d7f0986bcd2f33d8a2a"),i=t("ab039aecd4a1d4fedc0e"),c=t("a28fc3c963a1d4d1a2e5"),l=t("ab4cb61bcb2dc161defb"),d=t("adc20f99e57c573c589c"),m=t("d95b0cf107403b178365"),p=t("54f683fcda7806277002"),u="app/ManageAccountantReports/DEFAULT_ACTION",f=Object(p.fromJS)({});var b=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:f;switch((arguments.length>1?arguments[1]:void 0).type){case u:default:return e}},g=function(e){return e.get("manageAccountantReports",f)},h=function(){return Object(c.a)(g,function(e){return e.toJS()})},v=regeneratorRuntime.mark(y);function y(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}},v,this)}Object(i.defineMessages)({header:{id:"".concat("app.containers.ManageAccountantReports",".header"),defaultMessage:"This is the ManageAccountantReports container!"}}),t("868115dbc0cccbfa5202");var N,R=t("4cad7676f6ad23a52c95"),w=t("bd183afcc37eabd79225"),O=t.n(w),A=t("b13fad99b312e52ff2bb"),C=t("7e06b3d41be6bf0b9866");function j(e){return(j="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _(e,a,t,s){N||(N="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var r=e&&e.defaultProps,o=arguments.length-3;if(a||0===o||(a={children:void 0}),a&&r)for(var n in r)void 0===a[n]&&(a[n]=r[n]);else a||(a=r||{});if(1===o)a.children=s;else if(o>1){for(var i=new Array(o),c=0;c<o;c++)i[c]=arguments[c+3];a.children=i}return{$$typeof:N,type:e,key:void 0===t?null:""+t,ref:null,props:a,_owner:null}}function S(e,a){for(var t=0;t<a.length;t++){var s=a[t];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}function M(e){return(M=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function k(e,a){return(k=Object.setPrototypeOf||function(e,a){return e.__proto__=a,e})(e,a)}function L(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function x(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}t.d(a,"ManageAccountantReports",function(){return H});var T=_(n.Helmet,{},void 0,_("title",{},void 0,"ManageAccountantReports"),_("meta",{name:"description",content:"Description of ManageAccountantReports"})),P=_("div",{className:"lds-facebook"},void 0,_("div",{}),_("div",{}),_("div",{}),_("span",{className:"loading-text-r"},void 0,"Loading... ")),D=_("i",{className:"fa fa-home","aria-hidden":"true"}),U=_("span",{className:"breadcrumb-text-r"},void 0,"Home"),I=_("i",{className:"fa fa-files-o","aria-hidden":"true"}),Y=_("span",{className:"breadcrumb-text-r"},void 0,"User Details"),B=_("i",{className:"fa fa-files-o","aria-hidden":"true"}),F=_("p",{className:"static-title-r"},void 0,"GST Reports"),E=_("p",{className:"static-title-r"},void 0,"Daily Reports"),G=_("p",{className:"static-title-r"},void 0,"Faulty Bills"),H=function(e){function a(){var e,t,s,r;!function(e,a){if(!(e instanceof a))throw new TypeError("Cannot call a class as a function")}(this,a);for(var o=arguments.length,n=new Array(o),i=0;i<o;i++)n[i]=arguments[i];return s=this,r=(e=M(a)).call.apply(e,[this].concat(n)),t=!r||"object"!==j(r)&&"function"!==typeof r?L(s):r,x(L(L(t)),"state",{isOpenClassName:"modal display-none container",userReports:[],isLoading:!0,faultyBills:[]}),x(L(L(t)),"getUserReports",function(e,a,s,r,o){if("daily"===r){var n=window.API_URL+"/dailyReports/".concat(e,"/").concat(a,"/").concat(s,"/").concat(o);O.a.get(n).then(function(e){var a=e.data.data;t.setState({userReports:a,isFetching:!1,isLoading:!1})}).catch(function(e){var a=Object(C.b)(e);t.setState({message:a,isOpenClassName:"modal display-block container",type:"failure",isLoading:!1},function(){return setTimeout(t.modalTime,1500)})})}else{var i=window.API_URL+"/gstReports/".concat(e,"/").concat(a,"/").concat(s);O.a.get(i).then(function(e){var a=e.data.data;t.setState({userReports:a,isFetching:!1,isLoading:!1})}).catch(function(e){var a=Object(C.b)(e);t.setState({message:a,isOpenClassName:"modal display-block container",type:"failure",isLoading:!1},function(){return setTimeout(t.modalTime,1500)})})}}),x(L(L(t)),"getfaultyBills",function(e,a,s,r){var o=window.API_URL+"/faultyBills/".concat(e,"/").concat(a,"/").concat(s,"/").concat(r);O.a.get(o).then(function(e){var a=e.data.data;t.setState({faultyBills:a,isLoading:!1})}).catch(function(e){var a=Object(C.b)(e);t.setState({message:a,isOpenClassName:"modal display-block container",type:"failure",isLoading:!1},function(){return setTimeout(t.modalTime,1500)})})}),x(L(L(t)),"resendReport",function(e){var a=e.target.id,s=t.props.match.params.id,r=t.props.match.params.report,o="faultyBills"===e.target.name?window.API_URL+"/resendFaultyBill/".concat(s,"/").concat(a):window.API_URL+"/resendReport/".concat(s,"/").concat(a,"/").concat(r);O.a.put(o).then(function(e){e.data.data;t.setState({message:e.data.message,isLoading:!1,type:"success",isOpenClassName:"modal display-block container"},function(){return setTimeout(t.modalTime,1500)})}).catch(function(e){var a=Object(C.b)(e);t.setState({message:a,isOpenClassName:"modal display-block container",type:"failure",isLoading:!1},function(){return setTimeout(t.modalTime,1500)})})}),x(L(L(t)),"modalCloseHandler",function(){t.setState({isResetModal:!1,isOpenClassName:"modal display-none container",deleteId:"",deleteName:""})}),x(L(L(t)),"modalTime",function(){t.setState({isOpenClassName:"modal display-none container",isFetching:!1})}),t}var s,o,n;return function(e,a){if("function"!==typeof a&&null!==a)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(a&&a.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),a&&k(e,a)}(a,r.a.Component),s=a,(o=[{key:"componentWillMount",value:function(){var e=this.props.match.params.id,a=this.props.match.params.report;"gst"===a?this.getUserReports(e,this.props.match.params.month,this.props.match.params.year,a):(this.getfaultyBills(this.props.match.params.id,this.props.match.params.month,this.props.match.params.year,this.props.match.params.date),this.getUserReports(e,this.props.match.params.month,this.props.match.params.year,a,this.props.match.params.date))}},{key:"render",value:function(){var e=this;return _("div",{},void 0,T,_(A.a,{showHideClassName:this.state.isOpenClassName,modalType:this.state.type,message:this.state.message,onClose:this.modalCloseHandler}),this.state.isLoading?P:_("div",{className:"container outer-box-r"},void 0,_("div",{},void 0,_("ul",{className:"breadCrumb-bg-r"},void 0,_("li",{className:"breadCrumb-li-child-1-r",onClick:function(){return e.props.history.push("/manageUser")}},void 0,D,U),_("li",{className:"breadCrumb-li-child-2-r",onClick:function(){return e.props.history.push("/userDetails/".concat(e.props.match.params.id,"/").concat(e.props.match.params.month,"/").concat(e.props.match.params.year))}},void 0,I,Y),_("li",{className:"breadCrumb-li-child-r"},void 0,B,_("span",{className:"breadcrumb-text-r"},void 0,"gst"===this.props.match.params.report?"GST Reports":"Daily Reports")))),"gst"===this.props.match.params.report?_(r.a.Fragment,{},void 0,F,_("div",{className:"text-align-center-r"},void 0,this.state.userReports.length>0?this.state.userReports.map(function(a,s){return _(r.a.Fragment,{},s,_("div",{className:"card-report-r"},void 0,_("span",{className:"resend-report-icon-r"},void 0,_("button",{id:a._id,onClick:e.resendReport,className:"fa fa-share"})),a.type&&a.type.includes("image")?_("img",{className:"selected-report-image-r",src:window.API_URL_IMAGE+"/gst-reports/"+a.img}):_("img",{className:"selected-image-r",src:t("4b88011fc8430a35928c")}),_("p",{className:"card-selected-heading-r"},void 0,a.originalName),_("p",{className:"card-selected-sub-heading-r"},void 0,"Created At : ",Object(R.a)(a.timestamp).format("DD MMM YYYY")),_("p",{className:"card-text-r"},void 0,a.comment)))}):_("img",{className:"nodata-img1-r",src:t("8de7e6c44efb005a1063")}))):_(r.a.Fragment,{},void 0,_("div",{className:"col-xs-12 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6"},void 0,E,_("div",{className:"report-card-scroll"},void 0,_("div",{className:"text-align-center-r"},void 0,this.state.userReports.length>0?this.state.userReports.map(function(a,s){return _(r.a.Fragment,{},s,_("div",{className:"card-report-r"},void 0,_("span",{className:"resend-report-icon-r"},void 0,_("button",{id:a._id,onClick:e.resendReport,className:"fa fa-share"})),a.type&&a.type.includes("image")?_("img",{className:"selected-report-image-r",src:window.API_URL_IMAGE+"/daily-reports/"+a.img}):_("img",{className:"selected-image-r",src:t("4b88011fc8430a35928c")}),_("p",{className:"card-selected-heading-r"},void 0,a.originalName),_("p",{className:"card-selected-sub-heading-r"},void 0,"Report Date : ",Object(C.a)(a.reportDate)),_("p",{className:"card-selected-sub-heading-r"},void 0,"Created At : ",Object(R.a)(a.timestamp).format("DD MMM YYYY")),_("p",{className:"card-text-r"},void 0,a.comment)))}):_("img",{className:"nodata-box-img1-r",src:t("8de7e6c44efb005a1063")})))),_("div",{className:"col-xs-12 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6"},void 0,G,_("div",{className:"report-card-scroll"},void 0,_("div",{className:"text-align-center-r"},void 0,this.state.faultyBills.length>0?this.state.faultyBills.map(function(a,s){return _(r.a.Fragment,{},s,_("div",{className:"card-report-r"},void 0,_("span",{className:"resend-report-icon-r"},void 0,_("button",{id:a._id,name:"faultyBills",onClick:e.resendReport,className:"fa fa-share"})),a.type&&a.type.includes("image")?_("img",{className:"selected-report-image-r",src:window.API_URL_IMAGE+"/bills/"+a.img}):_("img",{className:"selected-image-r",src:t("4b88011fc8430a35928c")}),_("p",{className:"card-selected-heading-r"},void 0,a.originalName),_("p",{className:"card-selected-sub-heading-r"},void 0,"Created At : ",Object(R.a)(a.timestamp).format("DD MMM YYYY")),_("p",{className:"card-text-r"},void 0,a.comment)))}):_("img",{className:"nodata-box-img1-r",src:t("8de7e6c44efb005a1063")})))))))}}])&&S(s.prototype,o),n&&S(s,n),a}(),J=Object(c.b)({manageAccountantReports:h()});var $=Object(o.connect)(J,function(e){return{dispatch:e}}),W=Object(m.a)({key:"manageAccountantReports",reducer:b}),q=Object(d.a)({key:"manageAccountantReports",saga:y});a.default=Object(l.compose)(W,q,$)(H)}}]);