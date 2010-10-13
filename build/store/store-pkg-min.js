/*
Copyright 2010, KISSY UI Library v1.1.3
MIT Licensed
build time: Oct 13 13:21
*/
KISSY.add("ajbridge",function(d){function e(b,a){b=b.replace("#","");a=f._normalize(a||{});var c=this,g="#"+b;e.instances[b]=c;if(a.src){a.params.allowscriptaccess=h;a.params.flashvars=d.merge(a.params.flashvars,{jsEntry:i,swfID:b})}c.args=[g,a,function(j){if(j.status<1)c.fire("failed",{message:j});else{d.mix(c,j);a.src||c.activate()}}]}var f=d.Flash,h="always",i="KISSY.AJBridge.eventHandler";d.mix(e,{version:"1.0.12",instances:{},eventHandler:function(b,a){var c=e.instances[b];c&&c._eventHandler(b,
a)},augment:function(b,a){if(d.isString(a))a=[a];d.isArray(a)&&d.each(a,function(c){b.prototype[c]=function(){try{return this.callSWF(c,d.makeArray(arguments))}catch(g){this.fire("error",{message:g})}}})}});d.augment(e,d.EventTarget,{init:function(){f.add.apply(f,this.args)},_eventHandler:function(b,a){var c=a.type;a.id=b;c!=="log"&&c&&this.fire(c,a)},callSWF:function(b,a){a=a||[];try{if(this.swf[b])return this.swf[b].apply(this.swf,a)}catch(c){var g="";if(a.length!==0)g="'"+a.join("','")+"'";return(new Function("self",
"return self.swf."+b+"("+g+");"))(this)}}});e.augment(e,["activate","getReady"]);d.app(e);d.AJBridge=e});AJBridge=KISSY.AJBridge;
AJBridge.add("store",function(d){function e(i,b){var a={},c;b=b||{};c=b.useCompression;switch(b.baseOnBrowser){case "core":a.browser=h.core;break;case "shell":a.browser=h.shell;break}a.useCompression=(c!==undefined?c:true)+"";b.params.flashvars=f.merge(b.params.flashvars,a);e.superclass.constructor.call(this,i,b)}var f=KISSY,h=f.UA;f.extend(e,d);d.augment(e,["getItem","setItem","removeItem","getLength","key","clear","getModificationDate","hasAdequateDimensions","displaySettings","getUseCompression",
"getSize","setMinDiskSpace"]);e.version="1.0.4";d.Store=e});
