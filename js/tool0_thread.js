"use strict";
onmessage = function(msg) {
    _res = '';
    let thee = this;
    try {
        // console.log(msg.data);
        eval(msg.data); //msg暴死，必须要msg.data
        // console.log(_res);
        thee.postMessage(_res);
    } catch (err) {
        thee.postMessage('执行出错：' + err);
    }
}

var _res = '';

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

function _lcm(a, b) {
    return parseInt(a * b / _gcd(a, b));
}

function lcm() { //假设传入的都是整数
    if (arguments.length == 1) {
        return parseInt(arguments[0]);
    } else if (arguments.length > 1) {
        let g = _lcm(parseInt(arguments[0]), parseInt(arguments[1]));
        for (let i = 2; i < arguments.length; ++i) {
            g = _lcm(g, parseInt(arguments[i]));
        }
        return g;
    } else { //error分支
        return 1;
    }
}

function fact(n) {
    if (n <= 1) {
        return 1;
    }
    let v = 1;
    for (let i = 2; i <= n; ++i) {
        v *= i;
    }
    return v;
}

function fib(n) {
    if (n <= 2) {
        return 1;
    }
    let dp = [0, 1, 1];
    for (let i = 3; i <= n; ++i) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}

function A(uf, df) {
    if (uf > df || uf < 0 || df < 0) {
        return 0;
    }
    let r = 1;
    for (let i = df - uf + 1; i <= df; ++i) {
        r *= i;
    }
    return r;
}

function C(uf, df) { //让计算过程尽可能小，从而尽可能不爆int范围
    if (uf > df || uf < 0 || df < 0) {
        return 0;
    }
    let r = 1;
    uf = Math.min(uf, df - uf); //组合数定律，用于化简
    // if (df - uf < uf) {
    //     return C(df - uf, df);
    // }
    for (let h = 0, i = df, j = 1; h < uf; ++h, --i, ++j) {
        r = r * i / j;
    }
    return Math.round(r); //写成j暴死
}

function isprime(n) {
    if (n == 2 || n == 3) {
        return true;
    }
    if (n < 2 || (n % 6 != 1 && n % 6 != 5)) {
        return false;
    }
    for (let i = 5; i * i <= n; i += 6) {
        if (n % i == 0 || n % (i + 2) == 0) {
            return false;
        }
    }
    return true;
}

function primes(n) {
    var vis = [];
    var p = [];
    var k = 0;
    for (let i = 2; i <= n; ++i) {
        if (!vis[i]) {
            p[k++] = i;
        }
        for (let j = 0; j < k; ++j) {
            if (p[j] * i > n) {
                break;
            }
            vis[p[j] * i] = true;
            if (i % p[j] == 0) {
                break;
            }
        }
    }
    return p;
}

function catalan(n) {
    if (n <= 1) {
        return 1;
    }
    let dp = [1];
    for (let i = 1; i <= n; ++i) {
        let k = 0;
        for (let j = 0; j < i; ++j) {
            k += dp[j] * dp[i - j - 1];
        }
        dp[i] = k;
    }
    return dp[n];
}

function qpow(a, b, p) {
    let r = 1;
    for (; b; b >>= 1, a = a * a % p) {
        if (b & 1) {
            r = r * a % p;
        }
    }
    return r;
}

function inv(a, p) {
    var x, y;

    function exgcd(a, b) {
        if (!b) {
            x = 1;
            y = 0;
        } else {
            exgcd(b, a % b); //js没有传引用……只能这样搞，不然这里压根不用交换变量
            let t = x;
            x = y;
            y = t - parseInt(a / b) * y;
        }
    }
    exgcd(a, p);
    return (x % p + p) % p;
}

//质因数分解……后续版本更新
// function factor(n) {

// }

//欧拉函数……后续版本更新
// function euler(n) {

// }

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

// //清屏并输出所有累积的print
// function _show() {
//     $('#cal_res').val(_res);
//     _res = '';
// }

// //取输入框的全部str并转json
// function _json() {
//     let k = $('#cal_input').val();
//     return JSON.stringify(k);
// }