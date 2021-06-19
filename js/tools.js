"use strict";
$(() => {
    // console.log('qwq!');
    $('.tool_board').fadeIn(300);
    $('.tool_board').bind('click', function(e) {
        let tid = parseInt($(this).attr('id').match(/tool(\d*)/i)[1]);
        // console.log(tid);//, e.target.id
        goto_tool(tid);
    });
    $(window).scroll(toolpage_height).resize(toolpage_height);
    toolpage_height();
    // set_footer_position();
    // set_footer_position();
});

function goto_tool(tid) {
    // let slash_pos = Math.max(0, location.href.lastIndexOf('/'));
    // let new_href = location.href.substr(0, slash_pos);
    // let new_href = location.origin + '/tool' + tid + '.html'; 非live会炸
    let hp = Math.max(location.href.lastIndexOf('/'), 0);
    let ori = location.href.substr(0, hp);
    let new_href = ori + '/tool' + tid + '.html';
    location.href = new_href;
}

function toolpage_height() {
    if (document.documentElement.clientWidth < 1024) {
        $('.tool_frame').css('height', '680px');
    } else {
        $('.tool_frame').css('height', '400px');
    }
    set_footer_position();
}