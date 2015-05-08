(function ($) {
    var timeout;
    var pulling;
    var counter = 0;

    function pollDataFromServer() {
        //console.log('restart timer');
        //clearTimeout(pulling);
        pulling = window.setTimeout(getDataFromServer, 2000);
    }

    function getDataFromServer() {
        //if ($('#enablepull')[0].checked == true) {
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
                    //console.log("success");
                })
                .fail(function () {
                    //console.log("error");
                })
                .always(function (res) {

                    //pollDataFromServer();

                });
        //}
        pollDataFromServer();
    }

    getDataFromServer();

    $("#newlinksubmit").click(function () {
        saveLink();
        $('form[name=addlink]')[0].reset();
    });


    var debugmessage = function (response) {
        if (response !== undefined) {
            if (response.type == "error") {
                $('#messages').append("<div class='alert shown alert-danger'><button type='button' class='close'>×</button>" + response.text + "</div>");
            } else {
                $('#messages').append("<div class='alert shown alert-success'><button type='button' class='close'>×</button>" + response.text + "</div>");
            }
        }
        //getDataFromServer();
        //timing the alert box to close after 5 seconds
        window.setTimeout(function (counter) {
            $('.alert.shown').first().removeClass('shown').fadeTo(500, 0).slideUp(500, function () {
                $(this).remove();
            });
        }, 5000);

        //Adding a click event to the 'x' button to close immediately
        $('.alert .close').last().on("click", function (e) {
            $(this).parent().fadeTo(500, 0).slideUp(500, function () {
                $(this).remove();
            });
        });
    };

    function saveLink() {
        $.ajax(
            '/links',
            {
                method: 'PUT',
                data: {
                    title: document.forms.addlink.title.value,
                    url: document.forms.addlink.url.value,
                    description: document.forms.addlink.description.value
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

        $('#linkvotes-' + id).text(+$('#linkvotes-' + id).text() + 1);

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