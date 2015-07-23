/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./Button','./Menu','./MenuItemBase','./library'],function(q,B,M,a,l){"use strict";var b=B.extend("sap.ui.commons.MenuButton",{metadata:{library:"sap.ui.commons",properties:{dockButton:{type:"string",group:"Misc",defaultValue:null},dockMenu:{type:"string",group:"Misc",defaultValue:null}},defaultAggregation:"menu",aggregations:{menu:{type:"sap.ui.unified.Menu",multiple:false}},events:{itemSelected:{parameters:{itemId:{type:"string"},item:{type:"sap.ui.unified.MenuItemBase"}}}}}});b.prototype.init=function(){this.addStyleClass("sapUiMenuButton");this.bWithKeyboard=false;};b.prototype.onclick=function(e){if(this.getEnabled()&&!this._bSkipOpen){var t=this.getTooltip();if(t&&t instanceof sap.ui.core.TooltipBase){t._closeOrPreventOpen();}var d=this.getDockButton()?this.getDockButton():sap.ui.core.Popup.Dock.BeginBottom;var D=this.getDockMenu()?this.getDockMenu():sap.ui.core.Popup.Dock.BeginTop;this.getMenu().open(this.bWithKeyboard,this,D,d,this);}this.bWithKeyboard=false;this._bSkipOpen=false;e.preventDefault();e.stopPropagation();};b.prototype.onmousedown=function(e){this.handleMouseDown(e,false);this._bSkipOpen=this.getMenu()&&this.getMenu().bOpen;};b.prototype.onmouseout=function(e){if(B.prototype.onmouseout){B.prototype.onmouseout.apply(this,arguments);}if(this._bSkipOpen&&q.sap.checkMouseEnterOrLeave(e,this.getDomRef())){this._bSkipOpen=false;}};b.prototype.onsapenter=function(e){this.bWithKeyboard=true;};b.prototype.onsapspace=function(e){this.bWithKeyboard=true;};b.prototype.onsapdownmodifiers=function(e){if(e.altKey){this.bWithKeyboard=true;this.onclick(e);}};b.prototype.clone=function(i,L){u(this);var c=B.prototype.clone.apply(this,arguments);u(this,this.getMenu());return c;};b.prototype.setMenu=function(m){u(this,m);this.setAggregation("menu",m);return this;};b.prototype.destroyMenu=function(){u(this,null);this.destroyAggregation("menu");return this;};var u=function(t,n){var m=t.getMenu();if(m){m.detachItemSelect(t._fItemSelectHandler);}t._fItemSelectHandler=q.proxy(o,t);if(n){n.attachItemSelect(t._fItemSelectHandler);}};var o=function(e){var i=e.getParameter("item");this.fireItemSelected({itemId:i.getId(),item:i});this.firePress({itemId:i.getId(),item:i});};return b;},true);
