$(function() {
    // These first three lines of code compensate for Javascript being turned on and off. 
    // It simply changes the submit input field from a type of "submit" to a type of "button".

    var paraTag = $('input#submit').parent('p');
    $(paraTag).children('input').remove();
    $(paraTag).append('<input type="button" name="submit" id="submit" value="Email Us Now!" />');

    $('#main input#submit').click(function() {
        $('#main').append('<img src="images/ajax-loader.gif" class="loaderIcon" alt="Loading..." />');

        var name = $('input#name').val();
        var email = $('input#email').val();
        var comments = $('textarea#comments').val();

        $.ajax({
            type: 'post',
            url: 'sendEmail.php',
            data: 'name=' + name + '&email=' + email + '&comments=' + comments,

            success: function(results) {
                $('#main img.loaderIcon').fadeOut(1000);
                $('ul#response').html(results);
            }
        }); // end ajax
    });
});

setCarouselHeight('#smack-carousel');

function setCarouselHeight(id)
{
  console.log("AHFDFSDF");
  var slideHeight = [];
  $(id+' .item').each(function()
  {
    // add all slide heights to an array
    slideHeight.push($(this).height());
  });

// find the tallest item
max = Math.max.apply(null, slideHeight);

// set the slide's height
$(id+' .carousel-content').each(function()
{
  $(this).css('height',max+'px');
});
}

