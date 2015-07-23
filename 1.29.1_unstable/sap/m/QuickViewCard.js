/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./library','sap/ui/core/Control','./QuickViewBase','./NavContainer','./Page','./ScrollContainer'],function(q,l,C,Q,N,P,S){"use strict";var a=Q.extend("sap.m.QuickViewCard",{metadata:{}});a.prototype.init=function(){var n={pages:[new P()],navigate:this._navigate.bind(this),afterNavigate:this._afterNavigate.bind(this)};this._oNavContainer=new N(n);};a.prototype.onBeforeRendering=function(){this._initPages();};a.prototype.exit=function(){if(this._oNavContainer){this._oNavContainer.destroy();}};a.prototype.onkeydown=function(e){this._processKeyboard(e);};a.prototype._createPage=function(o){var c=o._createPageContent();var b=new S(this.getId()+'-'+o.getPageId(),{horizontal:false,vertical:false});if(c.header){b.addContent(c.header);}b.addContent(c.form);b.addStyleClass('sapMQuickViewPage');return b;};return a;},true);
