/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/base/ManagedObjectMetadata'],function(q,M){"use strict";var E=function(c,C){M.apply(this,arguments);};E.prototype=q.sap.newObject(M.prototype);E.uid=M.uid;E.prototype.getElementName=function(){return this._sClassName;};E.prototype.getRendererName=function(){return this._sRendererName;};E.prototype.getRenderer=function(){var r=this.getRendererName();if(!r){return;}var R=q.sap.getObject(r);if(R){return R;}q.sap.require(r);return q.sap.getObject(r);};E.prototype.applySettings=function(c){var s=c.metadata;this._sVisibility=s["visibility"]||"public";var r=c.hasOwnProperty("renderer")?(c.renderer||""):undefined;delete c.renderer;M.prototype.applySettings.call(this,c);this._sRendererName=this.getName()+"Renderer";if(typeof r!=="undefined"){if(typeof r==="string"){this._sRendererName=r||undefined;return;}if(typeof r==="function"){r={render:r};}var p=this.getParent();var b;if(p&&p instanceof E){b=p.getRenderer();}if(!b){q.sap.require("sap.ui.core.Renderer");b=sap.ui.core.Renderer;}var R=q.sap.newObject(b);q.extend(R,r);q.sap.setObject(this.getRendererName(),R);}if(typeof s["designTime"]==="boolean"){this._bHasDesignTime=s["designTime"];}else if(s["designTime"]){this._bHasDesignTime=true;this._oDesignTime=s["designTime"];}};E.prototype.afterApplySettings=function(){M.prototype.afterApplySettings.apply(this,arguments);this.register&&this.register(this);};E.prototype.isHidden=function(){return this._sVisibility==="hidden";};E.prototype.getDesignTime=function(){if(!this._oDesignTime&&this._bHasDesignTime){q.sap.require({modName:this.getElementName(),type:"designtime"});this._oDesignTime=q.sap.getObject(this.getElementName()+".designtime");}return this._oDesignTime;};E.prototype.loadDesignTime=function(){var t=this;return new Promise(function(r,R){if(!t._oDesignTime&&t._bHasDesignTime){var m=q.sap.getResourceName(t.getElementName(),".designtime");sap.ui.require([m],function(d){t._oDesignTime=d;r(d);});}else{r(t._oDesignTime);}});};return E;},true);
