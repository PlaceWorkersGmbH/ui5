/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./Bar','./Button','./InstanceManager','./library','sap/ui/core/Control','sap/ui/core/Popup','sap/ui/core/delegate/ScrollEnablement','sap/ui/core/theming/Parameters'],function(q,B,a,I,l,C,P,S,b){"use strict";var c=C.extend("sap.m.Popover",{metadata:{interfaces:["sap.ui.core.PopupInterface"],library:"sap.m",properties:{placement:{type:"sap.m.PlacementType",group:"Behavior",defaultValue:sap.m.PlacementType.Right},showHeader:{type:"boolean",group:"Appearance",defaultValue:true},title:{type:"string",group:"Appearance",defaultValue:null},modal:{type:"boolean",group:"Behavior",defaultValue:false},offsetX:{type:"int",group:"Appearance",defaultValue:0},offsetY:{type:"int",group:"Appearance",defaultValue:0},contentWidth:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},contentHeight:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},enableScrolling:{type:"boolean",group:"Misc",defaultValue:true,deprecated:true},verticalScrolling:{type:"boolean",group:"Misc",defaultValue:true},horizontalScrolling:{type:"boolean",group:"Misc",defaultValue:true},bounce:{type:"boolean",group:"Behavior",defaultValue:null}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"},customHeader:{type:"sap.ui.core.Control",multiple:false},subHeader:{type:"sap.ui.core.Control",multiple:false},footer:{type:"sap.ui.core.Control",multiple:false},_internalHeader:{type:"sap.m.Bar",multiple:false,visibility:"hidden"},beginButton:{type:"sap.ui.core.Control",multiple:false},endButton:{type:"sap.ui.core.Control",multiple:false}},associations:{leftButton:{type:"sap.m.Button",multiple:false,deprecated:true},rightButton:{type:"sap.m.Button",multiple:false,deprecated:true},initialFocus:{type:"sap.ui.core.Control",multiple:false},ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"}},events:{afterOpen:{parameters:{openBy:{type:"sap.ui.core.Control"}}},afterClose:{parameters:{openBy:{type:"sap.ui.core.Control"}}},beforeOpen:{parameters:{openBy:{type:"sap.ui.core.Control"}}},beforeClose:{parameters:{openBy:{type:"sap.ui.core.Control"}}}}}});c._bIE9=(sap.ui.Device.browser.internet_explorer&&sap.ui.Device.browser.version<10);c._bIOS7=sap.ui.Device.os.ios&&sap.ui.Device.os.version>=7&&sap.ui.Device.os.version<8&&sap.ui.Device.browser.name==="sf";c.prototype.init=function(){this._arrowOffsetThreshold=4;this._marginTopInit=false;this._marginTop=48;this._marginLeft=10;this._marginRight=10;this._marginBottom=10;this._$window=q(window);this._initialWindowDimensions={width:this._$window.width(),height:this._$window.height()};this.oPopup=new P();this.oPopup.setShadow(true);this.oPopup.setAutoClose(true);this.oPopup.setAnimations(q.proxy(this._openAnimation,this),q.proxy(this._closeAnimation,this));this._placements=[sap.m.PlacementType.Top,sap.m.PlacementType.Right,sap.m.PlacementType.Bottom,sap.m.PlacementType.Left,sap.m.PlacementType.Vertical,sap.m.PlacementType.Horizontal,sap.m.PlacementType.Auto];this._myPositions=["center bottom","begin center","center top","end center"];this._atPositions=["center top","end center","center bottom","begin center"];this._offsets=["0 -18","18 0","0 18","-18 0"];this._arrowOffset=18;this._followOfTolerance=32;this._scrollContentList=[sap.m.NavContainer,sap.m.Page,sap.m.ScrollContainer];this._fnSetArrowPosition=q.proxy(this._setArrowPosition,this);this._fnOrientationChange=q.proxy(this._onOrientationChange,this);this._fnFollowOf=q.proxy(function(i){var L=i.lastOfRect,r=i.currentOfRect;if(!sap.ui.Device.system.desktop||(Math.abs(L.top-r.top)<=this._followOfTolerance&&Math.abs(L.left-r.left)<=this._followOfTolerance)||(Math.abs(L.top+L.height-r.top-r.height)<=this._followOfTolerance&&Math.abs(L.left+L.width-r.left-r.width)<=this._followOfTolerance)){this.oPopup._applyPosition(this.oPopup._oLastPosition);}else{this.close();}},this);this.setFollowOf(true);this._oRestoreFocusDelegate={onBeforeRendering:function(){var A=q(document.activeElement),o=A.control(0);this._sFocusControlId=o&&o.getId();},onAfterRendering:function(){if(this._sFocusControlId&&!q.sap.containsOrEquals(this.getDomRef(),document.activeElement)){sap.ui.getCore().byId(this._sFocusControlId).focus();}}};var t=this;this.oPopup._applyPosition=function(p,f){var e=this.getOpenState(),o;if(e===sap.ui.core.OpenState.CLOSING||e===sap.ui.core.OpenState.CLOSED){return;}if(f){t._storeScrollPosition();}t._clearCSSStyles();var i=q.inArray(t.getPlacement(),t._placements);if(i>3&&!t._bPosCalced){t._calcPlacement();return;}t._bPosCalced=false;if(t._oOpenBy instanceof sap.ui.core.Element){p.of=t._getOpenByDomRef();}if(!p.of){q.sap.log.warning("sap.m.Popover: in function applyPosition, the openBy element doesn't have any DOM output. "+t);return;}if(!q.sap.containsOrEquals(document.documentElement,p.of)&&p.of.id){o=q.sap.byId(p.of.id);if(o){p.of=o;}else{q.sap.log.warning("sap.m.Popover: in function applyPosition, the openBy element's DOM is already detached from DOM tree and can't be found again by the same id. "+t);return;}}var r=q(p.of).rect();if(f&&t._$window.height()==t._initialWindowDimensions.height&&(r.top+r.height<=0||r.top>=t._$window.height()||r.left+r.width<=0||r.left>=t._$window.width())){t.close();return;}if(!sap.ui.Device.system.desktop){q(window).scrollLeft(0);}t._deregisterContentResizeHandler();P.prototype._applyPosition.call(this,p);t._fnSetArrowPosition();t._restoreScrollPosition();t._registerContentResizeHandler();};this.oPopup.close=function(d){var e=typeof d==="boolean";if(d!==true&&!this._isFocusInsidePopup()){t.fireBeforeClose({openBy:t._oOpenBy});}t._deregisterContentResizeHandler();P.prototype.close.apply(this,e?[]:arguments);t.removeDelegate(t._oRestoreFocusDelegate);};};c.prototype.onBeforeRendering=function(){var n,p;if(!this._bVScrollingEnabled&&!this._bHScrollingEnabled&&this._hasSingleScrollableContent()){this._forceDisableScrolling=true;q.sap.log.info("VerticalScrolling and horizontalScrolling in sap.m.Popover with ID "+this.getId()+" has been disabled because there's scrollable content inside");}else{this._forceDisableScrolling=false;}if(!this._forceDisableScrolling){if(!this._oScroller){this._oScroller=new S(this,this.getId()+"-scroll",{horizontal:this.getHorizontalScrolling(),vertical:this.getVerticalScrolling(),zynga:false,preventDefault:false,nonTouchScrolling:"scrollbar",bounce:this.getBounce()===""?undefined:this.getBounce(),iscroll:sap.ui.Device.browser.name==="an"?"force":undefined});}}if(this._bContentChanged){this._bContentChanged=false;n=this._getSingleNavContent();p=this._getSinglePageContent();if(n&&!this.getModal()&&!sap.ui.Device.support.touch&&!q.sap.simulateMobileOnDesktop){n.attachEvent("afterNavigate",function(e){q.sap.focus(this.getDomRef());},this);}if(n||p){p=p||n.getCurrentPage();if(p&&p._getAnyHeader){this.addStyleClass("sapMPopoverWithHeaderCont");}if(n){n.attachEvent("navigate",function(e){var o=e.getParameter("to");if(o instanceof sap.m.Page){this.$().toggleClass("sapMPopoverWithHeaderCont",!!o._getAnyHeader());}},this);}}}};c.prototype.onAfterRendering=function(){var $,d,e;if(!this._marginTopInit){this._marginTop=2;if(this._oOpenBy){$=q(this._getOpenByDomRef());if(!($.closest("header.sapMIBar").length>0)){d=$.closest(".sapMPage");if(d.length>0){e=d.children("header.sapMIBar");if(e.length>0){this._marginTop+=e.outerHeight();}}}this._marginTopInit=true;}}};c.prototype.exit=function(){this._deregisterContentResizeHandler();sap.ui.Device.resize.detachHandler(this._fnOrientationChange);I.removePopoverInstance(this);this.removeDelegate(this._oRestoreFocusDelegate);this._oRestoreFocusDelegate=null;if(this.oPopup){this.oPopup.detachClosed(this._handleClosed,this);this.oPopup.destroy();this.oPopup=null;}if(this._oScroller){this._oScroller.destroy();this._oScroller=null;}if(this._internalHeader){this._internalHeader.destroy();this._internalHeader=null;}if(this._headerTitle){this._headerTitle.destroy();this._headerTitle=null;}};c.prototype.openBy=function(o,s){var p=this.oPopup,e=this.oPopup.getOpenState(),f=this._getInitialFocusId(),d,i;if(e===sap.ui.core.OpenState.OPEN||e===sap.ui.core.OpenState.OPENING){if(this._oOpenBy===o){return this;}else{var g=function(){p.detachClosed(g,this);this.openBy(o);};p.attachClosed(g,this);this.close();return this;}}if(!o){return this;}if(sap.ui.Device.support.touch){sap.ui.Device.resize.attachHandler(this._fnOrientationChange);}if(!this._oOpenBy||o!==this._oOpenBy){this._oOpenBy=o;}this.fireBeforeOpen({openBy:this._oOpenBy});p.attachOpened(this._handleOpened,this);p.attachClosed(this._handleClosed,this);p.setInitialFocusId(f);i=q.inArray(this.getPlacement(),this._placements);if(i>-1){d=this._getOpenByDomRef();if(!d){q.sap.log.error("sap.m.Popover id = "+this.getId()+": is opened by a control which isn't rendered yet.");return this;}this.toggleStyleClass("sapUiSizeCompact",!!q(d).closest(".sapUiSizeCompact").length);p.setAutoCloseAreas([d]);p.setContent(this);if(i<=3){p.setPosition(this._myPositions[i],this._atPositions[i],d,this._calcOffset(this._offsets[i]),"fit");}else{p._oPosition.of=d;}var t=this;var h=function(){if(p.getOpenState()===sap.ui.core.OpenState.CLOSING){if(t._sOpenTimeout){clearTimeout(t._sOpenTimeout);t._sOpenTimeout=null;}t._sOpenTimeout=setTimeout(h,150);}else{t._oPreviousFocus=P.getCurrentFocusInfo();p.open();t.addDelegate(t._oRestoreFocusDelegate,t);if(!s){I.addPopoverInstance(t);}}};h();}else{q.sap.log.error(this.getPlacement()+"is not a valid value! It can only be top, right, bottom or left");}return this;};c.prototype.close=function(){var e=this.oPopup.getOpenState(),s;if(e===sap.ui.core.OpenState.CLOSED||e===sap.ui.core.OpenState.CLOSING){return this;}this.fireBeforeClose({openBy:this._oOpenBy});this.oPopup.close(true);if(this._oPreviousFocus){s=(this._oPreviousFocus.sFocusId===sap.ui.getCore().getCurrentFocusedControlId())||(this._oPreviousFocus.sFocusId===document.activeElement.id);if(!s&&this.oPopup.restoreFocus){P.applyFocusInfo(this._oPreviousFocus);this._oPreviousFocus=null;}}return this;};c.prototype.isOpen=function(){return this.oPopup&&this.oPopup.isOpen();};c.prototype.setFollowOf=function(v){if(v){this.oPopup.setFollowOf(this._fnFollowOf);}else{this.oPopup.setFollowOf(false);}return this;};c.prototype._clearCSSStyles=function(){var s=this.getDomRef().style,$=this.$("cont"),d=$.children(".sapMPopoverScroll"),o=$[0].style,e=d[0].style,f=d.css("position")==="absolute",g=this.getContentWidth(),h=this.getContentHeight(),i=this.$("arrow"),w=this._$window.width(),W=this._$window.height();if(g.indexOf("%")>0){g=sap.m.PopupHelper.calcPercentageSize(g,w);}if(h.indexOf("%")>0){h=sap.m.PopupHelper.calcPercentageSize(h,W);}o.width=g||(f?d.outerWidth(true)+"px":"");o.height=h||(f?d.outerHeight(true)+"px":"");o.maxWidth="";o.maxHeight="";s.left="";s.right="";s.top="";s.bottom="";s.width="";s.height="";e.width="";e.display="";i.removeClass("sapMPopoverArrRight sapMPopoverArrLeft sapMPopoverArrDown sapMPopoverArrUp sapMPopoverCrossArr sapMPopoverFooterAlignArr sapMPopoverHeaderAlignArr");i.css({left:"",top:""});};c.prototype._onOrientationChange=function(){var e=this.oPopup.getOpenState();if(!(e===sap.ui.core.OpenState.OPEN||e===sap.ui.core.OpenState.OPENING)){return;}this.oPopup._applyPosition(this.oPopup._oLastPosition,true);};c.prototype._handleOpened=function(){var t=this;this.oPopup.detachOpened(this._handleOpened,this);if(!sap.ui.Device.support.touch){setTimeout(function(){sap.ui.Device.resize.attachHandler(t._fnOrientationChange);},0);}var f=this._getInitialFocusId(),o=sap.ui.getCore().byId(f);q.sap.focus(o?o.getFocusDomRef():q.sap.domById(f));this.fireAfterOpen({openBy:this._oOpenBy});};c.prototype._handleClosed=function(){this.oPopup.detachClosed(this._handleClosed,this);sap.ui.Device.resize.detachHandler(this._fnOrientationChange);I.removePopoverInstance(this);this.fireAfterClose({openBy:this._oOpenBy});};c.prototype.onfocusin=function(e){var s=e.target,$=this.$();if(s.id===this.getId()+"-firstfe"){var L=$.lastFocusableDomRef();q.sap.focus(L);}else if(s.id===this.getId()+"-lastfe"){var f=$.firstFocusableDomRef();q.sap.focus(f);}};c.prototype.onkeydown=function(e){var k=q.sap.KeyCodes,K=e.which||e.keyCode,A=e.altKey;if(K===k.ESCAPE||(A&&K===k.F4)){if(e.originalEvent&&e.originalEvent._sapui_handledByControl){return;}this.close();e.stopPropagation();e.preventDefault();}};c.prototype._hasSingleNavContent=function(){return!!this._getSingleNavContent();};c.prototype._getSingleNavContent=function(){var d=this.getContent();while(d.length===1&&d[0]instanceof sap.ui.core.mvc.View){d=d[0].getContent();}if(d.length===1&&d[0]instanceof sap.m.NavContainer){return d[0];}else{return null;}};c.prototype._getSinglePageContent=function(){var d=this.getContent();while(d.length===1&&d[0]instanceof sap.ui.core.mvc.View){d=d[0].getContent();}if(d.length===1&&d[0]instanceof sap.m.Page){return d[0];}else{return null;}};c.prototype._hasSinglePageContent=function(){var d=this.getContent();while(d.length===1&&d[0]instanceof sap.ui.core.mvc.View){d=d[0].getContent();}if(d.length===1&&d[0]instanceof sap.m.Page){return true;}else{return false;}};c.prototype._hasSingleScrollableContent=function(){var d=this.getContent(),i;while(d.length===1&&d[0]instanceof sap.ui.core.mvc.View){d=d[0].getContent();}if(d.length===1){for(i=0;i<this._scrollContentList.length;i++){if(d[0]instanceof this._scrollContentList[i]){return true;}}return false;}else{return false;}};c.prototype._getOffsetX=function(){var r=sap.ui.getCore().getConfiguration().getRTL();return this.getOffsetX()*(r?-1:1);};c.prototype._getOffsetY=function(){return this.getOffsetY();};c.prototype._calcOffset=function(o){var O=this._getOffsetX(),i=this._getOffsetY();var p=o.split(" ");return(parseInt(p[0],10)+O)+" "+(parseInt(p[1],10)+i);};c.prototype._calcPlacement=function(){var p=this.getPlacement();var o=this._getOpenByDomRef();switch(p){case sap.m.PlacementType.Auto:this._calcAuto();break;case sap.m.PlacementType.Vertical:this._calcVertical();break;case sap.m.PlacementType.Horizontal:this._calcHorizontal();break;}this._bPosCalced=true;var i=q.inArray(this._oCalcedPos,this._placements);this.oPopup.setPosition(this._myPositions[i],this._atPositions[i],o,this._calcOffset(this._offsets[i]),"fit");};c.prototype._calcVertical=function(){var $=q(this._getOpenByDomRef());var o=this._getOffsetY();var t=$.offset().top-this._marginTop+o;var p=$.offset().top+$.outerHeight();var i=this._$window.height()-p-this._marginBottom-o;if(t>i){this._oCalcedPos=sap.m.PlacementType.Top;}else{this._oCalcedPos=sap.m.PlacementType.Bottom;}};c.prototype._calcHorizontal=function(){var $=q(this._getOpenByDomRef());var o=this._getOffsetX();var L=$.offset().left-this._marginLeft+o;var p=$.offset().left+$.outerWidth();var r=this._$window.width()-p-this._marginRight-o;var R=sap.ui.getCore().getConfiguration().getRTL();if(L>r){R?(this._oCalcedPos=sap.m.PlacementType.Right):(this._oCalcedPos=sap.m.PlacementType.Left);}else{R?(this._oCalcedPos=sap.m.PlacementType.Left):(this._oCalcedPos=sap.m.PlacementType.Right);}};c.prototype._calcAuto=function(){if(this._$window.width()>this._$window.height()){if(this._checkHorizontal()){this._calcHorizontal();}else if(this._checkVertical()){this._calcVertical();}else{this._calcBestPos();}}else{if(this._checkVertical()){this._calcVertical();}else if(this._checkHorizontal()){this._calcHorizontal();}else{this._calcBestPos();}}};c.prototype._checkHorizontal=function(){var $=q(this._getOpenByDomRef());var o=this._getOffsetX();var L=$.offset().left-this._marginLeft+o;var p=$.offset().left+$.outerWidth();var r=this._$window.width()-p-this._marginRight-o;var d=this.$();var w=d.outerWidth()+this._arrowOffset;if((w<=L)||(w<=r)){return true;}};c.prototype._checkVertical=function(){var $=q(this._getOpenByDomRef());var o=this._getOffsetY();var t=$.offset().top-this._marginTop+o;var p=$.offset().top+$.outerHeight();var i=this._$window.height()-p-this._marginBottom-o;var d=this.$();var h=d.outerHeight()+this._arrowOffset;if((h<=t)||(h<=i)){return true;}};c.prototype._calcBestPos=function(){var $=this.$();var h=$.outerHeight();var w=$.outerWidth();var d=q(this._getOpenByDomRef());var o=this._getOffsetX();var O=this._getOffsetY();var t=d.offset().top-this._marginTop+O;var p=d.offset().top+d.outerHeight();var i=this._$window.height()-p-this._marginBottom-O;var L=d.offset().left-this._marginLeft+o;var e=d.offset().left+d.outerWidth();var r=this._$window.width()-e-this._marginRight-o;var f=h*w;var A;var g;if((this._$window.height()-this._marginTop-this._marginBottom)>=h){A=h;}else{A=this._$window.height()-this._marginTop-this._marginBottom;}if((this._$window.width()-this._marginLeft-this._marginRight)>=w){g=w;}else{g=this._$window.width()-this._marginLeft-this._marginRight;}var j=(A*(L))/f;var R=(A*(r))/f;var T=(g*(t))/f;var k=(g*(i))/f;var m=Math.max(j,R);var M=Math.max(T,k);if(m>M){if(m===j){this._oCalcedPos=sap.m.PlacementType.Left;}else if(m===R){this._oCalcedPos=sap.m.PlacementType.Right;}}else if(M>m){if(M===T){this._oCalcedPos=sap.m.PlacementType.Top;}else if(M===k){this._oCalcedPos=sap.m.PlacementType.Bottom;}}else if(M===m){if(this._$window.height()>this._$window.width()){if(M===T){this._oCalcedPos=sap.m.PlacementType.Top;}else if(M===k){this._oCalcedPos=sap.m.PlacementType.Bottom;}}else{if(m===j){this._oCalcedPos=sap.m.PlacementType.Left;}else if(m===R){this._oCalcedPos=sap.m.PlacementType.Right;}}}};c.width=function(e){if(sap.ui.Device.browser.msie){var w=window.getComputedStyle(e,null).getPropertyValue("width");return Math.ceil(parseFloat(w));}else{return q(e).width();}};c.outerWidth=function(e,i){var w=c.width(e),p=parseInt(q(e).css("padding-left"),10),d=parseInt(q(e).css("padding-right"),10),f=parseInt(q(e).css("border-left-width"),10),g=parseInt(q(e).css("border-right-width"),10);var o=w+p+d+f+g;if(i){var m=parseInt(q(e).css("margin-left"),10),M=parseInt(q(e).css("margin-right"),10);o=o+m+M;}return o;};c.prototype._setArrowPosition=function(){var p=c;var e=this.oPopup.getOpenState();if(!(e===sap.ui.core.OpenState.OPEN||e===sap.ui.core.OpenState.OPENING)){return;}var $=q(this._getOpenByDomRef()),d=this.$(),o=window.getComputedStyle(d[0]),f=window.parseFloat(o.borderLeftWidth,10),g=window.parseFloat(o.borderRightWidth,10),h=window.parseFloat(o.borderTopWidth,10),i=window.parseFloat(o.borderBottomWidth,10),s=this._oCalcedPos||this.getPlacement(),j=this.$("arrow"),A=j.outerHeight(true),k=d.offset(),O=this._getOffsetX(),m=this._getOffsetY(),w=p.outerWidth(d[0]),H=d.outerHeight(),n=this.$("cont"),r=n.children(".sapMPopoverScroll"),t=r.css("position")==="absolute",u=window.getComputedStyle(n[0]),v=window.parseFloat(u.marginLeft,10),x=window.parseFloat(u.marginRight,10),y=window.parseFloat(u.marginTop,10),z=window.parseFloat(u.marginBottom,10),D=d.children(".sapMPopoverHeader"),E=d.children(".sapMPopoverSubHeader"),F=d.children(".sapMPopoverFooter"),M,G,J,K,L={},N,Q=0,R=0,T=0;if(D.length>0){Q=D.outerHeight(true);}if(E.length>0){R=E.outerHeight(true);}if(F.length>0){T=F.outerHeight(true);}var W=this._$window.scrollLeft(),U=this._$window.scrollTop(),V=this._$window.width(),X=(p._bIOS7&&sap.ui.Device.orientation.landscape&&window.innerHeight)?window.innerHeight:this._$window.height(),Y=W+V,Z=U+X;var _=W+this._marginLeft,a1=this._marginRight,b1=U+this._marginTop,c1=this._marginBottom;var d1=sap.ui.getCore().getConfiguration().getRTL();var e1,f1,g1,h1;switch(s){case sap.m.PlacementType.Left:if(d1){_=$.offset().left+p.outerWidth($[0],false)+this._arrowOffset+O;}else{a1=Y-$.offset().left+this._arrowOffset-O;}break;case sap.m.PlacementType.Right:if(d1){a1=Y-$.offset().left+this._arrowOffset-O;}else{_=$.offset().left+p.outerWidth($[0],false)+this._arrowOffset+O;}break;case sap.m.PlacementType.Top:c1=Z-$.offset().top+this._arrowOffset-m;break;case sap.m.PlacementType.Bottom:b1=$.offset().top+$.outerHeight()+this._arrowOffset+m;break;}var i1=Y-k.left-w,j1=Z-k.top-H,k1=(Y-a1-_)<w,l1=(Z-b1-c1)<H,m1=k.left<_,n1=i1<a1,o1=k.top<b1,p1=j1<c1;if(k1){e1=_;f1=a1;}else{if(m1){e1=_;if(d1){f1="";}}else if(n1){f1=a1;e1="";}}if(l1){g1=b1;h1=c1;}else{if(o1){g1=b1;}else if(p1){h1=c1;g1="";}}d.css({top:g1,bottom:h1-U,left:e1,right:typeof f1==="number"?f1-W:f1});w=p.outerWidth(d[0]);H=d.outerHeight();G=Y-_-a1-f-g;if(t){G-=(v+x);}M=Z-b1-c1-Q-R-T-y-z-h-i;M=Math.max(M,0);L["max-width"]=G+"px";if(this.getContentHeight()||t||(n.height()>M)){L["height"]=Math.min(M,n.height())+"px";}else{L["height"]="";L["max-height"]=M+"px";}n.css(L);if(r.outerWidth(true)<=n.width()){r.css("display","block");}if(s===sap.m.PlacementType.Left||s===sap.m.PlacementType.Right){N=$.offset().top-d.offset().top-h+m+0.5*($.outerHeight(false)-j.outerHeight(false));N=Math.max(N,this._arrowOffsetThreshold);N=Math.min(N,H-this._arrowOffsetThreshold-j.outerHeight());j.css("top",N);}else if(s===sap.m.PlacementType.Top||s===sap.m.PlacementType.Bottom){if(d1){N=d.offset().left+p.outerWidth(d[0],false)-($.offset().left+p.outerWidth($[0],false))+g+O+0.5*(p.outerWidth($[0],false)-p.outerWidth(j[0],false));N=Math.max(N,this._arrowOffsetThreshold);N=Math.min(N,w-this._arrowOffsetThreshold-p.outerWidth(j[0],false));j.css("right",N);}else{N=$.offset().left-d.offset().left-f+O+0.5*(p.outerWidth($[0],false)-p.outerWidth(j[0],false));N=Math.max(N,this._arrowOffsetThreshold);N=Math.min(N,w-this._arrowOffsetThreshold-p.outerWidth(j[0],false));j.css("left",N);}}switch(s){case sap.m.PlacementType.Left:j.addClass("sapMPopoverArrRight");break;case sap.m.PlacementType.Right:j.addClass("sapMPopoverArrLeft");break;case sap.m.PlacementType.Top:j.addClass("sapMPopoverArrDown");break;case sap.m.PlacementType.Bottom:j.addClass("sapMPopoverArrUp");break;}J=j.position();K=F.position();var q1=this._getSingleNavContent(),r1=this._getSinglePageContent(),s1=0;if(q1||r1){r1=r1||q1.getCurrentPage();if(r1){s1=r1._getAnyHeader().$().outerHeight();}}if(s===sap.m.PlacementType.Left||s===sap.m.PlacementType.Right){if((J.top+A)<(Q+R)||((J.top+A)<s1)){j.addClass("sapMPopoverHeaderAlignArr");}else if((J.top<(Q+R))||(J.top<s1)||(F.length&&((J.top+A)>K.top)&&(J.top<K.top))){j.addClass("sapMPopoverCrossArr");}else if(F.length&&(J.top>K.top)){j.addClass("sapMPopoverFooterAlignArr");}}d.css("overflow","visible");};c.prototype._isPopupElement=function(d){var p=this._getOpenByDomRef();return!!(q(d).closest(sap.ui.getCore().getStaticAreaRef()).length)||!!(q(d).closest(p).length);};c.prototype._getAnyHeader=function(){if(this.getCustomHeader()){return this.getCustomHeader();}else{if(this.getShowHeader()){this._createInternalHeader();return this._internalHeader;}}};c.prototype._createInternalHeader=function(){if(!this._internalHeader){var t=this;this._internalHeader=new B(this.getId()+"-intHeader");this.setAggregation("_internalHeader",this._internalHeader);this._internalHeader.addEventDelegate({onAfterRendering:function(){t._restoreFocus();}});return true;}else{return false;}};c.prototype._openAnimation=function(r,R,o){var t=this;if(c._bIE9||(sap.ui.Device.os.android&&sap.ui.Device.os.version<2.4)){o();}else{var O=false,T=function(){if(O||!t.oPopup||t.oPopup.getOpenState()!==sap.ui.core.OpenState.OPENING){return;}r.unbind("webkitTransitionEnd transitionend");o();O=true;};setTimeout(function(){r.addClass("sapMPopoverTransparent");r.css("display","block");setTimeout(function(){r.bind("webkitTransitionEnd transitionend",T);r.removeClass("sapMPopoverTransparent");setTimeout(function(){T();},300);},sap.ui.Device.browser.firefox?50:0);},0);}};c.prototype._closeAnimation=function(r,R,f){if(c._bIE9||(sap.ui.Device.os.android&&sap.ui.Device.os.version<2.4)){f();}else{var d=false,t=function(){if(d){return;}r.unbind("webkitTransitionEnd transitionend");setTimeout(function(){f();d=true;r.removeClass("sapMPopoverTransparent");},0);};r.bind("webkitTransitionEnd transitionend",t).addClass("sapMPopoverTransparent");setTimeout(function(){t();},300);}};c.prototype._getInitialFocusId=function(){return this.getInitialFocus()||this._getFirstVisibleButtonId()||this._getFirstFocusableContentElementId()||this.getId();};c.prototype._getFirstVisibleButtonId=function(){var o=this.getBeginButton(),e=this.getEndButton(),s="";if(o&&o.getVisible()){s=o.getId();}else if(e&&e.getVisible()){s=e.getId();}return s;};c.prototype._getFirstFocusableContentElementId=function(){var r="";var $=this.$("cont");var f=$.firstFocusableDomRef();if(f){r=f.id;}return r;};c.prototype._restoreFocus=function(){if(this.isOpen()){var f=this._getInitialFocusId(),o=sap.ui.getCore().byId(f);q.sap.focus(o?o.getFocusDomRef():q.sap.domById(f));}};c.prototype._registerContentResizeHandler=function(){if(!this._sResizeListenerId){this._sResizeListenerId=sap.ui.core.ResizeHandler.register(this.getDomRef("scroll"),this._fnOrientationChange);}};c.prototype._deregisterContentResizeHandler=function(){if(this._sResizeListenerId){sap.ui.core.ResizeHandler.deregister(this._sResizeListenerId);this._sResizeListenerId=null;}};c.prototype._storeScrollPosition=function(){var $=this.$("cont");if($.length>0){this._oScrollPosDesktop={x:$.scrollLeft(),y:$.scrollTop()};}};c.prototype._restoreScrollPosition=function(){if(!this._oScrollPosDesktop){return;}var $=this.$("cont");if($.length>0){$.scrollLeft(this._oScrollPosDesktop.x).scrollTop(this._oScrollPosDesktop.y);this._oScrollPosDesktop=null;}};c.prototype._repositionOffset=function(){var e=this.oPopup.getOpenState(),L,p;if(!(e===sap.ui.core.OpenState.OPEN)){return this;}L=this.oPopup._oLastPosition;p=q.inArray(this.getPlacement(),this._placements);if(p===-1){return this;}if(p<4){L.offset=this._calcOffset(this._offsets[p]);this.oPopup._applyPosition(L);}else{this._calcPlacement();}return this;};c.prototype._getOpenByDomRef=function(){if(!this._oOpenBy){return null;}if(this._oOpenBy instanceof sap.ui.core.Element){return(this._oOpenBy.getPopupAnchorDomRef&&this._oOpenBy.getPopupAnchorDomRef())||this._oOpenBy.getFocusDomRef();}else{return this._oOpenBy;}};c.prototype.setPlacement=function(p){this.setProperty("placement",p,true);var i=q.inArray(p,this._placements);if(i<=3){this._oCalcedPos=p;}return this;};c.prototype.setTitle=function(t){if(t){this.setProperty("title",t,true);if(this._headerTitle){this._headerTitle.setText(t);}else{this._headerTitle=new sap.m.Title(this.getId()+"-title",{text:this.getTitle(),level:"H1"});this._createInternalHeader();this._internalHeader.addContentMiddle(this._headerTitle);}}return this;};c.prototype.setBeginButton=function(o){var O=this.getBeginButton();if(O===o){return this;}this._createInternalHeader();this._beginButton=o;if(o){o.setType(sap.m.ButtonType.Transparent);if(O){this._internalHeader.removeAggregation("contentLeft",O,true);}this._internalHeader.addAggregation("contentLeft",o);}else{this._internalHeader.removeContentLeft(O);}return this;};c.prototype.setEndButton=function(o){var O=this.getEndButton();if(O===o){return this;}this._createInternalHeader();this._endButton=o;if(o){o.setType(sap.m.ButtonType.Transparent);if(O){this._internalHeader.removeAggregation("contentRight",O,true);}this._internalHeader.insertAggregation("contentRight",o,1,true);this._internalHeader.invalidate();}else{this._internalHeader.removeContentRight(O);}return this;};c.prototype.setLeftButton=function(v){if(!(v instanceof a)){v=sap.ui.getCore().byId(v);}this.setBeginButton(v);return this.setAssociation("leftButton",v);};c.prototype.setRightButton=function(v){if(!(v instanceof a)){v=sap.ui.getCore().byId(v);}this.setEndButton(v);return this.setAssociation("rightButton",v);};c.prototype.setShowHeader=function(v){if(v===this.getShowHeader()||this.getCustomHeader()){return this;}if(v){if(this._internalHeader){this._internalHeader.$().show();}}else{if(this._internalHeader){this._internalHeader.$().hide();}}this.setProperty("showHeader",v,true);return this;};c.prototype.setModal=function(m,M){if(m===this.getModal()){return this;}this.oPopup.setModal(m,q.trim("sapMPopoverBLayer "+M||""));this.setProperty("modal",m,true);return this;};c.prototype.setOffsetX=function(v){this.setProperty("offsetX",v,true);return this._repositionOffset();};c.prototype.setOffsetY=function(v){this.setProperty("offsetY",v,true);return this._repositionOffset();};c.prototype.setEnableScrolling=function(v){this.setHorizontalScrolling(v);this.setVerticalScrolling(v);var o=this.getEnableScrolling();if(o===v){return this;}this.setProperty("enableScrolling",v,true);return this;};c.prototype.setVerticalScrolling=function(v){this._bVScrollingEnabled=v;var o=this.getVerticalScrolling();if(o===v){return this;}this.$().toggleClass("sapMPopoverVerScrollDisabled",!v);this.setProperty("verticalScrolling",v,true);if(this._oScroller){this._oScroller.setVertical(v);}return this;};c.prototype.setHorizontalScrolling=function(v){this._bHScrollingEnabled=v;var o=this.getHorizontalScrolling();if(o===v){return this;}this.$().toggleClass("sapMPopoverHorScrollDisabled",!v);this.setProperty("horizontalScrolling",v,true);if(this._oScroller){this._oScroller.setHorizontal(v);}return this;};c.prototype.getScrollDelegate=function(){return this._oScroller;};c.prototype.setAggregation=function(A,o,s){if(A==="beginButton"||A==="endButton"){var f="set"+A.charAt(0).toUpperCase()+A.slice(1);return this[f](o);}else{return C.prototype.setAggregation.apply(this,arguments);}};c.prototype.getAggregation=function(A,d){if(A==="beginButton"||A==="endButton"){var s=this["_"+A];return s||d||null;}else{return C.prototype.getAggregation.apply(this,arguments);}};c.prototype.destroyAggregation=function(A,s){if(A==="beginButton"||A==="endButton"){var d=this["_"+A];if(d){d.destroy();this["_"+A]=null;}return this;}else{return C.prototype.destroyAggregation.apply(this,arguments);}};c.prototype.invalidate=function(o){if(this.isOpen()){C.prototype.invalidate.apply(this,arguments);}return this;};c.prototype.addAggregation=function(A,o,s){if(A==="content"){this._bContentChanged=true;}C.prototype.addAggregation.apply(this,arguments);};return c;},true);
