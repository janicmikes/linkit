(function ($) {

    function success(response) {
        if (response.type == "error") {
            $('#messages').html("<div class='alert alert-danger'><button type='button' class='close'>×</button>" + response.text + "</div>");
        } else {
            $('#messages').html("<div class='alert alert-success'><button type='button' class='close'>×</button>" + response.text + "</div>");
        }

        //timing the alert box to close after 5 seconds
        window.setTimeout(function () {
            $(".alert").fadeTo(500, 0).slideUp(500, function () {
                $(this).remove();
            });
        }, 5000);

        //Adding a click event to the 'x' button to close immediately
        $('.alert .close').on("click", function (e) {
            $(this).parent().fadeTo(500, 0).slideUp(500);
        });
    }

    function error() {
        $('#messages').html("<div class='alert alert-danger'>An Error occurred!</div>");
    }

    function saveLink() {
        $.ajax(
            '/links',
            {
                method: 'PUT',
                cache: false,
                data: {
                    title: $("#newlinktitle")[0].value,
                    url: $("#newlinkurl")[0].value
                },
                dataType: "json",
                success: success,
                error: error
            }
        );
    }

    function deleteLink(id) {
        $.ajax(
            '/links/' + id,
            {
                method: 'DELETE',
                cache: false,
                dataType: "json",
                success: success,
                error: error
            }
        );
    }

    function upvotelink(id) {
        $.ajax(
            '/links/' + id + '/up',
            {
                method: 'POST',
                cache: false,
                dataType: "json",
                success: success,
                error: error
            }
        );
    }

    function downvotelink(id) {
        $.ajax(
            '/links/' + id + '/down',
            {
                method: 'POST',
                cache: false,
                dataType: "json",
                success: success,
                error: error
            }
        );
    }

    $(function () {
        $("#newlinksubmit").click(function () {
            var $btn = $(this).button('loading');
            saveLink();
            $btn.button('reset');
        });

        $(".deletelink").click(function () {
            deleteLink(this.dataset.id);
            //$('#link-' + this.dataset.id).remove();
            $('#link-' + this.dataset.id).fadeTo(500, 0).slideUp(300, function () {
                $(this).remove();
            });
        });

        $(".upvotelink").click(function () {
            upvotelink(this.dataset.id);
            $('#linkvotes-' + this.dataset.id).text($('#linkvotes-' + this.dataset.id).text() - -1);
        });

        $(".downvotelink").click(function () {
            downvotelink(this.dataset.id);
            $('#linkvotes-' + this.dataset.id).text($('#linkvotes-' + this.dataset.id).text() - 1);
        });
    });

})(jQuery);