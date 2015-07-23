/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/support/Plugin','jquery.sap.encoder','jquery.sap.script'],function(q,P){"use strict";var T=P.extend("sap.ui.core.support.plugins.TechInfo",{constructor:function(S){P.apply(this,["sapUiSupportTechInfo","Technical Information",S]);this._aEventIds=this.isToolPlugin()?[this.getId()+"Data",this.getId()+"FinishedE2ETrace"]:[this.getId()+"ToggleDebug",this.getId()+"SetReboot",this.getId()+"Refresh",this.getId()+"StartE2ETrace",this.getId()+"ToggleStatistics"];if(this.isToolPlugin()){this.e2eLogLevel="medium";this.e2eTraceStarted=false;}}});T.prototype.onsapUiSupportTechInfoData=function(e){var t=this;var d=e.getParameter("data");d.modules.sort();this.e2eTraceStarted=d["e2e-trace"].isStarted;var h=["<div class='sapUiSupportToolbar'>","<a href='javascript:void(0);' id='",t.getId(),"-Refresh' class='sapUiSupportLink'>Refresh</a>","<div><div class='sapUiSupportTechInfoCntnt'>","<table border='0' cellpadding='3'>"];l(h,true,true,"SAPUI5 Version",function(b){try{var v=sap.ui.getVersionInfo();var V="<a href='"+sap.ui.resource("","sap-ui-version.json")+"' target='_blank' title='Open Version Info'>"+v.version+"</a>";b.push(V," (built at ",v.buildTimestamp,", last change ",v.scmRevision,")");}catch(a){b.push("not available");}});l(h,true,true,"Core Version",function(b){b.push(d.version," (built at ",d.build,", last change ",d.change,")");});l(h,true,true,"User Agent",function(b){b.push(q.sap.escapeHTML(d.useragent),(d.docmode?", Document Mode '"+d.docmode+"'":""));});l(h,true,true,"Debug Sources",function(b){b.push((d.debug?"ON":"OFF"),"<a href='javascript:void(0);' id='",t.getId(),"-tggleDbgSrc' class='sapUiSupportLink'>Toggle</a>");});l(h,true,true,"Application",d.appurl);m(h,true,true,"Configuration (bootstrap)",d.bootconfig);m(h,true,true,"Configuration (computed)",d.config);if(!q.isEmptyObject(d.libraries)){m(h,true,true,"Libraries",d.libraries);}m(h,true,true,"Loaded Libraries",d.loadedLibraries);l(h,true,true,"Loaded Modules",function(b){q.each(d.modules,function(i,v){if(v.indexOf("sap.ui.core.support")<0){b.push("<span>",v,"</span>");if(i<d.modules.length-1){b.push(", ");}}});});m(h,true,true,"URI Parameters",d.uriparams);l(h,true,true,"E2E Trace",function(b){b.push("<label class='sapUiSupportLabel'>Trace Level:</label>","<select id='",t.getId(),"-logLevelE2ETrace' class='sapUiSupportTxtFld' style='margin-left:10px'>","<option value='low'"+(t.e2eLogLevel==='low'?" selected":"")+">LOW</option>","<option value='medium'"+(t.e2eLogLevel==='medium'?" selected":"")+">MEDIUM</option>","<option value='high'"+(t.e2eLogLevel==='hight'?" selected":"")+">HIGH</option>","</select>");b.push("<button id='"+t.getId()+"-startE2ETrace' class='sapUiSupportBtn "+(d["e2e-trace"].isStarted?" active":"")+"' style='margin-left: 10px;'>"+(d["e2e-trace"].isStarted?"Running...":"Start")+"</button>");b.push("<div style='margin-top:5px'>");b.push("<label class='sapUiSupportLabel'>XML Output:</label>");b.push("<textarea id='"+t.getId()+"-outputE2ETrace' style='width:100%;height:50px;margin-top:5px;resize:none;box-sizing:border-box'></textarea>");b.push("</div>");});l(h,true,true,"SAP-statistics for oData calls",function(b){b.push((d.statistics?"ON":"OFF"),"<a href='javascript:void(0);' id='",t.getId(),"-tggleStatistics' class='sapUiSupportLink'>Toggle</a>");});h.push("</table></div>");this.$().html(h.join(""));this.$("tggleDbgSrc").bind("click",function(){sap.ui.core.support.Support.getStub().sendEvent(t.getId()+"ToggleDebug",{});});this.$("Refresh").bind("click",function(){sap.ui.core.support.Support.getStub().sendEvent(t.getId()+"Refresh",{});});this.$("outputE2ETrace").bind("click",function(){this.focus();this.select();});this.$("tggleStatistics").bind("click",function(){sap.ui.core.support.Support.getStub().sendEvent(t.getId()+"ToggleStatistics",{});});this.$("startE2ETrace").bind("click",function(){if(!t.e2eTraceStarted){t.e2eLogLevel=t.$("logLevelE2ETrace").val();t.$("startE2ETrace").addClass("active").text("Running...");t.$("outputE2ETrace").text("");sap.ui.core.support.Support.getStub().sendEvent(t.getId()+"StartE2ETrace",{level:t.e2eLogLevel});t.e2eTraceStarted=true;}});document.title="SAPUI5 Diagnostics - "+d.title;};T.prototype.onsapUiSupportTechInfoToggleDebug=function(e){q.sap.debug(!q.sap.debug());s(this);};T.prototype.onsapUiSupportTechInfoSetReboot=function(e){q.sap.setReboot(e.getParameter("rebootUrl"));};T.prototype.onsapUiSupportTechInfoStartE2ETrace=function(e){if(!q.sap.isDeclared("sap.ui.core.support.trace.E2eTraceLib")){q.sap.require("sap.ui.core.support.trace.E2eTraceLib");}var t=this;sap.ui.core.support.trace.E2eTraceLib.start(e.getParameter("level"),function(a){sap.ui.core.support.Support.getStub().sendEvent(t.getId()+"FinishedE2ETrace",{trace:a});});};T.prototype.onsapUiSupportTechInfoFinishedE2ETrace=function(e){this.$("startE2ETrace").removeClass("active").text("Start");this.$("outputE2ETrace").text(e.getParameter("trace"));this.e2eTraceStarted=false;};T.prototype.onsapUiSupportTechInfoRefresh=function(e){s(this);};T.prototype.onsapUiSupportTechInfoToggleStatistics=function(e){q.sap.statistics(!q.sap.statistics());s(this);};T.prototype.init=function(S){P.prototype.init.apply(this,arguments);if(!this.isToolPlugin()){s(this);return;}this.$().html("No Information available");};function s(p){var c=sap.ui.getCore().getConfiguration();var C={"theme":c.getTheme(),"language":c.getLanguage(),"formatLocale":c.getFormatLocale(),"accessibility":""+c.getAccessibility(),"animation":""+c.getAnimation(),"rtl":""+c.getRTL(),"debug":""+c.getDebug(),"inspect":""+c.getInspect(),"originInfo":""+c.getOriginInfo(),"noDuplicateIds":""+c.getNoDuplicateIds()};var L={};var r=q.sap.syncGetJSON(sap.ui.resource("","sap-ui-version.json"));if(r.success){var a=r.data;var b=a&&a.libraries;q.each(b,function(i,e){L[e.name]=e.version;});}var o={};q.each(sap.ui.getCore().getLoadedLibraries(),function(n,e){o[n]=e.version;});var d={"version":sap.ui.version,"build":sap.ui.buildinfo.buildtime,"change":sap.ui.buildinfo.lastchange,"useragent":navigator.userAgent,"docmode":document.documentMode||"","debug":q.sap.debug(),"bootconfig":window["sap-ui-config"]||{},"config":C,"libraries":L,"loadedLibraries":o,"modules":q.sap.getAllDeclaredModules(),"uriparams":q.sap.getUriParameters().mParams,"appurl":window.location.href,"title":document.title,"statistics":q.sap.statistics()};if(q.sap.isDeclared("sap.ui.core.support.trace.E2eTraceLib")){d["e2e-trace"]={isStarted:sap.ui.core.support.trace.E2eTraceLib.isStarted()};}else{d["e2e-trace"]={isStarted:false};}sap.ui.core.support.Support.getStub().sendEvent(p.getId()+"Data",{data:d});}function l(b,r,a,c,d){b.push("<tr><td ",r?"align='right' ":"","valign='top'>","<label class='sapUiSupportLabel'>",q.sap.escapeHTML(c),"</label></td><td",a?" class='sapUiSupportTechInfoBorder'":"",">");var e=d;if(q.isFunction(d)){e=d(b)||"";}b.push(q.sap.escapeHTML(e));b.push("</td></tr>");}function m(b,r,a,c,d){l(b,r,a,c,function(b){b.push("<table border='0' cellspacing='0' cellpadding='3'>");q.each(d,function(i,v){var e="";if(v){if(typeof(v)==="string"||typeof(v)==="string"||typeof(v)==="boolean"){e=v;}else if((q.isArray(v)||q.isPlainObject(v))&&window.JSON){e=window.JSON.stringify(v);}}l(b,false,false,i,""+e);});b.push("</table>");});}return T;},true);
