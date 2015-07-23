/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./ListItemBaseRenderer','./ListRenderer','sap/ui/core/Renderer'],function(q,L,a,R){"use strict";var C=R.extend(L);C.isTextualControl=function(c){var m=[sap.m.Text,sap.m.Label,sap.m.Link,sap.m.Title];return m.some(function(f){return f&&c instanceof f;});};C.render=function(r,l){var t=l.getTable();if(!t){return;}L.render.apply(this,arguments);if(l.getVisible()&&t.hasPopin()){this.renderPopin(r,l,t);}};C.openItemTag=function(r,l){r.write("<tr");};C.closeItemTag=function(r,l){r.write("</tr>");};C.handleNoFlex=function(r,l){};C.renderType=function(r,l){r.write('<td role="gridcell" class="sapMListTblNavCol"');this.writeAriaSelected(r,l);if(!l.needsTypeColumn()){r.writeAttribute("aria-hidden","true");}r.write('>');L.renderType.apply(this,arguments);r.write('</td>');};C.renderModeContent=function(r,l){r.write('<td role="gridcell" class="sapMListTblSelCol"');this.writeAriaSelected(r,l);r.write('>');L.renderModeContent.apply(this,arguments);r.write('</td>');};C.renderCounter=function(r,l){};C.getAriaRole=function(l){return"row";};C.getAriaLabelledBy=function(l){var t=l.getTable(),A=L.getAriaLabelledBy.call(this,l)||"";if(!t||!t.hasPopin()){return A;}var i=l.getId();if(!A){A=i;}else if(A.indexOf(i)==-1){A=i+" "+A;}return A+" "+i+"-sub";};C.writeAriaSelected=function(r,l){if(l.isSelectable()){r.writeAttribute("aria-selected",l.getProperty("selected"));}};C.renderLIAttributes=function(r,l){r.addClass("sapMListTblRow");var A=l.getVAlign();if(A!=sap.ui.core.VerticalAlign.Inherit){r.addClass("sapMListTblRow"+A);}};C.renderLIContentWrapper=function(r,l){var t=l.getTable();if(!t){return;}var c=t.getColumns(true),b=l.getCells(),s=l.isSelectable(),S=l.getProperty("selected");l.destroyClonedHeaders();c.forEach(function(o,i){var d,h,e=true,f=b[o.getInitialOrder()];if(!f||!o.getVisible()||o.isNeverVisible(true)||o.isPopin()){return;}r.write("<td");r.addClass("sapMListTblCell");r.writeAttribute("id",l.getId()+"_cell"+i);r.writeAttribute("role","gridcell");if(s){r.writeAttribute("aria-selected",S);}if(o){d=o.getStyleClass(true);d&&r.addClass(d);h=o.getHeader();if(h){r.writeAttribute("aria-describedby",h.getId());}if(!t.hasPopin()&&o.getMergeDuplicates()){var F=o.getMergeFunctionName(),g=F.split("#"),j=g[1],k=g[0];if(typeof f[k]!="function"){q.sap.log.warning("mergeFunctionName property is defined on "+o+" but this is not function of "+f);}else{var m=o.getLastValue(),n=f[k](j);if(m===n){e=sap.ui.getCore().getConfiguration().getAccessibility();f.addStyleClass("sapMListTblCellDupCnt");r.addClass("sapMListTblCellDup");}else{o.setLastValue(n);}}}o.getVAlign()!="Inherit"&&r.addStyle("vertical-align",o.getVAlign().toLowerCase());var A=o.getCssAlign();if(A){r.addStyle("text-align",A);}r.writeStyles();}r.writeClasses();r.write(">");if(e){if(h&&f.getAriaLabelledBy&&this.isTextualControl(h)&&f.getAriaLabelledBy().indexOf(h.getId())==-1){f.addAriaLabelledBy(h);}r.renderControl(o.applyAlignTo(f));}r.write("</td>");},this);};C.renderPopin=function(r,l,t){var s=l.getProperty("selected"),S=l.isSelectable();l._popinId=l.getId()+"-sub";r.write("<tr class='sapMListTblSubRow'");r.writeAttribute("id",l._popinId);r.writeAttribute("role","row");r.writeAttribute("tabindex","-1");if(S){r.writeAttribute("aria-selected",s);}r.writeAttribute("aria-owns",l.getId());r.write("><td");r.writeAttribute("role","gridcell");r.writeAttribute("colspan",t.getColCount());if(S){r.writeAttribute("aria-selected",S);}r.write("><div class='sapMListTblSubCnt'>");var c=l.getCells(),b=t.getColumns(true);b.forEach(function(o){if(!o.getVisible()||!o.isPopin()){return;}var d=c[o.getInitialOrder()],h=o.getHeader();if(!h&&!d){return;}var e=o.getStyleClass(),p=o.getPopinDisplay();r.write("<div");r.addClass("sapMListTblSubCntRow");e&&r.addClass(e);r.writeClasses();r.write(">");if(h&&p!=sap.m.PopinDisplay.WithoutHeader){r.write("<div");r.addClass("sapMListTblSubCntHdr");r.writeClasses();r.write(">");h=h.clone();o.addDependent(h);l.addClonedHeader(h);o.applyAlignTo(h,"Begin");r.renderControl(h);r.write("</div>");r.write("<div class='sapMListTblSubCntSpr'>:</div>");}if(d){r.write("<div");r.addClass("sapMListTblSubCntVal");r.addClass("sapMListTblSubCntVal"+p);r.writeClasses();r.write(">");o.applyAlignTo(d,"Begin");r.renderControl(d);r.write("</div>");}r.write("</div>");});r.write("</div></td></tr>");};return C;},true);
