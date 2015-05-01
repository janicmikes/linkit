(function ($) {
    var timeout;
    var pulling;

    function pollDataFromServer() {
        console.log('restart timer');
        clearTimeout(pulling);
        pulling = window.setTimeout(getDataFromServer, 2000);
    }

    function getDataFromServer() {
        $.ajax(
            '/links',
            {
                method: 'GET',
                cache: true
            }
        )
            .done(function (res) {
                $('#linklist').html(res);
                listen();
                console.log("success");
            })
            .fail(function () {
                console.log("error");
            })
            .always(function (res) {
                pollDataFromServer();
            });

    }

    getDataFromServer();

    $("#newlinksubmit").click(function () {
        saveLink();
        $('form[name=addlink]')[0].reset();
    });

    function pullLinks() {
        $.ajax(
            '/links',
            {
                method: 'GET',
                cache: true
            }
        )
            .done(function () {
                console.log("success");
            })
            .fail(function () {
                console.log("error");
            })
            .always(function (res) {
                debugmessage(res);
                window.setTimeout(pullLinks, 50000);
            });


    }

    function debugmessage(response) {
        if (response != undefined) {
            if (response.type == "error") {
                $('#messages').html("<div class='alert alert-danger'><button type='button' class='close'>×</button>" + response.text + "</div>");
            } else {
                $('#messages').html("<div class='alert alert-success'><button type='button' class='close'>×</button>" + response.text + "</div>");
            }
        }
        getDataFromServer();
        //timing the alert box to close after 5 seconds
        clearTimeout(timeout);
        timeout = window.setTimeout(function () {
            $(".alert").fadeTo(500, 0).slideUp(500, function () {
                $(this).remove();
            });
        }, 5000);

        //Adding a click event to the 'x' button to close immediately
        $('.alert .close').on("click", function (e) {
            $(this).parent().fadeTo(500, 0).slideUp(500);
        });
    }

    function saveLink() {
        $.ajax(
            '/links',
            {
                method: 'PUT',
                data: {
                    title: $("#newlinktitle")[0].value,
                    url: $("#newlinkurl")[0].value
                },
                dataType: "json"
            }
        ).always(debugmessage);
    }

    function deleteLink(id) {
        $.ajax(
            '/links/' + id,
            {
                method: 'DELETE',
                dataType: "json"
            }
        ).always(debugmessage);

        $('#link-' + id).fadeTo(500, 0).slideUp(300, function () {
            $(this).remove();
        });
    }

    function upvotelink(id) {
        $.ajax(
            '/links/' + id + '/up',
            {
                method: 'POST',
                dataType: "json"
            }
        ).always(debugmessage);

        $('#linkvotes-' + id).text($('#linkvotes-' + id).text() - -1);

    }

    function downvotelink(id) {
        $.ajax(
            '/links/' + id + '/down',
            {
                method: 'POST',
                dataType: "json"
            }
        ).always(debugmessage);

        $('#linkvotes-' + id).text($('#linkvotes-' + id).text() - 1);
    }

    function listen() {
        $(".deletelink").click(function () {
            deleteLink(this.dataset.id);
        });

        $(".upvotelink").click(function () {
            upvotelink(this.dataset.id);
        });

        $(".downvotelink").click(function () {
            downvotelink(this.dataset.id);
        });

    }

})(jQuery);