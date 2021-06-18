"use strict";
//存储帖子部分信息(概述信息和代码)和其他常量的js
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
        abbr: '针对大多数C语言初学者对C语言输入的原理了解不深，本帖子以C语言的scanf,getchar和gets三个函数为例，具体分析了C语言标准输入流的工作机制……',
        date: '2021/06/16 21:29',
        tag: 'C/C++，输入流',
        type: 'sc_lan',
        id: 1,
    },
    {
        title: 'Python高阶函数浅析',
        abbr: '同其他高级程序语言一样，Python也可以使用函数作为函数参数，这样的函数称为高阶函数。高阶函数在实践中非常有用，用得好的话，可以很好地优化代码结构、降低代码量，让代码更易于维护。本篇帖子将简要介绍Python高阶函数及常用的标准高阶函数……',
        date: '2021/06/18 19:04',
        tag: 'Python，函数',
        type: 'sc_lan',
        id: 2,
    },
    {
        title: 'git指令小结',
        abbr: 'git是十分强大的版本管理工具，其指令较为庞多，容易混淆和错乱。因此，本帖给出了常用指令的分类汇总，可以在遗忘指令时快速查阅本帖，以找到自己想要使用的相应git指令……',
        date: '2021/06/18 20:53',
        tag: 'git',
        type: 'sc_dev',
        id: 3,
    },
    {
        title: '线段树、树状数组和块状数组小结',
        abbr: '对于需要以较优的时间空间复杂度快速修改或查询一个区间内的每个信息时，较为常用的选择是使用线段树、树状数组和块状数组。它们各有各的优缺点，使用场景也有所差异。这篇帖子简单总结一下这三者的简单异同……',
        date: '2021/06/18 21:41',
        tag: '数据结构，线段树/树状数组，分块',
        type: 'sc_alg',
        id: 4,
    },
    {
        title: '记解决Ubuntu系统上的小问题几则',
        abbr: '这是一篇Linux使用相关的记录，主要是笔者在使用Ubuntu 20.10时遇到的若干小问题以及笔者自己找到的解决方案的记录……',
        date: '2021/06/18 22:40',
        tag: 'Linux，Ubuntu，使用',
        type: 'sc_dev',
        id: 5,
    },
    {
        title: '编程相关实用网站小推荐',
        abbr: '这是个人经常使用的一些与编程和计算机科学技术相关的干货网站的小汇总推荐……',
        date: '2021/06/18 23:59',
        tag: '网站分享',
        type: 'sc_res',
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

    "print(max(-7,2,4,key=abs)) #输出-7", //16

    "def g1(x):\r\n    return x*x\r\ndef g2(x):\r\n    return x+10\r\ndef f(x,h):\r\n    return h(2*x)+h(x+1)\r\nprint(f(1,g1)) #g1(2)+g1(2)=4+4=8\r\nprint(f(1,g2)) #g2(2)+g2(2)=12+12=24\r\nprint(f(5,g1)) #g1(10)+g1(6)=100+36=136\r\nprint(f(5,g2)) #g2(10)+g2(6)=20+16=36", //17

    "def f(x):\r\n    return x*x\r\ndef g(x):\r\n    return x.upper()*2\r\nprint(list(map(f,[1,-2,2.5])))\r\n#[1, 4, 6.25]\r\nprint(set(map(g,{'hi','yE5'})))\r\n#{'YE5YE5', 'HIHI'}\r\nprint(list(map(g,'world'))) #不可以用str强转\r\n#['WW', 'OO', 'RR', 'LL', 'DD']", //18

    "lambda 参数列表:返回值", //19

    "def f(参数列表):\r\n    return 返回值\r\nf", //20

    "print(list(map(lambda x:x*x,[1,-2,2.5])))\r\nprint(set(map(lambda x:x.upper()*2,{'hi','yE5'})))\r\nprint(list(map(lambda x:x.upper()*2,'world')))", //21

    "k='a'\r\ndef prt(x,h):\r\n    print(x+h())\r\nprt('123',lambda :k*5) #123aaaaa\r\n\r\ndef my_add(a,b,f):\r\n    return f(a,b)+f(b,a)\r\nprint(my_add(-2,3,lambda x,y:x*x+y/x))\r\n#f(-2,3)+f(3,-2)=(4-0.67)+(9-1.5)=10.83", //22

    "from functools import reduce\r\n#map例子里面的第三个例子，现在将其转化为str\r\n#然后使用字符串重载运算符+两两连接\r\nx=list(map(lambda x:x.upper()*2,'world'))\r\n#x=['WW', 'OO', 'RR', 'LL', 'DD']\r\nprint(reduce(lambda x,y:x+y,x)) #现在是str了\r\n\r\nbase=2 #二进制\r\nb=[1,1,0,1] #0b1101\r\nprint(reduce(lambda x,y:x*base+y,b)) \r\n#将01 base进制数组转化为十进制", //23

    "print(list(filter(lambda x:x%2,[1,2,4,0,-5])))\r\n#保留奇数 [1, -5]\r\na=[1,36,35,7,1024,1025]\r\nprint(list(filter(lambda x:abs(x**0.5-int(x**0.5))<1e-5,a)))\r\n#保留平方数 [1, 36, 1024]", //24

    "print(sorted('hello'))\r\n#['e', 'h', 'l', 'l', 'o']\r\nprint(sorted({3,2e2,-1,0,0.5},reverse=True))\r\n#[200.0, 3, 0.5, 0, -1]\r\nprint(sorted((-3,4,-2,1),key=abs))\r\n#[1, -2, -3, 4]\r\nw={1:-2, 5:-4, 6:-3, 100:-9, -3:-10}\r\nprint(sorted(w,key=lambda x:abs(x-5),reverse=True))\r\n#[100, -3, 1, 6, 5] 取keys按照离5的远近排序返回keys", //25

    "#include <bits/stdc++.h>\r\nusing namespace std;\r\ntypedef long long ll;\r\n#define mn 100002\r\n#define mkcf ll cf=lf+rf>>1\r\nll m,n,a[mn],d[mn<<2],b[mn<<2],lc,rc,cmd,k;//b是懒标签\r\nvoid build(ll lf, ll rf, ll rot)\r\n{\r\n    if(lf==rf)\r\n    {\r\n        d[rot]=a[lf];\r\n        return;\r\n    }\r\n    mkcf;\r\n    build(lf,cf,rot<<1);\r\n    build(cf+1,rf,rot<<1|1);\r\n    d[rot]=d[rot<<1]+d[rot<<1|1];\r\n}\r\ninline void push_down(ll& lf, ll& cf, ll& rf, ll& rot)\r\n{\r\n    d[rot<<1]+=b[rot]*(cf-lf+1);\r\n    d[rot<<1|1]+=b[rot]*(rf-cf);\r\n    b[rot<<1]+=b[rot],b[rot<<1|1]+=b[rot],b[rot]=0;\r\n}\r\nvoid add(ll& lc, ll& rc, ll lf, ll rf, ll rot, ll& k)\r\n{\r\n    if(lf>=lc&&rf<=rc)//节点自己更新，懒标签代表左右儿子未更新\r\n    {\r\n        d[rot]+=k*(rf-lf+1);\r\n        b[rot]+=k;//+=是因为可能有多个修改才对应一个查询\r\n        return; //同理所以push_down的变化量不是k\r\n    }\r\n    mkcf;\r\n    if(b[rot]) push_down(lf,cf,rf,rot);\r\n//可以加&&lf!=rf，但基本无影响(且很多其他线段树操作是不允许加的)，\r\n//更甚一步add和query都不需要if(b[rot])判定，这样做代价仅是常数变差\r\n    if(cf>=lc) add(lc,rc,lf,cf,rot<<1,k);\r\n    if(cf<rc) add(lc,rc,cf+1,rf,rot<<1|1,k);\r\n    d[rot]=d[rot<<1]+d[rot<<1|1];\r\n}\r\nll query(ll& lc, ll& rc, ll lf, ll rf, ll rot)\r\n{\r\n    if(lf>=lc&&rf<=rc) return d[rot];\r\n    mkcf;\r\n    ll res=0;\r\n    if(b[rot])  push_down(lf,cf,rf,rot);\r\n    if(cf>=lc) res+=query(lc,rc,lf,cf,rot<<1);//这个+=或=均可\r\n    if(cf<rc) res+=query(lc,rc,cf+1,rf,rot<<1|1);//这个只能+=\r\n    return res;//记得return\r\n}\r\nsigned main()\r\n{\r\n    scanf(\"%lld%lld\",&n,&m);\r\n    for(int i=1;i<=n;++i) scanf(\"%lld\",a+i);\r\n    build(1,n,1);\r\n    while(m--)\r\n    {\r\n        scanf(\"%lld%lld%lld\",&cmd,&lc,&rc);\r\n        if(cmd==1) scanf(\"%lld\",&k),add(lc,rc,1,n,1,k);\r\n        else if(cmd==2) printf(\"%lld\\n\",query(lc,rc,1,n,1));\r\n    }\r\n    return 0;\r\n}\r\n", //26

    "#include <bits/stdc++.h>\r\n#define MAXN 500002\r\nusing namespace std;\r\ntypedef long long ll;\r\nint n,m,c,x;\r\nll a[MAXN],k;\r\ninline int lowbit(int &k){return k & -k;}\r\ninline void addsg(int x, ll &v)\r\n{\r\n    while(x<=n)\r\n    {\r\n        a[x]+=v;\r\n        x+=lowbit(x);\r\n    }\r\n}\r\ninline ll sumo(int x)\r\n{\r\n    ll ans = 0LL;\r\n    while(x!=0)\r\n    {\r\n        ans+=a[x];\r\n        x-=lowbit(x);\r\n    }\r\n    return ans;\r\n}\r\ninline ll sump(int &l, int r) {return sumo(r)-sumo(l-1);}\r\nint main()\r\n{\r\n    scanf(\"%d%d\",&n,&m);\r\n    for(int i=1;i<=n;i++)\r\n    {\r\n        scanf(\"%lld\",&k);\r\n        addsg(i,k);\r\n    }\r\n    while(m--)\r\n    {\r\n        scanf(\"%d%d%lld\",&c,&x,&k);\r\n        if(c==1)\r\n        {\r\n            addsg(x,k);\r\n        }\r\n        else\r\n        {\r\n            printf(\"%lld\\n\", sump(x,k));\r\n        }\r\n    }\r\n    return 0;\r\n}\r\n", //27

    "#include <bits/stdc++.h>\r\nusing namespace std;\r\ntypedef double db;\r\ntypedef long long ll;\r\n#define re register\r\n#define il inline\r\n#define rep(i,a,b) for(re ll i=a;i<b;++i)\r\n#define repe(i,a,b) for(re ll i=a;i<=b;++i)\r\n#define red(i,a,b) for(re ll i=a;i>b;--i)\r\n#define rede(i,a,b) for(re ll i=a;i>=b;--i)\r\nil ll read()\r\n{\r\n\tre char p = 0; re ll r = 0, o = 0;\r\n\tfor (; p < '0' || p>'9'; o |= p == '-', p = getchar());\r\n\tfor (; p >= '0' && p <= '9';\r\n r = (r << 1) + (r << 3) + (p ^ 48), p = getchar());\r\n\treturn o ? (~r) + 1 : r;\r\n}\r\n#define mn 100010\r\n#define ms 320\r\nll n, m, cmd, lf, rf, k, bl[ms], br[ms], be[mn], laz[ms];\r\nll a[mn], ns, bs[ms], bq[ms];\r\nvoid change()\r\n{\r\n    if (be[lf] == be[rf])//零散块\r\n        repe(i, lf, rf) a[i] += k, bs[be[i]] += k;\r\n    else\r\n    {//零散块两个+整块一堆，记得懒标签laz，否则复杂度无任何优化\r\n        repe(i, lf, br[be[lf]]) a[i] += k, bs[be[i]] += k;\r\n        repe(i, bl[be[rf]], rf) a[i] += k, bs[be[i]] += k;\r\n        rep(i, be[lf] + 1, be[rf]) laz[i] += k;\r\n    }\r\n}\r\nll query()\r\n{\r\n    re ll s = 0;\r\n    if (be[lf] == be[rf])\r\n        repe(i, lf, rf) s += a[i] + laz[i];\r\n    else\r\n    {//记得加上懒标签\r\n        repe(i, lf, br[be[lf]]) s += a[i] + laz[be[i]];\r\n        repe(i, bl[be[rf]], rf) s += a[i] + laz[be[i]];\r\n        rep(i, be[lf] + 1, be[rf]) s += bs[i] + laz[i] * bq[i];\r\n    }\r\n    return s;//不返回出bugs\r\n}\r\nsigned main()\r\n{\r\n    n = read(), m = read(), ns = sqrt(n);\r\n    repe(i, 1, n) a[i] = read();\r\n    repe(i, 1, ns)\r\n    {\r\n        bl[i] = n / ns * (i - 1) + 1;\r\n        br[i] = n / ns * i;\r\n    }\r\n    br[ns] = n; //最后一块大小有变，其他都是等大小的\r\n    repe(i, 1, ns) repe(j, bl[i], br[i]) be[j] = i, bs[i] += a[j];\r\n//每一块存储的信息是bs，是块的和\r\n    repe(i, 1, ns) bq[i] = br[i] - bl[i] + 1;\r\n    while (m--)\r\n    {\r\n        cmd = read(), lf = read(), rf = read();\r\n        if (cmd == 1)\r\n        {\r\n            k = read();\r\n            change();\r\n        }\r\n        else\r\n            printf(\"%lld\\n\", query());\r\n    }\r\n    return 0;\r\n}\r\n", //28

    // "#define mn 100010\r\n#define ms 320\r\nll n, m, cmd, lf, rf, k, bl[ms], br[ms], be[mn], laz[ms];\r\nll a[mn], ns, bs[ms], bq[ms];\r\nvoid change()\r\n{\r\n    if (be[lf] == be[rf])//零散块\r\n        repe(i, lf, rf) a[i] += k, bs[be[i]] += k;\r\n    else\r\n    {//零散块两个+整块一堆，记得懒标签laz，否则复杂度无任何优化\r\n        repe(i, lf, br[be[lf]]) a[i] += k, bs[be[i]] += k;\r\n        repe(i, bl[be[rf]], rf) a[i] += k, bs[be[i]] += k;\r\n        rep(i, be[lf] + 1, be[rf]) laz[i] += k;\r\n    }\r\n}\r\nll query()\r\n{\r\n    re ll s = 0;\r\n    if (be[lf] == be[rf])\r\n        repe(i, lf, rf) s += a[i] + laz[i];\r\n    else\r\n    {//记得加上懒标签\r\n        repe(i, lf, br[be[lf]]) s += a[i] + laz[be[i]];\r\n        repe(i, bl[be[rf]], rf) s += a[i] + laz[be[i]];\r\n        rep(i, be[lf] + 1, be[rf]) s += bs[i] + laz[i] * bq[i];\r\n    }\r\n    return s;//不返回见bugs\r\n}\r\nsigned main()\r\n{\r\n    n = read(), m = read(), ns = sqrt(n);\r\n    repe(i, 1, n) a[i] = read();\r\n    repe(i, 1, ns)\r\n    {\r\n        bl[i] = n / ns * (i - 1) + 1;\r\n        br[i] = n / ns * i;\r\n    }\r\n    br[ns] = n; //最后一块大小有变，其他都是等大小的\r\n    repe(i, 1, ns) repe(j, bl[i], br[i]) be[j] = i, bs[i] += a[j];\r\n//每一块存储的信息是bs，是块的和\r\n    repe(i, 1, ns) bq[i] = br[i] - bl[i] + 1;\r\n    while (m--)\r\n    {\r\n        cmd = read(), lf = read(), rf = read();\r\n        if (cmd == 1)\r\n        {\r\n            k = read();\r\n            change();\r\n        }\r\n        else\r\n            printf(\"%lld\\n\", query());\r\n    }\r\n    return 0;\r\n}\r\n", //28
];

// export {posts_abbr};