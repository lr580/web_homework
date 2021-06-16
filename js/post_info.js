"use strict";
//存储帖子信息和其他常量的js
const sc_type = {
    sc_all: '',
    sc_alg: '算法',
    sc_lan: '编程语言',
    sc_dev: '开发工具',
    sc_res: '资源分享',
    sc_oth: '杂项',
};

const posts_abbr = [{
        title: '拓展欧拉定理：从快速幂到疾速幂',
        abbr: '对于a的b次幂关于素数p取模下的结果，如果使用一般的快速幂需要log(b)对数复杂度求解，然而，根据数论里的拓展欧拉原理，可以把复杂度降至b%φ(p)+φ(p)的对数，这对于b特别大时是特别有优化意义的……',
        date: '2021/06/15 22:18',
        tag: '数论，快速幂，欧拉定理',
        type: 'sc_alg',
        id: 0,
    },
    {
        title: 'C语言输入流浅析',
        abbr: '对于a的b次幂关于素数p取模下的结果，如果使用一般的快速幂需要log(b)对数复杂度求解，然而，根据数论里的拓展欧拉原理，可以把复杂度降至b%φ(p)+φ(p)的对数，这对于b特别大时是特别有优化意义的……',
        date: '2021/06/15 22:18',
        tag: 'C/C++，输入流',
        type: 'sc_lan',
        id: 1,
    },
    {
        title: '调试2',
        abbr: '对于a的b次幂关于素数p取模下的结果，如果使用一般的快速幂需要log(b)对数复杂度求解，然而，根据数论里的拓展欧拉原理，可以把复杂度降至b%φ(p)+φ(p)的对数，这对于b特别大时是特别有优化意义的……',
        date: '2021/06/15 22:18',
        tag: '数论，快速幂，欧拉定理',
        type: 'sc_alg',
        id: 2,
    },
    {
        title: '调试3',
        abbr: '对于a的b次幂关于素数p取模下的结果，如果使用一般的快速幂需要log(b)对数复杂度求解，然而，根据数论里的拓展欧拉原理，可以把复杂度降至b%φ(p)+φ(p)的对数，这对于b特别大时是特别有优化意义的……',
        date: '2021/06/15 22:18',
        tag: '数论，快速幂，欧拉定理',
        type: 'sc_alg',
        id: 3,
    },
    {
        title: '调试4',
        abbr: '对于a的b次幂关于素数p取模下的结果，如果使用一般的快速幂需要log(b)对数复杂度求解，然而，根据数论里的拓展欧拉原理，可以把复杂度降至b%φ(p)+φ(p)的对数，这对于b特别大时是特别有优化意义的……',
        date: '2021/06/15 22:18',
        tag: '数论，快速幂，欧拉定理',
        type: 'sc_alg',
        id: 4,
    },
    {
        title: '调试5',
        abbr: '对于a的b次幂关于素数p取模下的结果，如果使用一般的快速幂需要log(b)对数复杂度求解，然而，根据数论里的拓展欧拉原理，可以把复杂度降至b%φ(p)+φ(p)的对数，这对于b特别大时是特别有优化意义的……',
        date: '2021/06/15 22:18',
        tag: '数论，快速幂，欧拉定理',
        type: 'sc_alg',
        id: 5,
    },
    {
        title: '调试6',
        abbr: '对于a的b次幂关于素数p取模下的结果，如果使用一般的快速幂需要log(b)对数复杂度求解，然而，根据数论里的拓展欧拉原理，可以把复杂度降至b%φ(p)+φ(p)的对数，这对于b特别大时是特别有优化意义的……',
        date: '2021/06/15 22:18',
        tag: '数论，快速幂，欧拉定理',
        type: 'sc_alg',
        id: 6,
    },
];

const posts_code = [
    "int qpower(int a, int b)\r\n{\r\n    int r = 1;\r\n    while (b)\r\n    {\r\n        if (b & 1)\r\n            r *= a;\r\n        b >>= 1;\r\n        a *= a;\r\n    }\r\n    return r;\r\n}", //0

    "ll t = phi = m; //typedef ll int/long long\r\nfor (ll i = 2; i * i <= m; ++i)\r\n    if (t % i == 0)\r\n    {\r\n        phi = phi - phi / i;\r\n        while (t % i == 0)\r\n            t /= i;\r\n    }\r\nif (t > 1)\r\n    phi = phi - phi / t; //phi为所求", //1

    "#include <bits/stdc++.h>\r\nusing namespace std;\r\ntypedef int ll;\r\nll a, b, m, t, phi, ans = 1;\r\nchar c;\r\nbool flag;\r\nsigned main()\r\n{\r\n    scanf(\"%d%d\", &a, &m);\r\n    t = phi = m;\r\n    //欧拉函数模板\r\n    for (ll i = 2; i * i <= m; ++i)\r\n        if (t % i == 0)\r\n        {\r\n            phi = phi - phi / i;\r\n            while (t % i == 0)\r\n                t /= i;\r\n        }\r\n    if (t > 1)\r\n        phi = phi - phi / t;\r\n    //快读模板，读入高精度整数并实时取模，取模满足分配律\r\n    while (!isdigit(c = getchar()));\r\n    for (; isdigit(c); c = getchar()) \r\n    {\r\n        b = (b << 1) + (b << 3) + (c ^ '0');\r\n        if (b >= phi)\r\n            flag = true, b %= phi;\r\n    }\r\n    if (flag)\r\n        b += phi;//取模负数特判\r\n    //快速幂模板\r\n    for (ans = 1; b; b >>= 1, a = 1LL * a * a % m)\r\n        if (b & 1)\r\n            ans = 1LL * ans * a % m;\r\n    printf(\"%d\", ans);\r\n    return 0;\r\n}", //2

    "#include <stdio.h>\r\nint main()\r\n{\r\n    char x[1024], y[1024];\r\n    scanf(\"%s%s\", x, y);\r\n    printf(\"[%s][%s]\", x, y);\r\n    return 0;\r\n}", //3

    "int scanf(参数)\r\n{\r\n    获取输入流开始;\r\n    while (1)\r\n    {\r\n        if (输入流队空)\r\n            激活输入流;\r\n        取输入流队首进行对应操作，输入流队首离队;\r\n        if (对应操作完毕)\r\n            break;\r\n    }\r\n    获取输入流结束;\r\n    return 相应值;\r\n}", //4

    "int scanf(char x[], char *y) //x是\"%c\",y是一个char变量的&形式\r\n{\r\n    获取输入流开始;\r\n    if (输入流队空)\r\n        激活输入流;\r\n    取输入流队首赋值给y，输入流队首离队;\r\n    获取输入流结束;\r\n    return 相应值;\r\n}", //5

    "int scanf(char x[], int *y) //x是\"%c\",y是一个int变量的&形式\r\n{\r\n    获取输入流开始;\r\n    while (1)\r\n    {\r\n        if (输入流队空)\r\n            激活输入流;\r\n        取输入流队首h;\r\n        if (正在预处理)\r\n        {\r\n            if (isspace(h))\r\n                h离队, 且continue;\r\n            else if (isdight(h))\r\n                预处理结束;\r\n            else\r\n                break;\r\n        }\r\n        if ((h == '+' || h == '-'))\r\n        {\r\n            if (从获取输入流开始未曾读取过 + 或 -)\r\n                h离队，确定正负号，且continue;\r\n            else\r\n                break;\r\n        }\r\n        if (isdigit(h))\r\n            h离队，存储值;\r\n        else\r\n            break;\r\n    }\r\n\r\n    获取输入流结束;\r\n    return 相应值;\r\n}", //6

    "int scanf(char x[], double *y)\r\n{\r\n    获取输入流开始;\r\n    while (1)\r\n    {\r\n        if (输入流队空)\r\n            激活输入流;\r\n        取输入流队首h;\r\n\r\n        //底数部分\r\n        进行与scanf(\"%d\") 一样的预处理和正负号处理;\r\n        if (h == '.')\r\n        {\r\n            if (获取输入流开始未曾出现过 '.')\r\n                h离队，确定小数点，且continue;\r\n            else\r\n                break;\r\n        }\r\n        if (isdigit(h))\r\n            h离队，存储值;\r\n\r\n        //指数部分\r\n        else if ((h == 'e' || h == 'E') && 未曾出现过 'e', 'E')\r\n        {\r\n            int k;\r\n            scanf(\"%d\", &k); //这部分与scanf读一个整数一样\r\n            k的内容作为指数，对底数求幂;\r\n        }\r\n        else\r\n            break;\r\n    }\r\n\r\n    获取输入流结束;\r\n    return 相应值;\r\n}", //7

    "int scanf(char x[], char *y)\r\n{\r\n    获取输入流开始;\r\n    while (1)\r\n    {\r\n        if (输入流队空)\r\n            激活输入流;\r\n        取输入流队首h;\r\n        if (isspace(h))\r\n        {\r\n            if (正在预处理)\r\n                h离队且continue;\r\n            else\r\n                break;\r\n        }\r\n        else\r\n            预处理结束，h离队，赋值;\r\n    }\r\n    获取输入流结束;\r\n    return 相应值;\r\n}", //8

    "int scanf(char x)\r\n{\r\n    获取输入流开始;\r\n    if (输入流队空)\r\n        激活输入流;\r\n    取输入流队首h;\r\n    if(h==x)\r\n        h出队;\r\n    获取输入流结束;\r\n    return 相应值;\r\n}", //9

    "int scanf(若干参数)\r\n{\r\n    获取输入流开始;\r\n    while (还有下一个参数)\r\n    {\r\n        scanf(当前参数);\r\n        if (当前参数结束了获取输入流)\r\n            break;\r\n        当前参数 = 下一个参数;\r\n    }\r\n    获取输入流结束;\r\n    return 相应值;\r\n}", //10

    "#include <stdio.h>\r\nint main()\r\n{\r\n    int i1 = 0, i2 = 0, i3 = 0, i4 = 0;\r\n    double f1 = 0.0, f2 = 0.0, f3 = 0.0;\r\n    char c1 = '_', c2 = '_', c3 = '_', c4 = '_', c5 = '_';\r\n    char s[20];\r\n    scanf(\"%d\", &i1);\r\n    scanf(\"%c\", &c1);\r\n    scanf(\"%lf\", &f1);\r\n    scanf(\"%lf\", &f2);\r\n    scanf(\"%lf\", &f3);\r\n    scanf(\"g\");\r\n    scanf(\"%c\", &c2);\r\n    scanf(\"%s\", s);\r\n    scanf(\"%d%c\", &i3, &c3);\r\n    scanf(\"%d%c\", &i4, &c4);\r\n    scanf(\"%c\", &c5);\r\n    printf(\"i1:%d\\nc1:%c\\nf1:%lf\\nf2:%lf\\n\\n\", i1, c1, f1, f2);\r\n    printf(\"f3:%lf\\nc2:%c\\ns:%s\\n\\n\", f3, c2, s);\r\n    printf(\"i3:%d\\nc3:%c\\ni4:%d\\nc4:%c\\nc5:%c\", i3, c3, i4, c4, c5);\r\n    return 0;\r\n}\r\n", //11

    "+-5.3e-1.2\r\n\r\n\r\n   5.gc  lr580  53c d56 e", //12

    "i1:0\r\nc1:-\r\nf1:0.530000\r\nf2:0.200000\r\n\r\nf3:5.000000\r\nc2:c\r\ns:lr580\r\n\r\ni3:53\r\nc3:c\r\ni4:0\r\nc4:_\r\nc5:d", //13

    "char getchar()\r\n{\r\n    char x;\r\n    scanf(\"%c\",&x);\r\n    return x;\r\n}", //14

    "void gets(char x[])\r\n{\r\n    char c;\r\n    int len = 0;\r\n    for (; '\\n' != (c = getchar()); len++)\r\n        x[len] = c;\r\n    x[len] = '\\0';\r\n}", //15
];

// export {posts_abbr};