(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{"53933e698c0e5594e4bb":function(e,t,a){"use strict";a.r(t);var n=a("8af190b70a6bc55c6f1b"),o=a.n(n),i=(a("8a2d1b95e05b6a321e74"),a("d7dd51e1bf6bfc2c9c3d")),r=a("0d7f0986bcd2f33d8a2a"),s=a("ab039aecd4a1d4fedc0e"),c=a("a28fc3c963a1d4d1a2e5"),l=a("ab4cb61bcb2dc161defb"),u=a("adc20f99e57c573c589c"),d=a("d95b0cf107403b178365"),p=a("54f683fcda7806277002"),v="app/ManageUser/DEFAULT_ACTION",f=Object(p.fromJS)({});var m=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:f;switch((arguments.length>1?arguments[1]:void 0).type){case v:default:return e}},h=function(e){return e.get("manageUser",f)},b=function(){return Object(c.a)(h,function(e){return e.toJS()})},y=regeneratorRuntime.mark(g);function g(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}},y,this)}Object(s.defineMessages)({header:{id:"".concat("app.containers.ManageUser",".header"),defaultMessage:"This is the ManageUser container!"}});var N,C=a("6e1a5b1a9427ffe7ff17"),T=a("bd183afcc37eabd79225"),w=a.n(T),O=a("4cad7676f6ad23a52c95"),S=a("b13fad99b312e52ff2bb"),k=a("7e06b3d41be6bf0b9866");function U(e){return(U="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function j(){return(j=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}function H(e,t,a,n){N||(N="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var o=e&&e.defaultProps,i=arguments.length-3;if(t||0===i||(t={children:void 0}),t&&o)for(var r in o)void 0===t[r]&&(t[r]=o[r]);else t||(t=o||{});if(1===i)t.children=n;else if(i>1){for(var s=new Array(i),c=0;c<i;c++)s[c]=arguments[c+3];t.children=s}return{$$typeof:N,type:e,key:void 0===a?null:""+a,ref:null,props:t,_owner:null}}function x(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function _(e){return(_=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function A(e,t){return(A=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function D(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function M(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}a.d(t,"ManageUser",function(){return de});var I=H("i",{className:"far fa-edit"}),E=H(C.a,{id:"edit",type:"dark"},void 0,H("div",{className:"tooltipText"},void 0,H("p",{},void 0,"Edit"))),F=H(r.Helmet,{},void 0,H("title",{},void 0,"ManageUser"),H("meta",{name:"description",content:"Description of ManageUser"})),P=H("div",{},void 0,H("ul",{className:"breadCrumb-bg-r"},void 0,H("li",{className:"breadCrumb-li-r"},void 0,H("i",{className:"fa fa-home","aria-hidden":"true"}),H("span",{className:"breadcrumb-text-r"},void 0,"Home")))),J=H("option",{disabled:!0,value:"0"},void 0,"Select Year"),R=H("option",{value:"2020"},void 0,"2020-2021"),Y=H("option",{value:"2019"},void 0,"2019-2020"),L=H("option",{value:"2018"},void 0,"2018-2019"),B=H("option",{value:"2017"},void 0,"2017-2018"),$=H("option",{disabled:!0,value:"0"},void 0,"Select Month"),z=H("option",{value:"4"},void 0,"April"),W=H("option",{value:"5"},void 0,"May"),q=H("option",{value:"6"},void 0,"June"),G=H("option",{value:"7"},void 0,"July"),K=H("option",{value:"8"},void 0,"August"),Q=H("option",{value:"9"},void 0,"September"),V=H("option",{value:"10"},void 0,"October"),X=H("option",{value:"11"},void 0,"November"),Z=H("option",{value:"12"},void 0,"December"),ee=H("option",{value:"1"},void 0,"January"),te=H("option",{value:"2"},void 0,"February"),ae=H("option",{value:"3"},void 0,"March"),ne=H("option",{disabled:!0,value:"0"},void 0,"Select User"),oe=H("option",{value:"all"},void 0,"All Users"),ie=H("option",{value:"withData"},void 0,"User with Data"),re=H("option",{value:"withoutData"},void 0,"User without Data"),se=H("option",{value:"inActive"},void 0,"InActive"),ce=H("option",{value:"active"},void 0,"Active"),le=H("i",{className:"fas fa-angle-left"}),ue=H("i",{className:"fas fa-angle-right"}),de=function(e){function t(){var e,a,n,o;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);for(var i=arguments.length,r=new Array(i),s=0;s<i;s++)r[s]=arguments[s];return n=this,o=(e=_(t)).call.apply(e,[this].concat(r)),a=!o||"object"!==U(o)&&"function"!==typeof o?D(n):o,M(D(D(a)),"state",{month:4,year:2020,userType:"withData",isFetching:!0,isOpenClassName:"modal display-none container"}),M(D(D(a)),"getUser",function(e,t,n,o){w.a.get("http://3.128.59.35:3000/users/".concat(e,"/").concat(t,"/").concat(n,"/").concat(o)).then(function(e){var t=e.data.data;a.setState({users:t,isFetching:!1})}).catch(function(e){var t=Object(k.a)(e);a.setState({message:t,isOpenClassName:"modal display-block container",type:"failure"},function(){return setTimeout(a.modalTime,1500)})})}),M(D(D(a)),"statusUpdate",function(e,t){w.a.put("http://3.128.59.35:3000/changeStatus/".concat(e),{status:t,year:a.state.year,month:a.state.month}).then(function(e){e.data.data;a.setState({message:e.data.message,isFetching:!0},function(){return a.getUser(a.state.accountantId,a.state.month,a.state.year,a.state.userType)})}).catch(function(e){var t=Object(k.a)(e);a.setState({message:t,isOpenClassName:"modal display-block container",type:"failure"},function(){return setTimeout(a.modalTime,1500)})})}),M(D(D(a)),"modalTime",function(){a.setState({isOpenClassName:"modal display-none container",isFetching:!1})}),M(D(D(a)),"nameChangeHandler",function(e){var t=a.state.year,n=a.state.month,o=a.state.userType,i=e.target.id;"year"===i?t=e.target.value:"month"===i?n=e.target.value:"userType"===i&&(o=e.target.value),a.setState({year:t,month:n,userType:o,isFetching:!0},function(){return a.getUser(a.state.accountantId,a.state.month,a.state.year,a.state.userType)})}),M(D(D(a)),"statusChangeHandler",function(e){var t=e.target.id,n=e.target.checked;a.setState({isFetching:!0},function(){return a.statusUpdate(t,n)})}),a}var a,n,i;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&A(e,t)}(t,o.a.Component),a=t,(n=[{key:"componentWillMount",value:function(){var e=localStorage.getItem("userId");this.getUser(e,this.state.month,this.state.year,this.state.userType),this.setState({accountantId:e})}},{key:"render",value:function(){var e=this,t=[{Header:"Created At",accessor:"timestamp",width:200,Cell:function(t){return H("div",{className:"onClick-cell-r",onClick:function(){e.props.history.push("/userDetails/".concat(t.original._id,"/").concat(e.state.month,"/").concat(e.state.year))}},void 0,Object(O.a)(t.original.timestamp).format("DD MMM YYYY HH:mm"))}},{Header:"Client Id",accessor:"clientId",width:150,filterable:!0,Cell:function(t){return H("div",{className:"onClick-cell-r",onClick:function(){e.props.history.push("/userDetails/".concat(t.original._id,"/").concat(e.state.month,"/").concat(e.state.year))}},void 0,t.original.clientId)}},{Header:"Legal Name",accessor:"legalName",filterable:!0,Cell:function(t){return H("div",{className:"onClick-cell-r",onClick:function(){e.props.history.push("/userDetails/".concat(t.original._id,"/").concat(e.state.month,"/").concat(e.state.year))}},void 0,t.original.legalName)}},{Header:"Trade Name",accessor:"tradeName",filterable:!0,Cell:function(t){return H("div",{className:"onClick-cell-r",onClick:function(){e.props.history.push("/userDetails/".concat(t.original._id,"/").concat(e.state.month,"/").concat(e.state.year))}},void 0,t.original.tradeName)}},{Header:"Status",accessor:"status",width:100,Cell:function(t){return H("div",{},void 0,H("input",{id:t.original._id,onChange:e.statusChangeHandler,disabled:"all"===e.state.userType||"active"===e.state.userType||"inActive"===e.state.userType,checked:t.original.status,className:"status-button-r",type:"checkbox"}))}},{Header:"Actions",sortable:!1,width:150,Cell:function(t){return H("div",{},void 0,H("span",{className:"editButton-r","data-tip":!0,"data-for":"edit",onClick:function(){e.props.history.push("/addOrEditUser/"+t.original._id)}},void 0,I,E))}}];return H("div",{},void 0,F,H(S.a,{showHideClassName:this.state.isOpenClassName,modalType:this.state.type,message:this.state.message,onClose:this.modalCloseHandler}),H("div",{className:"container outer-box-r"},void 0,P,H("div",{className:"container filter-year-month-r"},void 0,H("div",{className:"row"},void 0,H("div",{className:"col-xs-4 col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4"},void 0,H("select",{id:"year",disabled:"all"===this.state.userType||"active"===this.state.userType||"inActive"===this.state.userType,onChange:this.nameChangeHandler,value:this.state.year,className:"year-month-border-r",name:"lectureId"},void 0,J,R,Y,L,B)),H("div",{className:"col-xs-4 col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4"},void 0,H("select",{id:"month",disabled:"all"===this.state.userType||"active"===this.state.userType||"inActive"===this.state.userType,onChange:this.nameChangeHandler,value:this.state.month,className:"year-month-border-r",name:"lectureId"},void 0,$,z,W,q,G,K,Q,V,X,Z,ee,te,ae)),H("div",{className:"col-xs-4 col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4"},void 0,H("select",{id:"userType",onChange:this.nameChangeHandler,value:this.state.userType,className:"year-month-border-r",name:"lectureId"},void 0,ne,oe,ie,re,se,ce)))),H("div",{className:"container"},void 0,H("button",{type:"button",onClick:function(){e.props.history.push("/addOrEditUser")},className:"button-base-r newEntry-r"},void 0,"New User")),H("div",{className:"container"},void 0,H("div",{className:"customReactTableBox"},void 0,H(ReactTable,{className:"customReactTable",data:this.state.users,columns:t,defaultPageSize:5,noDataText:this.state.isFetching?"":"There is no data to display.",loading:this.state.isFetching,loadingText:"Loading ...",PreviousComponent:function(e){return o.a.createElement("button",j({type:"button"},e),le)},NextComponent:function(e){return o.a.createElement("button",j({type:"button"},e),ue)}})))))}}])&&x(a.prototype,n),i&&x(a,i),t}(),pe=Object(c.b)({manageUser:b()});var ve=Object(i.connect)(pe,function(e){return{dispatch:e}}),fe=Object(d.a)({key:"manageUser",reducer:m}),me=Object(u.a)({key:"manageUser",saga:g});t.default=Object(l.compose)(fe,me,ve)(de)}}]);