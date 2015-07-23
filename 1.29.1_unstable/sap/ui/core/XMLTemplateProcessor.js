/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./mvc/View'],function(q,V){"use strict";function p(t,v,n,c){var b=sap.ui.base.ManagedObject.bindingParser(v,c,true);if(b&&typeof b==="object"){return b;}var a=v=b||v;var T=sap.ui.base.DataType.getType(t);if(T){if(T instanceof sap.ui.base.DataType){a=T.parseValue(v);}}else{throw new Error("Property "+n+" has unknown type "+t);}return typeof a==="string"?sap.ui.base.ManagedObject.bindingParser.escape(a):a;}function l(x){return x.localName||x.baseName||x.nodeName;}var X={};X.loadTemplate=function(t,e){var r=q.sap.getResourceName(t,"."+(e||"view")+".xml");return q.sap.loadResource(r).documentElement;};X.parseViewAttributes=function(x,v,s){var a=v.getMetadata().getAllProperties();for(var i=0;i<x.attributes.length;i++){var b=x.attributes[i];if(b.name==='controllerName'){v._controllerName=b.value;}else if(b.name==='resourceBundleName'){v._resourceBundleName=b.value;}else if(b.name==='resourceBundleUrl'){v._resourceBundleUrl=b.value;}else if(b.name==='resourceBundleLocale'){v._resourceBundleLocale=b.value;}else if(b.name==='resourceBundleAlias'){v._resourceBundleAlias=b.value;}else if(b.name==='class'){v.addStyleClass(b.value);}else if(!s[b.name]&&a[b.name]){s[b.name]=p(a[b.name].type,b.value,b.name,v._oContainingView.oController);}}};X.parseTemplate=function(x,v){var r=[];var c=v.sViewName||v._sFragmentName;if(!c){var t=v;var L=0;while(++L<1000&&t&&t!==t._oContainingView){t=t._oContainingView;}c=t.sViewName;}if(v.isSubView()){a(x,true);}else{b(x);}return r;function a(x,R,I){if(x.nodeType===1){var s=l(x);if(x.namespaceURI==="http://www.w3.org/1999/xhtml"||x.namespaceURI==="http://www.w3.org/2000/svg"){r.push("<"+s+" ");for(var i=0;i<x.attributes.length;i++){var h=x.attributes[i];var j=h.value;if(h.name==="id"){j=v._oContainingView.createId(j);}r.push(h.name+"=\""+q.sap.encodeHTML(j)+"\" ");}if(R===true){r.push("data-sap-ui-preserve"+"=\""+v.getId()+"\" ");}r.push(">");if(window.HTMLTemplateElement&&x instanceof HTMLTemplateElement&&x.content instanceof DocumentFragment){b(x.content);}else{b(x);}r.push("</"+s+">");}else if(s==="FragmentDefinition"&&x.namespaceURI==="sap.ui.core"){b(x,false,true);}else{var C=e(x);for(var i=0;i<C.length;i++){var o=C[i];if(v.getMetadata().hasAggregation("content")){v.addAggregation("content",o);}else if(v.getMetadata().hasAssociation(("content"))){v.addAssociation("content",o);}r.push(o);}}}else if(x.nodeType===3&&!I){var k=x.textContent||x.text,m=l(x.parentNode);if(k){if(m!="style"){k=q.sap.encodeHTML(k);}r.push(k);}}}function b(x,R,I){var h=x.childNodes;for(var i=0;i<h.length;i++){a(h[i],R,I);}}function f(n,s){var C;var m=sap.ui.getCore().getLoadedLibraries();q.each(m,function(h,i){if(n===i.namespace||n===i.name){C=i.name+"."+((i.tagNames&&i.tagNames[s])||s);}});C=C||n+"."+s;q.sap.require(C);var o=q.sap.getObject(C);if(o){return o;}else{q.sap.log.error("Can't find object class '"+C+"' for XML-view","","XMLTemplateProcessor.js");}}function d(n){if(n.namespaceURI==="http://www.w3.org/1999/xhtml"||n.namespaceURI==="http://www.w3.org/2000/svg"){var i=n.attributes['id']?n.attributes['id'].textContent||n.attributes['id'].text:null;return[new sap.ui.core.mvc.XMLView({id:i?v._oContainingView.createId(i):undefined,xmlNode:n,containingView:v._oContainingView})];}else{return e(n);}}function e(n){if(l(n)==="ExtensionPoint"&&n.namespaceURI==="sap.ui.core"){return sap.ui.extensionpoint(v,n.getAttribute("name"),function(){var h=n.childNodes;var D=[];for(var i=0;i<h.length;i++){var C=h[i];if(C.nodeType===1){D=q.merge(D,d(C));}}return D;});}else{return g(n);}}function g(n){var h=n.namespaceURI,C=f(h,l(n)),s={},S="",k=[];if(!C){return[];}var m=C.getMetadata();var K=m.getAllSettings();for(var i=0;i<n.attributes.length;i++){var o=n.attributes[i],N=o.name,I=K[N],u=o.value;if(N==="id"){s[N]=v._oContainingView.createId(u);}else if(N==="class"){S+=u;}else if(N==="viewName"){s[N]=u;}else if(N==="fragmentName"){s[N]=u;s['containingView']=v._oContainingView;}else if((N==="binding"&&!I)||N==='objectBindings'){var B=sap.ui.base.ManagedObject.bindingParser(u,v._oContainingView.oController);s.objectBindings=s.objectBindings||{};s.objectBindings[B.model||undefined]=B;}else if(N.indexOf(":")>-1){if(o.namespaceURI==="http://schemas.sap.com/sapui5/extension/sap.ui.core.CustomData/1"){var w=l(o);k.push(new sap.ui.core.CustomData({key:w,value:p("any",u,w,v._oContainingView.oController)}));}else if(N.indexOf("xmlns:")!==0){q.sap.log.warning(v+": XMLView parser encountered and ignored attribute '"+N+"' (value: '"+u+"') with unknown namespace");}}else if(I&&I._iKind===0){s[N]=p(I.type,u,N,v._oContainingView.oController);}else if(I&&I._iKind===1&&I.altTypes){s[N]=p(I.altTypes[0],u,N,v._oContainingView.oController);}else if(I&&I._iKind===2){var B=sap.ui.base.ManagedObject.bindingParser(u,v._oContainingView.oController);if(B){s[N]=B;}else{q.sap.log.error(v+": aggregations with cardinality 0..n only allow binding paths as attribute value (wrong value: "+N+"='"+u+"')");}}else if(I&&I._iKind===3){s[N]=v._oContainingView.createId(u);}else if(I&&I._iKind===4){s[N]=q.map(u.split(/[\s,]+/g),function(j){return j?v._oContainingView.createId(j):null;});}else if(I&&I._iKind===5){var E=V._resolveEventHandler(u,v._oContainingView.oController);if(E){s[N]=E;}else{q.sap.log.warning(v+": event handler function \""+u+"\" is not a function or does not exist in the controller.");}}else if(I&&I._iKind===-1){if(sap.ui.core.mvc.View.prototype.isPrototypeOf(C.prototype)&&N=="async"){s[N]=p(I.type,u,N,v._oContainingView.oController);}else{q.sap.log.warning(v+": setting '"+N+"' for class "+m.getName()+" (value:'"+u+"') is not supported");}}else{}}if(k.length>0){s.customData=k;}function y(n,A,z){var F,G;for(F=n.firstChild;F;F=F.nextSibling){if(F.nodeType===1){G=F.namespaceURI===h&&z&&z[l(F)];if(G){y(F,G);}else if(A){var H=d(F);for(var j=0;j<H.length;j++){var J=H[j];var M=A.name;if(A.multiple){if(!s[M]){s[M]=[];}if(typeof s[M].path==="string"){s[M].template=J;}else{s[M].push(J);}}else{s[M]=J;}}}else if(l(n)!=="FragmentDefinition"||n.namespaceURI!=="sap.ui.core"){throw new Error("Cannot add direct child without default aggregation defined for control "+m.getElementName());}}else if(F.nodeType===3){if(q.trim(F.textContent||F.text)){throw new Error("Cannot add text nodes as direct child of an aggregation. For adding text to an aggregation, a surrounding html tag is needed: "+q.trim(F.textContent||F.text));}}}}var A=m.getDefaultAggregation();var z=m.getAllAggregations();y(n,A,z);var D;if(sap.ui.core.mvc.View.prototype.isPrototypeOf(C.prototype)&&typeof C._sType==="string"){D=sap.ui.view(s,undefined,C._sType);}else{D=new C(s);}if(S&&D.addStyleClass){D.addStyleClass(S);}if(!D){D=[];}else if(!q.isArray(D)){D=[D];}return D;}};return X;},true);
