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

function get_and_fix_number_float(id, def = 0) {
    let obj = $('#' + id);
    let val = obj.val();
    if (!val) {
        obj.val('' + def);
        val = def;
    }
    val = Math.max(parseFloat(obj.attr('min')),
        Math.min(parseFloat(obj.attr('max')), Math.abs(parseFloat(val)))
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

function get_number_float(id) {
    return parseFloat($('#' + id).val());
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

//删除数组下标为i的元素
function erase(arr, i) {
    arr.splice(i, 1);
}

//二分查找，返回非降序数组arr中首个大于等于v的元素所在的下标(如果比首个元素小，也返回下标0)
function lower_bound(arr, v) {
    let lf = 0;
    let rf = arr.length - 1;
    let cf;
    let res = arr.length;
    while (lf <= rf) {
        cf = Math.floor((lf + rf) / 2);
        // console.log(cf, arr[cf], arr[cf] <= v);
        if (arr[cf] < v) {
            lf = cf + 1;
        } else {
            res = cf;
            rf = cf - 1;
        }
    }
    return res;
}

//二分查找，返回非降序数组arr中首个大于等于v的元素所在的下标
function upper_bound(arr, v) {
    let lf = 0;
    let rf = arr.length - 1;
    let cf;
    let res = arr.length;
    while (lf <= rf) {
        cf = Math.floor((lf + rf) / 2);
        // console.log(cf, arr[cf], arr[cf] <= v);
        if (arr[cf] <= v) {
            lf = cf + 1;
        } else {
            res = cf;
            rf = cf - 1;
        }
    }
    return res;
}

//用对数时间复杂度加权随机抽取一个数组(需要预处理前缀和，否则复杂度是线性的)
function choice_w(arr, wpref, wtotal, return_index = true) {
    let v = randrange(0, wtotal - 1e-5);

    let vi = lower_bound(wpref, v) - 1; //前缀和特性，下标减一
    // console.log(v, wpref, vi);
    return (return_index) ? vi : arr[vi];
}

//用字典树大致模拟哈希表和优先级队列等内容，尽量实现对数或常数级时间复杂度的查询
// function trie(tid){
//     this.id = 
//     this.next = {};
// }

//字符串哈希函数
function hash(str) {
    str = '' + str; //要求v是字符串
    let h = 0;
    for (let i = str.length - 1; i >= 0; --i) {
        h ^= ((h << 5) + str.charCodeAt(i) + (h >> 2));
    }
    return (h & 0x7fffffff);
}

//手写哈希表(对应C++的unordered_map) 未使用开放寻址法等避免冲突的办法 以后改进
function unordered_map() {
    this.map = [];
    this.ori = [];
    this.find = function(v) {
        let h = hash(v);
        return this.map[h]; //可能是undefined
    }
    this.insert = function(i, v) {
        let h = hash(i);
        this.map[h] = v;
        this.ori[h] = i;
    }
    this.add = function(i, v) {
        let h = hash(i);
        this.map[h] += v;
    }
    this.fix = function(i, v) { //insert与add的结合体
        let h = hash(i);
        if (!this.map[h]) {
            this.map[h] = 0;
            this.ori[h] = i;
        }
        this.map[h] += v;
    }
    this.to_array = function() {
        let res = []
        for (let i in this.map) { //看样子js数组内置了哈希……
            // console.log(this.map[i], this.ori[i]);
            res.push([this.ori[i], this.map[i]]);
        }
        return res;
    }
}

// //快速排序，降低时间复杂度 看样子不需要，突然发现浏览器内置的排序本身不是平方复杂度的
// function quicksort(arr, st, lst) {
//     if (st >= lst) {
//         return;
//     }
// }

//这个是降序排列pair<string, number>
function sort_pair() {
    return function(a, b) {
        return b[1] - a[1];
    }
}

//这个是升序
function sort_num() {
    return function(a, b) {
        return a - b;
    }
}

//检测浏览器排序的时间复杂度
// let k = [];
// for (let i = 0; i < 1000000; ++i) {
//     k.push(randint(1, 580000000));
// }
// k.sort(sort_num());

//将id为text的textarea或input(text/number)的内容复制到剪贴板，并更新id为button的按钮
function clip(button, text) {
    let objtext = document.getElementById(text);
    objtext.select();
    document.execCommand('Copy');
    objtext.blur();
    let objbut = $('#' + button);
    objbut.val('复制文本成功');
    setTimeout(() => {
        objbut.val('复制到剪贴板');
    }, 1500);
}

//将_txt字符串保存到本地，需要用到一个id为createInvote的html标签，其download属性为文件名
function save(_txt) {
    let isIE = (navigator.userAgent.indexOf('MSIE') >= 0);
    if (isIE) {
        let strHTML = _txt;
        let winSave = window.open();
        winSave.document.open("text", "utf-8");
        winSave.document.write(strHTML);
        winSave.document.execCommand("SaveAs", true, "code.txt");
        winSave.close();
    } else {
        let elHtml = _txt;
        let mimeType = 'text/plain';
        $('#createInvote').attr('href', 'data:' + mimeType + ';charset=utf-8,' + encodeURIComponent(elHtml));
        document.getElementById('createInvote').click();
    }
}

//bid是帮助按钮id，默认名字是收起帮助
function help_click(bid = "help") {
    let obj = $('#' + bid);
    if (obj.val() == '收起帮助') {
        obj.val('展开帮助');
        $('.tool_help').slideUp(500);
    } else {
        obj.val('收起帮助');
        $('.tool_help').slideDown(500);
    }
    setTimeout(() => {
        set_footer_position();
    }, 501);
}

function len(x) {
    if (!x) {
        return 0;
    }
    if (!x.length) {
        return 0;
    }
    return x.length;
}

//使用了之后就不能参与DOM了
// onmessage = function(msg) {
//     console.log(msg);
//     this.postMessage('gggg');
// };