/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/Device','../base/EventProvider','./Popup','./Core'],function(q,D,E,P,C){"use strict";var B=q.extend(q.sap.newObject(E.prototype),{oPopup:null,oDomRef:null,bOpenRequested:false,iDEFAULT_DELAY_MS:1000,sDOM_ID:"sapUiBusyIndicator"});E.apply(B);B.M_EVENTS={Open:"Open",Close:"Close"};B._init=function(){var r=document.createElement("div");r.id=this.sDOM_ID;this._oResBundle=sap.ui.getCore().getLibraryResourceBundle("sap.ui.core");var t=this._oResBundle.getText("BUSY_TEXT");delete this._oResBundle;var i=sap.ui.getCore().getStaticAreaRef();i.appendChild(r);q(r).addClass("sapUiBusy").attr("tabindex",0).attr("role","progressbar").attr("alt","").attr("title",t);this.oDomRef=r;this.oPopup=new P(r);this.oPopup.setModal(true,"sapUiBlyBusy");this.oPopup.setShadow(false);if(D.browser.msie&&D.browser.version<=9){this._iBusyPageWidth=q(document.body).width();this._iBusyLeft=0;this._iBusyDelta=60;this._iBusyTimeStep=50;this._iBusyWidth=500;this.attachOpen(this._IEAnimation,this);}};B._IEAnimation=function(e){if(!this._$BusyIndicator&&e){this._$BusyIndicator=e.getParameter("$Busy");}q.sap.clearDelayedCall(this._iAnimationTimeout);this._iBusyLeft+=this._iBusyDelta;if(this._iBusyLeft>this._iBusyPageWidth){this._iBusyLeft=-this._iBusyWidth;}if(!this._$BusyIndicator){q.sap.clearDelayedCall(this._iAnimationTimeout);}else{this._$BusyIndicator.css("background-position",this._iBusyLeft+"px 0px");this._iAnimationTimeout=q.sap.delayedCall(this._iBusyTimeStep,this,this._IEAnimation);}};B.show=function(d){q.sap.log.debug("sap.ui.core.BusyIndicator.show (delay: "+d+") at "+new Date().getTime());if((d===undefined)||((d!=0)&&(parseInt(d,10)==0))||(parseInt(d,10)<0)){d=this.iDEFAULT_DELAY_MS;}this.bOpenRequested=true;if(d===0){this._showNowIfRequested();}else{q.sap.delayedCall(d,this,"_showNowIfRequested");}};B._showNowIfRequested=function(){q.sap.log.debug("sap.ui.core.BusyIndicator._showNowIfRequested (bOpenRequested: "+this.bOpenRequested+") at "+new Date().getTime());if(!this.bOpenRequested){return;}if(!document.body||!sap.ui.getCore().isInitialized()){q.sap.delayedCall(100,this,"_showNowIfRequested");return;}this.bOpenRequested=false;if(!this.oDomRef){this._init();}var t=this;var o=function(){t.oPopup.detachOpened(o);t.fireOpen({$Busy:t.oPopup._$()});var d=q.sap.domById(B.sDOM_ID);q.sap.focus(d);q("body").attr("aria-busy",true);};this.oPopup.attachOpened(o);this.oPopup.open(0,P.Dock.CenterCenter,P.Dock.CenterCenter,document);};B.hide=function(){q.sap.log.debug("sap.ui.core.BusyIndicator.hide at "+new Date().getTime());var b=B;b.bOpenRequested=false;if(b.oDomRef){q("body").removeAttr("aria-busy");this.fireClose({$Busy:this.oPopup._$()});b.oPopup.close(0);}delete this._$BusyIndicator;};B.attachOpen=function(f,l){this.attachEvent(B.M_EVENTS.Open,f,l);return this;};B.detachOpen=function(f,l){this.detachEvent(B.M_EVENTS.Open,f,l);return this;};B.attachClose=function(f,l){this.attachEvent(B.M_EVENTS.Close,f,l);return this;};B.detachClose=function(f,l){this.detachEvent(B.M_EVENTS.Close,f,l);return this;};B.fireOpen=function(p){this.fireEvent(B.M_EVENTS.Open,p);};B.fireClose=function(p){this.fireEvent(B.M_EVENTS.Close,p);};return B;},true);