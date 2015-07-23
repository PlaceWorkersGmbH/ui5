/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/Renderer','sap/ui/core/ValueStateSupport'],function(q,R,V){"use strict";var T={};T.render=function(o,t){var a=o,r=T;var w=t.getWidth();var b=V.enrichTooltip(t,t.getTooltip_AsString());var c=t._getRenderOuter();if(c){a.write("<div");a.writeControlData(t);a.addClass("sapUiTfBack");this.renderStyles(a,t);if(b){a.writeAttributeEscaped('title',b);}var s;if(w&&w!=''){s='width: '+w+';';}if(this.renderOuterAttributes){this.renderOuterAttributes(a,t);}if(s){a.writeAttribute('style',s);}a.writeStyles();a.writeClasses();a.write(">");if(this.renderOuterContentBefore){this.renderOuterContentBefore(a,t);}}if(this.getInnerTagName){a.write('<'+this.getInnerTagName());}else{a.write("<input");}a.addClass("sapUiTf");if(!c){a.writeControlData(t);a.addClass("sapUiTfBack");this.renderStyles(a,t);if(w&&w!=''){a.addStyle("width",w);}}else{a.writeAttribute('id',t.getId()+'-input');a.addClass("sapUiTfInner");a.addStyle("width",'100%');}if(b){a.writeAttributeEscaped('title',b);}if(t.getName()){a.writeAttributeEscaped('name',t.getName());}if(!t.getEditable()){a.writeAttribute('readonly','readonly');}if(this.renderTextFieldEnabled){this.renderTextFieldEnabled(a,t);}else if(!t.getEnabled()){a.writeAttribute('disabled','disabled');a.writeAttribute('tabindex','-1');}else if(!t.getEditable()){a.writeAttribute('tabindex','0');}else{a.writeAttribute('tabindex','0');}var d=t.getTextDirection();if(d){a.addStyle("direction",d.toLowerCase());}var e=r.getTextAlign(t.getTextAlign(),d);if(e){a.addStyle("text-align",e);}switch(t.getImeMode()){case sap.ui.core.ImeMode.Inactive:a.addStyle('ime-mode','inactive');break;case sap.ui.core.ImeMode.Active:a.addStyle('ime-mode','active');break;case sap.ui.core.ImeMode.Disabled:a.addStyle('ime-mode','disabled');break;}if(t.getDesign()==sap.ui.core.Design.Monospace){a.addClass('sapUiTfMono');}if(t.getMaxLength()){a.writeAttribute("maxLength",t.getMaxLength());}if(this.renderInnerAttributes){this.renderInnerAttributes(a,t);}if(this.renderARIAInfo){this.renderARIAInfo(a,t);}var p=t.getPlaceholder();if(p){if(this.convertPlaceholder){p=this.convertPlaceholder(t);}if(sap.ui.Device.support.input.placeholder){a.writeAttributeEscaped('placeholder',p);}}a.writeStyles();a.writeClasses();if(this.getInnerTagName){a.write(">");}else{a.write(" value=\"");if(!sap.ui.Device.support.input.placeholder&&p&&!t.getValue()){a.writeEscaped(p);}else{a.writeEscaped(t.getValue());}a.write("\"");a.write("/>");}if(this.getInnerTagName){if(this.renderInnerContent){this.renderInnerContent(a,t);}a.write('</'+this.getInnerTagName()+'>');}if(c){if(this.renderOuterContent){this.renderOuterContent(a,t);}a.write("</div>");}};T.renderStyles=function(r,t){r.addClass('sapUiTfBrd');if(t.getEnabled()){if(!t.getEditable()){r.addClass("sapUiTfRo");}else{r.addClass("sapUiTfStd");}}else{r.addClass("sapUiTfDsbl");}switch(t.getValueState()){case(sap.ui.core.ValueState.Error):r.addClass('sapUiTfErr');break;case(sap.ui.core.ValueState.Success):r.addClass('sapUiTfSucc');break;case(sap.ui.core.ValueState.Warning):r.addClass('sapUiTfWarn');break;}if(t.getRequired()){r.addClass('sapUiTfReq');}if(t.getPlaceholder()&&!sap.ui.Device.support.input.placeholder){r.addClass('sapUiTfPlace');}};T.onfocus=function(t){var o=t.$();var a;o.addClass("sapUiTfFoc");if(!sap.ui.Device.support.input.placeholder&&!t.getValue()&&t.getPlaceholder()){if(t._getRenderOuter()){a=t.$("input");}else{a=o;}o.removeClass("sapUiTfPlace");a.val("");}};T.onblur=function(t){var o=t.$();var a;o.removeClass("sapUiTfFoc");var p=t.getPlaceholder();if(!sap.ui.Device.support.input.placeholder){if(t._getRenderOuter()){a=t.$("input");}else{a=o;}if(!a.val()&&p){o.addClass("sapUiTfPlace");if(this.convertPlaceholder){p=this.convertPlaceholder(t);}a.val(p);}}};T.setValueState=function(t,o,n){var a=t.$();var b;var r=t._getRenderOuter();if(r){b=t.$("input");}else{b=a;}switch(o){case(sap.ui.core.ValueState.Error):a.removeClass('sapUiTfErr');b.removeAttr('aria-invalid');break;case(sap.ui.core.ValueState.Success):a.removeClass('sapUiTfSucc');break;case(sap.ui.core.ValueState.Warning):a.removeClass('sapUiTfWarn');break;}switch(n){case(sap.ui.core.ValueState.Error):a.addClass('sapUiTfErr');b.attr('aria-invalid',true);break;case(sap.ui.core.ValueState.Success):a.addClass('sapUiTfSucc');break;case(sap.ui.core.ValueState.Warning):a.addClass('sapUiTfWarn');break;}var c=V.enrichTooltip(t,t.getTooltip_AsString());if(c){a.attr('title',c);if(r){t.$("input").attr('title',c);}}else{a.removeAttr('title');if(r){t.$("input").removeAttr('title');}}};T.setEditable=function(t,e){if(!t.getEnabled()){return;}var o=t.$();var a;if(t._getRenderOuter()){a=t.$("input");}else{a=o;}if(e){o.removeClass('sapUiTfRo').addClass('sapUiTfStd');a.removeAttr('readonly');}else{o.removeClass('sapUiTfStd').addClass('sapUiTfRo');a.attr('readonly','readonly');}a.attr('aria-readonly',!e);};T.setEnabled=function(t,e){var o=t.$();var a;if(t._getRenderOuter()){a=t.$("input");}else{a=o;}if(e){if(t.getEditable()){o.removeClass('sapUiTfDsbl').addClass('sapUiTfStd').removeAttr('aria-disabled');a.removeAttr('disabled').removeAttr('aria-disabled').attr('tabindex','0');}else{o.removeClass('sapUiTfDsbl').addClass('sapUiTfRo').removeAttr('aria-disabled');a.removeAttr('disabled').removeAttr('aria-disabled').attr('tabindex','0').attr('readonly','readonly');}}else{if(t.getEditable()){o.removeClass('sapUiTfStd').addClass('sapUiTfDsbl').attr('aria-disabled','true');a.attr('disabled','disabled').attr('aria-disabled','true').attr('tabindex','-1');}else{o.removeClass('sapUiTfRo').addClass('sapUiTfDsbl').attr('aria-disabled','true');a.removeAttr('readonly').attr('disabled','disabled').attr('aria-disabled','true').attr('tabindex','-1');}}};T.removeValidVisualization=function(t){var o=t.$();if(o){o.removeClass("sapUiTfSucc");}else{q.sap.delayedCall(1000,T,"removeValidVisualization",[t]);}};T.setDesign=function(t,d){t.$().toggleClass('sapUiTfMono',(d==sap.ui.core.Design.Monospace));};T.setRequired=function(t,r){var o;if(t._getRenderOuter()){o=t.$("input");}else{o=t.$();}t.$().toggleClass('sapUiTfReq',r);if(r){o.attr("aria-required",true);}else{o.removeAttr("aria-required");}};T.renderARIAInfo=function(r,t){var p={role:t.getAccessibleRole().toLowerCase(),multiline:false,autocomplete:'none'};if(t.getValueState()==sap.ui.core.ValueState.Error){p["invalid"]=true;}r.writeAccessibilityState(t,p);};T.getTextAlign=R.getTextAlign;return T;},true);
