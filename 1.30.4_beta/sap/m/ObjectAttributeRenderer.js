/*
 * @copyright
 */
sap.ui.define(['jquery.sap.global'],function(q){"use strict";var O={};O.render=function(r,o){var p=o.getParent(),t=o.getTooltip_AsString();if(o._isEmpty()){return;}r.write("<div");r.writeControlData(o);r.addClass("sapMObjectAttributeDiv");if(o._isSimulatedLink()){r.addClass("sapMObjectAttributeActive");r.writeAttribute("tabindex","0");}r.writeClasses();if(t){r.writeAttributeEscaped("title",t);}if(o.getActive()&&!o.getAggregation("customContent")){r.writeAccessibilityState(o,{role:"link"});}r.write(">");if(p&&(p instanceof sap.m.ObjectHeader)){this.renderTitleInObjectHeader(r,o);this.renderTextInObjectHeader(r,o);}else{r.renderControl(o._getUpdatedTextControl());}r.write("</div>");};O.renderTitleInObjectHeader=function(r,o){if(!o.getProperty("title")){return;}r.write("<span id=\""+o.getId()+"-title\"");r.addClass("sapMObjectAttributeTitle");r.writeClasses();r.write(">");r.writeEscaped(o.getProperty("title"));r.write("</span>");r.write("<span id=\""+o.getId()+"-colon\"");r.addClass("sapMObjectAttributeColon");r.writeClasses();r.write(">");r.write(":&nbsp;");r.write("</span>");};O.renderTextInObjectHeader=function(r,o){var t=o.getTextDirection(),a=o.getAggregation("customContent");r.write("<span id=\""+o.getId()+"-text\"");r.addClass("sapMObjectAttributeText");if(t&&t!==sap.ui.core.TextDirection.Inherit){r.writeAttribute("dir",t.toLowerCase());}r.writeClasses();r.write(">");if(a){if(!o.getParent().getResponsive()){o._setControlWrapping(a,true,sap.m.ObjectAttribute.MAX_LINES.MULTI_LINE);}else{o._setControlWrapping(a,false,sap.m.ObjectAttribute.MAX_LINES.SINGLE_LINE);}r.renderControl(a);}else{r.writeEscaped(o.getProperty("text"));}r.write("</span>");};return O;},true);
