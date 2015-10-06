/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global"],function(q){"use strict";var b={"Bool":"false"},B={"Bool":"true"},f={"interval":"SingleInterval","multi-value":"MultiValue","single-value":"SingleValue"},s={"bday":"Contact","city":"Contact/adr","country":"Contact/adr","email":"Contact/email","familyname":"Contact/n","givenname":"Contact/n","honorific":"Contact/n","middlename":"Contact/n","name":"Contact","nickname":"Contact","note":"Contact","org":"Contact","org-role":"Contact","org-unit":"Contact","photo":"Contact","pobox":"Contact/adr","region":"Contact/adr","street":"Contact/adr","suffix":"Contact/n","tel":"Contact/tel","title":"Contact","zip":"Contact/adr","class":"Event","dtend":"Event","dtstart":"Event","duration":"Event","fbtype":"Event","location":"Event","status":"Event","transp":"Event","wholeday":"Event","body":"Message","from":"Message","received":"Message","sender":"Message","subject":"Message","completed":"Task","due":"Task","percent-complete":"Task","priority":"Task"},r=/(\w+)(?:;type=([\w,]+))?/,v={"email":{typeMapping:{"home":"home","pref":"preferred","work":"work"},v4EnumType:"com.sap.vocabularies.Communication.v1.ContactInformationType",v4PropertyAnnotation:"com.sap.vocabularies.Communication.v1.IsEmailAddress"},"tel":{typeMapping:{"cell":"cell","fax":"fax","home":"home","pref":"preferred","video":"video","voice":"voice","work":"work"},v4EnumType:"com.sap.vocabularies.Communication.v1.PhoneType",v4PropertyAnnotation:"com.sap.vocabularies.Communication.v1.IsPhoneNumber"}},V={creatable:{"Org.OData.Capabilities.V1.InsertRestrictions":{"Insertable":b}},deletable:{"Org.OData.Capabilities.V1.DeleteRestrictions":{"Deletable":b}},pageable:{"Org.OData.Capabilities.V1.SkipSupported":b,"Org.OData.Capabilities.V1.TopSupported":b},"requires-filter":{"Org.OData.Capabilities.V1.FilterRestrictions":{"RequiresFilter":B}},topable:{"Org.OData.Capabilities.V1.TopSupported":b},updatable:{"Org.OData.Capabilities.V1.UpdateRestrictions":{"Updatable":b}}},m={"city":"locality","email":"address","familyname":"surname","givenname":"given","honorific":"prefix","middlename":"additional","name":"fn","org-role":"role","org-unit":"orgunit","percent-complete":"percentcomplete","tel":"uri","zip":"code"},a={"sap:filterable":["Org.OData.Capabilities.V1.FilterRestrictions","NonFilterableProperties"],"sap:required-in-filter":["Org.OData.Capabilities.V1.FilterRestrictions","RequiredProperties"],"sap:sortable":["Org.OData.Capabilities.V1.SortRestrictions","NonSortableProperties"]},U;U={addEntitySetAnnotation:function(o,e,t,n,d){if(t==="EntitySet"&&e.value===n){if(d){q.extend(true,o,V[e.name]);}else{q.extend(o,V[e.name]);}}},addFilterRestriction:function(p,e){var F,c=f[p["sap:filter-restriction"]];if(!c){q.sap.log.warning("Unsupported sap:filter-restriction: "+p["sap:filter-restriction"],e.entityType+"."+p.name,"sap.ui.model.odata._ODataMetaModelUtils");return;}F=e["com.sap.vocabularies.Common.v1.FilterExpressionRestrictions"]||[];F.push({"Property":{"PropertyPath":p.name},"AllowedExpressions":{"EnumMember":"com.sap.vocabularies.Common.v1.FilterExpressionType/"+c}});e["com.sap.vocabularies.Common.v1.FilterExpressionRestrictions"]=F;},addPropertyToAnnotation:function(c,e,p){var n=a[c],t=n[0],C=n[1],A=e[t]||{},d=A[C]||[];d.push({"PropertyPath":p.name});A[C]=d;e[t]=A;},addSapSemantics:function(t){if(t.property){t.property.forEach(function(p){var A,i,M,S,T,c=p["sap:semantics"],d,e,o,g,h;if(!c){return;}M=r.exec(c);if(!M){q.sap.log.warning("Unsupported sap:semantics: "+c,t.name+"."+p.name,"sap.ui.model.odata._ODataMetaModelUtils");return;}if(M[2]){c=M[1];h=U.getV4TypesForV2Semantics(c,M[2],p,t);}g=v[c];i=c==="tel"||c==="email";e=s[c];if(e){A=e.split("/");d="com.sap.vocabularies.Communication.v1."+A[0];t[d]=t[d]||{};o=t[d];S=A[1];if(S){o[S]=o[S]||(i?[]:{});if(i){T={};o[S].push(T);o=T;}else{o=o[S];}}o[m[c]||c]={"Path":p.name};if(h){o.type={"EnumMember":h};}}if(g){p[g.v4PropertyAnnotation]=p[g.v4PropertyAnnotation]||B;}});}},addUnitAnnotation:function(o,p){var u=o["sap:unit"],i=U.findIndex(p,u),c;if(i>=0){c=p[i];if(c["sap:semantics"]==="unit-of-measure"){o["Org.OData.Measures.V1.Unit"]={"Path":c.name};}else if(c["sap:semantics"]==="currency-code"){o["Org.OData.Measures.V1.ISOCurrency"]={"Path":c.name};}}},addV4Annotation:function(o,e,t){var T;switch(e.name){case"display-format":if(e.value==="NonNegative"){o["com.sap.vocabularies.Common.v1.IsDigitSequence"]=B;}else if(e.value==="UpperCase"){o["com.sap.vocabularies.Common.v1.IsUpperCase"]=B;}break;case"pageable":case"topable":U.addEntitySetAnnotation(o,e,t,"false",false);break;case"creatable":case"deletable":case"updatable":U.addEntitySetAnnotation(o,e,t,"false",true);break;case"deletable-path":T="Org.OData.Core.V1.DeleteRestrictions";o[T]=o[T]||{};o[T].Deletable={"Path":e.value};break;case"updatable-path":T="Org.OData.Core.V1.UpdateRestrictions";o[T]=o[T]||{};o[T].Updatable={"Path":e.value};break;case"requires-filter":U.addEntitySetAnnotation(o,e,t,"true",true);break;case"field-control":o["com.sap.vocabularies.Common.v1.FieldControl"]={"Path":e.value};break;case"heading":o["com.sap.vocabularies.Common.v1.Heading"]={"String":e.value};break;case"label":o["com.sap.vocabularies.Common.v1.Label"]={"String":e.value};break;case"precision":o["Org.OData.Measures.V1.Scale"]={"Path":e.value};break;case"quickinfo":o["com.sap.vocabularies.Common.v1.QuickInfo"]={"String":e.value};break;case"text":o["com.sap.vocabularies.Common.v1.Text"]={"Path":e.value};break;case"visible":if(e.value==="false"){o["com.sap.vocabularies.Common.v1.FieldControl"]={"EnumMember":"com.sap.vocabularies.Common.v1.FieldControlType/Hidden"};}break;default:}},calculateEntitySetAnnotations:function(e,E){if(E.property){E.property.forEach(function(p){if(p["sap:filterable"]==="false"){U.addPropertyToAnnotation("sap:filterable",e,p);}if(p["sap:required-in-filter"]==="true"){U.addPropertyToAnnotation("sap:required-in-filter",e,p);}if(p["sap:sortable"]==="false"){U.addPropertyToAnnotation("sap:sortable",e,p);}if(p["sap:filter-restriction"]){U.addFilterRestriction(p,e);}});}},findIndex:function(A,e,p){var I=-1;p=p||"name";if(A){A.forEach(function(o,i){if(o[p]===e){I=i;return false;}});}return I;},findObject:function(A,e,p){var i=U.findIndex(A,e,p);return i<0?null:A[i];},getChildAnnotations:function(A,Q,i){var o=i?A.EntityContainer:A.propertyAnnotations;return o&&o[Q]||{};},getFromContainer:function(e,A,n,c){var k,R=c?undefined:null;if(e){k=U.findIndex(e[A],n);if(k>=0){R=c?e.$path+"/"+A+"/"+k:e[A][k];}}return R;},getObject:function(M,A,Q,c){var d,R=c?undefined:null,S,i,n,N;Q=Q||"";i=Q.lastIndexOf(".");n=Q.slice(0,i);N=Q.slice(i+1);S=U.getSchema(M,n);if(S){d=S[A];if(d){d.forEach(function(t){if(t.name===N){R=c?t.$path:t;return false;}});}}return R;},getSchema:function(M,n){var S=null,c=Array.isArray(M)?M:(M.getObject("/dataServices/schema")||[]);c.forEach(function(o){if(o.namespace===n){S=o;return false;}});return S;},getV4TypesForV2Semantics:function(S,t,p,T){var R=[],o=v[S];if(o){t.split(",").forEach(function(c){var d=o.typeMapping[c];if(d){R.push(o.v4EnumType+"/"+d);}else if(q.sap.log.isLoggable(q.sap.log.Level.WARNING)){q.sap.log.warning("Unsupported type for sap:semantics: "+c,T.name+"."+p.name,"sap.ui.model.odata._ODataMetaModelUtils");}});}return R.join(" ");},getValueLists:function(p){var n,Q,c={};for(n in p){if(q.sap.startsWith(n,"com.sap.vocabularies.Common.v1.ValueList")){Q=n.split("#")[1]||"";c[Q]=p[n];}}return c;},liftSAPData:function(o,t){if(!o.extensions){return;}o.extensions.forEach(function(e){if(e.namespace==="http://www.sap.com/Protocols/SAPData"){o["sap:"+e.name]=e.value;U.addV4Annotation(o,e,t);}});switch(t){case"Property":if(o["sap:updatable"]==="false"){if(o["sap:creatable"]==="false"){o["Org.OData.Core.V1.Computed"]=B;}else{o["Org.OData.Core.V1.Immutable"]=B;}}break;case"EntitySet":if(o["sap:searchable"]!=="true"){o["Org.OData.Capabilities.V1.SearchRestrictions"]={"Searchable":b};}break;default:}},merge:function(A,d){var S=d.dataServices.schema||[];S.forEach(function(o,i){delete o.annotations;U.liftSAPData(o);o.$path="/dataServices/schema/"+i;q.extend(o,A[o.namespace]);U.visitParents(o,A,"association",function(c,C){U.visitChildren(c.end,C);});U.visitParents(o,A,"complexType",function(c,C){U.visitChildren(c.property,C,"Property");U.addSapSemantics(c);});U.visitParents(o,A,"entityType",U.visitEntityType);U.visitParents(o,A,"entityContainer",function(e,c){U.visitChildren(e.associationSet,c);U.visitChildren(e.entitySet,c,"EntitySet",S);U.visitChildren(e.functionImport,c,"",null,U.visitParameters.bind(this,A,o,e));});});},visitChildren:function(c,C,t,S,d,i){if(!c){return;}if(i){c=c.slice(i);}c.forEach(function(o){U.liftSAPData(o,t);});c.forEach(function(o){var e;if(t==="Property"&&o["sap:unit"]){U.addUnitAnnotation(o,c);}else if(t==="EntitySet"){e=U.getObject(S,"entityType",o.entityType);U.calculateEntitySetAnnotations(o,e);}if(d){d(o);}q.extend(o,C[o.name||o.role]);});},visitEntityType:function(e,c){U.visitChildren(e.property,c,"Property");U.visitChildren(e.navigationProperty,c);U.addSapSemantics(e);},visitParameters:function(A,S,e,F){var c;if(!F.parameter){return;}c=U.getChildAnnotations(A,S.namespace+"."+e.name,true);F.parameter.forEach(function(p){U.liftSAPData(p);q.extend(p,c[F.name+"/"+p.name]);});},visitParents:function(S,A,c,C,i){var p=S[c];function d(P,j){var Q=S.namespace+"."+P.name,e=U.getChildAnnotations(A,Q,c==="entityContainer");U.liftSAPData(P);P.namespace=S.namespace;P.$path=S.$path+"/"+c+"/"+j;C(P,e);q.extend(P,A[Q]);}if(!p){return;}if(i!==undefined){d(p[i],i);}else{p.forEach(d);}}};return U;},false);
