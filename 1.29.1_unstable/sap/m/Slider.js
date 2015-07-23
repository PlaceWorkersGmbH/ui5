/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./SliderRenderer','./library','sap/ui/core/Control','sap/ui/core/EnabledPropagator'],function(q,S,l,C,E){"use strict";var a=C.extend("sap.m.Slider",{metadata:{library:"sap.m",properties:{width:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"100%"},enabled:{type:"boolean",group:"Behavior",defaultValue:true},name:{type:"string",group:"Misc",defaultValue:""},min:{type:"float",group:"Data",defaultValue:0},max:{type:"float",group:"Data",defaultValue:100},step:{type:"float",group:"Data",defaultValue:1},progress:{type:"boolean",group:"Misc",defaultValue:true},value:{type:"float",group:"Data",defaultValue:0}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{change:{parameters:{value:{type:"float"}}},liveChange:{parameters:{value:{type:"float"}}}}}});E.apply(a.prototype,[true]);a.prototype._cacheDomRefs=function(){this._$Handle=this.$("handle");};a.prototype._convertValueToRtlMode=function(v){return this.getMax()-v+this.getMin();};a.prototype._recalculateStyles=function(){var s=this.$();this._fSliderWidth=s.width();this._fSliderPaddingLeft=parseFloat(s.css("padding-left"));this._fSliderOffsetLeft=s.offset().left;this._fHandleWidth=this._$Handle.width();};a.prototype._validateProperties=function(){var m=this.getMin(),M=this.getMax(),s=this.getStep(),b=false,e=false;if(m>=M){b=true;e=true;q.sap.log.warning("Warning: "+"Property wrong min: "+m+" >= max: "+M+" on ",this);}if(s<=0){q.sap.log.warning("Warning: "+"The step could not be negative on ",this);s=1;this.setProperty("step",s,true);}if(s>(M-m)&&!b){e=true;q.sap.log.warning("Warning: "+"Property wrong step: "+s+" > max: "+M+" - "+"min: "+m+" on ",this);}return e;};a.prototype._getPercentOfValue=function(v){var m=this.getMin();return(((v-m)/(this.getMax()-m))*100);};a.prototype._validateStep=function(s){if(typeof s==="undefined"){return 1;}if(typeof s!=="number"){q.sap.log.warning('Warning: "iStep" needs to be a number',this);return 0;}if((Math.floor(s)===s)&&isFinite(s)){return s;}q.sap.log.warning('Warning: "iStep" needs to be a finite interger',this);return 0;};a.prototype._setValue=function(n){var m=this.getMin(),M=this.getMax(),s=this.getStep(),v=this.getValue(),f;if(typeof n!=="number"||!isFinite(n)){q.sap.log.error("Error:",'"fNewValue" needs to be a finite number on ',this);return this;}f=n%s;n=f*2>=s?n+s-f:n-f;if(n<m){n=m;}else if(n>M){n=M;}n=Number(n.toFixed(5));this.setProperty("value",n,true);if(v!==this.getValue()){this._setDomValue(n);}return this;};a.prototype._setDomValue=function(n){var i,p,h,d=this.getDomRef();if(!d){return;}i="#"+this.getId();p=this._getPercentOfValue(n)+"%";h=d.querySelector(i+"-handle");if(!!this.getName()){d.querySelector(i+"-input").setAttribute("value",n);}if(this.getProgress()){d.querySelector(i+"-progress").style.width=p;}h.style[sap.ui.getCore().getConfiguration().getRTL()?"right":"left"]=p;h.title=n;h.setAttribute("aria-valuenow",n);};a.prototype._getClosestHandle=function(){return this._$Handle;};a.prototype._increaseValueBy=function(i){var v,n;if(this.getEnabled()){v=this.getValue();this.setValue(v+(i||1));n=this.getValue();if(v<n){this._fireChangeAndLiveChange({value:n});}}};a.prototype._decreaseValueBy=function(d){var v,n;if(this.getEnabled()){v=this.getValue();this.setValue(v-(d||1));n=this.getValue();if(v>n){this._fireChangeAndLiveChange({value:n});}}};a.prototype._getLongStep=function(){var m=this.getMin(),M=this.getMax(),s=this.getStep(),L=(M-m)/10,i=(M-m)/s;return i>10?L:s;};a.prototype._fireChangeAndLiveChange=function(p){this.fireChange(p);this.fireLiveChange(p);};a.prototype._hasFocus=function(){return document.activeElement===this.getFocusDomRef();};a.prototype.onBeforeRendering=function(){var e=this._validateProperties();if(!e){this.setValue(this.getValue());this._sProgressValue=this._getPercentOfValue(this.getValue())+"%";}if(!this._hasFocus()){this._fInitialFocusValue=this.getValue();}};a.prototype.onAfterRendering=function(){this._cacheDomRefs();};a.prototype.exit=function(){this._$Handle=null;};a.prototype.ontouchstart=function(e){var m=this.getMin(),t=e.targetTouches[0],n,N,s="."+S.CSS_CLASS;e.setMarked();if(e.targetTouches.length>1||!this.getEnabled()||e.button){return;}q(document).on("touchend"+s+" touchcancel"+s+" mouseup"+s,this._ontouchend.bind(this)).on(e.originalEvent.type==="touchstart"?"touchmove"+s:"touchmove"+s+" mousemove"+s,this._ontouchmove.bind(this));n=this._getClosestHandle()[0];if(t.target!==n){q.sap.delayedCall(0,n,"focus");}if(!this._hasFocus()){this._fInitialFocusValue=this.getValue();}this._recalculateStyles();this._fDiffX=this._fSliderPaddingLeft;this._fInitialValue=this.getValue();this.$("inner").addClass(S.CSS_CLASS+"Pressed");if(t.target===this.getDomRef("handle")){this._fDiffX=(t.pageX-this._$Handle.offset().left)+this._fSliderPaddingLeft-(this._fHandleWidth/2);}else{N=(((t.pageX-this._fSliderPaddingLeft-this._fSliderOffsetLeft)/this._fSliderWidth)*(this.getMax()-m))+m;if(sap.ui.getCore().getConfiguration().getRTL()){N=this._convertValueToRtlMode(N);}this.setValue(N);N=this.getValue();if(this._fInitialValue!==N){this.fireLiveChange({value:N});}}};a.prototype._ontouchmove=function(e){e.setMarked();e.preventDefault();if(e.isMarked("delayedMouseEvent")||!this.getEnabled()||e.button){return;}var m=this.getMin(),v=this.getValue(),p=e.targetTouches?e.targetTouches[0].pageX:e.pageX,n=(((p-this._fDiffX-this._fSliderOffsetLeft)/this._fSliderWidth)*(this.getMax()-m))+m;if(sap.ui.getCore().getConfiguration().getRTL()){n=this._convertValueToRtlMode(n);}this.setValue(n);n=this.getValue();if(v!==n){this.fireLiveChange({value:n});}};a.prototype._ontouchend=function(e){var s="."+S.CSS_CLASS;e.setMarked();if(e.isMarked("delayedMouseEvent")||!this.getEnabled()||e.button){return;}q(document).off(s);var v=this.getValue();this.$("inner").removeClass(S.CSS_CLASS+"Pressed");if(this._fInitialValue!==v){this.fireChange({value:v});}};a.prototype.onsapincrease=function(e){var v,n;e.preventDefault();e.setMarked();if(this.getEnabled()){v=this.getValue();this.stepUp(1);n=this.getValue();if(v<n){this._fireChangeAndLiveChange({value:n});}}};a.prototype.onsapincreasemodifiers=function(e){e.preventDefault();e.setMarked();this._increaseValueBy(this._getLongStep());};a.prototype.onsapdecrease=function(e){var v,n;e.preventDefault();e.setMarked();if(this.getEnabled()){v=this.getValue();this.stepDown(1);n=this.getValue();if(v>n){this._fireChangeAndLiveChange({value:n});}}};a.prototype.onsapdecreasemodifiers=function(e){e.preventDefault();e.setMarked();this._decreaseValueBy(this._getLongStep());};a.prototype.onsapplus=function(e){var v,n;e.setMarked();if(this.getEnabled()){v=this.getValue();this.stepUp(1);n=this.getValue();if(v<n){this._fireChangeAndLiveChange({value:n});}}};a.prototype.onsapminus=function(e){var v,n;e.setMarked();if(this.getEnabled()){v=this.getValue();this.stepDown(1);n=this.getValue();if(v>n){this._fireChangeAndLiveChange({value:n});}}};a.prototype.onsappageup=a.prototype.onsapincreasemodifiers;a.prototype.onsappagedown=a.prototype.onsapdecreasemodifiers;a.prototype.onsaphome=function(e){e.setMarked();var m=this.getMin();e.preventDefault();if(this.getEnabled()&&this.getValue()>m){this.setValue(m);this._fireChangeAndLiveChange({value:m});}};a.prototype.onsapend=function(e){e.setMarked();var m=this.getMax();e.preventDefault();if(this.getEnabled()&&this.getValue()<m){this.setValue(m);this._fireChangeAndLiveChange({value:m});}};a.prototype.onsaptabnext=function(){this._fInitialFocusValue=this.getValue();};a.prototype.onsaptabprevious=function(){this._fInitialFocusValue=this.getValue();};a.prototype.onsapescape=function(){this.setValue(this._fInitialFocusValue);};a.prototype.getFocusDomRef=function(){return this.getDomRef("handle");};a.prototype.stepUp=function(s){return this.setValue(this.getValue()+(this._validateStep(s)*this.getStep()));};a.prototype.stepDown=function(s){return this.setValue(this.getValue()-(this._validateStep(s)*this.getStep()));};a.prototype.setValue=function(n){this.setValue=this._setValue;return this.setProperty("value",n,true);};return a;},true);
