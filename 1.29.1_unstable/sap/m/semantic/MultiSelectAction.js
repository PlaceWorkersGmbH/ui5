/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/m/semantic/SemanticToggleButton'],function(S){"use strict";var M=S.extend("sap.m.semantic.MultiSelectAction",{});M.prototype._getPressed=function(){return this._getControl().getIcon()==="sap-icon://sys-cancel";};M.prototype._setPressed=function(p,s){var i=p?"sap-icon://sys-cancel":"sap-icon://multi-select";this._getControl().setIcon(i);};return M;},true);
