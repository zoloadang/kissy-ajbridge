/*
Copyright 2010, KISSY UI Library v1.1.5
MIT Licensed
build time: Oct 21 10:47
*/
KISSY.add("ajbridge",function(d){function e(b,a){b=b.replace(i,"");a=g._normalize(a);var c=this,f=i+b;e.instances[b]=c;if(a.src){a.params.allowscriptaccess="always";a.params.flashvars=d.merge(a.params.flashvars,{jsEntry:j,swfID:b})}c.__args=[f,a,function(h){if(h.status<1)c.fire("failed",{message:h});else{d.mix(c,h);a.src||c.activate()}}]}var g=d.Flash,i="#",j="KISSY.AJBridge.eventHandler";d.app(e,{version:"1.0.12",instances:{},eventHandler:function(b,a){var c=e.instances[b];c&&c.__eventHandler(b,
a)},augment:function(b,a){if(d.isString(a))a=[a];d.isArray(a)&&d.each(a,function(c){b.prototype[c]=function(){try{return this.callSWF(c,d.makeArray(arguments))}catch(f){this.fire("error",{message:f})}}})}});d.augment(e,d.EventTarget,{init:function(){g.add.apply(g,this.__args)},__eventHandler:function(b,a){var c=a.type;a.id=b;c!=="log"&&c&&this.fire(c,a)},callSWF:function(b,a){a=a||[];try{if(this.swf[b])return this.swf[b].apply(this.swf,a)}catch(c){var f="";if(a.length!==0)f="'"+a.join("','")+"'";
return(new Function("self","return self.swf."+b+"("+f+");"))(this)}}});e.augment(e,["activate","getReady"]);window.AJBridge=d.AJBridge=e});
