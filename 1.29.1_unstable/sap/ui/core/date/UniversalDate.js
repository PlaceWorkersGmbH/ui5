/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/base/Object'],function(q,B){"use strict";var U=B.extend("sap.ui.core.date.UniversalDate",{constructor:function(){var c=b();this._oInnerImplType=c.oImplClass;this._sCalendarType=c.sCalendarType;if(!this||!(this instanceof U)){return new this._oInnerImplType().toString();}B.apply(this);var A=arguments.length;switch(A){case 0:this._oInnerDate=new this._oInnerImplType();break;case 1:this._oInnerDate=new this._oInnerImplType(arguments[0]);break;case 2:this._oInnerDate=new this._oInnerImplType(arguments[0],arguments[1]);break;case 3:this._oInnerDate=new this._oInnerImplType(arguments[0],arguments[1],arguments[2]);break;case 4:this._oInnerDate=new this._oInnerImplType(arguments[0],arguments[1],arguments[2],arguments[3]);break;case 5:this._oInnerDate=new this._oInnerImplType(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4]);break;case 6:this._oInnerDate=new this._oInnerImplType(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]);break;default:this._oInnerDate=new this._oInnerImplType(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4],arguments[5],arguments[6]);}g.call(this);}});function g(){if(U.prototype.getDate!==undefined){return;}var G=["getDate","getMonth","getFullYear","getYear","getDay","getHours","getMinutes","getSeconds","getMilliseconds","getUTCDate","getUTCMonth","getUTCFullYear","getUTCDay","getUTCHours","getUTCMinutes","getUTCSeconds","getUTCMilliseconds","getTime","valueOf","getTimezoneOffset","toDateString","toGMTString","toISOString","toJSON","toLocaleDateString","toLocaleString","toLocaleTimeString","toTimeString","toUTCString","toString"];var s=["setDate","setFullYear","setYear","setMonth","setHours","setMinutes","setSeconds","setMilliseconds","setUTCDate","setUTCFullYear","setUTCMonth","setUTCHours","setUTCMinutes","setUTCSeconds","setUTCMilliseconds"];var I=G.concat(s);var c=function(m){return function(){return this._oInnerImplType.prototype[m].apply(this._oInnerDate,arguments);};};for(var i=0;i<I.length;i++){var m=I[i];U.prototype[m]=c(m);}}function a(){if(U.UTC!==undefined){return;}var s=["UTC","now","parse"];var c=function(m){return function(){var S=b().oImplClass;return S[m].apply(S,arguments);};};for(var i=0;i<s.length;i++){var m=s[i];U[m]=c(m);}}U.prototype.getCalendarType=function(){return this._sCalendarType;};function b(c){var r={oImplClass:Date},C=sap.ui.getCore().getConfiguration();r.sCalendarType=c||C.getCalendarType();var s=sap.ui.core.CalendarTypeToClassMap[r.sCalendarType];if(s){q.sap.require(s);r.oImplClass=q.sap.getObject(s);}return r;}a();return U;},true);
