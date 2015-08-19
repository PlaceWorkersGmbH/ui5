/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/model/TreeBinding','sap/ui/model/odata/CountMode','sap/ui/model/ChangeReason','sap/ui/model/Sorter','sap/ui/model/odata/ODataUtils','sap/ui/model/TreeBindingUtils'],function(q,T,C,a,S,O,b){"use strict";var c=T.extend("sap.ui.model.odata.v2.ODataTreeBinding",{constructor:function(m,p,o,f,P,s){T.apply(this,arguments);this.mParameters=this.mParameters||P||{};this.sBatchGroupId;this.sRefreshBatchGroupId;this.oFinalLengths={};this.oLengths={};this.oKeys={};this.bNeedsUpdate=false;this._bRootMissing=false;this.aSorters=s||[];this.sFilterParams="";this.mRequestHandles={};this.oRootContext=null;this.iNumberOfExpandedLevels=(P&&P.numberOfExpandedLevels)||0;this.iRootLevel=(P&&P.rootLevel)||0;this.sCountMode=(P&&P.countMode)||this.oModel.sDefaultCountMode;if(this.sCountMode==C.None){q.log.fatal("To use an ODataTreeBinding at least one CountMode must be supported by the service!");}if(P){this.sBatchGroupId=P.batchGroupId;}this.bInitial=true;this._mLoadedSections={};this._iPageSize=0;}});c.DRILLSTATES={Collapsed:"collapsed",Expanded:"expanded",Leaf:"leaf"};c.prototype._validateParameters=function(){var r=this.mParameters.rootNodeID;var R=this.mParameters.rootLevel;if(r){return true;}if(!r){this.bDisplayRootNode=true;}};c.prototype._loadSingleRootByHierarchyNodeID=function(r,R){var t=this,B;var _=function(D){if(D.results&&D.results.length>0){var e=D.results[0];var k=t.oModel._getKey(e);t.oRootContext=t.oModel.getContext('/'+k);}else{t._bRootMissing=true;}t.bNeedsUpdate=true;delete t.mRequestHandles[R];t.fireDataReceived();};var d=function(e){if(e&&e.statusCode!=0&&e.statusText!="abort"){var E="Request for root node failed: "+e.message;if(e.response){E+=", "+e.response.statusCode+", "+e.response.statusText+", "+e.response.body;}q.sap.log.fatal(E);t.bNeedsUpdate=true;t._bRootMissing=true;delete t.mRequestHandles[R];t.fireDataReceived();}};var p=[];var n=this._getNodeFilterParams({id:r,isRoot:true});var f=this.getFilterParams()?"%20and%20"+this.getFilterParams():"";p.push("$filter="+n+f);if(this.mRequestHandles[R]){this.mRequestHandles[R].abort();}this.fireDataRequested();B=this.sRefreshBatchGroupId?this.sRefreshBatchGroupId:this.sBatchGroupId;this.mRequestHandles[R]=this.oModel.read(this.getPath(),{urlParameters:p,success:_,error:d,sorters:this.aSorters,batchGroupId:B});};c.prototype._getNodeFilterParams=function(p){var P=p.isRoot?this.oTreeProperties["hierarchy-node-for"]:this.oTreeProperties["hierarchy-parent-node-for"];var e=this._getEntityType();return O._createFilterParams([new sap.ui.model.Filter(P,"EQ",p.id)],this.oModel.oMetadata,e);};c.prototype._loadSingleRootNodeByNavigationProperties=function(n,r){var t=this,B;if(this.mRequestHandles[r]){this.mRequestHandles[r].abort();}B=this.sRefreshBatchGroupId?this.sRefreshBatchGroupId:this.sBatchGroupId;this.mRequestHandles[r]=this.oModel.read(n,{batchGroupId:B,success:function(d){var N=t._getNavPath(t.getPath());if(d){var e=d;var k=t.oModel._getKey(e);var o=t.oModel.getContext('/'+k);t.oRootContext=o;t._processODataObject(o.getObject(),n,N);}else{t._bRootMissing=true;}t.bNeedsUpdate=true;delete t.mRequestHandles[r];t.fireDataReceived();},error:function(e){if(e&&e.statusCode!=0&&e.statusText!="abort"){t.bNeedsUpdate=true;t._bRootMissing=true;delete t.mRequestHandles[r];t.fireDataReceived();}}});};c.prototype.getRootContexts=function(s,l,t){var n=null,r={numberOfExpandedLevels:this.iNumberOfExpandedLevels},R=[],d=this.mParameters.rootNodeID||null;if(this.isInitial()){return R;}s=s||0;l=l||this.oModel.sizeLimit;t=t||0;var e=""+n+"-"+s+"-"+this._iPageSize+"-"+t;if(this.bHasTreeAnnotations){this._validateParameters();if(this.bDisplayRootNode&&d){if(this.oRootContext){return[this.oRootContext];}else if(this._bRootMissing){return[];}else{this._loadSingleRootByHierarchyNodeID(d,e);}}else{R=this._getContextsForNodeId(d,s,l,t);}}else{n=this.oModel.resolve(this.getPath(),this.getContext());var i=this.oModel.isList(this.sPath,this.getContext());if(i){this.bDisplayRootNode=true;}if(this.bDisplayRootNode&&!i){if(this.oRootContext){return[this.oRootContext];}else if(this._bRootMissing){return[];}else{this._loadSingleRootNodeByNavigationProperties(n,e);}}else{r.navPath=this._getNavPath(this.getPath());if(!this.bDisplayRootNode){n+="/"+r.navPath;}R=this._getContextsForNodeId(n,s,l,t,r);}}return R;};c.prototype.getNodeContexts=function(o,s,l,t){var n,r={};if(this.isInitial()){return[];}if(this.bHasTreeAnnotations){n=o.getProperty(this.oTreeProperties["hierarchy-node-for"]);r.level=parseInt(o.getProperty(this.oTreeProperties["hierarchy-level-for"]),10)+1;}else{var N=this._getNavPath(o.getPath());if(!N){return[];}n=this.oModel.resolve(N,o);r.navPath=this.oNavigationPaths[N];}return this._getContextsForNodeId(n,s,l,t,r);};c.prototype.hasChildren=function(o){if(this.bHasTreeAnnotations){if(!o){return false;}var d=o.getProperty(this.oTreeProperties["hierarchy-drill-state-for"]);var h=o.getProperty(this.oTreeProperties["hierarchy-node-for"]);var l=this.oLengths[h];if(l===0&&this.oFinalLengths[h]){return false;}if(d==="expanded"||d==="collapsed"){return true;}else if(d==="leaf"){return false;}else{q.sap.log.warning("The entity '"+o.getPath()+"' has not specified Drilldown State property value.");if(d===undefined||d===""){return true;}return false;}}else{if(!o){return this.oLengths[this.getPath()]>0;}var l=this.oLengths[o.getPath()+"/"+this._getNavPath(o.getPath())];return l!==0;}};c.prototype.getChildCount=function(o){if(this.bHasTreeAnnotations){var h;if(!o){h=this.mParameters.rootNodeID||null;}else{h=o.getProperty(this.oTreeProperties["hierarchy-node-for"]);}return this.oLengths[h];}else{if(!o){if(!this.bDisplayRootNode){return this.oLengths[this.getPath()+"/"+this._getNavPath(this.getPath())];}else{return this.oLengths[this.getPath()];}}return this.oLengths[o.getPath()+"/"+this._getNavPath(o.getPath())];}};c.prototype._getContextsForNodeId=function(n,s,l,t,r){var d=[],k;s=s||0;l=l||this.oModel.iSizeLimit;t=t||0;if(!this._mLoadedSections[n]){this._mLoadedSections[n]=[];}if(this.oFinalLengths[n]&&this.oLengths[n]<s+l){l=Math.max(this.oLengths[n]-s,0);}var e=this;var f=function(s){for(var i=0;i<e._mLoadedSections[n].length;i++){var o=e._mLoadedSections[n][i];if(s>=o.startIndex&&s<o.startIndex+o.length){return true;}}};var m=[];var i=Math.max((s-t-this._iPageSize),0);if(this.oKeys[n]){for(i;i<s+l+(t);i++){k=this.oKeys[n][i];if(!k){if(!f(i)){m=b.mergeSections(m,{startIndex:i,length:1});}}if(i>=s&&i<s+l){if(k){d.push(this.oModel.getContext('/'+k));}else{d.push(undefined);}}}var B=Math.max((s-t-this._iPageSize),0);var E=s+l+(t);var g=m[0]&&m[0].startIndex===B&&m[0].startIndex+m[0].length===E;if(m.length>0&&!g){i=Math.max((m[0].startIndex-t-this._iPageSize),0);var F=m[0].startIndex;for(i;i<F;i++){var k=this.oKeys[n][i];if(!k){if(!f(i)){m=b.mergeSections(m,{startIndex:i,length:1});}}}i=m[m.length-1].startIndex+m[m.length-1].length;var h=i+t+this._iPageSize;for(i;i<h;i++){var k=this.oKeys[n][i];if(!k){if(!f(i)){m=b.mergeSections(m,{startIndex:i,length:1});}}}}}else{if(!f(s)){var L=s-i;m=b.mergeSections(m,{startIndex:i,length:l+L+t});}}if(this.oModel.getServiceMetadata()){if(m.length>0){var p=[];if(this.bHasTreeAnnotations){var j=this.getFilterParams()?"%20and%20"+this.getFilterParams():"";if(n){var N=this._getNodeFilterParams({id:n});p.push("$filter="+N+j);}else{p.push("$filter="+q.sap.encodeURL(this.oTreeProperties["hierarchy-level-for"]+" eq "+this.getRootLevel())+j);}}if(this.sCustomParams){p.push(this.sCustomParams);}for(i=0;i<m.length;i++){var R=m[i];this._mLoadedSections[n]=b.mergeSections(this._mLoadedSections[n],{startIndex:R.startIndex,length:R.length});this._loadSubNodes(n,R.startIndex,R.length,0,p,r,R);}}}return d;};c.prototype._getCountForNodeId=function(n,s,l,t,p){var d=this,B;var P=[];function _(D){d.oFinalLengths[n]=true;d.oLengths[n]=parseInt(D,10);}function e(E){if(E&&E.statusCode===0&&E.statusText==="abort"){return;}var g="Request for $count failed: "+E.message;if(E.response){g+=", "+E.response.statusCode+", "+E.response.statusText+", "+E.response.body;}q.sap.log.warning(g);}var f;var F=this.getFilterParams()||"";var N="";if(this.bHasTreeAnnotations){f=this.oModel.resolve(this.getPath(),this.getContext());if(n!=null){N=this._getNodeFilterParams({id:n});}else{N=q.sap.encodeURL(this.oTreeProperties["hierarchy-level-for"]+" eq "+this.getRootLevel());}}else{f=n;}if(N||F){var A="";if(N&&F){A="%20and%20";}F="$filter="+F+A+N;P.push(F);}if(f){B=this.sRefreshBatchGroupId?this.sRefreshBatchGroupId:this.sBatchGroupId;this.oModel.read(f+"/$count",{urlParameters:P,success:_,error:e,sorters:this.aSorters,batchGroupId:B});}};c.prototype._loadSubNodes=function(n,s,l,t,p,P,r){var d=this,B,I=false;if(s||l){p.push("$skip="+s+"&$top="+(l+t));}if(!this.oFinalLengths[n]){if(this.sCountMode==C.Inline||this.sCountMode==C.Both){p.push("$inlinecount=allpages");I=true;}else if(this.sCountMode==C.Request){d._getCountForNodeId(n);}}var R=""+n+"-"+s+"-"+this._iPageSize+"-"+t;function f(D){if(D.results&&D.results.length>0){if(d.bHasTreeAnnotations){var L={};if(I&&D.__count){d.oLengths[n]=parseInt(D.__count,10);d.oFinalLengths[n]=true;}for(var i=0;i<D.results.length;i++){var E=D.results[i];var g=n;if(i==0){L[g]=s;}else if(L[g]==undefined){L[g]=0;}if(!(g in d.oKeys)){d.oKeys[g]=[];if(I&&D.__count){d.oLengths[g]=parseInt(D.__count,10);d.oFinalLengths[g]=true;}}d.oKeys[g][L[g]]=d.oModel._getKey(E);L[g]++;}}else{if(I&&D.__count){d.oLengths[n]=parseInt(D.__count,10);d.oFinalLengths[n]=true;}d.oKeys[n]=[];for(var i=0;i<D.results.length;i++){var E=D.results[i];var k=d.oModel._getKey(E);d._processODataObject(E,"/"+k,P.navPath);d.oKeys[n][i+s]=k;}}}else if(D.results&&D.results.length===0){if(I&&D.__count){d.oLengths[n]=parseInt(D.__count,10);}d.oFinalLengths[n]=true;}else{d.oKeys[null]=d.oModel._getKey(D);if(!d.bHasTreeAnnotations){d._processODataObject(D,n,P.navPath);}}d.oRequestHandle=null;delete d.mRequestHandles[R];d.bNeedsUpdate=true;d.fireDataReceived();}function e(E){if(E&&E.statusCode===0&&E.statusText==="abort"){return;}d.oRequestHandle=null;delete d.mRequestHandles[R];d.fireDataReceived();if(r){var L=[];for(var i=0;i<d._mLoadedSections[n].length;i++){var o=d._mLoadedSections[n][i];if(r.startIndex>=o.startIndex&&r.startIndex+r.length<=o.startIndex+o.length){if(r.startIndex!==o.startIndex&&r.length!==o.length){L=b.mergeSections(L,{startIndex:o.startIndex,length:r.startIndex-o.startIndex});L=b.mergeSections(L,{startIndex:r.startIndex+r.length,length:(o.startIndex+o.length)-(r.startIndex+r.length)});}}else{L.push(o);}}d._mLoadedSections[n]=L;}}if(n!==undefined){if((!this.oFinalLengths[n]||this.bHasTreeAnnotations)){this.fireDataRequested();var A;if(this.bHasTreeAnnotations){A=this.oModel.resolve(this.getPath(),this.getContext());}else{A=n;}if(this.mRequestHandles[R]){this.mRequestHandles[R].abort();}B=this.sRefreshBatchGroupId?this.sRefreshBatchGroupId:this.sBatchGroupId;this.mRequestHandles[R]=this.oModel.read(A,{urlParameters:p,success:f,error:e,sorters:this.aSorters,batchGroupId:B});}}};c.prototype.resetData=function(o,p){if(o){var P=o.getPath();delete this.oKeys[P];delete this.oLengths[P];delete this.oFinalLengths[P];delete this._mLoadedSections[P];}else{this.oKeys={};this.oLengths={};this.oFinalLengths={};this.oRootContext=null;this._bRootMissing=false;q.each(this.mRequestHandles,function(r,R){if(R){R.abort();}});this.mRequestHandles={};this._mLoadedSections={};this._iPageSize=0;this.sFilterParams="";}};c.prototype.refresh=function(f,B){if(typeof f==="string"){B=f;}this.sRefreshBatchGroup=B;this._refresh(f);this.sRefreshBatchGroup=undefined;};c.prototype._refresh=function(f,m,e){var d=false;if(!f){if(e){var r=this.oModel.resolve(this.sPath,this.oContext);if(r.indexOf("?")!==-1){r=r.split("?")[0];}var E=this.oModel.oMetadata._getEntityTypeByPath(r);if(E&&(E.entityType in e)){d=true;}}if(m&&!d){q.each(this.oKeys,function(i,n){q.each(n,function(i,k){if(k in m){d=true;return false;}});if(d){return false;}});}if(!m&&!e){d=true;}}if(f||d){this.resetData();this.bNeedsUpdate=false;this.bRefresh=true;this._fireRefresh({reason:a.Refresh});}};c.prototype.filter=function(f){q.sap.log.warning("Filtering is currently not possible in the ODataTreeBinding");return this;};c.prototype.sort=function(s,r){var d=false;if(s instanceof S){s=[s];}this.aSorters=s||[];if(!this.bInitial){this.resetData(undefined,{reason:a.Sort});q.each(this.mRequestHandles,function(R,o){if(o){o.abort();}});this._fireRefresh({reason:a.Sort});d=true;}if(r){return d;}else{return this;}};c.prototype.checkUpdate=function(f,m){var d=false;if(!f){if(this.bNeedsUpdate||!m){d=true;}else{q.each(this.oKeys,function(i,n){q.each(n,function(i,k){if(k in m){d=true;return false;}});if(d){return false;}});}}if(f||d){this.bNeedsUpdate=false;this._fireChange();}};c.prototype._getNavPath=function(p){var A=this.oModel.resolve(p,this.getContext());if(!A){return;}var P=A.split("/"),e=P[P.length-1],n;var s=e.split("(")[0];if(s&&this.oNavigationPaths[s]){n=this.oNavigationPaths[s];}return n;};c.prototype._processODataObject=function(o,p,n){var N=[],t=this;if(n&&n.indexOf("/")>-1){N=n.split("/");n=N[0];N.splice(0,1);}var r=this.oModel._getObject(p);if(q.isArray(r)){this.oKeys[p]=r;this.oLengths[p]=r.length;this.oFinalLengths[p]=true;}else if(r){this.oLengths[p]=1;this.oFinalLengths[p]=true;}if(n&&o[n]){if(q.isArray(r)){q.each(r,function(i,R){var o=t.getModel().getData("/"+R);t._processODataObject(o,"/"+R+"/"+n,N.join("/"));});}else if(typeof r==="object"){t._processODataObject(o,p+"/"+n,N.join("/"));}}};c.prototype._hasTreeAnnotations=function(){var m=this.oModel,M=m.oMetadata,A=m.resolve(this.getPath(),this.getContext()),e,t=M.mNamespaces["sap"],d=this;this.oTreeProperties={"hierarchy-level-for":false,"hierarchy-parent-node-for":false,"hierarchy-node-for":false,"hierarchy-drill-state-for":false};var s=function(){var f=0;var i=0;q.each(d.oTreeProperties,function(p,P){i++;if(P){f+=1;}});if(f===i){return true;}else if(f>0&&f<i){q.sap.log.warning("Incomplete hierarchy tree annotations. Please check your service metadata definition!");}return false;};if(this.mParameters&&this.mParameters.treeAnnotationProperties){this.oTreeProperties["hierarchy-level-for"]=this.mParameters.treeAnnotationProperties.hierarchyLevelFor;this.oTreeProperties["hierarchy-parent-node-for"]=this.mParameters.treeAnnotationProperties.hierarchyParentNodeFor;this.oTreeProperties["hierarchy-node-for"]=this.mParameters.treeAnnotationProperties.hierarchyNodeFor;this.oTreeProperties["hierarchy-drill-state-for"]=this.mParameters.treeAnnotationProperties.hierarchyDrillStateFor;return s();}if(A.indexOf("?")!==-1){A=A.split("?")[0];}e=M._getEntityTypeByPath(A);if(!e){q.sap.log.fatal("EntityType for path "+A+" could not be found.");return false;}q.each(e.property,function(i,p){if(!p.extensions){return true;}q.each(p.extensions,function(i,E){var n=E.name;if(E.namespace===t&&n in d.oTreeProperties&&!d.oTreeProperties[n]){d.oTreeProperties[n]=p.name;}});});return s();};c.prototype.initialize=function(){if(this.oModel.oMetadata&&this.oModel.oMetadata.isLoaded()){this.bInitial=false;this.bHasTreeAnnotations=this._hasTreeAnnotations();this._processSelectParameters();this.oEntityType=this._getEntityType();this._fireRefresh({reason:a.Refresh});}return this;};c.prototype._processSelectParameters=function(){if(this.mParameters){this.oNavigationPaths=this.mParameters.navigation;if(this.mParameters.select){var s=this.mParameters.select.split(",");var n=[];if(this.oNavigationPaths){q.each(this.oNavigationPaths,function(p,P){if(q.inArray(P,n)==-1){n.push(P);}});}q.each(n,function(p,P){if(q.inArray(P,s)==-1){s.push(P);}});if(this.bHasTreeAnnotations){q.each(this.oTreeProperties,function(A,t){if(t){if(q.inArray(t,s)==-1){s.push(t);}}});}this.mParameters.select=s.join(",");}this.sCustomParams=this.oModel.createCustomParams(this.mParameters);}if(!this.bHasTreeAnnotations&&!this.oNavigationPaths){q.sap.log.error("Neither navigation paths parameters, nor (complete/valid) tree hierarchy annotations where provided to the TreeBinding.");this.oNavigationPaths={};}};c.prototype.getDownloadUrl=function(f){var p=[],P;if(f){p.push("$format="+encodeURIComponent(f));}if(this.aSorters&&this.aSorters.length>0){p.push(O.createSortParams(this.aSorters));}if(this.getFilterParams()){p.push("$filter="+this.getFilterParams());}if(this.sCustomParams){p.push(this.sCustomParams);}P=this.oModel.resolve(this.sPath,this.oContext);if(P){return this.oModel._createRequestUrl(P,null,p);}};c.prototype.setNumberOfExpandedLevels=function(l){l=l||0;if(l<0){q.sap.log.warning("ODataTreeBinding: numberOfExpandedLevels was set to 0. Negative values are prohibited.");l=0;}this.iNumberOfExpandedLevels=l;this._fireChange();};c.prototype.getNumberOfExpandedLevels=function(){return this.iNumberOfExpandedLevels;};c.prototype.setRootLevel=function(r){r=parseInt(r||0,10);if(r<0){q.sap.log.warning("ODataTreeBinding: rootLevels was set to 0. Negative values are prohibited.");r=0;}this.iRootLevel=r;this.refresh();};c.prototype.getRootLevel=function(){return this.iRootLevel;};c.prototype._getEntityType=function(){var r=this.oModel.resolve(this.sPath,this.oContext);if(r){var e=this.oModel.oMetadata._getEntityTypeByPath(r);return e;}return undefined;};c.prototype.getFilterParams=function(){if(this.aFilters&&this.aFilters.length>0){if(!this.sFilterParams){this.sFilterParams=O._createFilterParams(this.aFilters,this.oModel.oMetadata,this.oEntityType);this.sFilterParams=this.sFilterParams?this.sFilterParams:"";}}else{this.sFilterParams="";}return this.sFilterParams;};return c;});