
var warning = {

    init: function () {

        var counter = 9000;
        form = function (t) {
            var minutes = Math.floor(t / 600),
                seconds = Math.floor((t / 10) % 60);
            minutes = (minutes < 10) ? "0" + minutes.toString() : minutes.toString();
            seconds = (seconds < 10) ? "0" + seconds.toString() : seconds.toString();
            $('.av-warning-timer').text(minutes + ":" + seconds + "." + "0" + Math.floor(t % 10));

        };
        setInterval(function () {
            counter--;
            form(counter);
            if (counter == 0) counter = 9000;
        }, 100);

    }

}
warning.init();