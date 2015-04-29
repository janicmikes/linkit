(function ($) {

    function saveLink(onTimeAvailable, onTimeError) {
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
                success: onTimeAvailable,
                error: onTimeError
            }
        );
    }

    $(function () {
        $("#newlinksubmit").click(function () {
            var $btn = $(this).button('loading');
            saveLink(
                function (response) {
                    if (response.type == "error") {
                        $('#messages').html("<div class='alert alert-danger'><button type='button' class='close'>×</button>"+response.text+"</div>");
                    } else {
                        $('#messages').html("<div class='alert alert-success'><button type='button' class='close'>×</button>"+response.text+"</div>");
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
                   // $("#time").text(response.time);
                }, function () {
                    $('#messages').html("<div class='alert alert-danger'>An Error occurred!</div>");
                }
            );
            $btn.button('reset');
        });
    });

})(jQuery);