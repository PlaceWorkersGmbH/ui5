/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/dt/OverlayRegistry','sap/ui/dt/ElementUtil'],function(q,O,E){"use strict";var a={};a.getClosestOverlayFor=function(e){var p=e.getParent();var P=O.getOverlay(p);while(p&&!P){p=p.getParent();P=O.getOverlay(p);}return P;};a.getGeometry=function(g){var m,b,c,d;g.forEach(function(e){if(e){if(!m||e.position.left<m){m=e.position.left;}if(!c||e.position.top<c){c=e.position.top;}var r=e.position.left+e.size.width;if(!b||r>b){b=r;}var B=e.position.top+e.size.height;if(!d||B>d){d=B;}}});if(typeof m==="number"){return{size:{width:b-m,height:d-c},position:{left:m,top:c}};}};a.getClosestOverlayForType=function(t,o){while(o&&!E.isInstanceOf(o.getElementInstance(),t)){o=o.getParentOverlay();}return o;};a.getClosestScrollable=function(o){o=o.getParent();while(o&&o.isScrollable&&!o.isScrollable()){o=o.getParent();}return o&&o.isScrollable?o:null;};return a;},true);
