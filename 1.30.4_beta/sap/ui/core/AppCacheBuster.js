/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/base/ManagedObject','./Core','sap/ui/thirdparty/URI'],function(q,M,C,U){"use strict";var c=sap.ui.getCore().getConfiguration();var l=c.getLanguage();var s=c.getAppCacheBusterMode()==="sync";var b=c.getAppCacheBusterMode()==="batch";var i={};var a=q.ajax;var I=q.sap.includeScript;var f=q.sap.includeStyleSheet;var v=M.prototype.validateProperty;var L=document.location.href.replace(/\?.*|#.*/g,"");var u=U(q.sap.getModulePath("","/../"));var o=u.toString();if(u.is("relative")){u=u.absoluteTo(L);}var B=u.normalize().toString();var r=U("resources").absoluteTo(B).toString();var F=new RegExp("^"+q.sap.escapeRegExp(r));var E=function(d){if(d.length>0&&d.slice(-1)!=="/"){d+="/";}return d;};var R=function(B,S){var d;var e;var g;if(q.isArray(B)&&!b){q.each(B,function(x,y){R(y,S);});}else if(q.isArray(B)&&b){var j=E(B[0]);var k=[];q.sap.log.debug("sap.ui.core.AppCacheBuster.register(\""+j+"\"); // BATCH MODE!");var m=A.normalizeURL(j);q.sap.log.debug("  --> normalized to: \""+m+"\"");q.each(B,function(x,y){e=E(y);var z=A.normalizeURL(e);if(!i[g]){k.push(z);}});if(k.length>0){var e=m+"sap-ui-cachebuster-info.json?sap-ui-language="+l;d={url:e,type:"POST",async:!s&&!!S,dataType:"json",contentType:"text/plain",data:k.join("\n"),success:function(x){A.onIndexLoaded(e,x);q.extend(i,x);},error:function(){q.sap.log.error("Failed to batch load AppCacheBuster index file from: \""+e+"\".");}};}}else{B=E(B);q.sap.log.debug("sap.ui.core.AppCacheBuster.register(\""+B+"\");");g=A.normalizeURL(B);q.sap.log.debug("  --> normalized to: \""+g+"\"");if(!i[g]){var e=g+"sap-ui-cachebuster-info.json?sap-ui-language="+l;d={url:e,async:!s&&!!S,dataType:"json",success:function(x){A.onIndexLoaded(e,x);i[g]=x;},error:function(){q.sap.log.error("Failed to load AppCacheBuster index file from: \""+e+"\".");}};}}if(d){var n=A.onIndexLoad(d.url);if(n!=null){q.sap.log.info("AppCacheBuster index file injected for: \""+e+"\".");d.success(n);}else{if(d.async){var p=S.startTask("load "+e);var t=d.success,w=d.error;q.extend(d,{success:function(x){t.apply(this,arguments);S.finishTask(p);},error:function(){w.apply(this,arguments);S.finishTask(p,false);}});}q.sap.log.info("Loading AppCacheBuster index file from: \""+e+"\".");q.ajax(d);}}};var A={boot:function(S){var d=c.getAppCacheBuster();if(d&&d.length>0){d=d.slice();var e=true;var V=String(d[0]).toLowerCase();if(d.length===1){if(V==="true"||V==="x"){var u=U(o);d=u.is("relative")?[u.toString()]:[];}else if(V==="false"){e=false;}}if(e){A.init();R(d,S);}}},init:function(){var d=A.convertURL;var n=A.normalizeURL;var g=function(e){if(e&&typeof(e)==="string"){e=n(e);return!e.match(F);}return false;};q.ajax=function(e,j){if(e&&e.url&&g(e.url)){e.url=d(e.url);}return a.apply(this,arguments);};q.sap.includeScript=function(e,j){var k=Array.prototype.slice.apply(arguments);if(g(k[0])){k[0]=d(k[0]);}return I.apply(this,k);};q.sap.includeStyleSheet=function(e,j){var k=Array.prototype.slice.apply(arguments);if(g(k[0])){k[0]=d(k[0]);}return f.apply(this,k);};M.prototype.validateProperty=function(p,V){var m=this.getMetadata(),P=m.getProperty(p),j;if(P&&P.type==="sap.ui.core.URI"){j=Array.prototype.slice.apply(arguments);try{if(g(j[1])){j[1]=d(j[1]);}}catch(e){}}return v.apply(this,j||arguments);};},exit:function(){q.ajax=a;q.sap.includeScript=I;q.sap.includeStyleSheet=f;M.prototype.validateProperty=v;i={};},register:function(B){R(B);},convertURL:function(d){q.sap.log.debug("sap.ui.core.AppCacheBuster.convertURL(\""+d+"\");");if(i&&d){var n=A.normalizeURL(d);q.sap.log.debug("  --> normalized to: \""+n+"\"");if(n&&A.handleURL(n)){q.each(i,function(B,m){var e;if(B&&n.length>=B.length&&n.slice(0,B.length)===B){e=n.slice(B.length);if(m[e]){d=B+"~"+m[e]+"~/"+e;q.sap.log.debug("  ==> return \""+d+"\";");return false;}}});}}return d;},normalizeURL:function(d){var u=U(d||"./");if(u.is("relative")){u=u.absoluteTo(L);}return u.normalizeProtocol().normalizeHostname().normalizePort().normalizePath().toString();},handleURL:function(d){return true;},onIndexLoad:function(d){return null;},onIndexLoaded:function(d,m){}};var h=c.getAppCacheBusterHooks();if(h){q.each(["handleURL","onIndexLoad","onIndexLoaded"],function(d,e){if(typeof h[e]==="function"){A[e]=h[e];}});}return A;},true);
