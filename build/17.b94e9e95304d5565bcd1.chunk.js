(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{"5fe3345f6c917883a58a":function(e,t,a){"use strict";a.r(t);var n=a("8af190b70a6bc55c6f1b"),o=a.n(n),i=(a("8a2d1b95e05b6a321e74"),a("d7dd51e1bf6bfc2c9c3d")),c=a("0d7f0986bcd2f33d8a2a"),r=a("ab039aecd4a1d4fedc0e"),s=a("a28fc3c963a1d4d1a2e5"),l=a("ab4cb61bcb2dc161defb"),d=a("adc20f99e57c573c589c"),u=a("d95b0cf107403b178365"),m=a("54f683fcda7806277002"),f="app/ManageAccountant/DEFAULT_ACTION",p=Object(m.fromJS)({});var v=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:p;switch((arguments.length>1?arguments[1]:void 0).type){case f:default:return e}},b=function(e){return e.get("manageAccountant",p)},h=function(){return Object(s.a)(b,function(e){return e.toJS()})},y=regeneratorRuntime.mark(g);function g(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}},y,this)}Object(r.defineMessages)({header:{id:"".concat("app.containers.ManageAccountant",".header"),defaultMessage:"This is the ManageAccountant container!"}});var N,C=a("868115dbc0cccbfa5202"),w=a("6e1a5b1a9427ffe7ff17"),O=a("bd183afcc37eabd79225"),A=a.n(O),S=a("4cad7676f6ad23a52c95"),T=a("b13fad99b312e52ff2bb"),H=a("7e06b3d41be6bf0b9866");function k(e){return(k="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function j(){return(j=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}function M(e,t,a,n){N||(N="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var o=e&&e.defaultProps,i=arguments.length-3;if(t||0===i||(t={children:void 0}),t&&o)for(var c in o)void 0===t[c]&&(t[c]=o[c]);else t||(t=o||{});if(1===i)t.children=n;else if(i>1){for(var r=new Array(i),s=0;s<i;s++)r[s]=arguments[s+3];t.children=r}return{$$typeof:N,type:e,key:void 0===a?null:""+a,ref:null,props:t,_owner:null}}function x(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function D(e){return(D=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function F(e,t){return(F=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function _(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function I(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}a.d(t,"ManageAccountant",function(){return be});var P=M("i",{className:"far fa-edit"}),E=M(w.a,{id:"edit",type:"dark"},void 0,M("div",{className:"tooltipText"},void 0,M("p",{},void 0,"Edit"))),J=M("i",{className:"far fa-trash-alt"}),R=M(w.a,{id:"delete",type:"dark"},void 0,M("div",{className:"tooltipText"},void 0,M("p",{},void 0,"Delete"))),Y=M(c.Helmet,{},void 0,M("title",{},void 0,"ManageAccountant"),M("meta",{name:"description",content:"Description of ManageAccountant"})),B=M("div",{},void 0,M("ul",{className:"breadCrumb-bg-r"},void 0,M("li",{className:"breadCrumb-li-r"},void 0,M("i",{className:"fa fa-home","aria-hidden":"true"}),M("span",{className:"breadcrumb-text-r"},void 0,"Home")))),U=M("option",{disabled:!0,value:"0"},void 0,"Select Year"),L=M("option",{value:"2020"},void 0,"2020-2021"),$=M("option",{value:"2019"},void 0,"2019-2020"),z=M("option",{value:"2018"},void 0,"2018-2019"),W=M("option",{value:"2017"},void 0,"2017-2018"),q=M("option",{disabled:!0,value:"0"},void 0,"Select Month"),G=M("option",{value:"4"},void 0,"April"),K=M("option",{value:"5"},void 0,"May"),Q=M("option",{value:"6"},void 0,"June"),V=M("option",{value:"7"},void 0,"July"),X=M("option",{value:"8"},void 0,"August"),Z=M("option",{value:"9"},void 0,"September"),ee=M("option",{value:"10"},void 0,"October"),te=M("option",{value:"11"},void 0,"November"),ae=M("option",{value:"12"},void 0,"December"),ne=M("option",{value:"1"},void 0,"January"),oe=M("option",{value:"2"},void 0,"February"),ie=M("option",{value:"3"},void 0,"March"),ce=M("option",{disabled:!0,value:"0"},void 0,"Select accountant"),re=M("option",{value:"all"},void 0,"All accountants"),se=M("option",{value:"withData"},void 0,"accountant with Data"),le=M("option",{value:"withoutData"},void 0,"accountant without Data"),de=M("option",{value:"completed"},void 0,"Status Completed"),ue=M("option",{value:"pending"},void 0,"Status Pending"),me=M("option",{value:"inActive"},void 0,"InActive"),fe=M("option",{value:"active"},void 0,"Active"),pe=M("i",{className:"fas fa-angle-left"}),ve=M("i",{className:"fas fa-angle-right"}),be=function(e){function t(){var e,a,n,o;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);for(var i=arguments.length,c=new Array(i),r=0;r<i;r++)c[r]=arguments[r];return n=this,o=(e=D(t)).call.apply(e,[this].concat(c)),a=!o||"object"!==k(o)&&"function"!==typeof o?_(n):o,I(_(_(a)),"state",{showHideClassName:"modal display-none container",month:4,year:2020,accountantType:"all",isFetching:!0,isOpenClassName:"modal display-none container",accountants:[]}),I(_(_(a)),"getAccountant",function(e,t){A.a.get("http://3.128.59.35:3000/accountants/".concat(e,"/").concat(t)).then(function(e){var t=e.data.data;a.setState({accountants:t,isFetching:!1})}).catch(function(e){var t=Object(H.a)(e);a.setState({message:t,isFetching:!1,isOpenClassName:"modal display-block container",type:"failure"},function(){return setTimeout(a.modalTime,1500)})})}),I(_(_(a)),"statusUpdate",function(e,t){A.a.put("http://3.128.59.35:3000/changeStatus/".concat(e),{status:t}).then(function(e){e.data.data;a.setState({message:e.data.message,isFetching:!0},function(){return a.getAccountant(a.state.month,a.state.year)})}).catch(function(e){var t=Object(H.a)(e);a.setState({message:t,isFetching:!1,isOpenClassName:"modal display-block container",type:"failure"},function(){return setTimeout(a.modalTime,1500)})})}),I(_(_(a)),"deleteAccountant",function(e){A.a.delete("http://3.128.59.35:3000/accountant/".concat(e)).then(function(e){e.data.data;a.setState({message:e.data.message,isFetching:!1,type:"success",isOpenClassName:"modal display-block container"},function(){return a.getAccountant(a.state.month,a.state.year)},setTimeout(a.modalTime,1500))}).catch(function(e){var t=Object(H.a)(e);a.setState({message:t,isFetching:!1,isOpenClassName:"modal display-block container",type:"failure"},function(){return setTimeout(a.modalTime,1500)})})}),I(_(_(a)),"modalTime",function(){a.setState({isOpenClassName:"modal display-none container",isFetching:!1})}),I(_(_(a)),"confirmModalHandler",function(e){a.setState({showHideClassName:"modal display-block container",deleteId:e})}),I(_(_(a)),"modalCloseHandler",function(){a.setState({isResetModal:!1,showHideClassName:"modal display-none container",deleteId:""})}),I(_(_(a)),"confirmDeleteData",function(e){event.preventDefault(),a.deleteAccountant(e),a.setState({showHideClassName:"modal display-none container",isFetching:!0})}),I(_(_(a)),"nameChangeHandler",function(e){var t=a.state.year,n=a.state.month,o=a.state.accountantType,i=e.target.id;"year"===i?t=e.target.value:"month"===i?n=e.target.value:"accountantType"===i&&(o=e.target.value),a.setState({year:t,month:n,accountantType:o,isFetching:!0},function(){return a.getAccountant(a.state.month,a.state.year,a.state.accountantType)})}),I(_(_(a)),"statusChangeHandler",function(e){var t=e.target.id,n=e.target.checked;a.setState({isFetching:!0},function(){return a.statusUpdate(t,n)})}),a}var a,n,i;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&F(e,t)}(t,o.a.Component),a=t,(n=[{key:"componentWillMount",value:function(){this.getAccountant(this.state.month,this.state.year)}},{key:"render",value:function(){var e=this,t=[{Header:"Created At",accessor:"timestamp",width:200,Cell:function(e){return M("div",{className:"onClick-cell-r"},void 0,Object(S.a)(e.original.timestamp).format("DD MMM YYYY HH:mm"))}},{Header:"Accountant Id",accessor:"accountantId",width:150,filterable:!0,Cell:function(e){return M("div",{className:"onClick-cell-r"},void 0,e.original.accountantId)}},{Header:"Name",accessor:"name",filterable:!0,Cell:function(e){return M("div",{className:"onClick-cell-r"},void 0,e.original.firstName+" "+e.original.middleName+" "+e.original.lastName)}},{Header:"Mobile Number",accessor:"mobileNumber",Cell:function(e){return M("div",{className:"onClick-cell-r"},void 0,e.original.mobileNumber)}},{Header:"Actions",sortable:!1,width:150,Cell:function(t){return M("div",{},void 0,M("span",{className:"editButton-r","data-tip":!0,"data-for":"edit",onClick:function(){e.props.history.push("/addOrEditaccountant/"+t.original._id)}},void 0,P,E),M("span",{className:"deleteButton-r","data-tip":!0,"data-for":"delete",onClick:function(){return e.confirmModalHandler(t.original._id)}},void 0,J,R))}}];return M("div",{},void 0,Y,M(C.a,{showHideClassName:this.state.showHideClassName,onClose:this.modalCloseHandler,onConfirm:function(){return e.confirmDeleteData(e.state.deleteId)}}),M(T.a,{showHideClassName:this.state.isOpenClassName,modalType:this.state.type,message:this.state.message,onClose:this.modalCloseHandler}),M("div",{className:"container outer-box-r"},void 0,B,M("div",{className:"container filter-year-month-r"},void 0,M("div",{className:"row"},void 0,M("div",{className:"col-xs-4 col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4"},void 0,M("select",{id:"year",onChange:this.nameChangeHandler,value:this.state.year,className:"year-month-border-r",name:"lectureId"},void 0,U,L,$,z,W)),M("div",{className:"col-xs-4 col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4"},void 0,M("select",{id:"month",onChange:this.nameChangeHandler,value:this.state.month,className:"year-month-border-r",name:"lectureId"},void 0,q,G,K,Q,V,X,Z,ee,te,ae,ne,oe,ie)),M("div",{className:"col-xs-4 col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4"},void 0,M("select",{disabled:!0,id:"accountantType",onChange:this.nameChangeHandler,value:this.state.accountantType,className:"year-month-border-r",name:"lectureId"},void 0,ce,re,se,le,de,ue,me,fe)))),M("div",{className:"container"},void 0,M("button",{type:"button",onClick:function(){e.props.history.push("/addOrEditAccountant")},className:"button-base-r newEntry-r"},void 0,"New Accountant")),M("div",{className:"container"},void 0,M("div",{className:"customReactTableBox"},void 0,M(ReactTable,{className:"customReactTable",data:this.state.accountants,columns:t,defaultPageSize:5,noDataText:this.state.isFetching?"":"There is no data to display.",loading:this.state.isFetching,loadingText:"Loading ...",PreviousComponent:function(e){return o.a.createElement("button",j({type:"button"},e),pe)},NextComponent:function(e){return o.a.createElement("button",j({type:"button"},e),ve)}})))))}}])&&x(a.prototype,n),i&&x(a,i),t}(),he=Object(s.b)({manageAccountant:h()});var ye=Object(i.connect)(he,function(e){return{dispatch:e}}),ge=Object(u.a)({key:"manageAccountant",reducer:v}),Ne=Object(d.a)({key:"manageAccountant",saga:g});t.default=Object(l.compose)(ge,Ne,ye)(be)}}]);