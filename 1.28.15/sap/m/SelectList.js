/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./SelectListRenderer','./library','sap/ui/core/Control','sap/ui/core/delegate/ItemNavigation'],function(q,S,l,C,I){"use strict";var a=C.extend("sap.m.SelectList",{metadata:{library:"sap.m",properties:{enabled:{type:"boolean",group:"Behavior",defaultValue:true},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"auto"},maxWidth:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"100%"},selectedKey:{type:"string",group:"Data",defaultValue:""},selectedItemId:{type:"string",group:"Misc",defaultValue:""}},defaultAggregation:"items",aggregations:{items:{type:"sap.ui.core.Item",multiple:true,singularName:"item",bindable:"bindable"}},associations:{selectedItem:{type:"sap.ui.core.Item",multiple:false},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{selectionChange:{parameters:{selectedItem:{type:"sap.ui.core.Item"}}}}}});a.prototype._setSelectedIndex=function(i,_){var o;_=_||this.getItems();i=(i>_.length-1)?_.length-1:Math.max(0,i);o=_[i];if(o){this.setSelection(o);}};a.prototype.updateItems=function(r){this.updateAggregation("items");this._bDataAvailable=true;};a.prototype.refreshItems=function(){this._bDataAvailable=false;this.refreshAggregation("items");};a.prototype._activateItem=function(i){if(i instanceof sap.ui.core.Item&&(this.getSelectedItem()!==i)){this.setSelection(i);this.fireSelectionChange({selectedItem:this.getSelectedItem()});}};a.prototype._queryEnabledItemsDomRefs=function(d){var b="."+S.CSS_CLASS+"Item";d=d||this.getDomRef();return d?Array.prototype.slice.call(d.querySelectorAll(b+":not("+b+"Disabled)")):[];};a.prototype._handleARIAActivedescendant=function(){var A=q(document.activeElement).control(0),d=this.getDomRef();if(A&&d){d.setAttribute("aria-activedescendant",A.getId());}};a.prototype.init=function(){this._iStartTimeout=0;this._iActiveTouchId=0;this._fStartX=0;this._fStartY=0;};a.prototype.onBeforeRendering=function(){this.synchronizeSelection();};a.prototype.onAfterRendering=function(){this.createItemNavigation();};a.prototype.exit=function(){if(this._oItemNavigation){this.removeDelegate(this._oItemNavigation);this._oItemNavigation.destroy();this._oItemNavigation=null;}this._$ItemPressed=null;};a.prototype.ontouchstart=function(e){if(sap.m.touch.countContained(e.touches,this.getId())>1||!this.getEnabled()){return;}e.setMarked();var t=e.targetTouches[0];this._iActiveTouchId=t.identifier;this._fStartX=t.pageX;this._fStartY=t.pageY;this._iStartTimeout=setTimeout(function(){var i=e.srcControl.$();if(i){i.addClass(S.CSS_CLASS+"ItemPressed");this._$ItemPressed=i;}}.bind(this),100);};a.prototype.ontouchmove=function(e){var t=null;if(!this.getEnabled()){return;}t=sap.m.touch.find(e.changedTouches,this._iActiveTouchId);if(t&&((Math.abs(t.pageX-this._fStartX)>10)||(Math.abs(t.pageY-this._fStartY)>10))){clearTimeout(this._iStartTimeout);if(this._$ItemPressed){this._$ItemPressed.removeClass(S.CSS_CLASS+"ItemPressed");this._$ItemPressed=null;}}};a.prototype.ontouchend=function(e){var t=null;if(!this.getEnabled()){return;}e.setMarked();t=sap.m.touch.find(e.changedTouches,this._iActiveTouchId);if(t){setTimeout(function(){if(this._$ItemPressed){this._$ItemPressed.removeClass(S.CSS_CLASS+"ItemPressed");this._$ItemPressed=null;}this._iStartTimeout=null;}.bind(this),100);}};a.prototype.ontouchcancel=a.prototype.ontouchend;a.prototype.ontap=function(e){if(this.getEnabled()){e.setMarked();this._activateItem(e.srcControl);}};a.prototype.onsapselect=function(e){if(this.getEnabled()){e.setMarked();e.preventDefault();this._activateItem(e.srcControl);}};a.prototype.onAfterFocus=function(c){this._handleARIAActivedescendant();};a.prototype.findFirstEnabledItem=function(b){b=b||this.getItems();for(var i=0;i<b.length;i++){if(b[i].getEnabled()){return b[i];}}return null;};a.prototype.setSelection=function(i){var s=this.getSelectedItem(),b=S.CSS_CLASS;this.setAssociation("selectedItem",i,true);this.setProperty("selectedItemId",(i instanceof sap.ui.core.Item)?i.getId():i,true);if(typeof i==="string"){i=sap.ui.getCore().byId(i);}this.setProperty("selectedKey",i?i.getKey():"",true);if(s){s.$().removeClass(b+"ItemSelected").attr("aria-selected","false");}s=this.getSelectedItem();if(s){s.$().addClass(b+"ItemSelected").attr("aria-selected","true");}};a.prototype.synchronizeSelection=function(){if(this.isSelectionSynchronized()){return;}var k=this.getSelectedKey(),i=this.getItemByKey(""+k);if(i&&(k!=="")){this.setAssociation("selectedItem",i,true);this.setProperty("selectedItemId",i.getId(),true);}else if(this.getDefaultSelectedItem()&&(!this.isBound("items")||this._bDataAvailable)){this.setSelection(this.getDefaultSelectedItem());}};a.prototype.isSelectionSynchronized=function(){var i=this.getSelectedItem();return this.getSelectedKey()===(i&&i.getKey());};a.prototype.findLastEnabledItem=function(i){i=i||this.getItems();return this.findFirstEnabledItem(i.reverse());};a.prototype.getVisibleItems=function(){return this.getItems();};a.prototype.getSelectableItems=function(){return this.getEnabledItems(this.getVisibleItems());};a.prototype.findItem=function(p,v){var m="get"+p.charAt(0).toUpperCase()+p.slice(1);for(var i=0,b=this.getItems();i<b.length;i++){if(b[i][m]()===v){return b[i];}}return null;};a.prototype.getItemByText=function(t){return this.findItem("text",t);};a.prototype.isItemSelected=function(i){return i&&(i.getId()===this.getAssociation("selectedItem"));};a.prototype.getDefaultSelectedItem=function(i){return null;};a.prototype.clearSelection=function(){this.setSelection(null);};a.prototype.createItemNavigation=function(){var d;if(!this._oItemNavigation){this._oItemNavigation=new I(null,null,!this.getEnabled());this._oItemNavigation.attachEvent(I.Events.AfterFocus,this.onAfterFocus,this);this.addEventDelegate(this._oItemNavigation);}d=this.getDomRef();this._oItemNavigation.setRootDomRef(d);this._oItemNavigation.setItemDomRefs(this._queryEnabledItemsDomRefs(d));this._oItemNavigation.setCycling(false);this._oItemNavigation.setSelectedIndex(this.indexOfItem(this.getSelectedItem()));this._oItemNavigation.setPageSize(10);};a.prototype.setSelectedItem=function(i){if(typeof i==="string"){i=sap.ui.getCore().byId(i);}if(!(i instanceof sap.ui.core.Item)&&i!==null){q.sap.log.warning('Warning: setSelectedItem() "vItem" has to be an instance of sap.ui.core.Item, a valid sap.ui.core.Item id, or null on',this);return this;}if(!i){i=this.getDefaultSelectedItem();}this.setSelection(i);return this;};a.prototype.setSelectedItemId=function(i){i=this.validateProperty("selectedItemId",i);this.setSelection(i);return this;};a.prototype.setSelectedKey=function(k){k=this.validateProperty("selectedKey",k);var i=this.getItemByKey(k);if(i||(k==="")){if(!i&&k===""){i=this.getDefaultSelectedItem();}this.setSelection(i);return this;}return this.setProperty("selectedKey",k);};a.prototype.getSelectedItem=function(){var s=this.getAssociation("selectedItem");return(s===null)?null:sap.ui.getCore().byId(s)||null;};a.prototype.getItemAt=function(i){return this.getItems()[+i]||null;};a.prototype.getFirstItem=function(){return this.getItems()[0]||null;};a.prototype.getLastItem=function(){var i=this.getItems();return i[i.length-1]||null;};a.prototype.getEnabledItems=function(i){i=i||this.getItems();return i.filter(function(o){return o.getEnabled();});};a.prototype.getItemByKey=function(k){return this.findItem("key",k);};a.prototype.removeItem=function(i){i=this.removeAggregation("items",i);if(this.getItems().length===0){this.clearSelection();}else if(this.isItemSelected(i)){this.setSelection(this.getDefaultSelectedItem());}return i;};a.prototype.removeAllItems=function(){var i=this.removeAllAggregation("items");this.clearSelection();return i;};a.prototype.destroyItems=function(){this.destroyAggregation("items");return this;};a.prototype.setNoDataText=q.noop;return a;},true);
