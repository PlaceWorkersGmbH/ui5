/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/Control','sap/ui/dt/DOMUtil','sap/ui/dt/ElementUtil','sap/ui/dt/OverlayUtil'],function(q,C,D,E,O){"use strict";var A=C.extend("sap.ui.dt.AggregationOverlay",{metadata:{library:"sap.ui.dt",properties:{aggregationName:{type:"string"},visible:{type:"boolean",defaultValue:true},droppable:{type:"boolean",defaultValue:false}},aggregations:{children:{type:"sap.ui.dt.Overlay",multiple:true}},events:{droppableChange:{parameters:{droppable:"boolean"}}}}});A.prototype.init=function(){this.attachBrowserEvent("scroll",this._onScroll,this);};A.prototype.exit=function(){delete this._oDomRef;delete this._bScrollable;};A.prototype.onAfterRendering=function(){this._oDomRef=this.getDomRef();if(this._oDomRef){this._updateDom();}};A.prototype.getDomRef=function(){return this._oDomRef||C.prototype.getDomRef.apply(this,arguments);};A.prototype.getAssociatedDomRef=function(){var o=this.getParent();var e=this.getElementInstance();var a=this.getAggregationName();var b=E.getDomRef(e);if(b){var d=o.getDesignTimeMetadata();var v=d.getAggregationDomRef(a);if(typeof v==="function"){return v.call(e,a);}else if(typeof v==="string"){return D.getDomRefForCSSSelector(b,v);}}};A.prototype.setDroppable=function(d){if(this.getDroppable()!==d){this.setProperty("droppable",d);this.toggleStyleClass("sapUiDtAggregationOverlayDroppable",d);this.fireDroppableChange({droppable:d});}return this;};A.prototype.applyStyles=function(){var a=this.getGeometry();if(a){var e=this.getParent();var m=e?e.$().offset():null;var p=D.getOffsetFromParent(a.position,m);var z=D.getZIndex(a.domRef);var o=D.getOverflows(a.domRef);var $=this.$();var s=a.size;$.css("width",s.width+"px");$.css("height",s.height+"px");$.css("top",p.top+"px");$.css("left",p.left+"px");if(z){$.css("z-index",z);}if(o){this._bScrollable=true;$.css("overflow-x",o.overflowX);$.css("overflow-y",o.overflowY);}else{this._bScrollable=false;}if(a.domRef&&this._bScrollable){D.syncScroll(a.domRef,this.$());}this.getChildren().forEach(function(b){b.applyStyles();});}};A.prototype.getGeometry=function(){var d=this.getAssociatedDomRef();var g=D.getGeometry(d);if(!g){var c=[];this.getChildren().forEach(function(o){c.push(o.getGeometry());});g=O.getGeometry(c);}return g;};A.prototype._updateDom=function(){var a=this.getGeometry();var p=this.getParent();if(p){if(p.getDomRef){this.$().appendTo(p.getDomRef());}else{this.$().appendTo(p.getRootNode());}}if(a&&this.isVisible()){this.$().show();}else{this.$().hide();}};A.prototype._onScroll=function(){var g=this.getGeometry();var a=g?g.domRef:null;if(a){D.syncScroll(this.$(),a);}};A.prototype.getElementInstance=function(){var e=this.getParent();if(e){return e.getElementInstance();}};A.prototype.isScrollable=function(){return this._bScrollable;};A.prototype.isDroppable=function(){return this.getDroppable();};A.prototype.isVisible=function(){return this.getVisible();};A.prototype.getChildren=function(){return this.getAggregation("children")||[];};return A;},true);
