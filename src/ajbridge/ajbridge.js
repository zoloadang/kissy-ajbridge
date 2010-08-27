/**
 * AJBridge Class
 * @author kingfo oicuicu@gmail.com
 */

KISSY.add('ajbridge', function(S) {

    var Flash = S.Flash,
        VERSION = '1.0.10',
        ALWAY_ALLOW_SCRIPT_ACCESS = 'always',
        EVENT_HANDLER = 'KISSY.AJBridge.eventHandler'; // Flash 事件抛出接受通道

    /**
     * AJBridge
     * @param {String} id      注册的应用id, 需要保持和SWF所在的HTML元素ID相同
     * @param {Object} config  基本配置同 S.Flash 的 config
     */
    function AJBridge(id, config) {
        id = id.replace('#', '');			// 健壮性考虑。出于 KISSY 习惯采用  id 选择器。

        var self = this,
            traget = '#' + id,            //	之所以要求使用 id，是因为当使用 ajbridge 时 程序员自己应该能确切知道自己在做什么。
            callback = function(data) {
                // 注意， status 大于 0 都是可用的
                if (data.status < 1) {
                    self.fire('failed', { message: data } );
                    return;
                }
                S.mix(self, data);

                // 执行激活 静态模式的 flash
                // 如果这 AJBridge 先于 DOMReady 前执行 则失效
                // 建议配合 S.ready();
                if (!config.src) {
                    self.activate();
                }

            };

        // 注册应用实例
        AJBridge.instances[id] = self;

        // 标准化参数关键字
        config = Flash._normalize(config || {});

        //	动态方式
        if (config.src) {
            // 强制打开 JS 访问授权，AJBridge 的最基本要求
            config.params.allowscriptaccess = ALWAY_ALLOW_SCRIPT_ACCESS;
            config.params.flashvars = S.merge(config.params.flashvars, {
                // 配置 JS 入口
                jsEntry: EVENT_HANDLER,
                // 虽然Flash通过  ExternalInterface 获得 obejctId
                // 但是依然存在兼容性问题,因此需要直接告诉
                swfID: id
            });
        }

        // 支持静态方式，但是要求以上三个步骤已静态写入
        // 可以参考 test.html


        // 由于完全基于事件机制，因此需要通过监听之后进行初始化Flash
        // 异步的实现
        self.args = [traget,config, callback];

        // 移动至	init		
        //		Flash.add(traget,config,callback);


    }



	/**
	 * 静态方法群
	 */
    S.mix(AJBridge, {
		version:VERSION,
        instances: {},
	    /**
	     * 处理来自 AJBridge 已定义的事件
	     * @param {Object} event
	     */
	    eventHandler: function(id, event) {
	        AJBridge.instances[id]._eventHandler(id, event);
	    },
		/**
	     * 批量注册 SWF 公开的方法
	     * @param {Array} methods
	     * @param {Class} C
	     */
	    augment : function (C, methods) {
	        if (!S.isArray(methods))return;
	        S.each(methods, function(methodName) {
	            C.prototype[methodName] = function() {
	                try {
	                    return this.callSWF(methodName, S.makeArray(arguments));
	                } catch(e) { // 当 swf 异常时，进一步捕获信息
	                    this.fire('error', { message: e });
	                }
	            }
	        });
	    },
		 /**
	     * 注册 SWF 公开的方法
	     * @param {String} methodName
	     * @param {Class} C
	     */
	   addProto : function(C,methodName) {
	        C.prototype[methodName] = function() {
	            try {
	                return this.callSWF(methodName, S.makeArray(arguments));
	            } catch(e) { // 当 swf 异常时，进一步捕获信息
	                this.fire('error', { message: e });
	            }
	        }
	    }
    });
	/**
	 * 原型方法群
	 */
    S.augment(AJBridge, S.EventTarget, {

        init:function() {
            var self = this;
            Flash.add.apply(Flash, self.args);
        },

        _eventHandler: function(id, event) {
            var self = this,
                type = event.type;
				
            event.id = id;   //	弥补后期 id使用
            if (type === 'log') {
                S.log(event.message);
            } else if (type) {
                self.fire(type, event);
            }
        },

        /**
         * Calls a specific function exposed by the SWF's ExternalInterface.
         * @param func {String} the name of the function to call
         * @param args {Array} the set of arguments to pass to the function.
         */
        callSWF: function (func, args) {
            var self = this;
            args = args || [];

            try {
                if (self.swf[func]) {
                    return self.swf[func].apply(self.swf, args);
                }
            }
                // some version flash function is odd in ie: property or method not supported by object
            catch(e) {
                var params = '';
                if (args.length !== 0) {
                    params = '\'' + args.join('','') + '\'';
                }
                //avoid eval for compressiong
                return (new Function('self', 'return self.swf.' + func + '(' + params + ');'))(self);
            }
        }
    });

    // 为静态方法动态注册
    // 注意，只有在 S.ready() 后进行 AJBridge注册才有效。
    AJBridge.addProto(AJBridge, 'activate');

	S.app(AJBridge);	
    S.AJBridge = AJBridge;
	
});

/**
 * NOTES:
 * 2010/07/22        完成基本代码
 * 2010/08/08        由于KISSY.Flash重构，因此AJBridge也进行了改动。
 * 2010/08/09        AJBridge的 AS3 新增了 静态的动态激活。因此 内部增加了activete()的方法。
 * 2010/08/10        向 sandbox 提交了代码
 * 2010/08/11        将 eventHandler(event) 转为  eventHandler(id,event).  版本号 1.0.10
 *
 */
