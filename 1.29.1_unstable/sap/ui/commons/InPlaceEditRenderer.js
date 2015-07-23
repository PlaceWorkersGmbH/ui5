/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global'],function(q){"use strict";var I={};I.render=function(r,i){var c=i.getContent();var w;if(c){if(c.getWidth){w=c.getWidth();}if(c.getVisible&&!c.getVisible()){return;}}else{return;}r.write("<DIV");r.writeControlData(i);r.addClass("sapUiIpe");if(!i.getEditable()){r.addClass("sapUiIpeRo");}else if(!i._bEditMode){r.writeAttribute("tabindex","-1");if(!i._sOldTextAvailable){if(c.getMetadata().getName()=="sap.ui.commons.ComboBox"||c.getMetadata().getName()=="sap.ui.commons.DropdownBox"){r.addClass("sapUiIpeCombo");}}if(c.getMetadata().getName()=="sap.ui.commons.Link"){r.addClass("sapUiIpeLink");}}else{r.addClass("sapUiIpeEdit");}if(w){r.addStyle("width",w);}if(i.getUndoEnabled()&&i._sOldTextAvailable&&(!i._bEditMode||(i._bEditMode&&i._oEditControl.getValue()!=i._sOldText))){r.addClass("sapUiIpeUndo");}switch(i.getValueState()){case sap.ui.core.ValueState.Error:r.addClass('sapUiIpeErr');break;case sap.ui.core.ValueState.Success:r.addClass('sapUiIpeSucc');break;case sap.ui.core.ValueState.Warning:r.addClass('sapUiIpeWarn');break;default:break;}var t=sap.ui.core.ValueStateSupport.enrichTooltip(i,i.getTooltip_AsString());if(t){r.writeAttributeEscaped('title',t);}r.writeClasses();r.writeStyles();r.write(">");if(i._sOldTextAvailable||c.getMetadata().getName()=="sap.ui.commons.Link"){r.write("<DIV");r.addClass("sapUiIpeCont");if(c.getMetadata().getName()=="sap.ui.commons.ComboBox"||c.getMetadata().getName()=="sap.ui.commons.DropdownBox"){r.addClass("sapUiIpeCombo");}r.writeClasses();r.write(">");}if(i._bEditMode){this.renderEditContent(r,i);}else{this.renderDisplayContent(r,i);}if(i._sOldTextAvailable||c.getMetadata().getName()=="sap.ui.commons.Link"){r.write("</DIV>");if(i.getUndoEnabled()&&i._sOldTextAvailable){r.renderControl(i._oUndoButton);}}r.write("</DIV>");};I.renderDisplayContent=function(r,i){if(i._oDisplayControl){r.renderControl(i._oDisplayControl);if(i.getEditable()&&i._oDisplayControl.getMetadata().getName()=="sap.ui.commons.Link"){r.renderControl(i._oEditButton);}}};I.renderEditContent=function(r,i){if(i._oEditControl){r.renderControl(i._oEditControl);}};return I;},true);
