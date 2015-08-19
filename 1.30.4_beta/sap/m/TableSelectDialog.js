/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./Button','./Dialog','./SearchField','./Table','./library','sap/ui/core/Control'],function(q,B,D,S,T,l,C){"use strict";var a=C.extend("sap.m.TableSelectDialog",{metadata:{library:"sap.m",properties:{title:{type:"string",group:"Appearance",defaultValue:null},noDataText:{type:"string",group:"Appearance",defaultValue:null},multiSelect:{type:"boolean",group:"Dimension",defaultValue:false},growingThreshold:{type:"int",group:"Misc",defaultValue:null},contentWidth:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},rememberSelections:{type:"boolean",group:"Behavior",defaultValue:false},contentHeight:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null}},defaultAggregation:"items",aggregations:{items:{type:"sap.m.ColumnListItem",multiple:true,singularName:"item",bindable:"bindable"},_dialog:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},columns:{type:"sap.m.Column",multiple:true,singularName:"column",bindable:"bindable"}},events:{confirm:{parameters:{selectedItem:{type:"sap.m.StandardListItem"},selectedItems:{type:"sap.m.StandardListItem[]"},selectedContexts:{type:"string"}}},search:{parameters:{value:{type:"string"},itemsBinding:{type:"any"}}},liveChange:{parameters:{value:{type:"string"},itemsBinding:{type:"any"}}},cancel:{}}}});a.prototype.init=function(){var t=this,L=0,r=null;r=function(){t._oSelectedItem=t._oTable.getSelectedItem();t._aSelectedItems=t._oTable.getSelectedItems();t._oDialog.detachAfterClose(r);t._fireConfirmAndUpdateSelection();};this._bAppendedToUIArea=false;this._bInitBusy=false;this._bFirstRender=true;this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._oTable=new T(this.getId()+"-table",{growing:true,growingScrollToLoad:true,mode:sap.m.ListMode.SingleSelectMaster,infoToolbar:new sap.m.Toolbar({visible:false,active:false,content:[new sap.m.Label({text:this._oRb.getText("TABLESELECTDIALOG_SELECTEDITEMS",[0])})]}),selectionChange:function(e){if(t._oDialog){if(!t.getMultiSelect()){t._oDialog.attachAfterClose(r);t._oDialog.close();}else{t._updateSelectionIndicator();}}}});this._table=this._oTable;this._oBusyIndicator=new sap.m.BusyIndicator(this.getId()+"-busyIndicator").addStyleClass("sapMTableSelectDialogBusyIndicator",true);this._oSearchField=new S(this.getId()+"-searchField",{width:"100%",liveChange:function(e){var v=e.getSource().getValue(),i=(v?300:0);clearTimeout(L);if(i){L=setTimeout(function(){t._executeSearch(v,"liveChange");},i);}else{t._executeSearch(v,"liveChange");}},search:function(e){t._executeSearch(e.getSource().getValue(),"search");}});this._searchField=this._oSearchField;this._oSubHeader=new sap.m.Bar(this.getId()+"-subHeader",{contentMiddle:[this._searchField]});this._oDialog=new D(this.getId()+"-dialog",{stretch:sap.ui.Device.system.phone,contentHeight:"2000px",subHeader:this._oSubHeader,content:[this._oBusyIndicator,this._oTable],leftButton:this._getCancelButton(),initialFocus:((sap.ui.Device.system.desktop&&this._oSearchField)?this._oSearchField:null)});this._dialog=this._oDialog;this.setAggregation("_dialog",this._oDialog);var d=this._oDialog.onsapescape;this._oDialog.onsapescape=function(e){if(d){d.call(t._oDialog,e);}t._onCancel();};this._oDialog._iVMargin=8*(parseInt(sap.ui.core.theming.Parameters.get("sapUiFontSize"),10)||16);this._sSearchFieldValue="";this._bFirstRequest=true;this._iTableUpdateRequested=0;};a.prototype.exit=function(){this._oTable=null;this._oSearchField=null;this._oSubHeader=null;this._oBusyIndicator=null;this._sSearchFieldValue=null;this._iTableUpdateRequested=null;this._bFirstRequest=false;this._bInitBusy=false;this._bFirstRender=false;if(this._bAppendedToUIArea){var s=sap.ui.getCore().getStaticAreaRef();s=sap.ui.getCore().getUIArea(s);s.removeContent(this,true);}if(this._oDialog){this._oDialog.destroy();this._oDialog=null;}if(this._oOkButton){this._oOkButton.destroy();this._oOkButton=null;}this._oSelectedItem=null;this._aSelectedItems=null;this._aInitiallySelectedItems=null;this._table=null;this._searchField=null;this._dialog=null;};a.prototype.onAfterRendering=function(){if(this._bInitBusy&&this._bFirstRender){this._setBusy(true);this._bInitBusy=false;this._bFirstRender=false;}return this;};a.prototype.invalidate=function(){if(this._oDialog&&(!arguments[0]||arguments[0]&&arguments[0].getId()!==this.getId()+"-dialog")){this._oDialog.invalidate(arguments);}else{C.prototype.invalidate.apply(this,arguments);}return this;};a.prototype.open=function(s){if(!this.getParent()&&!this._bAppendedToUIArea){var o=sap.ui.getCore().getStaticAreaRef();o=sap.ui.getCore().getUIArea(o);o.addContent(this,true);this._bAppendedToUIArea=true;}this._bFirstRequest=true;this._oSearchField.setValue(s);this._oDialog.open();if(this._bInitBusy){this._setBusy(true);}this._aInitiallySelectedItems=this._oTable.getSelectedItems();this._updateSelectionIndicator();return this;};a.prototype.setGrowingThreshold=function(v){this._oTable.setGrowingThreshold(v);this.setProperty("growingThreshold",v,true);return this;};a.prototype.setMultiSelect=function(m){this.setProperty("multiSelect",m,true);if(m){this._oTable.setMode(sap.m.ListMode.MultiSelect);this._oTable.setIncludeItemInSelection(true);this._oDialog.setRightButton(this._getCancelButton());this._oDialog.setLeftButton(this._getOkButton());}else{this._oTable.setMode(sap.m.ListMode.SingleSelectMaster);this._oDialog.setLeftButton(this._getCancelButton());}return this;};a.prototype.setTitle=function(t){this.setProperty("title",t,true);this._oDialog.setTitle(t);return this;};a.prototype.setNoDataText=function(n){this._oTable.setNoDataText(n);return this;};a.prototype.getNoDataText=function(){return this._oTable.getNoDataText();};a.prototype.getContentWidth=function(){return this._oDialog.getContentWidth();};a.prototype.setContentWidth=function(w){this._oDialog.setContentWidth(w);return this;};a.prototype.getContentHeight=function(){return this._oDialog.getContentHeight();};a.prototype.setContentHeight=function(h){this._oDialog.setContentHeight(h);return this;};a.prototype.addStyleClass=function(){this._oDialog.addStyleClass.apply(this._oDialog,arguments);return this;};a.prototype.removeStyleClass=function(){this._oDialog.removeStyleClass.apply(this._oDialog,arguments);return this;};a.prototype.toggleStyleClass=function(){this._oDialog.toggleStyleClass.apply(this._oDialog,arguments);return this;};a.prototype.hasStyleClass=function(){return this._oDialog.hasStyleClass.apply(this._oDialog,arguments);};a.prototype.getDomRef=function(){if(this._oDialog){return this._oDialog.getDomRef.apply(this._oDialog,arguments);}else{return null;}};a.prototype._setModel=a.prototype.setModel;a.prototype.setModel=function(m,M){var A=Array.prototype.slice.call(arguments);this._setBusy(false);this._bInitBusy=false;this._iTableUpdateRequested+=1;this._oTable.attachUpdateStarted(this._updateStarted,this);this._oTable.attachUpdateFinished(this._updateFinished,this);this._oTable.setModel(m,M);a.prototype._setModel.apply(this,A);this._updateSelectionIndicator();return this;};a.prototype._callMethodInManagedObject=function(f,A){var b=Array.prototype.slice.call(arguments);if(A==="items"){return this._oTable[f].apply(this._oTable,b.slice(1));}else if(A==="columns"){return this._oTable[f].apply(this._oTable,b.slice(1));}else{return sap.ui.base.ManagedObject.prototype[f].apply(this,b.slice(1));}};a.prototype.bindAggregation=function(){var b=Array.prototype.slice.call(arguments);this._callMethodInManagedObject.apply(this,["bindAggregation"].concat(b));return this;};a.prototype.validateAggregation=function(A,o,m){return this._callMethodInManagedObject("validateAggregation",A,o,m);};a.prototype.setAggregation=function(A,o,s){this._callMethodInManagedObject("setAggregation",A,o,s);return this;};a.prototype.getAggregation=function(A,d){return this._callMethodInManagedObject("getAggregation",A,d);};a.prototype.indexOfAggregation=function(A,o){return this._callMethodInManagedObject("indexOfAggregation",A,o);};a.prototype.insertAggregation=function(A,o,i,s){this._callMethodInManagedObject("insertAggregation",A,o,i,s);return this;};a.prototype.addAggregation=function(A,o,s){this._callMethodInManagedObject("addAggregation",A,o,s);return this;};a.prototype.removeAggregation=function(A,o,s){this._callMethodInManagedObject("removeAggregation",A,o,s);return this;};a.prototype.removeAllAggregation=function(A,s){return this._callMethodInManagedObject("removeAllAggregation",A,s);};a.prototype.destroyAggregation=function(A,s){this._callMethodInManagedObject("destroyAggregation",A,s);return this;};a.prototype.getBinding=function(A){return this._callMethodInManagedObject("getBinding",A);};a.prototype.getBindingInfo=function(A){return this._callMethodInManagedObject("getBindingInfo",A);};a.prototype.getBindingPath=function(A){return this._callMethodInManagedObject("getBindingPath",A);};a.prototype.getBindingContext=function(m){return this._oTable.getBindingContext(m);};a.prototype._setBindingContext=a.prototype.setBindingContext;a.prototype.setBindingContext=function(c,m){var b=Array.prototype.slice.call(arguments);this._oTable.setBindingContext(c,m);a.prototype._setBindingContext.apply(this,b);return this;};a.prototype._executeSearch=function(v,e){var t=this._oTable,b=(t?t.getBinding("items"):undefined),s=(this._sSearchFieldValue!==v);if(this._oDialog.isOpen()&&((s&&e==="liveChange")||e==="search")){this._sSearchFieldValue=v;if(b){this._iTableUpdateRequested+=1;if(e==="search"){this.fireSearch({value:v,itemsBinding:b});}else if(e==="liveChange"){this.fireLiveChange({value:v,itemsBinding:b});}}else{if(e==="search"){this.fireSearch({value:v});}else if(e==="liveChange"){this.fireLiveChange({value:v});}}}return this;};a.prototype._setBusy=function(b){if(this._iTableUpdateRequested){if(b){if(this._bFirstRequest){this._oSubHeader.$().css('display','none');}this._oTable.addStyleClass('sapMSelectDialogListHide');this._oBusyIndicator.$().css('display','inline-block');}else{if(this._bFirstRequest){this._oSubHeader.$().css('display','block');}this._oTable.removeStyleClass('sapMSelectDialogListHide');this._oBusyIndicator.$().css('display','none');}}};a.prototype._updateStarted=function(e){if(this.getModel()&&this.getModel()instanceof sap.ui.model.odata.ODataModel){if(this._oDialog.isOpen()&&this._iTableUpdateRequested){this._setBusy(true);}else{this._bInitBusy=true;}}};a.prototype._updateFinished=function(e){this._updateSelectionIndicator();if(this.getModel()&&this.getModel()instanceof sap.ui.model.odata.ODataModel){this._setBusy(false);this._bInitBusy=false;}if(sap.ui.Device.system.desktop){if(this._oTable.getItems()[0]){this._oDialog.setInitialFocus(this._oTable.getItems()[0]);}else{this._oDialog.setInitialFocus(this._oSearchField);}if(this._bFirstRequest){var f=this._oTable.getItems()[0];if(!f){f=this._oSearchField;}if(f.getFocusDomRef()){f.getFocusDomRef().focus();}}}this._bFirstRequest=false;this._iTableUpdateRequested=0;};a.prototype._getOkButton=function(){var t=this,o=null;o=function(){t._oSelectedItem=t._oTable.getSelectedItem();t._aSelectedItems=t._oTable.getSelectedItems();t._oDialog.detachAfterClose(o);t._fireConfirmAndUpdateSelection();};if(!this._oOkButton){this._oOkButton=new B(this.getId()+"-ok",{text:this._oRb.getText("MSGBOX_OK"),press:function(){t._oDialog.attachAfterClose(o);t._oDialog.close();}});}return this._oOkButton;};a.prototype._getCancelButton=function(){var t=this;if(!this._oCancelButton){this._oCancelButton=new B(this.getId()+"-cancel",{text:this._oRb.getText("MSGBOX_CANCEL"),press:function(){t._onCancel();}});}return this._oCancelButton;};a.prototype._onCancel=function(e){var t=this,A=null;A=function(){t._oSelectedItem=null;t._aSelectedItems=[];t._sSearchFieldValue=null;t._oDialog.detachAfterClose(A);t.fireCancel();t._resetSelection();};this._oDialog.attachAfterClose(A);this._oDialog.close();};a.prototype._updateSelectionIndicator=function(){var s=this._oTable.getSelectedContexts(true).length,i=this._oTable.getInfoToolbar();i.setVisible(!!s);i.getContent()[0].setText(this._oRb.getText("TABLESELECTDIALOG_SELECTEDITEMS",[s]));};a.prototype._fireConfirmAndUpdateSelection=function(){this.fireConfirm({selectedItem:this._oSelectedItem,selectedItems:this._aSelectedItems,selectedContexts:this._oTable.getSelectedContexts(true)});this._updateSelection();};a.prototype._updateSelection=function(){if(!this.getRememberSelections()&&!this.bIsDestroyed){this._oTable.removeSelections(true);delete this._oSelectedItem;delete this._aSelectedItems;}};a.prototype._resetSelection=function(){var i=0;if(!this.bIsDestroyed){this._oTable.removeSelections();for(;i<this._aInitiallySelectedItems.length;i++){this._oTable.setSelectedItem(this._aInitiallySelectedItems[i]);}}};return a;},true);
