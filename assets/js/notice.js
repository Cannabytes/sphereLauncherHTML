Codebase.helpersOnLoad(['jq-notify']);
function ResponseNotice(response) {
    if(response.type!=="notice"){
       return false;
    }
    if(response === undefined || response === ""){
        return false
    }
    console.log(response);

    if(response.donate_bonus!==undefined){
        $(".count_sphere_coin").text(response.donate_bonus)
    }

    let icon = response.ok ? "check" : "exclamation-triangle"
    Codebase.helpers('jq-notify', {
        align: 'center',
        from: 'top',
        type: response.ok ? "success": "danger",
        icon: "fa fa-"+icon+" me-2",
        message: response.message
    });

    if(response.reloadCaptcha !== undefined){
        get_captcha()
    }

    if (response.redirect !== undefined){
        setTimeout(function() {
            window.location.href = response.redirect;
        }, 1000);
    }
    return response.ok;
}

function ResponseNoticeRegistration(response) {
    let icon = response.ok ? "check" : "exclamation-triangle"
    Codebase.helpers('jq-notify', {
        align: 'center',
        from: 'top',
        type: response.ok ? "success": "danger",
        icon: "fa fa-"+icon+" me-2",
        message: response.message
    });

    if(response.isDownload){
        var blob = new Blob([response.content], { type: "text/plain" });
        var link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = response.title;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    if (response.redirect !== undefined){
        setTimeout(function() {
            window.location.href = response.redirect;
        }, 1000);
    }
}

function notify_success(message) {
    if(message===undefined){
        return
    }
    Codebase.helpers('jq-notify', {
        align: 'center',
        from: 'top',
        icon: "fa fa-check me-2",
        message: message
    });
}

function notify_error(message) {
    if(message===undefined){
        return
    }
    Codebase.helpers('jq-notify', {
        align: 'center',
        from: 'top',
        icon: "fa fa-check me-2",
        type: "danger",
        message: message
    });
}

function ResponseNoticeSetAvatar(response){
    if(response.type!=="notice_set_avatar"){
        return false;
    }
    $(".user_self_avatar").attr("src", response.src);
    $(".count_sphere_coin").text(response.count_sphere_coin);
    if (response.ok){
        notify_success(response.message);
    }
    if (response.ok === false){
        notify_error(response.message);
    }
}