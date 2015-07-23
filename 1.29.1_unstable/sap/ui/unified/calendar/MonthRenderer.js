/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/unified/calendar/CalendarUtils','sap/ui/core/date/UniversalDate'],function(q,C,U){"use strict";var M={};M.render=function(r,m){var d=this.getStartDate(m);var t=m.getTooltip_AsString();var a=sap.ui.getCore().getLibraryResourceBundle("sap.ui.unified");var i=m.getId();var A={value:i+"-Descr",append:true};r.write("<div");r.writeControlData(m);r.addClass(this.getClass());r.writeClasses();if(t){r.writeAttributeEscaped("title",t);}if(m._getShowHeader()){A.value=A.value+" "+i+"-Head";}r.writeAccessibilityState(m,{role:"grid",readonly:"true",multiselectable:!m.getSingleSelection()||m.getIntervalSelection(),labelledby:A});r.write(">");r.write("<span id=\""+i+"-Descr\" style=\"display: none;\">"+a.getText("CALENDAR_DIALOG")+"</span>");if(m.getIntervalSelection()){r.write("<span id=\""+i+"-Start\" style=\"display: none;\">"+a.getText("CALENDAR_START_DATE")+"</span>");r.write("<span id=\""+i+"-End\" style=\"display: none;\">"+a.getText("CALENDAR_END_DATE")+"</span>");}this.renderMonth(r,m,d);r.write("</div>");};M.getStartDate=function(m){return m._getDate();};M.getClass=function(){var c="sapUiCalMonthView";var s=sap.ui.getCore().getConfiguration().getCalendarType();if(s==sap.ui.core.CalendarType.Islamic){c=c+" sapUiCalNoWeekNum";}return c;};M.renderMonth=function(r,m,d){var i=m.getId();this.renderHeader(r,m,d);r.write("<div id=\""+i+"-days\" class=\"sapUiCalDays\">");this.renderDays(r,m,d);r.write("</div>");};M.renderHeader=function(r,m,d){var l=m._getLocaleData();var f=m._getFirstDayOfWeek();var i=m.getId();var a=sap.ui.getCore().getLibraryResourceBundle("sap.ui.unified");this.renderHeaderLine(r,m,l,d);r.write("<div");r.writeAttribute("id",i+"-CW");r.addStyle("display","none");r.writeStyles();r.writeAccessibilityState(null,{role:"columnheader"});r.write(">");r.write(a.getText("CALENDAR_WEEK"));r.write("</div>");r.write("<div");r.writeAccessibilityState(null,{role:"row"});r.write(">");this.renderDayNames(r,m,l,f,7,true,undefined);r.write("</div>");};M.renderHeaderLine=function(r,m,l,d){if(m._getShowHeader()){var i=m.getId();var a=l.getMonthsStandAlone("wide");r.write("<div id=\""+i+"-Head\"class=\"sapUiCalMonthHead\" >");r.write(a[d.getUTCMonth()]);r.write("</div>");}};M.renderDayNames=function(r,m,l,s,d,D,w){var f=m._getFirstDayOfWeek();var I=m.getId();var a="";var W=[];if(m._bLongWeekDays||!m._bNamesLengthChecked){W=l.getDaysStandAlone("abbreviated");}else{W=l.getDaysStandAlone("narrow");}var b=l.getDaysStandAlone("wide");for(var i=0;i<d;i++){r.write("<div");r.addClass("sapUiCalWH");if(D){a=I+"-WH"+((i+f)%7);}else{a=I+"-WH"+i;}r.writeAttribute("id",a);if(i==0){r.addClass("sapUiCalFirstWDay");}if(w){r.addStyle("width",w);}r.writeAccessibilityState(null,{role:"columnheader",label:b[(i+s)%7]});r.writeClasses();r.writeStyles();r.write(">");r.write(W[(i+s)%7]);r.write("</div>");}};M.renderDays=function(r,m,d){if(!d){d=m._getFocusedDate();}var i=d.getUTCMonth();var h=this.getDayHelper(m,d);var c=sap.ui.getCore().getConfiguration().getCalendarType();var w=c!=sap.ui.core.CalendarType.Islamic;var f=new U(d.getTime());f.setUTCDate(1);var W=f.getUTCDay();var D=W-h.iFirstDayOfWeek;if(D<0){D=7+D;}if(D>0){f.setUTCDate(1-D);}var o=new U(f.getTime());var n=(i+1)%12;do{W=o.getUTCDay();if(W==h.iFirstDayOfWeek){r.write("<div");r.writeAccessibilityState(null,{role:"row"});r.write(">");}this.renderDay(r,m,o,h,true,w,-1,undefined);if(W==(h.iFirstDayOfWeek+6)%7){r.write("</div>");}o.setUTCDate(o.getUTCDate()+1);}while(o.getUTCMonth()!=n||o.getUTCDay()!=h.iFirstDayOfWeek);};M.getDayHelper=function(m,d){var h={};h.sLocale=m._getLocale();h.oLocaleData=m._getLocaleData();h.iMonth=d.getUTCMonth();h.iYear=d.getUTCFullYear();h.iFirstDayOfWeek=m._getFirstDayOfWeek();h.iWeekendStart=h.oLocaleData.getWeekendStart();h.iWeekendEnd=h.oLocaleData.getWeekendEnd();h.aNonWorkingDays=m._getNonWorkingDays();h.sToday=h.oLocaleData.getRelativeDay(0);h.oToday=new U();h.sId=m.getId();h.oFormatLong=m._getFormatLong();return h;};M.renderDay=function(r,m,d,h,o,w,n,W){var a={role:"gridcell",selected:false,label:"",describedby:""};var y=m._oFormatYyyymmdd.format(d,true);var b=d.getUTCDay();var s=m._checkDateSelected(d);var t=m._getDateType(d);var c=0;if(w){c=C.calculateWeekNumber(d,h.iYear,h.sLocale,h.oLocaleData);a["describedby"]=h.sId+"-CW"+" "+h.sId+"-WNum-"+c;}var e="";if(n<0){e=h.sId+"-WH"+b;}else{e=h.sId+"-WH"+n;}a["describedby"]=a["describedby"]+" "+e;r.write("<div");r.writeAttribute("id",h.sId+"-"+y);r.addClass("sapUiCalDay");r.addClass("sapUiCalWDay"+b);if(W){r.addStyle("width",W);}if(b==h.iFirstDayOfWeek){r.addClass("sapUiCalFirstWDay");}if(o&&h.iMonth!=d.getUTCMonth()){r.addClass("sapUiCalDayOtherMonth");a["disabled"]=true;}if(d.getUTCMonth()==h.oToday.getMonth()&&d.getUTCFullYear()==h.oToday.getFullYear()&&d.getUTCDate()==h.oToday.getDate()){r.addClass("sapUiCalDayToday");a["label"]=h.sToday+" ";}if(s>0){r.addClass("sapUiCalDaySel");a["selected"]=true;}if(s==2){r.addClass("sapUiCalDaySelStart");a["describedby"]=a["describedby"]+" "+h.sId+"-Start";}else if(s==3){r.addClass("sapUiCalDaySelEnd");a["describedby"]=a["describedby"]+" "+h.sId+"-End";}else if(s==4){r.addClass("sapUiCalDaySelBetween");}else if(s==5){r.addClass("sapUiCalDaySelStart");r.addClass("sapUiCalDaySelEnd");a["describedby"]=a["describedby"]+" "+h.sId+"-Start";a["describedby"]=a["describedby"]+" "+h.sId+"-End";}if(t&&t!=sap.ui.unified.CalendarDayType.None){r.addClass("sapUiCalDay"+t.type);if(t.tooltip){r.writeAttributeEscaped('title',t.tooltip);}}if(h.aNonWorkingDays){for(var i=0;i<h.aNonWorkingDays.length;i++){if(b==h.aNonWorkingDays[i]){r.addClass("sapUiCalDayWeekEnd");break;}}}else if((b>=h.iWeekendStart&&b<=h.iWeekendEnd)||(h.iWeekendEnd<h.iWeekendStart&&(b>=h.iWeekendStart||b<=h.iWeekendEnd))){r.addClass("sapUiCalDayWeekEnd");}r.writeAttribute("tabindex","-1");r.writeAttribute("data-sap-day",y);a["label"]=a["label"]+h.oFormatLong.format(d,true);r.writeAccessibilityState(null,a);r.writeClasses();r.writeStyles();r.write(">");r.write("<span");r.addClass("sapUiCalDayNum");r.writeClasses();r.write(">");r.write(d.getUTCDate());r.write("</span>");if(w&&b==h.iFirstDayOfWeek){r.write("<span");r.writeAttribute("id",h.sId+"-WNum-"+c);r.addClass("sapUiCalWeekNum");r.writeClasses();r.writeAccessibilityState(null,{role:"rowheader",desribedby:h.sId+"-CW"});r.write(">");r.write(c);r.write("</span>");}r.write("</div>");};return M;},true);
