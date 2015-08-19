jQuery.sap.declare('sap.ui.suite.library-all');if(!jQuery.sap.isDeclared('sap.ui.suite.QuickViewUtils')){
/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare('sap.ui.suite.QuickViewUtils');jQuery.sap.require('jquery.sap.global');sap.ui.define("sap/ui/suite/QuickViewUtils",['jquery.sap.global'],function(q){"use strict";var Q={createQuickView:function(s,c,t,f){var m=new sap.ui.model.odata.ODataModel(s,false);var o=new sap.ui.ux3.QuickView({firstTitle:"{title}",firstTitleHref:"{titleLinkURL}",type:"{Thing/text}",icon:"{imageURL}"});o.setModel(m);o.bindElement("/QuickviewConfigs(name='"+c+"',thingKey='"+t+"')",{expand:"Thing,QVAttributes/Attribute,QVActions/Action"});var M=new sap.ui.suite.hcm.QvContent();M.bindAggregation("items",{path:"QVAttributes",factory:function(i,C){var a=new sap.ui.suite.hcm.QvItem(i,{label:"{Attribute/label}",link:"{valueLinkURL}",order:"{order}"});a.bindProperty("value","value",f&&f[C.getProperty("Attribute/name")]);return a;}});o.addContent(M);return o;},createQuickViewData:function(o,s,c,t,f){var m=new sap.ui.model.odata.ODataModel(s,false);o.removeAllContent();o.setModel(m);o.bindProperty("firstTitle","title");o.bindProperty("firstTitleHref","titleLinkURL");o.bindProperty("type","Thing/text");o.bindProperty("icon","imageURL");o.bindElement("/QuickviewConfigs(name='"+c+"',thingKey='"+t+"')",{expand:"Thing,QVAttributes/Attribute,QVActions/Action"});var M=new sap.ui.suite.hcm.QvContent();M.bindAggregation("items",{path:"QVAttributes",factory:function(i,C){var a=new sap.ui.suite.hcm.QvItem(i,{label:"{Attribute/label}",link:"{valueLinkURL}",order:"{order}"});a.bindProperty("value","value",f&&f[C.getProperty("Attribute/name")]);return a;}});o.addContent(M);},createDataSetQuickView:function(s,c,t,p,S){var m=new sap.ui.model.odata.ODataModel(s,false);if(S){m.setSizeLimit(S);}var o=new sap.ui.ux3.QuickView({type:t,showActionBar:false});o.setModel(m);o.addContent(this._createDSContent(o,c,p));return o;},createDataSetQuickViewData:function(o,s,c,t,p,S){var m=new sap.ui.model.odata.ODataModel(s,false);if(S){m.setSizeLimit(S);}o.removeAllContent();o.setType(t);o.setShowActionBar(false);o.setModel(m);o.addContent(this._createDSContent(o,c,p));},_createDSContent:function(o,c,p){var C=new sap.ui.commons.layout.MatrixLayout();var r=new sap.ui.commons.layout.MatrixLayoutRow();q.each(p,function(i,P){var a;if(P.href){a=new sap.ui.commons.Link({text:P.value,href:P.href});}else{a=new sap.ui.commons.TextView({text:P.value});}var b=new sap.ui.commons.layout.MatrixLayoutCell({content:[a]});b.addStyleClass("quickViewDS");r.addCell(b);});C.bindAggregation("rows",c,r);return C;}};sap.ui.core.Element.extend("sap.ui.suite.hcm.QvItem",{metadata:{properties:{label:"string",value:"string",link:"string",order:"string",type:"string"}}});sap.ui.core.Control.extend("sap.ui.suite.hcm.QvContent",{metadata:{aggregations:{"items":{type:"sap.ui.suite.hcm.QvItem",multiple:true}}},init:function(){this._sorted=false;},exit:function(){if(this._oML){this._oML.destroy();}},renderer:function(r,c){r.write("<div");r.writeControlData(c);r.write(">");r.renderControl(c._createQVContent(c));r.write("</div>");},_createQVContent:function(c){var m=new sap.ui.commons.layout.MatrixLayout({widths:["75px"]}),I=c.getItems(),M,o,l,t,L;if(this._oML){this._oML.destroy();}c._sortItems(c);for(var i=0;i<I.length;i++){M=new sap.ui.commons.layout.MatrixLayoutRow();o=new sap.ui.commons.layout.MatrixLayoutCell({vAlign:'Top'});l=new sap.ui.commons.Label({text:I[i].getLabel()+':'});o.addContent(l);M.addCell(o);o=new sap.ui.commons.layout.MatrixLayoutCell();if(I[i].getLink()){L=new sap.ui.commons.Link({text:I[i].getValue(),href:I[i].getLink()});o.addContent(L);}else{t=new sap.ui.commons.TextView({text:I[i].getValue()});o.addContent(t);}M.addCell(o);m.addRow(M);}this._oML=m;return m;},_sortItems:function(c){if(!c._sorted){var I=c.removeAllAggregation("items",true);I.sort(function(a,b){return(parseInt(a.getOrder(),10)-parseInt(b.getOrder(),10));});q.each(I,function(i,o){c.addAggregation("items",o,false);});c._sorted=true;}}});return Q;},true);};if(!jQuery.sap.isDeclared('sap.ui.suite.TaskCircleRenderer')){jQuery.sap.declare('sap.ui.suite.TaskCircleRenderer');jQuery.sap.require('jquery.sap.global');sap.ui.define("sap/ui/suite/TaskCircleRenderer",['jquery.sap.global'],function(q){"use strict";var T=function(){};T.render=function(r,c){var a=r;var m=c.getMinValue();var b=c.getMaxValue();var v=c.getValue();if(m<0||m==Number.NaN){m=0;}if(b<0||b==Number.NaN){b=1;}if(v<0||v==Number.NaN){v=0;}var d=v.toString();var e=c.getColor();var s='sapUiTaskCircleColorGray';switch(e){case sap.ui.suite.TaskCircleColor.Red:s='sapUiTaskCircleColorRed';break;case sap.ui.suite.TaskCircleColor.Yellow:s='sapUiTaskCircleColorYellow';break;case sap.ui.suite.TaskCircleColor.Green:s='sapUiTaskCircleColorGreen';break;case sap.ui.suite.TaskCircleColor.Gray:s='sapUiTaskCircleColorGray';break;}if(v<m){m=v;}if(v>b){b=v;}var p=24;if(m>10){p=32;}if(m>100){p=46;}var f=62;var g=parseInt(Math.sqrt((v-m)/(b-m)*(f*f-p*p)+p*p),10);var h=(v+'').length;var i=g*0.55;if(h>1){i=g/h;}a.write("<div");a.writeControlData(c);a.writeAttribute('tabIndex','0');if(c.getTooltip_AsString()){a.writeAttributeEscaped("title",c.getTooltip_AsString());}else{a.writeAttributeEscaped("title",d);}if(sap.ui.getCore().getConfiguration().getAccessibility()){a.writeAttribute('role','progressbar');a.writeAccessibilityState(c,{valuemin:m});a.writeAccessibilityState(c,{valuemax:b});a.writeAccessibilityState(c,{valuenow:v});}a.writeAttribute("class","sapUiTaskCircle "+s);a.addStyle("width",g+"px");a.addStyle("height",g+"px");a.addStyle("line-height",g+"px");a.addStyle("font-size",parseInt(i,10)+"px");a.addStyle("border-radius",g+"px");a.addStyle("-moz-border-radius",g+"px");a.writeClasses();a.writeStyles();a.write(">");a.write(v);a.write("</div>");};return T;},true);};if(!jQuery.sap.isDeclared('sap.ui.suite.VerticalProgressIndicatorRenderer')){jQuery.sap.declare('sap.ui.suite.VerticalProgressIndicatorRenderer');jQuery.sap.require('jquery.sap.global');sap.ui.define("sap/ui/suite/VerticalProgressIndicatorRenderer",['jquery.sap.global'],function(q){"use strict";var V={};V.render=function(r,c){var a=r;var b=c.getPercentage();if(b<0||b==Number.NaN){b=0;}if(b>100){b=100;}var P=Math.round(b*58/100);var d=58-P;var e=b.toString();a.write("<DIV");a.writeControlData(c);a.writeAttribute('tabIndex','0');if(c.getTooltip_AsString()){a.writeAttributeEscaped("title",c.getTooltip_AsString());}else{a.writeAttributeEscaped("title",e);}if(sap.ui.getCore().getConfiguration().getAccessibility()){a.writeAttribute('role','progressbar');a.writeAccessibilityState(c,{valuemin:'0%'});a.writeAccessibilityState(c,{valuemax:'100%'});a.writeAccessibilityState(c,{valuenow:b+'%'});}a.writeAttribute("class","sapUiVerticalProgressOuterContainer");a.write(">");a.write("<DIV");a.writeAttribute('id',c.getId()+'-bar');a.writeAttribute("class","sapUiVerticalProgressInnerContainer");a.addStyle("top",d+"px");a.addStyle("height",P+"px");a.writeClasses();a.writeStyles();a.write(">");a.write("</DIV>");a.write("</DIV>");};return V;},true);};if(!jQuery.sap.isDeclared('sap.ui.suite.library')){jQuery.sap.declare('sap.ui.suite.library');jQuery.sap.require('jquery.sap.global');jQuery.sap.require('sap.ui.core.library');sap.ui.define("sap/ui/suite/library",['jquery.sap.global','sap/ui/core/library'],function(q){"use strict";sap.ui.getCore().initLibrary({name:"sap.ui.suite",version:"1.28.16",dependencies:["sap.ui.core"],types:["sap.ui.suite.TaskCircleColor"],interfaces:[],controls:["sap.ui.suite.TaskCircle","sap.ui.suite.VerticalProgressIndicator"],elements:[]});sap.ui.suite.TaskCircleColor={Red:"Red",Yellow:"Yellow",Green:"Green",Gray:"Gray"};return sap.ui.suite;});};if(!jQuery.sap.isDeclared('sap.ui.suite.TaskCircle')){jQuery.sap.declare('sap.ui.suite.TaskCircle');jQuery.sap.require('jquery.sap.global');jQuery.sap.require('sap.ui.core.Control');jQuery.sap.require('sap.ui.core.EnabledPropagator');sap.ui.define("sap/ui/suite/TaskCircle",['jquery.sap.global','sap/ui/core/Control','sap/ui/core/EnabledPropagator','./library'],function(q,C,E,l){"use strict";var T=C.extend("sap.ui.suite.TaskCircle",{metadata:{library:"sap.ui.suite",properties:{value:{type:"int",group:"Misc",defaultValue:0},maxValue:{type:"int",group:"Misc",defaultValue:100},minValue:{type:"int",group:"Misc",defaultValue:0},color:{type:"sap.ui.suite.TaskCircleColor",group:"Misc",defaultValue:sap.ui.suite.TaskCircleColor.Gray}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"},ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"}},events:{press:{}}}});E.call(T.prototype);T.prototype.init=function(){};T.prototype.onclick=function(e){this.firePress({});e.preventDefault();e.stopPropagation();};T.prototype.focus=function(){var d=this.getDomRef();if(d){d.focus();}};return T;},true);};if(!jQuery.sap.isDeclared('sap.ui.suite.VerticalProgressIndicator')){jQuery.sap.declare('sap.ui.suite.VerticalProgressIndicator');jQuery.sap.require('jquery.sap.global');jQuery.sap.require('sap.ui.core.Control');jQuery.sap.require('sap.ui.core.EnabledPropagator');sap.ui.define("sap/ui/suite/VerticalProgressIndicator",['jquery.sap.global','sap/ui/core/Control','sap/ui/core/EnabledPropagator','./library'],function(q,C,E,l){"use strict";var V=C.extend("sap.ui.suite.VerticalProgressIndicator",{metadata:{library:"sap.ui.suite",properties:{percentage:{type:"int",group:"Misc",defaultValue:null}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"},ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"}},events:{press:{}}}});E.call(V.prototype);V.prototype.setPercentage=function(p){var a=this.getPercentage();if(a==p){return this;}this.oBar=q.sap.domById(this.getId()+'-bar');a=p;if(a<0||a==Number.NaN){a=0;}if(a>100){a=100;}var P=Math.round(a*58/100);var b=58-P;this.setProperty('percentage',p,true);q(this.oBar).css("top",b);q(this.oBar).css("height",P);if(!this.oThis){this.oThis=q.sap.byId(this.getId());}this.oThis.attr('aria-valuenow',p+'%');return this;};V.prototype.onclick=function(e){this.firePress({});e.preventDefault();e.stopPropagation();};V.prototype.focus=function(){var d=this.getDomRef();if(d){d.focus();}};return V;},true);};
