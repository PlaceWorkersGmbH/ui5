/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/base/ManagedObject','sap/ui/core/Control','sap/ui/core/ExtensionPoint','sap/ui/core/library'],function(q,M,C,E,l){"use strict";var V=C.extend("sap.ui.core.mvc.View",{metadata:{library:"sap.ui.core",properties:{width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:'100%'},height:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},viewName:{type:"string",group:"Misc",defaultValue:null},displayBlock:{type:"boolean",group:"Appearance",defaultValue:false}},aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"}},events:{afterInit:{},beforeExit:{},afterRendering:{},beforeRendering:{}},specialSettings:{controller:true,controllerName:true,preprocessors:true,resourceBundleName:true,resourceBundleUrl:true,resourceBundleLocale:true,resourceBundleAlias:true,type:true,viewContent:true,viewData:true,async:{type:"boolean",defaultValue:false}}}});V._mPreprocessors={};V.prototype._initCompositeSupport=function(s){this.oViewData=s.viewData;this.sViewName=s.viewName;this.mPreprocessors=s.preprocessors||{};var t=this;if(s.async){this._oAsyncState={};this._oAsyncState.promise=new Promise(function(r){t._oAsyncState.resolve=r;});}if(sap.ui.core.CustomizingConfiguration&&sap.ui.core.CustomizingConfiguration.hasCustomProperties(this.sViewName,this)){this._fnSettingsPreprocessor=function(s){var I=this.getId();if(sap.ui.core.CustomizingConfiguration&&I){if(t.isPrefixedId(I)){I=I.substring((t.getId()+"--").length);}var m=sap.ui.core.CustomizingConfiguration.getCustomProperties(t.sViewName,I,t);if(m){s=q.extend(s,m);}}};}var i=function(){c(t,s);if(t.onControllerConnected){t.onControllerConnected(t.oController);}};if(this.initViewSettings){if(s.async){this.initViewSettings(s).then(i).then(function(){return t.runPreprocessor("controls",t);}).then(function(){t.fireAfterInit();t._oAsyncState.resolve(t);});}else{this.initViewSettings(s);i();this.runPreprocessor("controls",this,true);this.fireAfterInit();}}};V.prototype.getController=function(){return this.oController;};V.prototype.byId=function(i){return sap.ui.getCore().byId(this.createId(i));};V.prototype.createId=function(i){if(!this.isPrefixedId(i)){i=this.getId()+"--"+i;}return i;};V.prototype.isPrefixedId=function(i){return!!(i&&i.indexOf(this.getId()+"--")===0);};var c=function(t,s){if(!sap.ui.getCore().getConfiguration().getControllerCodeDeactivated()){var o=s.controller;if(!o&&t.getControllerName){var d=t.getControllerName();if(d){o=sap.ui.controller(d);}}if(o){t.oController=o;o.connectToView(t);}}else{t.oController={};}};V.prototype.getViewData=function(){return this.oViewData;};V.prototype.exit=function(){this.fireBeforeExit();this.oController=null;this._oAsyncState=null;};V.prototype.onAfterRendering=function(){this.fireAfterRendering();};V.prototype.onBeforeRendering=function(){this.fireBeforeRendering();};V.prototype.clone=function(i,L){var s={},k,o;for(k in this.mProperties&&!(this.isBound&&this.isBound(k))){if(this.mProperties.hasOwnProperty(k)){s[k]=this.mProperties[k];}}o=C.prototype.clone.call(this,i,L,{cloneChildren:false,cloneBindings:true});o.applySettings(s);return o;};V.prototype.runPreprocessor=function(t,s,S){var v=this.getMetadata().getClass()._sType,o={name:this.sViewName,id:this.getId(),caller:this+" ("+this.sViewName+")",sync:!!S},a=V._mPreprocessors[v]?V._mPreprocessors[v][t]:undefined,L=this.mPreprocessors[t],p;function r(R){if(R instanceof Promise||S){return R;}else{return Promise.resolve(R);}}if(L&&L.preprocessor){a=L;}else if(L&&(a&&a.onDemand)){q.extend(true,a,L);}else if(a&&a.onDemand){return r(s);}if(a){if(typeof a.preprocessor==="string"){q.sap.require(a.preprocessor);q.sap.log.debug("Running preprocessor for \""+t+"\" via module string \""+a.preprocessor+"\"",this);p=q.sap.getObject(a.preprocessor).process;}else if(a.preprocessor){q.sap.log.debug("Running preprocessor for \""+t+"\" via given function",this);p=a.preprocessor;}if(p&&(!S||a.syncSupport==S)){return r(p(s,o,a));}}return r(s);};V.registerPreprocessor=function(t,p,v,s,o,S){if(typeof o!=="boolean"){S=o;o=false;}if(p){q.sap.log.debug("Register "+(o?"onDemand-":"")+"preprocessor for \""+t+"\""+(s?" with syncSupport":""),this.getMetadata().getName());if(!V._mPreprocessors[v]){V._mPreprocessors[v]={};}else if(!V._mPreprocessors[v][t]){V._mPreprocessors[v][t]={};}V._mPreprocessors[v][t]={preprocessor:p,onDemand:o,syncSupport:s};q.extend(true,V._mPreprocessors[v][t],S);}else{q.sap.log.error("Registration for \""+t+"\" failed, no preprocessor specified",this.getMetadata().getName());}};sap.ui.view=function(i,v,t){var a=null,o={};if(typeof i==="object"||typeof i==="string"&&v===undefined){v=i;i=undefined;}if(v){if(typeof v==="string"){o.viewName=v;}else{o=v;}}if(i){o.id=i;}if(t){o.type=t;}if(sap.ui.core.CustomizingConfiguration){var b=sap.ui.core.CustomizingConfiguration.getViewReplacement(o.viewName,M._sOwnerId);if(b){q.sap.log.info("Customizing: View replacement for view '"+o.viewName+"' found and applied: "+b.viewName+" (type: "+b.type+")");q.extend(o,b);}else{q.sap.log.debug("Customizing: no View replacement found for view '"+o.viewName+"'.");}}if(!o.type){throw new Error("No view type specified.");}else if(o.type===sap.ui.core.mvc.ViewType.JS){a=new sap.ui.core.mvc.JSView(o);}else if(o.type===sap.ui.core.mvc.ViewType.JSON){a=new sap.ui.core.mvc.JSONView(o);}else if(o.type===sap.ui.core.mvc.ViewType.XML){a=new sap.ui.core.mvc.XMLView(o);}else if(o.type===sap.ui.core.mvc.ViewType.HTML){a=new sap.ui.core.mvc.HTMLView(o);}else if(o.type===sap.ui.core.mvc.ViewType.Template){a=new sap.ui.core.mvc.TemplateView(o);}else{throw new Error("Unknown view type "+o.type+" specified.");}return a;};V.prototype.loaded=function(){if(!this._oAsyncState){var t=this;return new Promise(function(r){r(t);});}else{return this._oAsyncState.promise;}};V._resolveEventHandler=function(n,o){var h;if(!sap.ui.getCore().getConfiguration().getControllerCodeDeactivated()){switch(n.indexOf('.')){case 0:h=o&&o[n.slice(1)];break;case-1:h=o&&o[n];if(h!=null){break;}default:h=q.sap.getObject(n);}}else{h=function(){};}if(typeof h==="function"){h._sapui_handlerName=n;return[h,o];}};return V;},true);