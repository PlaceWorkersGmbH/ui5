/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/model/ClientModel','sap/ui/model/Context','./JSONListBinding','./JSONPropertyBinding','./JSONTreeBinding'],function(q,C,a,J,b,c){"use strict";var d=C.extend("sap.ui.model.json.JSONModel",{constructor:function(D){C.apply(this,arguments);if(D&&typeof D=="object"){this.setData(D);}},metadata:{publicMethods:["setJSON","getJSON"]}});d.prototype.setData=function(D,m){if(m){this.oData=q.extend(true,q.isArray(this.oData)?[]:{},this.oData,D);}else{this.oData=D;}this.checkUpdate();};d.prototype.setJSON=function(j,m){var o;try{o=q.parseJSON(j);this.setData(o,m);}catch(e){q.sap.log.fatal("The following problem occurred: JSON parse Error: "+e);this.fireParseError({url:"",errorCode:-1,reason:"",srcText:e,line:-1,linepos:-1,filepos:-1});}};d.prototype.getJSON=function(){return JSON.stringify(this.oData);};d.prototype.loadData=function(u,p,A,t,m,e,h){var f=this;A=(A!==false);t=t||"GET";e=e===undefined?this.bCache:e;this.fireRequestSent({url:u,type:t,async:A,headers:h,info:"cache="+e+";bMerge="+m,infoObject:{cache:e,merge:m}});this._ajax({url:u,async:A,dataType:'json',cache:e,data:p,headers:h,type:t,success:function(D){if(!D){q.sap.log.fatal("The following problem occurred: No data was retrieved by service: "+u);}f.setData(D,m);f.fireRequestCompleted({url:u,type:t,async:A,headers:h,info:"cache="+e+";bMerge="+m,infoObject:{cache:e,merge:m},success:true});},error:function(X,g,i){var E={message:g,statusCode:X.status,statusText:X.statusText,responseText:X.responseText};q.sap.log.fatal("The following problem occurred: "+g,X.responseText+","+X.status+","+X.statusText);f.fireRequestCompleted({url:u,type:t,async:A,headers:h,info:"cache="+e+";bMerge="+m,infoObject:{cache:e,merge:m},success:false,errorobject:E});f.fireRequestFailed(E);}});};d.prototype.bindProperty=function(p,o,P){var B=new b(this,p,o,P);return B;};d.prototype.bindList=function(p,o,s,f,P){var B=new J(this,p,o,s,f,P);return B;};d.prototype.bindTree=function(p,o,f,P){var B=new c(this,p,o,f,P);return B;};d.prototype.setProperty=function(p,v,o,A){var r=this.resolve(p,o),l,O,P;if(!r){return false;}if(r=="/"){this.setData(v);return true;}l=r.lastIndexOf("/");O=r.substring(0,l||1);P=r.substr(l+1);var e=this._getObject(O);if(e){e[P]=v;this.checkUpdate(false,A);return true;}return false;};d.prototype.getProperty=function(p,o){return this._getObject(p,o);};d.prototype._getObject=function(p,o){var n=this.isLegacySyntax()?this.oData:null;if(o instanceof a){n=this._getObject(o.getPath());}else if(o){n=o;}if(!p){return n;}var P=p.split("/"),i=0;if(!P[0]){n=this.oData;i++;}while(n&&P[i]){n=n[P[i]];i++;}return n;};d.prototype.isList=function(p,o){var A=this.resolve(p,o);return q.isArray(this._getObject(A));};return d;});
