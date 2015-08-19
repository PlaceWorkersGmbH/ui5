/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/Device','sap/ui/core/Control','sap/ui/core/IntervalTrigger','./library'],function(q,D,C,I,l){"use strict";var a=C.extend("sap.ui.demokit.IndexLayout",{metadata:{library:"sap.ui.demokit",properties:{itemWidth:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:'200px'},itemHeight:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:'200px'},enableScaling:{type:"boolean",group:"Appearance",defaultValue:true}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"}}}});a._MINMARGIN=18;a._DEFAULT_ITEM_HEIGHT=200;a._DEFAULT_ITEM_WIDTH=200;a._pos=null;(function(){a._IntervalTrigger=new I(300);a.prototype.init=function(){this._itemWidth=a._DEFAULT_ITEM_WIDTH;this._itemHeight=a._DEFAULT_ITEM_HEIGHT;this._tilesPerRow;this._width;this._registered=false;this._itemScaleFactor=1;D.media.attachHandler(s,this,D.media.RANGESETS.SAP_STANDARD);};a.prototype.exit=function(){this.onBeforeRendering();D.media.detachHandler(s,this,D.media.RANGESETS.SAP_STANDARD);};a.prototype.setItemWidth=function(i){this.setProperty("itemWidth",i,true);if(!i||i.indexOf("px")<0){this._itemWidth=a._DEFAULT_ITEM_WIDTH;this.setProperty("itemWidth",this._itemWidth,true);}else{this._itemWidth=parseInt(i,10);}_(this);return this;};a.prototype.setItemHeight=function(i){this.setProperty("itemHeight",i,true);if(!i||i.indexOf("px")<0){this._itemHeight=a._DEFAULT_ITEM_HEIGHT;this.setProperty("itemHeight",this._itemHeight,true);}else{this._itemHeight=parseInt(i,10);}_(this);return this;};a.prototype.setEnableScaling=function(e){this.setProperty("enableScaling",e,true);_(this);return this;};a.prototype.onBeforeRendering=function(){if(this._registered){a._IntervalTrigger.removeListener(r,this);this._registered=false;}var m=D.media.getCurrentRange(D.media.RANGESETS.SAP_STANDARD);s.apply(this,[m,true]);};a.prototype.onThemeChanged=function(){if(this.getDomRef()){this.invalidate();}};a.prototype.onAfterRendering=function(){if(!a._pos){var t=null;var S=this.getDomRef().style;if("webkitTransform"in S){t="-webkit-transform";}else if("transform"in S){t="transform";}else if("msTransform"in S){t="-ms-transform";}else if("MozTransform"in S){t="-moz-transform";}if(t){a._pos=function($,x,y){$.css(t,"translate("+x+"px,"+y+"px)");};}else{a._pos=function($,x,y){$.css({top:y+"px",left:x+"px"});};}}if(!this._registered){a._IntervalTrigger.addListener(r,this);this._registered=true;}this.$().toggleClass("sapDkIdxLayoutHidden",false);};a.prototype._scale=function(v){if(!this.getEnableScaling()){return v;}return Math.floor(v*this._itemScaleFactor);};function _(L,n){r.apply(L,[!n]);}function r(i){if(!this.getDomRef()){this.onBeforeRendering();return;}i=i||!this._registered;var L=this.$(),w=L.outerWidth(),h=L.outerHeight(),b=this._height!=h;if(this._width===w&&!b&&!i){return;}this._width=w;this._height=h;var c=this.getContent().length,d=this._scale(this._itemWidth),e=this._scale(this._itemHeight),t=g(this._width,c,d),f=this._tilesPerRow!=t;this._tilesPerRow=t;if(!i){L.toggleClass("sapDkIdxLayoutAnim",true);}if(!f&&!i&&!b){return;}var j=0,k=0;q.sap.byId(this.getId()+"-cntnt").css({"padding-left":a._MINMARGIN+"px","width":(t*d+a._MINMARGIN*2)+"px","height":Math.ceil(c/t)*e}).children().each(function(m){if(m>0&&m%t===0){j=j+e;k=0;}a._pos(q(this),k,j);k=k+d;});if(i){L.css({"padding-top":a._MINMARGIN+"px","padding-bottom":a._MINMARGIN+"px"});}}function g(b,c,d){var t=Math.min(Math.floor((b-2*a._MINMARGIN)/d),c);var e=c%t;if(e==0||c<=t){return t;}function f(x){var n=c%x;return(t-x)*Math.floor(c/x)+(n!=0?(t-n):0);}var h=f(t);var j=[t];for(var i=t-1;i>=1;i--){var w=f(i);if(w<h){j=[i];h=w;}else if(w==h){j.push(i);}}for(var i=0;i<j.length;i++){var m=c%j[i];if(m==0){return j[i];}else if(i==0||m>h){h=m;t=j[i];}}return t;}function s(m,S){switch(m.name){case"Tablet":this._itemScaleFactor=0.75;break;case"Phone":this._itemScaleFactor=0.5;break;default:this._itemScaleFactor=1;}if(!this.getDomRef()||S){return;}var w=this._scale(this._itemWidth);var h=this._scale(this._itemHeight);q.sap.byId(this.getId()+"-cntnt").children().each(function(){q(this).css({width:w,height:h});});_(this);}C.extend("sap.ui.demokit.IndexLayout._Tile",{metadata:{properties:{"title":"string","description":"string","target":"string","icon":"sap.ui.core.URI","href":"sap.ui.core.URI"},events:{"press":{}}},onclick:function(){if(!this.getHref()){this.firePress();}},renderer:function(R,c){R.write("<a");R.addClass("sapDkIdxLayout_Tile");R.writeClasses();R.writeControlData(c);if(c.getHref()){R.writeAttributeEscaped("href",c.getHref());if(c.getTarget()){R.writeAttributeEscaped("target",c.getTarget());}}else{R.writeAttribute("href","javascript:void(0);");}R.writeAttributeEscaped("title",c.getDescription());R.write(">");R.write("<span class='sapDkIdxLayout_TileIcon'>");R.writeIcon(c.getIcon());R.write("</span>");R.write("<span class='sapDkIdxLayout_TileLabel'");R.writeAttributeEscaped("title",c.getTitle());R.write(">");R.writeEscaped(c.getTitle());R.write("</span>");R.write("<span class='sapDkIdxLayout_TileDesc'");R.writeAttributeEscaped("title",c.getDescription());R.write(">");R.writeEscaped(c.getDescription());R.write("</span>");R.write("</a>");}});})();return a;},true);
