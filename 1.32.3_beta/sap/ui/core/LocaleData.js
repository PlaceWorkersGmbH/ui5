/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/base/Object','./Configuration','./Locale'],function(q,B,C,L){"use strict";var a=B.extend("sap.ui.core.LocaleData",{constructor:function(o){B.apply(this);this.mData=d(o);},_get:function(k){return this.mData[k];},_getCalendarData:function(k,s){if(!s){s=sap.ui.getCore().getConfiguration().getCalendarType();}return this._get(g(s),k)[k];},getOrientation:function(){return this._get("orientation");},getLanguages:function(){return this._get("languages");},getScripts:function(){return this._get("scripts");},getTerritories:function(){return this._get("territories");},getMonths:function(w,s){return this._getCalendarData("months-format-"+w,s);},getMonthsStandAlone:function(w,s){return this._getCalendarData("months-standAlone-"+w,s);},getDays:function(w,s){return this._getCalendarData("days-format-"+w,s);},getDaysStandAlone:function(w,s){return this._getCalendarData("days-standAlone-"+w,s);},getQuarters:function(w,s){return this._getCalendarData("quarters-format-"+w,s);},getQuartersStandAlone:function(w,s){return this._getCalendarData("quarters-standAlone-"+w,s);},getDayPeriods:function(w,s){return this._getCalendarData("dayPeriods-format-"+w,s);},getDatePattern:function(s,e){return this._getCalendarData("dateFormat-"+s,e);},getTimePattern:function(s,e){return this._getCalendarData("timeFormat-"+s,e);},getDateTimePattern:function(s,e){return this._getCalendarData("dateTimeFormat-"+s,e);},getNumberSymbol:function(t){return this._get("symbols-latn-"+t);},getDecimalPattern:function(){return this._get("decimalFormat").standard;},getCurrencyPattern:function(s){return this._get("currencyFormat")[s]||this._get("currencyFormat").standard;},getPercentPattern:function(){return this._get("percentFormat").standard;},getFirstDayOfWeek:function(){return this._get("weekData-firstDay");},getWeekendStart:function(){return this._get("weekData-weekendStart");},getWeekendEnd:function(){return this._get("weekData-weekendEnd");},getIntervalPattern:function(i,s){return(i&&this._getCalendarData("intervalFormat-"+i,s))||this._getCalendarData("intervalFormatFallback",s);},getCurrencyDigits:function(s){var o=this._get("currencyDigits");var D=2;if(o){if(o[s]!=undefined){D=o[s];}else{D=o["DEFAULT"];}}return D;},getCurrencySymbol:function(s){var o=this._get("currencySymbols");return(o&&o[s])||s;},getCurrencyCodeBySymbol:function(s){var o=this._get("currencySymbols"),e;for(e in o){if(o[e]===s){return e;}}return s;},_getRelative:function(t,D){var p;if(Math.abs(D)<=1){p=this._get("dateField-"+t+"-relative-"+D);if(!p){if(D===0){q.sap.log.warning("sap.ui.core.LocaleData: there's no pattern defined for '"+t+"' with 0 difference, please adjust the scale.");return null;}else{p=this._get("dateField-"+t+"-relative-"+(D<0?"past":"future")+"-one");}}}if(!p){p=this._get("dateField-"+t+"-relative-"+(D<0?"past":"future")+"-other");}return p;},getRelativeSecond:function(D){return this._getRelative("second",D);},getRelativeMinute:function(D){return this._getRelative("minute",D);},getRelativeHour:function(D){return this._getRelative("hour",D);},getRelativeDay:function(D){return this._getRelative("day",D);},getRelativeWeek:function(D){return this._getRelative("week",D);},getRelativeMonth:function(D){return this._getRelative("month",D);},getRelativeYear:function(D){return this._getRelative("year",D);},getDecimalFormat:function(s,n,p){var f;var F;switch(s){case"long":F=this._get("decimalFormat-long");break;default:F=this._get("decimalFormat-short");break;}if(F){var N=n+"-"+p;f=F[N];if(!f){N=n+"-other";f=F[N];}}return f;},getEra:function(s,i,e){if(typeof i==="string"){e=i;i=undefined;}var E=this._getCalendarData("era-"+s,e),n,m=0,N;if(i!==undefined&&i!==null){return E[""+i];}else{for(n in E){N=parseInt(n,10);if(N>m){m=N;}}return E[""+m];}},getCalendarWeek:function(s,w){var m=sap.ui.getCore().getLibraryResourceBundle("sap.ui.core"),k="date.week.calendarweek."+s;return m.getText(k,w);},getPreferredCalendarType:function(){var s=this._get("calendarPreference"),e=s?s.split(" "):[],f,t,i;for(i=0;i<e.length;i++){f=e[i];for(t in sap.ui.core.CalendarType){if(f===g(t).substring(3).toLowerCase()){return t;}}}return sap.ui.core.CalendarType.Gregorian;}});var M={"orientation":"left-to-right","languages":{},"scripts":{},"territories":{},"ca-gregorian":{"dateFormat-full":"EEEE, MMMM d, y","dateFormat-long":"MMMM d, y","dateFormat-medium":"MMM d, y","dateFormat-short":"M/d/yy","timeFormat-full":"h:mm:ss a zzzz","timeFormat-long":"h:mm:ss a z","timeFormat-medium":"h:mm:ss a","timeFormat-short":"h:mm a","dateTimeFormat-full":"{1} 'at' {0}","dateTimeFormat-long":"{1} 'at' {0}","dateTimeFormat-medium":"{1}, {0}","dateTimeFormat-short":"{1}, {0}","intervalFormatFallback":"{0} – {1}","months-format-abbreviated":["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],"months-format-wide":["January","February","March","April","May","June","July","August","September","October","November","December"],"months-format-narrow":["1","2","3","4","5","6","7","8","9","10","11","12"],"months-standAlone-abbreviated":["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],"months-standAlone-wide":["January","February","March","April","May","June","July","August","September","October","November","December"],"months-standAlone-narrow":["1","2","3","4","5","6","7","8","9","10","11","12"],"days-format-abbreviated":["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],"days-format-wide":["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],"days-format-narrow":["S","M","T","W","T","F","S"],"days-standAlone-abbreviated":["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],"days-standAlone-wide":["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],"days-standAlone-narrow":["S","M","T","W","T","F","S"],"quarters-format-narrow":["1","2","3","4"],"quarters-format-abbreviated":["Q1","Q2","Q3","Q4"],"quarters-format-wide":["1st quarter","2nd quarter","3rd quarter","4th quarter"],"quarters-standAlone-narrow":["1","2","3","4"],"quarters-standAlone-abbreviated":["Q1","Q2","Q3","Q4"],"quarters-standAlone-wide":["1st quarter","2nd quarter","3rd quarter","4th quarter"],"dayPeriods-format-narrow":["AM","PM"],"dayPeriods-format-wide":["AM","PM"],"dayPeriods-format-abbreviated":["AM","PM"],"era-wide":"Anno Domini","era-abbreviated":"AD","era-narrow":"A"},"dateField-year-displayName":"Year","dateField-year-relative--1":"last year","dateField-year-relative-0":"this year","dateField-year-relative-1":"next year","dateField-year-relative-future-one":"in {0} year","dateField-year-relative-future-other":"in {0} years","dateField-year-relative-past-one":"{0} year ago","dateField-year-relative-past-other":"{0} years ago","dateField-month-displayName":"Month","dateField-month-relative--1":"last month","dateField-month-relative-0":"this month","dateField-month-relative-1":"next month","dateField-month-relative-future-one":"in {0} month","dateField-month-relative-future-other":"in {0} months","dateField-month-relative-past-one":"{0} month ago","dateField-month-relative-past-other":"{0} months ago","dateField-week-displayName":"Week","dateField-week-relative--1":"last week","dateField-week-relative-0":"this week","dateField-week-relative-1":"next week","dateField-week-relative-future-one":"in {0} week","dateField-week-relative-future-other":"in {0} weeks","dateField-week-relative-past-one":"{0} week ago","dateField-week-relative-past-other":"{0} weeks ago","dateField-day-displayName":"Day","dateField-day-relative--1":"yesterday","dateField-day-relative-0":"today","dateField-day-relative-1":"tomorrow","dateField-day-relative-future-one":"in {0} day","dateField-day-relative-future-other":"in {0} days","dateField-day-relative-past-one":"{0} day ago","dateField-day-relative-past-other":"{0} days ago","dateField-hour-displayName":"Hour","dateField-hour-relative-future-one":"in {0} hour","dateField-hour-relative-future-other":"in {0} hours","dateField-hour-relative-past-one":"{0} hour ago","dateField-hour-relative-past-other":"{0} hours ago","dateField-minute-displayName":"Minute","dateField-minute-relative-future-one":"in {0} minute","dateField-minute-relative-future-other":"in {0} minutes","dateField-minute-relative-past-one":"{0} minute ago","dateField-minute-relative-past-other":"{0} minutes ago","dateField-second-displayName":"Second","dateField-second-relative-0":"now","dateField-second-relative-future-one":"in {0} second","dateField-second-relative-future-other":"in {0} seconds","dateField-second-relative-past-one":"{0} second ago","dateField-second-relative-past-other":"{0} seconds ago","decimalFormat":{"standard":"#,##0.###"},"currencyFormat":{"standard":"¤#,##0.00"},"percentFormat":{"standard":"#,##0%"},"symbols-latn-decimal":".","symbols-latn-group":",","symbols-latn-plusSign":"+","symbols-latn-minusSign":"-","symbols-latn-percentSign":"%","weekData-minDays":4,"weekData-firstDay":1,"weekData-weekendStart":6,"weekData-weekendEnd":0};var b={"iw":"he","ji":"yi","in":"id","sh":"sr"};var c=(function(){var e=L._cldrLocales,r={},i;if(e){for(i=0;i<e.length;i++){r[e[i]]=true;}}return r;}());var l={};function g(s){return"ca-"+s.toLowerCase();}function d(o){var s=o.getLanguage()||"",S=o.getScript()||"",r=o.getRegion()||"",D;function m(f,h){var n,v,j;if(!h){return;}for(n in h){if(h.hasOwnProperty(n)){v=f[n];j=h[n];if(v===undefined){f[n]=j;}else if(v===null){delete f[n];}else if(typeof v==='object'&&typeof j==='object'){m(v,j);}}}}function e(i){if(!l[i]&&(!c||c[i]===true)){var f=l[i]=q.sap.loadResource("sap/ui/core/cldr/"+i+".json",{dataType:"json",failOnError:false});if(f&&f.__fallbackLocale){m(f,e(f.__fallbackLocale));delete f.__fallbackLocale;}}return l[i];}s=(s&&b[s])||s;if(s==="no"){s="nb";}if(s==="zh"&&!r){if(S==="Hans"){r="CN";}else if(S==="Hant"){r="TW";}}var i=s+"_"+r;if(s&&r){D=e(i);}if(!D&&s){D=e(s);}l[i]=D||M;return l[i];}a.extend("sap.ui.core.CustomLocaleData",{constructor:function(o){a.apply(this,arguments);this.mCustomData=sap.ui.getCore().getConfiguration().getFormatSettings().getCustomLocaleData();},_get:function(i){var s,p,r={};if(arguments.length===2){s=i;p=arguments[1];if(s===g(sap.ui.getCore().getConfiguration().getCalendarType())&&this.mCustomData[p]){r[p]=this.mCustomData[p];return r;}}return this.mCustomData[i]||this.mData[i];}});a.getInstance=function(o){return o.hasPrivateUseSubtag("sapufmt")?new sap.ui.core.CustomLocaleData(o):new a(o);};return a;});
