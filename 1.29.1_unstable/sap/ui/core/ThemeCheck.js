/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/Device','sap/ui/base/Object','jquery.sap.script'],function(q,D,B){"use strict";sap.ui._maxThemeCheckCycles=100;var T=B.extend("sap.ui.core.ThemeCheck",{constructor:function(C){this._oCore=C;this._iCount=0;this._CUSTOMCSSCHECK=/\.sapUiThemeDesignerCustomCss/i;this._CUSTOMID="sap-ui-core-customcss";this._customCSSAdded=false;this._themeCheckedForCustom=null;this._mAdditionalLibCss={};},getInterface:function(){return this;},fireThemeChangedEvent:function(o,f){c(this);var u=sap.ui._maxThemeCheckCycles>0;if(u||f){d.apply(this,[true]);}else{T.themeLoaded=true;}if(!o&&!this._sThemeCheckId){this._oCore.fireThemeChanged({theme:this._oCore.getConfiguration().getTheme()});}}});T.themeLoaded=false;T.checkStyle=function(s,l){if(typeof(s)==="string"){s=q.sap.domById(s);}var S=q(s);try{var r=!s||!!((s.sheet&&s.sheet.cssRules.length>0)||!!(s.styleSheet&&s.styleSheet.cssText.length>0)||!!(s.innerHTML&&s.innerHTML.length>0));var f=S.attr("sap-ui-ready");f=!!(f==="true"||f==="false");if(l){q.sap.log.debug("ThemeCheck: Check styles '"+S.attr("id")+"': "+r+"/"+f+"/"+!!s);}return r||f;}catch(e){}if(l){q.sap.log.debug("ThemeCheck: Error during check styles '"+S.attr("id")+"': false/false/"+!!s);}return false;};function c(t){T.themeLoaded=false;if(t._sThemeCheckId){q.sap.clearDelayedCall(t._sThemeCheckId);t._sThemeCheckId=null;t._iCount=0;t._mAdditionalLibCss={};}}function a(t){var l=t._oCore.getLoadedLibraries();var s=t._oCore.getConfiguration().getTheme();var p=t._oCore._getThemePath("sap.ui.core",s)+"custom.css";var r=true;if(!!t._customCSSAdded&&t._themeCheckedForCustom===s){l[t._CUSTOMID]={};}function e(f){r=r&&T.checkStyle("sap-ui-theme-"+f,true);if(!!r){if(D.browser.msie&&D.browser.version<=9){var S=q.sap.domById("sap-ui-theme-"+f);var R=S&&S.sheet&&S.sheet.rules&&S.sheet.rules.length?S.sheet.rules.length:0;if(R===4095){var n=parseInt(q(S).attr("sap-ui-css-count"),10);if(isNaN(n)){n=1;}else{n+=1;}var A="ie9_"+n;var g=this.name+"-"+A;var L="sap-ui-theme-"+g;if(!t._mAdditionalLibCss[g]&&!q.sap.domById(L)){t._mAdditionalLibCss[g]={name:this.name};var o;if(f!==this.name){o=q.sap.domById("sap-ui-theme-"+this.name);}else{o=S;}var h=new URI(o.getAttribute("href"));var i=h.suffix();var F=h.filename();if(i.length>0){i="."+i;F=F.slice(0,-i.length);}h.filename(F+"_"+A+i);var H=h.toString();var j=document.createElement("link");j.type="text/css";j.rel="stylesheet";j.href=H;j.id=L;q(j).attr("sap-ui-css-count",n).load(function(){q(j).attr("sap-ui-ready","true");}).error(function(){q(j).attr("sap-ui-ready","false");});S.parentNode.insertBefore(j,S.nextSibling);}}}if(t._themeCheckedForCustom!=s){if(b(t,f)){q.sap.includeStyleSheet(p,t._CUSTOMID);t._customCSSAdded=true;q.sap.log.warning("ThemeCheck delivered custom CSS needs to be loaded, Theme not yet applied");t._themeCheckedForCustom=s;r=false;return false;}else{var k=q("LINK[id='"+t._CUSTOMID+"']");if(k.length>0){k.remove();q.sap.log.debug("Custom CSS removed");}t._customCSSAdded=false;}}}}q.each(l,e);q.each(t._mAdditionalLibCss,e);if(!r){q.sap.log.warning("ThemeCheck: Theme not yet applied.");}else{t._themeCheckedForCustom=s;}return r;}function b(t,l){var r=2,s=false,R=[];if(q.sap.domById("sap-ui-theme-"+l)){var e=q.sap.domById("sap-ui-theme-"+l);if(e.sheet){R=e.sheet.cssRules;}else if(e.styleSheet){R=e.styleSheet.rules;}}if(R.length==0){q.sap.log.warning("Custom check: Failed retrieving a CSS rule from stylesheet "+l);return false;}for(var i=0;(i<r&&i<R.length);i++){if(t._CUSTOMCSSCHECK.test(R[i].selectorText)){s=true;}}return s;}function d(f){this._iCount++;var e=this._iCount>sap.ui._maxThemeCheckCycles;if(!a(this)&&!e){this._sThemeCheckId=q.sap.delayedCall(2,this,d);}else if(!f){c(this);T.themeLoaded=true;this._oCore.fireThemeChanged({theme:this._oCore.getConfiguration().getTheme()});if(e){q.sap.log.warning("ThemeCheck: max. check cycles reached.");}}else{T.themeLoaded=true;}}return T;},true);
