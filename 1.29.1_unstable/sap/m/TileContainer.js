/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./library','sap/ui/core/Control','sap/ui/core/IconPool'],function(q,l,C,I){"use strict";var T=C.extend("sap.m.TileContainer",{metadata:{library:"sap.m",properties:{width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:'100%'},height:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:'100%'},editable:{type:"boolean",group:"Misc",defaultValue:null},allowAdd:{type:"boolean",group:"Misc",defaultValue:null}},defaultAggregation:"tiles",aggregations:{tiles:{type:"sap.ui.core.Control",multiple:true,singularName:"tile"}},events:{tileMove:{parameters:{tile:{type:"sap.m.Tile"},newIndex:{type:"int"}}},tileDelete:{parameters:{tile:{type:"sap.m.Tile"}}},tileAdd:{}}}});I.insertFontFaceStyle();T.prototype._bRtl=sap.ui.getCore().getConfiguration().getRTL();T.prototype.init=function(){this._iCurrentTileStartIndex=0;this._iCurrentPage=0;this._iPages=0;this._iScrollLeft=0;this._iScrollGap=0;if(!sap.ui.Device.system.desktop){this._iScrollGap=0;}this.bAllowTextSelection=false;this._iInitialResizeTimeout=400;this._oDragSession=null;this._oTouchSession=null;this._bAvoidChildTapEvent=false;this._iEdgeShowStart=sap.ui.Device.system.phone?10:20;if(sap.ui.Device.system.phone){this._iTriggerScrollOffset=10;}else if(sap.ui.Device.system.desktop){this._iTriggerScrollOffset=-40;}else{this._iTriggerScrollOffset=20;}this._iCurrentFocusIndex=-1;if(sap.ui.Device.system.desktop||sap.ui.Device.system.combi){var o=q.proxy(function(E){if(this._iCurrentFocusIndex>=0){var r=this._iCurrentFocusIndex-this._iCurrentFocusIndex%this._iMaxTilesX;var F=this._iCurrentTileStartIndex===this._iCurrentFocusIndex?0:this._iCurrentTileStartIndex;var t=E.ctrlKey?F:r;var h=this.getTiles()[t];if(!!h){this._findTile(h.$()).focus();E.stopPropagation();}this._handleAriaActiveDescendant();}},this),O=q.proxy(function(E){if(this._iCurrentFocusIndex>=0){var t=this.getTiles();var r=this._iCurrentFocusIndex-this._iCurrentFocusIndex%this._iMaxTilesX;var R=r+this._iMaxTilesX<t.length?r+this._iMaxTilesX-1:t.length-1;var L=this._iCurrentTileStartIndex+this._iMaxTiles<t.length?this._iCurrentTileStartIndex+this._iMaxTiles-1:t.length-1;var i=L===this._iCurrentFocusIndex?t.length-1:L;var h=E.ctrlKey?i:R;if(t.length>0){this._findTile(t[h].$()).focus();E.stopPropagation();}this._handleAriaActiveDescendant();}},this),f=q.proxy(function(E){if(this.getTiles().length>0){var n=this._iCurrentFocusIndex-this._iMaxTiles>=0?this._iCurrentFocusIndex-this._iMaxTiles:0;var N=this.getTiles()[n];if(!!N){this._findTile(N.$()).focus();E.stopPropagation();}this._handleAriaActiveDescendant();}},this),a=q.proxy(function(E){var t=this.getTiles().length;if(t>0){var n=this._iCurrentFocusIndex+this._iMaxTiles<t?this._iCurrentFocusIndex+this._iMaxTiles:t-1;var N=this.getTiles()[n];if(!!N){this._findTile(N.$()).focus();E.stopPropagation();}this._handleAriaActiveDescendant();}},this),b=q.proxy(function(E){if(this._iCurrentFocusIndex>=0){var t=this.getTiles();var n=this._iCurrentFocusIndex+1<t.length?this._iCurrentFocusIndex+1:this._iCurrentFocusIndex;if(!E.ctrlKey){var N=t[n];if(!!N){if(n<this._iCurrentTileStartIndex+this._iMaxTiles){this._findTile(N.$()).focus();}else{this.scrollIntoView(N,true);var h=this;setTimeout(function(){h._findTile(N.$()).focus();},400);}}}else if(this.getEditable()){var i=t[this._iCurrentFocusIndex];this.moveTile(i,n);i.$().focus();}this._handleAriaActiveDescendant();E.stopPropagation();}},this),c=q.proxy(function(E){if(this._iCurrentFocusIndex>=0){var t=this.getTiles();var n=this._iCurrentFocusIndex-1>=0?this._iCurrentFocusIndex-1:this._iCurrentFocusIndex;if(!E.ctrlKey){var N=t[n];if(!!N){if(n>=this._iCurrentTileStartIndex){this._findTile(N.$()).focus();}else{this.scrollIntoView(N,true);var h=this;setTimeout(function(){h._findTile(N.$()).focus();},400);}}}else if(this.getEditable()){var i=t[this._iCurrentFocusIndex];this.moveTile(i,n);i.$().focus();}this._handleAriaActiveDescendant();E.stopPropagation();}},this),d=q.proxy(function(E){if(this._iCurrentFocusIndex>=0){var m=this._iCurrentFocusIndex%this._iMaxTiles,n=this._iCurrentFocusIndex+this._iMaxTilesX,M=n%this._iMaxTiles;if(!E.ctrlKey){var N=this.getTiles()[n];if((M>m)&&!!N){this._findTile(N.$()).focus();}}else if(this.getEditable()){var t=this.getTiles()[this._iCurrentFocusIndex];this.moveTile(t,n);t.$().focus();}this._handleAriaActiveDescendant();E.stopPropagation();}},this),e=q.proxy(function(E){if(this._iCurrentFocusIndex>=0){var m=this._iCurrentFocusIndex%this._iMaxTiles,n=this._iCurrentFocusIndex-this._iMaxTilesX,M=n%this._iMaxTiles;if(!E.ctrlKey){var N=this.getTiles()[n];if((M<m)&&!!N){this._findTile(N.$()).focus();}}else if(this.getEditable()){var t=this.getTiles()[this._iCurrentFocusIndex];this.moveTile(t,n);t.$().focus();}this._handleAriaActiveDescendant();E.stopPropagation();}},this),g=q.proxy(function(E){if(this._iCurrentFocusIndex>=0&&this.getEditable()){var t=this.getTiles()[this._iCurrentFocusIndex];if(t.getRemovable()){this.deleteTile(t);if(this._iCurrentFocusIndex===this.getTiles().length){if(this.getTiles().length!==0){this.getTiles()[this._iCurrentFocusIndex-1].$().focus();}else{this._findNextTabbable().focus();}}else{this.getTiles()[this._iCurrentFocusIndex].$().focus();}this._handleAriaActiveDescendant();}E.stopPropagation();}},this);this.onsaphome=o;this.onsaphomemodifiers=o;this.onsapend=O;this.onsapendmodifiers=O;this.onsapright=this._bRtl?c:b;this.onsaprightmodifiers=this._bRtl?c:b;this.onsapleft=this._bRtl?b:c;this.onsapleftmodifiers=this._bRtl?b:c;this.onsapup=e;this.onsapupmodifiers=e;this.onsapdown=d;this.onsapdownmodifiers=d;this.onsappageup=f;this.onsappagedown=a;this.onsapdelete=g;this.data("sap-ui-fastnavgroup","true",true);}};T.prototype._findNextTabbable=function(){var r=this.$();var t=q.merge(q.merge(r.nextAll(),r.parents().nextAll()).find(':sapTabbable').addBack(':sapTabbable'),q.merge(r.parents().prevAll(),r.prevAll()).find(':sapTabbable').addBack(':sapTabbable'));return t.first();};T.prototype.onBeforeRendering=function(){if(this._sResizeListenerId){sap.ui.core.ResizeHandler.deregister(this._sResizeListenerId);this._sResizeListenerId=null;}};T.prototype.onAfterRendering=function(){this._sResizeListenerId=sap.ui.core.ResizeHandler.register(this.getDomRef().parentElement,q.proxy(this._resize,this));this._applyDimension();this.$().toggleClass("sapMTCEditable",this.getEditable()===true);var t=this;this._sInitialResizeTimeoutId=setTimeout(function(){t._update(true);},this._iInitialResizeTimeout);if(sap.ui.Device.system.desktop||sap.ui.Device.system.combi){if(this.getTiles().length>0&&this._mFocusables){this._mFocusables[this.getTiles()[0].getId()].eq(0).attr('tabindex','0');}}};T.prototype.setEditable=function(v){var t=this.getTiles();this.setProperty("editable",v,true);var e=this.getEditable();this.$().toggleClass("sapMTCEditable",e);for(var i=0;i<t.length;i++){var o=t[i];if(o instanceof sap.m.Tile){o.isEditable(e);}}return this;};T.prototype._applyDimension=function(){var d=this._getContainerDimension(),$=this.$(),t,o=10,a=this.$("scrl"),s,b,p=this.$("pager").outerHeight();a.css({width:d.outerwidth+"px",height:(d.outerheight-p)+"px"});t=$.position();s=a.position();b=a.outerHeight();if(sap.ui.Device.system.phone){o=2;}else if(sap.ui.Device.system.desktop){o=0;}this.$("blind").css({top:(s.top+o)+"px",left:(s.left+o)+"px",right:"auto",width:(a.outerWidth()-o)+"px",height:(b-o)+"px"});this.$("rightedge").css({top:(t.top+o)+"px",right:o+"px",left:"auto",height:(b-o)+"px"});this.$("leftedge").css({top:(t.top+o)+"px",left:(t.left+o)+"px",right:"auto",height:(b-o)+"px"});};T.prototype._resize=function(){if(this._oDragSession){return;}setTimeout(q.proxy(function(){this._update(true);delete this._iInitialResizeTimeout;},this),this._iInitialResizeTimeout);this._iInitialResizeTimeout=0;};T.prototype.exit=function(){if(this._sResizeListenerId){sap.ui.core.ResizeHandler.deregister(this._sResizeListenerId);this._sResizeListenerId=null;}if(this._sInitialResizeTimeoutId){clearTimeout(this._sInitialResizeTimeoutId);}};T.prototype._update=function(a){if(!this.getDomRef()){return;}if(!this.$().is(":visible")){return;}this._updateTilePositions();if(!this._oDragSession){this.scrollIntoView(this._iCurrentTileStartIndex||0,a);}};T.prototype.getPageFirstTileIndex=function(){return this._iCurrentTileStartIndex||0;};T.prototype.moveTile=function(t,n){if(!isNaN(t)){t=this.getTiles()[t];}if(!t){q.sap.log.info("No Tile to move");return this;}var o=t.$().attr('aria-posinset');this.deleteTile(t);this.insertTile(t,n);var N=n+1;if(typeof o!==undefined){this._updateTilesAriaPosition(parseInt(o,10),N);}return this;};T.prototype.addTile=function(t){this.insertTile(t,this.getTiles().length);this._handleAriaSize();};T.prototype.insertTile=function(t,i){var a=this;if(sap.ui.Device.system.desktop||sap.ui.Device.system.combi){t.addEventDelegate({"onAfterRendering":function(){if(!a._mFocusables){a._mFocusables={};}a._mFocusables[this.getId()]=this.$().find("[tabindex!='-1']").addBack().filter(a._isFocusable);a._mFocusables[this.getId()].attr('tabindex','-1');}},t);var o=function(e){var i=a.indexOfAggregation("tiles",this),E=Math.floor(i/a._iMaxTiles),p=E-a._iCurrentPage;var P=a._iCurrentFocusIndex>=0?a._iCurrentFocusIndex:0;var b=a.getTiles()[P];if(b){a._mFocusables[b.getId()].attr("tabindex","-1");a._mFocusables[this.getId()].attr("tabindex","0");}if(p!=0){a.scrollIntoView(i);a._resize();}a._handleAriaActiveDescendant();a._iCurrentFocusIndex=i;};t.addEventDelegate({"onfocusin":o},t);}if(this.getDomRef()){this.insertAggregation("tiles",t,i,true);if(!this._oDragSession){var r=sap.ui.getCore().createRenderManager(),c=this.$("cnt")[0];r.renderControl(t);r.flush(c,false,i);r.destroy();}this._update(false);}else{this.insertAggregation("tiles",t,i);}this._handleAriaSize();return this;};T.prototype._isFocusable=function(i,e){var a=!isNaN(q(e).attr("tabindex"));var n=e.nodeName.toLowerCase();if(n==="area"){var m=e.parentNode,b=m.name,c;if(!e.href||!b||m.nodeName.toLowerCase()!=="map"){return false;}c=q("img[usemap=#"+b+"]")[0];return!!c;}return(/input|select|textarea|button|object/.test(n)?!e.disabled:n=="a"?e.href||a:a);};T.prototype.deleteTile=function(t){if(this.getDomRef()){var i=this.indexOfAggregation("tiles",t)-1;this.removeAggregation("tiles",t,true);if(!this._oDragSession){t.getDomRef().parentNode.removeChild(t.getDomRef());if(sap.ui.Device.system.desktop||sap.ui.Device.system.combi){if(this._mFocusables&&this._mFocusables[t.getId()]){delete this._mFocusables[t.getId()];}}}this._applyPageStartIndex(i<0?0:i);this._update(false);}else{this.removeAggregation("tiles",t,false);}this._handleAriaSize();return this;};T.prototype.removeTile=T.prototype.deleteTile;T.prototype.removeAllTiles=function(){var t=this.getTiles().length-1;for(var i=t;i>=0;i--){var o=this.getTiles()[i];this.deleteTile(o);}return this;};T.prototype.destroyTiles=function(){if(this.getDomRef()){var t=this.getTiles();this.removeAllAggregation("tiles",true);this._update();for(var i=0;i<t.length;i++){var a=t[i];a.destroy();}}else{this.destroyAggregation("tiles",false);}return this;};T.prototype.rerender=function(){if(!this._oDragSession||this._oDragSession.bDropped){C.prototype.rerender.apply(this);}};T.prototype.scrollLeft=function(){if(this._bRtl){this.scrollIntoView(this._iCurrentTileStartIndex+this._iMaxTiles);}else{this.scrollIntoView(this._iCurrentTileStartIndex-this._iMaxTiles);}};T.prototype.scrollRight=function(){if(this._bRtl){this.scrollIntoView(this._iCurrentTileStartIndex-this._iMaxTiles);}else{this.scrollIntoView(this._iCurrentTileStartIndex+this._iMaxTiles);}};T.prototype.scrollIntoView=function(t,a){var c=this._getContentDimension().outerwidth,i=t;if(isNaN(t)){i=this.indexOfAggregation("tiles",t);}if(!this.getTiles()[i]){return;}this._applyPageStartIndex(i);this._iCurrentPage=Math.floor(this._iCurrentTileStartIndex/this._iMaxTiles);if(this._bRtl){this._scrollTo((this._iPages-this._iCurrentPage)*c,a);}else{this._scrollTo(this._iCurrentPage*c,a);}this._updatePager();};T.prototype._updateTilePositions=function(){if(this.getTiles().length===0){return;}this._applyPageStartIndex(this._iCurrentTileStartIndex);this._applyDimension();var t=this.getTiles(),c=this._getContentDimension();this._iPages=Math.ceil(t.length/this._iMaxTiles);for(var i=0;i<t.length;i++){if(t[i].isDragged()){continue;}var p=Math.floor(i/this._iMaxTiles),o=t[i],L=(p*c.outerwidth)+this._iOffsetX+i%this._iMaxTilesX*this._oTileDimension.width,a=this._iOffsetY+Math.floor(i/this._iMaxTilesX)*this._oTileDimension.height-(p*this._iMaxTilesY*this._oTileDimension.height);if(this._bRtl){L=(this._iPages-p)*c.outerwidth-this._iOffsetX-(i%this._iMaxTilesX+1)*this._oTileDimension.width;}o.setPos(L,a);o.setSize(this._oTileDimension.width,this._oTileDimension.height);}};T.prototype._findTile=function($){if($.hasClass('sapMTile')||$.hasClass('sapMCustomTile')){return $;}else{return $.find('.sapMTile')||$.find('.sapMCustomTile');}};T.prototype._updatePager=function(){var p=this.$("pager")[0],s=this.$("leftscroller")[0],S=this.$("rightscroller")[0];if(this._iPages>1){var h=[""];for(var i=0;i<this._iPages;i++){h.push("");}p.innerHTML=h.join("<span></span>");p.style.display="block";p.childNodes[this._iCurrentPage].className="sapMTCActive";if(sap.ui.Device.system.desktop){var a={r:this._iCurrentPage==this._iPages-1,l:this._iCurrentPage==0};if(this._bRtl){var t=a.r;a.r=a.l;a.l=t;S.style.left="auto";s.style.right="auto";}S.style.right=a.r?"-100px":"1rem";s.style.left=a.l?"-100px":"1rem";s.style.display="block";S.style.display="block";if(a.r){S.style.display="none";}if(a.l){s.style.display="none";}}}else{p.innerHTML="";S.style.right="-100px";s.style.left="-100px";s.style.display="none";S.style.display="none";}};T.prototype._getContentDimension=function(){if(!this.getDomRef()){return;}var s=this.$("scrl");return{width:s.width(),height:s.height()-20,outerheight:s.outerHeight()-20,outerwidth:s.outerWidth()};};T.prototype._getContainerDimension=function(){var d=this.$();if(!d){return;}return{width:d.width(),height:d.height(),outerheight:d.outerHeight(),outerwidth:d.outerWidth()};};T.prototype._getTileDimension=function(){if(!this.getDomRef()){return;}if(this._oTileDim){return this._oTileDim;}var t=this.getTiles()[0];this._oTileDim={width:Math.round(t.$().outerWidth(true)),height:Math.round(t.$().outerHeight(true))};return this._oTileDim;};T.prototype._calculatePositions=function(){if(this.getTiles().length===0){return;}this._oTileDimension=this._getTileDimension();var c=this._getContainerDimension(),t=this.getTiles().length,p=this.$("pager")[0].offsetHeight;if(c.height===0){return;}if(sap.ui.Device.system.desktop){c.width-=45*2;}var m=Math.max(Math.floor(c.width/this._oTileDimension.width),1),M=Math.max(Math.floor((c.height-p)/this._oTileDimension.height),1),n=(t<m)?t:m,N=(t/n<M)?Math.ceil(t/n):M;this._iMaxTiles=m*M;this._iMaxTilesX=m;this._iMaxTilesY=M;this._iOffsetX=Math.floor((c.width-(this._oTileDimension.width*n))/2);if(sap.ui.Device.system.desktop){this._iOffsetX+=45;}this._iOffsetY=Math.floor((c.height-p-(this._oTileDimension.height*N))/2);};T.prototype._getTilesFromPosition=function(x,y){if(!this.getTiles().length){return[];}x=x+this._iScrollLeft;var t=this.getTiles(),r=[];for(var i=0;i<t.length;i++){var o=t[i],R={top:o._posY,left:o._posX,width:o._width,height:o._height};if(!t[i].isDragged()&&y>R.top&&y<R.top+R.height&&x>R.left&&x<R.left+R.width){r.push(t[i]);}}return r;};T.prototype._applyPageStartIndex=function(i){this._calculatePositions();var L=this.getTiles().length;if(i<0){i=0;}else if(i>L-1){i=L-1;}var c=Math.floor(i/this._iMaxTiles||0);this._iCurrentTileStartIndex=c*(this._iMaxTiles||0);q.sap.log.info("current index "+this._iCurrentTileStartIndex);};T.prototype._scrollTo=function(s,a){if(a!==false){a=true;}this._applyTranslate(this.$("cnt"),-s,0,a);if(this._bRtl){this._iScrollLeft=s-this._getContentDimension().outerwidth;}else{this._iScrollLeft=s;}};T.prototype._applyTranslate=function(a,x,y,A){var o=a[0];this.$("cnt").toggleClass("sapMTCAnim",A);if("webkitTransform"in o.style){a.css('-webkit-transform','translate3d('+x+'px,'+y+'px,0)');}else if("MozTransform"in o.style){a.css('-moz-transform','translate('+x+'px,'+y+'px)');}else if("transform"in o.style){a.css('transform','translate3d('+x+'px,'+y+'px,0)');}else if("msTransform"in o.style){a.css('-ms-transform','translate('+x+'px,'+y+'px)');}};T.prototype._initTouchSession=function(e){if(e.type=="touchstart"){var t=e.targetTouches[0];this._oTouchSession={dStartTime:new Date(),fStartX:t.pageX,fStartY:t.pageY,fDiffX:0,fDiffY:0,oControl:e.srcControl,iOffsetX:t.pageX-e.target.offsetLeft};}else{this._oTouchSession={dStartTime:new Date(),fStartX:e.pageX,fStartY:e.pageY,fDiffX:0,fDiffY:0,oControl:e.srcControl,iOffsetX:e.pageX-e.target.offsetLeft};}};T.prototype._initDragSession=function(e){while(e.srcControl&&e.srcControl.getParent()!=this){e.srcControl=e.srcControl.getParent();}var i=this.indexOfAggregation("tiles",e.srcControl);if(e.type=="touchstart"){this._oDragSession={oTile:e.srcControl,oTileElement:e.srcControl.$()[0],iOffsetLeft:e.targetTouches[0].pageX-e.srcControl._posX+this._iScrollLeft,iOffsetTop:e.targetTouches[0].pageY-e.srcControl._posY,iIndex:i,iOldIndex:i,iDiffX:e.targetTouches[0].pageX,iDiffY:e.targetTouches[0].pageY};}else{this._oDragSession={oTile:e.srcControl,oTileElement:e.srcControl.$()[0],iOffsetLeft:e.pageX-e.srcControl._posX+this._iScrollLeft,iOffsetTop:e.pageY-e.srcControl._posY,iIndex:i,iOldIndex:i,iDiffX:e.pageX,iDiffY:e.pageY};}};T.prototype.onclick=function(e){var p=this.$("pager")[0];if(e.target.id==this.getId()+"-leftscroller"||e.target.parentNode.id==this.getId()+"-leftscroller"){this.scrollLeft();}else if(e.target.id==this.getId()+"-rightscroller"||e.target.parentNode.id==this.getId()+"-rightscroller"){this.scrollRight();}else if(e.target==p&&sap.ui.Device.system.desktop){if(e.offsetX<p.offsetWidth/2){this.scrollLeft();}else{this.scrollRight();}}};T.prototype.ontouchstart=function(e){e.setMarked();if(e.targetTouches.length>1||this._oTouchSession){return;}while(e.srcControl&&e.srcControl.getParent()!=this){e.srcControl=e.srcControl.getParent();}if(e.srcControl instanceof sap.m.Tile&&this.getEditable()){if(e.target.className!="sapMTCRemove"){this._initDragSession(e);this._initTouchSession(e);this._oDragSession.oTile.isDragged(true);}else{this._initTouchSession(e);}this._bAvoidChildTapEvent=true;}else{this._initTouchSession(e);}q(document).on("touchmove mousemove",q.proxy(this._onmove,this));q(document).on("touchend touchcancel mouseup",q.proxy(this._onend,this));};T.prototype._onmove=function(e){if(document.selection&&document.selection.clear){document.selection.clear();}if(e.isMarked("delayedMouseEvent")){return;}if(e.targetTouches&&e.targetTouches.length>1){return;}if(!e.targetTouches){e.targetTouches=[{pageX:e.pageX,pageY:e.pageY}];}var t=this._oTouchSession;t.fDiffX=t.fStartX-e.targetTouches[0].pageX;t.fDiffY=t.fStartY-e.targetTouches[0].pageY;if(this._oDragSession){if(Math.abs(t.fDiffX)>5){if(!this._oDragSession.bStarted){this._oDragSession.bStarted=true;this._onDragStart(e);}else{this._onDrag(e);}this._bAvoidChildTapEvent=true;}}else if(t){var c=this._getContentDimension().outerwidth;var n=-this._iScrollLeft-t.fDiffX;if(n>this._iScrollGap){return;}else if(n<-(((this._iPages-1)*c)+this._iScrollGap)){return;}if(this._bRtl){n=n-c;}this._applyTranslate(this.$("cnt"),n,0,false);}};T.prototype._onend=function(e){if(e.isMarked("delayedMouseEvent")){return;}q(document).off("touchend touchcancel mouseup",this._onend);q(document).off("touchmove mousemove",this._onmove);if(this._oDragSession){this._onDrop(e);delete this._oTouchSession;return;}if(!this._oTouchSession){return;}var t=this._oTouchSession,d=new Date(),f=(d-t.dStartTime<600),r=this._bRtl?-1:1;if(f){var p=this.$("pager")[0];if(Math.abs(t.fDiffX)>30){this._applyPageStartIndex(this._iCurrentTileStartIndex+((t.fDiffX*r>0?1:-1)*this._iMaxTiles));this._bAvoidChildTapEvent=true;}else if(e.target==p&&!sap.ui.Device.system.desktop){if((t.iOffsetX-p.offsetWidth/2)*r<0){this.scrollLeft();}else{this.scrollRight();}this._bAvoidChildTapEvent=true;}else if(e.target.className=="sapMTCRemove"){if(e.type==="touchend"||(e.type==="mouseup"&&e.button===0)){this.fireTileDelete({tile:t.oControl});}}}else{var c=this._getContentDimension();if(Math.abs(t.fDiffX)>c.outerwidth/2){this._applyPageStartIndex(this._iCurrentTileStartIndex+((t.fDiffX*r>0?1:-1)*this._iMaxTiles));this._bAvoidChildTapEvent=true;}}this._update();delete this._oDragSession;delete this._oTouchSession;var a=this;setTimeout(function(){a._bAvoidChildTapEvent=false;},100);};T.prototype._onDragStart=function(e){this.$().append(this._oDragSession.oTileElement);this._oDragSession.iDiffX=this._oTouchSession.fStartX-this._oTouchSession.fDiffX;this._oDragSession.iDiffY=this._oTouchSession.fStartY-this._oTouchSession.fDiffY;this._oDragSession.oTile.setPos(this._oDragSession.iDiffX-this._oDragSession.iOffsetLeft,this._oDragSession.iDiffY-this._oDragSession.iOffsetTop);this.$("blind").css("display","block");};T.prototype._onDrag=function(e){if(!this._oTouchSession){clearTimeout(this.iScrollTimer);this._oDragSession=null;this.iScrollTimer=null;this._bTriggerScroll=false;return;}this._oDragSession.iDiffX=this._oTouchSession.fStartX-this._oTouchSession.fDiffX;this._oDragSession.iDiffY=this._oTouchSession.fStartY-this._oTouchSession.fDiffY;var c=this._getContentDimension(),t=this._oDragSession.iDiffY-this._oDragSession.iOffsetTop,L=this._oDragSession.iDiffX-this._oDragSession.iOffsetLeft,m=t+(this._oDragSession.oTileElement.offsetHeight/2),i=L+(this._oDragSession.oTileElement.offsetWidth/2),s=L+this._oDragSession.oTileElement.offsetWidth-this._iTriggerScrollOffset>c.width,S=L<-this._iTriggerScrollOffset,n=c.width-(L+this._oDragSession.oTileElement.offsetWidth),N=L;this._oDragSession.oTile.setPos(L,t);this._oDragSession.oTile.$().css("clip","auto");var r=this.$("rightedge")[0];if(L+this._oDragSession.oTile._width>r.offsetLeft+r.offsetWidth&&this._iCurrentPage<this._iPages-1){var a=r.offsetLeft+r.offsetWidth-L-((this._oDragSession.oTile._width-this._oDragSession.oTile.$().outerWidth(false))/2)-2;this._oDragSession.oTile.$().css("clip","rect(-25px,"+a+"px,"+(this._oDragSession.oTile._height+20)+"px,-25px)");}var o=this.$("leftedge")[0];if(L<o.offsetLeft+2+((this._oDragSession.oTile._width-this._oDragSession.oTile.$().outerWidth(false))/2)&&this._iCurrentPage>0){var b=o.offsetLeft+4-L-((this._oDragSession.oTile._width-this._oDragSession.oTile.$().outerWidth(false))/2);this._oDragSession.oTile.$().css("clip","rect(-25px,"+this._oDragSession.oTile._width+"px,"+(this._oDragSession.oTile._height+20)+"px,"+b+"px)");}if(n<this._iEdgeShowStart&&this._iCurrentPage<this._iPages-1){var O=(this._iEdgeShowStart-n)/(this._iEdgeShowStart+this._iTriggerScrollOffset);this.$("rightedge").css("opacity",""+O);}else{this.$("rightedge").css("opacity","0.01");}if(N<this._iEdgeShowStart&&this._iCurrentPage>0){var O=(this._iEdgeShowStart-N)/(this._iEdgeShowStart+this._iTriggerScrollOffset);this.$("leftedge").css("opacity",""+O);}else{this.$("leftedge").css("opacity","0.01");}var d;if(this._bRtl){d=s&&this._iCurrentPage>0||S&&this._iCurrentPage<this._iPages-1;}else{d=S&&this._iCurrentPage>0||s&&this._iCurrentPage<this._iPages-1;}if(d){if(this._bTriggerScroll){S?this.scrollLeft():this.scrollRight();}else{var f=this;if(!this.iScrollTimer){this.iScrollTimer=setInterval(function(){f._bTriggerScroll=true;f._onDrag(e);f._bTriggerScroll=false;},1000);}}return;}else{if(this.iScrollTimer){clearTimeout(this.iScrollTimer);this._bTriggerScroll=false;this.iScrollTimer=null;}}var h=this._getTilesFromPosition(i,m);if(h&&h.length>0){var H=h[0],R={top:H._posY,left:H._posX,width:H._width,height:H._height};var g=this.indexOfAggregation("tiles",H);if(i+this._iScrollLeft<((R.left+R.width)/2)&&(g%this._iMaxTilesX)!=0){g--;}this._oDragSession.iIndex=g;this.moveTile(this._oDragSession.oTile,this._oDragSession.iIndex);}else if(this._iCurrentPage==this._iPages-1){var j=this.getTiles(),k=j[j.length-1];if(k&&i>k._posX-this._iScrollLeft&&m>k._posY){this._oDragSession.iIndex=j.length-1;this.moveTile(this._oDragSession.oTile,this._oDragSession.iIndex);}}};T.prototype._onDrop=function(e){if(this._oDragSession){var t=this._oDragSession.oTile,i=this._oDragSession.iIndex;this._oDragSession.oTile.isDragged(false);if(this._oDragSession.iOldIndex!=this._oDragSession.iIndex){this.fireTileMove({tile:t,newIndex:i});}this.$("blind").css("display","block");if(this._oDragSession.bStarted){this._oDragSession.oTile.setPos(this._oDragSession.oTile._posX+this._iScrollLeft,this._oDragSession.oTile._posY);}this._oDragSession.oTile.$().css("clip","auto");this.$("rightedge").css("opacity","0.01");this.$("leftedge").css("opacity","0.01");this.$("cnt").append(this._oDragSession.oTileElement);delete this._oDragSession;this.moveTile(t,i);this.scrollIntoView(t,false);if(sap.ui.Device.system.desktop||sap.ui.Device.system.combi){this._findTile(t.$()).focus();}this._handleAriaActiveDescendant();this.$("blind").css("display","none");}};T.prototype._handleAriaActiveDescendant=function(){var a=q(document.activeElement).control(0);if(a instanceof sap.m.Tile&&a.getParent()===this){this.getDomRef().setAttribute("aria-activedescendant",a.getId());}};T.prototype._handleAriaSize=function(){var t=this.getTiles().length;for(var i=0;i<t;i++){var o=this.getTiles()[i].getDomRef();if(o){o.setAttribute("aria-setsize",t);}}};T.prototype._updateTilesAriaPosition=function(o,n){if(!o){q.sap.log.warning("Cannot update ARIA posinset attribute. Missing old aria position inset.");return this;}if(!n){q.sap.log.warning("Cannot update ARIA posinset attribute. Missing new aria postion inset.");return this;}var L=Math.min(o,n);var h=Math.max(o,n);if(L!==h){var t=this.getTiles();for(var i=L;i<=h;i++){var a=i-1;t[a]._updateAriaPosition();}}return this;};return T;},true);
