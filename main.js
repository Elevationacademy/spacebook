var SpacebookApp = function () {
  var posts = [
    {text: "Hello world", id: 1},
    {text: "Hello world", id: 2},
    {text: "Hello world", id: 3},
    {text: "Hello world", id: 4}
  ];

  // the current id to assign to a post
  var currentId = 5;
  var $posts = $('.posts');

  var _findPostById = function (id) {
    for (var i = 0; i < posts.length; i += 1) {
      if (posts[i].id === id) {
        return posts[i];
      }
    }
  }
  

  var createPost = function (text) {
    var post = {
      text: text,
      id: currentId
    }

    currentId += 1;

    posts.push(post);
  }

  var updatePosts = function () {
    $posts.empty();

    for (var i = 0; i < posts.length; i += 1) {
      var post = posts[i];
      $posts.append('<p class="post" data-id=' + post.id + '>'
        + '<a href="#" class="remove">remove</a> ' + post.text + '</p>');

    }
  }

  var removePost = function (currentPost) {
    var $clickedPost = $(currentPost).closest('.post');
    var id = $clickedPost.data().id;

    var post = _findPostById(id);

    posts.splice(posts.indexOf(post), 1);
    $clickedPost.remove();
  }

  updatePosts();

  return {
    createPost: createPost,
    updatePosts: updatePosts,
    removePost: removePost
  }
}

var app = SpacebookApp();

// Events
$('.add-post').on('click', function (e) {
  e.preventDefault();

  var text = $('#post-name').val();
  app.createPost(text);
  app.updatePosts();
});

$('.posts').delegate('a', 'click', function () {
  app.removePost(this);
});
