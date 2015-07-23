/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/m/semantic/SemanticPageSegmentedContainer','sap/m/semantic/SemanticConfiguration','sap/m/Button','sap/m/Title','sap/m/ActionSheet','sap/m/Page','sap/m/OverflowToolbar','sap/m/OverflowToolbarButton','sap/m/OverflowToolbarLayoutData','sap/m/ToolbarSpacer','sap/m/Bar','sap/ui/core/CustomData','sap/ui/base/ManagedObject'],function(q,S,a,B,T,A,P,O,b,c,d,e,C,M){"use strict";var f=sap.ui.core.Control.extend("sap.m.semantic.SemanticPage",{metadata:{properties:{title:{type:"string",group:"Misc",defaultValue:null},titleLevel:{type:"sap.ui.core.TitleLevel",group:"Appearance",defaultValue:sap.ui.core.TitleLevel.Auto},showNavButton:{type:"boolean",group:"Appearance",defaultValue:false},showSubHeader:{type:"boolean",group:"Appearance",defaultValue:true},enableScrolling:{type:"boolean",group:"Behavior",defaultValue:true}},defaultAggregation:"content",aggregations:{subHeader:{type:"sap.m.IBar",multiple:false},content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"},customHeaderContent:{type:"sap.m.Button",multiple:true,singularName:"customHeaderContent"},customFooterContent:{type:"sap.m.Button",multiple:true,singularName:"customFooterContent"},_page:{type:"sap.m.Page",multiple:false,visibility:"hidden"}},events:{navButtonPress:{}}}});f.prototype.init=function(){this._currentMode=a._PageMode.display;this._getPage().setCustomHeader(this._getInternalHeader());this._getPage().setFooter(new O(this.getId()+"-footer"));};f.prototype.exit=function(){if(this._oInternalHeader){this._oInternalHeader.destroy();this._oInternalHeader=null;}if(this._oWrappedFooter){this._oWrappedFooter.destroy();this._oWrappedFooter=null;}this._oPositionsMap=null;};f.prototype.setSubHeader=function(o,h){this._getPage().setSubHeader(o,h);return this;};f.prototype.getSubHeader=function(){return this._getPage().getSubHeader();};f.prototype.destroySubHeader=function(h){this._getPage().destroySubHeader(h);return this;};f.prototype.getShowSubHeader=function(){return this._getPage().getShowSubHeader();};f.prototype.setShowSubHeader=function(h,i){this._getPage().setShowSubHeader(h,i);return this;};f.prototype.getContent=function(){return this._getPage().getContent();};f.prototype.addContent=function(o,h){this._getPage().addContent(o,h);return this;};f.prototype.indexOfContent=function(o){return this._getPage().indexOfContent(o);};f.prototype.insertContent=function(o,i,h){this._getPage().insertContent(o,i,h);return this;};f.prototype.removeContent=function(o,h){return this._getPage().removeContent(o,h);};f.prototype.removeAllContent=function(h){return this._getPage().removeAllContent(h);};f.prototype.destroyContent=function(h){this._getPage().destroyContent(h);return this;};f.prototype.setTitle=function(t){var o=this._getTitle();if(o){o.setText(t);if(!o.getParent()){this._getInternalHeader().addContentMiddle(o);}}this.setProperty("title",t,true);return this;};f.prototype.setTitleLevel=function(t){this.setProperty("titleLevel",t,true);this._getTitle().setLevel(t);return this;};f.prototype.setShowNavButton=function(h){var o=this._getNavButton();if(o){o.setVisible(h);if(!o.getParent()){this._getInternalHeader().addContentLeft(o);}}this.setProperty("showNavButton",h,true);return this;};f.prototype.setEnableScrolling=function(E){this._getPage().setEnableScrolling(E);this.setProperty("enableScrolling",E,true);return this;};f.prototype.getCustomFooterContent=function(){return this._getSegmentedFooter().getSection("customRight").getContent();};f.prototype.addCustomFooterContent=function(o,h){this._getSegmentedFooter().getSection("customRight").addContent(o,h);return this;};f.prototype.indexOfCustomFooterContent=function(o){return this._getSegmentedFooter().getSection("customRight").indexOfContent(o);};f.prototype.insertCustomFooterContent=function(o,i,h){this._getSegmentedFooter().getSection("customRight").insertContent(o,i,h);return this;};f.prototype.removeCustomFooterContent=function(o,h){return this._getSegmentedFooter().getSection("customRight").removeContent(o,h);};f.prototype.removeAllCustomFooterContent=function(h){return this._getSegmentedFooter().getSection("customRight").removeAllContent(h);};f.prototype.destroyCustomFooterContent=function(h){var i=this.getCustomFooterContent();if(!i){return this;}if(h){this.iSuppressInvalidate++;}this._getSegmentedFooter().getSection("customRight").destroy(h);if(!this.isInvalidateSuppressed()){this.invalidate();}if(h){this.iSuppressInvalidate--;}return this;};f.prototype.getCustomHeaderContent=function(){return this._getSegmentedHeader().getSection("customRight").getContent();};f.prototype.addCustomHeaderContent=function(o,h){this._getSegmentedHeader().getSection("customRight").addContent(o,h);return this;};f.prototype.indexOfCustomHeaderContent=function(o){return this._getSegmentedHeader().getSection("customRight").indexOfContent(o);};f.prototype.insertCustomHeaderContent=function(o,i,h){this._getSegmentedHeader().getSection("customRight").insertContent(o,i,h);return this;};f.prototype.removeCustomHeaderContent=function(o,h){return this._getSegmentedHeader().getSection("customRight").removeContent(o,h);};f.prototype.removeAllCustomHeaderContent=function(h){return this._getSegmentedHeader().getSection("customRight").removeAllContent(h);};f.prototype.destroyCustomHeaderContent=function(h){var i=this.getCustomHeaderContent();if(!i){return this;}if(h){this.iSuppressInvalidate++;}this._getSegmentedHeader().getSection("customRight").destroy(h);if(!this.isInvalidateSuppressed()){this.invalidate();}if(h){this.iSuppressInvalidate--;}return this;};f.prototype.setAggregation=function(h,o,i){var j=this.getMetadata().getAggregations()[h];if(j&&a.isKnownSemanticType(j.type)){if(o){this._initMonitor(o);this._addToInnerAggregation(o._getControl(),a.getPositionInPage(j.type),a.getSequenceOrderIndex(j.type),i);}else{var k=M.prototype.getAggregation.call(this,h);if(k){this._stopMonitor(k);this._removeFromInnerAggregation(k._getControl(),a.getPositionInPage(j.type),i);}}}M.prototype.setAggregation.call(this,h,o,i);};f.prototype.destroyAggregation=function(h,i){var o=this.getMetadata().getAggregations()[h];if(o&&a.isKnownSemanticType(o.type)){var j=M.prototype.getAggregation.call(this,h);if(j){this._stopMonitor(j);if(!j._getControl().bIsDestroyed){this._removeFromInnerAggregation(j._getControl(),a.getPositionInPage(o.type),i);}}}M.prototype.destroyAggregation.call(this,h,j,i);};f.prototype._getTitle=function(){if(!this._oTitle){this._oTitle=new T(this.getId()+"-title",{text:this.getTitle()});}return this._oTitle;};f.prototype._getNavButton=function(){if(!this._oNavButton){this._oNavButton=new B(this.getId()+"-navButton",{type:sap.m.ButtonType.Up,press:q.proxy(this.fireNavButtonPress,this)});}return this._oNavButton;};f.prototype._initMonitor=function(o){var h=o._getConfiguration();if(h.triggers){o.attachEvent("press",this._updateCurrentMode,this);}var i=h.states,t=this;if(i){q.each(a._PageMode,function(k,v){if(i[k]){t.attachEvent(k,o._onPageStateChanged,o);}});}};f.prototype._stopMonitor=function(o){o.detachEvent("press",this._updateCurrentMode,this);var h=o._getConfiguration();var i=h.states,t=this;if(i){q.each(a._PageMode,function(k,v){if(i[k]){t.detachEvent(k,o._onPageStateChanged,o);}});}};f.prototype._updateCurrentMode=function(E){var o=E.oSource._getConfiguration();if(typeof o.triggers==='string'){this._currentMode=o.triggers;}else{var l=o.triggers.length;if(l&&l>0){for(var i=0;i<l;i++){var t=o.triggers[i];if(t&&(t.inState===this._currentMode)){this._currentMode=t.triggers;break;}}}}this.fireEvent(this._currentMode);};f.prototype._removeFromInnerAggregation=function(o,p,h){var i=this._getSemanticPositionsMap()[p];if(i&&i.oContainer&&i.sAggregation){i.oContainer["remove"+g(i.sAggregation)](o,h);}};f.prototype._addToInnerAggregation=function(o,p,i,h){if(!o||!p){return;}var j=this._getSemanticPositionsMap()[p];if(!j||!j.oContainer||!j.sAggregation){return;}if(typeof i!=='undefined'){o.addCustomData(new C({key:"sortIndex",value:i}));}return j.oContainer["add"+g(j.sAggregation)](o,h);};f.prototype._getSemanticPositionsMap=function(o,h){if(!this._oPositionsMap){this._oPositionsMap={};this._oPositionsMap[a.prototype._PositionInPage.headerLeft]={oContainer:this._getInternalHeader(),sAggregation:"contentLeft"};this._oPositionsMap[a.prototype._PositionInPage.headerRight]={oContainer:this._getSegmentedHeader().getSection("semanticRight"),sAggregation:"content"};this._oPositionsMap[a.prototype._PositionInPage.headerMiddle]={oContainer:this._getInternalHeader(),sAggregation:"contentMiddle"};this._oPositionsMap[a.prototype._PositionInPage.footerLeft]={oContainer:this._getSegmentedFooter().getSection("semanticLeft"),sAggregation:"content"};this._oPositionsMap[a.prototype._PositionInPage.footerRight_IconOnly]={oContainer:this._getSegmentedFooter().getSection("semanticRight_IconOnly"),sAggregation:"content"};this._oPositionsMap[a.prototype._PositionInPage.footerRight_TextOnly]={oContainer:this._getSegmentedFooter().getSection("semanticRight_TextOnly"),sAggregation:"content"};}return this._oPositionsMap;};f.prototype._getPage=function(){var p=this.getAggregation("_page");if(!p){this.setAggregation("_page",new P(this.getId()+"-page"));p=this.getAggregation("_page");}return p;};f.prototype._getInternalHeader=function(){if(!this._oInternalHeader){this._oInternalHeader=new e(this.getId()+"-intHeader");}return this._oInternalHeader;};f.prototype._getAnyHeader=function(){return this._getInternalHeader();};f.prototype._getSegmentedHeader=function(){if(!this._oWrappedHeader){var h=this._getInternalHeader();if(!h){q.sap.log.error("missing page header",this);return null;}this._oWrappedHeader=new S(h,"contentRight");this._oWrappedHeader.addSection({sTag:"customRight"});this._oWrappedHeader.addSection({sTag:"semanticRight"});}return this._oWrappedHeader;};f.prototype._getSegmentedFooter=function(){if(!this._oWrappedFooter){var F=this._getPage().getFooter();if(!F){q.sap.log.error("missing page footer",this);return null;}this._oWrappedFooter=new S(F);this._oWrappedFooter.addSection({sTag:"semanticLeft"});this._oWrappedFooter.addSection({sTag:"spacer",aContent:[new d()]});this._oWrappedFooter.addSection({sTag:"semanticRight_TextOnly",fnSortFunction:s});this._oWrappedFooter.addSection({sTag:"customRight"});this._oWrappedFooter.addSection({sTag:"semanticRight_IconOnly",fnSortFunction:s});}return this._oWrappedFooter;};function g(n){return n.substring(0,1).toUpperCase()+n.substring(1);}function s(o,h){var i=o.data("sortIndex");var j=h.data("sortIndex");if((typeof i==='undefined')||(typeof j==='undefined')){q.sap.log.warning("sortIndex missing",this);return null;}return(i-j);}return f;},false);
