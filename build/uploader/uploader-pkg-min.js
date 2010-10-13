/*
Copyright 2010, KISSY UI Library v1.1.3
MIT Licensed
build time: Oct 13 13:21
*/
KISSY.add("ajbridge",function(d){function e(b,a){b=b.replace("#","");a=g._normalize(a||{});var c=this,f="#"+b;e.instances[b]=c;if(a.src){a.params.allowscriptaccess=i;a.params.flashvars=d.merge(a.params.flashvars,{jsEntry:j,swfID:b})}c.args=[f,a,function(h){if(h.status<1)c.fire("failed",{message:h});else{d.mix(c,h);a.src||c.activate()}}]}var g=d.Flash,i="always",j="KISSY.AJBridge.eventHandler";d.mix(e,{version:"1.0.12",instances:{},eventHandler:function(b,a){var c=e.instances[b];c&&c._eventHandler(b,
a)},augment:function(b,a){if(d.isString(a))a=[a];d.isArray(a)&&d.each(a,function(c){b.prototype[c]=function(){try{return this.callSWF(c,d.makeArray(arguments))}catch(f){this.fire("error",{message:f})}}})}});d.augment(e,d.EventTarget,{init:function(){g.add.apply(g,this.args)},_eventHandler:function(b,a){var c=a.type;a.id=b;c!=="log"&&c&&this.fire(c,a)},callSWF:function(b,a){a=a||[];try{if(this.swf[b])return this.swf[b].apply(this.swf,a)}catch(c){var f="";if(a.length!==0)f="'"+a.join("','")+"'";return(new Function("self",
"return self.swf."+b+"("+f+");"))(this)}}});e.augment(e,["activate","getReady"]);d.app(e);d.AJBridge=e});AJBridge=KISSY.AJBridge;
AJBridge.add("uploader",function(d){function e(j,b){var a={},c,f,h=i.length;b=b||{};for(f=0;f<h;f++){c=i[f];if(c in b)a[c]=b[c]}b.params.flashvars=g.merge(b.params.flashvars,a);e.superclass.constructor.call(this,j,b)}var g=KISSY,i=["ds","dsp","dsr","btn","hand"];g.extend(e,d);d.augment(e,["setFileFilters","filter","setAllowMultipleFiles","multifile","browse","upload","uploadAll","cancel","getFile","removeFile","lock","unlock","setBtnMode","useHand","clear"]);e.version="1.0.0";d.Uploader=e});
