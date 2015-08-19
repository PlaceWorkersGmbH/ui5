/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/base/EventProvider','sap/ui/core/routing/Target'],function($,E,T){"use strict";var R=E.extend("sap.ui.core.routing.Route",{metadata:{publicMethods:["getURL","getPattern"]},constructor:function(r,c,p){E.apply(this,arguments);if(!c.name){$.sap.log.error("A name has to be specified for every route",this);}var t=this,v=c.pattern,s;if(!$.isArray(v)){v=[v];}if($.isArray(c.subroutes)){s=c.subroutes;c.subroutes={};$.each(s,function(S,o){c.subroutes[o.name]=o;});}this._aPattern=[];this._aRoutes=[];this._oParent=p;this._oConfig=c;this._oRouter=r;if(!c.target){this._oTarget=new T(c,r._oViews,p&&p._oTarget);this._oTarget._bUseRawViewId=true;}if(c.subroutes){$.each(c.subroutes,function(a,S){if(S.name===undefined){S.name=a;}r.addRoute(S,t);});}if(c.pattern===undefined){return;}$.each(v,function(i,a){t._aPattern[i]=a;t._aRoutes[i]=r._oRouter.addRoute(a);t._aRoutes[i].greedy=c.greedy;t._aRoutes[i].matched.add(function(){var A={};$.each(arguments,function(b,d){A[t._aRoutes[i]._paramsIds[b]]=d;});t._routeMatched(A,true);});});},destroy:function(){E.prototype.destroy.apply(this);this._aPattern=null;this._aRoutes=null;this._oParent=null;this._oConfig=null;this.bIsDestroyed=true;return this;},getURL:function(p){return this._aRoutes[0].interpolate(p);},getPattern:function(){return this._aPattern[0];},attachMatched:function(d,f,l){return this.attachEvent("matched",d,f,l);},detachMatched:function(f,l){return this.detachEvent("matched",f,l);},attachPatternMatched:function(d,f,l){return this.attachEvent("patternMatched",d,f,l);},detachPatternMatched:function(f,l){return this.detachEvent("patternMatched",f,l);},_routeMatched:function(a,i){var r=this._oRouter,p,P,t,c,e,v=null,o=null;if(this._oParent){p=this._oParent._routeMatched(a);}c=$.extend({},r._oConfig,this._oConfig);e={name:c.name,arguments:a,config:c};if(this._oTarget){t=this._oTarget;t._oOptions=this._convertToTargetOptions(c);if(t._isValid(p,false)){P=t._place(p);}P=P||{};v=P.oTargetParent;o=P.oTargetControl;e.view=v;e.targetControl=o;}else{r._oTargets._display(this._oConfig.target,a);}if(c.callback){c.callback(this,a,c,o,v);}this.fireEvent("matched",e);r.fireRouteMatched(e);if(i){$.sap.log.info("The route named '"+c.name+"' did match with its pattern",this);this.fireEvent("patternMatched",e);r.fireRoutePatternMatched(e);}return P;},_convertToTargetOptions:function(o){return jQuery.extend(true,{},o,{rootView:o.targetParent,controlId:o.targetControl,controlAggregation:o.targetAggregation,clearControlAggregation:o.clearTarget,viewName:o.view,viewType:o.viewType,viewId:o.viewId});}});R.M_EVENTS={Matched:"matched",PatternMatched:"patternMatched"};return R;});
