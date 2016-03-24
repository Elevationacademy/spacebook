var SpacebookApp = function () {
  var posts = [
    {text: "Hello world 1", comments:[
      { text: "Man, this is a comment!"},
      { text: "Man, this is a comment!"},
      { text: "Man, this is a comment!"}
    ]},
    {text: "Hello world 2", comments:[
      { text: "Man, this is a comment!"},
      { text: "Man, this is a comment!"},
      { text: "Man, this is a comment!"}
    ]},
    {text: "Hello world 3", comments:[
      { text: "Man, this is a comment!"},
      { text: "Man, this is a comment!"},
      { text: "Man, this is a comment!"}
    ]}
  ];

  var $posts = $('.posts');

  var createPost = function (text) {
    posts.push({ text: text, comments: []});
  }

  var renderPosts = function () {
    $posts.empty();

    for (var i = 0; i < posts.length; i += 1) {
      var post = posts[i];

      var commentsContainer = '<div class="comments-container">' + '<div class=comments-list></div>' +
      '<input type="text" class="comment-name">' +
      '<button class="btn btn-primary add-comment">Post Comment</button> </div>';

      $posts.append('<div class="post">'
        + '<a href="#" class="remove">remove</a> ' + '<a href="#" class="show-comments">comments</a> ' + post.text +
        commentsContainer + '</div>');
    }
  }

  var renderComments = function () {
    $('.comments-list').empty();

    for (var i = 0; i < posts.length; i += 1) {
      var post = posts[i];
      var index = posts.indexOf(post);
      var $post = $('.posts').find('.post').eq(index);

      for (var j = 0; j < post.comments.length; j += 1) {
        var comment = post.comments[j];

        $post.find('.comments-list').append(
          '<div class="comment">' + comment.text + 
          '<button class="btn btn-danger remove-comment">Remove Comment</button>' +
          '</div>'
        );
      };
    };
  };

  var removePost = function (currentPost) {
    var $clickedPost = $(currentPost).closest('.post');

    var index = $clickedPost.index();

    posts.splice(index, 1);
    $clickedPost.remove();
  }

  var toggleComments = function (currentPost) {
    var $clickedPost = $(currentPost).closest('.post');
    $clickedPost.find('.comments-container').toggleClass('show');
  }

  var createComment = function (text, postIndex) {
    var comment = { text: text };

    posts[postIndex].comments.push(comment);
  }

  var removeComment = function (currentComment) {
    var $clickedComment = $(currentComment).closest('.comment');

    var commentIndex = $clickedComment.index();
    var postIndex = $clickedComment.closest('.post').index();

    $clickedComment.remove();

    posts[postIndex].comments.splice(commentIndex, 1);
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

$('.posts').on('click', '.show-comments', function () {
  app.toggleComments(this);
});

$('.posts').on('click', '.add-comment', function () {
  var text = $(this).siblings('.comment-name').val();
  var postIndex = $(this).closest('.post').index();

  app.createComment(text, postIndex);
  app.renderComments();
});

$('.posts').on('click', '.remove-comment', function () {
  app.removeComment(this);
});