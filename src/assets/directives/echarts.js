import Vue from 'vue';
import echarts from 'echarts';

export default {
    bind: (el, binding) => {
        Vue.nextTick(() => {
            el.echartsInstance = echarts.init(el);

            el.resizeEventHandler = function () {
                el.echartsInstance.resize();
            };

            if ( window.attachEvent ) {
                window.attachEvent('onresize', el.resizeEventHandler);
            } else {
                window.addEventListener('resize', el.resizeEventHandler, false);
            }
        });
    },
    update: (el, binding) => {
        Vue.nextTick(() => {
            el.echartsInstance.setOption(binding.value);
        });
    },
    unbind: (el) => {
        el.echartsInstance.dispose();

        if ( window.attachEvent ) {
            window.detachEvent('onresize', _this.resizeEventHandler);
        } else {
            window.removeEventListener('resize', _this.resizeEventHandler, false);;
        }
    }
}
