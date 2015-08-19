/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/dt/DOMUtil'],function(D){"use strict";var A={};A.render=function(r,a){if(a.getDomRef()){a.$().empty();this._triggerOnAfterRenderingWithoutRendering(r,a);return;}r.addClass("sapUiDtAggregationOverlay");r.write("<div");r.writeControlData(a);r.write("data-sap-ui-dt-aggregation='"+a.getAggregationName()+"'");r.writeClasses();r.writeStyles();r.write(">");this._renderChildOverlays(r,a);r.write("</div>");};A._renderChildOverlays=function(r,a){var c=a.getChildren()||[];c.forEach(function(o){r.renderControl(o);});};A._triggerOnAfterRenderingWithoutRendering=function(r,a){r.write("");this._renderChildOverlays(r,a);};return A;},true);
