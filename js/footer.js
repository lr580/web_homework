"use strict";
var banner_width = 1000 + 'px';
$(() => {
    footer_obj = $('#footer_frame');
    set_footer_position();
    $(window).scroll(set_footer_position).resize(set_footer_position);
})

var footer_height = 0,
    footer_top = 0,
    footer_obj;

function set_footer_position() {
    footer_height = footer_obj.height();
    footer_top = ($(window).scrollTop() + $(window).height() - footer_height) + 'px';
    if (($(document.body)).height() < $(window).height()) {
        footer_obj.css({ position: 'absolute' }).stop().animate({ top: footer_top });
    } else {
        footer_obj.css({ position: 'static' });
    }
}