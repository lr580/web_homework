$(() => {
    // console.log('qwq');
    sele_ran_rep();
    sele_ran_num();
    sele_ran_wmode();
});

function ran_help() {
    let obj = $('#ran_help');
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

function sele_ran_num() {
    get_and_fix_number('ran_num');
}

function ran_read(files) { //根据filereader性质，再次选择同样文件不会触发，所以不算是bugs
    if (files.length) {
        let file = files[0];
        let reader = new FileReader();
        // console.log(file.type);
        if (/text+/.test(file.type)) {
            // console.log('yes');
            reader.onload = function() {
                // console.log(this);
                // console.log(this.result);
                ran_deal_read(this.result);
            }
            reader.readAsText(file);
        }
    }
}

var ran_item = []; //二元数组[nam,w]为元素，
var tid = 0; //用于查找和删除的唯一id

function append_rand_item(nam, w = 1) {
    ran_item.push([nam, w]);

    let obj = $('#ran_item');
    let row_num = $('tr[id^=x]').length;
    // let obj_rows = obj.children().length - 1;
    // console.log(obj, row_num);
    let obj_tr = $('<tr id="x' + tid + '"></tr>');
    obj.append(obj_tr); //先放这里就啥bugs都解决了……忌放在函数末尾

    let obj_tr_sid = $('<td id="iix' + tid + '">' + (row_num + 1) + '</td>');

    obj_tr.append(obj_tr_sid);

    let obj_tr_name = $('<td><input type="text" class="tool_edit_item" id="inx' + tid + '"/></td>');
    obj_tr_name.children()[0].value = nam;
    later_bind(tid, obj_tr_name.children(), change_item_name);
    // obj_tr_name.children().bind('keyup', () => { change_item_name(tid); });
    // obj_tr_name.children()[0].oninput = change_item_name(tid);
    //似乎这样绑定无用……
    // setTimeout(() => {
    //     obj_tr_name.children()[0].oninput = change_item_name(tid);
    // }, 1);
    // obj_tr.append(obj_tr_name);
    // setTimeout(later_bind(tid, obj_tr_name.children()[0], change_item_name), 1);
    obj_tr.append(obj_tr_name);

    let obj_tr_w = $('<td><input type="number" class="tool_edit_item" id="iwx' + tid + '" min="0" max="99999"/></td>');
    obj_tr_w.children()[0].value = parseFloat(w);
    later_bind(tid, obj_tr_w.children(), change_item_w);
    obj_tr.append(obj_tr_w);

    let obj_tr_del = $('<td><div class="textbutton" onclick="delete_rand_item(' + tid + ')">删除该项</div></td>')
    obj_tr.append(obj_tr_del);

    ++tid;
    set_footer_position(); //但凡可能改变高度都应该设置一下……
}

//曾经：一定要settimeout才不会出错……但是settimeout之后tid变了，所以异步一下
//现在：bind似乎本身是异步的，tid直接传会出问题，所以包一层函数存一下临时的tid
function later_bind(now_tid, obj, funcname) {
    // obj.oninput = funcname(now_tid);
    obj.bind('keyup', () => { funcname(now_tid); });
}

function delete_rand_item(tid) {
    // console.log(tid);
    let xtid = 'x' + tid;
    // let objs = $('tr[id^=x]');
    // for (let i = 0; i < objs.length; ++i) {
    //     if (objs[i].id == xtid) {
    //         erase(ran_item, i);
    //         break;
    //     }
    // }
    let idx = tid_to_index(tid);
    erase(ran_item, idx);
    $('#' + xtid).remove();

    let objs_new = $('td[id^=iix]');
    for (let i = 0; i < objs_new.length; ++i) {
        // console.log('iix', i, objs_new[i].innerHTML);
        objs_new[i].innerHTML = (i + 1);
    }

    // console.log(ran_item);
    set_footer_position();
}

function tid_to_index(tid) {
    let xtid = 'x' + tid;
    let objs = $('tr[id^=x]');
    // console.log(tid, objs, objs.length);
    for (let i = 0; i < objs.length; ++i) {
        // console.log(xtid, objs[i].id);
        if (objs[i].id == xtid) {
            return i;
        }
    }
    throw "not found " + tid + ' in ' + ran_item;
}

//事实上建立节点的时候也会激活
function change_item_name(tid) {
    let idx = tid_to_index(tid);
    // console.log($('#inx' + tid));
    ran_item[idx][0] = $('#inx' + tid).val();
    // console.log(ran_item);
}

function change_item_w(tid) {
    let idx = tid_to_index(tid);
    let ttid = 'iwx' + tid;
    let val = get_and_fix_number_float(ttid, 1);
    ran_item[idx][1] = val;
    // console.log(ran_item);
}

function ran_deal_read(tx) {
    let text = tx.split('\n');
    // console.log(text);
    let ran_type = $('#ran_wmode').val();
    // console.log(ran_type);
    for (let i = 0; i < text.length; ++i) {
        let nowline = text[i].trim();
        if (!nowline) {
            continue;
        }
        // console.log(nowline);
        if (ran_type == 'n') {
            append_rand_item(nowline, 1);
        } else {
            // console.log('qwq');
            let last_space_pos = nowline.lastIndexOf(' ');
            // console.log(nowline, last_space_pos);
            if (last_space_pos == -1) {
                append_rand_item(nowline, 1);
            } else {
                let front = nowline.substr(0, last_space_pos);
                let last = nowline.substr(last_space_pos + 1);
                last = parseFloat(last);
                last = Math.min(Math.max(0.1, last), 99999);
                append_rand_item(front, last);
                // console.log(front, 'bet', last);
            }
        }
    }
}

function sele_ran_wmode() {
    let ran_type = $('#ran_wmode').val();
    //暂时放弃权重列的动态显示和隐藏
    // if (ran_type == 'w') {
    // $('#wcx').css('display', 'none');
    // $('input[id^=iwx]').css('display', 'none');
    // $('#wwx').html('');
    // } else {
    // $('#wcx').css('display', 'initial');
    // $('input[id^=iwx]').css('display', 'initial');
    // $('#wwx').html('权重');
    // }
}

function sele_ran_fold() {
    //该函数暂不需要使用
}

function sele_ran_rep() {
    let ran_rep = $('#ran_rep').val();
    if (ran_rep == 'n') {
        $('#ran_fold_text').html('&nbsp;');
        $('#ran_fold').css('display', 'none');
    } else {
        $('#ran_fold_text').html('是否折叠结果：');
        $('#ran_fold').css('display', 'initial');
    }
}

//因为在该数据范围内时间复杂度绝大多数情况下暂时没有太高，所以不需要开web worker多线程
function ran_generate() {
    let obj = $('#ran_res');
    if (ran_item.length <= 0) {
        obj.val('当前项目列表为空！');
        return;
    }
    let ran_type = $('#ran_wmode').val();
    let ran_rep = $('#ran_rep').val();
    let ran_num = get_number_float('ran_num');
    let ran_fold = $('#ran_fold').val();
    // console.log(ran_type, ran_rep, ran_num, ran_fold);
    if ('n' == ran_rep && ran_item.length < ran_num) {
        obj.val('不允许重复时无法抽取多于项目数的次数！');
        return;
    }

    let ran_w_sum = 0;
    let ran_w_pref_sum = [0]; //权重前缀和
    let ran_item_name = [];
    for (let i = 0; i < ran_item.length; ++i) {
        ran_w_sum += (ran_type == 'w') ? ran_item[i][1] : 1;
        ran_w_pref_sum.push(ran_w_sum);
        ran_item_name.push(ran_item[i][0]);
    }
    // console.log(ran_w_sum, ran_w_pref_sum);

    let ran_result = [];
    let r = '';

    if ('y' == ran_rep) {
        for (let i = 0; i < ran_num; ++i) {
            ran_result.push(choice_w(ran_item_name, ran_w_pref_sum, ran_w_sum, false));
        }

        if ('n' == ran_fold) {
            for (let i = 0; i < ran_num; ++i) {
                r += ran_result[i] + '\n';
            }
        } else {
            let um = new unordered_map();
            for (let i = 0; i < ran_result.length; ++i) {
                um.fix(ran_result[i], 1);
            }
            let umarray = um.to_array();
            umarray.sort(sort_pair());
            // console.log(umarray);

            for (let i = 0; i < umarray.length; ++i) {
                r += umarray[i][0] + ' x' + umarray[i][1] + '\n';
            }
        }
    } else {
        //然而理论上……不重复随机数暴力搜索的事件复杂度是平方的，所以考虑转换思路，使用shuffle然后只取前ran_num个元素，按理来说可以实现等权随机抽取，而加权随机抽取的直接暴力法最坏时间复杂度非常差，可以考虑模拟成等权随机抽取，即插入重复元素，重复数等于相对权重……但是这样的问题在于仍然需要筛掉重复元素，所以时间复杂度又会退化成本来的复杂度……暂时没想到更好的做法

        //综上所述，不加权，不允许重复，总时间复杂度是线性的；近似来说，加权平均复杂度是次数乘权重和，最坏时间复杂度大约是次数乘(权重和除以最小权重(假设是小于1的实数))

        //……后续……想到了一种优化策略：每次抽取完之后重新搞前缀和，那么时间复杂度是次数的平方，以后有空再优化吧

        //此外，理论上全局的最优复杂度可以用数学公式降到线性……但是暂时没有想到如何做
        if (ran_type == 'n') {
            shuffle(ran_item_name);
            for (let i = 0; i < ran_num; ++i) {
                r += ran_item_name[i] + '\n';
            }
        } else {
            //为了实现O(1)的常数时间复杂度查询，使用哈希表
            let um = new unordered_map();
            // for (let i = 0; i < ran_item.length; ++i) {
            //     um.fix(ran_item_name[i], 1);
            // }
            let suc = 0;
            while (suc < ran_num) {
                let v = choice_w(ran_item_name, ran_w_pref_sum, ran_w_sum, false);
                if (um.find(v)) {
                    continue;
                } else {
                    r += v + '\n';
                    um.fix(v, 1);
                    ++suc;
                }
            }

        }
    }
    $('#ran_res').val(r);
}

// function ran_deal() {

// }