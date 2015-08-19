/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./library','sap/ui/core/Control','sap/ui/core/format/DateFormat','sap/ui/core/format/NumberFormat'],function(q,a,C,D,N){"use strict";var P=C.extend("sap.m.P13nConditionPanel",{metadata:{library:"sap.m",properties:{maxConditions:{type:"string",group:"Misc",defaultValue:'-1'},exclude:{type:"boolean",group:"Misc",defaultValue:false},containerQuery:{type:"boolean",group:"Misc",defaultValue:false},autoAddNewRow:{type:"boolean",group:"Misc",defaultValue:false},disableFirstRemoveIcon:{type:"boolean",group:"Misc",defaultValue:false},alwaysShowAddIcon:{type:"boolean",group:"Misc",defaultValue:true},usePrevConditionSetting:{type:"boolean",group:"Misc",defaultValue:true},autoReduceKeyFieldItems:{type:"boolean",group:"Misc",defaultValue:false},layoutMode:{type:"string",group:"Misc",defaultValue:null},showLabel:{type:"boolean",group:"Misc",defaultValue:false},displayFormat:{type:"string",group:"Misc",defaultValue:null}},aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content",visibility:"hidden"}},events:{dataChange:{}}}});P.prototype.setConditions=function(c){if(!c){q.sap.log.error("sap.m.P13nConditionPanel : aCondition is not defined");}if(this._bIgnoreSetConditions){return;}this._oConditionsMap={};this._iConditions=0;for(var i=0;i<c.length;i++){this._addCondition2Map(c[i]);}this._clearConditions();this._fillConditions();};P.prototype.removeAllConditions=function(){this._oConditionsMap={};this._iConditions=0;this._clearConditions();this._fillConditions();};P.prototype.addCondition=function(c){if(this._bIgnoreSetConditions){return;}c.index=this._iConditions;this._addCondition2Map(c);this._addCondition(c);};P.prototype.insertCondition=function(c,i){if(this._bIgnoreSetConditions){return;}if(i!==undefined){c.index=i;}this._addCondition2Map(c);this._addCondition(c);};P.prototype.removeCondition=function(c){this._clearConditions();if(typeof(c)=="string"){delete this._oConditionsMap[c];}if(typeof(c)=="object"){delete this._oConditionsMap[c.key];}this._fillConditions();};P.prototype._addCondition2Map=function(c){if(!c.key){c.key="condition_"+this._iConditions;if(this.getExclude()){c.key="x"+c.key;}}this._iConditions++;this._oConditionsMap[c.key]=c;};P.prototype.getConditions=function(){var c;var b=[];if(this._oConditionsMap){for(var d in this._oConditionsMap){c=this._oConditionsMap[d];var v=c.value;if(!v){v=this._getFormatedConditionText(c.operation,c.value1,c.value2,c.exclude,c.keyField,c.showIfGrouped);}if(!c._oGrid||c._oGrid.select.getSelected()){b.push({"key":d,"text":v,"exclude":c.exclude,"operation":c.operation,"keyField":c.keyField,"value1":c.value1,"value2":c.value2,"showIfGrouped":c.showIfGrouped});}}}return b;};P.prototype.setOperations=function(o,t){t=t||"default";this._oTypeOperations[t]=o;this._updateOperations();};P.prototype.addOperation=function(o,t){t=t||"default";this._oTypeOperations[t].push(o);this._updateOperations();};P.prototype.removeAllOperations=function(t){t=t||"default";this._oTypeOperations[t]=[];this._updateOperations();};P.prototype.getOperations=function(t){t=t||"default";return this._oTypeOperations[t];};P.prototype.setKeyFields=function(k){this._aKeyFields=k;this._updateKeyFieldItems(this._oConditionsGrid,true);this._updateKeyFields();};P.prototype.addKeyField=function(k){this._aKeyFields.push(k);this._updateKeyFieldItems(this._oConditionsGrid,true,true);this._enableConditions();this._updateKeyFields();this._updateOperations();};P.prototype.removeAllKeyFields=function(){this._aKeyFields=[];this._updateKeyFieldItems(this._oConditionsGrid,true);};P.prototype.getKeyFields=function(){return this._aKeyFields;};P.prototype.setAlwaysShowAddIcon=function(e){this.setProperty("alwaysShowAddIcon",e);if(this._oConditionsGrid){this._oConditionsGrid.toggleStyleClass("conditionRootGrid",this.getLayoutMode()!=="Desktop"&&!this.getAlwaysShowAddIcon());}return this;};P.prototype.setLayoutMode=function(l){this.setProperty("layoutMode",l);if(this._oConditionsGrid){this._oConditionsGrid.toggleStyleClass("conditionRootGrid",l!=="Desktop"&&!this.getAlwaysShowAddIcon());}this._updateConditionFieldSpans(l);this._clearConditions();this._fillConditions();return this;};P.prototype._updateConditionFieldSpans=function(m){if(this._aConditionsFields){var d=m==="Desktop";if(d){this._aConditionsFields[1].Span="L1 M1 S1";this._aConditionsFields[2].Span="L3 M3 S3";this._aConditionsFields[3].Span="L1 M1 S1";this._aConditionsFields[4].Span="L2 M2 S2";this._aConditionsFields[5].Span="L3 M3 S3";this._aConditionsFields[6].Span="L2 M2 S2";this._aConditionsFields[7].Span="L1 M1 S1";}var t=m==="Tablet";if(t){this._aConditionsFields[1].Span="L1 M1 S1";this._aConditionsFields[2].Span="L5 M5 S5";this._aConditionsFields[3].Span="L1 M1 S1";this._aConditionsFields[4].Span="L5 M5 S5";this._aConditionsFields[5].Span="L10 M10 S10";this._aConditionsFields[6].Span="L10 M10 S10";this._aConditionsFields[7].Span="L1 M1 S1";}}};P.prototype.init=function(){sap.ui.getCore().loadLibrary("sap.ui.layout");q.sap.require("sap.ui.layout.Grid");sap.ui.layout.Grid.prototype.init.apply(this);this.addStyleClass("sapMConditionPanel");this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._sBetweenOperation=this._oRb.getText("CONDITIONPANEL_OPTIONBT");this._sInitialOperation=this._oRb.getText("CONDITIONPANEL_OPTIONInitial");this._sFromLabelText=this._oRb.getText("CONDITIONPANEL_LABELFROM");this._sToLabelText=this._oRb.getText("CONDITIONPANEL_LABELTO");this._sValueLabelText=this._oRb.getText("CONDITIONPANEL_LABELVALUE");this._sShowIfGroupedLabelText=this._oRb.getText("CONDITIONPANEL_LABELGROUPING");this._sValidationDialogFieldMessage=this._oRb.getText("CONDITIONPANEL_FIELDMESSAGE");this._oTypeOperations={"default":[]};this._aKeyFields=[];this._oConditionsMap={};this._iConditions=0;this._sLayoutMode="Desktop";this._iBreakPointTablet=sap.ui.Device.media._predefinedRangeSets[sap.ui.Device.media.RANGESETS.SAP_STANDARD].points[0];this._iBreakPointDesktop=sap.ui.Device.media._predefinedRangeSets[sap.ui.Device.media.RANGESETS.SAP_STANDARD].points[1];this._oConditionsGrid=new sap.ui.layout.Grid({width:"100%",defaultSpan:"L12 M12 S12",hSpacing:0,vSpacing:0}).toggleStyleClass("conditionRootGrid",this.getLayoutMode()!=="Desktop"&&!this.getAlwaysShowAddIcon());this.addAggregation("content",this._oConditionsGrid);this._aConditionsFields=[{"ID":"select","Label":"","Span":"L1 M1 S1","Control":"CheckBox","Value":""},{"ID":"keyFieldLabel","Text":"Sort By","Span":"L1 M1 S1","Control":"Label"},{"ID":"keyField","Label":"","Span":"L3 M5 S10","Control":"ComboBox","SelectedKey":"0"},{"ID":"operationLabel","Text":"Sort Order","Span":"L1 M1 S1","Control":"Label"},{"ID":"operation","Label":"","Span":"L2 M5 S10","Control":"ComboBox","SelectedKey":"0"},{"ID":"value1","Label":this._sFromLabelText,"Span":"L3 M10 S10","Control":"TextField","Value":""},{"ID":"value2","Label":this._sToLabelText,"Span":"L2 M10 S10","Control":"TextField","Value":""},{"ID":"showIfGrouped","Label":this._sShowIfGroupedLabelText,"Span":"L1 M10 S10","Control":"CheckBox","Value":"false"}];this._updateConditionFieldSpans(this.getLayoutMode());this._fillConditions();};P.prototype.exit=function(){if(this._sContainerResizeListener){sap.ui.core.ResizeHandler.deregister(this._sContainerResizeListener);this._sContainerResizeListener=null;}sap.ui.Device.media.detachHandler(this._handleMediaChange,this,sap.ui.Device.media.RANGESETS.SAP_STANDARD);this._aConditionsFields=null;this._aKeys=null;this._aKeyFields=null;this._oTypeOperations=null;this._oRb=null;this._sBetweenOperation=null;this._sInitialOperation=null;this._sFromLabelText=null;this._sToLabelText=null;this._sValueLabelText=null;this._sValidationDialogFieldMessage=null;this._oConditionsMap=null;};P.prototype._clearConditions=function(){this._oConditionsGrid.removeAllContent();};P.prototype._fillConditions=function(){var i=0;var c;var m=this._getMaxConditionsAsNumber();if(this._oConditionsMap){for(var b in this._oConditionsMap){c=this._oConditionsMap[b];if(i<m){this._createConditionRow(this._oConditionsGrid,c,b);}else{break;}i++;}}if((this.getAutoAddNewRow()||this._oConditionsGrid.getContent().length===0)&&this._oConditionsGrid.getContent().length<m){this._createConditionRow(this._oConditionsGrid);}};P.prototype._addCondition=function(c){var i=0;var m=this._getMaxConditionsAsNumber();if(this._oConditionsMap){for(var b in this._oConditionsMap){if(i<m&&c===this._oConditionsMap[b]){this._createConditionRow(this._oConditionsGrid,c,b,i);}i++;}}};P.prototype._getMaxConditionsAsNumber=function(){return this.getMaxConditions()==="-1"?1000:parseInt(this.getMaxConditions(),10);};P.prototype.onAfterRendering=function(){if(this.getLayoutMode()){this._sLayoutMod=this.getLayoutMode();return;}if(this.getContainerQuery()){this._sContainerResizeListener=sap.ui.core.ResizeHandler.register(this._oConditionsGrid,q.proxy(this._onGridResize,this));this._onGridResize();}else{sap.ui.Device.media.attachHandler(this._handleMediaChange,this,sap.ui.Device.media.RANGESETS.SAP_STANDARD);}};P.prototype.onBeforeRendering=function(){this._cleanup();};P.prototype._handeMediaChange=function(p){this._sLayoutMode=p.name;this._updateLayout(p);};P.prototype._cleanup=function(){if(this._sContainerResizeListener){sap.ui.core.ResizeHandler.deregister(this._sContainerResizeListener);this._sContainerResizeListener=null;}sap.ui.Device.media.detachHandler(this._handleMediaChange,this,sap.ui.Device.media.RANGESETS.SAP_STANDARD);};P.prototype._getKeyFromConditionGrid=function(c){var k=c.data("_key");if(!k){k=this._createConditionKey();}return k;};P.prototype._createConditionKey=function(){var i=0;var k;do{k="condition_"+i;if(this.getExclude()){k="x"+k;}i++;}while(this._oConditionsMap[k]);return k;};P.prototype._createConditionRow=function(t,c,k,p){var b=null;var g;var d=this;if(p===undefined){p=t.getContent().length;}var o=new sap.ui.layout.Grid({width:"100%",defaultSpan:"L12 M12 S12",hSpacing:1,vSpacing:0,containerQuery:this.getContainerQuery()}).data("_key",k);for(var f in this._aConditionsFields){var e;var h=this._aConditionsFields[f];switch(h["Control"]){case"CheckBox":e=new sap.m.CheckBox({enabled:false,visible:false,layoutData:new sap.ui.layout.GridData({span:h["Span"]})});if(h["ID"]==="showIfGrouped"){e.setEnabled(true);e.setText(h["Label"]);e.attachSelect(function(){d._changeField(o);});if(typeof c!=="undefined"){e.setSelected(c.showIfGrouped);}else{if(this.getUsePrevConditionSetting()){if(p>0){g=t.getContent()[p-1];e.setSelected(g.showIfGrouped.getSelected());}}}}else{if(typeof c!=="undefined"){e.setSelected(true);e.setEnabled(true);}}break;case"ComboBox":if(h["ID"]==="keyField"){e=new sap.m.Select({selectedKey:h["SelectedKey"],width:"100%",layoutData:new sap.ui.layout.GridData({span:h["Span"]})});this._fillKeyFieldListItems(e,this._aKeyFields);e.attachChange(function(){d._triggerChangeKeyfield(t,o);});if(typeof c!=="undefined"){e.setSelectedKey(c.keyField);this._aKeyFields.forEach(function(K,j){var l=K.key;if(l===undefined){l=K;}if(c.keyField===l){e.setSelectedItem(e.getItems()[j]);}},this);}else{if(this.getUsePrevConditionSetting()&&!this.getAutoReduceKeyFieldItems()){if(p>0&&k===null){g=t.getContent()[p-1];e.setSelectedKey(g.keyField.getSelectedKey());}else{e.setSelectedItem(e.getItems()[0]);this._aKeyFields.forEach(function(K,j){if(K.isDefault){e.setSelectedItem(e.getItems()[j]);}},this);}}else{this._aKeyFields.forEach(function(K,j){if(K.isDefault){e.setSelectedItem(e.getItems()[j]);}},this);}}}if(h["ID"]==="operation"){e=new sap.m.Select({selectedKey:h["SelectedKey"],width:"100%",layoutData:new sap.ui.layout.GridData({span:h["Span"]})});e.attachChange(function(){d._triggerChangeOperations(t,o);});o[h["ID"]]=e;this._updateOperation(t,o);if(typeof c!=="undefined"){var K=this._getCurrentKeyField(o.keyField);var O=this._oTypeOperations["default"];if(K){if(K.type&&this._oTypeOperations[K.type]){O=this._oTypeOperations[K.type];}}O.forEach(function(j,l){if(c.operation===j){e.setSelectedItem(e.getItems()[l]);}},this);}else{if(this.getUsePrevConditionSetting()){if(p>0&&k===null){var g=t.getContent()[p-1];e.setSelectedKey(g.operation.getSelectedKey());}}}}if(e.getSelectedItem()){e.setTooltip(e.getSelectedItem().getTooltip()||e.getSelectedItem().getText());}break;case"TextField":var i=this._getCurrentKeyField(o.keyField);e=this._createField(i,h,o);e.oTargetGrid=t;if(typeof c!=="undefined"){if(typeof c[h["ID"]]!=="undefined"){var v=c[h["ID"]];var V;if(typeof v==="string"&&o.oFormatter){V=o.oFormatter.parse(v);}else{V=v;}if(!isNaN(V)&&V!==null&&o.oFormatter){v=o.oFormatter.format(V);e.setValue(v);}else{e.setValue(V);}}}break;case"Label":e=new sap.m.Label({text:h["Text"]+":",visible:this.getShowLabel(),layoutData:new sap.ui.layout.GridData({span:h["Span"]})}).addStyleClass("conditionLabel");e.oTargetGrid=t;break;}o[h["ID"]]=e;o.addContent(e);}b=new sap.ui.layout.HorizontalLayout({layoutData:new sap.ui.layout.GridData({span:this.getLayoutMode()==="Desktop"?"L2 M2 S2":"L2 M2 S2"})});o.addContent(b);o["ButtonContainer"]=b;var r=new sap.m.Button({type:sap.m.ButtonType.Transparent,icon:sap.ui.core.IconPool.getIconURI("sys-cancel"),press:function(){d._triggerRemoveCondition(this.oTargetGrid,o);},layoutData:new sap.ui.layout.GridData({span:this.getLayoutMode()==="Desktop"?"L1 M1 S1":"L1 M2 S2"})});r.oTargetGrid=t;b.addContent(r);o["remove"]=r;var A=new sap.m.Button({type:sap.m.ButtonType.Transparent,icon:sap.ui.core.IconPool.getIconURI("add"),tooltip:this._oRb.getText("CONDITIONPANEL_ADD_TOOLTIP"),press:function(){d._triggerAddCondition(this.oTargetGrid,o);},layoutData:new sap.ui.layout.GridData({span:this.getLayoutMode()==="Desktop"?"L1 M1 S1":"L1 M10 S10"})});A.oTargetGrid=t;A.addStyleClass("conditionAddBtnFloatRight");b.addContent(A);o["add"]=A;t.insertContent(o,p);this._updateOperation(t,o);this._changeOperation(t,o);this._enableConditions();this._updateConditionButtons(t);if(this.getAutoReduceKeyFieldItems()){this._updateKeyFieldItems(t,false);}if(this._sLayoutMode){this._updateLayout({name:this._sLayoutMode});}if(typeof c!=="undefined"){var s=this._getFormatedConditionText(c.operation,c.value1,c.value2,c.exclude,c.keyField,c.showIfGrouped);c._oGrid=o;c.value=s;this._oConditionsMap[k]=c;}return o;};P.prototype._triggerRemoveCondition=function(t,c){var i=t.getContent().indexOf(c);this._removeCondition(t,c);if(this.getAutoReduceKeyFieldItems()){this._updateKeyFieldItems(t,false);}if(i>=0){i=Math.min(i,t.getContent().length-1);var c=t.getContent()[i];setTimeout(function(){c.remove.focus();});}};P.prototype._triggerAddCondition=function(t,s){var p=t.getContent().indexOf(s);var c=this._createConditionRow(t,undefined,null,p+1);this._changeField(c);setTimeout(function(){c.keyField.focus();});};P.prototype._getCurrentKeyField=function(k){var K=k.getSelectedKey();var i=this._aKeyFields;for(var I in i){var o=i[I];if(o.key===K){return o;}}return null;};P.prototype._createField=function(c,f,o){var b;var s=c?c.type:"";var t=this;var p={value:f["Value"],width:"100%",placeholder:f["Label"],change:function(){t._changeField(o);},layoutData:new sap.ui.layout.GridData({span:f["Span"]})};switch(s){case"numeric":var F;if(c.precision||c.scale){F={};if(c.precision){F["maxIntegerDigits"]=parseInt(c.precision,10);}if(c.scale){F["maxFractionDigits"]=parseInt(c.scale,10);}}o.oFormatter=N.getFloatInstance(F);b=new sap.m.Input(p);break;case"date":o.oFormatter=D.getDateInstance();b=new sap.m.DatePicker(p);break;default:o.oFormatter=null;b=new sap.m.Input(p);}if(c&&c.maxLength&&b.setMaxLength){var l=-1;if(typeof c.maxLength==="string"){l=parseInt(c.maxLength,10);}if(typeof c.maxLength==="number"){l=c.maxLength;}if(l>0){b.setMaxLength(l);}}return b;};P.prototype._fillOperationItems=function(s,o,t){s.removeAllItems();if(t==="_STRING_"){t="";}for(var O in o){var T=this._oRb.getText("CONDITIONPANEL_OPTION"+t+o[O]);s.addItem(new sap.ui.core.ListItem({text:T,tooltip:T,key:o[O]}));}};P.prototype._fillKeyFieldListItems=function(s,i){s.removeAllItems();for(var I in i){var o=i[I];s.addItem(new sap.ui.core.ListItem({key:o.key,text:o.text,tooltip:o.tooltip?o.tooltip:o.text}));}};P.prototype._triggerChangeOperations=function(t,c){this._changeOperation(t,c);this._changeField(c);};P.prototype._triggerChangeKeyfield=function(t,c){this._updateOperation(t,c);this._updateValueFields(t,c);this._changeOperation(t,c);this._changeField(c);if(this.getAutoReduceKeyFieldItems()){this._updateKeyFieldItems(t,false);}};P.prototype._updateKeyFields=function(){var c=this._oConditionsGrid.getContent();c.forEach(function(o){this._updateValueFields(this._oConditionsGrid,o);this._changeOperation(this._oConditionsGrid,o);},this);};P.prototype._updateValueFields=function(t,c){var o=this._getCurrentKeyField(c.keyField);var f=function(b,i){var c=b.getParent();var O=b.getValue();var d=c.indexOfContent(b);c.removeContent(b);var e=this._aConditionsFields[i];b=this._createField(o,e,c);c[e["ID"]]=b;c.insertContent(b,d);var v,V;if(c.oFormatter&&O){v=c.oFormatter.parse(O);if(!isNaN(v)&&v!==null){V=c.oFormatter.format(v);b.setValue(V);}}if(!V){b.setValue(O);}};q.proxy(f,this)(c.value1,5);q.proxy(f,this)(c.value2,6);};P.prototype._updateOperations=function(){var c=this._oConditionsGrid.getContent();c.forEach(function(o){this._updateOperation(this._oConditionsGrid,o);this._changeOperation(this._oConditionsGrid,o);},this);};P.prototype._updateOperation=function(t,c){var T="";var k=this._getCurrentKeyField(c.keyField);var o=this._oTypeOperations["default"];if(k&&!this.getExclude()){if(k.type&&k.type==="string"&&this._oTypeOperations["string"]){T=k.type;o=this._oTypeOperations[T];}if(k.type&&k.type==="numeric"&&this._oTypeOperations["numeric"]){T=k.type;o=this._oTypeOperations[T];}if(k.type&&k.type==="date"&&this._oTypeOperations["date"]){T=k.type;o=this._oTypeOperations[T];}if(k.operations){o=k.operations;}}var s=c.operation.getSelectedItem();this._fillOperationItems(c.operation,o,T?"_"+T.toUpperCase()+"_":"");if(s){c.operation.setSelectedKey(s.getKey());}else{c.operation.setSelectedItem(c.operation.getItems()[0]);}};P.prototype._updateKeyFieldItems=function(t,f,A){var n=t.getContent().length;var i;var u={};if(!f){for(i=0;i<n;i++){var k=t.getContent()[i].keyField;var K=k.getSelectedKey();if(K!=null&&K!==""){u[K]=true;}}}var h=function(c,d){if(c.isDefault){k.setSelectedItem(k.getItems()[d]);}};for(i=0;i<n;i++){var k=t.getContent()[i].keyField;var s=t.getContent()[i].select;var o=k.getSelectedKey();var j=0;var I=this._aKeyFields;if(A){j=I.length-1;}else{k.removeAllItems();}for(j;j<I.length;j++){var b=I[j];if(b.key==null||b.key===""||!u[b.key]||b.key===o){k.addItem(new sap.ui.core.ListItem({key:b.key,text:b.text,tooltip:b.tooltip?b.tooltip:b.text}));}}if(o){k.setSelectedKey(o);}else if(k.getItems().length>0){k.setSelectedItem(k.getItems()[0]);}if(!s.getSelected()){this._aKeyFields.forEach(h,this);}if(k.getSelectedItem()){k.setTooltip(k.getSelectedItem().getTooltip()||k.getSelectedItem().getText());}}};P.prototype._changeOperation=function(t,c){var k=c.keyField;var o=c.operation;var O=o.getSelectedKey();var v=c.value1;var V=c.value2;var s=c.showIfGrouped;if(!O){return;}if(O===sap.m.P13nConditionOperation.BT){v.setPlaceholder(this._sFromLabelText);v.setVisible(true);V.setPlaceholder(this._sToLabelText);V.setVisible(true);}else{if(O===sap.m.P13nConditionOperation.GroupAscending||O===sap.m.P13nConditionOperation.GroupDescending){v.setVisible(false);V.setVisible(false);o.setVisible(false);s.setVisible(this._getMaxConditionsAsNumber()!=1);k.getLayoutData().setSpan("L5 M5 S5");o.getLayoutData().setSpan("L4 M4 S4");s.getLayoutData().setSpan("L4 M4 S4");}else{if(O===sap.m.P13nConditionOperation.Initial||O===sap.m.P13nConditionOperation.Ascending||O===sap.m.P13nConditionOperation.Descending||O===sap.m.P13nConditionOperation.Total||O===sap.m.P13nConditionOperation.Average||O===sap.m.P13nConditionOperation.Minimum||O===sap.m.P13nConditionOperation.Maximum){v.setVisible(false);V.setVisible(false);if(O!==sap.m.P13nConditionOperation.Initial){var S=this.getShowLabel()?4:5;if(this.getLayoutMode()==="Desktop"){k.getLayoutData().setSpan("L5 M5 S5");o.getLayoutData().setSpan("L4 M4 S4");}else{k.getLayoutData().setSpanL(S);o.getLayoutData().setSpanL(S-1);}}}else{v.setPlaceholder(this._sValueLabelText);v.setVisible(true);V.setVisible(false);}}}};P.prototype._changeField=function(c){var k=c.keyField.getSelectedKey();if(c.keyField.getSelectedItem()){c.keyField.setTooltip(c.keyField.getSelectedItem().getTooltip()||c.keyField.getSelectedItem().getText());}var o=c.operation.getSelectedKey();if(c.operation.getSelectedItem()){c.operation.setTooltip(c.operation.getSelectedItem().getTooltip()||c.operation.getSelectedItem().getText());}var f=function(i){var c=i.getParent();var g=i.getValue();if(this.getDisplayFormat()==="UpperCase"&&g){g=g.toUpperCase();i.setValue(g);}if(c.oFormatter&&g){var j=c.oFormatter.parse(g);if(!isNaN(j)&&j!==null){g=c.oFormatter.format(j);i.setValue(g);i.setValueState(sap.ui.core.ValueState.None);}else{i.setValueState(sap.ui.core.ValueState.Warning);i.setValueStateText(this._sValidationDialogFieldMessage);}}};q.proxy(f,this)(c.value1);var v=c.value1.getValue();var V=v;if(c.oFormatter&&V){v=c.oFormatter.parse(V);if(isNaN(v)||v===null){V="";}}q.proxy(f,this)(c.value2);var b=c.value2.getValue();var s=b;if(c.oFormatter&&s){b=c.oFormatter.parse(s);if(isNaN(b)||b===null){s="";}}var S=c.showIfGrouped.getSelected();var e=this.getExclude();var d=c.select;var g="";var K;if(k===""||k==null){k=null;K=this._getKeyFromConditionGrid(c);if(this._oConditionsMap[K]!==undefined){delete this._oConditionsMap[K];this._enableCondition(c,false);d.setSelected(false);d.setEnabled(false);this._bIgnoreSetConditions=true;this.fireDataChange({key:K,index:c.getParent().getContent().indexOf(c),operation:"remove",newData:null});this._bIgnoreSetConditions=false;}return;}this._enableCondition(c,true);g=this._getFormatedConditionText(o,V,s,e,k,S);var h={"value":g,"exclude":e,"operation":o,"keyField":k,"value1":v,"value2":b,"showIfGrouped":S};K=this._getKeyFromConditionGrid(c);if(g!==""){var o="update";if(!this._oConditionsMap[K]){o="add";}this._oConditionsMap[K]=h;c.data("_key",K);d.setSelected(true);d.setEnabled(true);this.fireDataChange({key:K,index:c.getParent().getContent().indexOf(c),operation:o,newData:h});}else if(this._oConditionsMap[K]!==undefined){delete this._oConditionsMap[K];c.data("_key",null);d.setSelected(false);d.setEnabled(false);this._bIgnoreSetConditions=true;this.fireDataChange({key:K,index:c.getParent().getContent().indexOf(c),operation:"remove",newData:null});this._bIgnoreSetConditions=false;}};P.prototype._enableConditions=function(){var c=this._oConditionsGrid.getContent();c.forEach(function(o){var k=this._getCurrentKeyField(o.keyField);var K=k&&k.key!==undefined?k.key:k;var e=K!==""&&K!==null;this._enableCondition(o,e);},this);};P.prototype._enableCondition=function(c,e){c.operation.setEnabled(e);c.value1.setEnabled(e);c.value2.setEnabled(e);c.showIfGrouped.setEnabled(e);};P.prototype._removeCondition=function(t,c){var k=this._getKeyFromConditionGrid(c);var i=c.getParent().getContent().indexOf(c);delete this._oConditionsMap[k];c.destroy();if(t.getContent().length<1){this._createConditionRow(t);}else{this._updateConditionButtons(t);}this.fireDataChange({key:k,index:i,operation:"remove",newData:null});};P.prototype._updateConditionButtons=function(t){var m=this._getMaxConditionsAsNumber();var n=t.getContent().length;for(var i=0;i<n;i++){var A=t.getContent()[i].add;if((this.getAlwaysShowAddIcon()&&(n<m))||(i===n-1&&i<m-1)){A.removeStyleClass("displayNone");}else{A.addStyleClass("displayNone");}var r=t.getContent()[i].remove;if(m===1||(i===0&&n===1&&this.getDisableFirstRemoveIcon())){r.addStyleClass("displayNone");}else{r.removeStyleClass("displayNone");}}};P.prototype.validateConditions=function(){var t=this;var c=function(g){var v=true;for(var i=0;i<g.length;i++){var G=g[i];var I=t._checkCondition(G,i===g.length-1);v=v&&I;}return v;};return c(this._oConditionsGrid.getContent());};P.prototype.removeValidationErrors=function(){this._oConditionsGrid.getContent().forEach(function(c){var v=c.value1;var V=c.value2;v.setValueState(sap.ui.core.ValueState.None);V.setValueState(sap.ui.core.ValueState.None);},this);};P.prototype.removeInvalidConditions=function(){var i=[];this._oConditionsGrid.getContent().forEach(function(c){if(c.value1.getValueState()!==sap.ui.core.ValueState.None||c.value2.getValueState()!==sap.ui.core.ValueState.None){i.push(c);}},this);i.forEach(function(c){this._removeCondition(this._oConditionsGrid,c);if(this.getAutoReduceKeyFieldItems()){this._updateKeyFieldItems(this._oConditionsGrid,false);}},this);};P.prototype._checkCondition=function(c,i){var v=true;var b=c.value1;var d=c.value2;var V=b&&(b.getVisible()&&!b.getValue());var e=d&&(d.getVisible()&&!d.getValue());var o=c.operation.getSelectedKey();if(o===sap.m.P13nConditionOperation.BT){if(!V?e:!e){if(V){b.setValueState(sap.ui.core.ValueState.Warning);b.setValueStateText(this._sValidationDialogFieldMessage);}if(e){d.setValueState(sap.ui.core.ValueState.Warning);d.setValueStateText(this._sValidationDialogFieldMessage);}v=false;}else{b.setValueState(sap.ui.core.ValueState.None);d.setValueState(sap.ui.core.ValueState.None);}}if(!i){var f=function(g){var c=g.getParent();var s=g.getValue();if(this.getDisplayFormat()==="UpperCase"&&s){s=s.toUpperCase();g.setValue(s);}if(c.oFormatter&&s){var h=c.oFormatter.parse(s);if(!isNaN(h)&&h!==null){s=c.oFormatter.format(h);g.setValue(s);g.setValueState(sap.ui.core.ValueState.None);}else{g.setValueState(sap.ui.core.ValueState.Warning);g.setValueStateText(this._sValidationDialogFieldMessage);}}};q.proxy(f,this)(b);q.proxy(f,this)(d);if((b.getVisible()&&b.getValueState()!==sap.ui.core.ValueState.None)||(d.getVisible()&&d.getValueState()!==sap.ui.core.ValueState.None)){v=false;}}return v;};P.prototype._getFormatedConditionText=function(o,v,V,e,k,s){var c="";var K=null;if(this._aKeyFields&&this._aKeyFields.length>1){for(var i=0;i<this._aKeyFields.length;i++){var b=this._aKeyFields[i];if(typeof b!=="string"){if(b.key===k&&b.text){K=b.text;}}}}if(v!==""&&v!==undefined){switch(o){case sap.m.P13nConditionOperation.EQ:c="="+v;break;case sap.m.P13nConditionOperation.GT:c=">"+v;break;case sap.m.P13nConditionOperation.GE:c=">="+v;break;case sap.m.P13nConditionOperation.LT:c="<"+v;break;case sap.m.P13nConditionOperation.LE:c="<="+v;break;case sap.m.P13nConditionOperation.Contains:c="*"+v+"*";break;case sap.m.P13nConditionOperation.StartsWith:c=v+"*";break;case sap.m.P13nConditionOperation.EndsWith:c="*"+v;break;case sap.m.P13nConditionOperation.BT:if(V!==""){c=v+"..."+V;break;}}}else{switch(o){case sap.m.P13nConditionOperation.Initial:c="=''";break;case sap.m.P13nConditionOperation.Ascending:c="ascending";break;case sap.m.P13nConditionOperation.GroupAscending:c="ascending";c+=" showIfGrouped:"+s;break;case sap.m.P13nConditionOperation.Descending:c="descending";break;case sap.m.P13nConditionOperation.GroupDescending:c="descending";c+=" showIfGrouped:"+s;break;case sap.m.P13nConditionOperation.Total:c="total";break;case sap.m.P13nConditionOperation.Average:c="average";break;case sap.m.P13nConditionOperation.Minimum:c="minimum";break;case sap.m.P13nConditionOperation.Maximum:c="maximum";break;}}if(e&&c!==""){c="!("+c+")";}if(K&&c!==""){c=K+": "+c;}return c;};P.prototype._updateLayout=function(r){if(!this._oConditionsGrid){return;}var g=this._oConditionsGrid.getContent();var n=this._aConditionsFields.length;var b=n;if(r.name==="Tablet"){b=5;}if(r.name==="Phone"){b=3;}for(var i=0;i<g.length;i++){var c=g[i];c.removeContent(c.ButtonContainer);c.insertContent(c.ButtonContainer,b);if(!this.getAlwaysShowAddIcon()){if(b!==n){c.ButtonContainer.removeContent(c.add);c.addContent(c.add);}else{c.removeContent(c.add);c.ButtonContainer.addContent(c.add);}}}};P.prototype._onGridResize=function(){var d=this._oConditionsGrid.getDomRef();if(!d){return;}if(!q(d).is(":visible")){return;}var w=d.clientWidth;var r={};if(w<=this._iBreakPointTablet){r.name="Phone";}else if((w>this._iBreakPointTablet)&&(w<=this._iBreakPointDesktop)){r.name="Tablet";}else{r.name="Desktop";}if(r.name==="Phone"&&this._sLayoutMode!==r.name){this._updateLayout(r);this._sLayoutMode=r.name;}if(r.name==="Tablet"&&this._sLayoutMode!==r.name){this._updateLayout(r);this._sLayoutMode=r.name;}if(r.name==="Desktop"&&this._sLayoutMode!==r.name){this._updateLayout(r);this._sLayoutMode=r.name;}};sap.m.P13nConditionOperation={BT:"BT",EQ:"EQ",Contains:"Contains",StartsWith:"StartsWith",EndsWith:"EndsWith",LT:"LT",LE:"LE",GT:"GT",GE:"GE",Initial:"Initial",Ascending:"Ascending",Descending:"Descending",GroupAscending:"GroupAscending",GroupDescending:"GroupDescending",Total:"Total",Average:"Average",Minimum:"Minimum",Maximum:"Maximum"};return P;},true);
