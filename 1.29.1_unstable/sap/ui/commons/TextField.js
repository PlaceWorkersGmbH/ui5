/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./library','sap/ui/core/Control','sap/ui/core/ValueStateSupport'],function(q,l,C,V){"use strict";var T=C.extend("sap.ui.commons.TextField",{metadata:{interfaces:["sap.ui.commons.ToolbarItem"],library:"sap.ui.commons",properties:{value:{type:"string",group:"Data",defaultValue:'',bindable:"bindable"},textDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:sap.ui.core.TextDirection.Inherit},enabled:{type:"boolean",group:"Behavior",defaultValue:true},editable:{type:"boolean",group:"Behavior",defaultValue:true},required:{type:"boolean",group:"Appearance",defaultValue:false},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},maxLength:{type:"int",group:"Behavior",defaultValue:0},valueState:{type:"sap.ui.core.ValueState",group:"Data",defaultValue:sap.ui.core.ValueState.None},textAlign:{type:"sap.ui.core.TextAlign",group:"Appearance",defaultValue:sap.ui.core.TextAlign.Begin},imeMode:{type:"sap.ui.core.ImeMode",group:"Behavior",defaultValue:sap.ui.core.ImeMode.Auto},design:{type:"sap.ui.core.Design",group:"Appearance",defaultValue:sap.ui.core.Design.Standard},helpId:{type:"string",group:"Behavior",defaultValue:''},accessibleRole:{type:"sap.ui.core.AccessibleRole",group:"Accessibility",defaultValue:sap.ui.core.AccessibleRole.Textbox},name:{type:"string",group:"Misc",defaultValue:null},placeholder:{type:"string",group:"Appearance",defaultValue:null}},associations:{ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{change:{parameters:{newValue:{type:"string"}}},liveChange:{parameters:{liveValue:{type:"string"}}}}}});T.prototype.init=function(){};T.prototype.onAfterRendering=function(){if(sap.ui.Device.browser.internet_explorer){var $=q(this.getInputDomRef());this._sRenderedValue=$.val();}};T.prototype.onfocusin=function(e){if(this.getEditable()&&this.getEnabled()&&this.getRenderer().onfocus){this.getRenderer().onfocus(this);}};T.prototype.onsapfocusleave=function(e){this._doOnEscape(e);this._checkChange(e);if(this.getEditable()&&this.getEnabled()&&this.getRenderer().onblur){this.getRenderer().onblur(this);}var f=q(this.getFocusDomRef());if(f.data("sap.InNavArea")===false){f.data("sap.InNavArea",true);}};T.prototype.onsapenter=function(e){this._checkChange(e);};T.prototype._checkChange=function(e){var i=this.getInputDomRef(),n=i&&i.value,o=this.getValue();if(this.getEditable()&&this.getEnabled()&&(o!=n)){this.setProperty("value",n,true);this.fireChange({newValue:n});}};T.prototype.onselectstart=function(e){if(!this.getEnabled()){e.preventDefault();e.stopPropagation();}};T.prototype._checkCursorPosForNav=function(e,f){var r=sap.ui.getCore().getConfiguration().getRTL();var b=f?r:!r;var $=q(this.getInputDomRef());var p=$.cursorPos();var L=$.val().length;if(r){p=L-p;}if((!b&&p!=L)||(b&&p!=0)){e.stopPropagation();}};T.prototype.onsapnext=function(e){if(e.keyCode!=q.sap.KeyCodes.ARROW_DOWN){if(q(this.getFocusDomRef()).data("sap.InNavArea")&&e.keyCode!=q.sap.KeyCodes.END){e.preventDefault();return;}this._checkCursorPosForNav(e,true);}};T.prototype.onsapprevious=function(e){if(e.keyCode!=q.sap.KeyCodes.ARROW_UP){if(q(this.getFocusDomRef()).data("sap.InNavArea")&&e.keyCode!=q.sap.KeyCodes.HOME){e.preventDefault();return;}this._checkCursorPosForNav(e,false);}};T.prototype.onsapnextmodifiers=T.prototype.onsapnext;T.prototype.onsappreviousmodifiers=T.prototype.onsapprevious;T.prototype.onsapend=T.prototype.onsapnext;T.prototype.onsaphome=T.prototype.onsapprevious;T.prototype.onsapexpand=function(e){var i=q(this.getFocusDomRef()).data("sap.InNavArea");if(i||i===false){e.stopPropagation();return;}};T.prototype.onsapcollapse=T.prototype.onsapexpand;T.prototype.onsapescape=function(e){var v=this.getProperty("value");this._bEsc=true;this._sValue=v;var i=this.getInputDomRef();if(i&&i.value!==v&&!this._propagateEsc){e.stopPropagation();}if(!!!sap.ui.Device.browser.firefox){this._doOnEscape(e);}};T.prototype.onkeydown=function(e){if(e.which==q.sap.KeyCodes.Z&&e.ctrlKey){e.preventDefault();}};T.prototype.onkeypress=function(e){this._doOnEscape(e);var k=e.which;if(k>0&&k!==q.sap.KeyCodes.ESCAPE){var f=q(this.getFocusDomRef());if(f.data("sap.InNavArea")){f.data("sap.InNavArea",false);}}};T.prototype._doOnEscape=function(e){if(this._bEsc){var i=this.getInputDomRef();if(i){if(i.value!==this._sValue){q(i).val(this._sValue);}var f=q(this.getFocusDomRef());if(f.data("sap.InNavArea")===false){f.data("sap.InNavArea",true);}}this._fireLiveChange(e);this._bEsc=undefined;this._sValue=undefined;}};T.prototype.onkeyup=function(e){if(e.keyCode==q.sap.KeyCodes.F2){var f=q(this.getFocusDomRef());if(f.data("sap.InNavArea")){f.data("sap.InNavArea",false);}else if(f.data("sap.InNavArea")===false){f.data("sap.InNavArea",true);}}else if((sap.ui.Device.browser.msie&&sap.ui.Device.browser.version<10)&&(e.which===q.sap.KeyCodes.DELETE||e.which===q.sap.KeyCodes.BACKSPACE)){this._fireLiveChange(e);}else if((sap.ui.Device.browser.msie&&sap.ui.Device.browser.version<9)&&(e.keyCode!=q.sap.KeyCodes.TAB&&e.keyCode!=q.sap.KeyCodes.ENTER&&e.keyCode!=q.sap.KeyCodes.F4)){this._fireLiveChange(e);}};T.prototype.oninput=function(e){if(!this._realOninput(e)){return;}this._fireLiveChange(e);};T.prototype._realOninput=function(e){if(sap.ui.Device.browser.internet_explorer){var $=q(this.getInputDomRef());var r=this._sRenderedValue;this._sRenderedValue=undefined;if(r==$.val()){return false;}}return true;};T.prototype._fireLiveChange=function(e){if(this.getEnabled()&&this.getEditable()){var L=q(this.getInputDomRef()).val();this.fireLiveChange({liveValue:L});}};T.prototype.setValueState=function(v){var o=this.getValueState();this.setProperty("valueState",v,true);v=this.getValueState();if(o==v){return this;}if(!this.getDomRef()){return this;}if(this.getRenderer().setValueState){this.getRenderer().setValueState(this,o,v);}if(this.delayedCallId){q.sap.clearDelayedCall(this.delayedCallId);this.delayedCallId=null;}if(sap.ui.core.ValueState.Success==v){this.delayedCallId=q.sap.delayedCall(3000,this,"removeValidVisualization");}return this;};T.prototype.removeValidVisualization=function(){if(this.getRenderer().removeValidVisualization){this.getRenderer().removeValidVisualization(this);}};T.prototype.setEditable=function(e){var o=this.getEditable();this.setProperty('editable',e,true);e=this.getEditable();if(o!=e){if(this.getDomRef()&&this.getRenderer().setEditable){this.getRenderer().setEditable(this,e);}}return this;};T.prototype.setEnabled=function(e){var o=this.getEnabled();this.setProperty('enabled',e,true);e=this.getEnabled();if(o!=e){if(this.getDomRef()&&this.getRenderer().setEnabled){this.getRenderer().setEnabled(this,e);}}return this;};T.prototype.setRequired=function(r){var o=this.getRequired();this.setProperty('required',r,true);r=this.getRequired();if(o!=r){if(this.getDomRef()){if(this.getRenderer().setRequired){this.getRenderer().setRequired(this,r);}}this.fireEvent("requiredChanged",{required:r});}return this;};T.prototype.setDesign=function(d){var o=this.getDesign();this.setProperty('design',d,true);d=this.getDesign();if(o!=d){if(this.getDomRef()){if(this.getRenderer().setDesign){this.getRenderer().setDesign(this,d);}}}return this;};T.prototype.setValue=function(v){var n=v;if(n&&n.length>this.getMaxLength()&&this.getMaxLength()>0){n=n.substring(0,this.getMaxLength());}this.setProperty("value",n,true);n=this.getValue();var i=this.getInputDomRef();if(i&&i.value!==n){if(!sap.ui.Device.support.input.placeholder){if(n){this.$().removeClass('sapUiTfPlace');i.value=n;}else if(document.activeElement!==i){this.$().addClass('sapUiTfPlace');var p=this.getPlaceholder();if(this.getRenderer().convertPlaceholder){p=this.getRenderer().convertPlaceholder(this);}i.value=p;}else{i.value="";}}else{i.value=n;}}return this;};T.prototype.setTooltip=function(t){this._refreshTooltipBaseDelegate(t);this.setAggregation("tooltip",t,true);if(this.getInputDomRef()){var s=V.enrichTooltip(this,this.getTooltip_AsString());q(this.getInputDomRef()).attr("title",s||"");}return this;};T.prototype.getInputDomRef=function(){if(!this._getRenderOuter()){return this.getDomRef()||null;}else{return this.getDomRef("input")||null;}};T.prototype.applyFocusInfo=function(f){if(!!sap.ui.Device.browser.internet_explorer&&sap.ui.Device.browser.version==8){var p=this.getValue().length;var t=this;setTimeout(function(){t.focus();t._restoreUnsavedUserInput(f.userinput);q(t.getFocusDomRef()).cursorPos(p);},0);}else{this.focus();this._restoreUnsavedUserInput(f.userinput);}return this;};T.prototype.getFocusInfo=function(){return{id:this.getId(),userinput:this._getUnsavedUserInputInfo()};};T.prototype.getLiveValue=function(){var i=this.getInputDomRef();if(i){return q(i).val();}else{return this.getValue();}};T.prototype.ondrop=function(e){if(sap.ui.Device.browser.firefox){this.focus();}};T.prototype._getRenderOuter=function(){if(this.bRenderOuter==undefined){var r=this.getRenderer();if(r.renderOuterAttributes||r.renderOuterContentBefore||r.renderOuterContent){this.bRenderOuter=true;}else{this.bRenderOuter=false;}}return this.bRenderOuter;};T.prototype.getIdForLabel=function(){if(!this._getRenderOuter()){return this.getId();}else{return this.getId()+'-input';}};T.prototype.getFocusDomRef=function(){return this.getInputDomRef();};T.prototype._getUnsavedUserInputInfo=function(){var $=this.$();if($.length&&$.hasClass("sapUiTfFoc")&&!$.hasClass("sapUiTfPlace")&&this.getEnabled()&&this.getEditable()){var v=q(this.getInputDomRef()).val();var s=this.getValue();if(v!=s){return{userinput:v,value:s};}}return null;};T.prototype._restoreUnsavedUserInput=function(u){if(u&&this.getEnabled()&&this.getEditable()&&this.getValue()==u.value){var v=u.userinput;if(v&&v.length>this.getMaxLength()&&this.getMaxLength()>0){v=v.substring(0,this.getMaxLength());}q(this.getInputDomRef()).val(v);}};return T;},true);
