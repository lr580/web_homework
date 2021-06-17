$(() => {
    // console.log('qwq');
    append_rand_item('xxx', 3);
    append_rand_item('y');
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
}

function sele_ran_num() {
    get_and_fix_number('ran_num');
}

function ran_read(files) {
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

    let obj_tr_del = $('<td><div class="textbutton" onclick="delete_rand_item(' + tid + ')">删除该列</div></td>')
    obj_tr.append(obj_tr_del);

    ++tid;
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

    console.log(ran_item);
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

}