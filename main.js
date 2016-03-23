(function ($) {
   var posts = [];

   var storage = {
      // localStorage["posts4Save"] = JSON.stringify(posts);
       // localStorage["posts4Save"] =  stored.push(JSON.stringify(posts));
   }

   // adding new post
   var addPost = function (input, id) {
      // initiate post
      var post = {
         text: input,
         id: id
      };

      posts.push(post);
   };

   function updatePost () {
      // $('.posts').find('ul').empty();
      getPostsToHtml(posts);
   }

   function getPostsToHtml (data) {
      var $li = $('<li></li>');
      $('.posts').find('ul').append($li);

      $.each(data, function(i, v) {
         $li.addClass('post').attr('data-id', v.id);
         // $li.append($('<a href="#" class="remove">remove</a>')).text(v.text);
         $li.html('<a href="#" class="remove"><i class="fa fa-times"></i></a>' + v.text);
         $li.append('<a href="#" class="add-comment"><i class="fa fa-comment"></i></a>' );
      });
   }

   function writeComment($label, $input, $submit) {


   }

   // add post event
   $('.add-post').on('click', function (e) {
      e.preventDefault();
      var input = $('#post-name').val(),
            id = posts.length;
      $('#post-name').val('');

      addPost(input, id);
      updatePost();
   });

   // remove event click
   $('ul').on('click', '.remove', function (e) {
      e.preventDefault();
      // removing html element
      $(this).parent().remove();

      // removing element from array
      posts.splice($(this).parent().data().id, 1);
   });

   // add comment
   $('ul').on('click','.add-comment', function (e) {
      var $ul = $('<ul></ul>'),
            $li = $('<li></li>'),
            $span = ('<span></span>'),
            $form = $('<form></form>'),
            $userName = $('<input type="text"></input>'),
            $input = $('<input type="text"></input>'),
            $submit = $('<input type="submit" value="Submit"></input>'),

      console.log($(this).parent().has('form').length);

      if($(this).parent().has('form').length) {
            $form.append($userName, $input, $submit);
            writeComment($userName, $input, $submit);
      } else {
         $(this).parent().append($form);
         $form.append($userName, $input, $submit);
         console.log($(this).parent().has('form'));
         writeComment($userName, $input, $submit);
      }
   });



})(jQuery);
