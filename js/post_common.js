"use strict";
$(() => {
    get_pid();
    build_common();
    // code_txt_to_js_string('ts.py');
    render_all_code();
    set_footer_position();
});

// import { posts_abbr } from "./post_info.js";

var pid = -1;
// var post_info;

function get_pid() {
    pid = parseInt(location.href.match(/post(\d*)/i)[1]);
}

//辅助函数：文本转string
async function code_txt_to_js_string(url) {
    function f() {
        return new Promise((resolve) => {
            $.ajax({
                type: 'get',
                url: 'resources/' + url,
                async: true,
                success: (rel) => {
                    resolve(rel);
                },
            })
        })
    }
    var res = await f();
    console.log(JSON.stringify(res));
    return res;
}

//渲染所有id为code_$的代码片段
function render_all_code() {
    let objs = $('.post_code');
    for (let i = 0; i < objs.length; ++i) {
        let cid = parseInt(objs[i].id.match(/code_(\d*)/i)[1]);
        render_code(cid);
    }
}

//根据code的id渲染代码(不含高亮)
function render_code(cid) {
    let obj = $('#code_' + cid);
    let codetext = posts_code[cid].split('\r\n');
    // console.log(codetext);
    for (let i = 0; i < codetext.length; ++i) {
        let dealt_text = codetext[i]; //.replaceAll(' ', '&nbsp;');
        // dealt_text.replaceAll('\t', '&nbsp;&nbsp;&nbsp;&nbsp;');
        // console.log(dealt_text[0]);
        dealt_text = dealt_text.replaceAll('&', '&amp;'); //&必须首先处理
        dealt_text = dealt_text.replaceAll('>', '&gt;');
        dealt_text = dealt_text.replaceAll('<', '&lt;');
        dealt_text = dealt_text.replaceAll('"', '&quot;');
        let newline = $('<li class="allow_select"></li>');
        newline.html(dealt_text);
        obj.append(newline);
    }
}

//从帖子列表里随机抽取一个除arr外的帖子，抽到的帖子加入arr
function select_except(arr) {
    if (arr.length >= posts_abbr.length) {
        throw "已经没有更多帖子了！"; //当下版本不会触发该throw
    }
    while (true) {
        var rid = Math.floor(Math.random() * posts_abbr.length);
        if (-1 == arr.indexOf(rid)) {
            break;
        }
    }
    arr.push(rid);
    return rid;
}

//建立帖子的头部和尾部内容
//因为对于丰富格式的html帖子正文文本存json操作不便，所以还是打算直接放在html里
function build_common() {
    const now_post_info = posts_abbr[pid];
    document.title = now_post_info.title + ' - 星月编程学习小站';
    var obj_frame = $('.post_frame');

    var obj_frame_info = $('<div class="post_info_frame"></div>');
    obj_frame.prepend(obj_frame_info);

    var obj_tag = $('<div class="post_info_tag allow_select"></div>');
    obj_tag.html('标签：' + now_post_info.tag);
    obj_frame_info.append(obj_tag);

    var obj_time = $('<div class="post_info_time allow_select"></div>');
    obj_time.html(now_post_info.date);
    obj_frame_info.append(obj_time);

    var obj_title = $('<div class="post_title allow_select"></div>');
    obj_title.html(now_post_info.title);
    obj_frame.prepend(obj_title);

    var obj_frame_href = $('<div class="post_hrefs"></div>');
    obj_frame.prepend(obj_frame_href);

    var obj_href1 = $('<a class="post_sub_href">帖子</a>');
    obj_href1.attr('href', location.origin + '/posts.html');
    obj_frame_href.append(obj_href1);

    const conn_htmlcode = '<div class="post_sub_href_conn">&gt;&gt;</div>';
    var obj_hconn1 = $(conn_htmlcode);
    obj_frame_href.append(obj_hconn1);

    var obj_href2 = $('<a class="post_sub_href"></a>');
    obj_href2.attr('href', location.origin + '/posts.html?type=' + now_post_info.type);
    obj_href2.html(sc_type[now_post_info.type]);
    obj_frame_href.append(obj_href2);

    var obj_frame_links = $('<div class="post_link_frame"></div>');
    obj_frame.append(obj_frame_links);

    var obj_link_prev = $('<a class="post_link_prev"></a>');
    if (pid > 0) {
        obj_link_prev.html('上一篇：' + posts_abbr[pid - 1].title);
        obj_link_prev.attr('href', location.origin + '/post' + (pid - 1) + '.html');
    } else {
        obj_link_prev.html('已经是第一篇文章了');
    }
    obj_frame_links.append(obj_link_prev);

    var obj_link_next = $('<a class="post_link_next"></a>');
    if (pid + 1 < posts_abbr.length) {
        obj_link_next.html('下一篇：' + posts_abbr[pid + 1].title);
        obj_link_next.attr('href', location.origin + '/post' + (pid + 1) + '.html');
    } else {
        obj_link_next.html('已经是最后一篇文章了');
    }
    obj_frame_links.append(obj_link_next);

    var obj_hr = $('<hr/>');
    obj_frame.append(obj_hr);

    var obj_recommend_head = $('<div class="post_recommend_head"></div>');
    obj_recommend_head.html('更多推荐文章：');
    obj_frame.append(obj_recommend_head);

    const recommend_nums = 3;
    let already_posts = [pid - 1, pid, pid + 1];
    for (let i = 0; i < 3; ++i) {
        let rid = select_except(already_posts);
        var obj_recommend_post = $('<a class="post_recommend"></a>');
        var obj_temp_div = $('<div></div>');
        obj_recommend_post.html(posts_abbr[rid].title);
        obj_recommend_post.attr('href', location.origin + '/post' + rid + '.html');
        obj_temp_div.append(obj_recommend_post);
        obj_frame.append(obj_temp_div);
    }
}