/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./InputBase','sap/ui/model/type/Date','sap/ui/core/date/UniversalDate','./library'],function(q,I,D,U,l){"use strict";var a=I.extend("sap.m.DatePicker",{metadata:{library:"sap.m",properties:{displayFormat:{type:"string",group:"Appearance",defaultValue:null},valueFormat:{type:"string",group:"Data",defaultValue:null},dateValue:{type:"object",group:"Data",defaultValue:null},displayFormatType:{type:"string",group:"Appearance",defaultValue:""}}}});(function(){a.prototype.init=function(){I.prototype.init.apply(this,arguments);this._bIntervalSelection=false;this._bValid=true;this._oMinDate=new U(1,0,1);this._oMinDate.setFullYear(1);this._oMaxDate=new U(9999,11,31);this._bMobile=!sap.ui.Device.system.desktop;};a.prototype.exit=function(){I.prototype.exit.apply(this,arguments);if(this._oPopup){if(this._oPopup.isOpen()){this._oPopup.close();}delete this._oPopup;}if(this._oCalendar){this._oCalendar.destroy();delete this._oCalendar;}this._sUsedDisplayPattern=undefined;this._sUsedDisplayCalendarType=undefined;this._oDisplayFormat=undefined;this._sUsedValuePattern=undefined;this._sUsedValueCalendarType=undefined;this._oValueFormat=undefined;};a.prototype.invalidate=function(o){if(!o||o!=this._oCalendar){sap.ui.core.Control.prototype.invalidate.apply(this,arguments);}};a.prototype.setWidth=function(w){return I.prototype.setWidth.call(this,w||"100%");};a.prototype.getWidth=function(w){return this.getProperty("width")||"100%";};a.prototype.applyFocusInfo=function(F){this._bFocusNoPopup=true;I.prototype.applyFocusInfo.apply(this,arguments);};a.prototype.onfocusin=function(E){I.prototype.onfocusin.apply(this,arguments);if(this._bMobile&&!q(E.target).hasClass("sapUiIcon")&&!this._bFocusNoPopup&&this.getEditable()&&this.getEnabled()){var t=this;if(!this._oPopup||!this._oPopup.isOpen()){_(t);}}this._bFocusNoPopup=undefined;};a.prototype.oninput=function(E){I.prototype.oninput.call(this,E);if(E.isMarked("invalid")){return;}if(this.getDomRef()&&this._$label){var v=this._$input.val();this._$label.css("display",v?"none":"inline");}};a.prototype.onsapshow=function(E){var t=this;b(t);E.preventDefault();};a.prototype.onsaphide=a.prototype.onsapshow;a.prototype.onsappageup=function(E){var t=this;d(t,1,"day");E.preventDefault();};a.prototype.onsappageupmodifiers=function(E){var t=this;if(!E.ctrlKey&&E.shiftKey){d(t,1,"month");}else{d(t,1,"year");}E.preventDefault();};a.prototype.onsappagedown=function(E){var t=this;d(t,-1,"day");E.preventDefault();};a.prototype.onsappagedownmodifiers=function(E){var t=this;if(!E.ctrlKey&&E.shiftKey){d(t,-1,"month");}else{d(t,-1,"year");}E.preventDefault();};a.prototype.onkeypress=function(E){if(!E.charCode||E.metaKey||E.ctrlKey){return;}var t=this;var F=g(t,true);var C=String.fromCharCode(E.charCode);if(C&&F.sAllowedCharacters&&F.sAllowedCharacters.indexOf(C)<0){E.preventDefault();}};a.prototype.onclick=function(E){var t=this;if(q(E.target).hasClass("sapUiIcon")){b(t);}else if(this._bMobile&&(!this._oPopup||!this._oPopup.isOpen())&&this.getEditable()&&this.getEnabled()){_(t);}};a.prototype.setValue=function(v){v=this.validateProperty("value",v);var o=this.getValue();if(v==o){return this;}else{this._lastValue=v;}this.setProperty("value",v,true);this._bValid=true;var h;if(v){h=this._parseValue(v);if(!h||h.getTime()<this._oMinDate.getTime()||h.getTime()>this._oMaxDate.getTime()){this._bValid=false;q.sap.log.warning("Value can not be converted to a valid date",this);}}if(this._bValid){this.setProperty("dateValue",h,true);}if(this.getDomRef()){var O;if(h){O=this._formatValue(h);}else{O=v;}if(this._$input.val()!==O){this._$input.val(O);this._setLabelVisibility();this._curpos=this._$input.cursorPos();}}return this;};a.prototype.setDateValue=function(o){if(q.sap.equal(this.getDateValue(),o)){return this;}if(o&&!(o instanceof Date)){throw new Error("Date must be a JavaScript date object; "+this);}if(o&&(o.getTime()<this._oMinDate.getTime()||o.getTime()>this._oMaxDate.getTime())){this._bValid=false;}else{this._bValid=true;this.setProperty("dateValue",o,true);}var v=this._formatValue(o,true);if(v!==this.getValue()){this._lastValue=v;}this.setProperty("value",v,true);if(this.getDomRef()){var O=this._formatValue(o);if(this._$input.val()!==O){this._$input.val(O);this._setLabelVisibility();this._curpos=this._$input.cursorPos();}}return this;};a.prototype.setValueFormat=function(v){this.setProperty("valueFormat",v,true);var V=this.getValue();if(V){var o=this._parseValue(V);if(!o||o.getTime()<this._oMinDate.getTime()||o.getTime()>this._oMaxDate.getTime()){this._bValid=false;q.sap.log.warning("Value can not be converted to a valid date",this);}else{this._bValid=true;this.setProperty("dateValue",o,true);}}return this;};a.prototype.setDisplayFormat=function(s){this.setProperty("displayFormat",s,true);var o=this._formatValue(this.getDateValue());if(this.getDomRef()&&(this._$input.val()!==o)){this._$input.val(o);this._curpos=this._$input.cursorPos();}return this;};a.prototype.setDisplayFormatType=function(s){if(s){var F=false;for(var t in sap.ui.core.CalendarType){if(t==s){F=true;break;}}if(!F){throw new Error(s+" is not a valid calendar type"+this);}}this.setProperty("displayFormatType",s,true);this.setDisplayFormat(this.getDisplayFormat());return this;};a.prototype.onChange=function(E){if(!this.getEditable()||!this.getEnabled()){return;}var v=this._$input.val();var o=this._formatValue(this.getDateValue());if(v==o&&this._bValid){return;}var h;this._bValid=true;if(v!=""){h=this._parseValue(v,true);if(!h||h.getTime()<this._oMinDate.getTime()||h.getTime()>this._oMaxDate.getTime()){this._bValid=false;h=undefined;}else{v=this._formatValue(h);}}if(this.getDomRef()&&(this._$input.val()!==v)){this._$input.val(v);this._curpos=this._$input.cursorPos();if(this._$label){this._$label.css("display",v?"none":"inline");}}if(h){v=this._formatValue(h,true);}if(v!==this._lastValue){this.setProperty("value",v,true);if(this._bValid){this.setProperty("dateValue",h,true);}this._lastValue=v;this.fireChangeEvent(v,{valid:this._bValid});if(this._oPopup&&this._oPopup.isOpen()){this._oCalendar.focusDate(h);var s=this._oDateRange.getStartDate();if((!s&&h)||(s&&h&&s.getTime()!=h.getTime())){this._oDateRange.setStartDate(new Date(h));}else if(s&&!h){this._oDateRange.setStartDate(undefined);}}}};a.prototype._getInputValue=function(v){v=(typeof v=="undefined")?this._$input.val():v.toString();var o=this._parseValue(v,true);v=this._formatValue(o,true);return v;};a.prototype.updateDomValue=function(v){this._bCheckDomValue=true;v=(typeof v=="undefined")?this._$input.val():v.toString();this._curpos=this._$input.cursorPos();var o=this._parseValue(v,true);v=this._formatValue(o);if(this.isActive()&&(this._$input.val()!==v)){this._$input.val(v);this._$input.cursorPos(this._curpos);}this._setLabelVisibility();return this;};a.prototype._parseValue=function(v,h){var F;var t=this;F=g(t,h);var o=F.parse(v);return o;};a.prototype._formatValue=function(o,v){var V="";if(o){var F;var t=this;F=g(t,!v);V=F.format(o);}return V;};a.prototype._getPlaceholder=function(){var p=this.getPlaceholder();if(!p){var B=this.getBinding("value");if(B&&B.oType&&(B.oType instanceof D)){p=B.oType.getOutputPattern();}else{p=this.getDisplayFormat();}if(!p){p="medium";}if(p=="short"||p=="medium"||p=="long"){var L=sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale();var o=sap.ui.core.LocaleData.getInstance(L);p=o.getDatePattern(p);}}return p;};function _(t){if(!t._oPopup){q.sap.require("sap.ui.core.Popup");t._oPopup=new sap.ui.core.Popup();t._oPopup.setAutoClose(true);t._oPopup.setDurations(0,0);t._oPopup.attachOpened(e,t);}if(!t._oCalendar){sap.ui.getCore().loadLibrary("sap.ui.unified");q.sap.require("sap.ui.unified.library");t._oCalendar=new sap.ui.unified.Calendar(t.getId()+"-cal",{intervalSelection:t._bIntervalSelection});t._oDateRange=new sap.ui.unified.DateRange();t._oCalendar.addSelectedDate(t._oDateRange);t._oCalendar.attachSelect(t._selectDate,t);t._oCalendar.attachCancel(c,t);t._oCalendar.attachEvent("_renderMonth",f,t);t._oPopup.setContent(t._oCalendar);if(t.$().closest(".sapUiSizeCompact").length>0){t._oCalendar.addStyleClass("sapUiSizeCompact");}t._oCalendar.setPopupMode(true);t._oCalendar.setParent(t,undefined,true);}var v=t._formatValue(t.getDateValue());if(v!=t._$input.val()){t.onChange();}t._fillDateRange();t._oPopup.setAutoCloseAreas([t.getDomRef()]);var h=sap.ui.core.Popup.Dock;var A;if(t.getTextAlign()==sap.ui.core.TextAlign.End){A=h.EndBottom+"-4";t._oPopup.open(0,h.EndTop,A,t,null,"fit",true);}else{A=h.BeginBottom+"-4";t._oPopup.open(0,h.BeginTop,A,t,null,"fit",true);}}a.prototype._fillDateRange=function(){var o=this.getDateValue();if(o){this._oCalendar.focusDate(new Date(o));if(!this._oDateRange.getStartDate()||this._oDateRange.getStartDate().getTime()!=o.getTime()){this._oDateRange.setStartDate(new Date(o.getTime()));}}else if(this._oDateRange.getStartDate()){this._oDateRange.setStartDate(undefined);}};function b(t){if(t.getEditable()&&t.getEnabled()){if(!t._oPopup||!t._oPopup.isOpen()){_(t);}else{t._oPopup.close();}}}a.prototype._selectDate=function(E){var s=this._oCalendar.getSelectedDates();var o=this.getDateValue();var h;var v="";this._oPopup.close();this._bFocusNoPopup=true;this.focus();if(s.length>0){h=s[0].getStartDate();}if(!q.sap.equal(h,o)){this.setDateValue(h);v=this.getValue();this.fireChangeEvent(v,{valid:true});if(this.getDomRef()){this._curpos=this._$input.val().length;this._$input.cursorPos(this._curpos);}}else if(!this._bValid){v=this._formatValue(h);if(v!=this._$input.val()){this._bValid=true;if(this.getDomRef()){this._$input.val(v);}this.fireChangeEvent(v,{valid:true});}}};function c(E){if(this._oPopup&&this._oPopup.isOpen()){this._oPopup.close();this._bFocusNoPopup=true;this.focus();}}function d(t,n,u){var o=t.getDateValue();var C=t._$input.cursorPos();if(o&&t.getEditable()&&t.getEnabled()){var h=new U(o.getTime());o=new U(o.getTime());switch(u){case"day":h.setDate(h.getDate()+n);break;case"month":h.setMonth(h.getMonth()+n);var m=(o.getMonth()+n)%12;if(m<0){m=12+m;}while(h.getMonth()!=m){h.setDate(h.getDate()-1);}break;case"year":h.setFullYear(h.getFullYear()+n);while(h.getMonth()!=o.getMonth()){h.setDate(h.getDate()-1);}break;default:break;}if(h.getTime()<t._oMinDate.getTime()){h=new U(t._oMinDate.getTime());}else if(h.getTime()>t._oMaxDate.getTime()){h=new U(t._oMaxDate.getTime());}t.setDateValue(new Date(h.getTime()));t._curpos=C;t._$input.cursorPos(t._curpos);var v=t.getValue();t.fireChangeEvent(v,{valid:true});}}function e(E){this._renderedDays=this._oCalendar.$("-Month0-days").find(".sapUiCalDay").length;}function f(E){var i=E.getParameter("days");if(i>this._renderedDays){this._renderedDays=i;this._oPopup._applyPosition(this._oPopup._oLastPosition);}}function g(t,h){var p="";var r=false;var F;var B=t.getBinding("value");var C;if(B&&B.oType&&(B.oType instanceof D)){p=B.oType.getOutputPattern();r=!!B.oType.oOutputFormat.oFormatOptions.relative;C=B.oType.oOutputFormat.oFormatOptions.calendarType;}if(!p){if(h){p=(t.getDisplayFormat()||"medium");C=t.getDisplayFormatType();}else{p=(t.getValueFormat()||"short");C=sap.ui.core.CalendarType.Gregorian;}}if(!C){C=sap.ui.getCore().getConfiguration().getCalendarType();}if(h){if(p==t._sUsedDisplayPattern&&C==t._sUsedDisplayCalendarType){F=t._oDisplayFormat;}}else{if(p==t._sUsedValuePattern&&C==t._sUsedValueCalendarType){F=t._oValueFormat;}}if(!F){if(p=="short"||p=="medium"||p=="long"){F=sap.ui.core.format.DateFormat.getInstance({style:p,strictParsing:true,relative:r,calendarType:C});}else{F=sap.ui.core.format.DateFormat.getInstance({pattern:p,strictParsing:true,relative:r,calendarType:C});}if(h){t._sUsedDisplayPattern=p;t._sUsedDisplayCalendarType=C;t._oDisplayFormat=F;}else{t._sUsedValuePattern=p;t._sUsedValueCalendarType=C;t._oValueFormat=F;}}return F;}}());return a;},true);
