var $activemodul = null;

function initOpenEvents(socket, elem) {
    $(".host:not(.disabled)").click(function() {
        console.log("click");
        $("#hosts").fadeOut(1000);
        $(".panel-container").fadeIn(300);

        $("#panel-date").html('Uruchomiony: <span class="panel-date-red">' + $(this).attr("date") + '</span>');

        var t = this;
        $("#console-module").click(function() {
            openConsole(socket, t);
        });

        $("#screenshot-module").click(function() {
            getScreenshot(socket, t);
        });

        $("#panelback").click(function() {
            $(".panel-container").fadeOut(500);
            $("#hosts").fadeIn(500);
        });

        $(".module-back").click(function() {
            $activemodule.fadeOut(500);
            $(".panel-container").fadeIn(500);
        });
    });
}

function openConsole(socket, elem) {
    $activemodule = $(".console-container");

    $(".console-container").fadeIn();
    $(".panel-container").fadeOut();
    $(".world-bg2").fadeIn(1000);
    $("#hosts").fadeOut(1000);
    $("#console-text").focus();

    var host = $(elem);

    $("#console-text").keypress(function(e) {
        if (e.which == 13) {
            var html = $("#output").html();
            html += "> " + $(elem).val() + "<br /><br />";
            $("#output").html(html);

            socket.send(JSON.stringify({
                "type" : "process-execute",
                "content" : {
                    "id" : host.attr("host-id"),
                    "command" : $(this).val()
                }
            }));
        }
    });
}

function getScreenshot(socket, elem) {
    socket.send(JSON.stringify({
        "type" : "screenshot-execute",
        "content" : {
            "id" : $(elem).attr("host-id")
        }
    }));
}

function showScreenshot() {
    $("#screenshot-container").show();
    $activemodule = $("#screenshot-container");

    $("#screenshot-container").append('<img class="screenshot" src="screen.png" />');
}
