/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./Control','./Popup','./library'],function(q,C,P,l){"use strict";var T=C.extend("sap.ui.core.TooltipBase",{metadata:{"abstract":true,library:"sap.ui.core",properties:{text:{type:"string",group:"Misc",defaultValue:""},openDuration:{type:"int",group:"Behavior",defaultValue:200},closeDuration:{type:"int",group:"Behavior",defaultValue:200},myPosition:{type:"sap.ui.core.Dock",group:"Behavior",defaultValue:'begin top'},atPosition:{type:"sap.ui.core.Dock",group:"Behavior",defaultValue:'begin bottom'},offset:{type:"string",group:"Behavior",defaultValue:'10 3'},collision:{type:"sap.ui.core.Collision",group:"Behavior",defaultValue:'flip'},openDelay:{type:"int",group:"Misc",defaultValue:500},closeDelay:{type:"int",group:"Misc",defaultValue:100}},events:{closed:{}}}});T.prototype._getPopup=q.sap.getter((function(){var p=new P();p.setShadow(true);return p;}()));T.prototype.onfocusin=function(e){var s=q(e.target).control(0);if(s!=null){var d=s.getFocusDomRef();this.sStoredTooltip=null;if(d.title&&d.title!=""){this.sStoredTooltip=d.title;d.title="";}var p=this._getPopup();if(!(p.isOpen()&&p.getContent()==this)){sap.ui.getCore().getRenderManager().render(this,sap.ui.getCore().getStaticAreaRef(),true);}var v=d.getAttribute("aria-describedby");var i=this.getId()+"-title "+this.getId()+"-txt";if(v==null||v==""){d.setAttribute("aria-describedby",i);}else if(v.indexOf(i)==-1){d.setAttribute("aria-describedby",v+" "+i);}}};T.prototype.onfocusout=function(e){var s=q(e.target).control(0);if(s!=null){var d=s.getFocusDomRef();if(this.sStoredTooltip){d.title=this.sStoredTooltip;}var v=d.getAttribute("aria-describedby");var i=this.getId()+"-title "+this.getId()+"-txt";if(v&&v.indexOf(i)>=0){if(q.trim(v)==i){d.removeAttribute("aria-describedby");}else{v=v.replace(i,"");d.setAttribute("aria-describedby",v);}}}if(T.sOpenTimeout){q.sap.clearDelayedCall(T.sOpenTimeout);T.sOpenTimeout=undefined;}this.sCloseNowTimeout=q.sap.delayedCall(this.getCloseDelay(),this,"closePopup");};T.prototype.isStandardTooltip=function(t){return(typeof t==="string"&&(q.trim(t))!=="");};T.prototype.onmouseover=function(e){var E=q(e.target).control(0);if(E!=null){if(E===this){if(this.sCloseNowTimeout){q.sap.clearDelayedCall(this.sCloseNowTimeout);this.sCloseNowTimeout=null;}e.stopPropagation();e.preventDefault();return;}var c=q(e.currentTarget).control(0);if(c!==E&&!this.isStandardTooltip(E.getTooltip())){if(this.sCloseNowTimeout){q.sap.clearDelayedCall(this.sCloseNowTimeout);this.sCloseNowTimeout=null;e.stopPropagation();e.preventDefault();return;}}var L=q(e.relatedTarget).control(0);if(L){if(L.getParent()){if(L.getParent()===c&&c===E){var o=L.getTooltip();if(!this.isStandardTooltip(o)&&(!o||!(o instanceof T))){if(this.sCloseNowTimeout){q.sap.clearDelayedCall(this.sCloseNowTimeout);this.sCloseNowTimeout=null;e.stopPropagation();e.preventDefault();return;}}}}}if(this._currentControl===E||!this.isStandardTooltip(E.getTooltip())){this.removeStandardTooltips(E);if(T.sOpenTimeout){q.sap.clearDelayedCall(T.sOpenTimeout);}T.sOpenTimeout=q.sap.delayedCall(this.getOpenDelay(),this,"openPopup",[this._currentControl]);e.stopPropagation();e.preventDefault();}}};T.prototype.onmouseout=function(e){if(T.sOpenTimeout){q.sap.clearDelayedCall(T.sOpenTimeout);T.sOpenTimeout=undefined;}if(!this.sCloseNowTimeout){this.sCloseNowTimeout=q.sap.delayedCall(this.getCloseDelay(),this,"closePopup");}this.restoreStandardTooltips();e.stopPropagation();e.preventDefault();};T.prototype.closePopup=function(){var p=this._getPopup();if(this.sCloseNowTimeout){q.sap.clearDelayedCall(this.sCloseNowTimeout);}this.sCloseNowTimeout=undefined;p.attachClosed(this.handleClosed,this);p.close();this.restoreStandardTooltips();};T.prototype.handleClosed=function(){this._getPopup().detachClosed(q.proxy(this.handleClosed,this));this.fireClosed();};T.prototype.openPopup=function(s){if(s.getTooltip()!=null){if(this.sCloseNowTimeout){q.sap.clearDelayedCall(this.sCloseNowTimeout);this.sCloseNowTimeout=null;return;}var p=this._getPopup();if(p.isOpen()&&p.getContent()==this){return;}sap.ui.getCore().getRenderManager().render(this,sap.ui.getCore().getStaticAreaRef(),true);var d=s.getDomRef();p.setContent(this);p.setPosition(this.getMyPosition(),this.getAtPosition(),d,this.getOffset(),this.getCollision());p.setDurations(this.getOpenDuration(),this.getCloseDuration());p.open();this.removeStandardTooltips(this._currentControl);}};T.prototype.removeStandardTooltips=function(){var d=this._currentControl.getDomRef();if(!this.aStoredTooltips){this.aStoredTooltips=[];}else{return;}var t="";while(d&&!(d===document)){t=d.title;if(t){this.aStoredTooltips.push({domref:d,tooltip:t});d.title="";}d=d.parentNode;}if(this._currentControl.getTooltipDomRefs){var D=this._currentControl.getTooltipDomRefs();for(var i=0;i<D.length;i++){d=D[i];if(d){t=d.title;if(t){this.aStoredTooltips.push({domref:d,tooltip:t});d.title="";}}}}};T.prototype.restoreStandardTooltips=function(){var p=this._getPopup();var e=p.getOpenState();if(e===sap.ui.core.OpenState.OPEN||e===sap.ui.core.OpenState.OPENING){return;}if(T.sOpenTimeout){return;}if(this.aStoredTooltips){for(var i=0;i<this.aStoredTooltips.length;i++){var d=this.aStoredTooltips[i].domref;d.title=this.aStoredTooltips[i].tooltip;}}this.aStoredTooltips=null;};T.prototype._setParent=T.prototype.setParent;T.prototype.setParent=function(p,a){var _=this._getPopup();if(_&&_.isOpen()){this.closePopup();}this._setParent.apply(this,arguments);};T.prototype.onkeydown=function(e){if(e.ctrlKey&&e.which==q.sap.KeyCodes.I){var E=q(e.target).control(0);if(E!=null){if(this._currentControl===E||!this.isStandardTooltip(E.getTooltip())){this.removeStandardTooltips(E);this.openPopup(this._currentControl);e.preventDefault();e.stopPropagation();}}}else if(e.which==q.sap.KeyCodes.ESCAPE){if(T.sOpenTimeout){q.sap.clearDelayedCall(T.sOpenTimeout);T.sOpenTimeout=undefined;}var w=this.oPopup&&this.oPopup.isOpen();this.closePopup();if(w){e.preventDefault();e.stopPropagation();}}};T.prototype._closeOrPreventOpen=function(){var p=this._getPopup();if(p.isOpen()){this.closePopup();}else if(T.sOpenTimeout){q.sap.clearDelayedCall(T.sOpenTimeout);T.sOpenTimeout=undefined;}};return T;},true);
