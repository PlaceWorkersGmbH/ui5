/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(function(){"use strict";var E=(function(){var a={};a.getBytesFromString=function(s){var b=[];for(var i=0;i<s.length;++i){b.push(s.charCodeAt(i));}return b;};a.createHexString=function(b){var r="";for(var i=0;i<b.length;i++){var s=b[i].toString(16);s=Array(2-s.length+1).join("0")+s;r+=s;}return r;};a.passportHeader=function(t,R,T){var S=[0x2A,0x54,0x48,0x2A,0x03,0x01,0x30,0x00,0x00,0x53,0x41,0x50,0x5F,0x45,0x32,0x45,0x5F,0x54,0x41,0x5F,0x50,0x6C,0x75,0x67,0x49,0x6E,0x20,0x20,0x20,0x20,0x20,0x20,0x20,0x20,0x20,0x20,0x20,0x20,0x20,0x20,0x20,0x00,0x00,0x53,0x41,0x50,0x5F,0x45,0x32,0x45,0x5F,0x54,0x41,0x5F,0x55,0x73,0x65,0x72,0x20,0x20,0x20,0x20,0x20,0x20,0x20,0x20,0x20,0x20,0x20,0x20,0x20,0x20,0x20,0x20,0x20,0x53,0x41,0x50,0x5F,0x45,0x32,0x45,0x5F,0x54,0x41,0x5F,0x52,0x65,0x71,0x75,0x65,0x73,0x74,0x20,0x20,0x20,0x20,0x20,0x20,0x20,0x20,0x20,0x20,0x20,0x20,0x20,0x20,0x20,0x20,0x20,0x20,0x20,0x20,0x20,0x20,0x00,0x05,0x53,0x41,0x50,0x5F,0x45,0x32,0x45,0x5F,0x54,0x41,0x5F,0x50,0x6C,0x75,0x67,0x49,0x6E,0x20,0x20,0x20,0x20,0x20,0x20,0x20,0x20,0x20,0x20,0x20,0x20,0x20,0x20,0x20,0x34,0x36,0x33,0x35,0x30,0x30,0x30,0x30,0x30,0x30,0x33,0x31,0x31,0x45,0x45,0x30,0x41,0x35,0x44,0x32,0x35,0x30,0x39,0x39,0x39,0x43,0x33,0x39,0x32,0x42,0x36,0x38,0x20,0x20,0x20,0x00,0x07,0x46,0x35,0x00,0x00,0x00,0x31,0x1E,0xE0,0xA5,0xD2,0x4E,0xDB,0xB2,0xE4,0x4B,0x68,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x02,0x00,0xE2,0x2A,0x54,0x48,0x2A,0x01,0x00,0x27,0x00,0x00,0x02,0x00,0x03,0x00,0x02,0x00,0x01,0x04,0x00,0x08,0x58,0x00,0x02,0x00,0x02,0x04,0x00,0x08,0x30,0x00,0x02,0x00,0x03,0x02,0x00,0x0B,0x00,0x00,0x00,0x00,0x2A,0x54,0x48,0x2A,0x01,0x00,0x23,0x01,0x00,0x01,0x00,0x01,0x00,0x02,0x00,0x01,0x03,0x00,0x17,0x00,0xAB,0xCD,0xEF,0xAB,0xCD,0xEF,0xAB,0xCD,0xEF,0xAB,0xCD,0xEF,0xAB,0xCD,0xEF,0x2A,0x54,0x48,0x2A];var b=[372,32];var c=[149,32];var C=[9,32];var P=[117,32];var d=[7,2];var p=a.getBytesFromString("SAP_E2E_TA_UI5LIB");p=p.concat(a.getBytesFromString(new Array(32+1-p.length).join(' ')));S.splice.apply(S,C.concat(p));S.splice.apply(S,P.concat(p));S.splice.apply(S,c.concat(a.getBytesFromString(T)));S.splice.apply(S,d.concat(t));var r=a.createHexString(S).toUpperCase();return r.substring(0,b[0]).concat(R)+r.substring(b[0]+b[1]);};a.traceFlags=function(l){switch(l){case'low':return[0x00,0x00];case'medium':return[0x89,0x0A];case'high':return[0x9F,0x0D];default:var r=[];r.push((parseInt(l,16)&0xFF00)/256);r.push((parseInt(l,16)&0xFF));return r;}};a.createGUID=function(){var S=function(){var t=Math.floor(Math.random()*0x10000);return(new Array(4+1-t.toString(16).length)).join('0')+t.toString(16);};var b=function(){var t=(Math.floor(Math.random()*0x10000)&0x0fff)+0x4000;return(new Array(4+1-t.toString(16).length)).join('0')+t.toString(16);};var c=function(){var t=(Math.floor(Math.random()*0x10000)&0x3fff)+0x8000;return(new Array(4+1-t.toString(16).length)).join('0')+t.toString(16);};var r=(S()+S()+S()+b()+c()+S()+S()+S());return r.toUpperCase();};return a;})();return E;},true);
