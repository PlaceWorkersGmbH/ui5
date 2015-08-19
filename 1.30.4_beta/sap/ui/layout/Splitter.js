/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/Control','./library'],function(q,C,l){"use strict";var S=C.extend("sap.ui.layout.Splitter",{metadata:{library:"sap.ui.layout",properties:{orientation:{type:"sap.ui.core.Orientation",group:"Behavior",defaultValue:sap.ui.core.Orientation.Horizontal},width:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:'100%'},height:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:'100%'}},defaultAggregation:"contentAreas",aggregations:{contentAreas:{type:"sap.ui.core.Control",multiple:true,singularName:"contentArea"}},events:{resize:{parameters:{id:{type:"string"},oldSizes:{type:"int[]"},newSizes:{type:"int[]"}}}}}});var r=sap.ui.getCore().getLibraryResourceBundle("sap.ui.layout");S.prototype.init=function(){this._needsInvalidation=false;this._liveResize=true;this._keyboardEnabled=true;this._bHorizontal=true;this._calculatedSizes=[];this._move={};this._resizeTimeout=null;this._resizeCallback=this._delayedResize.bind(this);this._resizeHandlerId=null;this._autoResize=true;this.enableAutoResize();this._boundBarMoveEnd=this._onBarMoveEnd.bind(this);this._boundBarMove=this._onBarMove.bind(this);this._switchOrientation();this._bRtl=sap.ui.getCore().getConfiguration().getRTL();this._keyListeners={increase:this._onKeyboardResize.bind(this,"inc"),decrease:this._onKeyboardResize.bind(this,"dec"),increaseMore:this._onKeyboardResize.bind(this,"incMore"),decreaseMore:this._onKeyboardResize.bind(this,"decMore"),max:this._onKeyboardResize.bind(this,"max"),min:this._onKeyboardResize.bind(this,"min")};this._enableKeyboardListeners();};S.prototype.exit=function(){this.disableAutoResize();delete this._resizeCallback;delete this._boundBarMoveEnd;delete this._boundBarMove;delete this._$SplitterOverlay;delete this._$SplitterOverlayBar;};S.prototype.triggerResize=function(f){if(f){this._resize();}else{this._delayedResize();}};S.prototype.getCalculatedSizes=function(){return this._calculatedSizes;};S.prototype.enableAutoResize=function(t){if(t&&!this._autoResize){return;}this._autoResize=true;var c=this;sap.ui.getCore().attachInit(function(){c._resizeHandlerId=sap.ui.core.ResizeHandler.register(c,c._resizeCallback);});this._delayedResize();};S.prototype.disableAutoResize=function(t){sap.ui.core.ResizeHandler.deregister(this._resizeHandlerId);if(!t){this._autoResize=false;}};S.prototype.enableLiveResize=function(){this._liveResize=true;this.$().toggleClass("sapUiLoSplitterAnimated",false);};S.prototype.disableLiveResize=function(){this._liveResize=false;this.$().toggleClass("sapUiLoSplitterAnimated",true);};S.prototype.enableKeyboardSupport=function(){var B=this.$().find(".sapUiLoSplitterBar");B.attr("tabindex","0");this._enableKeyboardListeners();};S.prototype.disableKeyboardSupport=function(){var B=this.$().find(".sapUiLoSplitterBar");B.attr("tabindex","-1");this._disableKeyboardListeners();};S.prototype.onBeforeRendering=function(){this._switchOrientation();};S.prototype.onAfterRendering=function(){this._$SplitterOverlay=this.$("overlay");this._$SplitterOverlayBar=this.$("overlayBar");this._$SplitterOverlay.detach();this._resize();};S.prototype.onLayoutDataChange=function(){this._delayedResize();};S.prototype.ontouchstart=function(j){if(this._ignoreTouch){return;}var i=this.getId();if(!j.target.id||j.target.id.indexOf(i+"-splitbar")!=0){return;}if(!j.changedTouches||!j.changedTouches[0]){return;}this._ignoreMouse=true;this._onBarMoveStart(j.changedTouches[0],true);};S.prototype.onmousedown=function(j){if(this._ignoreMouse){return;}var i=this.getId();if(!j.target.id||j.target.id.indexOf(i+"-splitbar")!=0){return;}this._ignoreTouch=true;this._onBarMoveStart(j);};S.prototype._onBarMoveStart=function(j,t){var I=this.getId();this.disableAutoResize(true);var p=j[this._moveCord];var B=parseInt(j.target.id.substr((I+"-splitbar-").length),10);var $=q(j.target);var c=this.getCalculatedSizes();var d=this._bHorizontal?$.innerWidth():$.innerHeight();var e=this.getContentAreas();var L=e[B].getLayoutData();var o=e[B+1].getLayoutData();if(!L.getResizable()||!o.getResizable()){a(t);return;}var R=0-d;for(var i=0;i<=B;++i){R+=c[i]+d;}this._move={start:p,relStart:R,barNum:B,bar:q(j.target),c1Size:c[B],c1MinSize:L?parseInt(L.getMinSize(),10):0,c2Size:c[B+1],c2MinSize:o?parseInt(o.getMinSize(),10):0};if(t){document.addEventListener("touchend",this._boundBarMoveEnd);document.addEventListener("touchmove",this._boundBarMove);}else{document.addEventListener("mouseup",this._boundBarMoveEnd);document.addEventListener("mousemove",this._boundBarMove);}this._$SplitterOverlay.css("display","block");this._$SplitterOverlay.appendTo(this.getDomRef());this._$SplitterOverlayBar.css(this._sizeDirNot,"");this._move["bar"].css("visibility","hidden");this._onBarMove(j);};S.prototype._onBarMove=function(j){if(j.preventDefault){j.preventDefault();}var e=j;if(j.changedTouches&&j.changedTouches[0]){e=j.changedTouches[0];}var p=e[this._moveCord];var d=(p-this._move.start);d=this._bRtl?-d:d;var c=this._move.c1Size+d;var f=this._move.c2Size-d;var i=(c>=0&&f>=0&&c>=this._move.c1MinSize&&f>=this._move.c2MinSize);if(i){this._$SplitterOverlayBar.css(this._sizeDir,this._move.relStart+d);if(this._liveResize){var m=(this._move["start"]-e[this._moveCord]);this._resizeContents(this._move["barNum"],this._bRtl?m:-m,false);}}};S.prototype._onBarMoveEnd=function(j){this._ignoreMouse=false;this._ignoreTouch=false;var e=j;if(j.changedTouches&&j.changedTouches[0]){e=j.changedTouches[0];}var p=e[this._moveCord];var m=this._move["start"]-p;this._resizeContents(this._move["barNum"],this._bRtl?m:-m,true);this._move["bar"].css("visibility","");this._$SplitterOverlay.css("display","");this._$SplitterOverlay.detach();document.removeEventListener("mouseup",this._boundBarMoveEnd);document.removeEventListener("mousemove",this._boundBarMove);document.removeEventListener("touchend",this._boundBarMoveEnd);document.removeEventListener("touchmove",this._boundBarMove);this.enableAutoResize(true);q.sap.focus(this._move.bar);};S.prototype._resizeContents=function(L,p,f){if(isNaN(p)){q.sap.log.warning("Splitter: Received invalid resizing values - resize aborted.");return;}var c=this.getContentAreas();var o=c[L].getLayoutData();var d=c[L+1].getLayoutData();var s=o.getSize();var e=d.getSize();var $=this.$("content-"+L);var g=this.$("content-"+(L+1));var n=this._move.c1Size+p;var N=this._move.c2Size-p;var m=parseInt(o.getMinSize(),10);var M=parseInt(d.getMinSize(),10);var D;if(n<m){D=m-n;p+=D;n=m;N-=D;}else if(N<M){D=M-N;p-=D;N=M;n-=D;}if(f){if(s==="auto"&&e!=="auto"){d.setSize(N+"px");}else if(s!=="auto"&&e==="auto"){o.setSize(n+"px");}else{o.setSize(n+"px");d.setSize(N+"px");}}else{$.css(this._sizeType,n+"px");g.css(this._sizeType,N+"px");}};S.prototype._delayedResize=function(d){if(d===undefined){d=0;}if(this.getDomRef()){q.sap.clearDelayedCall(this._resizeTimeout);q.sap.delayedCall(d,this,this._resize,[]);}};S.prototype._resizeBars=function(c){var i,B;var $=this.$();for(i=0;i<c.length-1;++i){B=this.$("splitbar-"+i);B.css(this._sizeTypeNot,"");}for(i=0;i<c.length-1;++i){B=this.$("splitbar-"+i);var s=this._bHorizontal?$.height():$.width();B.css(this._sizeType,"");B.css(this._sizeTypeNot,s+"px");}};S.prototype._resize=function(){var i=0,B;var c=this.getContentAreas();this._resizeBars(c);var o=this.getCalculatedSizes();this._recalculateSizes();var n=this.getCalculatedSizes();var s=false;for(i=0;i<n.length;++i){if(n[i]!==0){s=true;break;}}if(!s){this._delayedResize(100);return;}var L=true;for(i=0;i<c.length;++i){var $=this.$("content-"+i);var d=c[i];$.css(this._sizeType,n[i]+"px");$.css(this._sizeTypeNot,"");var e=d.getLayoutData();var f=e&&e.getResizable();if(i>0){var R=f&&L;B=this.$("splitbar-"+(i-1));B.toggleClass("sapUiLoSplitterNoResize",!R);B.attr("tabindex",R&&this._keyboardEnabled?"0":"-1");B.attr("title",R?this._getText("SPLITTER_MOVE"):"");}L=f;}this._resizeBars(c);if(_(o,n)){this.fireResize({oldSizes:o,newSizes:n});}};S.prototype._calculateAvailableContentSize=function(s){var i=0;var $=this.$();var f=this._bHorizontal?$.innerWidth():$.innerHeight();var A=0;var h=false;for(i=0;i<s.length;++i){var c=s[i];if(c.indexOf("%")>-1){A++;}if(s[i]=="auto"){h=true;}}A+=h?1:0;f-=A;var d=s.length-1;var e=0;for(i=0;i<d;++i){e+=this._bHorizontal?this.$("splitbar-"+i).innerWidth():this.$("splitbar-"+i).innerHeight();}return f-e;};S.prototype._recalculateSizes=function(){var i,s,L,c,d;var e=[];var f=this.getContentAreas();for(i=0;i<f.length;++i){L=f[i].getLayoutData();s=L?L.getSize():"auto";e.push(s);}this._calculatedSizes=[];var A=this._calculateAvailableContentSize(e);var g=[];var h=[];var p=[];for(i=0;i<e.length;++i){s=e[i];var j;if(s.indexOf("px")>-1){j=parseInt(s,10);A-=j;this._calculatedSizes[i]=j;}else if(s.indexOf("%")>-1){p.push(i);}else if(e[i]=="auto"){L=f[i].getLayoutData();if(L&&parseInt(L.getMinSize(),10)!=0){h.push(i);}else{g.push(i);}}else{q.sap.log.error("Illegal size value: "+e[i]);}}var w=false;if(A<0){w=true;A=0;}var R=A;var P=p.length;for(i=0;i<P;++i){d=p[i];c=Math.floor(parseFloat(e[d])/100*A,0);A-=c;this._calculatedSizes[d]=c;R-=c;}A=R;if(A<0){w=true;A=0;}c=Math.floor(A/(h.length+g.length),0);var k=h.length;for(i=0;i<k;++i){d=h[i];var m=parseInt(f[d].getLayoutData().getMinSize(),10);if(m>c){this._calculatedSizes[d]=m;A-=m;}else{this._calculatedSizes[d]=c;A-=c;}}if(A<0){w=true;A=0;}R=A;var n=g.length;c=Math.floor(A/n,0);for(i=0;i<n;++i){d=g[i];this._calculatedSizes[d]=c;R-=c;}if(w){q.sap.log.info("[Splitter] The set sizes and minimal sizes of the splitter contents are bigger "+"than the available space in the UI.");}};S.prototype._switchOrientation=function(){this._bHorizontal=this.getOrientation()===sap.ui.core.Orientation.Horizontal;if(this._bHorizontal){this._sizeDirNot="top";this._sizeTypeNot="height";this._sizeType="width";this._moveCord="pageX";if(this._bRtl){this._sizeDir="right";}else{this._sizeDir="left";}}else{this._moveCord="pageY";this._sizeType="height";this._sizeTypeNot="width";this._sizeDir="top";this._sizeDirNot="left";}var t=this.$();t.toggleClass("sapUiLoSplitterH",this._bHorizontal);t.toggleClass("sapUiLoSplitterV",!this._bHorizontal);};S.prototype._onKeyboardResize=function(t,e){var B=this.getId()+"-splitbar-";if(!e||!e.target||!e.target.id||e.target.id.indexOf(B)!==0){return;}var s=20;var i=999999;var c=parseInt(e.target.id.substr(B.length),10);var m=this.getCalculatedSizes();this._move.c1Size=m[c];this._move.c2Size=m[c+1];var d=0;switch(t){case"inc":d=s;break;case"incMore":d=s*10;break;case"dec":d=0-s;break;case"decMore":d=0-s*10;break;case"max":d=i;break;case"min":d=0-i;break;default:q.sap.log.warn("[Splitter] Invalid keyboard resize type");break;}this._resizeContents(c,d,true);};S.prototype._enableKeyboardListeners=function(){this.onsapright=this._keyListeners.increase;this.onsapdown=this._keyListeners.increase;this.onsapleft=this._keyListeners.decrease;this.onsapup=this._keyListeners.decrease;this.onsappageup=this._keyListeners.decreaseMore;this.onsappagedown=this._keyListeners.increaseMore;this.onsapend=this._keyListeners.max;this.onsaphome=this._keyListeners.min;this._keyboardEnabled=true;};S.prototype._disableKeyboardListeners=function(){delete this.onsapincreasemodifiers;delete this.onsapdecreasemodifiers;delete this.onsapendmodifiers;delete this.onsaphomemodifiers;this._keyboardEnabled=false;};S.prototype._getText=function(k,A){return(r?r.getText(k,A):k);};function _(s,c){if(s===c){return false;}if(!s||!c||s.length===undefined||c.length===undefined){return true;}if(s.length!=c.length){return true;}for(var i=0;i<s.length;++i){if(s[i]!==c[i]){return true;}}return false;}function a(t){var p=function(e){e.preventDefault();};var A=null;A=function(){document.removeEventListener("touchend",A);document.removeEventListener("touchmove",p);document.removeEventListener("mouseup",A);document.removeEventListener("mousemove",p);};if(t){this._ignoreMouse=true;document.addEventListener("touchend",A);document.addEventListener("touchmove",p);}else{document.addEventListener("mouseup",A);document.addEventListener("mousemove",p);}}function b(c){var L=c.getLayoutData();if(L&&(!L.getResizable||!L.getSize||!L.getMinSize)){q.sap.log.warning("Content \""+c.getId()+"\" for the Splitter contained wrong LayoutData. "+"The LayoutData has been replaced with default values.");L=null;}if(!L){c.setLayoutData(new sap.ui.layout.SplitterLayoutData());}}S.prototype.invalidate=function(o){var f=(o&&this.indexOfContentArea(o)!=-1)||(o&&o instanceof sap.ui.core.CustomData&&o.getWriteToDom())||(o===undefined);if(f||this._needsInvalidation){this._needsInvalidation=false;C.prototype.invalidate.apply(this,arguments);}};S.prototype.setOrientation=function(o){var R=this.setProperty("orientation",o,true);this._switchOrientation();this._delayedResize();this.$().find(".sapUiLoSplitterBar").attr("aria-orientation",this._bHorizontal?"vertical":"horizontal");return R;};S.prototype.setWidth=function(w){this.setProperty("width",w,true);this.$().css("width",this.getProperty("width"));return this;};S.prototype.setHeight=function(h){this.setProperty("height",h,true);this.$().css("height",this.getProperty("height"));return this;};S.prototype.addContentArea=function(c){this._needsInvalidation=true;b(c);return this.addAggregation("contentAreas",c);};S.prototype.removeContentArea=function(c){this._needsInvalidation=true;return this.removeAggregation("contentAreas",c);};S.prototype.removeAllContentArea=function(){this._needsInvalidation=true;return this.destroyAllAggregation("contentAreas");};S.prototype.destroyContentArea=function(){this._needsInvalidation=true;return this.destroyAggregation("contentAreas");};S.prototype.insertContentArea=function(c,i){this._needsInvalidation=true;b(c);return this.insertAggregation("contentAreas",c,i);};return S;},true);
