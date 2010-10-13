/**
 * @author kingfo  oicuicu@gmail.com
 */
AJBridge.add("uploader", function(A){
	
	var S = KISSY,
		F = S.Flash,
		UA = S.UA,
		DEFAULT_CONFIG_KEY = [
			"ds",
			"dsp",
			"dsr",
			"btn",
			"hand"
		];

	/**
	 * 本地存储类
	 * @param {String} id									需要注册的SWF应用ID。 
	 * @param {Object} config								配置项
	 * @param {String} config.ds							default server 的缩写。
	 * @param {String} config.dsp							default server parameters 的缩写。
	 * @param {Boolean} config.dsr							default server response 的缩写。
	 * @param {Boolean} config.btn							启用按钮模式，默认 false。
	 * @param {Boolean} config.hand							显示手型，默认 false。
	 */
	function Uploader(id, config){
		var flashvars = { },
			params,
			k,i,n = DEFAULT_CONFIG_KEY.length;
			
		config = config || {};
		params = config.params || {};

		for ( i=0;i < n;i++){
			k = DEFAULT_CONFIG_KEY[i];
			if(k in config)flashvars[k] = config[k];
		}
		
		config.params.flashvars = S.merge(config.params.flashvars, flashvars);

		Uploader.superclass.constructor.call(this, id,config);
	}
	
	S.extend(Uploader, A);

	A.augment(Uploader,
		[
			"setFileFilters",
			"filter",
			"setAllowMultipleFiles",
			"multifile",
			"browse",
			"upload",
			"uploadAll",
			"cancel",
			"getFile",
			"removeFile",
			"lock",
			"unlock",
			"setBtnMode",
			"useHand",
			"clear"
		]
	);
	
	Uploader.version = "1.0.0";
	A.Uploader = Uploader;
});


