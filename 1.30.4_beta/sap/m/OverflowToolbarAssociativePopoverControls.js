/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/base/Metadata'],function(q,M){"use strict";var O=M.createClass("sap.m._overflowToolbarHelpers.OverflowToolbarAssociativePopoverControls",{constructor:function(){this._mControlsCache={};}});O.prototype._preProcessSapMButton=function(c){this._mControlsCache[c.getId()]={buttonType:c.getType()};if(c.getType()===sap.m.ButtonType.Transparent){c.setProperty("type",sap.m.ButtonType.Default,true);}if(c.getIcon()){c.addStyleClass("sapMOTAPButtonWithIcon");}else{c.addStyleClass("sapMOTAPButtonNoIcon");}c.attachEvent("_change",this._onSapMButtonUpdated,this);};O.prototype._postProcessSapMButton=function(c){var p=this._mControlsCache[c.getId()];if(c.getType()!==p.buttonType){c.setProperty("type",p.buttonType,true);}c.removeStyleClass("sapMOTAPButtonNoIcon");c.removeStyleClass("sapMOTAPButtonWithIcon");c.detachEvent("_change",this._onSapMButtonUpdated,this);};O.prototype._onSapMButtonUpdated=function(e){var p=e.getParameter("name"),b=e.getSource(),B=b.getId();if(typeof this._mControlsCache[B]==="undefined"){return;}if(p==="type"){this._mControlsCache[B]["buttonType"]=b.getType();}};O.prototype._preProcessSapMOverflowToolbarButton=function(c){this._preProcessSapMButton(c);c._bInOverflow=true;};O.prototype._postProcessSapMOverflowToolbarButton=function(c){delete c._bInOverflow;this._postProcessSapMButton(c);};O.prototype._preProcessSapMToggleButton=function(c){this._preProcessSapMButton(c);};O.prototype._postProcessSapMToggleButton=function(c){this._postProcessSapMButton(c);};O.prototype._preProcessSapMSegmentedButton=function(c){c._toSelectMode();};O.prototype._postProcessSapMSegmentedButton=function(c){c._toNormalMode();};O.prototype._preProcessSapMSelect=function(c){this._mControlsCache[c.getId()]={selectType:c.getType()};if(c.getType()!==sap.m.SelectType.Default){c.setProperty("type",sap.m.SelectType.Default,true);}};O.prototype._postProcessSapMSelect=function(c){var p=this._mControlsCache[c.getId()];if(c.getType()!==p.selectType){c.setProperty("type",p.selectType,true);}};O._mSupportedControls={"sap.m.Button":{canOverflow:true,listenForEvents:["press"],noInvalidationProps:["enabled","type"]},"sap.m.OverflowToolbarButton":{canOverflow:true,listenForEvents:["press"],noInvalidationProps:["enabled","type"]},"sap.m.CheckBox":{canOverflow:true,listenForEvents:["select"],noInvalidationProps:["enabled","selected"]},"sap.m.ToggleButton":{canOverflow:true,listenForEvents:["press"],noInvalidationProps:["enabled","pressed"]},"sap.m.Select":{canOverflow:true,listenForEvents:["change"],noInvalidationProps:["enabled","selectedItemId","selectedKey"]},"sap.m.ComboBox":{canOverflow:true,listenForEvents:[],noInvalidationProps:["enabled","value","selectedItemId","selectedKey"]},"sap.m.SearchField":{canOverflow:true,listenForEvents:["search"],noInvalidationProps:["enabled","value"]},"sap.m.SegmentedButton":{canOverflow:true,listenForEvents:["select"],noInvalidationProps:["enabled","selectedKey"]},"sap.m.Input":{canOverflow:true,listenForEvents:[],noInvalidationProps:["enabled","value"]},"sap.m.DateTimeInput":{canOverflow:true,listenForEvents:["change"],noInvalidationProps:["enabled","value","dateValue"]},"sap.m.RadioButton":{canOverflow:false,listenForEvents:[],noInvalidationProps:["enabled","selected"]}};O.getControlConfig=function(c){if(typeof c==="object"){c=c.getMetadata().getName();}return O._mSupportedControls[c];};O.supportsControl=function(c){if(typeof c==="object"){c=c.getMetadata().getName();}var C=O._mSupportedControls[c];return typeof C!=="undefined"&&C.canOverflow;};return O;},false);
