"use strict";
$(() => {
    $('.sidebar_column').bind('click', sidebar_click); //注意使用箭头函数的话无法使用this……
    update_page();
    // $('#search_button').hover(function() {
    // console.log($(this));
    // $(this).addClass('search_button_hover');
    // });

    $('#page_first_fa').hover(page_first_hover);
    $('#page_last_fa').hover(page_last_hover);
    load_post(posts_abbr);

    $('#search_input').keydown(search_keydown);
});

const post_nums = 5; //一页最多多少个帖子
var page_num = 0;
var now_page = 0;

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
        if (!text_type_res) {
            now_type = 'sc_all';
            return;
        }
        let text_dealt = text_type_res[1];
        if (text_dealt.indexOf('&') != -1) {
            text_type_res = text_dealt.match(/([^\&]*)\&/i)[1];
        } else {
            text_type_res = text_dealt;
        }
        now_type = text_type_res;
        // console.log(text_type_res);
        if (text_type_res) {
            $('.sidebar_column_now').removeClass('sidebar_column_now');
            $('#' + text_type_res).addClass('sidebar_column_now');

            let correspond_title = sc_type[text_type_res];
            // console.log(correspond_title);
            if (correspond_title) {
                // $('title').attr({ innerHTML: correspond_title + ' - 帖子 - 星月编程学习小站' });
                document.title = correspond_title + ' - 帖子 - 星月编程学习小站';
                // document.getElementsByTagName('title')[0].innerText = 'try';
            }
        }
    }
}

function search_keydown(e) {
    if (e.keyCode == 13) {
        show_search();
    } else {
        let obj_search_select = $('#search_list');
        obj_search_select.empty();
        let ac_items = search();
        if (!ac_items) {
            return;
        }
        for (let i = 0; i < ac_items.length; ++i) {
            let obj_item = $('<option value="' + ac_items[i].title + '"></option>');
            obj_search_select.append(obj_item);
        }
    }
}

function search() {
    let nr = $('#search_input').val().trim();

    let ac_posts = [];
    for (let i = 0; i < posts_abbr.length; ++i) {
        if (-1 != posts_abbr[i].title.indexOf(nr)) {
            ac_posts.push(posts_abbr[i]);
        }
    }
    return ac_posts;
}

function show_search() {
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
    let ac_posts = search();

    //从下列实现机制上而言，如果用户输入的关键字含有search,page,type,应当屏蔽
    nr = nr.toLowerCase();
    nr = nr.replaceAll('search', '');
    nr = nr.replaceAll('page', '');
    nr = nr.replaceAll('type', '');

    if (-1 == location.search.indexOf('?')) {
        location.href += '?search=' + encodeURI(nr);
    } else if (-1 == location.search.indexOf('search')) {
        location.href += '&search=' + encodeURI(nr);
    } else {
        let new_href = location.href.replace(/search=[^&]*/i, 'search=' + encodeURI(nr));
        if (new_href != location.href) {
            location.href = new_href;
        }
    }

    // load_post(ac_posts); 直接load会有很大的bugs，原因未知，已避免
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
    var new_obj = $('<div class="post" onclick="goto_post(' + pid + ')"></div>');

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

function goto_post(pid) {
    console.log(pid);
    let slash_position = Math.max(0, location.href.lastIndexOf('/'));
    let new_href = location.href.substr(0, slash_position);
    new_href += '/post' + pid + '.html';
    // console.log(new_href);
    location.href = new_href;
}

function load_post(ac_posts) {
    if (-1 != location.search.indexOf('search')) {
        var search_nr = location.search.match(/search=([^\&]*)/i);
        if (search_nr) {
            search_nr = search_nr[1];
            search_nr = decodeURI(search_nr);
        } else {
            throw 'err in searching:' + location.search;
        }

        let ad_posts = [];
        for (let i = 0; i < ac_posts.length; ++i) {
            if (-1 != ac_posts[i].title.indexOf(search_nr)) {
                ad_posts.push(ac_posts[i]);
            }
        }
        ac_posts = ad_posts;

        $('#search_feedback').html('搜索完毕，共找到' + ad_posts.length + '条含“' + search_nr + '”的帖子。');
    }
    // $('.post').remove();
    // console.log(now_type);
    // let pids = [];
    let cnt_pid = 0;
    // let notype = false;
    page_num = 0; //暂时不打算做省略号页数和相关的内容代码
    if (!now_type || now_type == 'sc_all') {
        cnt_pid = ac_posts.length;
    } else {
        let ae_posts = [];
        for (let i = 0; i < ac_posts.length; ++i) {
            if (ac_posts[i].type == now_type) {
                ae_posts.push(ac_posts[i]);
                ++cnt_pid;
            }
        }
        ac_posts = ae_posts;
    }
    page_num = Math.max(1, Math.ceil(cnt_pid / post_nums));
    // console.log(page_num);

    let page_inserta = $('#page_first_fa');
    for (let i = page_num; i >= 1; --i) {
        // console.log(i);
        let obj_page = $('<div class="page_block">' + i + '</div>');
        obj_page.bind('click', click_page);
        page_inserta.after(obj_page);
    }
    $('#page_last_fa').bind('click', click_last_page);

    let now_page_text = location.search.match(/page=(\d)/i);
    if (now_page_text) {
        now_page = parseInt(now_page_text[1]);
    } else {
        now_page = 1;
    }
    // console.log(now_page);
    // console.log(cnt_pid);

    for (let i = (now_page - 1) * post_nums, j = 0; j < cnt_pid && i < Math.min(now_page * post_nums, ac_posts.length); ++i) {
        generate_abbr(ac_posts[i].id);
    }

    if (cnt_pid === 0 && $('#search_feedback').html().length === 0) {
        $('#search_feedback').html('暂时没有相关帖子。');
    }

    if (search_nr) { //事实上变量提升了search_nr，但let的话不会变量提升
        $('#search_input').val(search_nr);
    }
}

function click_last_page() {
    goto_page(page_num);
}

function click_page(e) {
    goto_page(parseInt($(this).html()));
}

function goto_page(i) {
    let pos_question_mark = location.href.indexOf('?');
    if (-1 == pos_question_mark) {
        location.href += '?page=' + i;
    } else if (-1 == location.search.indexOf('page')) {
        location.href += '&page=' + i;
    } else {
        let new_href = location.href.replace(/page=\d*/, 'page=' + i);
        if (new_href == location.href) {
            return;
        }
        location.href = new_href;
    }
}

// type="module" import后onclick均会失效……
// import { posts_abbr } from "./post_info.js";

if (!posts_abbr) {
    const posts_abbr = [{
        title: '拓展欧拉定理：从快速幂到疾速幂',
        abbr: '对于a的b次幂关于素数p取模下的结果，如果使用一般的快速幂需要log(b)对数复杂度求解，然而，根据数论里的拓展欧拉原理，可以把复杂度降至b%φ(p)+φ(p)的对数，这对于b特别大时是特别有优化意义的……',
        date: '2021/06/15 22:18',
        tag: '数论，快速幂，欧拉定理',
        type: 'sc_alg',
    }];
}

if (!sc_type) {
    const sc_type = {
        sc_all: '',
        sc_alg: '算法',
        sc_lan: '编程语言',
        sc_dev: '开发工具',
        sc_res: '资源分享',
        sc_oth: '杂项',
    };
}