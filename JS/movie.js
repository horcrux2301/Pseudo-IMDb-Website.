var key = "e5ea7f1b8855e4b94adbc5737e995abb";
var id =  localStorage.getItem("movie_idd");
var session = localStorage.getItem("session_id");
var account_id = localStorage.getItem("account_id");
var no_of_actor=0;
var logged_in_as_here = localStorage.getItem("logged_in_as");


function setProfile(pid){
	localStorage.setItem("searchtype","celeb");
	localStorage.setItem("person_idd", pid);
	window.location = "person.html";
}

function setrecommendid1(x){
	localStorage.setItem("searchtype","Movie");
	localStorage.setItem("movie_idd",x);
}

console.log(id);



$(document).ready(function($) {
		var url =  'https://api.themoviedb.org/3/movie/' + id + '/images?' + 'api_key=' + key; 
		$.getJSON(url,function(data){
			var string;
			console.log(data); 
			string = 'http://image.tmdb.org/t/p/original/' + data.posters[0].file_path;

			$('#movie-jumbo').css({
				"background-color": "#fff"
			});
			$('#movie-jumbo').html('<img src="'+string+'" style="width:100%;height:600px;" />');
		});

		/*Get all the movie details here*/
		var for_details_url = 'https://api.themoviedb.org/3/movie/' + id + '?api_key=' + key + '&language=en-US';
		$.getJSON(for_details_url,function(data){
			var value_rating = data.vote_average;
			$("#stars").rating({min:1, stars:10, max:10, step:0.1, size:'xs',hoverEnabled:false,disabled:true});
			$('#stars').rating('update', value_rating);
			var title = data.original_title;
			$('#overview').append('<h1>' + title + '</h1>');
				var overview = data.overview;
				$('#overview').append('<p>' + overview + '</p>');
		});

		var url_for_cast = 'https://api.themoviedb.org/3/movie/' + id + '/credits?api_key=' + key;
		console.log(url_for_cast);
		$.getJSON(url_for_cast,function(data){
			console.log(data);
			var x=0;
			$.each(data.cast,function(i,j){
				var x=0;
				var id_of_person = j.id;
				var url_for_name = 'https://api.themoviedb.org/3/person/' + id_of_person +'?api_key=' + key + '&language=en-US';
				var url_for_image = 'https://api.themoviedb.org/3/person/' + id_of_person +'/images?api_key=' + key;
				$.getJSON(url_for_name,function(data){
					func(data.name,url_for_image,id_of_person);
					console.log(data.name);
					no_of_actor++;
					console.log(no_of_actor);
				});
				if(i==8)
					return false;
			});
		});

		function func(name,url_for_image,id_person){	
				$.getJSON(url_for_image,function(data){
				if(data.profiles[0]){
					console.log(data.profiles[0].file_path);
				var path = data.profiles[0].file_path;
				console.log(path);
				var image_url  = 'http://image.tmdb.org/t/p/w154' + path;
				console.log(image_url);
				var cast_item = $('#cast_template').clone();
				cast_item.css('display','inline-block');
				cast_item.find('.person-id').val(id_person);
				cast_item.find('.view-link').attr('data-pid', id_person);
				cast_item.attr('id','cast-' + name.split(' ')[0]);
				cast_item.find('.cast-img').attr('src',image_url);
				cast_item.find('.cast-name').text(name);
				$('#cast').append(cast_item);
				}
				});
		}

		var url_for_recommendations = 'https://api.themoviedb.org/3/movie/' + id + '/recommendations?api_key=' + key + '&language=en-US&page=1';
 		console.log(url_for_recommendations);
 		$.getJSON(url_for_recommendations,function(data){
 			$.each(data.results,function(i,j){
 				console.log(j.id);
 				addrecommend(j.id);
 				if(i==2)
 					return false;
 			});
 		});

 		function addrecommend(x){
 			var url_for_movie_name  = 'https://api.themoviedb.org/3/movie/' + x +'?api_key=' + key + '&language=en-US';
 			$.getJSON(url_for_movie_name,function(data){
 				console.log(data.original_title);
 				var string1 = '<ul><h4><a href="movie.html" onclick="setrecommendid1('+ x +')" >'+ data.original_title +'</a></h4></ul>';
 				console.log(string1);
 				$('#recommend').append(string1);
 			});
 		}

 		console.log(session);
 		if(session!=null){
 			var user_search = 'https://api.themoviedb.org/3/account/'+ account_id  +'/rated/movies?api_key=' + key + '&language=en-US&sort_by=created_at.desc&page=1&session_id=' + session;
 			$.getJSON(user_search,function(data){
 				console.log(data);
 			});
 			$('#rating_user').css("display" , "inline-block");
 			var url_for_post = 'https://api.themoviedb.org/3/movie/'+ id +'/rating?api_key=' + key;
 			console.log(logged_in_as_here);
 			if(logged_in_as_here=="guest"){
 				url_for_post += '&guest_session_id=' + session;
 			}
 			else{
 				url_for_post += '&session_id=' + session;
 			}
 			console.log(url_for_post);
 			$("#stars1").rating({min:1, stars:10, max:10, step:0.50, size:'xs'});
 			console.log("kjdcdsc");
 			$('#stars1').on('rating.change', function(event, val, caption) {
    			console.log(val);
    			if(session=='null'){
    				alert("Please Log in");
    			}
    			else{
    				var obj = {value: val};
    			var settings = {
						  "async": true,
						  "crossDomain": true,
						  "url": url_for_post,
						  "method": "POST",
						  "headers": {
						    "content-type": "application/json;charset=utf-8"
						  },
						  "processData": false,
						  "data": JSON.stringify(obj)
				};

				$.ajax(settings).done(function (response) {
				  if(response.status_message == 'Success.'){
				  	alert("Rating has been added");
				  }
				  else{
				  	alert("Rating has been added");
				  }
				})
    			}
			});
 		}
});