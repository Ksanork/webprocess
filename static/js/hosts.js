//autoryzacja??? - sprawdzanie ip po stronie serwera, musi byc takie same
var socket = null;

$(document).ready(function() {
    socket = new WebSocket('ws:/webprocess-ksanork.rhcloud.com:8000');
    socket.onopen = function() {
        console.log("open");
        getHosts();

        socket.onmessage = function(msg) {
            $("#throbber").hide();
            var json = JSON.parse(msg.data), t = this;
            console.log(json.content);

            switch(json.type) {
                case "get-hosts-result":
                    showHosts(json.content);
                    break;
                case "process-execute-result":
                    addToConsole(json.content);
                    break;
                case "show-throbber":
                    $("#throbber").show();
                    break;
                case "screenshot-show":
                    $("#throbber").hide();
                    showScreenshot();
                    break;
                }
            };
    };
});

function getHosts() {
    var gethosts = {
        'type' : 'get-hosts',
        'content' : null
    };

    socket.send(JSON.stringify(gethosts));
    $("#throbber").show();
}

function showHosts(content) {
    for (var i = 0; i < content.length; i++) {
        var enabledclass = 'disabled';

        console.log(content[i]);

        if (!content[i].connected)
            var $div = $("<div>", {
                "host-id" : content[i]._id,
                "class" : "host disabled"
            });
        else
            var $div = $("<div>", {
                "host-id" : content[i]._id,
                "class" : "host",
                "date" : content[i].date
            });

        $div.html("<img src=\"static/img/host.png\" />" + "<span class=\"name\">" + content[i].name + "</span>");

        $('#hosts').append($div);
    }

    initOpenEvents(socket, null);
}

function addToConsole(content) {
    var html = $("#output").html();
    html += repairTabs(nl2br(htmlEntities(content)));
    html += "<br />";

    $("#output").html(html);
    $("#console-text").val("");

    $("#output").animate({
        scrollTop : $("#output").prop("scrollHeight")
    }, 1000);

    console.log("odebrano process-execute-result");
    console.log(json.content);
}

function repairTabs(str) {
    return (str + '').replace(/\s /g, '&nbsp;');
}

function nl2br(str, is_xhtml) {
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}

function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
