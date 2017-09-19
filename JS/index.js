var key = "e5ea7f1b8855e4b94adbc5737e995abb";
var base_url='https://developers.themoviedb.org/3';
var session = localStorage.getItem("session_id") || null; 
var logged_in_as = localStorage.getItem("logged_in_as") || null;
var request_token_account = null;

console.log(session);

function setDownUserID(x){
  localStorage.setItem("person_idd",x);
}

function logout()
{
  session = null;
  localStorage.removeItem("session_id");
  logged_in_as = null;
  localStorage.removeItem("logged_in_as");
  localStorage.removeItem("username");
  location.reload();
}

function displayLoginInfo()
{
  console.log("now-here");
  var url_for_user_id = 'https://api.themoviedb.org/3/account?api_key=' + key + '&session_id=' + session;
  console.log(url_for_user_id);
   $.getJSON(url_for_user_id,function(data){
    console.log(data);
    localStorage.setItem("account_id",data.id);
    $('#make_this_disappear').css("display","none");
    var this_user_name = data.username;
    localStorage.setItem("username",data.username);
    console.log(localStorage.getItem("username"));
    console.log(this_user_name);
    $('#place_acc_info_here').text("Logged in as " + this_user_name);
    $('#make_it_appear').css("display","inline-block");
  });
}

function getSessionID()
{
 if(getUrlVars()["approved"]=="true"){
  var url_for_session_id = 'https://api.themoviedb.org/3/authentication/session/new?api_key=' + key + '&request_token=' + getUrlVars()["request_token"];
  console.log(url_for_session_id);
  $.getJSON(url_for_session_id,function(data){
   localStorage.setItem("session_id",data.session_id);
   localStorage.setItem("logged_in_as","account");
   console.log(data.session_id);
   session = data.session_id;
   displayLoginInfo();
 });
} 
}

function getRequestToken()
{
  var url_for_token = 'https://api.themoviedb.org/3/authentication/token/new?api_key=' + key;
  $.getJSON(url_for_token,function(data){
    request_token_account = data.request_token;
    console.log('Account Token: ' + request_token_account);
  });
}

 if ( session == null) {
  session = null;
  getSessionID();
} else {
  console.log("else");
  displayLoginInfo();
}






function getUrlVars()
{   
 var vars = [], hash;
 var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
 for(var i = 0; i < hashes.length; i++)
 {
  hash = hashes[i].split('=');
  vars.push(hash[0]);
  vars[hash[0]] = hash[1];
}
return vars;
}

getSessionID();


$(document).ready(function(){

  console.log(localStorage.getItem("logged_in_as"));
  console.log(localStorage.getItem("session_id"));

  /*Set the time period the carousel.*/
  $('.carousel').carousel({
    interval: '2000',
  })
  /*End code*/

  /*Code for getting image of a single trending movie and TV Show to be displayed on the caraousel.*/
  var url_for_one_poster_movie= "https://api.themoviedb.org/3/movie/popular?&language=en-US&api_key=" + key;
  var url_for_one_poster_tvshow = "https://api.themoviedb.org/3/tv/popular?api_key=" + key + "&language=en-US&page=1";
  console.log(url_for_one_poster_movie);
  console.log(url_for_one_poster_tvshow);
  var id;
  $.getJSON(url_for_one_poster_movie,function(data){
    id = (data.results[0].id);
		// console.log(id);
		var url_for_movie = 'https://api.themoviedb.org/3/movie/' + id + '/images?' + 'api_key=' + key;
		// console.log(url_for_movie);
		$.getJSON(url_for_movie,function(data){
			// console.log(data.backdrops);
			var string;
			$.each(data.backdrops,function(i,j){
				// console.log(j.height);
				var min = 1000000;
				if(j.height<=min && j.height>=800){
					min=j.height;
					string = 'http://image.tmdb.org/t/p/w780' + j.file_path;
				}
			});
			applyimage(string,"movie");
		});
	});



  $.getJSON(url_for_one_poster_tvshow,function(data){
    id = (data.results[0].id);
		var url_for_tvshow = 'https://api.themoviedb.org/3/tv/' + id + '/images?' + 'api_key=' + key;
		// console.log(url_for_tvshow);
		$.getJSON(url_for_tvshow,function(data){
			// console.log(data.posters);
			var string;
			$.each(data.backdrops,function(i,j){
				var min = 1000000;
				if(j.height<=min && j.height>=800){
					min=j.height;
					string = 'http://image.tmdb.org/t/p/w780' + j.file_path;
				}
			});
			applyimage(string,"tvshow");
		});
	});


function applyimage(str,where){
   var to_append;
   if(where=="movie")
    to_append='#movie_image';
  else
    to_append='#tv_image';
  var url = 'http://image.tmdb.org/t/p/original' + str ;
  var html = '<img src="' + str + '" alt="Loading.!"></img>';
	// console.log(xx);
	$(html).css({
		"width": "100%",
	}).appendTo(to_append);
	
}


/*This code make the text appear below the carousel unlike given in the bootstrap documentation*/
$('.carousel').carousel();
var caption = $('div.item:nth-child(1) .carousel-caption');
$('.new-caption-area').html(caption.html());
caption.css('display', 'none');

$(".carousel").on('slide.bs.carousel', function (evt) {
  var caption = $('div.item:nth-child(' + ($(evt.relatedTarget).index() + 1) + ') .carousel-caption');
  $('.new-caption-area').html(caption.html());
  caption.css('display', 'none');
});


//Add details of popular person.

var url_for_people = 'https://api.themoviedb.org/3/person/popular?api_key=' + key + '&language=en-US&page=1';
$.getJSON(url_for_people,function(data){
  $.each(data.results,function(i,j){
    if(i==6)
      return false;
    console.log(j.name);
    console.log(j.id);
    var person_details = 'https://api.themoviedb.org/3/person/' + j.id +'?api_key='+ key +'&language=en-US';
    console.log(person_details);
    var string = '<p><a href="person.html" onclick="setDownUserID('+  j.id +')">' + j.name +'</a></p>';
    $("#place_user_here").append(string);
    console.log(string);
  });
});

/*Check whether user has added a search type or not.!*/
function getvaluefromA(){
 var x = $('#search-div .form-control').val();
 console.log(x);
 if(x=='Select what to do search for.')
  return false;
else{
  localStorage.setItem("searchtype",x);
  return true;
}
}


/*Check whether user has added some data to search or not.*/
function getvaluefromB(){
 var x = $('#searchData').val();
 if(x.length==0)
  return false;
else{
  localStorage.setItem("searchfor",x);
  return true;
}
}


/*Control the behaviour of the search button.*/
$('#searchButton').on('click',function(){
 var a = getvaluefromA();
 var b = getvaluefromB();
 console.log(localStorage.getItem("searchtype"));
 console.log(localStorage.getItem("searchfor"));
 if(!a){
  $('#err_msg').text('Please select an option');
  $('#err_msg').css('display','block');
  return;
}
if(!b){
 $('#err_msg').text('Please enter something to search for.');
 $('#err_msg').css('display','block');
 return;
}
window.location = 'search.html';
});



$('#login-type').on('change', function(){
  if ($(this).val() == 'account') {
    getRequestToken();
  }
});


/*Control the behaviour of the top */

$('#login').click(function(){
  var x = $("#login-type").val();
  console.log(x);
  if(x=='account' && request_token_account!=null){
   var url_for_auth = 'https://www.themoviedb.org/authenticate/' + request_token_account + '?redirect_to=http://www.harshproject.surge.sh';
   window.location = url_for_auth;
  }
 else if(x=='guest'){
    var url_for_token = 'https://api.themoviedb.org/3/authentication/guest_session/new?api_key=' + key;
    console.log(url_for_token);
    $.getJSON(url_for_token,function(data){
      localStorage.setItem("logged_in_as","guest");
      localStorage.setItem("session_id",data.guest_session_id);
      $('#make_this_disappear').css("display","none");
      $('#place_acc_info_here').text("Logged in as Guest");
      $('#make_it_appear').css("display","inline-block");
    })
  }
  else{
    $('#make_this_disappear').css('display', 'block');
  }
});



});


//http://www.harshproject.surge.sh
// http://localhost:3000/index.html






