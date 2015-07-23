/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/Device','jquery.sap.dom','jquery.sap.events'],function(q,D){"use strict";(function($){var F=/(?:\?|&)sap-ui-xx-fakeOS=([^&]+)/;$.sap.simulateMobileOnDesktop=false;if((D.browser.webkit||(D.browser.msie&&D.browser.version>=10))&&!q.support.touch){var r=document.location.search.match(F);var a=r&&r[1]||q.sap.byId("sap-ui-bootstrap").attr("data-sap-ui-xx-fakeOS");if(a){$.sap.simulateMobileOnDesktop=true;var u={ios:"Mozilla/5.0 (iPhone; CPU iPhone OS 5_0_1 like Mac OS X) AppleWebKit/534.48 (KHTML, like Gecko) Version/5.1 Mobile/9A406 Safari/7534.48.3",iphone:"Mozilla/5.0 (iPhone; CPU iPhone OS 5_0_1 like Mac OS X) AppleWebKit/534.48 (KHTML, like Gecko) Version/5.1 Mobile/9A406 Safari/7534.48.3",ipad:"Mozilla/5.0 (iPad; CPU OS 5_1_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Mobile/9B206",android:"Mozilla/5.0 (Linux; U; Android 4.0.3; en-us; GT-I9100 Build/IML74K) AppleWebKit/534.46 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.46",android_phone:"Mozilla/5.0 (Linux; U; Android 4.0.3; en-us; GT-I9100 Build/IML74K) AppleWebKit/534.46 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.46",android_tablet:"Mozilla/5.0 (Linux; Android 4.1.2; Nexus 7 Build/JZ054K) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Safari/535.19",blackberry:"Mozilla/5.0 (BB10; Touch) AppleWebKit/537.10+ (KHTML, like Gecko) Version/10.0.9.2372 Mobile Safari/537.10+",winphone:"Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 920)"}[a];if(u&&(D.browser.webkit&&a!=="winphone"||D.browser.msie&&a==="winphone")){if(D.browser.safari){var _=window.navigator;window.navigator=new Object();window.navigator.__proto__=_;window.navigator.__defineGetter__('userAgent',function(){return u})}else{Object.defineProperty(navigator,"userAgent",{get:function(){return u}})}if(D.browser.webkit){q.browser.msie=q.browser.opera=q.browser.mozilla=false;q.browser.webkit=true;q.browser.version="534.46"}else{}D._update($.sap.simulateMobileOnDesktop)}}}$.os=$.extend({os:D.os.name,version:D.os.versionStr,fVersion:D.os.version},$.os);$.os[D.os.name]=true;$.extend($.support,{retina:window.devicePixelRatio>=2});$.device=$.extend({},$.device);$.device.is=$.extend({standalone:window.navigator.standalone,landscape:D.orientation.landscape,portrait:D.orientation.portrait,iphone:D.os.ios&&D.system.phone,ipad:D.os.ios&&D.system.tablet,android_phone:D.system.phone&&D.os.android,android_tablet:D.system.tablet&&D.os.android,tablet:D.system.tablet,phone:D.system.phone,desktop:D.system.desktop},$.device.is);var b=false;$.sap.initMobile=function(o){var c=$("head");if(!b){b=true;o=$.extend({},{viewport:true,statusBar:"default",hideBrowser:true,preventScroll:true,preventPhoneNumberDetection:true,useFullScreenHeight:true,homeIconPrecomposed:false},o);if(D.os.ios&&o.preventPhoneNumberDetection){c.append($('<meta name="format-detection" content="telephone=no">'))}else if(D.browser.msie){c.append($('<meta http-equiv="cleartype" content="on">'));c.append($('<meta name="msapplication-tap-highlight" content="no"/>'))}var i=D.os.ios&&D.os.version>=7&&D.os.version<8&&D.browser.name==="sf";if(o.viewport){var m;if(i&&D.system.phone){m='minimal-ui, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'}else if(i&&D.system.tablet){m='initial-scale=1.0, maximum-scale=1.0, user-scalable=no'}else if($.device.is.iphone&&(Math.max(window.screen.height,window.screen.width)===568)){m="user-scalable=0, initial-scale=1.0"}else if(D.os.android&&D.os.version<3){m="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"}else if(D.os.winphone){m="width=320, user-scalable=no"}else{m="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"}c.append($('<meta name="viewport" content="'+m+'">'))}if(D.os.ios){c.append($('<meta name="apple-mobile-web-app-capable" content="yes">'));c.append($('<meta name="apple-mobile-web-app-status-bar-style" content="'+o.statusBar+'">'))}if(o.preventScroll){$(window).bind("touchmove",function sapInitMobileTouchMoveHandle(e){if(!e.isMarked()){e.preventDefault()}})}if(o.useFullScreenHeight){$(function(){document.documentElement.style.height="100%"})}}if(o&&o.homeIcon){var I;if(typeof o.homeIcon==="string"){I={phone:o.homeIcon}}else{I=$.extend({},o.homeIcon)}I.precomposed=o.homeIconPrecomposed||I.precomposed;I.favicon=o.homeIcon.icon||I.favicon;I.icon=undefined;$.sap.setIcons(I)}};$.sap.setIcons=function(i){if(!i||(typeof i!=="object")){$.sap.log.warning("Call to jQuery.sap.setIcons() has been ignored because there were no icons given or the argument was not an object.");return}var c=$("head"),p=i.precomposed?"-precomposed":"",g=function(h){return i[h]||i['tablet@2']||i['phone@2']||i['phone']||i['tablet']},s={"phone":"","tablet":"72x72","phone@2":"114x114","tablet@2":"144x144"};if(i["favicon"]){var d=c.find("[rel^=shortcut]");d.each(function(){if(this.rel==="shortcut icon"){$(this).remove()}});c.append($('<link rel="shortcut icon" href="'+i["favicon"]+'" />'))}if(g("phone")){c.find("[rel=apple-touch-icon]").remove();c.find("[rel=apple-touch-icon-precomposed]").remove()}for(var e in s){i[e]=i[e]||g(e);if(i[e]){var f=s[e];c.append($('<link rel="apple-touch-icon'+p+'" '+(f?'sizes="'+f+'"':"")+' href="'+i[e]+'" />'))}}}})(q);return q},false);
