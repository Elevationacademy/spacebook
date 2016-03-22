(function ($) {
   var posts = [];

   // adding new post
   var addPost = function (input, id) {
      // initiate post
      var post = {
         text: input,
         id: id
      };

      localStorage["posts4Save"] = JSON.stringify(posts);
      console.log(localStorage["posts4Save"]);
      // if (localStorage["posts4Save"].length === 0) {
      //    localStorage["posts4Save"] = JSON.stringify(posts);
      // }
      // else {
      //    var stored = JSON.stringify(posts);
      //    console.log(stored);
      //    // localStorage["posts4Save"] =  stored.push(JSON.stringify(posts));
      // }

      posts.push(post);

      // localStorage["posts4Save"] = JSON.stringify(posts);
   };

   function updatePost () {
      // $('.posts').find('ul').empty();
      var storedData = JSON.parse(localStorage['posts4Save']);

      // if (storedData) {
      //    console.log(storedData);
      //    posts = storedData;
      //    getPostsToHtml(storedData);
      // } else {
         console.log(posts);
         getPostsToHtml(posts);
      // }
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
})(jQuery);
