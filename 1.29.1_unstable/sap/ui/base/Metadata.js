/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','jquery.sap.script'],function(q){"use strict";var M=function(c,C){if(!C||typeof C.metadata!=="object"){C={metadata:C||{},constructor:q.sap.getObject(c)};C.metadata.__version=1.0;}C.metadata.__version=C.metadata.__version||2.0;if(typeof C.constructor!=="function"){throw Error("constructor for class "+c+" must have been declared before creating metadata for it");}this._sClassName=c;this._oClass=C.constructor;this.extend(C);};M.prototype.extend=function(c){this.applySettings(c);this.afterApplySettings();};M.prototype.applySettings=function(c){var t=this,s=c.metadata,p;if(s.baseType){var P=q.sap.getObject(s.baseType);if(typeof P!=="function"){q.sap.log.fatal("base class '"+s.baseType+"' does not exist");}if(P.getMetadata){this._oParent=P.getMetadata();}else{this._oParent=new M(s.baseType,{});}}else{this._oParent=undefined;}this._bAbstract=!!s["abstract"];this._bFinal=!!s["final"];this._sStereotype=s.stereotype||(this._oParent?this._oParent._sStereotype:"object");this._bDeprecated=!!s["deprecated"];this._aInterfaces=s.interfaces||[];this._aPublicMethods=s.publicMethods||[];this._bInterfacesUnique=false;p=this._oClass.prototype;q.sap.forIn(c,function(n,v){if(n!=="metadata"&&n!=="constructor"){p[n]=v;if(!n.match(/^_|^on|^init$|^exit$/)){t._aPublicMethods.push(n);}}});};M.prototype.afterApplySettings=function(){if(this._oParent){this._aAllPublicMethods=this._oParent._aAllPublicMethods.concat(this._aPublicMethods);this._bInterfacesUnique=false;}else{this._aAllPublicMethods=this._aPublicMethods;}};M.prototype.getStereotype=function(){return this._sStereotype;};M.prototype.getName=function(){return this._sClassName;};M.prototype.getClass=function(){return this._oClass;};M.prototype.getParent=function(){return this._oParent;};M.prototype._dedupInterfaces=function(){if(!this._bInterfacesUnique){q.sap.unique(this._aInterfaces);q.sap.unique(this._aPublicMethods);q.sap.unique(this._aAllPublicMethods);this._bInterfacesUnique=true;}};M.prototype.getPublicMethods=function(){this._dedupInterfaces();return this._aPublicMethods;};M.prototype.getAllPublicMethods=function(){this._dedupInterfaces();return this._aAllPublicMethods;};M.prototype.getInterfaces=function(){this._dedupInterfaces();return this._aInterfaces;};M.prototype.isInstanceOf=function(I){if(this._oParent){if(this._oParent.isInstanceOf(I)){return true;}}var a=this._aInterfaces;for(var i=0,l=a.length;i<l;i++){if(a[i]===I){return true;}}return false;};M.prototype.isAbstract=function(){return this._bAbstract;};M.prototype.isFinal=function(){return this._bFinal;};M.prototype.isDeprecated=function(){return this._bDeprecated;};M.prototype.addPublicMethods=function(m){var n=(m instanceof Array)?m:arguments;Array.prototype.push.apply(this._aPublicMethods,n);Array.prototype.push.apply(this._aAllPublicMethods,n);this._bInterfacesUnique=false;};M.createClass=function(b,c,C,F){if(typeof b==="string"){F=C;C=c;c=b;b=null;}F=F||M;if(typeof F.preprocessClassInfo==="function"){C=F.preprocessClassInfo(C);}C=C||{};C.metadata=C.metadata||{};if(!C.hasOwnProperty('constructor')){C.constructor=undefined;}var f=C.constructor;if(b){if(!f){if(C.metadata.deprecated){f=function(){q.sap.log.warning("Usage of deprecated class: "+c);b.apply(this,arguments);};}else{f=function(){b.apply(this,arguments);};}}f.prototype=q.sap.newObject(b.prototype);f.prototype.constructor=f;C.metadata.baseType=b.getMetadata().getName();}else{f=f||function(){};delete C.metadata.baseType;}C.constructor=f;q.sap.setObject(c,f);var m=new F(c,C);f.getMetadata=f.prototype.getMetadata=q.sap.getter(m);if(!f.getMetadata().isFinal()){f.extend=function(s,S,a){return M.createClass(f,s,S,a||F);};}return f;};return M;},true);
