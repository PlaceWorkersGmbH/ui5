/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./PropertyBinding','./CompositeType'],function(q,P,C){"use strict";var a=P.extend("sap.ui.model.CompositeBinding",{constructor:function(b,r){P.apply(this,[null,""]);this.aBindings=b;this.aValues=null;this.bRawValues=r;this.bPreventUpdate=false;},metadata:{publicMethods:["getBindings","attachChange","detachChange"]}});a.prototype.getPath=function(){return null;};a.prototype.getModel=function(){return null;};a.prototype.getContext=function(){return null;};a.prototype.setType=function(t,i){if(t&&!(t instanceof C)){throw new Error("Only CompositeType can be used as type for composite bindings!");}P.prototype.setType.apply(this,arguments);if(this.oType){this.bRawValues=this.oType.getUseRawValues();}};a.prototype.setContext=function(c){q.each(this.aBindings,function(i,b){if(!c||b.updateRequired(c.getModel())){b.setContext(c);}});};a.prototype.setValue=function(v){var V;q.each(this.aBindings,function(i,b){V=v[i];if(V!==undefined){b.setValue(V);}});};a.prototype.getValue=function(){var v=[],V;q.each(this.aBindings,function(i,b){V=b.getValue();v.push(V);});return v;};a.prototype.setExternalValue=function(v){var V,c;if(this.fnFormatter){q.sap.log.warning("Tried to use twoway binding, but a formatter function is used");return;}if(this.oType){if(this.oType.getParseWithValues()){c=[];if(this.bRawValues){c=this.getValue();}else{q.each(this.aBindings,function(i,b){c.push(b.getExternalValue());});}}V=this.oType.parseValue(v,this.sInternalType,c);}else{if(typeof v=="string"){V=v.split(" ");}else{V=[v];}}if(this.bRawValues){this.setValue(V);}else{q.each(this.aBindings,function(i,b){v=V[i];if(v!==undefined){b.setExternalValue(v);}});}};a.prototype.getExternalValue=function(){var v=[],V;if(this.bRawValues){v=this.getValue();}else{q.each(this.aBindings,function(i,b){v.push(b.getExternalValue());});}if(this.fnFormatter){V=this.fnFormatter.apply(this,v);}else if(this.oType){V=this.oType.formatValue(v,this.sInternalType);}else{if(v.length>1){V=v.join(" ");}else{V=v[0];}}return V;};a.prototype.getBindings=function(){return this.aBindings;};a.prototype.attachChange=function(f,l){var t=this;this.fChangeHandler=function(e){var b=e.getSource();if(b.getBindingMode()==sap.ui.model.BindingMode.OneTime){b.detachChange(t.fChangeHandler);}t.checkUpdate();};this.attachEvent("change",f,l);if(this.aBindings){q.each(this.aBindings,function(i,b){b.attachChange(t.fChangeHandler);});}};a.prototype.detachChange=function(f,l){var t=this;this.detachEvent("change",f,l);if(this.aBindings){q.each(this.aBindings,function(i,b){b.detachChange(t.fChangeHandler);});}};a.prototype.updateRequired=function(m){var u=false;q.each(this.aBindings,function(i,b){u=u||b.updateRequired(m);});return u;};a.prototype.initialize=function(){this.bPreventUpdate=true;if(this.aBindings){q.each(this.aBindings,function(i,b){b.initialize();});}this.bPreventUpdate=false;this.checkUpdate(true);return this;};a.prototype.checkUpdate=function(f){if(this.bPreventUpdate){return;}var v=this.getValue();if(!q.sap.equal(v,this.aValues)||f){this.aValues=v;this._fireChange({reason:sap.ui.model.ChangeReason.Change});}};return a;},true);