"use strict";
$(() => {
    // $(window).resize(size_change);
    // size_change();
    // console.log(location.href);

    // build_href('index');
    // build_href('posts');
});

// var href_info;
// onmessage = (e) => {
//     console.log(e.data);
//     href_info = e.data;
//     // let objs = document.getElementsByClassName('nav_bar');

// };

function build_href(htm) {
    let obj = $('#' + htm);
    // let obj = document.getElementById(htm);
    obj.onclick = () => {
        $('.nav_bar').removeAttr('now');
        obj.attr('now', htm);
        let new_href = location.href;
        let fix_pos = Math.max(0, new_href.lastIndexOf('/'));
        new_href = new_href.substr(0, fix_pos) + '/' + htm + '.html';
        location.href = new_href;
        console.log(location.href);
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