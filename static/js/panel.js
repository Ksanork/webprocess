function initOpenEvents(socket, elem) {
    $(".host:not(.disabled)").click(function() {
        //$(".host").click(function() {
        console.log("click");
        $("#hosts").fadeOut(1000);
        //$(".world-bg").fadeOut(1000);
        $(".panel-container").fadeIn(300);

        var t = this;
        $("#console-module").click(function() {
            //$(".host").click(function() {
            openConsole(socket, t);
        });
        
        $("#screenshot-module").click(function() {
            //$(".host").click(function() {
            getScreenshot(socket, t);
        });
    });
}

function openConsole(socket, elem) {
    $(".console-container").fadeIn();
    $(".panel-container").fadeOut();
    $(".world-bg2").fadeIn(1000);
    $("#hosts").fadeOut(1000);
    $("#console-text").focus();

    var host = $(elem);

    $("#console-text").keypress(function(e) {
        if (e.which == 13) {
            //console.log(host.attr("host-id"));
            //console.log($(this).val());

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
