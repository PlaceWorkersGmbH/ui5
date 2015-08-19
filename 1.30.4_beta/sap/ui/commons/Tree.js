/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./library','sap/ui/core/Control'],function(q,l,C){"use strict";var T=C.extend("sap.ui.commons.Tree",{metadata:{library:"sap.ui.commons",properties:{title:{type:"string",group:"Misc",defaultValue:null},width:{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:'auto'},height:{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:'auto'},showHeader:{type:"boolean",group:"Misc",defaultValue:true},showHeaderIcons:{type:"boolean",group:"Misc",defaultValue:true},showHorizontalScrollbar:{type:"boolean",group:"Misc",defaultValue:false},minWidth:{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:null},selectionMode:{type:"sap.ui.commons.TreeSelectionMode",group:"Behavior",defaultValue:sap.ui.commons.TreeSelectionMode.Legacy}},defaultAggregation:"nodes",aggregations:{nodes:{type:"sap.ui.commons.TreeNode",multiple:true,singularName:"node",bindable:"bindable"}},events:{select:{allowPreventDefault:true,parameters:{node:{type:"sap.ui.commons.TreeNode"},nodeContext:{type:"object"}}},selectionChange:{parameters:{nodes:{type:"sap.ui.commons.TreeNode[]"},nodeContexts:{type:"object[]"}}}}}});T.prototype.resizeListenerId;T.prototype.init=function(){this.bAllCollapsed=false;this.allowTextSelection(false);this.iOldScrollTop=null;this.mSelectedNodes={};this.mSelectedContexts={};this.aLeadSelection=null;var r=sap.ui.getCore().getLibraryResourceBundle("sap.ui.commons");this.oCollapseAllButton=new sap.ui.commons.Button(this.getId()+"-CollapseAll",{icon:this.getIconPrefix()+"CollapseAll.png",tooltip:r.getText("TREE_COLLAPSE_ALL"),lite:true});this.oExpandAllButton=new sap.ui.commons.Button(this.getId()+"-ExpandAll",{icon:this.getIconPrefix()+"ExpandAll.png",tooltip:r.getText("TREE_EXPAND_ALL"),lite:true});this.oCollapseAllButton.attachPress(this.onCollapseAll,this);this.oExpandAllButton.attachPress(this.onExpandAll,this);this.oCollapseAllButton.addStyleClass("sapUiTreeCol");this.oExpandAllButton.addStyleClass("sapUiTreeExp");};T.prototype.exit=function(){if(this.oCollapseAllButton){this.oCollapseAllButton.destroy();this.oCollapseAllButton=null;}if(this.oExpandAllButton){this.oExpandAllButton.destroy();this.oExpandAllButton=null;}};T.SelectionType={Select:"Select",Toggle:"Toggle",Range:"Range"};T.prototype.onThemeChanged=function(){if(this.oCollapseAllButton&&this.oExpandAllButton){this.oCollapseAllButton.setIcon(this.getIconPrefix()+"CollapseAll.png");this.oExpandAllButton.setIcon(this.getIconPrefix()+"ExpandAll.png");}};T.prototype.onExpandAll=function(){this.expandAll();};T.prototype.onCollapseAll=function(){this.collapseAll();};T.prototype.expandAll=function(){var n=this._getNodes();for(var i=0;i<n.length;i++){n[i].expand(true);}};T.prototype.collapseAll=function(){var n=this._getNodes();for(var i=0;i<n.length;i++){n[i].collapse(true);}};T.prototype.onsapdown=function(e){this.moveFocus(false);e.preventDefault();};T.prototype.onsapup=function(e){this.moveFocus(true);e.preventDefault();};T.prototype.onsaphome=function(e){this.placeFocus(this.getFirstSibling(e.target));e.preventDefault();};T.prototype.onsaphomemodifiers=function(e){this.placeFocus(this.getFirst());e.preventDefault();};T.prototype.onsapend=function(e){this.placeFocus(this.getLastSibling(e.target));e.preventDefault();};T.prototype.onsapendmodifiers=function(e){this.placeFocus(this.getLast());e.preventDefault();};T.prototype.onsapcollapseall=function(e){if(this.bAllCollapsed){this.expandAll();}else{this.collapseAll();}this.bAllCollapsed=!this.bAllCollapsed;};T.prototype.getIconPrefix=function(){var i="themes/"+sap.ui.getCore().getConfiguration().getTheme()+"/";if(!sap.ui.getCore().getConfiguration().getRTL()){i+="img/tree/";}else{i+="img-RTL/tree/";}return sap.ui.resource("sap.ui.commons",i);};T.prototype.getFirstSibling=function(d){var D=q(d).siblings(".sapUiTreeNode:visible").first();if(D.length){return D[0];}return null;};T.prototype.getLastSibling=function(d){var D=q(d).siblings(".sapUiTreeNode:visible").last();if(D.length){return D[0];}return null;};T.prototype.getFirst=function(){var d=this.$().find(".sapUiTreeNode:visible").first();if(d.length){return d[0];}return null;};T.prototype.getLast=function(){var d=this.$().find(".sapUiTreeNode:visible").last();if(d.length){return d[0];}return null;};T.prototype.moveFocus=function(m){var a=q(".sapUiTreeNode:focus");if(a.length){var c=sap.ui.getCore().getControl(a[0].id);var d=this.$().find(".sapUiTreeNode:visible");var b=d.index(a[0]);var n=b;if(m){n--;}else{n++;}if(n>=0&&n<d.length){var D=d.eq(n);var N=sap.ui.getCore().getControl(D[0].id);c.blur();N.focus();}}};T.prototype.adjustFocus=function(){var f=this.$().find('.sapUiTreeNode[tabIndex="0"]');if(!f.is(':visible')){var d=this.$().find(".sapUiTreeNode");var a=d.index(f[0]);var D=d.filter(":lt("+a+")");var b=D.filter(":visible");var n=b[b.length-1];if(n){n.setAttribute("tabindex","0");if(q(".sapUiTreeNode:focus").is(":not(:visible)")){n.focus();}}}};T.prototype.placeFocus=function(d){if(!d){return;}var D=this.$().find(".sapUiTreeNode[tabIndex='0']");if(D.length){D[0].setAttribute("tabindex","-1");}d.setAttribute("tabindex","0");var t=sap.ui.getCore().getControl(d.id);t.focus();};T.prototype.adjustSelectionOnExpanding=function(e){var t=this.$(),E=q(e),d,D;if(E.hasClass("sapUiTreeNodeSelectedParent")){E.removeClass("sapUiTreeNodeSelectedParent");}var $=t.find(".sapUiTreeNodeSelected:visible");if($.length){t.find(".sapUiTreeNodeSelectedParent").removeClass("sapUiTreeNodeSelectedParent");}else{d=t.find(".sapUiTreeNodeSelected");D=d.parent(".sapUiTreeChildrenNodes").prev(".sapUiTreeNode");while(D.length&&!D.is(":visible")){D=D.parent(".sapUiTreeChildrenNodes").prev(".sapUiTreeNode");}D.addClass("sapUiTreeNodeSelectedParent");}};T.prototype.adjustSelectionOnCollapsing=function(d){var t=this;if(this.getSelectionMode()!=sap.ui.commons.TreeSelectionMode.Multi){var D=q(d),c="#"+D.attr("id")+"-children",$=D.siblings(c).find(".sapUiTreeNodeSelected"),a=D.siblings(c).find(".sapUiTreeNodeSelectedParent");if($.length||a.length){D.addClass("sapUiTreeNodeSelectedParent");if(a.length){a.removeClass("sapUiTreeNodeSelectedParent");}}}else{var D=q(d),c="#"+D.attr("id")+"-children",$=D.siblings(c).find(".sapUiTreeNodeSelected");var s=$.control();if(s){if(q.isEmptyObject(s)==false){q.each(s,function(i,n){t._delMultiSelection(n);});}}}};T.prototype.isTreeBinding=function(n){return(n=="nodes");};T.prototype.updateNodes=function(){var n,t=this;this.updateAggregation("nodes");q.each(this.mSelectedContexts,function(i,c){n=t.getNodeByContext(c);if(n){n.setIsSelected(true);}});};T.prototype.getNodeContext=function(n){var b=this.getBindingInfo("nodes"),m=b&&b.model;return n.getBindingContext(m);};T.prototype.getNodeByContext=function(c){var b=this.getBindingInfo("nodes"),m=b&&b.model;return this.findNode(this,function(n){return n.getBindingContext(m)==c;});};T.prototype.findNode=function(n,m){var f,t=this;if(m(n)){return n;}q.each(n._getNodes(),function(i,n){f=t.findNode(n,m);if(f){return false;}});return f;};T.prototype.setSelectionMode=function(m){m=this.validateProperty("selectionMode",m);if(this.getSelectionMode()!=m){this.setProperty("selectionMode",m);this._delSelection();}};T.prototype.getSelection=function(){for(var i in this.mSelectedNodes){return this.mSelectedNodes[i];}return null;};T.prototype.setSelection=function(n,s,t,d){var D=true;if(!s){D=this.fireSelect({node:n,nodeContext:this.getNodeContext(n)});}if(D){switch(this.getSelectionMode()){case sap.ui.commons.TreeSelectionMode.Legacy:case sap.ui.commons.TreeSelectionMode.Single:this._setSelectedNode(n,s);break;case sap.ui.commons.TreeSelectionMode.Multi:if(t==T.SelectionType.Range){this._setSelectedNodeMapRange(n,s);}else if(t==T.SelectionType.Toggle){this._setSelectedNodeMapToggle(n,s);}else{this._setSelectedNode(n,s);}break;case sap.ui.commons.TreeSelectionMode.None:break;}}};T.prototype.onAfterRendering=function(){if(this.iOldScrollTop){this.$("TreeCont").scrollTop(this.iOldScrollTop);}};T.prototype.invalidate=function(){var t=this;C.prototype.invalidate.apply(this,arguments);if(this.iSelectionUpdateTimer){return;}this.iSelectionUpdateTimer=setTimeout(function(){t.mSelectedNodes={};t.mSelectedContexts={};t.updateSelection(t,true);t.iSelectionUpdateTimer=null;},0);};T.prototype.updateSelection=function(n,e){var t=this;q.each(n._getNodes(),function(i,n){if(n.getIsSelected()){switch(t.getSelectionMode()){case sap.ui.commons.TreeSelectionMode.None:q.sap.log.warning("Added selected nodes in a tree with disabled selection");n.setIsSelected(false);break;case sap.ui.commons.TreeSelectionMode.Legacy:if(q.isEmptyObject(t.mSelectedNodes)){t.mSelectedNodes[n.getId()]=n;t.mSelectedContexts[n.getId()]=t.getNodeContext(n);}break;case sap.ui.commons.TreeSelectionMode.Single:if(q.isEmptyObject(t.mSelectedNodes)==false){q.sap.log.warning("Added multiple selected nodes in single select tree");n.setIsSelected(false);}else{t.mSelectedNodes[n.getId()]=n;t.mSelectedContexts[n.getId()]=t.getNodeContext(n);}break;case sap.ui.commons.TreeSelectionMode.Multi:if(!e){q.sap.log.warning("Added selected node inside collapsed node in multi select tree");n.setIsSelected(false);}else{t.mSelectedNodes[n.getId()]=n;t.mSelectedContexts[n.getId()]=t.getNodeContext(n);}break;}}t.updateSelection(n,e&&n.getExpanded());});};T.prototype.onBeforeRendering=function(){this.iOldScrollTop=this.$("TreeCont").scrollTop();};T.prototype._setSelectedNode=function(n,s){var t=this,c=this.getNodeContext(n);q.each(this.mSelectedNodes,function(i,n){t._delMultiSelection(n,s);});n._select(s,true);this.mSelectedNodes[n.getId()]=n;this.mSelectedContexts[n.getId()]=c;this.oLeadSelection=n;if(!s){this.fireSelectionChange({nodes:[n],nodeContexts:[c]});}};T.prototype._setSelectedNodeMapToggle=function(n,s){this._setNodeSelection(n,!n.getIsSelected(),s);};T.prototype._setSelectedNodeMapRange=function(n,s){var S,a=[],b=[],c,e,f,t;if(this.mSelectedNodes[n.getId()]==n){return;}else{if(this._getNodes().length>0){S=this._getSelectableNodes();c=S.indexOf(this.oLeadSelection);e=S.indexOf(n);f=c<e?c:e;t=c<e?e:c;for(var i=f;i<=t;i++){this._setMultiSelection(S[i],s);}}}if(!s){q.map(this.mSelectedNodes,function(n){a.push(n);});q.map(this.mSelectedContexts,function(o){b.push(o);});this.fireSelectionChange({nodes:a,nodeContexts:b});}};T.prototype._getSelectableNodes=function(n){var s=[];function c(n){q.each(n,function(i,N){if(N.getSelectable()){s.push(N);}if(N.getExpanded()){c(N._getNodes());}});}c(this._getNodes());return s;};T.prototype._setNodeSelection=function(n,i,s){var S=[],a=[];var v;if(this.getSelectionMode()==sap.ui.commons.TreeSelectionMode.Single){if(i){var o=this.getSelection();this._setSelectedNode(n,s);if(!n.isVisible()){v=this._getVisibleNode(n).getDomRef();this.adjustSelectionOnCollapsing(v);}if(o&&!o.isVisible()){v=this._getVisibleNode(o).getDomRef();this.adjustSelectionOnExpanding(v);}return;}else{this._delMultiSelection(n,s);if(!n.isVisible()){v=this._getVisibleNode(n).getDomRef();this.adjustSelectionOnExpanding(v);}}}if(i){this._setMultiSelection(n,s);this.oLeadSelection=n;}else{this._delMultiSelection(n,s);this.oLeadSelection=n;}if(!s){q.map(this.mSelectedNodes,function(n){S.push(n);});q.map(this.mSelectedContexts,function(c){a.push(c);});this.fireSelectionChange({nodes:S,nodeContexts:a});}};T.prototype._setMultiSelection=function(s,S){if(!s){return;}s._select(S);this.mSelectedNodes[s.getId()]=s;this.mSelectedContexts[s.getId()]=this.getNodeContext(s);};T.prototype._delMultiSelection=function(s,S){if(!s){return;}s._deselect();delete this.mSelectedNodes[s.getId()];delete this.mSelectedContexts[s.getId()];};T.prototype._delSelection=function(){var t=this;if(this.oSelectedNode){this.oSelectedNode._deselect();}if(q.isEmptyObject(this.mSelectedNodes)==false){q.each(this.mSelectedNodes,function(i,n){t._delMultiSelection(n);});}};T.prototype._getNodes=function(){return this.mAggregations.nodes||[];};T.prototype._getVisibleNode=function(n){var p=n.getParent();if(p.isVisible()){var v=p;}else{v=this._getVisibleNode(p);}return v;};return T;},true);
