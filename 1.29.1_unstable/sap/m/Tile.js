/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./library','sap/ui/core/Control'],function(q,l,C){"use strict";var T=C.extend("sap.m.Tile",{metadata:{library:"sap.m",properties:{removable:{type:"boolean",group:"Misc",defaultValue:true}},events:{press:{}}}});T.prototype.init=function(){if(sap.ui.Device.system.desktop){var o=q.proxy(function(e){if(e.srcControl===this&&!e.isMarked()){this.ontap();e.stopPropagation();}},this);this.onsapspace=o;this.onsapenter=o;}};T.prototype.onAfterRendering=function(){if(this._rendered&&!this._bIsDragged&&this.getParent()instanceof sap.m.TileContainer){this.setPos(this._posX,this._posY);}this._rendered=true;};T.prototype.setPos=function(x,y){this._posX=x=Math.floor(x);this._posY=y=Math.floor(y);if(!this._rendered){return;}var o=this.getDomRef();if("webkitTransform"in o.style){this.$().css('-webkit-transform','translate3d('+x+'px,'+y+'px,0)');}else if("transform"in o.style){this.$().css('transform','translate3d('+x+'px,'+y+'px,0)');}else if("msTransform"in o.style){this.$().css('msTransform','translate('+x+'px,'+y+'px)');}else if("MozTransform"in o.style){this.$().css('-moz-transform','translate3d('+x+'px,'+y+'px,0)');}if(this._invisible){this.$().css("visibility","");delete this._invisible;}};T.prototype.setSize=function(w,h){this._width=w;this._height=h;};T.prototype.isEditable=function(i){if(i===true||i===false){this._bIsEditable=i;}return this._bIsEditable;};T.prototype.isDragged=function(i){if(!this._bIsEditable){return;}if(i===true||i===false){var o=this.$();o.toggleClass("sapMTileDrag",i);this._bIsDragged=i;}return this._bIsDragged;};T.prototype.ontouchstart=function(e){if(!this.isEditable()&&!this._parentPreventsTapEvent){this.$().toggleClass("sapMTileActive sapMTileActive-CTX",true);this._clientX=e.clientX;this._clientY=e.clientY;}};T.prototype.ontouchend=function(){if(!this.isEditable()){this.$().toggleClass("sapMTileActive sapMTileActive-CTX",false);}};Object.defineProperty(T.prototype,"_parentPreventsTapEvent",{get:function(){var p=this.getParent();while(p){if(p._bAvoidChildTapEvent||(p instanceof T&&p.isEditable())){return true;}p=p.getParent();}return false;}});T.prototype.ontouchmove=function(e){if(!this.isEditable()&&!this._parentPreventsTapEvent){if(Math.abs(e.clientX-this._clientX)>30||Math.abs(e.clientY-this._clientY)>10){this.$().toggleClass("sapMTileActive sapMTileActive-CTX",false);}}};T.prototype.ontap=function(){if(!this.isEditable()&&!this._parentPreventsTapEvent){this.firePress({});}};T.prototype._setVisible=function(v){this._invisible=!v;return this;};T.prototype._getTileIndex=function(){var t=this.getParent(),i=null;if(t&&t instanceof sap.m.TileContainer){i=t.indexOfAggregation("tiles",this)+1;}return i;};T.prototype._getTilesCount=function(){var t=this.getParent(),i=null;if(t&&t instanceof sap.m.TileContainer){i=t.getTiles().length;}return i;};T.prototype._updateAriaPosition=function(){this.$().attr('aria-posinset',this._getTileIndex());return this;};return T;},true);
