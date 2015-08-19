/**
 * JUnit reporter for QUnit v1.0.2pre (commit 38d011eec6e44453ab22a851f9f604e9ab7c00e5)
 *
 * https://github.com/jquery/qunit-reporter-junit
 *
 * Copyright 2013 jQuery Foundation and other contributors
 * Released under the MIT license.
 * https://jquery.org/license/
 */
(function(){'use strict';var c,b,e,f;QUnit.jUnitReport=function(){};QUnit.begin(function(){c={modules:[],total:0,passed:0,failed:0,start:new Date(),time:0};});QUnit.moduleStart(function(d){b={name:d.name,tests:[],total:0,passed:0,failed:0,start:new Date(),time:0,stdout:[],stderr:[]};c.modules.push(b);});QUnit.testStart(function(d){if(!b){b={name:d.module||'default',tests:[],total:0,passed:0,failed:0,start:new Date(),time:0,stdout:[],stderr:[]};c.modules.push(b);}f=0;e={name:d.name,failedAssertions:[],total:0,passed:0,failed:0,start:new Date(),time:0};b.tests.push(e);});QUnit.log(function(d){f++;if(!d.result){e.failedAssertions.push(d);b.stdout.push('['+b.name+', '+e.name+', '+f+'] '+d.message);}});QUnit.testDone(function(d){e.time=(new Date()).getTime()-e.start.getTime();e.total=d.total;e.passed=d.passed;e.failed=d.failed;e=null;});QUnit.moduleDone(function(d){b.time=(new Date()).getTime()-b.start.getTime();b.total=d.total;b.passed=d.passed;b.failed=d.failed;b=null;});QUnit.done(function(d){c.time=d.runtime||((new Date()).getTime()-c.start.getTime());c.total=d.total;c.passed=d.passed;c.failed=d.failed;g(d,c);});var g=function(r,h){var p=function(n){return n<10?'0'+n:n;};var j=function(d){return d.getUTCFullYear()+'-'+p(d.getUTCMonth()+1)+'-'+p(d.getUTCDate())+'T'+p(d.getUTCHours())+':'+p(d.getUTCMinutes())+':'+p(d.getUTCSeconds())+'Z';};var k=function(d){return Math.round(d*1000)/1000000;};var x=function(d){var i={'"':'&quot;','\'':'&apos;','<':'&lt;','>':'&gt;','&':'&amp;'};return(''+d).replace(/[<>&\"\']/g,function(n){return i[n]||n;});};var X=function(d){d=d||{};var n=[],y=[],z;var A=function(i){if(z[i]&&n[n.length-1]!=='\n'){n.push('\n');}};z=(function(B){var i,C={};B=B||[];i=B.length;while(i--){C[B[i]]={};}return C;})(d.linebreak_at);this.start=function(i,B,C){if(!C){y.push(i);}n.push('<'+i);for(var D in B){n.push(' '+x(D)+'="'+x(B[D])+'"');}n.push(C?' />':'>');A(i);};this.end=function(){var i=y.pop();A(i);n.push('</'+i+'>');A(i);};this.text=function(i){n.push(x(i));};this.cdata=function(i){n.push('<![CDATA['+i+']]>');};this.comment=function(i){n.push('<!--'+i+'-->');};this.pi=function(i,B){n.push('<?'+i+(B?' '+B:'')+'?>\n');};this.doctype=function(i){n.push('<!DOCTYPE'+i+'>\n');};this.getString=function(){while(y.length){this.end();}return n.join('').replace(/\n$/,'');};this.reset=function(){n.length=0;y.length=0;};this.pi(d.xmldecl||'xml version="1.0" encoding="UTF-8"');};var m,l,o,t,q,s,a,L,u,v,w=new X({linebreak_at:['testsuites','testsuite','testcase','failure','system-out','system-err']});w.start('testsuites',{name:(window&&window.location&&window.location.href)||(h.modules.length===1&&h.modules[0].name)||null,hostname:'localhost',tests:h.total,failures:h.failed,errors:0,time:k(h.time),timestamp:j(h.start)});for(m=0,l=h.modules.length;m<l;m++){o=h.modules[m];w.start('testsuite',{id:m,name:o.name,hostname:'localhost',tests:o.total,failures:o.failed,errors:0,time:k(o.time),timestamp:j(o.start)});for(t=0,q=o.tests.length;t<q;t++){s=o.tests[t];w.start('testcase',{name:s.name,tests:s.total,failures:s.failed,errors:0,time:k(s.time),timestamp:j(s.start)});for(a=0,L=s.failedAssertions.length;a<L;a++){u=s.failedAssertions[a];v=u&&!(u.actual&&u.expected);w.start('failure',{type:'AssertionFailedError',message:u.message},v);if(!v){w.start('actual',{value:u.actual},true);w.start('expected',{value:u.expected},true);w.end();}}w.end();}if(o.stdout&&o.stdout.length){w.start('system-out');w.cdata('\n'+o.stdout.join('\n')+'\n');w.end();}if(o.stderr&&o.stderr.length){w.start('system-err');w.cdata('\n'+o.stderr.join('\n')+'\n');w.end();}w.end();}w.end();QUnit.jUnitReport({results:r,xml:w.getString()});};})();
