/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/format/NumberFormat','sap/ui/model/CompositeType','sap/ui/model/FormatException','sap/ui/model/ParseException','sap/ui/model/ValidateException'],function(q,N,C,F,P,V){"use strict";var a=C.extend("sap.ui.model.type.Currency",{constructor:function(){C.apply(this,arguments);this.sName="Currency";this.bUseRawValues=true;}});a.prototype.formatValue=function(v,i){var b=v;if(v==undefined||v==null){return null;}if(this.oInputFormat){b=this.oInputFormat.parse(v);}if(!q.isArray(b)){throw new F("Cannot format currency: "+v+" has the wrong format");}if(b[0]==undefined||b[0]==null){return null;}switch(this.getPrimitiveType(i)){case"string":return this.oOutputFormat.format(b);case"int":case"float":case"any":default:throw new F("Don't know how to format currency to "+i);}};a.prototype.parseValue=function(v,i){var r,b;switch(this.getPrimitiveType(i)){case"string":r=this.oOutputFormat.parse(v);if(!q.isArray(r)){b=sap.ui.getCore().getLibraryResourceBundle();throw new P(b.getText("Currency.Invalid",[v]));}break;case"int":case"float":default:throw new P("Don't know how to parse Currency from "+i);}if(this.oInputFormat){r=this.oInputFormat.format(r);}return r;};a.prototype.validateValue=function(v){var i=v[0];if(this.oConstraints){var b=sap.ui.getCore().getLibraryResourceBundle(),c=[],m=[];q.each(this.oConstraints,function(n,o){switch(n){case"minimum":if(i<o){c.push("minimum");m.push(b.getText("Currency.Minimum",[o]));}break;case"maximum":if(i>o){c.push("maximum");m.push(b.getText("Currency.Maximum",[o]));}}});if(c.length>0){throw new V(m.join(" "),c);}}};a.prototype.setFormatOptions=function(f){this.oFormatOptions=f;this._createFormats();};a.prototype._handleLocalizationChange=function(){this._createFormats();};a.prototype._createFormats=function(){var s=this.oFormatOptions.source;this.oOutputFormat=N.getCurrencyInstance(this.oFormatOptions);if(s){if(q.isEmptyObject(s)){s={groupingEnabled:false,groupingSeparator:",",decimalSeparator:"."};}this.oInputFormat=N.getCurrencyInstance(s);}};return a;});
