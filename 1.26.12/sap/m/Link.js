/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./library','sap/ui/core/Control','sap/ui/core/EnabledPropagator'],function(q,l,C,E){"use strict";var L=C.extend("sap.m.Link",{metadata:{interfaces:["sap.ui.core.IShrinkable"],library:"sap.m",properties:{text:{type:"string",group:"Data",defaultValue:''},enabled:{type:"boolean",group:"Behavior",defaultValue:true},target:{type:"string",group:"Behavior",defaultValue:null},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},href:{type:"sap.ui.core.URI",group:"Data",defaultValue:null},wrapping:{type:"boolean",group:"Appearance",defaultValue:false},subtle:{type:"boolean",group:"Behavior",defaultValue:false},emphasized:{type:"boolean",group:"Behavior",defaultValue:false}},events:{press:{allowPreventDefault:true}}}});E.call(L.prototype);L.prototype.onsapspace=function(e){L.prototype._handlePress.apply(this,arguments)};L.prototype._handlePress=function(e){if(this.getEnabled()){e.setMarked();if(!this.firePress()||!this.getHref()){e.preventDefault()}}else{e.preventDefault()}};if(sap.ui.Device.support.touch){L.prototype.ontap=L.prototype._handlePress}else{L.prototype.onclick=L.prototype._handlePress}L.prototype.ontouchstart=function(e){if(this.getEnabled()){e.setMarked()}};L.prototype.setText=function(t){this.setProperty("text",t,true);t=this.getProperty("text");this.$().text(t);return this};L.prototype.setHref=function(u){this.setProperty("href",u,true);u=this.getProperty("href");this.$().attr("href",u);return this};L.prototype.setSubtle=function(s){this.setProperty("subtle",s,true);this.$().toggleClass("sapMLnkSubtle",s);return this};L.prototype.setEmphasized=function(e){this.setProperty("emphasized",e,true);this.$().toggleClass("sapMLnkEmphasized",e);return this};L.prototype.setWrapping=function(w){this.setProperty("wrapping",w,true);this.$().toggleClass("sapMLnkWrapping",w);return this};L.prototype.setEnabled=function(e){this.setProperty("enabled",e,true);this.$().toggleClass("sapMLnkDsbl",!e);if(e){this.$().attr("disabled",false);this.$().attr("tabindex","0")}else{this.$().attr("disabled",true);this.$().attr("tabindex","-1")}return this};L.prototype.setWidth=function(w){this.setProperty("width",w,true);this.$().toggleClass("sapMLnkMaxWidth",!w);this.$().css("width",w);return this};L.prototype.setTarget=function(t){this.setProperty("target",t,true);if(!t){this.$().removeAttr("target")}else{this.$().attr("target",t)}return this};return L},true);
