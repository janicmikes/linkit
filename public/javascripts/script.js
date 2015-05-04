(function ($) {
    $('.upvoteButton').click(function() {
        console.log('upvote');
        upvote(this.parentNode.parentNode.dataset.id);
    })
    function upvote(id) {
        $.ajax(
            '/links/' + id + '/up',
            {
                method:'POST'
            }
        ).done(function() {
                console.log('success');
        }).error(function() {
            console.log('failed');
        }).always(function() {
            console.log('fertig');
        })
    }
}) (jQuery);