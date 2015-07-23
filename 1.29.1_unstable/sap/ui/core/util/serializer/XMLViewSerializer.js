/*
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/base/EventProvider','./delegate/XML','sap/ui/thirdparty/vkbeautify'],function(q,E,X,v){"use strict";var a=E.extend("sap.ui.core.util.serializer.XMLViewSerializer",{constructor:function(V,w,d,g,G){E.apply(this);this._oView=V;this._oWindow=w;this._sDefaultNamespace=d;this._fnGetControlId=g;this._fnGetEventHandlerName=G;}});a.prototype.serialize=function(){var p=[];var m=function(C,P){if(!P){var t=(C)?C.constructor:"?";throw Error("Controls with empty package are currently not supported by the XML serializer: "+t);}if(q.inArray(P,p)===-1){p.push(P);}};var s=function(C){return(C instanceof this._oWindow.sap.ui.core.mvc.View);};var c=new sap.ui.core.util.serializer.Serializer(this._oView,new X(this._sDefaultNamespace,this._fnGetControlId,this._fnGetEventHandlerName,m),true,this._oWindow,s);var r=c.serialize();var V=[];V.push('<sap.ui.core.mvc:View');if(this._oView.getControllerName&&this._oView.getControllerName()){V.push(' controllerName="'+this._oView.getControllerName()+'"');}if(q.inArray('sap.ui.core.mvc',p)===-1){p.push('sap.ui.core.mvc');}for(var i=0;i<p.length;i++){if(this._sDefaultNamespace&&this._sDefaultNamespace===p[i]){V.push(' xmlns="'+p[i]+'"');}else{V.push(' xmlns:'+p[i]+'="'+p[i]+'"');}}V.push(" >");V.push(r);V.push("</sap.ui.core.mvc:View>");return v.xml(V.join(""));};return a;},true);
