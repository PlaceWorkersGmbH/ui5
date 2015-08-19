/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./library','sap/ui/core/Control','sap/ui/core/IconPool'],function(q,l,C,I){"use strict";var M=C.extend("sap.m.MessagePage",{metadata:{library:"sap.m",properties:{text:{type:"string",group:"Misc",defaultValue:"No matching items found."},description:{type:"string",group:"Misc",defaultValue:"Check the filter settings."},title:{type:"string",group:"Misc",defaultValue:null},showHeader:{type:"boolean",group:"Appearance",defaultValue:true},showNavButton:{type:"boolean",group:"Appearance",defaultValue:false},icon:{type:"sap.ui.core.URI",group:"Misc",defaultValue:"sap-icon://documents"},textDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:sap.ui.core.TextDirection.Inherit}},aggregations:{customText:{type:"sap.m.Link",multiple:false},customDescription:{type:"sap.m.Link",multiple:false},_page:{type:"sap.m.Page",multiple:false,visibility:"hidden"}},associations:{ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{navButtonPress:{}}}});M.prototype.init=function(){var b=sap.ui.getCore().getLibraryResourceBundle("sap.m");this.setAggregation("_page",new sap.m.Page({showHeader:this.getShowHeader(),navButtonPress:q.proxy(function(){this.fireNavButtonPress();},this)}));this.setProperty("text",b.getText("MESSAGE_PAGE_TEXT"),true);this.setProperty("description",b.getText("MESSAGE_PAGE_DESCRIPTION"),true);};M.prototype.onBeforeRendering=function(){if(!(this._oText&&this._oDescription)){this._addPageContent();}};M.prototype.exit=function(){var p=this.getAggregation("_page");if(p){p.destroy();p=null;}if(this._oText){this._oText=null;}if(this._oDescription){this._oDescription=null;}if(this._oIconControl){this._oIconControl=null;}};M.prototype.setTitle=function(t){this.setProperty("title",t,true);this.getAggregation("_page").setTitle(t);};M.prototype.setText=function(t){this.setProperty("text",t,true);this._oText&&this._oText.setText(t);};M.prototype.setDescription=function(d){this.setProperty("description",d,true);this._oDescription&&this._oDescription.setText(d);};M.prototype.setShowHeader=function(s){this.setProperty("showHeader",s,true);this.getAggregation("_page").setShowHeader(s);};M.prototype.setShowNavButton=function(s){this.setProperty("showNavButton",s,true);this.getAggregation("_page").setShowNavButton(s);};M.prototype.setTextDirection=function(t){this.setProperty("textDirection",t,true);this._oText&&this._oText.setTextDirection(t);this._oDescription&&this._oDescription.setTextDirection(t);};M.prototype.setIcon=function(i){var o=this.getIcon();this.setProperty("icon",i,true);if(this._oIconControl){if(o!==i&&I.isIconURI(o)!=I.isIconURI(i)){var p=this.getAggregation("_page");p.removeContent(this._oIconControl);this._oIconControl.destroy();p.insertContent(this._getIconControl(),0);}else{this._oIconControl.setSrc(i);}}};M.prototype._addPageContent=function(){var p=this.getAggregation("_page");if(this.getAggregation("customText")){this._oText=this.getAggregation("customText");}else{this._oText=new sap.m.Text({text:this.getText(),textAlign:sap.ui.core.TextAlign.Center,textDirection:this.getTextDirection()});}if(this.getAggregation("customDescription")){this._oDescription=this.getAggregation("customDescription");}else{this._oDescription=new sap.m.Text({text:this.getDescription(),textAlign:sap.ui.core.TextAlign.Center,textDirection:this.getTextDirection()});}p.addContent(this._getIconControl());p.addContent(this._oText.addStyleClass("sapMMessagePageMainText"));p.addContent(this._oDescription.addStyleClass("sapMMessagePageDescription"));};M.prototype._getIconControl=function(){this._oIconControl=I.createControlByURI({id:this.getId()+"-pageIcon",src:this.getIcon(),height:"8rem"},sap.m.Image).addStyleClass("sapMMessagePageIcon");return this._oIconControl;};M.prototype._getAnyHeader=function(){return this._getInternalHeader();};M.prototype._getInternalHeader=function(){return this.getAggregation("_page").getAggregation("_internalHeader");};return M;},true);