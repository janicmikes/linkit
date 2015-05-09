(function ($) {
    var pulling;

    var pollDataFromServer = function () {
        clearTimeout(pulling);
        pulling = window.setTimeout(getDataFromServer, 5000);
    };

    function getDataFromServer() {
        $.ajax(
            '/links',
            {
                method: 'GET',
                cache: true
            }
        ).done(function (res) {
                $('#linklist').html(res);
                listen();
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


    var callback = function (response) {
        // stop pulling for smooth transitions
        clearTimeout(pulling);

        if (response !== undefined) {
            if (response.text && response.type == "error") {
                $('#messages').append("<div class='alert shown alert-danger'><button type='button' class='close'>×</button>" + response.text + "</div>");
            } else {
                $('#messages').append("<div class='alert shown alert-success'><button type='button' class='close'>×</button>" + response.text + "</div>");
            }
        }

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

        switch (response.action) {
            case 'delete':
                $('#link-' + response.id).fadeTo(500, 0).slideUp(300, function () {
                    $(this).remove();
                    pollDataFromServer();
                });
                break;
            case 'upvote':
                $('#linkvotes-' + response.id).text(response.value);
                // reload to get an ordered list
                getDataFromServer();
                break;
            case 'downvote':
                $('#linkvotes-' + response.id).text(response.value);
                // reload to get an ordered list
                getDataFromServer();
                break;
            case 'save':
                getDataFromServer();
                break;
            default:
                // force a reload
                pollDataFromServer();
        }
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
        ).always(callback);
    }

    function deleteLink(id) {
        $.ajax(
            '/links/' + id,
            {
                method: 'DELETE',
                dataType: "json"
            }
        ).always(callback);
    }

    function upvotelink(id) {
        $.ajax(
            '/links/' + id + '/up',
            {
                method: 'POST',
                dataType: "json"
            }
        ).always(callback);
    }

    function downvotelink(id) {
        $.ajax(
            '/links/' + id + '/down',
            {
                method: 'POST',
                dataType: "json"
            }
        ).always(callback);
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