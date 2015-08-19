/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./library','sap/ui/core/Item'],function(q,l,I){"use strict";var S=I.extend("sap.m.SegmentedButtonItem",{metadata:{library:"sap.m",properties:{icon:{type:"string",group:"Appearance",defaultValue:null},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null}},events:{press:{}}}});S.prototype.setText=function(v){this.setProperty("text",v,true);if(this.oButton){this.oButton.setText(this.getText());}return this;};S.prototype.setIcon=function(v){this.setProperty("icon",v,true);if(this.oButton){this.oButton.setIcon(this.getIcon());}return this;};S.prototype.setEnabled=function(v){this.setProperty("enabled",v,true);if(this.oButton){this.oButton.setEnabled(this.getEnabled());}return this;};S.prototype.setTextDirection=function(v){this.setProperty("textDirection",v,true);if(this.oButton){this.oButton.setTextDirection(this.getTextDirection());}return this;};S.prototype.setWidth=function(v){this.setProperty("width",v,true);if(this.oButton){this.oButton.setWidth(this.getWidth());}return this;};S.prototype.setTooltip=function(v){this.setAggregation("tooltip",v,true);if(this.oButton){this.oButton.setTooltip(v);}return this;};return S;},true);
