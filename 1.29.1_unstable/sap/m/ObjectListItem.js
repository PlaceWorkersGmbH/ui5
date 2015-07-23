/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./ListItemBase','./library','sap/ui/core/IconPool'],function(q,L,l,I){"use strict";var O=L.extend("sap.m.ObjectListItem",{metadata:{library:"sap.m",properties:{title:{type:"string",group:"Misc",defaultValue:null},number:{type:"string",group:"Misc",defaultValue:null},numberUnit:{type:"string",group:"Misc",defaultValue:null},intro:{type:"string",group:"Misc",defaultValue:null},icon:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},activeIcon:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},iconDensityAware:{type:"boolean",group:"Misc",defaultValue:true},markFavorite:{type:"boolean",group:"Misc",defaultValue:null},markFlagged:{type:"boolean",group:"Misc",defaultValue:null},showMarkers:{type:"boolean",group:"Misc",defaultValue:null},numberState:{type:"sap.ui.core.ValueState",group:"Misc",defaultValue:sap.ui.core.ValueState.None},titleTextDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:sap.ui.core.TextDirection.Inherit},introTextDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:sap.ui.core.TextDirection.Inherit},numberTextDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:sap.ui.core.TextDirection.Inherit},markLocked:{type:"boolean",group:"Misc",defaultValue:false}},defaultAggregation:"attributes",aggregations:{attributes:{type:"sap.m.ObjectAttribute",multiple:true,singularName:"attribute"},firstStatus:{type:"sap.m.ObjectStatus",multiple:false},secondStatus:{type:"sap.m.ObjectStatus",multiple:false}}}});O.prototype.exit=function(e){if(this._oImageControl){this._oImageControl.destroy();}if(this._oPlaceholderIcon){this._oPlaceholderIcon.destroy();this._oPlaceholderIcon=undefined;}if(this._oFavIcon){this._oFavIcon.destroy();this._oFavIcon=undefined;}if(this._oFlagIcon){this._oFlagIcon.destroy();this._oFlagIcon=undefined;}if(this._oLockIcon){this._oLockIcon.destroy();this._oLockIcon=undefined;}if(this._oTitleText){this._oTitleText.destroy();this._oTitleText=undefined;}L.prototype.exit.apply(this);};O.prototype._hasAttributes=function(){var a=this.getAttributes();if(a.length>0){for(var i=0;i<a.length;i++){if(!a[i]._isEmpty()){return true;}}}return false;};O.prototype._hasStatus=function(){return((this.getFirstStatus()&&!this.getFirstStatus()._isEmpty())||(this.getSecondStatus()&&!this.getSecondStatus()._isEmpty()));};O.prototype._hasBottomContent=function(){return(this._hasAttributes()||this._hasStatus()||this.getShowMarkers()||this.getMarkLocked());};O.prototype._getVisibleAttributes=function(){var a=this.getAttributes();var v=[];for(var i=0;i<a.length;i++){if(a[i].getVisible()){v.push(a[i]);}}return v;};O.prototype._getImageControl=function(){var i=this.getId()+'-img';var s="2.5rem";var p={src:this.getIcon(),height:s,width:s,size:s,densityAware:this.getIconDensityAware()};var c=['sapMObjLIcon'];this._oImageControl=sap.m.ImageHelper.getImageControl(i,this._oImageControl,this,p,c);return this._oImageControl;};O.prototype._activeHandlingInheritor=function(){var a=this.getActiveIcon();if(!!this._oImageControl&&!!a){this._oImageControl.setSrc(a);}};O.prototype._inactiveHandlingInheritor=function(){var s=this.getIcon();if(!!this._oImageControl){this._oImageControl.setSrc(s);}};O.prototype._getPlaceholderIcon=function(){if(!this._oPlaceholderIcon){var p=I.getIconURI("fridge");this._oPlaceholderIcon=I.createControlByURI({id:this.getId()+"-placeholder",src:p});this._oPlaceholderIcon.addStyleClass("sapMObjStatusMarkerInvisible");}return this._oPlaceholderIcon;};O.prototype._getFlagIcon=function(){if(!this._oFlagIcon){var f=I.getIconURI("flag");this._oFlagIcon=I.createControlByURI({id:this.getId()+"-flag",src:f});}return this._oFlagIcon;};O.prototype._getLockIcon=function(){if(!this._oLockIcon){var o=I.getIconURI("locked");this._oLockIcon=I.createControlByURI({id:this.getId()+"-lock",src:o}).addStyleClass("sapMObjStatusMarkerLocked");}return this._oLockIcon;};O.prototype._getFavoriteIcon=function(){if(!this._oFavIcon){var f=I.getIconURI("favorite");this._oFavIcon=I.createControlByURI({id:this.getId()+"-favorite",src:f});}return this._oFavIcon;};O.prototype._getTitleText=function(){if(!this._oTitleText){this._oTitleText=new sap.m.Text(this.getId()+"-titleText",{maxLines:2});this._oTitleText.setParent(this,null,true);}return this._oTitleText;};return O;},true);
