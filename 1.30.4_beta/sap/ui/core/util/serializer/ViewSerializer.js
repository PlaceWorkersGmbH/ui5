/*
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/base/EventProvider','./HTMLViewSerializer','./XMLViewSerializer'],function(q,E,H,X){"use strict";var V=E.extend("sap.ui.core.util.serializer.ViewSerializer",{constructor:function(r,w,d){E.apply(this);this._oRootControl=r;this._oWindow=w||window;this._mViews={};this._sDefaultXmlNamespace=d;}});V.prototype.serializeToXML=function(){return this.serialize("XML");};V.prototype.serializeToHTML=function(){return this.serialize("HTML");};V.prototype.serialize=function(c){this._mViews={};this._sConvertToViewType=c||undefined;return this._serializeRecursive(this._oRootControl);};V.prototype._getViewType=function(v){if(!this._sConvertToViewType){if(v instanceof this._oWindow.sap.ui.core.mvc.HTMLView){return"HTML";}else if(v instanceof this._oWindow.sap.ui.core.mvc.XMLView){return"XML";}}return this._sConvertToViewType;};V.prototype._serializeRecursive=function(c){if(c instanceof this._oWindow.sap.ui.core.mvc.View){var v=this._getViewSerializer(c,this._getViewType(c));if(v){var o=c.getViewName()||c.getControllerName();if(!this._mViews[o]){this._mViews[o]=v.serialize(this._getViewType(c));}}}if(c.getMetadata().getClass()===this._oWindow.sap.ui.core.UIArea){var C=c.getContent();for(var i=0;i<C.length;i++){this._serializeRecursive(C[i]);}}else if(c.getMetadata().getClass()===this._oWindow.sap.ui.core.ComponentContainer){this._serializeRecursive(c.getComponentInstance().getAggregation("rootControl"));}else{var a=c.getMetadata().getAllAggregations();if(a){for(var n in a){var A=a[n];var b=c[A._sGetter]();if(b&&b.length){for(var i=0;i<b.length;i++){var O=b[i];if(O instanceof this._oWindow.sap.ui.core.Element){this._serializeRecursive(O);}}}else if(b instanceof this._oWindow.sap.ui.core.Element){this._serializeRecursive(b);}}}}return this._mViews;};V.prototype._getViewSerializer=function(v,t){var g=function(e){if(e.fFunction&&e.fFunction._sapui_handlerName){var h=e.fFunction._sapui_handlerName;var c=v.getController();if(c[h]||sap.ui.getCore().getConfiguration().getControllerCodeDeactivated()){return h;}}};var G=function(c){if(c._sapui_controlId){return c._sapui_controlId;}return c.getId().replace(v.createId(""),"");};if(t==="HTML"){return new H(v,this._oWindow,G,g);}else if(t==="XML"){return new X(v,this._oWindow,this._sDefaultXmlNamespace,G,g);}else{var t=(v)?v.constructor:"?";throw Error("View type '"+t+"' is not supported for conversion. Only HTML and XML is supported");}};return V;});
