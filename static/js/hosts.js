//autoryzacja??? - sprawdzanie ip po stronie serwera, musi byc takie same
$(document).ready(function() {
    var socket = new WebSocket('ws://webprocess-ksanork.rhcloud.com:8000'), gethosts = {
        'type' : 'get-hosts',
        'content' : null
    };

    $(".console-container").hide();
    $(".world-bg2").hide();
    $(".panel-container").hide();

    socket.onopen = function() {
        console.log("open");
        this.send(JSON.stringify(gethosts));

        socket.onmessage = function(msg) {

            var json = JSON.parse(msg.data), t = this;
            console.log(json.content);
            switch(json.type) {
            case "get-hosts-result":
                for (var i = 0; i < json.content.length; i++) {
                    var enabledclass = '';
                    
                        enabledclass = 'disabled';

                    console.log(json.content[i]);

                    if (!json.content[i].connected)
                        var $div = $("<div>", {"host-id": "json.content[i]._id", class: "host disabled"});
                    else 
                        var $div = $("<div>", {"host-id": json.content[i]._id, "class": "host", "date": json.content[i].date});
                    
                    //var div = "<div host-id=\"" + json.content[i]._id + "\" class=\"host " + enabledclass + "\">" + "<img src=\"static/img/host.png\" />" + "<span class=\"name\">" + json.content[i].name + "</span>" + "</div>";
                    
                    $div.html("<img src=\"static/img/host.png\" />" + "<span class=\"name\">" + json.content[i].name + "</span>");
                   

                    /*if (json.content[i].connected) {
                        console.log("ahoooj");
                        $(div).date = json.content[i].date;
                        console.log(json.content[i].date + " = " + $(div).date);
                    }*/
                        
                         

                    $('#hosts').append($div);
                }

                initOpenEvents(socket, null);

                /*$(".host:not(.disabled)").click(function() {
                 //$(".host").click(function() {
                 $(".console-container").fadeIn();
                 $(".world-bg2").fadeIn(1000);
                 $("#hosts").fadeOut(1000);
                 $("#console-text").focus();

                 var host = $(this);

                 $("#console-text").keypress(function(e) {
                 if(e.which == 13) {
                 //console.log(host.attr("host-id"));
                 //console.log($(this).val());

                 var html = $("#output").html();
                 html += "> " + $(this).val() + "<br /><br />";
                 $("#output").html(html);

                 t.send(JSON.stringify({
                 "type": "process-execute",
                 "content": {
                 "id": host.attr("host-id"),
                 "command": $(this).val()
                 }
                 }));
                 }
                 });

                 });*/
                break;
            case "process-execute-result":
                //var result = repairTabs(json.content);

                //$("#output").html(repairTabs(nl2br(htmlEntities(json.content))));
                var html = $("#output").html();
                html += repairTabs(nl2br(htmlEntities(json.content)));
                html += "<br />";

                $("#output").html(html);
                $("#console-text").val("");

                $("#output").animate({
                    scrollTop : $("#output").prop("scrollHeight")
                }, 1000);
                //$("#output").animate({ scrollTop:  $("#output").scrollTop() }, "slow");

                console.log("odebrano process-execute-result");
                console.log(json.content);
                break;
            case "screenshot-show":
                $("#panel-wrapper").append('<img class="screenshot" src="screen.png" />');
                break;
            }
        };
    };
});

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
