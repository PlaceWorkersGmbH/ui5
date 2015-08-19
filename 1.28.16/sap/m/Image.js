/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./library','sap/ui/core/Control'],function(q,l,C){"use strict";var I=C.extend("sap.m.Image",{metadata:{library:"sap.m",properties:{src:{type:"sap.ui.core.URI",group:"Data",defaultValue:null},width:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:null},height:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:null},decorative:{type:"boolean",group:"Accessibility",defaultValue:true},alt:{type:"string",group:"Accessibility",defaultValue:null},useMap:{type:"string",group:"Misc",defaultValue:null},densityAware:{type:"boolean",group:"Misc",defaultValue:true},activeSrc:{type:"sap.ui.core.URI",group:"Data",defaultValue:""}},events:{tap:{},press:{}}}});I._currentDevicePixelRatio=(function(){var r=(window.devicePixelRatio===undefined?1:window.devicePixelRatio);if(r<=1){r=1;}else{r*=2;r=Math.round(r);r/=2;}if(r>2){r=2;}return r;}());I.prototype.onload=function(e){if(!this._defaultEventTriggered){this._defaultEventTriggered=true;}this._bVersion2Tried=false;var d=this.$(),D=d[0];if(!this._isWidthOrHeightSet()){if(this._iLoadImageDensity>1){if((d.width()===D.naturalWidth)&&(d.height()===D.naturalHeight)){d.width(d.width()/this._iLoadImageDensity);}}}d.removeClass("sapMNoImg");};I.prototype.onerror=function(e){if(!this._defaultEventTriggered){this._defaultEventTriggered=true;}var D=this.$(),c=D.attr("src"),d=I._currentDevicePixelRatio;D.addClass("sapMNoImg");if(!c||this._iLoadImageDensity===1){return;}if(d===2||d<1){this._iLoadImageDensity=1;D.attr("src",this._generateSrcByDensity(this._isActiveState?this.getActiveSrc():this.getSrc(),1));}else if(d===1.5){if(this._bVersion2Tried){setTimeout(q.proxy(function(){this._iLoadImageDensity=1;D.attr("src",this._generateSrcByDensity(this._isActiveState?this.getActiveSrc():this.getSrc(),1));},this),0);}else{setTimeout(q.proxy(function(){this._iLoadImageDensity=2;D.attr("src",this._generateSrcByDensity(this._isActiveState?this.getActiveSrc():this.getSrc(),2));this._bVersion2Tried=true;},this),0);}}};I.prototype.onAfterRendering=function(){if(this.getDensityAware()){var d=this.$();d.on("load",q.proxy(this.onload,this));d.on("error",q.proxy(this.onerror,this));var D=this.getDomRef();if(D.complete&&!this._defaultEventTriggered){d.trigger(D.naturalWidth>0?"load":"error");}}};I.prototype.ontouchstart=function(e){if(e.srcControl.mEventRegistry["press"]||e.srcControl.mEventRegistry["tap"]){e.setMarked();}if(e.targetTouches.length===1&&this.getActiveSrc()){this.$().attr("src",this._getDensityAwareActiveSrc());this._isActiveState=true;}};I.prototype.ontouchend=function(e){if(e.targetTouches.length===0&&this.getActiveSrc()){this._isActiveState=false;this.$().attr("src",this._getDensityAwareSrc()).removeClass("sapMNoImg");}};I.prototype.setSrc=function(s){if(s===this.getSrc()){return;}this.setProperty("src",s,true);var d=this.getDomRef();if(d){this.$().attr("src",this._getDensityAwareSrc());}};I.prototype.setActiveSrc=function(a){if(!a){a="";}this.setProperty("activeSrc",a,true);};I.prototype.ontap=function(e){this.fireTap({});this.firePress({});};I.prototype.onkeyup=function(e){if(e.which===q.sap.KeyCodes.SPACE||e.which===q.sap.KeyCodes.ENTER){this.firePress({});}};I.prototype._isWidthOrHeightSet=function(){return(this.getWidth()&&this.getWidth()!=='')||(this.getHeight()&&this.getHeight()!=='');};I.prototype._getDensityAwareSrc=function(){var d=I._currentDevicePixelRatio,s=this.getSrc();this._iLoadImageDensity=d;if(d===1||!this.getDensityAware()){return s;}return this._generateSrcByDensity(s,d);};I.prototype._getDensityAwareActiveSrc=function(){var d=I._currentDevicePixelRatio,a=this.getActiveSrc();this._iLoadImageDensity=d;if(d===1||!this.getDensityAware()){return a;}return this._generateSrcByDensity(a,d);};I.prototype._generateSrcByDensity=function(s,d){if(!s){return"";}if(this._isDataUri(s)){this._iLoadImageDensity=1;return s;}if(d===1){return s;}var L=s.lastIndexOf("."),i=s.lastIndexOf("/"),n=s.substring(0,L),e=s.substring(L);if(L===-1||(i>L)){return s+"@"+d;}n=n+"@"+d;return n+e;};I.prototype._isDataUri=function(s){return s?s.indexOf("data:")===0:false;};return I;},true);
