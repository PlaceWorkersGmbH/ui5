/*!
 * @copyright@
 */
sap.ui.define(['jquery.sap.global'],function(q){"use strict";var I={};I.render=function(r,l){var a=l.getId();r.write("<div");r.writeControlData(l);r.addClass("sapDkIdxLayout");r.addClass("sapDkIdxLayoutHidden");if(l.getEnableScaling()){r.addClass("sapDkIdxLayoutScale");}r.writeClasses();r.write("><div id=\"",a,"-cntnt\">");var c=l.getContent();for(var i=0;i<c.length;i++){r.write("<div class=\"sapDkIdxLayoutItem\" style=\"width:",l._scale(l._itemWidth),"px;height:",l._scale(l._itemHeight),"px;\"><div>");r.renderControl(c[i]);r.write("</div></div>");}r.write("</div></div>");};return I;},true);
