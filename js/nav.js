"use strict";
//nav.js 承载导航栏和(标题更新)的功能
var xmlhttp;
const ajax_on = false; //手动调整是否使用ajax，手动解决ajax跨域问题
$(() => {
    // $(window).resize(size_change);
    // size_change();
    // console.log(location.href);

    // build_href('index');
    // build_href('posts');

    //读取nav.html并将body内容增加到其他html内 
    //已经尝试过了frame, iframe, worker多线程等方法，能力有限，均未能框架间或跨页面的信息交互，所以采用这样的方法实现导航栏模板

    //ajax如果是用vscode的live插件则没有问题，否则会出现跨域问题，暂无非手动修改浏览器外的解决办法……

    if (ajax_on) {
        try {
            if (window.XMLHttpRequest) {
                xmlhttp = new XMLHttpRequest();
            } else {
                xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
            }
            xmlhttp.onreadystatechange = load_nav_html;
            xmlhttp.open('GET', 'nav.html', true);
            xmlhttp.send(); //.catch(error => console.log(error));
        } catch (err) {
            console.log('err from ajax make', err);
            get_nav_html(htmlcode_without_ajax);
        }
    } else {
        get_nav_html(htmlcode_without_ajax);
        // console.log('waiting for updating');
    }

    //无论是普通AJAX还是jQuery的ajax都暂时个人无法解决跨域问题的报错捕获
    // try {
    //     $.ajax({
    //         type: 'get',
    //         url: 'nav.html',
    //         async: true,
    //         success: (rel) => {
    //             console.log(rel);
    //             get_nav_html(rel);
    //         },
    //         error: (err) => {
    //             console.log(err);
    //         }
    //     })
    // } catch (err) {
    //     console.log('err from ajax make', err);
    // }

    if (1 || location.href.indexOf('posts') == -1 && location.href.indexOf('post') != -1) {
        // console.log('ac');
        $(window).scroll(set_goto_top).resize(set_goto_top);
        set_goto_top();
    }

});

var goto_top_displaying = false;
var goto_top_transisitioning = false;

function set_goto_top() {
    if (goto_top_transisitioning) {
        return;
    }
    let scroll_top = document.documentElement.scrollTop || document.body.scrollTop;
    let window_height = document.documentElement.clientHeight;
    // console.log(scroll_top, window_height);
    if (scroll_top > window_height && !goto_top_displaying) {
        goto_top_displaying = true;
        goto_top_transisitioning = true;
        $('.nav_to_top').fadeIn(300);
        setTimeout(() => {
            goto_top_transisitioning = false;
        }, 300);
    }
    if (scroll_top <= window_height && goto_top_displaying) {
        // console.log(scroll_top, window_height);
        goto_top_displaying = false;
        $('.nav_to_top').fadeOut(300);
        //因为紧接着又写了一个fadeIn(ctrl+v忘记删掉)而导致过bugs，已修复
        goto_top_transisitioning = true;
        setTimeout(() => {
            goto_top_transisitioning = false;
        }, 300);
    }
}

function load_nav_html() {
    try {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                let htmlcode = xmlhttp.responseText;
                // console.log(JSON.stringify(htmlcode));
                get_nav_html(htmlcode);
            }
            // } else {
            //     console.log('err', xmlhttp.statusText);
            // }
        }
    } catch (err) {
        console.log('err from onreadystatechange', err)
    }
}

function get_nav_html(htmlcode) {
    let regexp = /<body[^>]*>([\s\S]+?)<\/body>/i;
    let body_innerHTML = htmlcode.match(regexp)[1];
    $('#ifr')[0].innerHTML = body_innerHTML;
    build_href('index');
    build_href('posts');
    build_href('tools');
    build_href('about');
}

// var href_info;
// onmessage = (e) => {
//     console.log(e.data);
//     href_info = e.data;
//     // let objs = document.getElementsByClassName('nav_bar');

// };

function build_href(htm) {
    let obj = $('#' + htm);
    let new_href = location.href;
    let fix_pos = Math.max(0, new_href.lastIndexOf('/'));
    let now_htm_name = new_href.substr(fix_pos + 1).split('.')[0];
    // console.log(htm, now_htm_name);
    if (now_htm_name == htm || htm == 'posts' && -1 != now_htm_name.indexOf('post') || htm == 'tools' && -1 != now_htm_name.indexOf('tool')) {
        obj.attr('now', htm);
    }
    // let obj = document.getElementBdyId(htm);
    obj[0].onclick = () => {
        $('.nav_bar').removeAttr('now');
        obj.attr('now', htm);

        new_href = new_href.substr(0, fix_pos) + '/' + htm + '.html';
        if (new_href == location) {
            return;
        }
        location.href = new_href;
        // console.log(location.href);
    };
    //obj.unbind('click');
    // obj.bind('click', () => {
    //     $('.nav_bar').removeAttr('now');
    //     obj.attr('now', htm);
    //     let new_href = location.href;
    //     let fix_pos = Math.max(0, new_href.lastIndexOf('/'));
    //     new_href = new_href.substr(0, fix_pos) + '/' + htm + '.html';
    //     location.href = new_href;
    // });
}

// function size_change() {
//     let w = parseFloat($('#nav_cf').css('width')) * 0.18;
//     $('#selei').css('width', w);
// }

//nav.html 纯文本常量，用于解决因出现ajax跨域问题而无法send的补救方法
const htmlcode_without_ajax = "<!DOCTYPE html>\r\n<html lang=\"en\">\r\n\r\n<head>\r\n    <meta charset=\"UTF-8\">\r\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\r\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n    <title>导航栏页面(用于框架)</title>\r\n    <link rel=\"stylesheet\" href=\"css/nav.css\">\r\n    <script src=\"js/jquery.js\"></script>\r\n    <!-- <script src=\"js/nav.js\"></script> -->\r\n</head>\r\n\r\n<body>\r\n    <div class=\"nav_main_bg\">\r\n        <div class=\"nav_main_cf\" id=\"nav_cf\">\r\n            <!--尝试实现滑窗悬停效果，实际体验不好，会遮住字体一半，没有简易解决办法-->\r\n            <!-- <div class=\"nav_selei\" id=\"selei\"></div> -->\r\n\r\n            <div class=\"nav_barrier\"></div>\r\n            <div class=\"nav_bar\" id=\"index\">首页</div>\r\n            <div class=\"nav_barrier\"></div>\r\n            <div class=\"nav_bar\" id=\"posts\">帖子</div>\r\n            <div class=\"nav_barrier\"></div>\r\n            <div class=\"nav_bar\" id=\"tools\">工具</div>\r\n            <div class=\"nav_barrier\"></div>\r\n            <div class=\"nav_bar\" id=\"about\">关于</div>\r\n            <div class=\"nav_barrier\"></div>\r\n            <div class=\"nav_main_cf_rf\">\r\n                欢迎您，访客！\r\n            </div>\r\n            <div class=\"nav_to_top\"><a href=\"#ifr\">回到顶部</a></div>\r\n        </div>\r\n    </div>\r\n<!-- Code injected by live-server -->\n<script type=\"text/javascript\">\n\t// <![CDATA[  <-- For SVG support\n\tif ('WebSocket' in window) {\n\t\t(function () {\n\t\t\tfunction refreshCSS() {\n\t\t\t\tvar sheets = [].slice.call(document.getElementsByTagName(\"link\"));\n\t\t\t\tvar head = document.getElementsByTagName(\"head\")[0];\n\t\t\t\tfor (var i = 0; i < sheets.length; ++i) {\n\t\t\t\t\tvar elem = sheets[i];\n\t\t\t\t\tvar parent = elem.parentElement || head;\n\t\t\t\t\tparent.removeChild(elem);\n\t\t\t\t\tvar rel = elem.rel;\n\t\t\t\t\tif (elem.href && typeof rel != \"string\" || rel.length == 0 || rel.toLowerCase() == \"stylesheet\") {\n\t\t\t\t\t\tvar url = elem.href.replace(/(&|\\?)_cacheOverride=\\d+/, '');\n\t\t\t\t\t\telem.href = url + (url.indexOf('?') >= 0 ? '&' : '?') + '_cacheOverride=' + (new Date().valueOf());\n\t\t\t\t\t}\n\t\t\t\t\tparent.appendChild(elem);\n\t\t\t\t}\n\t\t\t}\n\t\t\tvar protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';\n\t\t\tvar address = protocol + window.location.host + window.location.pathname + '/ws';\n\t\t\tvar socket = new WebSocket(address);\n\t\t\tsocket.onmessage = function (msg) {\n\t\t\t\tif (msg.data == 'reload') window.location.reload();\n\t\t\t\telse if (msg.data == 'refreshcss') refreshCSS();\n\t\t\t};\n\t\t\tif (sessionStorage && !sessionStorage.getItem('IsThisFirstTime_Log_From_LiveServer')) {\n\t\t\t\tconsole.log('Live reload enabled.');\n\t\t\t\tsessionStorage.setItem('IsThisFirstTime_Log_From_LiveServer', true);\n\t\t\t}\n\t\t})();\n\t}\n\telse {\n\t\tconsole.error('Upgrade your browser. This Browser is NOT supported WebSocket for Live-Reloading.');\n\t}\n\t// ]]>\n</script></body>\r\n\r\n</html>";