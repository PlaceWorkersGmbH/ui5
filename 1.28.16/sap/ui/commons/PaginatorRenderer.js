/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','jquery.sap.encoder'],function(q){"use strict";var P={};P.render=function(r,p){var a=sap.ui.getCore().getLibraryResourceBundle("sap.ui.commons");r.write("<div");r.writeControlData(p);r.writeAccessibilityState(p,{role:"toolbar",labelledby:p.getId()+"-accDesc"});r.addClass("sapUiPag");r.writeClasses();r.write(">");r.write("<span class='sapUiPagAccDesc' id='"+p.getId()+"-accDesc'>");r.writeEscaped(a.getText("PAGINATOR"));r.write("</span>");this.renderPaginator(r,p);r.write("</div>");};P.renderPaginator=function(r,p){if(p.getNumberOfPages()<=1){return;}var a=p.getId();var c=p.getCurrentPage();var b=sap.ui.getCore().getLibraryResourceBundle("sap.ui.commons");var l=(c==1)?"sapUiLnkDsbl":"sapUiLnk";var d=(c==1)?" aria-disabled='true'":"";if(p.getNumberOfPages()>5){r.write("<a id='"+a+"--firstPageLink' href='javascript:void(0);' title='");r.writeEscaped(b.getText("FIRST_PAGE"));r.write("' class='sapUiPagBtn sapUiPagFirst "+l+"' "+d+"><span class='sapUiPagText'>");r.writeEscaped(b.getText("PAGINATOR_OTHER_PAGE",[1]));r.write("</span></a>");}r.write("<a id='"+a+"--backLink' href='javascript:void(0);' title='");r.writeEscaped(b.getText("PREVIOUS_PAGE"));r.write("' class='sapUiPagBtn sapUiPagBack "+l+"' "+d+"><span class='sapUiPagText'>");r.writeEscaped(b.getText("BACK"));r.write("</span></a>");r.write("<ul id='"+a+"-pages' role='presentation'>");r.write(P.getPagesHtml(a,p._calculatePagesRange(),p.getCurrentPage(),true));r.write("</ul>");l=(c==p.getNumberOfPages())?"sapUiLnkDsbl":"sapUiLnk";d=(c==1)?" aria-disabled='true'":"";r.write("<a id='"+a+"--forwardLink' href='javascript:void(0);' title='");r.writeEscaped(b.getText("NEXT_PAGE"));r.write("' class='sapUiPagBtn sapUiPagForward "+l+"' "+d+"><span class='sapUiPagText'>");r.writeEscaped(b.getText("FORWARD"));r.write("</span></a>");if(p.getNumberOfPages()>5){r.write("<a id='"+a+"--lastPageLink' href='javascript:void(0);' title='");r.writeEscaped(b.getText("LAST_PAGE"));r.write("' class='sapUiPagBtn sapUiPagLast "+l+"' "+d+"><span class='sapUiPagText'>");r.writeEscaped(b.getText("PAGINATOR_OTHER_PAGE",[p.getNumberOfPages()]));r.write("</span></a>");}};P.getPagesHtml=function(p,r,c,v){var h=[];var a=sap.ui.getCore().getLibraryResourceBundle("sap.ui.commons");for(var i=r.firstPage;i<=r.lastPage;i++){h.push("<li id='"+p+"-li--"+i+"' class='sapUiPagPage");h.push((i==c)?" sapUiPagCurrentPage'":"'");if(!v){h.push(" style='display:none'");}h.push(">");h.push("<a id='"+p+"-a--"+i+"' title='");if(i==c){h.push(q.sap.encodeHTML(a.getText("PAGINATOR_CURRENT_PAGE",[i])));}else{h.push(q.sap.encodeHTML(a.getText("PAGINATOR_OTHER_PAGE",[i])));}h.push("' href='javascript:void(0);'");if(i==c){h.push(" tabindex='0' class='sapUiLnkDsbl'");}else{h.push(" class='sapUiLnk'");}h.push(">"+i+"</a>");h.push("</li>");}return h.join("");};P.updateBackAndForward=function(p){var a=p.getCurrentPage();var i=p.getId();var b=(a==1);var c=(a==p.getNumberOfPages());var f=q.sap.byId(i+"--firstPageLink").toggleClass("sapUiLnk",!b).toggleClass("sapUiLnkDsbl",b);var d=q.sap.byId(i+"--backLink").toggleClass("sapUiLnk",!b).toggleClass("sapUiLnkDsbl",b);var e=q.sap.byId(i+"--forwardLink").toggleClass("sapUiLnk",!c).toggleClass("sapUiLnkDsbl",c);var l=q.sap.byId(i+"--lastPageLink").toggleClass("sapUiLnk",!c).toggleClass("sapUiLnkDsbl",c);if(b){f.attr("aria-disabled","true");d.attr("aria-disabled","true");e.removeAttr("aria-disabled");l.removeAttr("aria-disabled");}else if(c){f.removeAttr("aria-disabled");d.removeAttr("aria-disabled");e.attr("aria-disabled","true");l.attr("aria-disabled","true");}else{f.removeAttr("aria-disabled");d.removeAttr("aria-disabled");e.removeAttr("aria-disabled");l.removeAttr("aria-disabled");}};return P;},true);
