/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global'],function(q){"use strict";var P={};P.render=function(r,c){this.startPanel(r,c);this.renderHeader(r,c);this.renderContent(r,c);this.endPanel(r);};P.startPanel=function(r,c){r.write("<section");r.addClass("sapMPanel");r.addStyle("width",c.getWidth());r.addStyle("height",c.getHeight());r.writeAccessibilityState(c,{role:"form"});r.writeControlData(c);r.writeClasses();r.writeStyles();r.write(">");};P.renderHeader=function(r,c){var i=c.getExpandable(),h=c.getHeaderToolbar();if(i){r.write("<div");if(h){r.addClass("sapMPanelWrappingDivTb");}else{r.addClass("sapMPanelWrappingDiv");}r.writeClasses();r.write(">");var I=c._getIcon();if(c.getExpanded()){I.addStyleClass("sapMPanelExpandableIconExpanded");}else{I.removeStyleClass("sapMPanelExpandableIconExpanded");}r.renderControl(I);}var H=c.getHeaderText();if(h){h.setDesign(sap.m.ToolbarDesign.Transparent,true);if(i){h.addStyleClass("sapMPanelHdrExpandable");}r.renderControl(h);}else if(H||i){r.write("<div");r.addClass("sapMPanelHdr");if(i){r.addClass("sapMPanelHdrExpandable");}r.writeClasses();r.writeAttribute("id",c.getId()+"-header");r.write("role=\"heading\">");r.writeEscaped(H);r.write("</div>");}if(i){r.write("</div>");}var o=c.getInfoToolbar();if(o){if(i){o.addStyleClass("sapMPanelExpandablePart");}o.setDesign(sap.m.ToolbarDesign.Info,true);r.renderControl(o);}};P.renderContent=function(r,c){this.startContent(r,c);this.renderChildren(r,c.getContent());this.endContent(r);};P.startContent=function(r,c){r.write("<div");r.addClass("sapMPanelContent");r.addClass("sapMPanelBG"+c.getBackgroundDesign());if(c.getExpandable()){r.addClass("sapMPanelExpandablePart");}r.writeClasses();r.write(">");};P.renderChildren=function(r,c){c.forEach(r.renderControl);};P.endContent=function(r){r.write("</div>");};P.endPanel=function(r){r.write("</section>");};return P;},true);
