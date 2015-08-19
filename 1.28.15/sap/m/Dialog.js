/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./Bar','./InstanceManager','./Toolbar','./ToolbarSpacer','./library','sap/ui/core/Control','sap/ui/core/IconPool','sap/ui/core/Popup','sap/ui/core/delegate/ScrollEnablement','sap/ui/core/theming/Parameters'],function(q,B,I,T,a,l,C,b,P,S,c){"use strict";var V=sap.ui.core.ValueState;var D=C.extend("sap.m.Dialog",{metadata:{interfaces:["sap.ui.core.PopupInterface"],library:"sap.m",properties:{icon:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null},title:{type:"string",group:"Appearance",defaultValue:null},showHeader:{type:"boolean",group:"Appearance",defaultValue:true},type:{type:"sap.m.DialogType",group:"Appearance",defaultValue:sap.m.DialogType.Standard},state:{type:"sap.ui.core.ValueState",group:"Appearance",defaultValue:V.None},stretchOnPhone:{type:"boolean",group:"Appearance",defaultValue:false,deprecated:true},stretch:{type:"boolean",group:"Appearance",defaultValue:false},contentWidth:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},contentHeight:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},horizontalScrolling:{type:"boolean",group:"Behavior",defaultValue:true},verticalScrolling:{type:"boolean",group:"Behavior",defaultValue:true}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"},subHeader:{type:"sap.m.IBar",multiple:false},customHeader:{type:"sap.m.IBar",multiple:false},beginButton:{type:"sap.m.Button",multiple:false},endButton:{type:"sap.m.Button",multiple:false},buttons:{type:"sap.m.Button",multiple:true,singularName:"button"},_header:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},_title:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},_icon:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},_toolbar:{type:"sap.m.Toolbar",multiple:false,visibility:"hidden"}},associations:{leftButton:{type:"sap.m.Button",multiple:false,deprecated:true},rightButton:{type:"sap.m.Button",multiple:false,deprecated:true},initialFocus:{type:"sap.ui.core.Control",multiple:false},ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"}},events:{beforeOpen:{},afterOpen:{},beforeClose:{parameters:{origin:{type:"sap.m.Button"}}},afterClose:{parameters:{origin:{type:"sap.m.Button"}}}}}});D._bIOS7Tablet=sap.ui.Device.os.ios&&sap.ui.Device.system.tablet&&sap.ui.Device.os.version>=7&&sap.ui.Device.os.version<8&&sap.ui.Device.browser.name==="sf";D._bPaddingByDefault=(sap.ui.getCore().getConfiguration().getCompatibilityVersion("sapMDialogWithPadding").compareTo("1.16")<0);D._mStateClasses={};D._mStateClasses[V.None]="";D._mStateClasses[V.Success]="sapMDialogSuccess";D._mStateClasses[V.Warning]="sapMDialogWarning";D._mStateClasses[V.Error]="sapMDialogError";D._mIcons={};D._mIcons[V.Success]=b.getIconURI("message-success");D._mIcons[V.Warning]=b.getIconURI("message-warning");D._mIcons[V.Error]=b.getIconURI("message-error");D.prototype.init=function(){var t=this;this._externalIcon=undefined;this._sResizeListenerId=null;this._$Window=q(window);this._iHMargin=sap.ui.Device.system.phone?64:128;this._iVMargin=16;this._aButtons=[];this._scrollContentList=["NavContainer","Page","ScrollContainer"];this.oPopup=new P();this.oPopup.setShadow(true);if(q.device.is.iphone&&!this._bMessageType){this.oPopup.setModal(true,"sapMDialogTransparentBlk");}else{this.oPopup.setModal(true,"sapMDialogBlockLayerInit");}if(!(sap.ui.Device.os.android&&sap.ui.Device.os.version<4.1&&window.navigator.userAgent.toLowerCase().indexOf("chrome")===-1)){this.oPopup.setAnimations(q.proxy(this._openAnimation,this),q.proxy(this._closeAnimation,this));}if(sap.ui.Device.system.desktop){var o=q.proxy(function(e){if(e.originalEvent&&e.originalEvent._sapui_handledByControl){return;}this.close();e.stopPropagation();},this);this.oPopup.onsapescape=o;}this._fnOrientationChange=q.proxy(this._reposition,this);this._fnContentResize=q.proxy(this._onResize,this);this._fnRepositionAfterOpen=q.proxy(this._repositionAfterOpen,this);this.oPopup._applyPosition=function(p,f){var $=t.$(),w=t._$Window;t._setDimensions();t._adjustScrollingPane();p.at={left:(w.width()-$.outerWidth())/2,top:(w.height()-$.outerHeight())/2};P.prototype._applyPosition.call(this,p);var i=$.offset().top;if(D._bIOS7Tablet&&sap.ui.Device.orientation.landscape){$.css("top",i-10);}t._registerResizeHandler();};if(D._bPaddingByDefault){this.addStyleClass("sapUiPopupWithPadding");}};D.prototype.onBeforeRendering=function(){if(this._hasSingleScrollableContent()){this._forceDisableScrolling=true;q.sap.log.info("VerticalScrolling and horizontalScrolling in sap.m.Dialog with ID "+this.getId()+" has been disabled because there's scrollable content inside");}else{this._forceDisableScrolling=false;}if(!this._forceDisableScrolling){if(!this._oScroller){this._oScroller=new S(this,this.getId()+"-scroll",{horizontal:this.getHorizontalScrolling(),vertical:this.getVerticalScrolling(),zynga:false,preventDefault:false,nonTouchScrolling:"scrollbar",iscroll:sap.ui.Device.browser.name==="an"?"force":undefined});}}};D.prototype.onAfterRendering=function(){this._$scrollPane=this.$("scroll");this._$content=this.$("cont");if(this.isOpen()){this._setInitialFocus();}};D.prototype.exit=function(){this._deregisterResizeHandler();sap.ui.Device.resize.detachHandler(this._fnOrientationChange);I.removeDialogInstance(this);if(this.oPopup){this.oPopup.detachOpened(this._handleOpened,this);this.oPopup.detachClosed(this._handleClosed,this);this.oPopup.destroy();this.oPopup=null;}if(this._oScroller){this._oScroller.destroy();this._oScroller=null;}if(this._header){this._header.destroy();this._header=null;}if(this._headerTitle){this._headerTitle.destroy();this._headerTitle=null;}if(this._iconImage){this._iconImage.destroy();this._iconImage=null;}if(this._oBeginButton){this._oBeginButton.destroy();this._oBeginButton=null;}if(this._oEndButton){this._oEndButton.destroy();this._oEndButton=null;}};D.prototype.open=function(){var p=this.oPopup;p.setInitialFocusId(this.getId());if(p.isOpen()){return this;}this._oCloseTrigger=null;this.fireBeforeOpen();p.attachOpened(this._handleOpened,this);p.setContent(this);p.setPosition("center center","center center",window,"0 0","fit");p.open();sap.ui.Device.resize.attachHandler(this._fnOrientationChange);I.addDialogInstance(this);return this;};D.prototype.close=function(){var p=this.oPopup;var e=this.oPopup.getOpenState();if(!(e===sap.ui.core.OpenState.CLOSED||e===sap.ui.core.OpenState.CLOSING)){sap.m.closeKeyboard();this.fireBeforeClose({origin:this._oCloseTrigger});p.attachClosed(this._handleClosed,this);this._deregisterResizeHandler();p.close();}return this;};D.prototype.isOpen=function(){return this.oPopup&&this.oPopup.isOpen();};D.prototype._handleOpened=function(){this.oPopup.detachOpened(this._handleOpened,this);this._setInitialFocus();this.fireAfterOpen();};D.prototype._handleClosed=function(){this.oPopup.detachClosed(this._handleClosed,this);this.$().remove();sap.ui.Device.resize.detachHandler(this._fnOrientationChange);I.removeDialogInstance(this);this.fireAfterClose({origin:this._oCloseTrigger});};D.prototype.onfocusin=function(e){var s=e.target;if(s.id===this.getId()+"-firstfe"){var L=this.$("footer").lastFocusableDomRef()||this.$("cont").lastFocusableDomRef()||(this.getSubHeader()&&this.getSubHeader().$().firstFocusableDomRef())||(this._getAnyHeader()&&this._getAnyHeader().$().lastFocusableDomRef());if(L){q.sap.focus(L);}}else if(s.id===this.getId()+"-lastfe"){var f=(this._getAnyHeader()&&this._getAnyHeader().$().firstFocusableDomRef())||(this.getSubHeader()&&this.getSubHeader().$().firstFocusableDomRef())||this.$("cont").firstFocusableDomRef()||this.$("footer").firstFocusableDomRef();if(f){q.sap.focus(f);}}};D.prototype._openAnimation=function(r,R,o){if(!(sap.ui.Device.browser.internet_explorer&&sap.ui.Device.browser.version<10)){r.css("display","block");}var t=this,O=false,e;if((sap.ui.Device.browser.internet_explorer&&sap.ui.Device.browser.version<10)||sap.ui.Device.os.ios){r.fadeIn(200,o);}else{e=function(){if(O||!t.oPopup||t.oPopup.getOpenState()!==sap.ui.core.OpenState.OPENING){return;}r.unbind("webkitAnimationEnd animationend");o();r.removeClass("sapMDialogOpening");O=true;};r.bind("webkitAnimationEnd animationend",e);r.addClass("sapMDialogOpening");setTimeout(function(){e();},150);}};D.prototype._closeAnimation=function(r,R,f){var d=false,e;if(sap.ui.Device.browser.internet_explorer&&sap.ui.Device.browser.version<10){r.fadeOut(200,f);}else{e=function(){if(d){return;}r.unbind("webkitAnimationEnd animationend");f();r.removeClass("sapMDialogClosing");d=true;};r.bind("webkitAnimationEnd animationend",e);r.addClass("sapMDialogClosing");setTimeout(function(){e();},150);}};D.prototype._setDimensions=function(){var w=this._$Window.width(),W=(D._bIOS7Tablet&&sap.ui.Device.orientation.landscape&&window.innerHeight)?window.innerHeight:this._$Window.height(),$=this.$(),s=this.getStretch()&&!this._bMessageType,h=this._iHMargin,v=this._iVMargin,p=window.parseInt($.css("padding-left"),10),i=window.parseInt($.css("padding-right"),10),d=window.parseInt($.css("padding-top"),10),e=window.parseInt($.css("padding-bottom"),10),f=this._$content,g=window.parseInt($.css("border-left-width"),10),j=window.parseInt($.css("border-right-width"),10),k=window.parseInt($.css("border-top-width"),10),m=window.parseInt($.css("border-bottom-width"),10),M=w-h,n=W-v,o=this.getContentWidth(),r=this.getContentHeight(),t=this._$scrollPane,u=t.css("position")==="absolute",x=this.getSubHeader(),y="",z=0,A,H,E,F,G,J,K;$.css({"width":"","height":"","min-width":"","max-width":"","max-height":""});t.css({"width":"","display":""});if(sap.ui.Device.system.tablet||sap.ui.Device.system.desktop){if(s){$.css({"right":"0px","bottom":"0px","width":w+"px","min-width":w+"px","max-height":W+"px"});}else{z=400;$.css({"max-width":(this._bMessageType?480:M)+"px","max-height":n+"px"});}}else{if(s){$.css({"width":w+"px","height":W+"px","max-height":W+"px"});}else{if(sap.ui.Device.orientation.portrait){$.css({"width":M+"px","max-height":n+"px"});}else{z=W;$.css({"min-width":z+"px","max-width":M+"px","max-height":n+"px"});}}}H=$.children("header.sapMDialogTitle").outerHeight(true)||0;E=x?x.$().outerHeight(true):0;F=$.children("footer").outerHeight(true)||0;A=((s)?W:n)-H-E-F-d-e-k-m;K=(sap.ui.Device.system.phone&&sap.ui.Device.orientation.portrait)||s||this._bMessageType;if(o&&!K){if(o.indexOf("%")>0){o=sap.m.PopupHelper.calcPercentageSize(o,w);}o=f.width(o).width()+"px";J=Math.max(z-p-i-g-j,Math.min(window.parseInt(o,10),M-p-i-g-j));y=J+"px";$.css({"width":J+p+i+g+j});}f.css({"width":y,"max-height":""});if(r.indexOf("%")>0){r=sap.m.PopupHelper.calcPercentageSize(r,W);}if(r){r=f.height(r).height()+"px";}if(u){G=t.outerHeight(true);if(s){f.css("height",A);}else{if(r){f.css("height",Math.min(A,window.parseInt(r,10)));}else{f.css("height",Math.min(A,G));}}}else{if(s){f.css("height",A);}else{if(r){f.css("height",Math.min(A,window.parseInt(r,10)));}else{f.css("max-height",A);}}}};D.prototype._adjustScrollingPane=function(){var $=this._$scrollPane;if($.css("position")==="absolute"){$.css("width","100%");}if(this._oScroller){this._oScroller.refresh();}};D.prototype._reposition=function(){if(this.bIsDestroyed){return;}var e=this.oPopup.getOpenState();if(e!==sap.ui.core.OpenState.OPEN&&e!==sap.ui.core.OpenState.OPENING){return;}this._fnRepositionAfterOpen();};D.prototype._repositionAfterOpen=function(){if(!this.oPopup){return;}var e=this.oPopup.getOpenState();if(e===sap.ui.core.OpenState.OPENING){window.setTimeout(this._fnRepositionAfterOpen,50);}else{this._reapplyPosition();}};D.prototype._reapplyPosition=function(){this.oPopup&&this.oPopup._applyPosition(this.oPopup._oLastPosition,true);};D.prototype._onResize=function(){if(!this.getDomRef()){return;}if(this._sResizeTimer){window.clearTimeout(this._sResizeTimer);}var t=this,r=this.getDomRef("scroll");this._sResizeTimer=window.setTimeout(function(){var n=r.offsetWidth,N=r.offsetHeight;if(t._iResizeDomWidth!==n||t._iResizeDomHeight!==N){t._fnOrientationChange();}t._sResizeTimer=null;t._reapplyPosition();},0);};D.prototype._createHeader=function(){if(!this._header){this._header=new B(this.getId()+"-header").addStyleClass("sapMDialogTitle");this.setAggregation("_header",this._header,false);}};D.prototype._hasSingleScrollableContent=function(){var d=this.getContent(),i;while(d.length===1&&d[0]instanceof sap.ui.core.mvc.View){d=d[0].getContent();}if(d.length===1){for(i=0;i<this._scrollContentList.length;i++){if(d[0]instanceof sap.m[this._scrollContentList[i]]){return true;}}}return false;};D.prototype._initBlockLayerAnimation=function(){this.oPopup._hideBlockLayer=function(){var $=q("#sap-ui-blocklayer-popup");$.removeClass("sapMDialogTransparentBlk");P.prototype._hideBlockLayer.call(this);};};D.prototype._clearBlockLayerAnimation=function(){if(q.device.is.iphone&&!this._bMessageType){delete this.oPopup._showBlockLayer;this.oPopup._hideBlockLayer=function(){var $=q("#sap-ui-blocklayer-popup");$.removeClass("sapMDialogTransparentBlk");P.prototype._hideBlockLayer.call(this);};}};D.prototype._getFocusId=function(){return this.getInitialFocus()||this._getFirstFocusableContentElementId()||this._getFirstVisibleButtonId()||this.getId();};D.prototype._getFirstVisibleButtonId=function(){var o=this.getBeginButton(),e=this.getEndButton(),d=this.getButtons(),s="";if(o&&o.getVisible()){s=o.getId();}else if(e&&e.getVisible()){s=e.getId();}else if(d&&d.length>0){for(var i=0;i<d.length;i++){if(d[i].getVisible()){s=d[i].getId();break;}}}return s;};D.prototype._getFirstFocusableContentElementId=function(){var r="";var $=this.$("cont");var f=$.firstFocusableDomRef();if(f){r=f.id;}return r;};D.prototype._setInitialFocus=function(){var f=this._getFocusId();var o=sap.ui.getCore().byId(f);var F;if(o){F=o.getFocusDomRef();}F=F||q.sap.domById(f);if(sap.ui.Device.system.desktop||(F&&!/input|textarea|select/i.test(F.tagName))){q.sap.focus(F);}else{this.focus();}};D.prototype.getScrollDelegate=function(){return this._oScroller;};D.prototype._composeAggreNameInHeader=function(p){var h;if(p==="Begin"){h="contentLeft";}else if(p==="End"){h="contentRight";}else{h="content"+p;}return h;};D.prototype._processButton=function(o){var t=this;if(!this._oButtonDelegate){this._oButtonDelegate={ontap:function(){t._oCloseTrigger=this;}};}if(o){o.addDelegate(this._oButtonDelegate,true,o);if(!(o.getType()===sap.m.ButtonType.Accept||o.getType()===sap.m.ButtonType.Reject)){o.setType(sap.m.ButtonType.Transparent);}}};D.prototype._setButton=function(o,p,s){var d=this._firstLetterUpperCase(p),g="get"+d+"Button",A=p.toLowerCase()+"Button",O="_o"+this._firstLetterUpperCase(p)+"Button",e="set"+(d==="Begin"?"End":"Begin")+"Button",f=sap.ui.Device.system.phone?this[g]():this[O];if(f&&!(f instanceof sap.m.Button)){f=sap.ui.getCore().byId(f);}if(o&&f===o){return this;}this._processButton(o);if(f){f.removeDelegate(this._oButtonDelegate);}if(sap.ui.Device.system.phone){this.setAggregation(A,o,false,true);}else{var t=this._getToolbar();if(f&&!this._aButtons.length){t.removeContent(f);}if(t.indexOfContent(o)!==-1){this[e](null);}this[O]=o;if(!this._aButtons.length){t.insertContent(o,p==="begin"?1:2);}}return this;};D.prototype._getButton=function(p){var A=p.toLowerCase()+"Button",s="_o"+this._firstLetterUpperCase(p)+"Button";if(sap.ui.Device.system.phone){return this.getAggregation(A,null,true);}else{return this[s];}};D.prototype._getButtonFromHeader=function(p){if(this._header){var h=this._composeAggreNameInHeader(this._firstLetterUpperCase(p)),d=this._header.getAggregation(h);return d&&d[0];}else{return null;}};D.prototype._firstLetterUpperCase=function(v){return v.charAt(0).toUpperCase()+v.slice(1);};D.prototype._getAnyHeader=function(){var o=this.getCustomHeader();if(o){return o;}else{var s=this.getShowHeader();if(!s){return null;}this._createHeader();return this._header;}};D.prototype._deregisterResizeHandler=function(){if(this._sResizeListenerId){sap.ui.core.ResizeHandler.deregister(this._sResizeListenerId);this._sResizeListenerId=null;}};D.prototype._registerResizeHandler=function(){if(!this._sResizeListenerId&&this.getDomRef()){var r=this.getDomRef("scroll");this._iResizeDomWidth=r.offsetWidth;this._iResizeDomHeight=r.offsetHeight;this._sResizeListenerId=sap.ui.core.ResizeHandler.register(r,this._fnContentResize);}};D.prototype._getToolbar=function(){if(!this._oToolbar){var t=this;this._oToolbar=new T(this.getId()+"-footer",{content:[new a()]}).addStyleClass("sapMTBNoBorders").applyTagAndContextClassFor("footer");this._oToolbar.close=function(){q.sap.log.warning("Function 'close' is called on the internal Toolbar instance instead of the Dialog instance with id '"+t.getId()+"'. Although the function call is forwarded to the Dialog instance, the 'close' function should be called on the Dialog instance directly.");t.close();};this.setAggregation("_toolbar",this._oToolbar);}return this._oToolbar;};D.prototype._restoreBeginAndEndButtons=function(){if((this._oBeginButton||this._oEndButton)&&!this._aButtons.length){var t=this._getToolbar();t.addContent(this._oBeginButton).addContent(this._oEndButton);}};D.prototype._removeBeginAndEndButtons=function(){if(!this._aButtons.length){var t=this._getToolbar();t.removeContent(this._oBeginButton);t.removeContent(this._oEndButton);}};D.prototype.setBeginButton=function(o){return this._setButton(o,"begin");};D.prototype.setEndButton=function(o){return this._setButton(o,"end");};D.prototype.setLeftButton=function(v){if(!(v instanceof sap.m.Button)){v=sap.ui.getCore().byId(v);}this.setBeginButton(v);return this.setAssociation("leftButton",v);};D.prototype.setRightButton=function(v){if(!(v instanceof sap.m.Button)){v=sap.ui.getCore().byId(v);}this.setEndButton(v);return this.setAssociation("rightButton",v);};D.prototype.getLeftButton=function(){var o=this.getBeginButton();return o?o.getId():null;};D.prototype.getRightButton=function(){var e=this.getEndButton();return e?e.getId():null;};D.prototype.setTitle=function(t){this.setProperty("title",t,true);if(this._headerTitle){this._headerTitle.setText(t);}else{this._headerTitle=new sap.m.Title(this.getId()+"-title",{text:t,level:"H1"}).addStyleClass("sapMDialogTitle");this._createHeader();this._header.addContentMiddle(this._headerTitle);}return this;};D.prototype.setCustomHeader=function(o){if(o){o.addStyleClass("sapMDialogTitle");}this.setAggregation("customHeader",o);};D.prototype.setState=function(s){var f={},$=this.$(),n;f[s]=true;this.setProperty("state",s,true);for(n in D._mStateClasses){$.toggleClass(D._mStateClasses[n],!!f[n]);}this.setIcon(D._mIcons[s],true);};D.prototype.setIcon=function(i,d){if(!d){this._externalIcon=i;}else{if(this._externalIcon){i=this._externalIcon;}}if(i){if(i!==this.getIcon()){if(this._iconImage){this._iconImage.setSrc(i);}else{this._iconImage=b.createControlByURI({id:this.getId()+"-icon",src:i},sap.m.Image).addStyleClass("sapMDialogIcon");this._createHeader();this._header.insertAggregation("contentMiddle",this._iconImage,0);}}}else{var s=this.getState();if(!d&&s!==V.None){if(this._iconImage){this._iconImage.setSrc(D._mIcons[s]);}}else{if(this._iconImage){this._iconImage.destroy();this._iconImage=null;}}}this.setProperty("icon",i,true);return this;};D.prototype.setType=function(t){var o=this.getType();if(o===t){return this;}this._bMessageType=(t===sap.m.DialogType.Message);return this.setProperty("type",t,false);};D.prototype.setStretch=function(s){this._bStretchSet=true;return this.setProperty("stretch",s);};D.prototype.setStretchOnPhone=function(s){if(this._bStretchSet){q.sap.log.warning("sap.m.Dialog: stretchOnPhone property is deprecated. Setting stretchOnPhone property is ignored when there's already stretch property set.");return this;}this.setProperty("stretchOnPhone",s);return this.setProperty("stretch",s&&sap.ui.Device.system.phone);};D.prototype.setVerticalScrolling=function(v){var o=this.getVerticalScrolling();if(o===v){return this;}this.$().toggleClass("sapMDialogVerScrollDisabled",!v);this.setProperty("verticalScrolling",v);if(this._oScroller){this._oScroller.setVertical(v);}return this;};D.prototype.setHorizontalScrolling=function(v){var o=this.getHorizontalScrolling();if(o===v){return this;}this.$().toggleClass("sapMDialogHorScrollDisabled",!v);this.setProperty("horizontalScrolling",v);if(this._oScroller){this._oScroller.setHorizontal(v);}return this;};D.prototype.setInitialFocus=function(i){return this.setAssociation("initialFocus",i,true);};D.prototype.setAggregation=function(A,o,s,p){if(!p&&(A==="beginButton"||A==="endButton")){return this._setButton(o,A.substring(0,A.indexOf("Button")));}else{return C.prototype.setAggregation.apply(this,Array.prototype.slice.call(arguments,0,3));}};D.prototype.getAggregation=function(A,d,p){if(!p&&(A==="beginButton"||A==="endButton")){return this._getButton(A.substring(0,A.indexOf("Button")))||d||null;}else if(A==="buttons"){return this._oToolbar?this._oToolbar.getContent().slice(1):[];}else{return C.prototype.getAggregation.apply(this,Array.prototype.slice.call(arguments,0,2));}};D.prototype.destroyAggregation=function(A,s){if((A==="beginButton"||A==="endButton")){var p=A.substring(0,A.indexOf("Button")),p=this._firstLetterUpperCase(p),d;if(!sap.ui.Device.system.phone){d="_o"+p+"Button";if(this[d]){this[d].destroy();this[d]=null;}}else{C.prototype.destroyAggregation.apply(this,arguments);}return this;}else if(A==="buttons"){var t=this._getToolbar();t.destroyContent();t.addContent(new a());this._restoreBeginAndEndButtons();return this;}else{return C.prototype.destroyAggregation.apply(this,arguments);}};D.prototype.addAggregation=function(A,o,s){if(A==="buttons"){var t=this._getToolbar();this._removeBeginAndEndButtons();if(this._aButtons.indexOf(o)===-1){this._aButtons.push(o);}t.addContent(o);return this;}else{return C.prototype.addAggregation.apply(this,arguments);}};D.prototype.indexOfAggregation=function(A,o){if(A==="buttons"){var t=this._getToolbar();var i=t.indexOfContent(o);if(i!==-1){i=i-1;}return i;}else{return C.prototype.indexOfAggregation.apply(this,arguments);}};D.prototype.insertAggregation=function(A,o,i,s){if(A==="buttons"){this._removeBeginAndEndButtons();if(this._aButtons.indexOf(o)===-1){this._aButtons.push(o);}var t=this._getToolbar();t.insertContent(o,i+1);return this;}else{return C.prototype.insertAggregation.apply(this,arguments);}};D.prototype.removeAggregation=function(A,o,s){if(A==="buttons"){var t=this._getToolbar(),d;if(typeof(o)=="number"){this._aButtons.splice(o,1);d=t.getContent(o+1);}else{var i=this._aButtons.indexOf(o);if(i!==-1){this._aButtons.splice(i,1);}d=o;}d=t.removeContent(d);this._restoreBeginAndEndButtons();return d;}else{return C.prototype.removeAggregation.apply(this,arguments);}};D.prototype.removeAllAggregation=function(A,s){if(A==="buttons"){this._aButtons=[];var t=this._getToolbar();var d=t.removeAllContent();t.addContent(new a());this._restoreBeginAndEndButtons();return d.splice(0,1);}else{return C.prototype.removeAllAggregation.apply(this,arguments);}};D.prototype.forceInvalidate=C.prototype.invalidate;D.prototype.invalidate=function(o){if(this.isOpen()){this.forceInvalidate(o);}};return D;},true);
