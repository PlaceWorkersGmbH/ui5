/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","./ResponsivePopover","sap/m/Button","sap/m/Toolbar","sap/m/ToolbarSpacer","./List","./StandardListItem","./library","sap/ui/core/Control","sap/m/PlacementType","sap/ui/core/IconPool","sap/ui/core/HTML","sap/m/Text","sap/ui/core/Icon","sap/m/SegmentedButton","sap/m/Page","sap/m/NavContainer"],function(q,R,B,T,a,L,S,l,C,P,I,H,b,c,d,e,N){"use strict";var M=C.extend("sap.m.MessagePopover",{metadata:{library:"sap.m",properties:{asyncDescriptionHandler:{type:"any",group:"Behavior",defaultValue:null},asyncURLHandler:{type:"any",group:"Behavior",defaultValue:null},placement:{type:"sap.m.VerticalPlacementType",group:"Behavior",defaultValue:"Vertical"},initiallyExpanded:{type:"boolean",group:"Behavior",defaultValue:true}},defaultAggregation:"items",aggregations:{items:{type:"sap.m.MessagePopoverItem",multiple:true,singularName:"item"}},events:{afterOpen:{parameters:{openBy:{type:"sap.ui.core.Control"}}},afterClose:{parameters:{openBy:{type:"sap.ui.core.Control"}}},beforeOpen:{parameters:{openBy:{type:"sap.ui.core.Control"}}},beforeClose:{parameters:{openBy:{type:"sap.ui.core.Control"}}},itemSelect:{parameters:{item:{type:"sap.m.MessagePopoverItem"},messageTypeFilter:{type:"sap.ui.core.MessageType"}}},listSelect:{parameters:{messageTypeFilter:{type:"sap.ui.core.MessageType"}}}}}});var f="sapMMsgPopover",g={back:I.getIconURI("nav-back"),close:I.getIconURI("decline"),information:I.getIconURI("message-information"),warning:I.getIconURI("message-warning"),error:I.getIconURI("message-error"),success:I.getIconURI("message-success")},h=["all","error","warning","success","information"];M.prototype.init=function(){var t=this;var p;this._oResourceBundle=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._oPopover=new R(this.getId()+"-messagePopover",{showHeader:false,contentWidth:"340px",placement:this.getPlacement(),showCloseButton:false,modal:false,afterOpen:function(E){t.fireAfterOpen({openBy:E.getParameter("openBy")});},afterClose:function(E){t._navContainer.backToTop();t.fireAfterClose({openBy:E.getParameter("openBy")});},beforeOpen:function(E){t.fireBeforeOpen({openBy:E.getParameter("openBy")});},beforeClose:function(E){t.fireBeforeClose({openBy:E.getParameter("openBy")});}}).addStyleClass(f);this._createNavigationPages();this._createLists();p=this._oPopover.getAggregation("_popup");p.oPopup.setAutoClose(false);p.addEventDelegate({onBeforeRendering:this.onBeforeRenderingPopover,onkeypress:this._onkeypress},this);if(sap.ui.Device.system.phone){this._oPopover.setBeginButton(new B({text:this._oResourceBundle.getText("MESSAGEPOPOVER_CLOSE"),press:this.close.bind(this)}));}};M.prototype.exit=function(){this._oResourceBundle=null;this._oListHeader=null;this._oDetailsHeader=null;this._oSegmentedButton=null;this._oBackButton=null;this._navContainer=null;this._listPage=null;this._detailsPage=null;this._sCurrentList=null;if(this._oLists){this._destroyLists();}if(this._oPopover){this._oPopover.destroy();this._oPopover=null;}};M.prototype.onBeforeRenderingPopover=function(){if(this._bItemsChanged){this._clearLists();this._fillLists(this.getItems());this._clearSegmentedButton();this._fillSegmentedButton();this._bItemsChanged=false;}this._setInitialFocus();};M.prototype._onkeypress=function(E){if(E.shiftKey&&E.keyCode==q.sap.KeyCodes.ENTER){this._fnHandleBackPress();}};M.prototype._getListHeader=function(){return this._oListHeader||this._createListHeader();};M.prototype._getDetailsHeader=function(){return this._oDetailsHeader||this._createDetailsHeader();};M.prototype._createListHeader=function(){var s=this._oResourceBundle.getText("MESSAGEPOPOVER_CLOSE");var i=this.getId()+"-CloseBtnDescr";var o=new H(i,{content:"<span id=\""+i+"\" style=\"display: none;\">"+s+"</span>"});var j=this._oResourceBundle.getText("MESSAGEPOPOVER_ARIA_HEADING");var k=this.getId()+"-HeadingDescr";var m=new H(k,{content:"<span id=\""+k+"\" style=\"display: none;\" role=\"heading\">"+j+"</span>"});if(this._oPopover){var p=this._oPopover.getAggregation("_popup");p.addAssociation("ariaDescribedBy",k,true);}var n=new B({icon:g["close"],visible:!sap.ui.Device.system.phone,ariaLabelledBy:o,tooltip:s,press:this.close.bind(this)}).addStyleClass(f+"CloseBtn");this._oSegmentedButton=new d(this.getId()+"-segmented",{});this._oListHeader=new T({content:[this._oSegmentedButton,new a(),n,o,m]});return this._oListHeader;};M.prototype._createDetailsHeader=function(){var s=this._oResourceBundle.getText("MESSAGEPOPOVER_CLOSE");var i=this.getId()+"-CloseBtnDetDescr";var o=new H(i,{content:"<span id=\""+i+"\" style=\"display: none;\">"+s+"</span>"});var j=this._oResourceBundle.getText("MESSAGEPOPOVER_ARIA_BACK_BUTTON");var k=this.getId()+"-BackBtnDetDescr";var m=new H(k,{content:"<span id=\""+k+"\" style=\"display: none;\">"+j+"</span>"});var n=new B({icon:g["close"],visible:!sap.ui.Device.system.phone,ariaLabelledBy:o,tooltip:s,press:this.close.bind(this)}).addStyleClass(f+"CloseBtn");this._oBackButton=new B({icon:g["back"],press:this._fnHandleBackPress.bind(this),ariaLabelledBy:m,tooltip:j});this._oDetailsHeader=new T({content:[this._oBackButton,new a(),n,o,m]});return this._oDetailsHeader;};M.prototype._createNavigationPages=function(){this._listPage=new e(this.getId()+"listPage",{customHeader:this._getListHeader()});this._detailsPage=new e(this.getId()+"-detailsPage",{customHeader:this._getDetailsHeader()});this._detailsPage.addEventDelegate({onclick:function(E){var t=E.target;if(t.nodeName.toUpperCase()==='A'&&(t.className.indexOf('sapMMsgPopoverItemDisabledLink')!==-1||t.className.indexOf('sapMMsgPopoverItemPendingLink')!==-1)){E.preventDefault();}}});this._navContainer=new N(this.getId()+"-navContainer",{initialPage:this.getId()+"listPage",pages:[this._listPage,this._detailsPage],navigate:this._navigate.bind(this),afterNavigate:this._afterNavigate.bind(this)});this._oPopover.addContent(this._navContainer);return this;};M.prototype._createLists=function(){this._oLists={};h.forEach(function(s){this._oLists[s]=new L({itemPress:this._fnHandleItemPress.bind(this),visible:false});this._listPage.addAggregation("content",this._oLists[s],true);},this);return this;};M.prototype._clearLists=function(){h.forEach(function(s){if(this._oLists[s]){this._oLists[s].destroyAggregation("items",true);}},this);return this;};M.prototype._destroyLists=function(){h.forEach(function(s){this._oLists[s]=null;},this);this._oLists=null;};M.prototype._fillLists=function(i){i.forEach(function(m){var o=this._mapItemToListItem(m),j=this._mapItemToListItem(m);this._oLists["all"].addAggregation("items",o,true);this._oLists[m.getType().toLowerCase()].addAggregation("items",j,true);},this);};M.prototype._mapItemToListItem=function(m){if(!m){return null;}var t=m.getType(),o=new S({title:m.getTitle(),icon:this._mapIcon(t),type:sap.m.ListType.Navigation}).addStyleClass(f+"Item").addStyleClass(f+"Item"+t);o._oMessagePopoverItem=m;return o;};M.prototype._mapIcon=function(i){if(!i){return null;}return g[i.toLowerCase()];};M.prototype._clearSegmentedButton=function(){if(this._oSegmentedButton){this._oSegmentedButton.destroyAggregation("buttons",true);}return this;};M.prototype._fillSegmentedButton=function(){var t=this;var p=function(s){return function(){t._fnFilterList(s);};};h.forEach(function(s){var o=this._oLists[s],i=o.getItems().length,j;if(i>0){j=new B(this.getId()+"-"+s,{text:s=="all"?this._oResourceBundle.getText("MESSAGEPOPOVER_ALL"):i,icon:g[s],press:p(s)}).addStyleClass(f+"Btn"+s.charAt(0).toUpperCase()+s.slice(1));this._oSegmentedButton.addButton(j,true);}},this);if(sap.ui.Device.system.phone){this._fnFilterList("all");}else{if(!this.getInitiallyExpanded()){this._oPopover.addStyleClass(f+"-init");this._oSegmentedButton.setSelectedButton("none");}else{this._oPopover.setContentHeight(this._oPopover.getContentWidth());this._fnFilterList("all");}}return this;};M.prototype._setIcon=function(m,o){this._previousIconTypeClass=f+"DescIcon"+m.getType();this._oMessageIcon=new c({src:o.getIcon()}).addStyleClass(f+"DescIcon").addStyleClass(this._previousIconTypeClass);this._detailsPage.addContent(this._oMessageIcon);};M.prototype._setTitle=function(m){this._oMessageTitleText=new b(this.getId()+'MessageTitleText',{text:m.getTitle()}).addStyleClass('sapMMsgPopoverTitleText');this._detailsPage.addAggregation("content",this._oMessageTitleText);};M.prototype._setDescription=function(m){if(m.getMarkupDescription()){this._oMessageDescriptionText=new H(this.getId()+'MarkupDescription',{content:"<div class='markupDescription'>"+m.getDescription()+"</div>"});}else{this._oMessageDescriptionText=new b(this.getId()+'MessageDescriptionText',{text:m.getDescription()}).addStyleClass('sapMMsgPopoverDescriptionText');}this._detailsPage.addContent(this._oMessageDescriptionText);};M.prototype._iNextValidationTaskId=0;M.prototype._validateURL=function(u){if(q.sap.validateUrl(u)){return u;}q.sap.log.warning("You have entered invalid URL");return'';};M.prototype._queueValidation=function(i){var A=this.getAsyncURLHandler();var v=++this._iNextValidationTaskId;var p={};var o=new window.Promise(function(r,j){p.resolve=r;p.reject=j;var k={url:i,id:v,promise:p};A(k);});o.id=v;return o;};M.prototype._getTagPolicy=function(){var t=this;var j=html.makeTagPolicy(this._validateURL());return function customTagPolicy(k,m){var n,v=false;if(k.toUpperCase()==="A"){for(var i=0;i<m.length;){if(m[i]==="href"){v=true;n=m[i+1];m.splice(0,2);continue;}i+=2;}}m=j(k,m);if(v&&typeof t.getAsyncURLHandler()==="function"){m=m||[];var o=false;for(var i=0;i<m.length;i+=2){if(m[i]==="class"){m[i+1]+="sapMMsgPopoverItemDisabledLink sapMMsgPopoverItemPendingLink";o=true;break;}}if(!o){m.unshift("sapMMsgPopoverItemDisabledLink sapMMsgPopoverItemPendingLink");m.unshift("class");}var V=t._queueValidation(n);m.push("href");m.push(n);m.push("target");m.push("_blank");m.push("id");m.push("sap-ui-"+t.getId()+"-link-under-validation-"+V.id);V.then(function(r){var $=q("#"+"sap-ui-"+t.getId()+"-link-under-validation-"+r.id);if(r.allowed){q.sap.log.info("Allow link "+n);}else{q.sap.log.info("Disallow link "+n);}$.removeClass('sapMMsgPopoverItemPendingLink');$.toggleClass('sapMMsgPopoverItemDisabledLink',!r.allowed);}).catch(function(){q.sap.log.warning("Async URL validation could not be performed.");});}return m;};};M.prototype._sanitizeDescription=function(m){q.sap.require("jquery.sap.encoder");q.sap.require("sap.ui.thirdparty.caja-html-sanitizer");var t=this._getTagPolicy();var s=html.sanitizeWithPolicy(m.getDescription(),t);m.setDescription(s);this._setDescription(m);};M.prototype._fnHandleItemPress=function(E){var o=E.getParameter("listItem"),m=o._oMessagePopoverItem;var i=this.getAsyncDescriptionHandler();var j=function(s){this._setTitle(m);this._sanitizeDescription(m);this._setIcon(m,o);if(!s){this._navContainer.to(this._detailsPage);}}.bind(this);this._previousIconTypeClass=this._previousIconTypeClass||'';this.fireItemSelect({item:m,messageTypeFilter:this._getCurrentMessageTypeFilter()});this._detailsPage.destroyContent();if(typeof i==="function"&&!!m.getLongtextUrl()){m.setMarkupDescription(true);var p={};var k=new window.Promise(function(r,s){p.resolve=r;p.reject=s;});var n=function(){this._detailsPage.setBusy(false);j(true);};k.then(function(){n();}).catch(function(){q.sap.log.warning("Async description loading could not be performed.");n();});this._navContainer.to(this._detailsPage);this._detailsPage.setBusy(true);i({promise:p,item:m});}else{j();}this._listPage.$().attr("aria-hidden","true");};M.prototype._fnHandleBackPress=function(){this._listPage.$().removeAttr("aria-hidden");this._navContainer.back();};M.prototype._fnFilterList=function(s){h.forEach(function(i){if(i!=s&&this._oLists[i].getVisible()){this._oLists[i].setVisible(false);}},this);this._sCurrentList=s;this._oLists[s].setVisible(true);this._oPopover.setContentHeight(this._oPopover.getContentWidth()).removeStyleClass(f+"-init");this.fireListSelect({messageTypeFilter:this._getCurrentMessageTypeFilter()});};M.prototype._getCurrentMessageTypeFilter=function(){return this._sCurrentList=="all"?"":this._sCurrentList;};M.prototype._navigate=function(){if(this._isListPage()){this._oRestoreFocus=q(document.activeElement);}};M.prototype._afterNavigate=function(){q.sap.delayedCall(0,this,this._restoreFocus);};M.prototype._isListPage=function(){return(this._navContainer.getCurrentPage()==this._listPage);};M.prototype._decoratePopover=function(p){p._marginTop=0;p._marginLeft=0;p._marginRight=0;p._marginBottom=0;p._arrowOffset=0;p._offsets=["0 0","0 0","0 0","0 0"];p._myPositions=["begin bottom","begin center","begin top","end center"];p._atPositions=["begin top","end center","begin bottom","begin center"];p.addStyleClass(f+'-ModeToolbar');p._setArrowPosition=function(){};};M.prototype._setInitialFocus=function(){if(this._isListPage()){this._oPopover.setInitialFocus(this._oLists[this._sCurrentList]);}};M.prototype._restoreFocus=function(){if(this._isListPage()){var r=this._oRestoreFocus&&this._oRestoreFocus.control(0);if(r){r.focus();}}else{this._oBackButton.focus();}};M.prototype.openBy=function(o){var r=this._oPopover.getAggregation("_popup");if(o.getParent()instanceof sap.m.Toolbar&&r instanceof sap.m.Popover){this._decoratePopover(r);}if(this._oPopover){this._oPopover.openBy(o);}return this;};M.prototype.close=function(){if(this._oPopover){this._oPopover.close();}return this;};M.prototype.isOpen=function(){return this._oPopover.isOpen();};M.prototype.toggle=function(o){if(this.isOpen()){this.close();}else{this.openBy(o);}return this;};M.prototype.setPlacement=function(p){this.setProperty("placement",p,true);this._oPopover.setPlacement(p);return this;};M.prototype.getDomRef=function(s){return this._oPopover&&this._oPopover.getAggregation("_popup").getDomRef(s);};["setModel","bindAggregation","setAggregation","insertAggregation","addAggregation","removeAggregation","removeAllAggregation","destroyAggregation"].forEach(function(F){M.prototype["_"+F+"Old"]=M.prototype[F];M.prototype[F]=function(){var r=M.prototype["_"+F+"Old"].apply(this,arguments);this._bItemsChanged=true;if(this._oPopover){this._oPopover.invalidate();}if(["removeAggregation","removeAllAggregation"].indexOf(F)!==-1){return r;}return this;};});return M;},true);
