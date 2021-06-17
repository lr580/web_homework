$(() => {
    // console.log('qwq');
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
                console.log(this.result);
            }
            reader.readAsText(file);
        }
    }
}