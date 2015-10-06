/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/Control','sap/ui/core/delegate/ItemNavigation','sap/ui/core/theming/Parameters','./library'],function(q,C,I,P,l){"use strict";var N=C.extend("sap.ui.ux3.NotificationBar",{metadata:{library:"sap.ui.ux3",properties:{visibleStatus:{type:"sap.ui.ux3.NotificationBarStatus",group:"Misc",defaultValue:sap.ui.ux3.NotificationBarStatus.Default},resizeEnabled:{type:"boolean",group:"Misc",defaultValue:true},alwaysShowToggler:{type:"boolean",defaultValue:false,since:"1.24.5"}},aggregations:{messageNotifier:{type:"sap.ui.core.Element",multiple:false},notifiers:{type:"sap.ui.core.Element",multiple:true,singularName:"notifier"}},events:{display:{parameters:{show:{type:"boolean"}}},resize:{parameters:{status:{type:"sap.ui.ux3.NotificationBarStatus"}}}}}});C.extend("sap.ui.ux3.NotificationBar.NotifierView",{renderMessages:function(r){r.write("<div");r.writeAttribute("id",this.getId()+"-content");r.addClass("sapUiNotifierContent");r.writeClasses();r.write(">");var m=this.getMessages();var i=m.length-1;var f=true;for(;i>=0;i--){if(!f||(i==0&&m.length>1)){r.write("<div");r.addClass("sapUiNotificationBarCltSep");r.writeClasses();r.write(">");r.write("</div>");}else{f=false;}var M=m[i];if(M._message&&M._message.getReadOnly()){M.addStyleClass("sapUiNotifierMessageReadOnly");}r.renderControl(M);}r.write("</div>");},metadata:{properties:{"title":"string","visibleItems":"int","renderMode":{type:"string",defaultValue:"callout"}},aggregations:{"messages":"sap.ui.ux3.NotificationBar.MessageView"}},init:function(){this._oResBundle=sap.ui.getCore().getLibraryResourceBundle("sap.ui.ux3");},exit:function(){if(this._renderedControl){delete this._renderedControl;}delete this._oResBundle;},getTitle:function(){var t=this.getProperty("title");var c=this.getMessages().length;if(c>0){var k="NOTIBAR_NOTIFIER_VIEW_TITLE";t=this._oResBundle.getText(k,[t,c]);}return t;},renderer:function(r,c){r.write("<div");r.addClass("sapUiNotifierContainer");r.writeControlData(c);r.writeClasses();r.write(">");r.write("<div");r.writeAttribute("id",c.getId()+"-title");r.addClass("sapUiNotifierTitle");r.writeClasses();r.write(">");r.writeEscaped(c.getTitle());r.write("</div>");if(c.getMessages().length>0){c.renderMessages(r);}r.write("</div>");},onAfterRendering:function(){var $=this.$("content");var a=$.children();var t=0,c=0;var v=this.getVisibleItems();for(var i=1;i<a.length;i++){var b=q(a[i]);if(b.hasClass("sapUiNotifierMessage")){c++;}var h=b.outerHeight(true);t+=h;if(c==v){t+=2;$.css("max-height",t);}}}});C.extend("sap.ui.ux3.NotificationBar.MessageView",{metadata:{properties:{"text":"string","timestamp":"string","icon":"sap.ui.core.URI"}},renderer:function(r,c){var i=c.getId();r.write("<div");r.writeControlData(c);r.addClass("sapUiNotifierMessage");r.writeClasses();r.writeAttribute("tabindex","0");r.write(">");if(c.getIcon()){r.write("<div");r.writeAttribute("id",i+"-icon");r.addClass("sapUiNotifierMessageIcon");r.writeClasses();r.write(">");r.write("<img");r.writeAttributeEscaped("src",c.getIcon());r.write("/>");r.write("</div>");}r.write("<div");r.writeAttribute("id",i+"-text");r.addClass("sapUiNotifierMessageText");r.writeClasses();r.write(">");r.writeEscaped(c.getText());r.write("</div>");r.write("<div");r.writeAttribute("id",i+"-timestamp");r.addClass("sapUiNotifierMessageTimestamp");r.writeClasses();r.write(">");r.writeEscaped(c.getTimestamp());r.write("</div>");r.write("</div>");},onclick:function(e){if(!this._message.getReadOnly()){var n=this._message.getParent();n.fireMessageSelected({message:this._message,notifier:n});}},onsapselect:function(e){this.onclick(e);},exit:function(e){if(this._message){delete this._message;}}});(function(){var c=function(i){var j=i.hasItems();var u=i.getVisibleStatus();if(j&&u==="None"){return true;}else if(!j&&u!=="None"){return true;}else if(!j&&u!=="Min"){return true;}else{return false;}};var s=function(i,j){var u=j.getMessages().concat([]);if(u.length>0){u.sort(sap.ui.core.Message.compareByType);var v=u.length-1;i._sSeverestMessageLevel=u[v].getLevel();}};var f=function(E){var j=E.getParameter("callout");switch(E.getParameter("type")){case"added":case"removed":var u=E.getParameter("notifier");if(this.getMessageNotifier()&&this.getMessageNotifier().getId()===u.getId()){s(this,this.getMessageNotifier());}if(c(this)){var v=this.hasItems();this.fireDisplay({show:v});}else{this.invalidate();if(E.getParameter("type")==="removed"){if(j.getContent().length>0){var x=j.getContent()[0];var M=E.getParameter("message");var y=x.getMessages();var z;for(var i=0;i<y.length;i++){z=y[i];if(M.getId()===z._message.getId()){z.destroy();j.rerender();j.adjustPosition();break;}}}}}break;case"openCallout":j.destroyContent();var u=E.getParameter("notifier");u.destroyAggregation("views",true);var A=u.getId();var B=this.getMessageNotifier();if(B&&A===B.getId()){A+="-messageNotifierView";}else{A+="-messageView";}var D=new N.NotifierView(A,{title:u.getTitle(),visibleItems:this._visibleItems});if(u._bEnableMessageSelect){D.addStyleClass("sapUiNotifierSelectable");}var F=u.getMessages();for(var i=0;i<F.length;i++){var V=a(F[i],u,this);D.addMessage(V);}u.addAggregation("views",D,true);j.addContent(D);break;}};N.HOVER_ITEM_HEIGHT=16;N.prototype.init=function(){this._oItemNavigation=new I();this._oItemNavigation.setCycling(true);this.addDelegate(this._oItemNavigation);this._iCalloutWidth=parseInt(250,10);this._iCalloutHeight=parseInt(200,10);this._visibleItems=5;this._eventListener=q.proxy(f,this);this._oResBundle=sap.ui.getCore().getLibraryResourceBundle("sap.ui.ux3");this._togglerPosition="50%";this._gapMessageArea="5";this._sSeverestMessageLevel=sap.ui.core.MessageType.None;q(window).bind("resize",q.proxy(o,this));this._proxyEnableMessageSelect=q.proxy(e,this);this.data("sap-ui-fastnavgroup","true",true);this.setAlwaysShowToggler(false);};N.prototype.exit=function(){this.removeDelegate(this._oItemNavigation);this._oItemNavigation.destroy();delete this._oItemNavigation;delete this._iCalloutWidth;delete this._iCalloutHeight;delete this._visibleItems;delete this._eventListener;if(this.getMessageNotifier()){var M=this.getMessageNotifier();M._oMessageArea.destroy();delete M._oMessageArea;}delete this._resizeFrom;delete this._resizeTo;delete this._oResBundle;delete this._formerVisibleStatus;delete this._togglerPosition;delete this._gapMessageArea;delete this._isHovered;delete this._togglerClicked;delete this._sSeverestMessageLevel;q(window).unbind("resize",o);delete this._proxyEnableMessageSelect;};var a=function(M,i,j){var u=new N.MessageView(i.getId()+"-messageView-"+M.getId(),{text:M.getText(),timestamp:M.getTimestamp()});u._message=M;if(i.sParentAggregationName=="messageNotifier"){if(j.getVisibleStatus()==sap.ui.ux3.NotificationBarStatus.Max){u.setIcon(M.getIcon()||M.getDefaultIcon("32x32"));}else{u.setIcon(M.getIcon()||M.getDefaultIcon());}}else{u.setIcon(M.getIcon());}return u;};var r=function(i,j){j.attachEvent("_childControlCalling",i._eventListener,i);};var d=function(i,j){j.detachEvent("_childControlCalling",i._eventListener,i);};N.prototype.addNotifier=function(i){if(i){var j=(this.getVisibleStatus()==sap.ui.ux3.NotificationBarStatus.None)?true:false;this.addAggregation("notifiers",i,j);r(this,i);}return this;};N.prototype.insertNotifier=function(i,j){if(i){this.insertAggregation("notifiers",i,j);r(this,i);}return this;};N.prototype.removeNotifier=function(i){var j=this.removeAggregation("notifiers",i);d(this,j);return j;};N.prototype.removeAllNotifiers=function(){var j=this.removeAllAggregation("notifiers");for(var i=0;i<j.length;i++){var u=j[i];d(this,u);}return j;};N.prototype.destroyNotifiers=function(){var j=this.getNotifiers();for(var i=0;i<j.length;i++){var u=j[i];d(this,u);}this.destroyAggregation("notifiers");return this;};var e=function(E){var M=this.getMessageNotifier();if(M&&M.getId()===E.getParameter("notifier").getId()){M.invalidate();}};N.prototype.setMessageNotifier=function(M){var i=this.getMessageNotifier();if(i){i._oMessageArea.destroy();delete i._oMessageArea;i.detachEvent("_enableMessageSelect",this._proxyEnableMessageSelect);d(this,i);}this.setAggregation("messageNotifier",M);if(M){M._oMessageArea=new N.MessageView(this.getId()+"-inplaceMessage");M._oMessageArea.setParent(M);M.attachEvent("_enableMessageSelect",this._proxyEnableMessageSelect);r(this,M);}return this;};N.prototype.destroyMessageNotifier=function(M){var i=this.getMessageNotifier();if(i){i._oMessageArea.destroy();delete i._oMessageArea;i.detachEvent("_enableMessageSelect",this._proxyEnableMessageSelect);d(this,i);}this.destroyAggregation("messageNotifier");return this;};var S=function(i,j){var T=i.$();switch(j){case sap.ui.ux3.NotificationBarStatus.Min:T.addClass("sapUiNotificationBarMinimized");break;case sap.ui.ux3.NotificationBarStatus.Max:var u=i.getHeightOfStatus(i.getVisibleStatus());T.addClass("sapUiNotificationBarMaximized");T.css("height",u);var $=i.$("containers");$.css("max-height",u);break;case sap.ui.ux3.NotificationBarStatus.None:if(!i._resizeTo){T.css("display","none");}break;case sap.ui.ux3.NotificationBarStatus.Default:default:T.removeClass("sapUiNotificationBarMaximized");T.removeClass("sapUiNotificationBarMinimized");break;}};var R=function(T){if(w(T)){var F=T.getHeightOfStatus(T._resizeFrom);var $=T.$();$.css("height",F);var j=T.getHeightOfStatus(T._resizeTo);$.stop(true,true).animate({height:j},"fast",function(){var u=T.getVisibleStatus();if(u==="None"){$.css("display","none");if(T.hasItems()){if(T.getMessageNotifier()){var M=T.getMessageNotifier();M.$().css("display","none");}if(T.getNotifiers().length>0){var v=T.getNotifiers();for(var i=0;i<v.length;i++){v[i].$().css("display","none");}}}}S(T,u);p(T,u);});}else{var u=T.getVisibleStatus();S(T,u);}delete T._resizeFrom;delete T._resizeTo;};var b=function(j){if(j.getMessageNotifier()&&j.getMessageNotifier().hasItems()){var $;var u=j.getId()+"-notifiers";var v=q.sap.byId(u);if(v.length>0){var T=parseInt(v.width(),10);var x=v.children();for(var i=0;i<x.length;i++){var y=q(x[i]);if(y.hasClass("sapUiNotifier")){T-=y.width();}else if(y.hasClass("sapUiNotifierSeparator")){T-=y.width();}else if(y.hasClass("sapUiInPlaceMessage")){$=y;}}if($){T-=j._gapMessageArea+2;$.css("width",T+"px");}}}};var m=function(E){var i=q(window).height();var j=E.data.notibar;var $=j.$("hoverItem");var u=E.clientY;var v=parseInt(u,10);var B=i-$.outerHeight();if(j._isHovered){if(v<B){var x=q.proxy(H,j);$.on("mouseleave",x);window.setTimeout(function(){var y=q.Event("mouseleave",{notibar:j});$.trigger(y);$.off("mouseleave",x);},100);delete j._isHovered;}}else{if(v>=B){var x=q.proxy(H,j);$.on("mouseenter",x);window.setTimeout(function(){var y=q.Event("mouseenter",{notibar:j});$.trigger(y);$.off("mouseenter",x);},100);j._isHovered=true;}}};var g=function(i){var $=q(document);if(i.getVisibleStatus()==="Min"){$.on("mousemove",{notibar:i},m);}else{$.off("mousemove",m);}};N.prototype.onAfterRendering=function(){this._oItemNavigation.setRootDomRef(this.getDomRef());var u=[];var v=this.getVisibleStatus()===sap.ui.ux3.NotificationBarStatus.Max;if(v){var M=this.getMessageNotifier();if(M!=null){var x=M.getMessages();var y=M.getId()+"-messageNotifierView-messageView-";for(var i=x.length-1;i>=0;i--){var D=q.sap.domById(y+x[i].getId());if(D){u.push(D);}}}var z=this.getNotifiers();for(var i=0;i<z.length;i++){var x=z[i].getMessages();var y=z[i].getId()+"-notifierView-messageView-";for(var j=x.length-1;j>=0;j--){var D=q.sap.domById(y+x[j].getId());if(D){u.push(D);}}}}else{var z=this.getNotifiers();for(var i=0;i<z.length;i++){var D=z[i].getDomRef();if(D){u.push(D);}}var M=this.getMessageNotifier();if(M!=null){var D=M.getDomRef();if(D){u.push(D);}D=this.getDomRef("inplaceMessage");if(D&&q(D).hasClass("sapUiInPlaceMessageSelectable")){u.push(D);}}}this._oItemNavigation.setItemDomRefs(u);R(this);b(this);h(this,this.getMessageNotifier());k(this);if(!!sap.ui.Device.browser.internet_explorer){g(this);}if(sap.ui.Device.browser.mobile){var $=this.$("toggler");if(this.getVisibleStatus()!==sap.ui.ux3.NotificationBarStatus.None){$.css("display","block");}else{$.css("display","none");}}};var h=function(T,M){if(M&&M.hasItems()){var $=M.$("counter");$.removeClass("sapUiMessageInformation");$.removeClass("sapUiMessageSuccess");$.removeClass("sapUiMessageWarning");$.removeClass("sapUiMessageError");s(T,M);var L=T._sSeverestMessageLevel;$.addClass("sapUiMessage"+L);var i=M.getMessages().length;var K="NOTIBAR_MESSAGE_NOTIFIER_DESC_LEVEL_"+L.toUpperCase()+(i===1?"_SING":"_PL");n(T,M,K,i);}};var k=function(T){var j=T.getNotifiers();for(var i=0;i<j.length;i++){var u=j[i].getMessages().length;var K="NOTIBAR_NOTIFIER_COUNT_TEXT_"+(u===1?"SING":"PL");n(T,j[i],K,u);}};var n=function(T,i,K,j){var $=i.$("description");var M=T._oResBundle.getText(K,[j]);$.html(M);};var H=function(E){var $=this.$("toggler");var D=($.css("display")==="block")?true:false;if(D){if(E.type==="mouseleave"){$.css("display","none");}}else{if(E.type==="mouseenter"){$.css("display","block");}}};var o=function(E){b(this);};var w=function(i){if(i._resizeFrom&&i._resizeTo){if(i._resizeFrom!=i._resizeTo){return true;}}return false;};N.prototype.hasItems=function(){var j=this.getNotifiers();if(j.length>0){for(var i=0;i<j.length;i++){var u=j[i];if(u.hasItems()){return true;}}}if(this.getMessageNotifier()){if(this.getMessageNotifier().hasItems()){return true;}}return false;};var p=function(i,j){var u="none";var $=i.$();switch(j){case sap.ui.ux3.NotificationBarStatus.Max:case sap.ui.ux3.NotificationBarStatus.None:break;case sap.ui.ux3.NotificationBarStatus.Min:$.stop().animate({height:i.getHeightOfStatus(j)},{duration:"fast",queue:true});$.addClass("sapUiNotificationBarMinimized");i.$("notifiers").css("display","none");u="block";break;default:case sap.ui.ux3.NotificationBarStatus.Default:$.stop().animate({height:i.getHeightOfStatus(j)},{duration:"fast",queue:true});$.removeClass("sapUiNotificationBarMaximized");$.removeClass("sapUiNotificationBarMinimized");break;}var v=i.$("hoverItem");v.css("display",u);};N.prototype.onfocusin=function(E){if(this._togglerClicked){delete this._togglerClicked;E.stopImmediatePropagation(true);}};N.prototype.onclick=function(E){this._togglerClicked=true;this.$().blur();var $=q(document.activeElement);t(this);var i=E.target.id;var j=i.split("-");if(j){var v=this.getVisibleStatus();var u=j.length-1;switch(j[u]){case"ArrowUp":if(v==="Min"){this.setVisibleStatus("Default");}else{this.setVisibleStatus("Max");}break;case"ArrowDown":if(v==="Max"){this.setVisibleStatus("Default");}else{this.setVisibleStatus("Min");}E.preventDefault();break;case"BarUp":if(this._formerVisibleStatus){this.setVisibleStatus(this._formerVisibleStatus);}else{this.setVisibleStatus("Default");}break;case"BarDown":this._formerVisibleStatus=v;this.setVisibleStatus("Min");$.blur();break;default:if($.hasClass("sapUiNotifier")){$.focus();}else{if(this.hasItems()){var x=this.getNotifiers();if(x.length>0){var y=q(x[0]);y.focus();}else{var z=this.getMessageNotifier();if(z){q(z).focus();}}}}break;}}};N.prototype.onThemeChanged=function(E){if(this.getDomRef()){this.invalidate();}};var t=function(j){var u=j.getNotifiers();for(var i=0;i<u.length;i++){var v=u[i];v._oCallout.close();}if(j.getMessageNotifier()){j.getMessageNotifier()._oCallout.close();}};N.prototype.getHeightOfStatus=function(i){var j="";if(i==sap.ui.ux3.NotificationBarStatus.Min){j="sapUiNotificationBarHeightMinimized";}else if(i==sap.ui.ux3.NotificationBarStatus.Default){j="sapUiNotificationBarHeight";}else if(i==sap.ui.ux3.NotificationBarStatus.Max){j="sapUiNotificationBarHeightMaximized";j=P.get(j);var u=j.indexOf("%");if(u!=-1){var v=j.substring(0,u);var x=q(window).height();x=parseInt(x/100*v,10);var _=parseInt(this.getHeightOfStatus(sap.ui.ux3.NotificationBarStatus.Default),10);if(x<_){x=_+1;}}else{var M="No valid percantage value given for maximized size. 400px is used";q.sap.log.warning(M);x=400;}return x+"px";}else{return"0px";}j=P.get(j);return j;};N.prototype.setVisibleStatus=function(i){this._resizeFrom=this.getVisibleStatus();this._resizeTo=i;if(this._resizeFrom!==this._resizeTo){if(i===sap.ui.ux3.NotificationBarStatus.None){t(this);if(this.getDomRef()){p(this,i);}else{this.$().css({"height":"0px","display":"none"});}}this.setProperty("visibleStatus",i);this.fireResize({status:i});}};sap.ui.ux3.NotificationBar.prototype.setAlwaysShowToggler=function(A){if(sap.ui.Device.browser.mobile){A=true;}this.setProperty("alwaysShowToggler",A,true);var $=this.$("toggler");if(A){$.css("display","block");}else{$.css("display","none");}};}());return N;},true);
