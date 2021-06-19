"use strict";
$(() => {
    //因为执行脚本的代码时间复杂度非常不稳定(用户跑什么脚本就是什么复杂度)，所以建议跑多线程……
    // console.log('qwq');
    // let w = new Worker('/js/tool_common.js');
    // w.postMessage('test');
    // w.onmessage = (e) => {
    //     console.log(e);
    // }
    load_memory(); //记忆上次输入的脚本代码
    append_func_list();
    set_footer_position();
});

function select_regex(nr) {
    let oval = $('#cal_input').val();
    if (oval) {
        if (oval[oval.length - 1] != ';') {
            oval += ';';
        }
        oval += '\n';
    }
    $('#cal_input').val(oval + nr);
}

function append_func_item(nr, dsc, eg) {
    let obj = $('#calfx_item');
    let obj_tr = $('<tr class="cp"></tr>');
    obj.append(obj_tr);
    obj_tr.bind('click', () => { select_regex(eg); });

    let obj_regex = $("<td></td>");
    obj_regex.html(nr);
    obj_tr.append(obj_regex);

    let obj_dsc = $('<td></td>');
    obj_dsc.html(dsc);
    obj_tr.append(obj_dsc);
}

function append_func_list() {
    for (let i = 0; i < func_item.length; ++i) {
        append_func_item(func_item[i][0], func_item[i][1], func_item[i][2]);
    }
}

function load_memory() {
    try {
        let ls = localStorage;
        if (!ls.length) {
            return;
        }
        let memo = ls.getItem(ls.key(0)); //目前来说，整个网页只有这里需要存储
        memo = JSON.parse(memo);
        // console.log(memo);
        $('#cal_input').val(memo.v);
    } catch (err) { //非live可能会炸一次初始化
        // console.log(err);
    }
}

function save_memory() {
    let ls = localStorage;
    let memo = $('#cal_input').val();
    // ls.clear();
    ls.setItem(0, JSON.stringify({ v: memo }));
}

function locationorigin() {
    return location.href.substr(0, Math.max(0, location.href.lastIndexOf('/')));
}

const ban_webworker = true; //修锅 chorme (非live或未设置过下)不支持 webworker

function _cal() { //live可以……非live又出锅了
    $('#cal_res').val('计算中，请稍等……');

    if (ban_webworker) {
        let code = $('#cal_input').val();
        try {
            eval(code);
            _show();
        } catch (err) {
            _res = '脚本出错：' + err;
            _show();
        }
    } else {
        let dir = locationorigin() + '/js/tool0_thread.js' //非live炸掉一锅
        let w = new Worker(dir); //chorme不能开web worker???
        w.postMessage($('#cal_input').val());
        w.onmessage = (e) => {
            // console.log(e.data);
            $('#cal_res').val(e.data);
        }
    }
    //p.s. 实践表明：web worker 并不是严格意义的多线程，跑着的时候还是会卡的，只不过不会卡死而已


    // return;
    // let code = $('#cal_input').val();
    // eval(code);
    // _show();
}

var _res = '';

//清屏并输出所有累积的print，调试用
function _show() {
    $('#cal_res').val(_res);
    _res = '';
}

//取输入框的全部str并转json，调试用
function _json() {
    let k = $('#cal_input').val();
    return k; //JSON.stringify(k);
}

const func_item = [
    ['print', '传入若干个参数，在处理结果下方新建一行并在该行中显示这些参数(以空格隔开)。这些参数可以是任何可类型转化为字符串的常量或变量。无返回值。', "print(99.9*2);\nvar x=-1;\nfor(var i=1;i<=5;i++)\n    x+=i;\nprint('x:',x);"],
    ['gcd', '传入一个或以上整数参数，返回一个整数代表它们的公共最大公因数。', "var x=gcd(12,18);\nprint('x: ',x);\nprint(gcd(9,27,3,15,9));"],
    ['lcm', '传入一个或以上整数参数，返回一个整数代表它们的公共最小公倍数。', "var x=lcm(2,3,5,7);\\nprint(x);\\nprint(lcm(6,8));"],
    ['fact', '传入一个自然数n，返回n的阶乘。', "print(fact(5));"],
    ['fib', '传入一个自然数n，返回斐波那契数列的第n项。', "for(var i=1;i<=9;++i)\n    print(fib(i));"],
    ['A', '传入两个自然数a,b(a>b)，返回从b个元素中选择a个元素的排列数。', "for(var i=0;i<=5;++i)\n{\n    var t=[];\n    for(var j=0;j<=i;++j)\n        t.push(A(j,i));\n    print(t);\n}"],
    ['C', '传入两个自然数a,b(a>b)，返回从b个元素中选择a个元素的组合数。', "for(var i=0;i<=5;++i)\n{\n    var t=[];\n    for(var j=0;j<=i;++j)\n        t.push(C(j,i));\n    print(t);\n}"],
    ['isprime', '传入一个正整数n(n>1)，返回一个布尔值代表n是否是素数。', "var x=[2,4,6,7,10,19];\nfor(let i=0;i<6;++i)\n    print(x[i],isprime(x[i])?'是素数':'是合数');", ['primes', '传入一个正整数n，返回区间[1,n]内的所有素数的数组。', "print(primes(100));"]],
    ['catalan', '传入一个自然数n，返回第n个卡特兰数。', "for(var i=0;i<=6;++i)\n    print(catalan(i));"],
    ['qpow', '传入整数a,自然数b和正整数p，返回a的b次放对p取模的结果', "print(qpow(2,10,10000));\nprint(qpow(3,12345678,1000000007));"],
    ['inv', '传入整数n和p，返回n模p的逆元。', "print(inv(3,7));\nprint(inv(2,1000000007));"],
];

//这里仅提供了一部分函数供调试用，更多的全部函数在tool0_thread.js上
function print() {
    let r = '';
    if (arguments.length) {
        r += arguments[0];
    }
    for (let i = 1; i < arguments.length; ++i) {
        r += ' ' + arguments[i];
    }
    _res += r + '\n';
}

function _gcd(a, b) {
    return (b > 0) ? gcd(b, a % b) : a;
}

function gcd() { //假设传入的都是整数
    // _raise('gcd', arguments, '我说出错就是出错');
    if (arguments.length == 1) {
        return parseInt(arguments[0]);
    } else if (arguments.length > 1) {
        let g = _gcd(parseInt(arguments[0]), parseInt(arguments[1]));
        for (let i = 2; i < arguments.length; ++i) {
            g = _gcd(g, parseInt(arguments[i]));
        }
        return g;
    } else { //error分支
        return 1;
    }
}

//函数主动提示报错
function _raise(fname, fpara, reason) {
    let spara = '';
    if (fpara.length) {
        spara += fpara[0];
    }
    for (let i = 1; i < fpara.length; ++i) {
        spara += ', ' + fpara[i];
    }
    print('[error]执行函数' + fname + '(' + spara + ')出错：' + reason);
    // _show();
}

function _raise(a, b, c) { //调试函数重名的结果
    console.log(a, b, c);
}