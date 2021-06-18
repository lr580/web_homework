$(() => {
    // console.log('qwq');
    sele_text_rmode();
    append_regex_list();
});

function sele_text_smode() {
    let v = $('#text_smode').val();
    // console.log(v);
}

function sele_text_rmode() {
    let v = $('#text_rmode').val();
    if ('n' == v) {
        $('#text_rnr_text').html('&nbsp;') //这个td如果直接display none再display initial的话就不会居右了……
        $('#text_rnr').css('display', 'none');
        $('#text_deal_butt').html('替换');
    } else {
        $('#text_rnr_text').html('替换为：');
        $('#text_rnr').css('display', 'initial');
        $('#text_deal_butt').html('搜索');
    }
}

function select_regex(nr) {
    $('#text_smode').val('r');
    $('#text_snr').val(nr);
}

function append_regex_item(nr, dsc) {
    let obj = $('#regex_item');
    let obj_tr = $('<tr class="cp"></tr>');
    obj.append(obj_tr);
    obj_tr.bind('click', () => { select_regex(nr); });

    let obj_regex = $("<td></td>");
    obj_regex.html(nr);
    obj_tr.append(obj_regex);

    let obj_dsc = $('<td></td>');
    obj_dsc.html(dsc);
    obj_tr.append(obj_dsc);
}

function append_regex_list() {
    for (let i = 0; i < regex_list.length; ++i) {
        append_regex_item(regex_list[i][0], regex_list[i][1]);
    }
}

//文本处理整体上是线性时间复杂度的……所以不考虑使用web worker多线程

function text_stat(mode) {
    let input = $('#text_input').val();
    let res = '';
    let lenx = input.length;
    res += '字符串长度：' + lenx + '\n';
    let nonvoid = len(input.match(/\S/img));
    res += '非空字符数：' + nonvoid + '\n';
    let chendig = len(input.match(/[\u4E00-\u9FA5A-Za-z0-9_]/img));
    res += '中英文和数字数：' + chendig + '\n';
    let words = len(input.match(/\b[a-zA-Z]+\b/img));
    res += '单词数：' + words + '\n';
    let half_stn = len(input.match(/[，。？；！…,\.\?\!;\:]/img));
    res += '分句数：' + half_stn + '\n';
    let stn = len(input.match(/[，,]/img));
    res += '句子数：' + (half_stn - stn) + '\n';
    let para = len(input.match(/\n/img)) + 1;
    res += '段落数：' + para + '\n';
    let parane = len(input.match(/\s+\n/img)) + 1;
    res += '非空段落数：' + parane + '\n';

    if (mode == 2) {
        let um = new unordered_map();
        for (let i = 0; i < input.length; ++i) {
            um.fix(input[i], 1);
        }
        let umarray = um.to_array();
        umarray.sort(sort_pair());
        res += '\n共有' + umarray.length + '种字符，出现频率分别如下：\n';
        for (let i = 0; i < umarray.length; ++i) {
            res += '"' + umarray[i][0] + '" x' + umarray[i][1] + '\n';
        }

        let word = input.match(/\b[a-zA-Z]+\b/img);
        if (!word) {
            res += '\n文本中没有出现单词。';
        } else {
            um = new unordered_map();
            for (let i = 0; i < word.length; ++i) {
                um.fix(word[i], 1);
            }
            umarray = um.to_array();
            umarray.sort(sort_pair());
            res += '\n共有' + umarray.length + '种单词，出现频率分别如下：\n';
            for (let i = 0; i < umarray.length; ++i) {
                res += '"' + umarray[i][0] + '" x' + umarray[i][1] + '\n';
            }
        }
    }

    $('#text_res').val(res);
}

function text_deal() {
    let input = $('#text_input').val();
    let snr = $('#text_snr').val();
    let rnr = $('#text_rnr').val();
    let smode = $('#text_smode').val();
    let rmode = $('#text_rmode').val();
    let res = [];
    let rtx = '';
    if (smode == 'r') {
        try {
            snr = eval(snr);
            if (rmode == 'n') {
                res = input.match(snr);
                rtx = ((rmode != 'r') ? '匹配' : '替换') + '完毕，对于' + snr + '一共搜索到' + res.length + '个结果，分别如下：\n';
            } else {
                res = input.replace(snr, rnr);
                rtx = res;
            }

        } catch (err) {
            rtx = ((rmode != 'r') ? '匹配' : '替换') + '失败：' + err;
        }
    } else {
        try {
            if (rmode == 'n') {
                //以后可以用KMP算法优化
                let now = 0;
                // let ed = input.length - 1;
                let cnt = 0;
                let last_end = 0;
                let rrtx = '';
                while (1) {
                    let pos = input.indexOf(snr, now);
                    if (pos == -1) {
                        break;
                    } else {
                        now = pos + snr.length;
                        // rrtx += input.substr(pos, snr.length);
                        console.log(pos, now, last_end);
                        rrtx += input.substr(last_end, now - last_end - snr.length);
                        // rrtx += '<span class="highlight">' + snr + '</span>';
                        rrtx += ' <' + snr + '> ';
                        last_end = now;
                        ++cnt;
                    }
                }
                rrtx += input.substr(last_end);
                console.log(rrtx);
                rtx = '搜索成功，共找到' + cnt + '个' + snr + '，结果如下：\n' + rrtx;
            } else {
                res = input.replace(snr, rnr);
                rtx = res;
            }
        } catch (err) {
            rtx = ((rmode != 'r') ? '匹配' : '替换') + '失败：' + err;
        }
    }
    // console.log(input, snr, rnr, smode, rmode, typeof snr);
    if (rmode == 'n') {
        for (let i = 0; i < res.length; ++i) {
            rtx += res[i] + '\n';
        }
    }
    $('#text_res').val(rtx);
}

const regex_list = [
    [/[0-9]*/img, '0~n个数字'],
    [/\d{n}/img, 'n位整数(n自行设置，下同)'],
    [/\d{n,}/img, '至少n位的数字'],
    [/\d{n,m}/img, '位数在整数区间[n,m]的数字'],
    [/([1-9][0-9]*)+(\.[0-9]{1,2})?/img, '非0开头，最多带两位小数的数字'],
    [/(\-)?\d+(\.\d{1,2})?/img, '带1~2位小数的正数或负数'],
    [/[1-9]\d*/img, '非零正整数'],
    [/\-[1-9]\d*/img, '非零负整数'],
    [/(\-?\d+)(\.\d+)?/img, '浮点数'],
    [/[\u4e00-\u9fa5]{0,}/img, '汉字'],
    [/[A-Za-z0-9]+/img, '数字和字母组成的字符串'],
    [/.{6,30}/img, '长度为6~30的所有字符'],
    [/[A-Za-z]+/img, '大小写英文字母'],
    [/[A-Z]+/mg, '大写英文字母'],
    [/[a-z]+/mg, '小写英文字母'],
    [/\w+/img, '数字、英文和下划线'],
    [/[\u4E00-\u9FA5A-Za-z0-9_]+/img, '中文、数字、英文和下划线'],
    [/#?([a-f0-9]{6}|[a-f0-9]{3})/img, '十六进制值'],
    [/\d{3}-\d{8}|\d{4}-\d{7}/img, '国内电话号码'],
    [/\d{15}|\d{17}[0-9]X/mg, '身份证号'],
    [/\d{4}-\d{1,2}-\d{1,2}/img, '日期'],
    [/[1-9][0-9]{4,}/img, 'QQ号，从10000开始'],
    [/\n\s*\r/img, '可以用来删除空白行'],
    [/[1-9]\d{5}(?!\d)/img, '邮政编码，其中(?!\d)表示自身位置后面不能匹配\d'],
    [/[+]{0,1}(d){1,3}[]?([-]?((d)|[]){1,12})+/img, '手机号码'],
    [/[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+/img, 'Email邮箱'],
    [/((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)/, 'IP地址'],
];