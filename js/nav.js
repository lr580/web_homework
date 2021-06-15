"use strict";
//nav.js 承载导航栏和(标题更新)的功能
var xmlhttp;
const ajax_on = true; //手动调整是否使用ajax，手动解决ajax跨域问题
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
            xmlhttp.open('GET', 'nav.txt', true);
            xmlhttp.send(); //.catch(error => console.log(error));
        } catch (err) {
            console.log('err from ajax make', err);
        }
    } else {
        console.log('waiting for updating');
    }


});

function load_nav_html() {
    try {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                let htmlcode = xmlhttp.responseText;
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
    if (now_htm_name == htm) {
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
const htmlcode_without_ajax = '';