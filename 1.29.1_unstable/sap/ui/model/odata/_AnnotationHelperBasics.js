/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/base/BindingParser'],function(q,B){'use strict';var r=/[\\\{\}:]/,a,u={"Edm.Boolean":"sap.ui.model.odata.type.Boolean","Edm.Byte":"sap.ui.model.odata.type.Byte","Edm.DateTime":"sap.ui.model.odata.type.DateTime","Edm.DateTimeOffset":"sap.ui.model.odata.type.DateTimeOffset","Edm.Decimal":"sap.ui.model.odata.type.Decimal","Edm.Double":"sap.ui.model.odata.type.Double","Edm.Float":"sap.ui.model.odata.type.Single","Edm.Guid":"sap.ui.model.odata.type.Guid","Edm.Int16":"sap.ui.model.odata.type.Int16","Edm.Int32":"sap.ui.model.odata.type.Int32","Edm.Int64":"sap.ui.model.odata.type.Int64","Edm.SByte":"sap.ui.model.odata.type.SByte","Edm.Single":"sap.ui.model.odata.type.Single","Edm.String":"sap.ui.model.odata.type.String","Edm.Time":"sap.ui.model.odata.type.Time"};a={descend:function(p,P,e){a.expectType(p,typeof P==="number"?"array":"object");p={path:p.path+"/"+P,value:p.value[P]};if(e){a.expectType(p,e);}return p;},error:function(p,m){m=p.path+": "+m;q.sap.log.error(m,a.toErrorString(p.value),"sap.ui.model.odata.AnnotationHelper");throw new SyntaxError(m);},expectType:function(p,e){var E,v=p.value;if(e==="array"){E=!Array.isArray(v);}else{E=typeof v!==e||v===null||Array.isArray(v);}if(E){a.error(p,"Expected "+e);}},property:function(p,P,e){return a.descend(p,P,e).value;},resultToString:function(R,e,w){var v=R.value;function b(A){var c,s;A=A&&!R.ignoreTypeInPath;if(r.test(v)||A){s="{path:"+a.toJSON(v);if(A&&R.type){s+=",type:'"+u[R.type]+"'";c=a.toJSON(R.constraints);if(c&&c!=="{}"){s+=",constraints:"+c;}}return s+"}";}return"{"+v+"}";}switch(R.result){case"binding":return e?"$"+b(false):b(w);case"composite":if(e){throw new Error("Trying to embed a composite binding into an expression binding");}return v;case"constant":if(R.type==="edm:Null"){return e?"null":"";}return e?a.toJSON(v):B.complexParser.escape(v);case"expression":return e?v:"{="+v+"}";}},toErrorString:function(v){var j;if(typeof v!=="function"){try{j=a.toJSON(v);if(j!==undefined&&j!=="null"){return j;}}catch(e){}}return String(v);},toJSON:function(v){var s,e=false,R="",i,c;s=JSON.stringify(v);if(s===undefined){return undefined;}for(i=0;i<s.length;i+=1){switch(c=s.charAt(i)){case"'":R+="\\'";break;case'"':if(e){R+=c;e=false;}else{R+="'";}break;case"\\":if(e){R+="\\\\";}e=!e;break;default:if(e){R+="\\";e=false;}R+=c;}}return R;}};return a;},false);
