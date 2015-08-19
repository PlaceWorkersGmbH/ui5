/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/core/format/NumberFormat','sap/ui/model/FormatException','sap/ui/model/odata/type/ODataType','sap/ui/model/ParseException','sap/ui/model/ValidateException'],function(N,F,O,P,V){"use strict";var r=/^[-+]?(\d+)(?:\.(\d+))?$/;function g(t){var f,S;if(!t.oFormat){f={groupingEnabled:true,maxIntegerDigits:Infinity};S=b(t);if(S!==Infinity){f.minFractionDigits=f.maxFractionDigits=S;}f=jQuery.extend(f,t.oFormatOptions);f.parseAsString=true;t.oFormat=N.getFloatInstance(f);}return t.oFormat;}function a(t){return(t.oConstraints&&t.oConstraints.precision)||Infinity;}function b(t){return(t.oConstraints&&t.oConstraints.scale)||0;}function c(k,p){return sap.ui.getCore().getLibraryResourceBundle().getText(k,p);}function i(t){return!t.oConstraints||t.oConstraints.nullable!==false;}function s(t,C){var n=C&&C.nullable,p=C&&C.precision,S=C&&C.scale,d,e;function v(h,j,m,k){var l=typeof h==="string"?parseInt(h,10):h;if(l===undefined){return j;}if(typeof l!=="number"||isNaN(l)||l<m){jQuery.sap.log.warning("Illegal "+k+": "+h,null,t.getName());return j;}return l;}function f(h,j,k){if(j!=k){t.oConstraints=t.oConstraints||{};t.oConstraints[h]=j;}}e=S==="variable"?Infinity:v(S,0,0,"scale");d=v(p,Infinity,1,"precision");if(e!==Infinity&&d<=e){jQuery.sap.log.warning("Illegal scale: must be less than precision (precision="+p+", scale="+S+")",null,t.getName());e=Infinity;}t.oConstraints=undefined;f("precision",d,Infinity);f("scale",e,0);if(n===false||n==="false"){f("nullable",false,true);}else if(n!==undefined&&n!==true&&n!=="true"){jQuery.sap.log.warning("Illegal nullable: "+n,null,t.getName());}t._handleLocalizationChange();}var D=O.extend("sap.ui.model.odata.type.Decimal",{constructor:function(f,C){O.apply(this,arguments);this.oFormatOptions=f;s(this,C);}});D.prototype.formatValue=function(v,t){if(v===null||v===undefined){return null;}switch(t){case"any":return v;case"float":return parseFloat(v);case"int":return Math.floor(parseFloat(v));case"string":return g(this).format(v);default:throw new F("Don't know how to format "+this.getName()+" to "+t);}};D.prototype.parseValue=function(v,S){var R;if(v===null||v===""){return null;}switch(S){case"string":R=g(this).parse(v);if(!R){throw new P(sap.ui.getCore().getLibraryResourceBundle().getText("EnterNumber"));}if(R.indexOf(".")>=0){R=R.replace(/0+$/,"").replace(/\.$/,"");}break;case"int":case"float":R=N.getFloatInstance({maxIntegerDigits:Infinity,decimalSeparator:".",groupingEnabled:false}).format(v);break;default:throw new P("Don't know how to parse "+this.getName()+" from "+S);}return R;};D.prototype._handleLocalizationChange=function(){this.oFormat=null;};D.prototype.validateValue=function(v){var f,I,m,p,S;if(v===null&&i(this)){return;}if(typeof v!=="string"){throw new V(c("EnterNumber"));}m=r.exec(v);if(!m){throw new V(c("EnterNumber"));}I=m[1].length;f=(m[2]||"").length;S=b(this);p=a(this);if(f>S){if(S===0){throw new V(c("EnterInt"));}else if(I+S>p){throw new V(c("EnterNumberIntegerFraction",[p-S,S]));}throw new V(c("EnterNumberFraction",[S]));}if(S===Infinity){if(I+f>p){throw new V(c("EnterNumberPrecision",[p]));}}else if(I>p-S){throw new V(c("EnterNumberInteger",[p-S]));}};D.prototype.getName=function(){return"sap.ui.model.odata.type.Decimal";};return D;});
