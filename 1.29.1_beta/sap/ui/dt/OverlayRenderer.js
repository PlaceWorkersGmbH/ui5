/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/dt/AggregationOverlay','sap/ui/dt/DOMUtil'],function(A,D){"use strict";var O={};O.render=function(r,o){if(o.getDomRef()){o.$().empty();this._triggerOnAfterRenderingWithoutRendering(r,o);return;}r.addClass("sapUiDtOverlay");r.write("<div");r.writeControlData(o);r.write("data-sap-ui-dt-for='"+o.getElementInstance().getId()+"'");r.writeClasses();r.writeStyles();r.write(">");this._renderAggregationOverlays(r,o);r.write("</div>");};O._renderAggregationOverlays=function(r,o){var a=o.getAggregationOverlays();a.forEach(function(b){r.renderControl(b);});};O._triggerOnAfterRenderingWithoutRendering=function(r,o){r.write("");this._renderAggregationOverlays(r,o);return;};return O;},true);
