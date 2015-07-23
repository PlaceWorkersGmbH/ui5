/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/dt/plugin/DragDrop','sap/ui/dt/ElementUtil'],function(D,E){"use strict";var C=D.extend("sap.ui.dt.plugin.ControlDragDrop",{metadata:{library:"sap.ui.dt",properties:{draggableTypes:{type:"string[]",defaultValue:["sap.ui.core.Element"]}},associations:{},events:{}}});C.prototype.registerOverlay=function(o){D.prototype.registerOverlay.apply(this,arguments);var e=o.getElementInstance();if(this.isDraggableType(e)&&this.checkDraggable(o)){o.setDraggable(true);}if(this.oDraggedElement){this._activateValidDroppablesFor(o);}};C.prototype._getDraggableTypes=function(){return this.getProperty("draggableTypes")||[];};C.prototype.isDraggableType=function(e){var d=this._getDraggableTypes();return d.some(function(t){return E.isInstanceOf(e,t);});};C.prototype.checkDraggable=function(o){return true;};C.prototype.deregisterOverlay=function(o){D.prototype.deregisterOverlay.apply(this,arguments);o.setDraggable(false);if(this.oDraggedElement){this._deactivateDroppablesFor(o);}};C.prototype.onDragStart=function(o,e){delete this._previousTarget;this._oDraggedOverlay=o;this._activateAllValidDroppables();var g=o.getAssociatedDomRef();if(g&&e&&e.originalEvent&&e.originalEvent.dataTransfer){e.originalEvent.dataTransfer.setDragImage(g,0,0);}};C.prototype.getDraggedOverlay=function(o){return this._oDraggedOverlay;};C.prototype.onDragEnd=function(o){this._deactivateAllDroppables();delete this._oDraggedOverlay;};C.prototype.onDragEnter=function(t,e){if(t.getElementInstance()!==this._oDraggedOverlay.getElementInstance()&&t.getDomRef().outerHTML!==this._previousTarget){this._previousTarget=t.getDomRef().outerHTML;this._repositionOn(t);}};C.prototype.onAggregationDragEnter=function(a){delete this._previousTarget;var p=a.getElementInstance();var d=this._oDraggedOverlay.getElementInstance();var P=this._oDraggedOverlay.getParentOverlay();if(p!==P.getElementInstance()){var A=a.getAggregationName();E.addAggregation(p,A,d);}};C.prototype._activateAllValidDroppables=function(){this._iterateAllAggregations(this._activateValidDroppable.bind(this));};C.prototype._activateValidDroppable=function(a){if(this.checkDroppable(a)){a.setDroppable(true);}};C.prototype.checkDroppable=function(a){var p=a.getElementInstance();var d=this._oDraggedOverlay.getElementInstance();var A=a.getAggregationName();if(E.isValidForAggregation(p,A,d)){return true;}};C.prototype._deactivateDroppable=function(a){a.setDroppable(false);};C.prototype._activateValidDroppablesFor=function(o){this._iterateOverlayAggregations(o,this._activateValidDroppable.bind(this));};C.prototype._deactivateDroppablesFor=function(o){this._iterateOverlayAggregations(o,this._deactivateDroppable.bind(this));};C.prototype._deactivateAllDroppables=function(){this._iterateAllAggregations(function(a){a.setDroppable(false);});};C.prototype._iterateAllAggregations=function(s){var t=this;var d=E.getElementInstance(this.getDesignTime());var o=d.getOverlays();o.forEach(function(O){t._iterateOverlayAggregations(O,s);});};C.prototype._iterateOverlayAggregations=function(o,s){var a=o.getAggregationOverlays();a.forEach(function(A){s(A);});};C.prototype._repositionOn=function(t){var d=this._oDraggedOverlay.getElementInstance();var T=t.getElementInstance();var p=t.getParentOverlay().getElementInstance();var P=t.getParentAggregationOverlay().getAggregationName();var c=E.getAggregation(p,P);var i=c.indexOf(T);if(i!==-1){E.insertAggregation(p,P,d,i);}};return C;},true);
