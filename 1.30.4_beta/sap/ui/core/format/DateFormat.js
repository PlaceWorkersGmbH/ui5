/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/LocaleData','sap/ui/core/date/IslamicDate','jquery.sap.strings'],function(q,L,I){"use strict";var D=function(){throw new Error();};D.oDateInfo={oDefaultFormatOptions:{style:"medium"},aFallbackFormatOptions:[{style:"short"},{style:"medium"},{pattern:"yyyy-MM-dd"},{pattern:"yyyyMMdd",strictParsing:true}],bShortFallbackFormatOptions:true,getPattern:function(l,s,c){return l.getDatePattern(s,c);},oRequiredParts:{"text":true,"year":true,"weekYear":true,"month":true,"day":true},bSupportRelative:true};D.oDateTimeInfo={oDefaultFormatOptions:{style:"medium"},aFallbackFormatOptions:[{style:"short"},{style:"medium"},{pattern:"yyyy-MM-dd'T'HH:mm:ss"},{pattern:"yyyyMMdd HHmmss"}],getPattern:function(l,s,c){var d=l.getDateTimePattern(s,c),a=l.getDatePattern(s,c),t=l.getTimePattern(s,c);return d.replace("{1}",a).replace("{0}",t);},oRequiredParts:{"text":true,"year":true,"weekYear":true,"month":true,"day":true,"hour0_23":true,"hour1_24":true,"hour0_11":true,"hour1_12":true}};D.oTimeInfo={oDefaultFormatOptions:{style:"medium"},aFallbackFormatOptions:[{style:"short"},{style:"medium"},{pattern:"HH:mm:ss"},{pattern:"HHmmss"}],getPattern:function(l,s,c){return l.getTimePattern(s,c);},oRequiredParts:{"text":true,"hour0_23":true,"hour1_24":true,"hour0_11":true,"hour1_12":true}};D.getInstance=function(f,l){return this.getDateInstance(f,l);};D.getDateInstance=function(f,l){return this.createInstance(f,l,this.oDateInfo);};D.getDateTimeInstance=function(f,l){return this.createInstance(f,l,this.oDateTimeInfo);};D.getTimeInstance=function(f,l){return this.createInstance(f,l,this.oTimeInfo);};D.createInstance=function(f,l,o){var F=q.sap.newObject(this.prototype);if(f instanceof sap.ui.core.Locale){l=f;f=undefined;}if(!l){l=sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale();}F.oLocale=l;F.oLocaleData=L.getInstance(l);F.oFormatOptions=q.extend(false,{},o.oDefaultFormatOptions,f);if(!F.oFormatOptions.calendarType){F.oFormatOptions.calendarType=sap.ui.getCore().getConfiguration().getCalendarType();}if(!F.oFormatOptions.pattern){F.oFormatOptions.pattern=o.getPattern(F.oLocaleData,F.oFormatOptions.style,F.oFormatOptions.calendarType);}if(!o.aFallbackFormats){if(o.bShortFallbackFormatOptions&&o.aFallbackFormatOptions){var p=o.getPattern(F.oLocaleData,"short").replace(/[^dMyU]/g,"");p=p.replace(/d+/g,"dd");p=p.replace(/M+/g,"MM");o.aFallbackFormatOptions.push({pattern:p.replace(/[yU]+/g,"yyyy"),strictParsing:true});o.aFallbackFormatOptions.push({pattern:p.replace(/[yU]+/g,"yy"),strictParsing:true});}o.aFallbackFormats=[];q.each(o.aFallbackFormatOptions,function(i,f){var a=D.createInstance(f,l,o);a.bIsFallback=true;o.aFallbackFormats.push(a);});}F.aFallbackFormats=o.aFallbackFormats;F.oRequiredParts=o.oRequiredParts;F.bSupportRelative=!!o.bSupportRelative;F.init();return F;};D.prototype.init=function(){var c=this.oFormatOptions.calendarType;this.aMonthsAbbrev=this.oLocaleData.getMonths("abbreviated",c);this.aMonthsWide=this.oLocaleData.getMonths("wide",c);this.aMonthsAbbrevSt=this.oLocaleData.getMonthsStandAlone("abbreviated",c);this.aMonthsWideSt=this.oLocaleData.getMonthsStandAlone("wide",c);this.aDaysAbbrev=this.oLocaleData.getDays("abbreviated",c);this.aDaysWide=this.oLocaleData.getDays("wide",c);this.aDaysAbbrevSt=this.oLocaleData.getDaysStandAlone("abbreviated",c);this.aDaysWideSt=this.oLocaleData.getDaysStandAlone("wide",c);this.aQuartersAbbrev=this.oLocaleData.getQuarters("abbreviated",c);this.aQuartersWide=this.oLocaleData.getQuarters("wide",c);this.aQuartersAbbrevSt=this.oLocaleData.getQuartersStandAlone("abbreviated",c);this.aQuartersWideSt=this.oLocaleData.getQuartersStandAlone("wide",c);this.aDayPeriods=this.oLocaleData.getDayPeriods("abbreviated",c);this.aFormatArray=this.parseJavaDateFormat(this.oFormatOptions.pattern);this.sAllowedCharacters=this.getAllowedCharacters(this.aFormatArray);};D.prototype.oStates={"G":"era","y":"year","Y":"weekYear","M":"month","L":"monthStandalone","w":"weekInYear","W":"weekInMonth","D":"dayInYear","d":"day","Q":"quarter","q":"quarterStandalone","F":"dayOfWeekInMonth","E":"dayNameInWeek","c":"dayNameInWeekStandalone","u":"dayNumberOfWeek","a":"amPmMarker","H":"hour0_23","k":"hour1_24","K":"hour0_11","h":"hour1_12","m":"minute","s":"second","S":"millisecond","z":"timezoneGeneral","Z":"timezoneRFC822","X":"timezoneISO8601"};D.prototype.format=function(d,u){if(u===undefined){u=this.oFormatOptions.UTC;}var c=this.oFormatOptions.calendarType;if((c===sap.ui.core.CalendarType.Islamic)&&d instanceof Date){d=new I(d.getTime());}if(this.bSupportRelative&&this.oFormatOptions.relative){var r=this.formatRelative(d,u,this.oFormatOptions.relativeRange||[-6,6]);if(r){return r;}}var b=[],p,a=u?d.getUTCDay():d.getDay(),e=u?d.getUTCDate():d.getDate(),m=u?d.getUTCMonth():d.getMonth(),y=u?d.getUTCFullYear():d.getFullYear(),M=u?d.getUTCMilliseconds():d.getMilliseconds(),s=u?d.getUTCSeconds():d.getSeconds(),f=u?d.getUTCMinutes():d.getMinutes(),h=u?d.getUTCHours():d.getHours(),t=Math.abs(d.getTimezoneOffset()),P=d.getTimezoneOffset()>0,H=Math.floor(t/60),g=t%60,Q=Math.floor(m/3),Y,w,j,R;for(var i=0;i<this.aFormatArray.length;i++){p=this.aFormatArray[i];switch(p.sType){case"text":b.push(p.sValue);break;case"day":b.push(q.sap.padLeft(String(e),"0",p.iDigits));break;case"dayNameInWeek":if(p.iDigits<4){b.push(this.aDaysAbbrev[a]);}else if(p.iDigits>=4){b.push(this.aDaysWide[a]);}break;case"dayNameInWeekStandalone":if(p.iDigits<4){b.push(this.aDaysAbbrevSt[a]);}else if(p.iDigits>=4){b.push(this.aDaysWideSt[a]);}break;case"dayNumberOfWeek":b.push(a||7);break;case"month":if(p.iDigits==3){b.push(this.aMonthsAbbrev[m]);}else if(p.iDigits>=4){b.push(this.aMonthsWide[m]);}else{b.push(q.sap.padLeft(String(m+1),"0",p.iDigits));}break;case"monthStandalone":if(p.iDigits==3){b.push(this.aMonthsAbbrevSt[m]);}else if(p.iDigits>=4){b.push(this.aMonthsWideSt[m]);}else{b.push(q.sap.padLeft(String(m+1),"0",p.iDigits));}break;case"quarter":if(p.iDigits==3){b.push(this.aQuartersAbbrev[Q]);}else if(p.iDigits>=4){b.push(this.aQuartersWide[Q]);}else{b.push(q.sap.padLeft(String(Q+1),"0",p.iDigits));}break;case"quarterStandalone":if(p.iDigits==3){b.push(this.aQuartersAbbrevSt[Q]);}else if(p.iDigits>=4){b.push(this.aQuartersWideSt[Q]);}else{b.push(q.sap.padLeft(String(Q+1),"0",p.iDigits));}break;case"era":if(p.iDigits<=3){b.push(this.oLocaleData.getEra("abbreviated",c));}else if(p.iDigits===4){b.push(this.oLocaleData.getEra("wide",c));}else{b.push(this.oLocaleData.getEra("narrow",c));}break;case"year":case"weekYear":Y=""+y;if(p.iDigits==2&&Y.length>2){Y=Y.substr(Y.length-2);}if(p.iDigits==1&&y<100){Y=q.sap.padLeft(Y,"0",4);}b.push(q.sap.padLeft(Y,"0",p.iDigits));break;case"weekInYear":w="";if(d.getWeek){w+=d.getWeek();}b.push(q.sap.padLeft(w,"0",p.iDigits));break;case"hour0_23":b.push(q.sap.padLeft(String(h),"0",p.iDigits));break;case"hour1_24":if(h==0){j="24";}else{j=String(h);}b.push(q.sap.padLeft(j,"0",p.iDigits));break;case"hour0_11":if(h>11){j=String(h-12);}else{j=String(h);}b.push(q.sap.padLeft(j,"0",p.iDigits));break;case"hour1_12":if(h>12){j=String(h-12);}else if(h==0){j="12";}else{j=String(h);}b.push(q.sap.padLeft(j,"0",p.iDigits));break;case"minute":b.push(q.sap.padLeft(String(f),"0",p.iDigits));break;case"second":b.push(q.sap.padLeft(String(s),"0",p.iDigits));break;case"millisecond":b.push(q.sap.padRight(q.sap.padLeft(String(M),"0",Math.min(3,p.iDigits)),"0",p.iDigits));break;case"amPmMarker":var k=h<12?0:1;b.push(this.aDayPeriods[k]);break;case"timezoneGeneral":if(p.iDigits>3&&d.getTimezoneLong){b.push(d.getTimezoneLong());break;}else if(d.getTimezoneShort){b.push(d.getTimezoneShort());break;}b.push("GMT");case"timezoneISO8601":if(!u&&t!=0){b.push(P?"-":"+");b.push(q.sap.padLeft(String(H),"0",2));b.push(":");b.push(q.sap.padLeft(String(g),"0",2));}else{b.push("Z");}break;case"timezoneRFC822":if(!u&&t!=0){b.push(P?"-":"+");b.push(q.sap.padLeft(String(H),"0",2));b.push(q.sap.padLeft(String(g),"0",2));}break;}}R=b.join("");if(sap.ui.getCore().getConfiguration().getOriginInfo()){R=new String(R);R.originInfo={source:"Common Locale Data Repository",locale:this.oLocale.toString(),style:this.oFormatOptions.style,pattern:this.oFormatOptions.pattern};}return R;};D.prototype.parse=function(v,u,s){if(u===undefined){u=this.oFormatOptions.UTC;}if(s===undefined){s=this.oFormatOptions.strictParsing;}var d,a=0,b=null,m=null,y=null,h=null,M=null,S=null,c=null,Q=null,p=false,P,e,t=null,V=true,f,F,r=this.oRequiredParts,C=this.oFormatOptions.calendarType,g=[this.aDaysWide,this.aDaysWideSt,this.aDaysAbbrev,this.aDaysAbbrevSt],k=[this.aMonthsWide,this.aMonthsWideSt,this.aMonthsAbbrev,this.aMonthsAbbrevSt],l=[this.aQuartersWide,this.aQuartersWideSt,this.aQuartersAbbrev,this.aQuartersAbbrevSt];function n(j){return j>=48&&j<=57;}function o(j){var J=0;while(J<j&&n(v.charCodeAt(a+J))){J++;}return v.substr(a,J);}function w(J){var K=-1,N=0;for(var j=0;j<J.length;j++){if(J[j].length>N&&v.indexOf(J[j],a)==a){K=j;N=J[j].length;}}return{index:K,value:K===-1?null:J[K]};}function x(j){var J=v.charAt(a)=="+"?-1:1;a++;e=o(2);var K=parseInt(e,10);a=a+2;if(j){a++;}e=o(2);a=a+2;t=parseInt(e,10);t=(t+60*K)*J;}function z(j,J){if(j in r&&J){V=false;}}function A(j){f=w(j);if(f.index!==-1){a+=f.value.length;return true;}}v=q.trim(v);if(this.bSupportRelative){var d=this.parseRelative(v,u);if(d){return d;}}for(var i=0;i<this.aFormatArray.length;i++){P=this.aFormatArray[i];switch(P.sType){case"text":if(v.indexOf(P.sValue,a)==a){a+=P.sValue.length;}else{z(P.sType,this.aFormatArray[i+1].sType in r);}break;case"day":e=o(Math.max(P.iDigits,2));z(P.sType,e==="");a+=e.length;b=parseInt(e,10);if(s&&b>31){V=false;}break;case"dayNameInWeek":case"dayNameInWeekStandalone":g.some(A);break;case"dayNumberOfWeek":e=o(P.iDigits);a+=e.length;break;case"month":case"monthStandalone":if(P.iDigits<3){e=o(Math.max(P.iDigits,2));z(P.sType,e==="");m=parseInt(e,10)-1;a+=e.length;if(s&&m>11){V=false;}}else{F=k.some(A);if(F){m=f.index;}else{z(P.sType,true);}}break;case"quarter":case"quarterStandalone":if(P.iDigits<3){e=o(Math.max(P.iDigits,2));z(P.sType,e==="");Q=parseInt(e,10)-1;a+=e.length;if(s&&Q>3){V=false;}}else{F=l.some(A);if(F){Q=f.index;}else{z(P.sType,true);}}break;case"era":if(P.iDigits<=3){e="abbreviated";}else if(P.iDigits===4){e="wide";}else{e="narrow";}a+=(this.oLocaleData.getEra(e).length);break;case"year":case"weekYear":if(P.iDigits==1){e=o(4);}else if(P.iDigits==2){e=o(2);}else{e=o(P.iDigits);}a+=e.length;z(P.sType,e==="");y=parseInt(e,10);if(e.length<=2){var B=this._now().getFullYear(),E=Math.floor(B/100),Y=E*100+y-B;if(Y<-70){y+=(E+1)*100;}else if(Y<30){y+=E*100;}else{y+=(E-1)*100;}}break;case"weekInYear":break;case"hour0_23":e=o(Math.max(P.iDigits,2));z(P.sType,e==="");a+=e.length;h=parseInt(e,10);if(s&&h>23){V=false;}break;case"hour1_24":e=o(Math.max(P.iDigits,2));z(P.sType,e==="");a+=e.length;h=parseInt(e,10);if(h==24){h=0;}if(s&&h>23){V=false;}break;case"hour0_11":e=o(Math.max(P.iDigits,2));z(P.sType,e==="");a+=e.length;h=parseInt(e,10);if(s&&h>11){V=false;}break;case"hour1_12":e=o(Math.max(P.iDigits,2));z(P.sType,e==="");a+=e.length;h=parseInt(e,10);if(h==12){h=0;p=true;}if(s&&h>11){V=false;}break;case"minute":e=o(Math.max(P.iDigits,2));z(P.sType,e==="");a+=e.length;M=parseInt(e,10);if(s&&M>59){V=false;}break;case"second":e=o(Math.max(P.iDigits,2));z(P.sType,e==="");a+=e.length;S=parseInt(e,10);if(s&&S>59){V=false;}break;case"millisecond":e=o(Math.max(P.iDigits,3));a+=e.length;e=q.sap.padRight(e,"0",3);c=parseInt(e,10);break;case"amPmMarker":var G=this.aDayPeriods[0],H=this.aDayPeriods[1];if(v.indexOf(G,a)==a){p=false;a+=2;}else if(v.indexOf(H,a)==a){p=true;a+=2;}break;case"timezoneGeneral":var T=v.substring(a,a+3);if(T==="GMT"||T==="UTC"){a=a+3;}else if(v.substring(a,a+2)==="UT"){a=a+2;}else if(v.charAt(a)=="Z"){a=a+1;t=0;break;}else{q.sap.log.error(v+" cannot be parsed correcly by sap.ui.core.format.DateFormat: The given timezone is not supported!");break;}case"timezoneISO8601":if(v.charAt(a)=="Z"){a=a+1;t=0;break;}x(true);break;case"timezoneRFC822":x(false);break;}if(!V){break;}}if(a<v.length){V=false;}if(p){h+=12;}if(V){if(u||t!=null){d=D.createDate(C,0);d.setUTCFullYear(y||1970);d.setUTCMonth(m||0);d.setUTCDate(b||1);d.setUTCHours(h||0);d.setUTCMinutes(M||0);d.setUTCSeconds(S||0);d.setUTCMilliseconds(c||0);if(s&&(b||1)!==d.getUTCDate()){V=false;d=undefined;}else if(t){d.setUTCMinutes((M||0)+t);}}else{d=D.createDate(C,1970,0,1,0,0,0);d.setFullYear(y||1970);d.setMonth(m||0);d.setDate(b||1);d.setHours(h||0);d.setMinutes(M||0);d.setSeconds(S||0);d.setMilliseconds(c||0);if(s&&(b||1)!==d.getDate()){V=false;d=undefined;}}if(V){if(d instanceof I){d=new Date(d.getTime());}return d;}}if(!this.bIsFallback){q.each(this.aFallbackFormats,function(i,j){d=j.parse(v,u,s);if(d){return false;}});return d;}return null;};D.prototype.parseJavaDateFormat=function(f){var F=[],i,Q=false,c=null,s="",n="";for(i=0;i<f.length;i++){var C=f.charAt(i),N,p,P;if(Q){if(C=="'"){p=f.charAt(i-1);P=f.charAt(i-2);N=f.charAt(i+1);if(p=="'"&&P!="'"){Q=false;}else if(N=="'"){i+=1;}else{Q=false;continue;}}if(s=="text"){c.sValue+=C;}else{c={sType:"text",sValue:C};F.push(c);s="text";}}else{if(C=="'"){Q=true;}else if(this.oStates[C]){n=this.oStates[C];if(s==n){c.iDigits++;}else{c={sType:n,iDigits:1};F.push(c);s=n;}}else{if(s=="text"){c.sValue+=C;}else{c={sType:"text",sValue:C};F.push(c);s="text";}}}}return F;};D.prototype._now=function(){return D.createDate(this.oFormatOptions.calendarType);};D.createDate=function(c){switch(c){case sap.ui.core.CalendarType.Islamic:return new(Function.prototype.bind.apply(I,arguments));default:return new(Function.prototype.bind.apply(Date,arguments));}};D.createUTCDate=function(c){var t=Array.prototype.shift.apply(arguments);switch(t){case sap.ui.core.CalendarType.Islamic:return I.UTC.apply(I,arguments);default:return Date.UTC.apply(Date,arguments);}};D.prototype.parseRelative=function(v,u){if(!v){return null;}var t=this,c=this.oFormatOptions.calendarType;function a(d){var f,T,o=t._now(),g,T=D.createUTCDate(c,o.getFullYear(),o.getMonth(),o.getDate()),h=d*(24*60*60*1000);var f=T+h;g=D.createDate(c,f);if(!u){g=D.createDate(c,g.getUTCFullYear(),g.getUTCMonth(),g.getUTCDate());}return g;}var p,_,b,i,s;try{for(i=-2;i<=2;i++){p=this.oLocaleData.getRelativeDay(i);s=i<0?-1:1;if(p.indexOf("{0}")<0){if(Math.abs(i)<=1&&q.sap.startsWithIgnoreCase(v,p)&&v.length==p.length){return a(i);}}else if(q.sap.startsWith(p,"{0}")){_=p.substr(3,p.length);if(q.sap.endsWithIgnoreCase(v,_)){b=v.substr(0,v.length-_.length);return a(parseInt(b,10)*s);}}else if(q.sap.endsWith(p,"{0}")){_=p.substr(0,p.length-3);if(q.sap.startsWithIgnoreCase(v,_)){b=v.substr(_.length,v.length);return a(parseInt(b,10)*s);}}else{_=p.split("{0}");if(_.length==2&&q.sap.startsWithIgnoreCase(v,_[0])&&q.sap.endsWithIgnoreCase(v,_[1])){b=v.substr(_[0].length,v.length-_[1].length);return a(parseInt(b,10)*s);}}}}catch(e){q.sap.log.warning("Relative Date parsing not possible: "+e);}return null;};D.prototype.formatRelative=function(d,u,r){var t=this._now(),c=this.oFormatOptions.calendarType,T=D.createUTCDate(c,t.getFullYear(),t.getMonth(),t.getDate()),i,a,p;if(u){i=D.createUTCDate(c,d.getUTCFullYear(),d.getUTCMonth(),d.getUTCDate());}else{i=D.createUTCDate(c,d.getFullYear(),d.getMonth(),d.getDate());}a=Math.floor((i-T)/(24*60*60*1000));if(a<r[0]||a>r[1]){return null;}p=this.oLocaleData.getRelativeDay(a);return q.sap.formatMessage(p,[Math.abs(a)]);};D.prototype.getAllowedCharacters=function(f){if(this.bSupportRelative&&this.oFormatOptions.relative){return"";}var a="";var n=false;var A=false;var p;for(var i=0;i<this.aFormatArray.length;i++){p=this.aFormatArray[i];switch(p.sType){case"text":if(a.indexOf(p.sValue)<0){a+=p.sValue;}break;case"day":case"year":case"weekYear":case"dayNumberOfWeek":case"weekInYear":case"hour0_23":case"hour1_24":case"hour0_11":case"hour1_12":case"minute":case"second":case"millisecond":if(!n){a+="0123456789";n=true;}break;case"month":case"monthStandalone":if(p.iDigits<3){if(!n){a+="0123456789";n=true;}}else{A=true;}break;default:A=true;break;}}if(A){a="";}return a;};return D;},true);
