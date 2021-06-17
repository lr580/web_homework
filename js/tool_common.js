"use strict";
//主要是作为一个模板头文件一样的存在提供给各tools使用的中间函数
$(() => {
    tool_id = parseInt(location.href.match(/tool(\d*)/i)[1]);

    // console.log(tool_id);
    detect_css();
    $(window).scroll(modify_css).resize(modify_css);
    modify_css();
});
var tool_id = -1;

//取input type的值，修正值，更新显示并返回 (修正默认值为1)
function get_and_fix_number(id, def = 1) {
    let obj = $('#' + id);
    let val = obj.val();
    if (!val) {
        obj.val('' + def);
        val = def;
    }
    val = Math.max(parseInt(obj.attr('min')),
        Math.min(parseInt(obj.attr('max')), Math.abs(parseInt(val)))
    );
    obj.val(val);
    return val;
}

//更新input type的最大值并产生作用
function down_fix_number(id, max) {
    let obj = $('#' + id);
    obj.attr('max', max);
    get_and_fix_number(id);
}

//更新input type的最小值并产生作用,prot为true时，新的最小值不能小于原有最小值,prot未实体化
function up_fix_number(id, min, prot = false) {
    let obj = $('#' + id);
    // if (prot) {
    //     let ori = parseInt(obj.attr('min'));
    //     obj.attr(Math.min(ori, min));
    // } else {
    //     obj.attr('min', min);
    // }
    obj.attr('min', min);
    get_and_fix_number(id);
}

function get_number(id) {
    return parseInt($('#' + id).val());
}

var full_height_board_1 = 0;

function detect_css() {
    let obj_board_1 = $('.res_board_1');
    if (obj_board_1) {
        full_height_board_1 = parseInt(obj_board_1.css('left')) + parseInt(obj_board_1.css('width')) + 20;
    }

}

function modify_css() {
    //本来打算让CSS自己智能调节的，但是效果不尽人意，所以被迫手写
    let obj_board_1 = $('.res_board_1');
    if (obj_board_1) {
        let window_height = document.documentElement.clientWidth;
        // console.log(full_height_board_1);
        if (full_height_board_1 > window_height) {
            obj_board_1.attr('half', 'half');
        } else {
            obj_board_1.removeAttr('half');
        }
        set_footer_position();
        // console.log(now_height);
    }
}

//由于有不止一个工具需要使用到随机数，所以直接在tool_common提供随机数中间函数
//从数组里随机选择一个元素，返回下标或值(return_index为true或false)
function choice(arr, return_index = true) {
    let id = Math.floor(arr.length * Math.random());
    return (return_index) ? id : arr[id];
}

//从arr数组里随机选择一个不在spe数组的元素
function choice_except(arr, spe, return_index = true) {
    if (arr.length <= spe.length) {
        throw "" + spe + "长度不小于" + arr;
    }
    while (true) {
        let id = choice(arr, true);
        if (spe.indexOf(arr[id]) == -1) {
            return (return_index) ? id : arr[id];
        }
    }
}

//返回区间[a,b]的随机数
function randrange(a, b) {
    return Math.random() * (b - a) + a;
}

//返回区间[a,b]的随机整数
function randint(a, b) {
    return Math.floor(randrange(a, b + 1));
}

//随机打乱一个数组
function shuffle(arr) {
    for (let i = 0; i < arr.length; ++i) {
        let x = randint(0, arr.length - 1);
        let y = randint(0, arr.length - 1);
        let t = arr[x];
        arr[x] = arr[y];
        arr[y] = t;
    }
    return arr;
}

//复制到剪贴板
// function clip(obj) {

// }