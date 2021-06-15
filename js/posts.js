"use strict";
$(() => {
    $('.sidebar_column').bind('click', sidebar_click); //注意使用箭头函数的话无法使用this……
    update_page();
    // $('#search_button').hover(function() {
    // console.log($(this));
    // $(this).addClass('search_button_hover');
    // });
    generate_abbr(0);
    generate_abbr(0);
    generate_abbr(0);
    generate_abbr(0);
    generate_abbr(0);

    $('#page_first_fa').hover(page_first_hover);
    $('#page_last_fa').hover(page_last_hover);

});

const sc_type = {
    sc_all: '',
    sc_alg: '算法',
    sc_lan: '编程语言',
    sc_dev: '开发工具',
    sc_res: '资源分享',
    sc_oth: '杂项',
};

function sidebar_click() {
    let click_name = $(this).attr('id');
    // console.log($(this).attr('id'));
    let pref = location.href;
    let whereis_question_mark = location.href.indexOf('?');
    if (whereis_question_mark != -1) {
        pref = location.href.substr(0, whereis_question_mark);
    }
    let new_href = pref + '?type=' + click_name
    if (location.href == new_href) {
        return;
    }
    location.href = new_href;
    // $('title').attr({ innerHTML: sc_type[click_name] });
    // console.log($('title').attr('innerHTML'));
    // document.title = sc_type[click_name];
    //疑似在这里改刷新后标题还会回去……
}

var now_type;
//更新侧边栏、标题和主页 //绑定相关事件等页面初始化行为
function update_page() {
    if (location.search) {
        let text = location.search;
        let text_type_res = text.match(/type=(.*)/i);
        let text_dealt = text_type_res[1];
        if (text_dealt.indexOf('&') != -1) {
            text_type_res = text_dealt.match(/(.*)\&/i)[1];
        } else {
            text_type_res = text_dealt;
        }
        // console.log(text_type_res);
        if (text_type_res) {
            $('.sidebar_column_now').removeClass('sidebar_column_now');
            $('#' + text_type_res).addClass('sidebar_column_now');

            let correspond_title = sc_type[text_type_res];
            console.log(correspond_title);
            if (correspond_title) {
                // $('title').attr({ innerHTML: correspond_title + ' - 帖子 - 星月编程学习小站' });
                document.title = correspond_title + ' - 帖子 - 星月编程学习小站';
                // document.getElementsByTagName('title')[0].innerText = 'try';
            }
        }
    }
}

function search() {
    let nr = $('#search_input').val().trim();
    $('#search_button').addClass('search_button_clicking');
    setTimeout(() => {
        $('#search_button').removeClass('search_button_clicking');
    }, 300);
    if (!nr) {
        $('#search_feedback').html('搜索内容不能为空！');
        return;
    }
    $('#search_feedback').html('');
    //waiting for completing
}

function page_first_hover() {
    let obj_first = $('.page_first');
    if (obj_first.hasClass('page_first_on')) {
        obj_first.removeClass('page');
    } else {
        obj_first.addClass('page');
    }
}

function page_last_hover() {
    let obj_last = $('.page_last');
    if (obj_last.hasClass('page_last_on')) {
        obj_last.removeClass('page');
    } else {
        obj_last.addClass('page');
    }
}

function generate_abbr(pid) {
    var new_obj = $('<div class="post"></div>');

    var new_obj_title = $('<div class="post_title allow_select"></div>');
    new_obj_title.html(posts_abbr[pid].title);
    new_obj.append(new_obj_title);

    var new_obj_abbr = $('<div class="post_abbr allow_select"></div>');
    new_obj_abbr.html(posts_abbr[pid].abbr);
    new_obj.append(new_obj_abbr);

    var new_obj_bottom = $('<div class="post_bottom"></div>');
    new_obj.append(new_obj_bottom);

    var new_obj_tag = $('<div class="post_tag allow_select"></div>');
    new_obj_tag.html('标签：' + posts_abbr[pid].tag);
    new_obj_bottom.append(new_obj_tag);

    var new_obj_date = $('<div class="post_date allow_select"></div>');
    new_obj_date.html(posts_abbr[pid].date);
    new_obj_bottom.append(new_obj_date);

    $('#posts').append(new_obj);
    new_obj.fadeIn(180);
}

const posts_abbr = [{
    title: '拓展欧拉定理：从快速幂到疾速幂',
    abbr: '对于a的b次幂关于素数p取模下的结果，如果使用一般的快速幂需要log(b)对数复杂度求解，然而，根据数论里的拓展欧拉原理，可以把复杂度降至b%φ(p)+φ(p)的对数，这对于b特别大时是特别有优化意义的……',
    date: '2021/06/15 22:18',
    tag: '数论，快速幂，欧拉定理',
}];