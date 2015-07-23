/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/base/ManagedObjectMetadata','sap/ui/thirdparty/URI','jquery.sap.resources'],function(q,M,U){"use strict";function p(o,c){for(var k in o){if(!o.hasOwnProperty(k)){continue;}var v=o[k];switch(typeof v){case"object":if(v){p(v,c);}break;case"string":c(o,k,v);break;default:}}}var r=/\{\{([^\}\}]+)\}\}/g;var C=function(c,o){M.apply(this,arguments);};C.prototype=q.sap.newObject(M.prototype);C.preprocessClassInfo=function(c){if(c&&typeof c.metadata==="string"){c.metadata={_src:c.metadata};}return c;};C.prototype.applySettings=function(c){var s=c.metadata;var n=this.getName(),P=n.replace(/\.\w+?$/,"");if(s._src){if(s._src=="component.json"){q.sap.log.warning("Usage of declaration \"metadata: 'component.json'\" is deprecated (component "+n+"). Use \"metadata: 'json'\" instead.");}else if(s._src!="json"){throw new Error("Invalid metadata declaration for component "+n+": \""+s._src+"\"! Use \"metadata: 'json'\" to load metadata from component.json.");}var R=P.replace(/\./g,"/")+"/component.json";q.sap.log.info("The metadata of the component "+n+" is loaded from file "+R+".");try{var o=q.sap.loadResource(R,{dataType:"json"});q.extend(s,o);}catch(e){q.sap.log.error("Failed to load component metadata from \""+R+"\" (component "+n+")! Reason: "+e);}}M.prototype.applySettings.call(this,c);this._sComponentName=P;this._bInitialized=false;this._iInstanceCount=0;var a=this.getParent(),i=/^sap\.ui\.core\.(UI)?Component$/.test(n),b=i&&a&&a._sComponentName;var m=s["manifest"];if(m){s.__metadataVersion=2;if(typeof m==="string"&&m==="json"){var R=P.replace(/\./g,"/")+"/manifest.json";q.sap.log.info("The manifest of the component "+n+" is loaded from file "+R+".");try{var o=q.sap.loadResource(R,{dataType:"json"});m=o;}catch(e){q.sap.log.error("Failed to load component manifest from \""+R+"\" (component "+n+")! Reason: "+e);m={};}}}else{s.__metadataVersion=1;m={};}m["name"]=m["name"]||n;m["sap.app"]=m["sap.app"]||{"id":P};m["sap.ui5"]=m["sap.ui5"]||{};if(b){m["sap.ui5"]["extends"]=m["sap.ui5"]["extends"]||{};m["sap.ui5"]["extends"].component=m["sap.ui5"]["extends"].component||b;}this._convertLegacyMetadata(s,m);s["manifest"]=m;s["processed-manifest"]=null;this._oStaticInfo=s;};C.prototype.init=function(){if(!this._bInitialized){var P=this.getParent();if(P instanceof C){P.init();}this._loadDependencies();this._loadIncludes();this._bInitialized=true;}};C.prototype.exit=function(){if(this._bInitialized){var P=this.getParent();if(P instanceof C){P.exit();}this._bInitialized=false;}};C.prototype.onInitComponent=function(){var u=this.getManifestEntry("sap.ui5",true),e=u&&u["extends"]&&u["extends"].extensions;if(this._iInstanceCount===0&&!q.isEmptyObject(e)){q.sap.require("sap.ui.core.CustomizingConfiguration");sap.ui.core.CustomizingConfiguration.activateForComponent(this._sComponentName);}this._iInstanceCount++;};C.prototype.onExitComponent=function(){this._iInstanceCount--;var u=this.getManifestEntry("sap.ui5",true),e=u&&u["extends"]&&u["extends"].extensions;if(this._iInstanceCount===0&&!q.isEmptyObject(e)){if(sap.ui.core.CustomizingConfiguration){sap.ui.core.CustomizingConfiguration.deactivateForComponent(this._sComponentName);}}};C.prototype.getMetadataVersion=function(){return this._oStaticInfo.__metadataVersion;};C.prototype.getManifest=function(){if(this.getMetadataVersion()===1){return this.getRawManifest();}return q.extend(true,{},this._getManifest());};C.prototype._getManifest=function(){var P=this._oStaticInfo["processed-manifest"];if(!P){var R=this.getRawManifest();P=this._oStaticInfo["processed-manifest"]=this._processManifestEntries(R);}return P;};C.prototype.getRawManifest=function(){return q.extend(true,{},this._getRawManifest());};C.prototype._getRawManifest=function(){return this._oStaticInfo["manifest"];};C.prototype._processManifestEntries=function(m){if(!this.isAbstract()&&this._oStaticInfo.__metadataVersion===2){var t=this;var c=(m["sap.app"]&&m["sap.app"]["i18n"])||"i18n/i18n.properties";var R;p(m,function(o,k,v){o[k]=v.replace(r,function(s,a){if(!R){R=q.sap.resources({url:t._resolveUri(new U(c))});}return R.getText(a);});});}return m;};C.prototype.getManifestEntry=function(k,m){if(!k||k.indexOf(".")<=0){q.sap.log.warning("Manifest entries with keys without namespace prefix can not be read via getManifestEntry. Key: "+k+", Component: "+this.getName());return null;}var P,o=this.getManifest(),d=o&&o[k]||{};if(!q.isPlainObject(d)){q.sap.log.warning("Custom Manifest entry with key '"+k+"' must be an object. Component: "+this.getName());return null;}if(m&&(P=this.getParent())instanceof C){return q.extend(true,{},P.getManifestEntry(k,m),d);}return q.extend(true,{},d);};C.prototype.getCustomEntry=function(k,m){if(!k||k.indexOf(".")<=0){q.sap.log.warning("Component Metadata entries with keys without namespace prefix can not be read via getCustomEntry. Key: "+k+", Component: "+this.getName());return null;}var P,d=this._oStaticInfo[k]||{};if(!q.isPlainObject(d)){q.sap.log.warning("Custom Component Metadata entry with key '"+k+"' must be an object. Component: "+this.getName());return null;}if(m&&(P=this.getParent())instanceof C){return q.extend(true,{},P.getCustomEntry(k,m),d);}return q.extend(true,{},d);};C.prototype.getComponentName=function(){return this._sComponentName;};C.prototype.getDependencies=function(){if(!this._oLegacyDependencies){var u=this.getManifestEntry("sap.ui5"),d=u&&u.dependencies,s=d&&d.minUI5Version||null,l=d&&d.libs||{},c=d&&d.components||{};var L={ui5version:s,libs:[],components:[]};for(var a in l){L.libs.push(a);}for(var b in c){L.components.push(b);}this._oLegacyDependencies=L;}return this._oLegacyDependencies;};C.prototype.getIncludes=function(){if(!this._aLegacyIncludes){var I=[],u=this.getManifestEntry("sap.ui5"),R=u&&u.resources||{},c=R&&R.css||[],j=R&&R.js||[];for(var i=0,l=c.length;i<l;i++){if(c[i]&&c[i].uri){I.push(c[i].uri);}}for(var i=0,l=j.length;i<l;i++){if(j[i]&&j[i].uri){I.push(j[i].uri);}}this._aLegacyIncludes=(I.length>0)?I:null;}return this._aLegacyIncludes;};C.prototype.getUI5Version=function(){var u=this.getManifestEntry("sap.ui5");return u&&u.dependencies&&u.dependencies.minUI5Version;};C.prototype.getComponents=function(){return this.getDependencies().components;};C.prototype.getLibs=function(){return this.getDependencies().libs;};C.prototype.getVersion=function(){var a=this.getManifestEntry("sap.app");return a&&a.applicationVersion&&a.applicationVersion.version;};C.prototype.getConfig=function(k,d){var u=this.getManifestEntry("sap.ui5",!d),c=u&&u.config;return q.extend(true,{},c&&k?c[k]:c);};C.prototype.getCustomizing=function(d){var u=this.getManifestEntry("sap.ui5",!d),e=q.extend(true,{},u&&u["extends"]&&u["extends"].extensions);return e;};C.prototype.getModels=function(d){if(!this._oLegacyModels){this._oLegacyModels={};var u=this.getManifestEntry("sap.ui5"),D=u&&u.models||{};for(var s in D){var o=D[s];this._oLegacyModels[s]=o.settings||{};this._oLegacyModels[s].type=o.type;this._oLegacyModels[s].uri=o.uri;}}var P,m=q.extend(true,{},this._oLegacyModels);if(!d&&(P=this.getParent())instanceof C){m=q.extend(true,{},P.getModels(),m);}return m;};C.prototype.handleValidation=function(){var u=this.getManifestEntry("sap.ui5");return u&&u.handleValidation;};C.prototype.getServices=function(){q.sap.log.warning("Usage of sap.ui.core.ComponentMetadata.protoype.getServices is deprecated!");return this._oStaticInfo.services||{};};C.prototype._loadIncludes=function(){var u=this.getManifestEntry("sap.ui5");var R=u["resources"];if(!R){return;}var c=this.getComponentName();var J=R["js"];if(J){for(var i=0;i<J.length;i++){var o=J[i];var f=o.uri;if(f){var m=f.match(/\.js$/i);if(m){var P=c.replace(/\./g,'/')+(f.slice(0,1)==='/'?'':'/')+f.slice(0,m.index);q.sap.log.info("Component \""+this.getName()+"\" is loading JS: \""+P+"\"");q.sap._requirePath(P);}}}}var a=R["css"];if(a){for(var j=0;j<a.length;j++){var b=a[j];if(b.uri){var s=this._resolveUri(new U(b.uri)).toString();q.sap.log.info("Component \""+this.getName()+"\" is loading CSS: \""+s+"\"");q.sap.includeStyleSheet(s,b.id);}}}};C.prototype._loadDependencies=function(){var t=this,d=this.getDependencies();if(d){var L=d.libs;if(L){for(var i=0,l=L.length;i<l;i++){var s=L[i];q.sap.log.info("Component \""+t.getName()+"\" is loading library: \""+s+"\"");sap.ui.getCore().loadLibrary(s);}}var c=d.components;if(c){for(var i=0,l=c.length;i<l;i++){var n=c[i];q.sap.log.info("Component \""+t.getName()+"\" is loading component: \""+n+".Component\"");sap.ui.component.load({name:n});}}}};C.prototype._convertLegacyMetadata=function(s,b){var c=function(a,t){var o={};if(a){for(var i=0,l=a.length;i<l;i++){var v=a[i];if(typeof v==="string"){o[v]=typeof t==="function"&&t(v)||{};}}}return o;};var A=b["sap.app"];var u=b["sap.ui5"];for(var n in s){var v=s[n];if(v!==undefined){switch(n){case"name":b[n]=b[n]||v;A["id"]=A["id"]||v;break;case"description":case"keywords":A[n]=A[n]||v;break;case"version":var d=A.applicationVersion=A.applicationVersion||{};d.version=d.version||v;break;case"config":u[n]=u[n]||v;break;case"customizing":var e=u["extends"]=u["extends"]||{};e.extensions=e.extensions||v;break;case"dependencies":if(!u[n]){u[n]={};u[n].minUI5Version=v.ui5version;u[n].libs=c(v.libs);u[n].components=c(v.components);}break;case"includes":if(!u["resources"]){u["resources"]={};if(v&&v.length>0){for(var i=0,l=v.length;i<l;i++){var R=v[i];var m=R.match(/\.(css|js)$/i);if(m){u["resources"][m[1]]=u["resources"][m[1]]||[];u["resources"][m[1]].push({"uri":R});}}}}break;case"handleValidation":if(u[n]===undefined){u[n]=v;}break;case"models":if(!u["models"]){var f={};for(var g in v){var D=v[g];var h={};for(var j in D){var k=D[j];switch(j){case"type":case"uri":h[j]=k;break;default:h.settings=h.settings||{};h.settings[j]=k;}}f[g]=h;}u["models"]=f;}break;}}}};C.prototype._resolveUri=function(u){return C._resolveUriRelativeTo(u,new U(q.sap.getModulePath(this.getComponentName())+"/"));};C._resolveUriRelativeTo=function(u,b){if(u.is("absolute")||(u.path()&&u.path()[0]==="/")){return u;}var P=new U().search("");b=b.absoluteTo(P);return u.absoluteTo(b).relativeTo(P);};return C;},true);
