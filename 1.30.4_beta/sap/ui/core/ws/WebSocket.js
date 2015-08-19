/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/Device','sap/ui/base/EventProvider','./ReadyState','sap/ui/thirdparty/URI'],function(q,D,E,R,U){"use strict";var W=E.extend("sap.ui.core.ws.WebSocket",{constructor:function(u,p){E.apply(this);if(!D.support.websocket){throw new Error("Browser does not support WebSockets.");}if(typeof(u)!=="string"){throw new Error("sUrl must be a string.");}if(typeof(p)!=='undefined'&&!q.isArray(p)&&typeof(p)!=='string'){throw new Error("aProtocols must be a string, array of strings or undefined.");}this._openConnection(u,p);},metadata:{publicMethods:["send","close","getReadyState","getProtocol"]}});W.prototype.getInterface=function(){return this;};W.M_EVENTS={Open:"open",Close:"close",Error:"error",Message:"message"};W.prototype.attachOpen=function(d,f,l){this.attachEvent("open",d,f,l);return this;};W.prototype.detachOpen=function(f,l){this.detachEvent("open",f,l);return this;};W.prototype.fireOpen=function(a){this.fireEvent("open",a);return this;};W.prototype.attachClose=function(d,f,l){this.attachEvent("close",d,f,l);return this;};W.prototype.detachClose=function(f,l){this.detachEvent("close",f,l);return this;};W.prototype.fireClose=function(a){this.fireEvent("close",a);return this;};W.prototype.attachError=function(d,f,l){this.attachEvent("error",d,f,l);return this;};W.prototype.detachError=function(f,l){this.detachEvent("error",f,l);return this;};W.prototype.fireError=function(a){this.fireEvent("error",a);return this;};W.prototype.attachMessage=function(d,f,l){this.attachEvent("message",d,f,l);return this;};W.prototype.detachMessage=function(f,l){this.detachEvent("message",f,l);return this;};W.prototype.fireMessage=function(a){this.fireEvent("message",a);return this;};W.prototype._resolveFullUrl=function(u){var o=new U(u);var b=new U();b.search('');b.protocol(b.protocol()==='https'?'wss':'ws');o=o.absoluteTo(b);return o.toString();};W.prototype._openConnection=function(u,p){var u=this._resolveFullUrl(u);this._oWs=(typeof(p)==='undefined')?new window.WebSocket(u):new window.WebSocket(u,p);this._oWs.onopen=q.proxy(this._onopen,this);this._oWs.onclose=q.proxy(this._onclose,this);this._oWs.onmessage=q.proxy(this._onmessage,this);this._oWs.onerror=q.proxy(this._onerror,this);};W.prototype._onopen=function(){this.fireOpen();};W.prototype._onclose=function(c){this.fireClose({code:c.code,reason:c.reason,wasClean:c.wasClean});};W.prototype._onerror=function(e){this.fireError();};W.prototype._onmessage=function(m){this.fireMessage({data:m.data});};W.prototype.send=function(m){if(this.getReadyState()===R.OPEN){this._oWs.send(m);}else if(this.getReadyState()===R.CONNECTING){this.attachEventOnce("open",function(e){this._oWs.send(m);});}else{q.sap.log.warning("Unable to send WebSocket message. "+"Connection is already closed or closing. message: "+m);}return this;};W.prototype.close=function(c,r){if(typeof(c)==='string'){r=c;c=undefined;}c=(typeof(c)==='undefined')?1000:c;r=(typeof(r)==='undefined')?"":r;if(this.getReadyState()===R.OPEN){this._oWs.close(c,r);}else if(this.getReadyState()===R.CONNECTING){this.attachEventOnce("open",function(e){this._oWs.close(c,r);});}else{var t='';switch(this.getReadyState()){case R.CLOSED:t="Connection is already closed.";break;case R.CLOSING:t="Connection is already closing.";break;}q.sap.log.warning("Unable to close WebSocket connection. "+t);}return this;};W.prototype.getReadyState=function(){return this._oWs.readyState;};W.prototype.getProtocol=function(){return this._oWs.protocol;};return W;});
