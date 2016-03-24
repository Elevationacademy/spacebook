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
    {text: "Hello world", id: 0, comments:[
      { text: "Man, this is a comment!"},
      { text: "Man, this is a comment!"},
      { text: "Man, this is a comment!"}
    ]},
    {text: "Hello world", id: 0, comments:[
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

      var commentsContainer = '<div class="comments-container">' +
      '<input type="text" id="comment-name">' +
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
      $('.post p').empty();
      $.each(posts, function (i, v) {
         $.each(v.comments, function (idx, val) {
            $('.post').eq(i).append( '<p>' + val.text + '<button class="btn btn-danger remove-comment">Remove</button><p>');
         });
      });
  };

  var removeComment  = function (currentPost) {
     var index = $(currentPost).closest('.post').index();
     console.log(index);
     var comment = posts[index].comments;

     console.log(comment);

   //   post.comments.splice(posts.comments.indexOf(post), 1);
   //   $clickedPost.remove();
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
  app.renderPosts();
});

$('.posts').on('click', '.remove', function () {
  app.removePost(this);
});

$('.posts').on('click', '.add-comment', function (e) {
   e.preventDefault();
   var text = $('#comment-name').val();
   console.log(text);
   app.createComment(text, this);
   app.renderComments();
});

$('.posts').on('click', '.remove', function () {
  app.removePost(this);
});

$('.posts').on( 'click', '.remove-comment', function () {
  app.removeComment(this);
});

$('.posts').on('click', '.show-comments', function () {
  app.toggleComments(this);
});
