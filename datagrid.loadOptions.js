/**
 * on 2017/8/10 0010.
 * ty_bt@live.cn
 */
(function(){

    var createLoadOptions = function(gridType){
        return function($ele, options){
            var curOptions = $ele[gridType]("options");
            var backupObj = $.extend({}, curOptions, options);
            if(curOptions.url){
                $(['onBeforeLoad', 'onLoadSuccess', 'loadFilter']).each(function(){
                    var attrName = this;
                    var tempFun = curOptions[attrName] = function(){
                        // 还原事件
                        curOptions[attrName] = backupObj[attrName];
                        // 停止加载
                        if(attrName == "onBeforeLoad"){
                            return false;
                        }
                        // 使用默认方法返回值
                        return $.fn[gridType].defaults[attrName].apply(this, arguments);
                    };
                });
            }
            $ele[gridType](options);
            return $ele[gridType]("loadData", $ele[gridType]('getData'));
        }
    };

    $.extend($.fn.datagrid.methods, {
        loadOptions: createLoadOptions("datagrid")
    });
    $.extend($.fn.treegrid.methods, {
        loadOptions: createLoadOptions("treegrid")
    });
})();
