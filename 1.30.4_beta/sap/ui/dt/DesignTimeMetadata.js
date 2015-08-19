/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/base/ManagedObject'],function(q,M){"use strict";var D=M.extend("sap.ui.dt.DesignTimeMetadata",{metadata:{library:"sap.ui.dt",properties:{data:{type:"object"}}}});D.prototype.setData=function(d){this.setProperty("data",this._ensureProperties(d));return this;};D.prototype._ensureProperties=function(d){return q.extend(true,{defaultSettings:{},aggregations:{layout:{visible:false}},properties:{},associations:{},events:{},behavior:{constructor:null,resize:{stop:null,grid:null,start:null,minWidth:null,minHeight:null,maxWidth:null,maxHeight:null}},renderer:null,css:null,name:null,description:"",keywords:[],draggable:true,selectable:true,removable:true,resizable:true,visible:true,needDelegateFromParent:false},d);};D.prototype.getName=function(){return this.getData().name;};D.prototype.hasAggregation=function(a){return!!this.getAggregations()[a];};D.prototype.getAggregation=function(a){return this.getAggregations()[a]||{};};D.prototype.getAggregations=function(){return this.getData().aggregations;};D.prototype.isVisible=function(){return this.getData().visible!==false;};D.prototype.isAggregationVisible=function(a){return this.getAggregation(a).visible!==false;};D.prototype.getAggregationDomRef=function(a){return this.getAggregation(a).domRef;};return D;},true);
