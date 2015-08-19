/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/base/EventProvider','sap/ui/thirdparty/datajs'],function(q,E,O){"use strict";var a=E.extend("sap.ui.model.odata.ODataMetadata",{constructor:function(m,p){E.apply(this,arguments);this.bLoaded=false;this.bFailed=false;this.mEntityTypes={};this.mRequestHandles={};this.sUrl=m;this.bAsync=p.async;this.sUser=p.user;this.bWithCredentials=p.withCredentials;this.sPassword=p.password;this.mHeaders=p.headers;this.oLoadEvent=null;this.oFailedEvent=null;this.oMetadata=null;this.mNamespaces=p.namespaces||{sap:"http://www.sap.com/Protocols/SAPData",m:"http://schemas.microsoft.com/ado/2007/08/dataservices/metadata","":"http://schemas.microsoft.com/ado/2007/06/edmx"};var t=this;this.fnResolve;this.pLoaded=new Promise(function(r,b){t.fnResolve=r;});this._loadMetadata();},metadata:{publicMethods:["getServiceMetadata","attachFailed","detachFailed","attachLoaded","detachLoaded","refresh"]}});a.prototype._setNamespaces=function(n){this.mNamespaces=n;};a.prototype._loadMetadata=function(u,s){var t=this;u=u||this.sUrl;var r=this._createRequest(u);return new Promise(function(b,c){var R,e=[];function _(m,o){if(!m||!m.dataServices){var p={message:"Invalid metadata document",request:r,response:o};d(p);return;}t.sMetadataBody=o.body;t.oMetadata=t.oMetadata?t.merge(t.oMetadata,m,e):m;t.oRequestHandle=null;var P={metadataString:t.sMetadataBody,entitySets:e};t.fnResolve(P);b(P);if(t.bAsync&&!s){t.fireLoaded(t);}else if(!t.bAsync&&!s){t.bLoaded=true;t.oLoadEvent=q.sap.delayedCall(0,t,t.fireLoaded,[P]);}}function d(o){var p={message:o.message,request:o.request,response:o.response};if(o.response){p.statusCode=o.response.statusCode;p.statusText=o.response.statusText;p.responseText=o.response.body;}if(R&&R.bSuppressErrorHandlerCall){return;}if(t.bAsync){delete t.mRequestHandles[R.id];}c(p);if(t.bAsync&&!s){t.fireFailed(p);}else if(!t.bAsync&&!s){t.bFailed=true;t.oFailedEvent=q.sap.delayedCall(0,t,t.fireFailed,[p]);}}R=O.request(r,_,d,O.metadataHandler);if(t.bAsync){R.id=q.sap.uid();t.mRequestHandles[R.id]=R;}});};a.prototype.refresh=function(){return this._loadMetadata();};a.prototype.getServiceMetadata=function(){return this.oMetadata;};a.prototype.isLoaded=function(){return this.bLoaded;};a.prototype.loaded=function(){return this.pLoaded;};a.prototype.isFailed=function(){return this.bFailed;};a.prototype.fireLoaded=function(p){this.bLoaded=true;this.fireEvent("loaded",p);q.sap.log.debug(this+" - loaded was fired");return this;};a.prototype.attachLoaded=function(d,f,l){this.attachEvent("loaded",d,f,l);return this;};a.prototype.detachLoaded=function(f,l){this.detachEvent("loaded",f,l);return this;};a.prototype.fireFailed=function(A){this.bFailed=true;this.fireEvent("failed",A);return this;};a.prototype.attachFailed=function(d,f,l){this.attachEvent("failed",d,f,l);return this;};a.prototype.detachFailed=function(f,l){this.detachEvent("failed",f,l);return this;};a.prototype._getEntityTypeByPath=function(p){if(!p){return null;}if(!this.oMetadata||q.isEmptyObject(this.oMetadata)){return null;}if(this.mEntityTypes[p]){return this.mEntityTypes[p];}var c=p.replace(/^\/|\/$/g,""),P=c.split("/"),l=P.length,o,e,b,r,t=this;if(P[0].indexOf("(")!=-1){P[0]=P[0].substring(0,P[0].indexOf("("));}if(l>1){o=t._getEntityTypeByPath(P[0]);for(var i=1;i<P.length;i++){if(o){if(P[i].indexOf("(")!=-1){P[i]=P[i].substring(0,P[i].indexOf("("));}r=t._getEntityTypeByNavProperty(o,P[i]);if(r){o=r;}b=o;}}}else{e=this._splitName(this._getEntityTypeName(P[0]));b=this._getObjectMetadata("entityType",e[0],e[1]);if(b){b.entityType=this._getEntityTypeName(P[0]);}}if(!b){var f=P[P.length-1];var F=this._getFunctionImportMetadata(f,"GET");if(!F){F=this._getFunctionImportMetadata(f,"POST");}if(F&&F.entitySet){b=this._getEntityTypeByPath(F.entitySet);if(b){b.entityType=this._getEntityTypeName(F.entitySet);}}}if(b){this.mEntityTypes[p]=b;}return b;};a.prototype._getEntityTypeByName=function(n){var e,t=this,s,N,S;if(!n){return null;}S=n.indexOf(".");if(S>0){N=n.substr(0,S);s=n.substr(S+1);}else{s=n;}if(!this.oMetadata||q.isEmptyObject(this.oMetadata)){return null;}if(this.mEntityTypes[n]){e=this.mEntityTypes[n];}else{q.each(this.oMetadata.dataServices.schema,function(i,o){if(o.entityType&&(!N||o.namespace===N)){q.each(o.entityType,function(k,b){if(b.name===s){e=b;t.mEntityTypes[n]=e;e.namespace=o.namespace;return false;}});}});}return e;};a.prototype._getAnnotation=function(p){var n,P,m,M,e,s,o;P=p.split('/#');M=P[1].split('/');if(!P[0]){e=this._getEntityTypeByName(M[0]);if(!e){return;}s=P[1].substr(P[1].indexOf('/')+1);o=this._getPropertyMetadata(e,s);if(!o){return;}m=s.substr(s.indexOf(o.name));m=m.substr(m.indexOf('/')+1);}else{e=this._getEntityTypeByPath(P[0]);if(!e){return;}p=P[0].replace(/^\/|\/$/g,"");s=p.substr(p.indexOf('/')+1);o=this._getPropertyMetadata(e,s);if(!o){return;}m=M.join('/');}n=this._getAnnotationObject(e,o,m);return n;};a.prototype._getAnnotationObject=function(e,o,m){var A,p,b,n,s;if(!o){return;}n=o;p=m.split('/');if(p[0].indexOf('.')>-1){return this._getV4AnnotationObject(e,o,p);}else{if(p.length>1){n=n[p[0]];if(!n&&o.extensions){for(var i=0;i<o.extensions.length;i++){var c=o.extensions[i];if(c.name==p[0]){n=c;break;}}}m=p.splice(0,1);b=this._getAnnotationObject(e,n,p.join('/'));}else{if(p[0].indexOf('@')>-1){s=p[0].substr(1);A=s.split(':');b=n[A[0]];if(!b&&n.extensions){for(var i=0;i<n.extensions.length;i++){var c=n.extensions[i];if(c.name===A[1]&&c.namespace===this.mNamespaces[A[0]]){b=c.value;break;}}}}else{A=p[0].split(':');b=n[A[0]];b=n[p[0]];if(!b&&n.extensions){for(var i=0;i<n.extensions.length;i++){var c=n.extensions[i];if(c.name===A[1]&&c.namespace===this.mNamespaces[A[0]]){b=c;break;}}}}}}return b;};a.prototype._getV4AnnotationObject=function(e,o,p){var A,b=[];if(p.length>1){return;}var t=e.namespace?e.namespace+".":"";t+=e.name+"/"+o.name;q.each(this.oMetadata.dataServices.schema,function(i,s){if(s.annotations){q.each(s.annotations,function(k,o){if(o.target===t&&!o.qualifier){b.push(o.annotation);return false;}});}});if(b){q.each(b,function(i,c){q.each(c,function(j,d){if(d.term===p[0]){A=d;}});});}return A;};a.prototype._splitName=function(f){var p=[];if(f){var s=f.lastIndexOf(".");p[0]=f.substr(s+1);p[1]=f.substr(0,s);}return p;};a.prototype._getEntityTypeName=function(c){var e;if(c){q.each(this.oMetadata.dataServices.schema,function(i,s){if(s.entityContainer){q.each(s.entityContainer,function(k,o){if(o.entitySet){q.each(o.entitySet,function(j,b){if(b.name===c){e=b.entityType;return false;}});}});}});}return e;};a.prototype._getObjectMetadata=function(o,s,n){var b;if(s&&n){q.each(this.oMetadata.dataServices.schema,function(i,S){if(S[o]&&S.namespace===n){q.each(S[o],function(j,c){if(c.name===s){b=c;b.namespace=S.namespace;return false;}});return!b;}});}return b;};a.prototype.getUseBatch=function(){var u=false;q.each(this.oMetadata.dataServices.schema,function(i,s){if(s.entityContainer){q.each(s.entityContainer,function(k,e){if(e.extensions){q.each(e.extensions,function(l,o){if(o.name==="use-batch"&&o.namespace==="http://www.sap.com/Protocols/SAPData"){u=(typeof o.value==='string')?(o.value.toLowerCase()==='true'):!!o.value;return false;}});}});}});return u;};a.prototype._getFunctionImportMetadata=function(f,m){var o=null;if(f.indexOf("/")>-1){f=f.substr(f.indexOf("/")+1);}q.each(this.oMetadata.dataServices.schema,function(i,s){if(s["entityContainer"]){q.each(s["entityContainer"],function(j,e){if(e["functionImport"]){q.each(e["functionImport"],function(k,F){if(F.name===f&&F.httpMethod===m){o=F;return false;}});}return!o;});}return!o;});return o;};a.prototype._getEntityTypeByNavProperty=function(e,n){var t=this,A,o,b,N;if(!e.navigationProperty){return undefined;}q.each(e.navigationProperty,function(k,c){if(c.name===n){A=t._splitName(c.relationship);o=t._getObjectMetadata("association",A[0],A[1]);if(o){var d=o.end[0];if(d.role!==c.toRole){d=o.end[1];}b=t._splitName(d.type);N=t._getObjectMetadata("entityType",b[0],b[1]);if(N){N.entityType=d.type;}return false;}}});return N;};a.prototype._getNavigationPropertyNames=function(e){var n=[];if(e.navigationProperty){q.each(e.navigationProperty,function(k,N){n.push(N.name);});}return n;};a.prototype._getPropertyMetadata=function(e,p){var P,t=this;if(!e){return;}p=p.replace(/^\/|\/$/g,"");var b=p.split("/");q.each(e.property,function(k,c){if(c.name===b[0]){P=c;return false;}});if(P&&b.length>1&&!q.sap.startsWith(P.type.toLowerCase(),"edm.")){var n=this._splitName(P.type);P=this._getPropertyMetadata(this._getObjectMetadata("complexType",n[0],n[1]),b[1]);}if(!P&&b.length>1){var o=this._getEntityTypeByNavProperty(e,b[0]);if(o){P=t._getPropertyMetadata(o,b[1]);}}return P;};a.prototype.destroy=function(){delete this.oMetadata;var t=this;q.each(this.mRequestHandles,function(k,r){r.bSuppressErrorHandlerCall=true;r.abort();delete t.mRequestHandles[k];});if(!!this.oLoadEvent){q.sap.clearDelayedCall(this.oLoadEvent);}if(!!this.oFailedEvent){q.sap.clearDelayedCall(this.oFailedEvent);}E.prototype.destroy.apply(this,arguments);};a.prototype._createRequest=function(u){var h={},l={"Accept-Language":sap.ui.getCore().getConfiguration().getLanguage()};q.extend(h,this.mHeaders,l);var r={headers:h,requestUri:u,method:'GET',user:this.sUser,password:this.sPassword,async:this.bAsync};if(this.bAsync){r.withCredentials=this.bWithCredentials;}return r;};a.prototype._getEntitySetByPath=function(e){if(!this._entitySetMap){this._entitySetMap={};this.oMetadata.dataServices.schema.forEach(function(s){if(s.entityContainer){s.entityContainer.forEach(function(c){if(c.entitySet){c.entitySet.forEach(function(m){this._entitySetMap[m.entityType]=m;},this);}},this);}},this);}var o=this._getEntityTypeByPath(e);if(o){return this._entitySetMap[o.entityType];}return;};a.prototype._addUrl=function(u){var U=[].concat(u),t=this;return Promise.all(q.map(U,function(s){return t._loadMetadata(s,true);}));};a.prototype.merge=function(t,s,e){q.each(t.dataServices.schema,function(i,T){q.each(s.dataServices.schema,function(j,S){if(S.namespace===T.namespace){if(S.entityType){T.entityType=!T.entityType?[]:T.entityType;T.entityType=T.entityType.concat(S.entityType);}if(T.entityContainer&&S.entityContainer){q.each(T.entityContainer,function(k,o){q.each(S.entityContainer,function(l,b){if(b.entitySet){if(b.name===o.name){o.entitySet=!o.entitySet?[]:o.entitySet;o.entitySet=o.entitySet.concat(b.entitySet);b.entitySet.forEach(function(c){e.push(c);});}}});});}if(S.annotations){T.annotations=!T.annotations?[]:T.annotations;T.annotations=T.annotations.concat(S.annotations);}}});});return t;};a.prototype._getEntitySetByType=function(e){var s=e.namespace+"."+e.name;var S=this.oMetadata.dataServices.schema;for(var i=0;i<S.length;++i){var c=S[i].entityContainer;for(var n=0;n<c.length;++n){var b=c[n].entitySet;for(var m=0;m<b.length;++m){if(b[m].entityType===s){return b[m];}}}}return null;};return a;});
