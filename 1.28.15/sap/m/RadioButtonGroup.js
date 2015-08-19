/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./library','sap/ui/core/Control','sap/ui/core/delegate/ItemNavigation'],function(q,l,C,I){"use strict";var R=C.extend("sap.m.RadioButtonGroup",{metadata:{library:"sap.m",properties:{width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},columns:{type:"int",group:"Appearance",defaultValue:1},editable:{type:"boolean",group:"Behavior",defaultValue:true},valueState:{type:"sap.ui.core.ValueState",group:"Data",defaultValue:sap.ui.core.ValueState.None},selectedIndex:{type:"int",group:"Data",defaultValue:0},enabled:{type:"boolean",group:"Behavior",defaultValue:true},textDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:sap.ui.core.TextDirection.Inherit}},defaultAggregation:"buttons",aggregations:{buttons:{type:"sap.m.RadioButton",multiple:true,singularName:"button",bindable:"bindable"}},associations:{ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{select:{parameters:{selectedIndex:{type:"int"}}}}}});R.prototype.exit=function(){this.destroyButtons();if(this._oItemNavigation){this.removeDelegate(this._oItemNavigation);this._oItemNavigation.destroy();delete this._oItemNavigation;}};R.prototype.onBeforeRendering=function(){if(this.getSelectedIndex()>this.getButtons().length){q.sap.log.warning("Invalid index, set to 0");this.setSelectedIndex(0);}};R.prototype.onAfterRendering=function(){this._initItemNavigation();for(var i=0;i<this.aRBs.length;i++){this.aRBs[i].$().attr("aria-posinset",i+1).attr("aria-setsize",this.aRBs.length);}};R.prototype._initItemNavigation=function(){var d=[];var h=false;var r=this.getEnabled();for(var i=0;i<this.aRBs.length;i++){d.push(this.aRBs[i].getDomRef());h=h||this.aRBs[i].getEnabled();}if(!h||!r){if(this._oItemNavigation){this.removeDelegate(this._oItemNavigation);this._oItemNavigation.destroy();delete this._oItemNavigation;}return;}if(!this._oItemNavigation){this._oItemNavigation=new I();this._oItemNavigation.attachEvent(I.Events.AfterFocus,this._handleAfterFocus,this);this.addDelegate(this._oItemNavigation);}this._oItemNavigation.setRootDomRef(this.getDomRef());this._oItemNavigation.setItemDomRefs(d);this._oItemNavigation.setCycling(true);this._oItemNavigation.setColumns(this.getColumns());this._oItemNavigation.setSelectedIndex(this.getSelectedIndex());this._oItemNavigation.setFocusedIndex(this.getSelectedIndex());};R.prototype.setSelectedIndex=function(s){var i=this.getSelectedIndex();if(s<0){q.sap.log.warning("Invalid index, will not be changed");return this;}this.setProperty("selectedIndex",s,true);if(!isNaN(i)&&this.aRBs&&this.aRBs[i]){this.aRBs[i].setSelected(false);}if(this.aRBs&&this.aRBs[s]){this.aRBs[s].setSelected(true);}if(this._oItemNavigation){this._oItemNavigation.setSelectedIndex(s);this._oItemNavigation.setFocusedIndex(s);}return this;};R.prototype.setSelectedButton=function(s){for(var i=0;i<this.getButtons().length;i++){if(s.getId()==this.getButtons()[i].getId()){this.setSelectedIndex(i);break;}}return this;};R.prototype.getSelectedButton=function(){return this.getButtons()[this.getSelectedIndex()];};R.prototype.addButton=function(b){this.myChange=true;this.addAggregation("buttons",b);b.attachEvent("_change",this._handleItemChanged,this);this.myChange=undefined;if(!this._bUpdateButtons){if(this.getSelectedIndex()===undefined){this.setSelectedIndex(0);}}if(!this.aRBs){this.aRBs=[];}var i=this.aRBs.length;this.aRBs[i]=this._createRadioButton(b,i);return this;};R.prototype.insertButton=function(b,a){this.myChange=true;this.insertAggregation("buttons",b,a);b.attachEvent("_change",this._handleItemChanged,this);this.myChange=undefined;if(!this.aRBs){this.aRBs=[];}var L=this.aRBs.length;if(!this._bUpdateButtons){if(this.getSelectedIndex()===undefined||L==0){this.setSelectedIndex(0);}else if(this.getSelectedIndex()>=a){this.setProperty("selectedIndex",this.getSelectedIndex()+1,true);}}if(a>=L){this.aRBs[a]=this._createRadioButton(b,a);}else{for(var i=(L);i>a;i--){this.aRBs[i]=this.aRBs[i-1];if((i-1)==a){this.aRBs[i-1]=this._createRadioButton(b,a);}}}return this;};R.prototype._createRadioButton=function(b,i){if(this.iIDCount==undefined){this.iIDCount=0;}else{this.iIDCount++;}var r=new sap.m.RadioButton(this.getId()+"-"+this.iIDCount);r.setText(b.getText());r.setTooltip(b.getTooltip());r.setEnabled(this.getEnabled()&&b.getEnabled());r.setTextDirection(b.getTextDirection());r.setEditable(this.getEditable()&&b.getEditable());r.setVisible(this.getVisible()&&b.getVisible());r.setValueState(this.getValueState());r.setGroupName(this.getId());r.setParent(this);if(i==this.getSelectedIndex()){r.setSelected(true);}r.attachEvent("select",this._handleRBSelect,this);return r;};R.prototype.removeButton=function(e){var i=e;if(typeof(e)=="string"){e=sap.ui.getCore().byId(e);}if(typeof(e)=="object"){i=this.indexOfButton(e);}this.myChange=true;var b=this.removeAggregation("buttons",i);b.detachEvent("_change",this._handleItemChanged,this);this.myChange=undefined;if(!this.aRBs){this.aRBs=[];}if(!this.aRBs[i]){return null;}this.aRBs[i].destroy();this.aRBs.splice(i,1);if(!this._bUpdateButtons){if(this.aRBs.length==0){this.setSelectedIndex(undefined);}else if(this.getSelectedIndex()==i){this.setSelectedIndex(0);}else{if(this.getSelectedIndex()>i){this.setProperty("selectedIndex",this.getSelectedIndex()-1,true);}}}return b;};R.prototype.removeAllButtons=function(){this.myChange=true;var b=this.removeAllAggregation("buttons");for(var i=0;i<b.length;i++){b[i].detachEvent("_change",this._handleItemChanged,this);}this.myChange=undefined;if(!this._bUpdateButtons){this.setSelectedIndex(undefined);}if(this.aRBs){while(this.aRBs.length>0){this.aRBs[0].destroy();this.aRBs.splice(0,1);}return b;}else{return null;}};R.prototype.destroyButtons=function(){this.myChange=true;var b=this.getButtons();for(var i=0;i<b.length;i++){b[i].detachEvent("_change",this._handleItemChanged,this);}this.destroyAggregation("buttons");this.myChange=undefined;if(!this._bUpdateButtons){this.setSelectedIndex(undefined);}if(this.aRBs){while(this.aRBs.length>0){this.aRBs[0].destroy();this.aRBs.splice(0,1);}}return this;};R.prototype.updateButtons=function(){var s=this.getSelectedIndex();this._bUpdateButtons=true;this.updateAggregation("buttons");this._bUpdateButtons=undefined;var b=this.getButtons();if(s===undefined&&b.length>0){this.setSelectedIndex(0);}else if(s>=0&&b.length==0){this.setSelectedIndex(undefined);}else if(s>=b.length){this.setSelectedIndex(b.length-1);}};R.prototype.clone=function(){var b=this.getButtons();var i=0;for(i=0;i<b.length;i++){b[i].detachEvent("_change",this._handleItemChanged,this);}var c=C.prototype.clone.apply(this,arguments);for(i=0;i<b.length;i++){b[i].attachEvent("_change",this._handleItemChanged,this);}return c;};R.prototype._handleRBSelect=function(c){for(var i=0;i<this.aRBs.length;i++){if(this.aRBs[i].getId()==c.getParameter("id")&&c.getParameter("selected")){this.setSelectedIndex(i);this._oItemNavigation.setSelectedIndex(i);this._oItemNavigation.setFocusedIndex(i);this.fireSelect({selectedIndex:i});break;}}};R.prototype.setEditable=function(e){this.setProperty("editable",e,false);if(this.aRBs){for(var i=0;i<this.aRBs.length;i++){this.aRBs[i].setEditable(e);}}return this;};R.prototype.setEnabled=function(e){this.setProperty("enabled",e,false);if(this.aRBs){var b=this.getButtons();for(var i=0;i<this.aRBs.length;i++){if(e){this.aRBs[i].setEnabled(b[i].getEnabled());}else{this.aRBs[i].setEnabled(e);}}}return this;};R.prototype.setValueState=function(v){this.setProperty("valueState",v,false);if(this.aRBs){for(var i=0;i<this.aRBs.length;i++){this.aRBs[i].setValueState(v);}}return this;};R.prototype._handleAfterFocus=function(c){var i=c.getParameter("index");var e=c.getParameter("event");if(i!=this.getSelectedIndex()&&!(e.ctrlKey||e.metaKey)&&this.aRBs[i].getEditable()&&this.aRBs[i].getEnabled()){this.setSelectedIndex(i);this._oItemNavigation.setSelectedIndex(i);this.fireSelect({selectedIndex:i});}};R.prototype._handleItemChanged=function(e){var b=e.oSource;var p=e.getParameter("name");var n=e.getParameter("newValue");var B=this.getButtons();var r;for(var i=0;i<B.length;i++){if(B[i]==b){if(this.aRBs[i]){r=this.aRBs[i];}break;}}switch(p){case"enabled":if(this.getEnabled()){r.setEnabled(n);}break;case"selected":r.setSelected(n);break;case"groupName":r.setGroupName(n);break;case"text":r.setText(n);break;case"textDirection":r.setTextDirection(n);break;case"textDirection":r.setTextDirection(n);break;case"width":r.setWidth(n);break;case"activeHandling":r.setActiveHandling(n);break;case"editable":r.setEditable(n);break;case"tooltip":r.setTooltip(n);break;case"valueState":r.setValueState(n);break;case"textAlign":r.setTextAlign(n);break;default:break;}};return R;},true);
