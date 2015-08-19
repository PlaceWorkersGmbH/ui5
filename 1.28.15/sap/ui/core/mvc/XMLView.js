/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/base/DataType','sap/ui/core/XMLTemplateProcessor','sap/ui/core/library','./View','sap/ui/model/resource/ResourceModel','jquery.sap.xml'],function(q,D,X,l,V,R){"use strict";var a=V.extend("sap.ui.core.mvc.XMLView",{metadata:{library:"sap.ui.core",specialSettings:{containingView:true,xmlNode:true}}});sap.ui.xmlview=function(i,v){return sap.ui.view(i,v,sap.ui.core.mvc.ViewType.XML);};a._sType=sap.ui.core.mvc.ViewType.XML;a.prototype.initViewSettings=function(s){if(!s){throw new Error("mSettings must be given");}if(s.viewName&&s.viewContent){throw new Error("View name and view content are given. There is no point in doing this, so please decide.");}else if((s.viewName||s.viewContent)&&s.xmlNode){throw new Error("View name/content AND an XML node are given. There is no point in doing this, so please decide.");}else if(!(s.viewName||s.viewContent)&&!s.xmlNode){throw new Error("Neither view name/content nor an XML node is given. One of them is required.");}if(s.viewName){this._xContent=X.loadTemplate(s.viewName);}else if(s.viewContent){this.mProperties["viewContent"]=s.viewContent;this._xContent=q.sap.parseXML(s.viewContent);if(this._xContent.parseError.errorCode!=0){var p=this._xContent.parseError;throw new Error("The following problem occurred: XML parse Error for "+p.url+" code: "+p.errorCode+" reason: "+p.reason+" src: "+p.srcText+" line: "+p.line+" linepos: "+p.linepos+" filepos: "+p.filepos);}else{this._xContent=this._xContent.documentElement;}}else if(s.xmlNode){this._xContent=s.xmlNode;}this._xContent=this.runPreprocessor("xml",this._xContent);this._oContainingView=s.containingView||this;if(!this.isSubView()){X.parseViewAttributes(this._xContent,this,s);}else{delete s.controller;}if((this._resourceBundleName||this._resourceBundleUrl)&&(!s.models||!s.models[this._resourceBundleAlias])){var m=new R({bundleName:this._resourceBundleName,bundleUrl:this._resourceBundleUrl,bundleLocale:this._resourceBundleLocale});this.setModel(m,this._resourceBundleAlias);}var t=this;this.oAfterRenderingNotifier=new sap.ui.core.mvc.XMLAfterRenderingNotifier();this.oAfterRenderingNotifier.addDelegate({onAfterRendering:function(){t.onAfterRenderingBeforeChildren();}});};a.prototype.exit=function(){this.oAfterRenderingNotifier.destroy();V.prototype.exit.apply(this,arguments);};a.prototype.onControllerConnected=function(c){var t=this;sap.ui.base.ManagedObject.runWithPreprocessors(function(){t._aParsedContent=X.parseTemplate(t._xContent,t);},{settings:this._fnSettingsPreprocessor});};a.prototype.getControllerName=function(){return this._controllerName;};a.prototype.isSubView=function(){return this._oContainingView!=this;};a.prototype.onAfterRenderingBeforeChildren=function(){if(this._$oldContent.length!==0){var c=this.getAggregation("content");if(c){for(var i=0;i<c.length;i++){if(c[i].getDomRef()===null){continue;}var $=c[i].$();q.sap.byId(sap.ui.core.RenderPrefixes.Dummy+c[i].getId(),this._$oldContent).replaceWith($);}}q.sap.byId(sap.ui.core.RenderPrefixes.Dummy+this.getId()).replaceWith(this._$oldContent);}this._$oldContent=undefined;};a.prototype._onChildRerenderedEmpty=function(c,e){q(e).replaceWith('<div id="'+sap.ui.core.RenderPrefixes.Dummy+c.getId()+'" class="sapUiHidden"/>');return true;};sap.ui.core.Control.extend("sap.ui.core.mvc.XMLAfterRenderingNotifier",{renderer:function(r,c){r.write("");}});return a;},true);
