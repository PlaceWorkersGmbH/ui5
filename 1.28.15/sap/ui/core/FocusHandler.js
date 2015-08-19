/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/Device','sap/ui/Global','sap/ui/base/Object','jquery.sap.script'],function(q,D,G,B){"use strict";var F=B.extend("sap.ui.core.FocusHandler",{constructor:function(r,c){B.apply(this);this.oCore=c;this.oCurrent=null;this.oLast=null;this.aEventQueue=[];this.oLastFocusedControlInfo=null;this.fEventHandler=q.proxy(this.onEvent,this);this.fDestroyHandler=q.proxy(this.destroy,this);if(r.addEventListener&&!!!D.browser.internet_explorer){r.addEventListener("focus",this.fEventHandler,true);r.addEventListener("blur",this.fEventHandler,true);}else{q(r).bind("activate",this.fEventHandler);q(r).bind("deactivate",this.fEventHandler);}q.sap.log.debug("FocusHandler setup on Root "+r.type+(r.id?": "+r.id:""),null,"sap.ui.core.FocusHandler");q(window).bind("unload",{"oRootRef":r},this.fDestroyHandler);}});F.prototype.getCurrentFocusedControlId=function(){var c=null;try{var a=q(document.activeElement);if(a.is(":focus")||(D.browser.internet_explorer&&D.browser.version==8&&document.hasFocus())){c=a.control();}}catch(e){}return c&&c.length>0?c[0].getId():null;};F.prototype.getControlFocusInfo=function(c){c=c||this.getCurrentFocusedControlId();if(!c){return null;}var C=this.oCore.getElementById(c);if(C){return{id:c,control:C,info:C.getFocusInfo(),type:C.getMetadata().getName(),focusref:C.getFocusDomRef()};}return null;};F.prototype.updateControlFocusInfo=function(c){if(c&&this.oLastFocusedControlInfo&&this.oLastFocusedControlInfo.control===c){var C=c.getId();this.oLastFocusedControlInfo=this.getControlFocusInfo(C);q.sap.log.debug("Update focus info of control "+C,null,"sap.ui.core.FocusHandler");}};F.prototype.restoreFocus=function(c){var i=c||this.oLastFocusedControlInfo;if(!i){return;}var C=this.oCore.getElementById(i.id);if(C&&i.info&&C.getMetadata().getName()==i.type&&C.getFocusDomRef()!=i.focusref&&(c||C!==i.control)){q.sap.log.debug("Apply focus info of control "+i.id,null,"sap.ui.core.FocusHandler");i.control=C;this.oLastFocusedControlInfo=i;C.applyFocusInfo(i.info);}else{q.sap.log.debug("Apply focus info of control "+i.id+" not possible",null,"sap.ui.core.FocusHandler");}};F.prototype.destroy=function(e){var r=e.data.oRootRef;if(r){if(r.removeEventListener&&!!!D.browser.internet_explorer){r.removeEventListener("focus",this.fEventHandler,true);r.removeEventListener("blur",this.fEventHandler,true);}else{q(r).unbind("activate",this.fEventHandler);q(r).unbind("deactivate",this.fEventHandler);}}q(window).unbind("unload",this.fDestroyHandler);this.oCore=null;};F.prototype.onEvent=function(b){var e=q.event.fix(b);q.sap.log.debug("Event "+e.type+" reached Focus Handler (target: "+e.target+(e.target?e.target.id:"")+")",null,"sap.ui.core.FocusHandler");var a=(e.type=="focus"||e.type=="focusin"||e.type=="activate")?"focus":"blur";this.aEventQueue.push({type:a,controlId:g(e.target)});if(this.aEventQueue.length==1){this.processEvent();}};F.prototype.processEvent=function(){var e=this.aEventQueue[0];if(!e){return;}try{if(e.type=="focus"){this.onfocusEvent(e.controlId);}else if(e.type=="blur"){this.onblurEvent(e.controlId);}}finally{this.aEventQueue.shift();if(this.aEventQueue.length>0){this.processEvent();}}};F.prototype.onfocusEvent=function(c){var C=this.oCore.getElementById(c);if(C){this.oLastFocusedControlInfo=this.getControlFocusInfo(c);q.sap.log.debug("Store focus info of control "+c,null,"sap.ui.core.FocusHandler");}this.oCurrent=c;if(!this.oLast){return;}t(this.oLast,c,this.oCore);this.oLast=null;};F.prototype.onblurEvent=function(c){if(!this.oCurrent){return;}this.oLast=c;this.oCurrent=null;q.sap.delayedCall(0,this,"checkForLostFocus");};F.prototype.checkForLostFocus=function(){if(this.oCurrent==null&&this.oLast!=null){t(this.oLast,null,this.oCore);}this.oLast=null;};var g=function(d){var i=q(d).closest("[data-sap-ui]").attr("id");if(i){return i;}return null;};var t=function(c,r,C){var o=c?sap.ui.getCore().byId(c):null;if(o){var R=r?sap.ui.getCore().byId(r):null;var e=q.Event("sapfocusleave");e.target=o.getDomRef();e.relatedControlId=R?R.getId():null;e.relatedControlFocusInfo=R?R.getFocusInfo():null;var a=o.getUIArea();var u=null;if(a){u=C.getUIArea(a.getId());}else{var p=sap.ui.getCore().getStaticAreaRef();if(q.sap.containsOrEquals(p,e.target)){u=C.getUIArea(p.id);}}if(u){u._handleEvent(e);}}};return F;},true);
