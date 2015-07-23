/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./library','sap/ui/core/Control','sap/ui/core/EnabledPropagator','sap/ui/core/delegate/ItemNavigation'],function(q,l,C,E,I){"use strict";var a=C.extend("sap.m.IconTabHeader",{metadata:{library:"sap.m",properties:{showSelection:{type:"boolean",group:"Misc",defaultValue:true,deprecated:true},selectedKey:{type:"string",group:"Data",defaultValue:null},visible:{type:"boolean",group:"Behavior",defaultValue:true}},aggregations:{items:{type:"sap.m.IconTab",multiple:true,singularName:"item"}},events:{select:{parameters:{item:{type:"sap.m.IconTabFilter"},key:{type:"string"}}}}}});E.apply(a.prototype,[true]);a.SCROLL_STEP=264;a.prototype._bDoScroll=!sap.ui.Device.system.desktop||(sap.ui.Device.os.windows&&sap.ui.Device.os.version===8);a.prototype.init=function(){this._bPreviousScrollForward=false;this._bPreviousScrollBack=false;this._iCurrentScrollLeft=0;this._bRtl=sap.ui.getCore().getConfiguration().getRTL();this.startScrollX=0;this.startTouchX=0;this._scrollable=null;this._aTabKeys=[];this._oItemNavigation=new I().setCycling(false);this._oItemNavigation.attachEvent(I.Events.FocusLeave,this._onItemNavigationFocusLeave,this);this._oItemNavigation.attachEvent(I.Events.AfterFocus,this._onItemNavigationAfterFocus,this);this.addDelegate(this._oItemNavigation);if(this._bDoScroll){q.sap.require("sap.ui.core.delegate.ScrollEnablement");this._oScroller=new sap.ui.core.delegate.ScrollEnablement(this,this.getId()+"-head",{horizontal:true,vertical:false,nonTouchScrolling:true});}};a.prototype._onItemNavigationFocusLeave=function(){if(!this.oSelectedItem){return;}var b=this.getItems();var c=-1;var o;for(var i=0;i<b.length;i++){o=b[i];if(o instanceof sap.m.IconTabFilter==false){continue;}c++;if(this.oSelectedItem==o){break;}}this._oItemNavigation.setFocusedIndex(c);};a.prototype._onItemNavigationAfterFocus=function(e){var h=this.getDomRef("head"),i=e.getParameter("index"),$=e.getParameter('event');if($.keyCode===undefined){return;}this._iCurrentScrollLeft=h.scrollLeft;this._checkOverflow(h,this.$());if(i!==null&&i!==undefined){this._scrollIntoView(this.getTabFilters()[i],0);}};a.prototype.getTabFilters=function(){var i=this.getItems();var t=[];i.forEach(function(o){if(o instanceof sap.m.IconTabFilter){t.push(o);}});return t;};a.prototype.exit=function(){if(this._oArrowLeft){this._oArrowLeft.destroy();}if(this._oArrowRight){this._oArrowRight.destroy();}if(this._oItemNavigation){this.removeDelegate(this._oItemNavigation);this._oItemNavigation.destroy();delete this._oItemNavigation;}if(this._oScroller){this._oScroller.destroy();this._oScroller=null;}if(this._sResizeListenerId){sap.ui.core.ResizeHandler.deregister(this._sResizeListenerId);this._sResizeListenerId=null;}if(this._aTabKeys){this._aTabKeys=null;}};a.prototype.onBeforeRendering=function(){var b=this.getItems(),s=this.getSelectedKey(),i=0;if(this._sResizeListenerId){sap.ui.core.ResizeHandler.deregister(this._sResizeListenerId);this._sResizeListenerId=null;}if(b.length>0){if(!this.oSelectedItem||s&&s!==this.oSelectedItem._getNonEmptyKey()){if(s){for(;i<b.length;i++){if(!(b[i]instanceof sap.m.IconTabSeparator)&&b[i]._getNonEmptyKey()===s){this.oSelectedItem=b[i];break;}}}if(!this.oSelectedItem&&this.getParent()instanceof sap.m.IconTabBar&&this.getParent().getExpanded()){for(i=0;i<b.length;i++){if(!(b[i]instanceof sap.m.IconTabSeparator)&&b[i].getVisible()){this.oSelectedItem=b[i];break;}}}}if(this.oSelectedItem&&!this.oSelectedItem.getVisible()&&this.getParent()instanceof sap.m.IconTabBar&&this.getParent().getExpanded()){for(i=0;i<b.length;i++){if(!(b[i]instanceof sap.m.IconTabSeparator)&&b[i].getVisible()){this.oSelectedItem=b[i];break;}}}if(this.oSelectedItem){this.setProperty("selectedKey",this.oSelectedItem._getNonEmptyKey(),true);}}if(this._sResizeListenerNoFlexboxSupportId){sap.ui.core.ResizeHandler.deregister(this._sResizeListenerNoFlexboxSupportId);this._sResizeListenerNoFlexboxSupportId=null;}};a.prototype.setSelectedKey=function(k){var b=this.getItems(),i=0;if(this.$().length){for(;i<b.length;i++){if(!(b[i]instanceof sap.m.IconTabSeparator)&&b[i]._getNonEmptyKey()===k){this.setSelectedItem(b[i],true);break;}}}this.setProperty("selectedKey",k,true);return this;};a.prototype.setSelectedItem=function(i,A){if(!i||!i.getEnabled()){return this;}var b=false;if(i.getContent().length===0&&this.oSelectedItem&&this.oSelectedItem.getContent().length===0){b=true;}if(this.oSelectedItem&&this.oSelectedItem.getVisible()&&(this.getParent()instanceof sap.m.IconTabBar&&this.getParent().getExpandable()||this.oSelectedItem!==i)){this.oSelectedItem.$().removeClass("sapMITBSelected").removeAttr('aria-selected').removeAttr('aria-expanded');}if(i.getVisible()){if(this.oSelectedItem===i){if(this.getParent()instanceof sap.m.IconTabBar&&this.getParent().getExpandable()){this.getParent()._toggleExpandCollapse();}}else{if(this.getParent()instanceof sap.m.IconTabBar){this.getParent().$("content").attr('aria-labelledby',i.sId);}this.oSelectedItem=i;this.setProperty("selectedKey",this.oSelectedItem._getNonEmptyKey(),true);if(this.getParent()instanceof sap.m.IconTabBar&&(this.getParent().getExpandable()||this.getParent().getExpanded())){this.oSelectedItem.$().addClass("sapMITBSelected").attr({'aria-selected':true});var s=this.oSelectedItem.getContent();if(s.length>0){this.getParent()._rerenderContent(s);}else{if(!b){this.getParent()._rerenderContent(this.getParent().getContent());}}if(this.getParent().getExpandable()&&!this.getParent().getExpanded()){this.getParent()._toggleExpandCollapse(true);}}}if(this.oSelectedItem.$().length>0){this._scrollIntoView(i,500);}else{this._scrollAfterRendering=true;}}var S=this.oSelectedItem._getNonEmptyKey();this.oSelectedItem=i;this.setProperty("selectedKey",S,true);if(this.getParent()instanceof sap.m.IconTabBar){this.getParent().setProperty("selectedKey",S,true);}if(!A){if(this.getParent()instanceof sap.m.IconTabBar){this.getParent().fireSelect({selectedItem:this.oSelectedItem,selectedKey:S,item:this.oSelectedItem,key:S});}else{this.fireSelect({selectedItem:this.oSelectedItem,selectedKey:S,item:this.oSelectedItem,key:S});}}return this;};a.prototype._getFirstVisibleItem=function(b){for(var i=0;i<b.length;i++){if(b[i].getVisible()){return b[i];}}return null;};a.prototype.onAfterRendering=function(){var h=this.getDomRef("head"),$=this.$();if(this._oScroller){this._oScroller.setIconTabBar(this,q.proxy(this._afterIscroll,this),q.proxy(this._scrollPreparation,this));}if(this.oSelectedItem&&this.getParent()instanceof sap.m.IconTabBar&&this.getParent().getExpanded()){this.oSelectedItem.$().addClass("sapMITBSelected").attr({'aria-selected':true});}if(this._bDoScroll){q.sap.delayedCall(350,this,"_checkOverflow",[h,$]);}else{this._checkOverflow(h,$);}if(this._iCurrentScrollLeft!==0&&!this._bDoScroll){h.scrollLeft=this._iCurrentScrollLeft;}if(this.oSelectedItem){if(!this._bDoThisOnlyOnce){q.sap.delayedCall(1000,this,"_scrollIntoView",[this.oSelectedItem,0]);this._bDoThisOnlyOnce=true;}else if(this._scrollAfterRendering){this._scrollIntoView(this.oSelectedItem,500);this._scrollAfterRendering=false;}}var i=this.getItems();var t=[];var s=-1;var b=this;i.forEach(function(o){if(o instanceof sap.m.IconTabFilter){var c=b.getFocusDomRef(o);q(c).attr("tabindex","-1");t.push(c);if(o===b.oSelectedItem){s=t.indexOf(o);}}});if(!this._oItemNavigation){this._oItemNavigation=new I();this._oItemNavigation.attachEvent(I.Events.FocusLeave,this._onItemNavigationFocusLeave,this);this._oItemNavigation.attachEvent(I.Events.AfterFocus,this._onItemNavigationAfterFocus,this);this.addDelegate(this._oItemNavigation);}this._oItemNavigation.setRootDomRef(h);this._oItemNavigation.setItemDomRefs(t);this._oItemNavigation.setSelectedIndex(s);this._sResizeListenerId=sap.ui.core.ResizeHandler.register(this.getDomRef(),q.proxy(this._fnResize,this));if(!q.support.newFlexBoxLayout&&this.getParent()instanceof sap.m.IconTabBar&&this.getParent().getStretchContentHeight()){this._sResizeListenerNoFlexboxSupportId=sap.ui.core.ResizeHandler.register(this.getParent().getDomRef(),q.proxy(this._fnResizeNoFlexboxSupport,this));this._fnResizeNoFlexboxSupport();}};a.prototype.destroyItems=function(){this.oSelectedItem=null;this._aTabKeys=[];this.destroyAggregation("items");};a.prototype.addItem=function(i){if(!(i instanceof sap.m.IconTabSeparator)){var k=i.getKey();if(this._aTabKeys.indexOf(k)!==-1){q.sap.log.warning("sap.m.IconTabHeader: duplicate key '"+k+"' inside the IconTabFilter. Please use unique keys.");}this._aTabKeys.push(k);}this.addAggregation("items",i);};a.prototype.insertItem=function(i,b){if(!(i instanceof sap.m.IconTabSeparator)){var k=i.getKey();if(this._aTabKeys.indexOf(k)!==-1){q.sap.log.warning("sap.m.IconTabHeader: duplicate key '"+k+"' inside the IconTabFilter. Please use unique keys.");}this._aTabKeys.push(k);}this.insertAggregation("items",i,b);};a.prototype.removeAllItems=function(){this._aTabKeys=[];this.removeAllAggregation("items");};a.prototype.removeItem=function(i){i=this.removeAggregation("items",i);if(i&&!(i instanceof sap.m.IconTabSeparator)){var k=i.getKey();this._aTabKeys.splice(this._aTabKeys.indexOf(k),1);}return i;};a.prototype._checkTextOnly=function(b){if(b.length>0){for(var i=0;i<b.length;i++){if(!(b[i]instanceof sap.m.IconTabSeparator)){if(b[i].getIcon()){this._bTextOnly=false;return false;}}}}this._bTextOnly=true;return true;};a.prototype._checkNoText=function(b){if(b.length>0){for(var i=0;i<b.length;i++){if(!(b[i]instanceof sap.m.IconTabSeparator)){if(b[i].getText().length>0){return false;}}}}return true;};a.prototype._checkScrolling=function(h,$){var s=false;if(this._bDoScroll){var d=this.getDomRef("scrollContainer");var b=this.getDomRef("head");if(b&&d){if(b.offsetWidth>d.offsetWidth){s=true;}}}else{if(h){if(h.scrollWidth>h.clientWidth){s=true;}}}if(this._scrollable!==s){$.toggleClass("sapMITBScrollable",s);$.toggleClass("sapMITBNotScrollable",!s);this._scrollable=s;}return s;};a.prototype._getScrollingArrow=function(n){var s;if(sap.ui.Device.system.desktop){s="sap-icon://navigation-"+n+"-arrow";}else{s="sap-icon://slim-arrow-"+n;}var p={src:s};var S=this._bTextOnly?"TextOnly":"";var L="sapMITBArrowScrollLeft"+S;var r="sapMITBArrowScrollRight"+S;var c=["sapMITBArrowScroll",L];var b=["sapMITBArrowScroll",r];if(n==="left"){if(!this._oArrowLeft){this._oArrowLeft=sap.m.ImageHelper.getImageControl(this.getId()+"-arrowScrollLeft",this._oArrowLeft,this,p,c);}return this._oArrowLeft;}if(n==="right"){if(!this._oArrowRight){this._oArrowRight=sap.m.ImageHelper.getImageControl(this.getId()+"-arrowScrollRight",this._oArrowRight,this,p,b);}return this._oArrowRight;}};a.prototype._checkOverflow=function(b,$){if(this._checkScrolling(b,$)&&b){var s=false;var S=false;if(this._bDoScroll){var d=this.getDomRef("scrollContainer");var c=this.getDomRef("head");if(this._oScroller.getScrollLeft()>0){s=true;}if((this._oScroller.getScrollLeft()+d.offsetWidth)<c.offsetWidth){S=true;}}else{var i=this._iCurrentScrollLeft;var r=b.scrollWidth;var e=b.clientWidth;if(Math.abs(r-e)==1){r=e;}if(!this._bRtl){if(i>0){s=true;}if((r>e)&&(i+e<r)){S=true;}}else{var L=q(b);if(L.scrollLeftRTL()>0){S=true;}if(L.scrollRightRTL()>0){s=true;}}}if((S!=this._bPreviousScrollForward)||(s!=this._bPreviousScrollBack)){this._bPreviousScrollForward=S;this._bPreviousScrollBack=s;$.toggleClass("sapMITBScrollBack",s);$.toggleClass("sapMITBNoScrollBack",!s);$.toggleClass("sapMITBScrollForward",S);$.toggleClass("sapMITBNoScrollForward",!S);}}else{this._bPreviousScrollForward=false;this._bPreviousScrollBack=false;}};a.prototype._handleActivation=function(e){var t=e.target.id,c=e.srcControl,s;var $=q.sap.byId(t);if(q.inArray(this.$("content")[0],$.parents())>-1){}else{if(t){var i=this.getId();e.preventDefault();if(t==i+"-arrowScrollLeft"&&sap.ui.Device.system.desktop){if(sap.ui.Device.os.windows&&sap.ui.Device.os.version===8){var S=this._oScroller.getScrollLeft()-a.SCROLL_STEP;if(S<0){S=0;}this._scrollPreparation();q.sap.delayedCall(0,this._oScroller,"scrollTo",[S,0,500]);q.sap.delayedCall(500,this,"_afterIscroll");}else{this._scroll(-a.SCROLL_STEP,500);}}else if(t==i+"-arrowScrollRight"&&sap.ui.Device.system.desktop){if(sap.ui.Device.os.windows&&sap.ui.Device.os.version===8){var S=this._oScroller.getScrollLeft()+a.SCROLL_STEP;var b=this.$("scrollContainer").width();var h=this.$("head").width();if(S>(h-b)){S=h-b;}this._scrollPreparation();q.sap.delayedCall(0,this._oScroller,"scrollTo",[S,0,500]);q.sap.delayedCall(500,this,"_afterIscroll");}else{this._scroll(a.SCROLL_STEP,500);}}else{if(c instanceof sap.ui.core.Icon||c instanceof sap.m.Image){s=e.srcControl.getId().replace(/-icon$/,"");c=sap.ui.getCore().byId(s);if(c.getMetadata().isInstanceOf("sap.m.IconTab")&&!(c instanceof sap.m.IconTabSeparator)){this.setSelectedItem(c);}}else if(c.getMetadata().isInstanceOf("sap.m.IconTab")&&!(c instanceof sap.m.IconTabSeparator)){this.setSelectedItem(c);}}}else{if(c.getMetadata().isInstanceOf("sap.m.IconTab")&&!(c instanceof sap.m.IconTabSeparator)){this.setSelectedItem(c);}}}};a.prototype._scrollIntoView=function(i,d){var $=i.$(),h,s,n,c;if($.length>0){var b=this.$('head');var H=b.innerWidth()-b.width();var e=$.outerWidth(true);var f=$.position().left-H/2;if(this._bDoScroll){s=this._oScroller.getScrollLeft();c=this.$("scrollContainer").width();n=0;if(f-s<0||f-s>c-e){if(f-s<0){n+=f;}else{n+=f+e-c;}this._scrollPreparation();this._iCurrentScrollLeft=n;q.sap.delayedCall(0,this._oScroller,"scrollTo",[n,0,d]);q.sap.delayedCall(d,this,"_afterIscroll");}}else{h=this.getDomRef("head");s=h.scrollLeft;c=$.parent().width();n=s;if(f<0||f>c-e){if(f<0){n+=f;}else{n+=f+e-c;}this._scrollPreparation();this._iCurrentScrollLeft=n;q(h).stop(true,true).animate({scrollLeft:n},d,q.proxy(this._adjustAndShowArrow,this));}}}return this;};a.prototype._scroll=function(d,D){this._scrollPreparation();var o=this.getDomRef("head");var s=o.scrollLeft;if(!!!sap.ui.Device.browser.internet_explorer&&this._bRtl){d=-d;}var S=s+d;q(o).stop(true,true).animate({scrollLeft:S},D,q.proxy(this._adjustAndShowArrow,this));this._iCurrentScrollLeft=S;};a.prototype._adjustAndShowArrow=function(){this._$bar&&this._$bar.toggleClass("sapMITBScrolling",false);this._$bar=null;if(sap.ui.Device.system.desktop){this._checkOverflow(this.getDomRef("head"),this.$());}};a.prototype._scrollPreparation=function(){if(!this._$bar){this._$bar=this.$().toggleClass("sapMITBScrolling",true);}};a.prototype._afterIscroll=function(){var h=this.getDomRef("head");this._checkOverflow(h,this.$());this._adjustAndShowArrow();};a.prototype._fnResize=function(){var h=this.getDomRef("head");this._checkOverflow(h,this.$());};sap.m.IconTabHeader.prototype._fnResizeNoFlexboxSupport=function(){var $=this.getParent().$("containerContent"),d=$.outerHeight(true)-$.height();$.height(this.getParent().$().height()-$.position().top-d);};sap.m.IconTabHeader.prototype.onExit=function(){if(this._sResizeListenerNoFlexboxSupportId){sap.ui.core.ResizeHandler.deregister(this._sResizeListenerNoFlexboxSupportId);this._sResizeListenerNoFlexboxSupportId=null;}};a.prototype.getFocusDomRef=function(f){var t=f||this.oSelectedItem;if(!t){return null;}return t.getDomRef();};a.prototype.applyFocusInfo=function(f){if(f.focusDomRef){q(f.focusDomRef).focus();}};a.prototype.ontouchstart=function(e){var t=e.targetTouches[0];this._iActiveTouch=t.identifier;this._iTouchStartPageX=t.pageX;this._iTouchDragX=0;if(sap.ui.Device.browser.internet_explorer){var $=q(e.target);if($.hasClass('sapMITBFilterIcon')||$.hasClass('sapMITBCount')||$.hasClass('sapMITBText')||$.hasClass('sapMITBTab')||$.hasClass('sapMITBContentArrow')||$.hasClass('sapMITBSep')||$.hasClass('sapMITBSepIcon')){e.preventDefault();}}};a.prototype.ontouchmove=function(e){var t=sap.m.touch.find(e.changedTouches,this._iActiveTouch);if(!t||t.pageX===this._iTouchStartPageX){return;}this._iTouchDragX+=Math.abs(this._iTouchStartPageX-t.pageX);this._iTouchStartPageX=t.pageX;};a.prototype.ontouchend=function(e){if(this._scrollable&&this._iTouchDragX>(sap.ui.Device.system.desktop?5:15)){return;}this._handleActivation(e);};a.prototype.ontouchcancel=a.prototype.ontouchend;a.prototype.onsapselect=function(e){this._handleActivation(e);};return a;},true);
