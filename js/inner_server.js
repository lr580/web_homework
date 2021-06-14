"use strict";

onmessage = (e) => {
    switch (e.data.type) {
        case 1:
            update_nav(e.data.info);
            break;
    }
};

function update_nav(now_href) {

}