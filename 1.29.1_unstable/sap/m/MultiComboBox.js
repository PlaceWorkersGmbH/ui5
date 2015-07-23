/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./Bar','./ComboBoxBase','./Dialog','./List','./MultiComboBoxRenderer','./Popover','./library','sap/ui/core/EnabledPropagator','sap/ui/core/IconPool','jquery.sap.xml'],function(q,B,C,D,L,M,P,l,E,I){"use strict";var a=C.extend("sap.m.MultiComboBox",{metadata:{library:"sap.m",properties:{selectedKeys:{type:"string[]",group:"Data",defaultValue:null}},associations:{selectedItems:{type:"sap.ui.core.Item",multiple:true,singularName:"selectedItem"}},events:{selectionChange:{parameters:{changedItem:{type:"sap.ui.core.Item"},selected:{type:"boolean"}}},selectionFinish:{parameters:{selectedItems:{type:"sap.ui.core.Item[]"}}}}}});I.insertFontFaceStyle();E.apply(a.prototype,[true]);a.prototype.onsapend=function(e){sap.m.Tokenizer.prototype.onsapend.apply(this._oTokenizer,arguments);};a.prototype.onsaphome=function(e){sap.m.Tokenizer.prototype.onsaphome.apply(this._oTokenizer,arguments);};a.prototype.onsapdown=function(e){if(!this.getEnabled()||!this.getEditable()){return;}e.setMarked();e.preventDefault();var i=this.getSelectableItems();var o=i[0];if(o&&this.isOpen()){this.getListItem(o).focus();return;}if(this._oTokenizer.getSelectedTokens().length){return;}this._oTraversalItem=this._getNextTraversalItem();if(this._oTraversalItem){this.updateDomValue(this._oTraversalItem.getText());this.selectText(0,this.getValue().length);}this._setContainerSizes();};a.prototype.onsapup=function(e){if(!this.getEnabled()||!this.getEditable()){return;}e.setMarked();e.preventDefault();if(this._oTokenizer.getSelectedTokens().length){return;}this._oTraversalItem=this._getPreviousTraversalItem();if(this._oTraversalItem){this.updateDomValue(this._oTraversalItem.getText());this.selectText(0,this.getValue().length);}this._setContainerSizes();};a.prototype.onsapenter=function(e){C.prototype.onsapenter.apply(this,arguments);if(!this.getEnabled()||!this.getEditable()){return;}e.setMarked();var v;if(this.isOpen()){v=this.getSelectableItems();}else{v=this._getItemsStartingText(this.getValue());}if(v.length>1){this._showWrongValueVisualEffect();}if(v.length===1){var i=v[0];var p={item:i,id:i.getId(),key:i.getKey(),fireChangeEvent:true,fireFinishEvent:true,suppressInvalidate:true,listItemUpdated:false};if(this.getValue()===""||q.sap.startsWithIgnoreCase(i.getText(),this.getValue())){if(this.getListItem(i).isSelected()){this.setValue('');}else{this.setSelection(p);}}}this.close();};a.prototype.onsapfocusleave=function(e){var p=this.getAggregation("picker");var c=sap.ui.getCore().byId(e.relatedControlId);var f=c&&c.getFocusDomRef();if(p&&f){if(q.sap.equal(p.getFocusDomRef(),f)){this.focus();}}this._setContainerSizes();};a.prototype.getDomRefForValueStateMessage=function(){return this.getDomRef("border");};a.prototype.onfocusin=function(e){this.addStyleClass(M.CSS_CLASS+"Focused");if(e.target===this.getOpenArea()){this.focus();}if(!this.isOpen()){this.openValueStateMessage();}};a.prototype.onsapescape=function(e){C.prototype.onsapescape.apply(this,arguments);this._setContainerSizes();};a.prototype._handleItemTap=function(e){if(e.target.childElementCount===0||e.target.childElementCount===2){if(this.isOpen()&&!this._isListInSuggestMode()){this.close();}}};a.prototype._handleItemPress=function(e){if(this.isOpen()&&this._isListInSuggestMode()&&this.getPicker().oPopup.getOpenState()!==sap.ui.core.OpenState.CLOSING){this.clearFilter();var i=this._getLastSelectedItem();if(i){this.getListItem(i).focus();}return;}};a.prototype._handleSelectionLiveChange=function(e){var o=e.getParameter("listItem");var i=e.getParameter("selected");var n=this._getItemByListItem(o);if(o.getType()==="Inactive"){return;}if(!n){return;}var p={item:n,id:n.getId(),key:n.getKey(),fireChangeEvent:true,suppressInvalidate:true,listItemUpdated:true};if(i){this.fireChangeEvent(n.getText());this.setSelection(p);}else{this.fireChangeEvent(n.getText());this.removeSelection(p);this.setValue('');}if(this.isOpen()&&this.getPicker().oPopup.getOpenState()!==sap.ui.core.OpenState.CLOSING){o.focus();}};a.prototype.onkeydown=function(e){C.prototype.onkeydown.apply(this,arguments);if(!this.getEnabled()||!this.getEditable()){return;}if((e.ctrlKey||e.metaKey)&&(e.which===q.sap.KeyCodes.V)){this._bIsPasteEvent=true;}else{this._bIsPasteEvent=false;}if(this.getValue().length===0&&(e.ctrlKey||e.metaKey)&&(e.which===q.sap.KeyCodes.A)&&this._hasTokens()){this._oTokenizer.focus();this._oTokenizer.selectAllTokens(true);e.preventDefault();}};a.prototype.oninput=function(e){C.prototype.oninput.apply(this,arguments);var v=e.target.value;if(!this.getEnabled()||!this.getEditable()){return;}if(this._bIsPasteEvent){this.updateDomValue(this._sOldValue||"");return;}var i=this._getItemsStartingText(v);var V=!!i.length;if(!V&&v!==""){this.updateDomValue(this._sOldValue||"");if(this._iOldCursorPos){q(this.getFocusDomRef()).cursorPos(this._iOldCursorPos);}this._showWrongValueVisualEffect();return;}var b=this.getSelectableItems();if(this._sOldInput&&this._sOldInput.length>v.length){b=this.getItems();}b.forEach(function(o){var m=q.sap.startsWithIgnoreCase(o.getText(),v);if(v===""){m=true;}var c=this.getListItem(o);if(c){c.setVisible(m);}},this);this._setContainerSizes();if(!this.getValue()||!V){this.close();}else{this.open();}this._sOldInput=v;};a.prototype.onkeyup=function(e){if(!this.getEnabled()||!this.getEditable()){return;}this._sOldValue=this.getValue();this._iOldCursorPos=q(this.getFocusDomRef()).cursorPos();};a.prototype._showWrongValueVisualEffect=function(){var o=this.getValueState();if(o===sap.ui.core.ValueState.Error){return;}this.setValueState(sap.ui.core.ValueState.Error);q.sap.delayedCall(1000,this,"setValueState",[o]);};a.prototype.createPicker=function(p){var o=this.getAggregation("picker");if(o){return o;}o=this["_create"+p]();this.setAggregation("picker",o,true);o.setHorizontalScrolling(false).addStyleClass(sap.m.ComboBoxBaseRenderer.CSS_CLASS+"Picker").attachBeforeOpen(this.onBeforeOpen,this).attachAfterOpen(this.onAfterOpen,this).attachBeforeClose(this.onBeforeClose,this).attachAfterClose(this.onAfterClose,this).addEventDelegate({onBeforeRendering:this.onBeforeRenderingPicker,onAfterRendering:this.onAfterRenderingPicker},this).addContent(this.getList());return o;};a.prototype.onBeforeRendering=function(){C.prototype.onBeforeRendering.apply(this,arguments);var i=this.getItems();this._synchronizeSelectedItemAndKey(i);this._clearList();this._clearTokenizer();this._fillList(i);this.setEditable(this.getEditable());};a.prototype.onBeforeRenderingPicker=function(){var o=this["_onBeforeRendering"+this.getPickerType()];if(o){o.call(this);}};a.prototype.onAfterRenderingPicker=function(){var o=this["_onAfterRendering"+this.getPickerType()];if(o){o.call(this);}};a.prototype.onBeforeOpen=function(){var p=this["_onBeforeOpen"+this.getPickerType()];this.addStyleClass(sap.m.ComboBoxBaseRenderer.CSS_CLASS+"Pressed");this._resetCurrentItem();this.addContent();if(p){p.call(this);}};a.prototype.onAfterOpen=function(){this.closeValueStateMessage();};a.prototype.onBeforeClose=function(){};a.prototype.onAfterClose=function(){this.removeStyleClass(sap.m.ComboBoxBaseRenderer.CSS_CLASS+"Pressed");this.clearFilter();this.fireSelectionFinish({selectedItems:this.getSelectedItems()});};a.prototype._onBeforeOpenDialog=function(){};a.prototype._onBeforeOpenPopover=function(){if(this.getWidth()!="auto"){var d=this.getDomRef();var c=window.getComputedStyle(d);if(c){this.getPicker().setContentWidth((parseFloat(c.width)/parseFloat(sap.m.BaseFontSize))+"rem");}}};a.prototype._createDialog=function(){var d=new D({stretchOnPhone:true,customHeader:new B({contentLeft:new sap.m.InputBase({width:"100%",editable:false}).addStyleClass(sap.m.ComboBoxBaseRenderer.CSS_CLASS+"Input")}).addStyleClass(sap.m.ComboBoxBaseRenderer.CSS_CLASS+"Bar")});d.getAggregation("customHeader").attachBrowserEvent("tap",function(){d.close();},this);return d;};a.prototype._onAfterRenderingPopover=function(){var p=this.getPicker();p._removeArrow();p._setPosition();};a.prototype._decoratePopover=function(p){var t=this;p._removeArrow=function(){this._marginTop=0;this._marginLeft=0;this._marginRight=0;this._marginBottom=0;this._arrowOffset=0;this._offsets=["0 0","0 0","0 0","0 0"];};p._setPosition=function(){this._myPositions=["begin bottom","begin center","begin top","end center"];this._atPositions=["begin top","end center","begin bottom","begin center"];};p._setArrowPosition=function(){};p.open=function(){var d=q(t.getDomRef());var b=d.find(M.DOT_CSS_CLASS+"Border");return this.openBy(b[0]);};};a.prototype._createPopover=function(){var p=new P({showHeader:false,placement:sap.m.PlacementType.Vertical,offsetX:0,offsetY:0,initialFocus:this,bounce:false});this._decoratePopover(p);return p;};a.prototype.createList=function(){this._oList=new L({width:"100%",mode:sap.m.ListMode.MultiSelect,includeItemInSelection:true,rememberSelections:false}).addStyleClass(sap.m.ComboBoxBaseRenderer.CSS_CLASS+"List").addStyleClass(M.CSS_CLASS+"List").attachBrowserEvent("tap",this._handleItemTap,this).attachSelectionChange(this._handleSelectionLiveChange,this).attachItemPress(this._handleItemPress,this);};a.prototype.setSelection=function(o){if(o.item&&this.isItemSelected(o.item)){return;}if(!o.item){return;}this.addAssociation("selectedItems",o.item,o.suppressInvalidate);var s=this.getKeys(this.getSelectedItems());this.setProperty("selectedKeys",s,o.suppressInvalidate);if(!o.listItemUpdated&&this.getListItem(o.item)){this.getList().setSelectedItem(this.getListItem(o.item),true);}var t=new sap.m.Token({key:o.key,text:o.item.getText(),tooltip:o.item.getText()});o.item.data(sap.m.ComboBoxBaseRenderer.CSS_CLASS+"Token",t);this._oTokenizer.addToken(t);this.$().toggleClass("sapMMultiComboBoxHasToken",this._hasTokens());this.setValue('');if(o.fireChangeEvent){this.fireSelectionChange({changedItem:o.item,selected:true});}if(o.fireFinishEvent){if(!this.isOpen()){this.fireSelectionFinish({selectedItems:this.getSelectedItems()});}}};a.prototype.removeSelection=function(o){if(o.item&&!this.isItemSelected(o.item)){return;}if(!o.item){return;}this.removeAssociation("selectedItems",o.item,o.suppressInvalidate);var s=this.getKeys(this.getSelectedItems());this.setProperty("selectedKeys",s,o.suppressInvalidate);if(!o.listItemUpdated&&this.getListItem(o.item)){this.getList().setSelectedItem(this.getListItem(o.item),false);}if(!o.tokenUpdated){var t=this._getTokenByItem(o.item);o.item.data(sap.m.ComboBoxBaseRenderer.CSS_CLASS+"Token",null);this._oTokenizer.removeToken(t);}this.$().toggleClass("sapMMultiComboBoxHasToken",this._hasTokens());if(o.fireChangeEvent){this.fireSelectionChange({changedItem:o.item,selected:false});}if(o.fireFinishEvent){if(!this.isOpen()){this.fireSelectionFinish({selectedItems:this.getSelectedItems()});}}};a.prototype._synchronizeSelectedItemAndKey=function(b){if(!b.length){q.sap.log.info("Info: _synchronizeSelectedItemAndKey() the MultiComboBox control does not contain any item on ",this);return;}var s=this.getSelectedKeys()||this._aCustomerKeys;var k=this.getKeys(this.getSelectedItems());if(s.length){for(var i=0,K=null,o=null,c=null,d=s.length;i<d;i++){K=s[i];if(k.indexOf(K)>-1){if(this._aCustomerKeys.length&&(c=this._aCustomerKeys.indexOf(K))>-1){this._aCustomerKeys.splice(c,1);}continue;}o=this.getItemByKey(""+K);if(o){if(this._aCustomerKeys.length&&(c=this._aCustomerKeys.indexOf(K))>-1){this._aCustomerKeys.splice(c,1);}this.setSelection({item:o,id:o.getId(),key:o.getKey(),fireChangeEvent:false,suppressInvalidate:true,listItemUpdated:false});}}return;}};a.prototype._setContainerSizes=function(){var m=this.$();if(!m.length){return;}var i=m.find(M.DOT_CSS_CLASS+"InputContainer");var s=m.children(M.DOT_CSS_CLASS+"ShadowDiv");s.text(this.getValue());var b=q(this.getOpenArea()).outerWidth(true);var t=(this._oTokenizer.getScrollWidth()/parseFloat(sap.m.BaseFontSize))+"rem";var c=((s.outerWidth()+b)/parseFloat(sap.m.BaseFontSize))+"rem";this._oTokenizer.$().css("width","calc(100% - "+c+")");i.css("width","calc(100% - "+t+")");i.css("min-width",c);};a.prototype._getTokenByItem=function(i){return i?i.data(sap.m.ComboBoxBaseRenderer.CSS_CLASS+"Token"):null;};a.prototype._getSelectedItemsOf=function(b){for(var i=0,c=b.length,s=[];i<c;i++){if(this.getListItem(b[i]).isSelected()){s.push(b[i]);}}return s;};a.prototype._getLastSelectedItem=function(){var t=this._oTokenizer.getTokens();var T=t.length?t[t.length-1]:null;if(!T){return null;}return this._getItemByToken(T);};a.prototype._getOrderedSelectedItems=function(){var b=[];for(var i=0,t=this._oTokenizer.getTokens(),c=t.length;i<c;i++){b[i]=this._getItemByToken(t[i]);}return b;};a.prototype._getFocusedListItem=function(){if(!document.activeElement){return null;}var f=sap.ui.getCore().byId(document.activeElement.id);if(this.getList()&&q.sap.containsOrEquals(this.getList().getFocusDomRef(),f.getFocusDomRef())){return f;}return null;};a.prototype._getFocusedItem=function(){var o=this._getFocusedListItem();return this._getItemByListItem(o);};a.prototype._isRangeSelectionSet=function(o){var $=o.getDomRef();return $.indexOf(M.CSS_CLASS+"ItemRangeSelection")>-1?true:false;};a.prototype._hasTokens=function(){if(this._oTokenizer.getTokens().length){return true;}return false;};a.prototype._getCurrentItem=function(){if(!this._oCurrentItem){return this._getFocusedItem();}return this._oCurrentItem;};a.prototype._setCurrentItem=function(i){this._oCurrentItem=i;};a.prototype._resetCurrentItem=function(){this._oCurrentItem=null;};a.prototype._decorateListItem=function(o){o.addDelegate({onkeyup:function(e){var i=null;if(e.which==q.sap.KeyCodes.SPACE&&this.isOpen()&&this._isListInSuggestMode()){this.clearFilter();this.open();i=this._getLastSelectedItem();if(i){this.getListItem(i).focus();}return;}},onkeydown:function(e){var i=null,b=null;if(e.shiftKey&&e.which==q.sap.KeyCodes.ARROW_DOWN){b=this._getCurrentItem();i=this._getNextVisibleItemOf(b);}if(e.shiftKey&&e.which==q.sap.KeyCodes.ARROW_UP){b=this._getCurrentItem();i=this._getPreviousVisibleItemOf(b);}if(e.shiftKey&&e.which===q.sap.KeyCodes.SPACE){b=this._getCurrentItem();this._selectPreviousItemsOf(b);}if(i&&i!==b){if(this.getListItem(b).isSelected()){this.setSelection({item:i,id:i.getId(),key:i.getKey(),fireChangeEvent:true,suppressInvalidate:true});this._setCurrentItem(i);}else{this.removeSelection({item:i,id:i.getId(),key:i.getKey(),fireChangeEvent:true,suppressInvalidate:true});this._setCurrentItem(i);}return;}this._resetCurrentItem();if((e.ctrlKey||e.metaKey)&&e.which==q.sap.KeyCodes.A){e.setMarked();e.preventDefault();var v=this.getSelectableItems();var s=this._getSelectedItemsOf(v);if(s.length!==v.length){v.forEach(function(i){this.setSelection({item:i,id:i.getId(),key:i.getKey(),fireChangeEvent:true,suppressInvalidate:true,listItemUpdated:false});},this);}else{v.forEach(function(i){this.removeSelection({item:i,id:i.getId(),key:i.getKey(),fireChangeEvent:true,suppressInvalidate:true,listItemUpdated:false});},this);}}}},true,this);o.addEventDelegate({onsapbackspace:function(e){e.preventDefault();},onsapshow:function(e){e.setMarked();if(e.keyCode===q.sap.KeyCodes.F4){e.preventDefault();}if(this.isOpen()){this.close();return;}if(this.hasContent()){this.open();}},onsaphide:function(e){this.onsapshow(e);},onsapenter:function(e){e.setMarked();this.close();},onsaphome:function(e){e.setMarked();e.preventDefault();var v=this.getSelectableItems();var i=v[0];this.getListItem(i).focus();},onsapend:function(e){e.setMarked();e.preventDefault();var v=this.getSelectableItems();var i=v[v.length-1];this.getListItem(i).focus();},onsapup:function(e){e.setMarked();e.preventDefault();var v=this.getSelectableItems();var i=v[0];var b=q(document.activeElement).control()[0];if(b===this.getListItem(i)){this.focus();e.stopPropagation(true);}},onfocusin:function(e){this.addStyleClass(M.CSS_CLASS+"Focused");},onfocusout:function(e){this.removeStyleClass(M.CSS_CLASS+"Focused");},onsapfocusleave:function(e){var p=this.getAggregation("picker");var c=sap.ui.getCore().byId(e.relatedControlId);if(p&&c&&q.sap.equal(p.getFocusDomRef(),c.getFocusDomRef())){if(e.srcControl){e.srcControl.focus();}}}},this);if(sap.ui.Device.support.touch){o.addEventDelegate({ontouchstart:function(e){e.setMark("cancelAutoClose");}});}};a.prototype._createTokenizer=function(){var t=new sap.m.Tokenizer({tokens:[]}).attachTokenChange(this._handleTokenChange,this);t.setParent(this);t.addEventDelegate({onAfterRendering:this._onAfterRenderingTokenizer},this);this.getRenderer().placeholderToBeShown=function(r,c){return(!c._oTokenizer.getTokens().length)&&(c.getPlaceholder()?true:false);};return t;};a.prototype._handleTokenChange=function(e){var t=e.getParameter("type");var T=e.getParameter("token");var i=null;if(t!==sap.m.Tokenizer.TokenChangeType.Removed&&t!==sap.m.Tokenizer.TokenChangeType.Added){return;}if(t===sap.m.Tokenizer.TokenChangeType.Removed){i=(T&&this._getItemByToken(T));if(i&&this.isItemSelected(i)){this.removeSelection({item:i,id:i.getId(),key:i.getKey(),tokenUpdated:true,fireChangeEvent:true,fireFinishEvent:true,suppressInvalidate:true});this.focus();this.fireChangeEvent('');}}};a.prototype._onAfterRenderingTokenizer=function(){this._setContainerSizes();};a.prototype.onAfterRendering=function(){C.prototype.onAfterRendering.apply(this,arguments);var p=this.getPicker();var d=q(this.getDomRef());var b=d.find(M.DOT_CSS_CLASS+"Border");p._oOpenBy=b[0];};a.prototype.onfocusout=function(e){this.removeStyleClass(M.CSS_CLASS+"Focused");C.prototype.onfocusout.apply(this,arguments);};a.prototype.onpaste=function(e){var o;if(window.clipboardData){o=window.clipboardData.getData("Text");}else{o=e.originalEvent.clipboardData.getData('text/plain');}var s=this._oTokenizer._parseString(o);if(s&&s.length>0){this.getSelectableItems().forEach(function(i){if(q.inArray(i.getText(),s)>-1){this.setSelection({item:i,id:i.getId(),key:i.getKey(),fireChangeEvent:true,fireFinishEvent:true,suppressInvalidate:true,listItemUpdated:false});}},this);}};a.prototype.onsapbackspace=function(e){if(!this.getEnabled()||!this.getEditable()){e.preventDefault();return;}if(this.getCursorPosition()>0||this.getValue().length>0){return;}sap.m.Tokenizer.prototype.onsapbackspace.apply(this._oTokenizer,arguments);e.preventDefault();};a.prototype.onsapdelete=function(e){if(!this.getEnabled()||!this.getEditable()){return;}if(this.getValue()&&!this._isCompleteTextSelected()){return;}sap.m.Tokenizer.prototype.onsapdelete.apply(this._oTokenizer,arguments);};a.prototype.onsapnext=function(e){if(e.isMarked()){return;}var f=q(document.activeElement).control()[0];if(!f){return;}if(f===this._oTokenizer||this._oTokenizer.$().find(f.$()).length>0&&this.getEditable()){this.focus();}};a.prototype.onsapprevious=function(e){if(this.getCursorPosition()===0&&!this._isCompleteTextSelected()){if(e.srcControl===this){sap.m.Tokenizer.prototype.onsapprevious.apply(this._oTokenizer,arguments);}}};a.prototype._getItemsStartingText=function(t){var i=[];this.getSelectableItems().forEach(function(o){if(q.sap.startsWithIgnoreCase(o.getText(),t)){i.push(o);}},this);return i;};a.prototype.getCursorPosition=function(){return this._$input.cursorPos();};a.prototype._isCompleteTextSelected=function(){if(!this.getValue().length){return false;}var i=this._$input[0];if(i.selectionStart!==0||i.selectionEnd!==this.getValue().length){return false;}return true;};a.prototype._selectPreviousItemsOf=function(i){var b;do{b=true;var p=this._getPreviousVisibleItemOf(i);if(p){var o=this.getListItem(p);if(o){b=this.getListItem(p).getSelected();}}this.setSelection({item:i,id:i.getId(),key:i.getKey(),fireChangeEvent:true,suppressInvalidate:true});i=p;}while(!b);};a.prototype._getNextVisibleItemOf=function(i){var b=this.getSelectableItems();var c=b.indexOf(i)+1;if(c<=0||c>b.length-1){return null;}return b[c];};a.prototype._getPreviousVisibleItemOf=function(i){var b=this.getSelectableItems();var c=b.indexOf(i)-1;if(c<0){return null;}return b[c];};a.prototype._getNextUnselectedItemOf=function(i){var b=this._getUnselectedItems();var c=b.indexOf(i)+1;if(c<=0||c>b.length-1){return null;}return b[c];};a.prototype._getPreviousUnselectedItemOf=function(i){var b=this._getUnselectedItems();var c=b.indexOf(i)-1;if(c<0){return null;}return b[c];};a.prototype._getNextTraversalItem=function(){var i=this._getItemsStartingText(this.getValue());var s=this._getUnselectedItems();if(i.indexOf(this._oTraversalItem)>-1&&this._oTraversalItem.getText()===this.getValue()){return this._getNextUnselectedItemOf(this._oTraversalItem);}if(i.length&&i[0].getText()===this.getValue()){return this._getNextUnselectedItemOf(i[0]);}return i.length?i[0]:s[0];};a.prototype._getPreviousTraversalItem=function(){var i=this._getItemsStartingText(this.getValue());if(i.indexOf(this._oTraversalItem)>-1&&this._oTraversalItem.getText()===this.getValue()){return this._getPreviousUnselectedItemOf(this._oTraversalItem);}if(i.length&&i[i.length-1].getText()===this.getValue()){return this._getPreviousUnselectedItemOf(i[i.length-1]);}if(i.length){return i[i.length-1];}else{var s=this._getUnselectedItems();if(s.length>0){return s[s.length-1];}else{return null;}}};a.prototype.setSelectedItems=function(i){this.removeAllSelectedItems();if(!i||!i.length){return this;}if(!q.isArray(i)){q.sap.log.warning('Warning: setSelectedItems() "aItems" has to be an array of sap.ui.core.Item instances or an array of valid sap.ui.core.Item Ids',this);return this;}i.forEach(function(o){if(!(o instanceof sap.ui.core.Item)&&(typeof o!=="string")){q.sap.log.warning('Warning: setSelectedItems() "aItems" has to be an array of sap.ui.core.Item instances or an array of valid sap.ui.core.Item Ids',this);return;}if(typeof o==="string"){o=sap.ui.getCore().byId(o);}this.setSelection({item:o?o:null,id:o?o.getId():"",key:o?o.getKey():"",suppressInvalidate:true});},this);return this;};a.prototype.addSelectedItem=function(i){if(!i){return this;}if(typeof i==="string"){i=sap.ui.getCore().byId(i);}this.setSelection({item:i?i:null,id:i?i.getId():"",key:i?i.getKey():"",fireChangeEvent:false,suppressInvalidate:true});return this;};a.prototype.removeSelectedItem=function(i){if(!i){return null;}if(typeof i==="string"){i=sap.ui.getCore().byId(i);}if(!this.isItemSelected(i)){return null;}this.removeSelection({item:i,id:i.getId(),key:i.getKey(),fireChangeEvent:false,suppressInvalidate:true});return i;};a.prototype.removeAllSelectedItems=function(){var i=[];var b=this.getAssociation("selectedItems",[]);b.forEach(function(o){var c=this.removeSelectedItem(o);if(c){i.push(c.getId());}},this);return i;};a.prototype.removeSelectedKeys=function(k){var i=[],b;if(!k||!k.length||!q.isArray(k)){return i;}var o;k.forEach(function(K){o=this.getItemByKey(K);if(o){this.removeSelection({item:o?o:null,id:o?o.getId():"",key:o?o.getKey():"",fireChangeEvent:false,suppressInvalidate:true});i.push(o);}if(this._aCustomerKeys.length&&(b=this._aCustomerKeys.indexOf(K))>-1){this._aCustomerKeys.splice(b,1);}},this);return i;};a.prototype.setSelectedKeys=function(k){this.removeAllSelectedItems();this._aCustomerKeys=[];this.addSelectedKeys(k);return this;};a.prototype.addSelectedKeys=function(k){k=this.validateProperty("selectedKeys",k);k.forEach(function(K){var i=this.getItemByKey(K);if(i){this.addSelectedItem(i);}else if(K!=null){this._aCustomerKeys.push(K);}},this);return this;};a.prototype.getSelectedKeys=function(){var i=this.getSelectedItems()||[],k=[];i.forEach(function(o){k.push(o.getKey());},this);if(this._aCustomerKeys.length){k=k.concat(this._aCustomerKeys);}return k;};a.prototype._getUnselectedItems=function(){return q(this.getSelectableItems()).not(this.getSelectedItems()).get();};a.prototype.getSelectedItems=function(){var i=[],b=this.getAssociation("selectedItems")||[];b.forEach(function(s){var o=sap.ui.getCore().byId(s);if(o){i.push(o);}},this);return i;};a.prototype.getWidth=function(){return this.getProperty("width")||"100%";};a.prototype.setEditable=function(e){C.prototype.setEditable.apply(this,arguments);this._oTokenizer.setEditable(e);return this;};a.prototype.clearFilter=function(){this.getItems().forEach(function(i){this.getListItem(i).setVisible(i.getEnabled()&&this.getSelectable(i));},this);};a.prototype._isListInSuggestMode=function(){return this.getList().getItems().some(function(o){return!o.getVisible()&&this._getItemByListItem(o).getEnabled();},this);};a.prototype._mapItemToListItem=function(i){if(!i){return null;}var s=sap.m.ComboBoxBaseRenderer.CSS_CLASS+"Item";var b=(this.isItemSelected(i))?s+"Selected":"";var o=new sap.m.StandardListItem({title:i.getText(),type:sap.m.ListType.Active,visible:i.getEnabled()}).addStyleClass(s+" "+b);o.setTooltip(i.getTooltip());i.data(sap.m.ComboBoxBaseRenderer.CSS_CLASS+"ListItem",o);if(b){var t=new sap.m.Token({key:i.getKey(),text:i.getText(),tooltip:i.getText()});i.data(sap.m.ComboBoxBaseRenderer.CSS_CLASS+"Token",t);this._oTokenizer.addToken(t);}this.setSelectable(i,i.getEnabled());this._decorateListItem(o);return o;};a.prototype.setSelectable=function(i,s){if(this.indexOfItem(i)<0){return;}i._bSelectable=s;var o=this.getListItem(i);if(o){o.setVisible(s);}var t=this._getTokenByItem(i);if(t){t.setVisible(s);}};a.prototype.getSelectable=function(i){return i._bSelectable;};a.prototype._fillList=function(b){if(!b){return null;}if(!this._oListItemEnterEventDelegate){this._oListItemEnterEventDelegate={onsapenter:function(e){if(e.srcControl.isSelected()){e.setMarked();}}};}for(var i=0,o,c=b.length;i<c;i++){o=this._mapItemToListItem(b[i]);o.removeEventDelegate(this._oListItemEnterEventDelegate);o.addDelegate(this._oListItemEnterEventDelegate,true,this,true);this.getList().addAggregation("items",o,true);if(this.isItemSelected(b[i])){this.getList().setSelectedItem(o,true);}}};a.prototype.init=function(){C.prototype.init.apply(this,arguments);this.createList();this.setPickerType(sap.ui.Device.system.phone?"Dialog":"Popover");this._oTokenizer=this._createTokenizer();this._aCustomerKeys=[];};a.prototype.clearSelection=function(){this.removeAllSelectedItems();};a.prototype.removeItem=function(i){i=this.removeAggregation("items",i);if(this.getList()){this.getList().removeItem(i&&this.getListItem(i));}this.removeSelection({item:i,id:i?i.getId():"",key:i?i.getKey():"",fireChangeEvent:false,suppressInvalidate:true,listItemUpdated:true});return i;};a.prototype.isItemSelected=function(i){return(this.getSelectedItems().indexOf(i)>-1?true:false);};a.prototype._clearList=function(){if(this.getList()){this.getList().destroyAggregation("items",true);}};a.prototype._clearTokenizer=function(){this._oTokenizer.destroyAggregation("tokens",true);};a.prototype.getList=function(){return this._oList;};a.prototype.exit=function(){C.prototype.exit.apply(this,arguments);if(this.getList()){this.getList().destroy();this._oList=null;}if(this._oTokenizer){this._oTokenizer.destroy();this._oTokenizer=null;}};a.prototype.destroyItems=function(){this.destroyAggregation("items");if(this.getList()){this.getList().destroyItems();}this._oTokenizer.destroyTokens();return this;};a.prototype.removeAllItems=function(){var i=this.removeAllAggregation("items");this.removeAllSelectedItems();if(this.getList()){this.getList().removeAllItems();}return i;};a.prototype._getItemByListItem=function(o){return this._getItemBy(o,"ListItem");};a.prototype._getItemByToken=function(t){return this._getItemBy(t,"Token");};a.prototype._getItemBy=function(d,s){s=sap.m.ComboBoxBaseRenderer.CSS_CLASS+s;for(var i=0,b=this.getItems(),c=b.length;i<c;i++){if(b[i].data(s)===d){return b[i];}}return null;};a.prototype.getListItem=function(i){return i?i.data(sap.m.ComboBoxBaseRenderer.CSS_CLASS+"ListItem"):null;};return a;},true);
