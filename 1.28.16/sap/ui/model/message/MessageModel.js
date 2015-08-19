/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/model/ClientModel','./MessageListBinding','./MessagePropertyBinding'],function(q,C,M,a){"use strict";var b=C.extend("sap.ui.model.message.MessageModel",{constructor:function(m){C.apply(this,arguments);this.sDefaultBindingMode=sap.ui.model.BindingMode.OneWay;this.mSupportedBindingModes={"OneWay":true,"TwoWay":false,"OneTime":false};this.oMessageManager=m;}});b.prototype.setData=function(d){this.oData=d;this.checkUpdate();};b.prototype.fireMessageChange=function(A){this.fireEvent("messageChange",A);return this;};b.prototype.bindProperty=function(p,c,P){var B=new a(this,p,c,P);return B;};b.prototype.bindList=function(p,c,s,f,P){var B=new M(this,p,c,s,f,P);return B;};b.prototype.setProperty=function(p,v,c){q.sap.log.error(this+"not implemented: Only 'OneWay' binding mode supported");};b.prototype.getProperty=function(p,c){return this._getObject(p,c);};b.prototype._getObject=function(p,c){var n;if(c instanceof sap.ui.model.Context){n=this._getObject(c.getPath());}if(!p){return n;}var P=p.split("/"),i=0;if(!P[0]){n=this.oData;i++;}while(n&&P[i]){n=n[P[i]];i++;}return n;};return b;},true);