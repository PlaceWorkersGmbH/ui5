/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./Dialog','./Popover','./library','sap/ui/core/Control','sap/ui/core/IconPool'],function(q,D,P,l,C,I){"use strict";var R=C.extend("sap.m.ResponsivePopover",{metadata:{library:"sap.m",properties:{placement:{type:"sap.m.PlacementType",group:"Misc",defaultValue:sap.m.PlacementType.Right},showHeader:{type:"boolean",group:"Misc",defaultValue:true},title:{type:"string",group:"Misc",defaultValue:null},icon:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},modal:{type:"boolean",group:"Misc",defaultValue:null},offsetX:{type:"int",group:"Misc",defaultValue:null},offsetY:{type:"int",group:"Misc",defaultValue:null},contentWidth:{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:null},contentHeight:{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:null},horizontalScrolling:{type:"boolean",group:"Misc",defaultValue:null},verticalScrolling:{type:"boolean",group:"Misc",defaultValue:null},showCloseButton:{type:"boolean",group:"Misc",defaultValue:true}},aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"},customHeader:{type:"sap.m.IBar",multiple:false},subHeader:{type:"sap.m.IBar",multiple:false},beginButton:{type:"sap.m.Button",multiple:false},endButton:{type:"sap.m.Button",multiple:false},_popup:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}},associations:{initialFocus:{type:"sap.ui.core.Control",multiple:false}},events:{beforeOpen:{parameters:{openBy:{type:"sap.ui.core.Control"}}},afterOpen:{parameters:{openBy:{type:"sap.ui.core.Control"}}},beforeClose:{parameters:{openBy:{type:"sap.ui.core.Control"},origin:{type:"sap.m.Button"}}},afterClose:{parameters:{openBy:{type:"sap.ui.core.Control"},origin:{type:"sap.m.Button"}}}}}});R.prototype.init=function(){var t=this;this._bAppendedToUIArea=false;var s={beforeOpen:function(e){t.fireBeforeOpen(e)},afterOpen:function(e){t.fireAfterOpen(e)},beforeClose:function(e){t.fireBeforeClose(e)},afterClose:function(e){t.fireAfterClose(e)}};if(sap.ui.Device.system.phone){this._aNotSupportedProperties=["placement","modal","offsetX","offsetY","showCloseButton"];s.stretch=true;s.type=sap.m.DialogType.Standard;this._oControl=new D(this.getId()+"-dialog",s)}else{this._aNotSupportedProperties=["icon","showCloseButton"];this._oControl=new P(this.getId()+"-popover",s)}this.setAggregation("_popup",this._oControl);this._oControl.addStyleClass("sapMResponsivePopover");this._oDelegate={onBeforeRendering:function(){var S=this.getShowCloseButton(),n,h,p,r;if(!S||!sap.ui.Device.system.phone||!this._bContentChanged){return}this._bContentChanged=false;h=this._oControl._getAnyHeader();if(h){this._insertCloseButton(h)}else{n=this._getSingleNavContent();if(!n){return}p=n.getCurrentPage();r=this._getRealPage(p);if(r&&(h=r._getAnyHeader())){this._insertCloseButton(h)}n.attachEvent("navigate",this._fnOnNavigate,this)}}};this._oPageDelegate={onAfterShow:function(){var r=t._getRealPage(this),h;if(r&&(h=r._getAnyHeader())){t._insertCloseButton(h)}}};this._fnOnNavigate=function(e){var p=e.getParameter("to");if(p){p.addEventDelegate(this._oPageDelegate,p)}};this._oControl.addEventDelegate(this._oDelegate,this);this._oControl._removeChild=function(c,a,S){var p,i;if((a==="content")&&(c instanceof sap.m.NavContainer)){p=c.getPages();for(i=0;i<p.length;i++){p[i].removeEventDelegate(t._oPageDelegate)}c.detachEvent("navigate",t._fnOnNavigate,t)}C.prototype._removeChild.apply(this,arguments)}};R.prototype.openBy=function(p){if(!this._bAppendedToUIArea&&!this.getParent()){var s=sap.ui.getCore().getStaticAreaRef();s=sap.ui.getCore().getUIArea(s);s.addContent(this,true);this._bAppendedToUIArea=true}if(sap.ui.Device.system.phone){return this._oControl.open()}else{return this._oControl.openBy(p)}};R.prototype.exit=function(){if(this._oCloseButton){this._oCloseButton.destroy();this._oCloseButton=null}if(this._oControl){this._oControl.removeEventDelegate(this._oDelegate);this._oControl.destroy();this._oControl=null}};R.prototype._getCloseButton=function(){if(!this._oCloseButton){var t=this;this._oCloseButton=new sap.m.Button(this.getId()+"-closeButton",{icon:I.getIconURI("decline"),press:function(){t._oControl._oCloseTrigger=this;t.close()}})}return this._oCloseButton};R.prototype.addContent=function(c){this._bContentChanged=true;this.addAggregation("content",c)};R.prototype._getSingleNavContent=P.prototype._getSingleNavContent;R.prototype._getRealPage=function(p){var r=p,c;while(r){if(r instanceof sap.m.Page){return r}if(r instanceof sap.ui.core.mvc.View){c=r.getContent();if(c.length===1){r=c[0];continue}}r=null}return r};R.prototype._insertCloseButton=function(h){var c=this._getCloseButton(),i;if(h){i=h.getAggregation("contentRight",[]).length;h.insertAggregation("contentRight",c,i)}};R.prototype._firstLetterUpperCase=function(v){return v.charAt(0).toUpperCase()+v.slice(1)};R.prototype._lastIndexOfUpperCaseLetter=function(v){var i,c;for(i=v.length-1;i>=0;i--){c=v.charAt(i);if(c===c.toUpperCase()){return i}}return-1};R.prototype._oldSetProperty=R.prototype.setProperty;R.prototype.setProperty=function(p,v,s){this._oldSetProperty(p,v,true);if(q.inArray(p,this._aNotSupportedProperties)===-1){this._oControl["set"+this._firstLetterUpperCase(p)](v)}return this};R.prototype._oldSetModel=R.prototype.setModel;R.prototype.setModel=function(m,n){this._oControl.setModel(m,n);return this._oldSetModel(m,n)};R.prototype._createButtonFooter=function(){if(this._oFooter){return this._oFooter}this._oFooter=new sap.m.Toolbar(this.getId()+"-footer",{content:[new sap.m.ToolbarSpacer()]});return this._oFooter};R.prototype._setButton=function(p,b){if(this._oControl instanceof P){var g="get"+this._firstLetterUpperCase(p)+"Button",o=this[g](),f=this._createButtonFooter(),s="_o"+this._firstLetterUpperCase(p)+"Button",i=(p.toLowerCase()==="begin"?0:1),O=(p.toLowerCase()==="begin"?"getEndButton":"getBeginButton");if(o){f.removeContent(o)}if(b){if(!f.getParent()){this._oControl.setFooter(f)}f.insertContent(b,i+1)}else{var a=this[O]();if(!a){f.destroy();this._oFooter=null}}this[s]=b;return this}else{var A=p.toLowerCase()+"Button";return this.setAggregation(A,b)}};R.prototype._getButton=function(p){if(this._oControl instanceof P){var s="_o"+this._firstLetterUpperCase(p)+"Button";return this[s]}else{var g="get"+this._firstLetterUpperCase(p)+"Button";return this[g]()}};R.prototype.setBeginButton=function(b){this._oControl.setBeginButton(b);return this._setButton("begin",b)};R.prototype.setEndButton=function(b){this._oControl.setEndButton(b);return this._setButton("end",b)};R.prototype.getBeginButton=function(){return this._getButton("begin")};R.prototype.getEndButton=function(){return this._getButton("end")};["bindAggregation","validateAggregation","setAggregation","getAggregation","indexOfAggregation","insertAggregation","addAggregation","removeAggregation","removeAllAggregation","destroyAggregation","setAssociation","getAssociation","addAssociation","removeAssociation","removeAllAssociation"].forEach(function(n){R.prototype[n]=function(){var L=this._lastIndexOfUpperCaseLetter(n),m,r;if(q.type(arguments[0])==="string"){if(L!==-1){m=n.substring(0,L)+this._firstLetterUpperCase(arguments[0]);if(this._oControl&&this._oControl[m]){r=this._oControl[m].apply(this._oControl,Array.prototype.slice.call(arguments,1));return r===this._oControl?this:r}else{return C.prototype[n].apply(this,arguments)}}}r=this._oControl[n].apply(this._oControl,arguments);return r===this._oControl?this:r}});["invalidate","close","isOpen","addStyleClass","removeStyleClass","toggleStyleClass","hasStyleClass","setBindingContext","getBindingContext","getBinding","getBindingInfo","getBindingPath","getDomRef"].forEach(function(n){R.prototype[n]=function(){if(this._oControl&&this._oControl[n]){var r=this._oControl[n].apply(this._oControl,arguments);return r===this._oControl?this:r}}});return R},true);
