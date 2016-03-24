<<<<<<< HEAD
var SpacebookApp = function () {
  var posts = [
    {
      text: "Hello world",
      id: 0,
      comments: [
         { text: "Man1, this is a comment!"},
         { text: "Man2, this is a comment!"},
         { text: "Man3, this is a comment!"}
      ]
   },
    {text: "Hello world", id: 1, comments:[
      { text: "Man, this is a comment!"},
      { text: "Man, this is a comment!"},
      { text: "Man, this is a comment!"}
    ]},
    {text: "Hello world", id: 2, comments:[
      { text: "Man, this is a comment!"},
      { text: "Man, this is a comment!"},
      { text: "Man, this is a comment!"}
    ]}
  ];

  var $posts = $('.posts');

  var createPost = function (text) {
    posts.push({ text: text });
  }

  var renderPosts = function () {
    $posts.empty();

    for (var i = 0; i < posts.length; i += 1) {
      var post = posts[i];

      var commentsContainer = '<div class="comments-container">' + '<div class="comments-list"></div>' +
      '<input type="text" class="comment-name">' +
      '<button class="btn btn-primary add-comment">Post Comment</button> </div>';

      $posts.append('<div class="post">'
        + '<a href="#" class="remove">remove</a> ' + '<a href="#" class="show-comments">comments</a> ' + post.text +
        commentsContainer + '</div>');
    }
  }

  var removePost = function (currentPost) {
    var $clickedPost = $(currentPost).closest('.post');

    var index = $clickedPost.index();

    posts.splice(index, 1);
    $clickedPost.remove();
  }

  var createComment = function (text, currentPost) {
     var comment = {
        text: text
     };
     var idx = $(currentPost).closest('.post').index();
     posts[idx].comments.push(comment);
  };


   var renderComments = function () {
    // removing elements and start rendering anew each element again
    $('.comments-list').empty();

    $(posts).map(function (idx) {
      $(this.comments).map(function () {
        $('.comments-list').eq(idx).append('<p>' + this.text + '<button class="btn btn-danger remove-comment">Remove</button></p>');
      });
    });
  };

  var removeComment  = function (currentPost) {
     var index = $(currentPost).closest('.post').index();
     var comment_idx = $(currentPost).parent().index();
    //  console.log(index, comment_idx);
     posts[index].comments.splice(comment_idx, 1);
     $(currentPost).parent().remove();
  };

  var toggleComments = function (currentPost) {
    var $clickedPost = $(currentPost).closest('.post');
    $clickedPost.find('.comments-container').toggleClass('show');
  }

  return {
     createPost: createPost,
     renderPosts: renderPosts,
     removePost: removePost,
     createComment: createComment,
     renderComments: renderComments,
     removeComment: removeComment,
     toggleComments: toggleComments
  }
}

var app = SpacebookApp();

// immediately invoke the render method
app.renderPosts();
app.renderComments();

// Events
$('.add-post').on('click', function (e) {
  e.preventDefault();

  var text = $('#post-name').val();
  app.createPost(text);

});

$('.posts').on('click', '.remove', function (e) {
   e.preventDefault();
  app.removePost(this);
});

$('.posts').on('click', '.add-comment', function (e) {
   e.preventDefault();
   var idx = $(this).closest('.post').index();
   var text = $('.comment-name').eq(idx).val();

   app.createComment(text, this);
   app.renderComments();
});

$('.posts').on('click', '.remove', function (e) {
      e.preventDefault();
      app.removePost(this);
});

$('.posts').on( 'click', '.remove-comment', function (e) {
      e.preventDefault();
      app.removeComment(this);
});

$('.posts').on('click', '.show-comments', function (e) {
      e.preventDefault();
      app.toggleComments(this);

});
=======
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
         id: id,
         comments: []
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

   function writeComment($userName, $input, $submit, id) {
      var comment = {
         user: '',
         text: '',
      }

      $submit.on('click', function () {
         comment.user =  $userName.val();
         comment.text =  $input.val();
         $input.parent().remove();
      });
      posts[id].comments.push(comment);
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
      var $ul = $('<ul class="list-unstyled"></ul>'),
            $li = $('<li></li>'),
            $span = ('<span></span>'),
            $form = $('<form></form>'),
            $userName = $('<input type="text"></input>'),
            $input = $('<input type="text"></input>'),
            $submit = $('<input type="submit" value="Submit"></input>'),
            id = $(this).parent().data().id;

      $(this).parent().append($form,$ul);
      $form.append($userName, $input, $submit);
      // var comment = writeComment($userName, $input, $submit);
      console.log($(this).parent().data().id);

      writeComment($userName, $input, $submit, id);
      // $ul.append($li.append($($span).html('User: ' + comment.user + 'writes a comment: ' + comment.text)));
   });



})(jQuery);
>>>>>>> master
