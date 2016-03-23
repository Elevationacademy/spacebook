$('.post-beer').on('click', function (e) {
  e.preventDefault();
});

var posts = [];

var fillArrayPosts = function fillArrayPosts (text, id) {
      var post = {
        texto: text,
        ident: id
      }
      posts.push(post);
}

var counterA = 0;

$('.add-post').on('click', function(e){

    e.preventDefault();


    var postText = $('#post-name').val();
    var idText =  counterA++; 


    fillArrayPosts(postText, idText);
    addPosts();
    bindEvents();
    comments();

});

var addPosts = function addPosts() {
    var commentBox = '<div class="commentBox"><input></input></div>';
    $('.posts').find('p').remove();
  for (var i=0; i < posts.length; i++) {
    $('.posts').append('<div id="bigContainer"><p class="post" data-id='+ posts[i].ident+'>'+' ' +posts[i].texto + '</br>' + '<a href="#" class="remove">'+ 'Remove</a>'+ ' ' + '<a href="#" class="comment">'+ 'Comment</a>'+ commentBox+ '<br>'+ commentBox+ '</p>');
  }
}

var bindEvents = function(){
$('.remove').on('click', function(){
        $(this).parent().remove();
        for (var i=0; i < posts.length; i++) {
            var a = posts[i].ident;
            var b = $(this).parent().data().id;
            if (a === b) {
                posts.splice(i,1);
                break;

            }

        };
        $(this).siblings().remove();
        for (var i=0; i < posts.length; i++) {
            var a = posts[i].ident;
            var b = $(this).siblings().data().id;
            if (a === b) {
                posts.splice(i,1);
                break;

            }

        }
         

});
};

var comments = function comments(){
    $('.comment').on('click', function(){
        $('.commentBox').toggleClass('show');
    });

}


