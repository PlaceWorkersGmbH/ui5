/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./ListItemBase','./library'],function(q,L,l){"use strict";var C=L.extend("sap.m.ColumnListItem",{metadata:{library:"sap.m",properties:{vAlign:{type:"sap.ui.core.VerticalAlign",group:"Appearance",defaultValue:sap.ui.core.VerticalAlign.Inherit}},defaultAggregation:"cells",aggregations:{cells:{type:"sap.ui.core.Control",multiple:true,singularName:"cell",bindable:"bindable"}}}});C.prototype._popinId="";C.prototype.init=function(){sap.m.ListItemBase.prototype.init.call(this);this._bNeedsTypeColumn=false;this._aClonedHeaders=[];};C.prototype.onAfterRendering=function(){sap.m.ListItemBase.prototype.onAfterRendering.call(this);this._checkTypeColumn();};C.prototype._checkTypeColumn=function(n){if(n==undefined){n=this.needsTypeColumn();}if(this._bNeedsTypeColumn!=n){this._bNeedsTypeColumn=n;this.informList("TypeColumnChange",n);}};C.prototype.needsTypeColumn=function(){var t=this.getType(),T=sap.m.ListType;return this.getVisible()&&(t==T.Detail||t==T.Navigation||t==T.DetailAndActive);};C.prototype.getTable=function(){var p=this.getParent();if(p instanceof sap.m.Table){return p;}if(p&&p.getMetadata().getName()=="sap.m.Table"){return p;}};C.prototype.$Popin=function(){return q.sap.byId(this._popinId);};C.prototype.removePopin=function(){this.$Popin().remove();this._popinId="";};C.prototype.hasPopin=function(){return!!(this._popinId);};sap.m.ColumnListItem.prototype.addClonedHeader=function(h){return this._aClonedHeaders.push(h);};sap.m.ColumnListItem.prototype.destroyClonedHeaders=function(){this._aClonedHeaders.forEach(function(c){c.destroy(true);});this._aClonedHeaders.length=0;};C.prototype.setVisible=function(v){L.prototype.setVisible.call(this,v);if(!v){this.removePopin();}return this;};C.prototype.updateSelectedDOM=function(s,$){L.prototype.updateSelectedDOM.apply(this,arguments);$.children().attr("aria-selected",s);var p=$.next(".sapMListTblSubRow");p.add("td",p).attr("aria-selected",s);};C.prototype.exit=function(){L.prototype.exit.call(this);this._checkTypeColumn(false);this.destroyClonedHeaders();this.removePopin();};C.prototype._activeHandlingInheritor=function(){this._toggleActiveClass(true);};C.prototype._inactiveHandlingInheritor=function(){this._toggleActiveClass(false);};C.prototype._toggleActiveClass=function(s){this.$Popin().toggleClass("sapMLIBActive",s);};C.handleEvents=function(e,c){var o=this.getItemByPopinEvent(e,c);if(o){e.srcControl=q(e.target).control(0)||o;if(o["on"+e.type]){o["on"+e.type](e,true);return o;}}};C.getItemByPopinEvent=function(e,c){var p=q(e.target).closest(".sapMListTblSubRow",c);if(p.length){return sap.ui.getCore().byId(p.prev().attr("id"));}};C.isPopinFocused=function(e){return q(document.activeElement).hasClass("sapMListTblSubRow");};C.prototype.getTabbables=function(){return this.$().add(this.$Popin()).find(":sapTabbable");};return C;},true);