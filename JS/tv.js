var key = "e5ea7f1b8855e4b94adbc5737e995abb";
var id =  localStorage.getItem("tv_idd");
var session = localStorage.getItem("session_id");
var account_id = localStorage.getItem("account_id");
var no_of_actor=0;
var logged_in_as_here = localStorage.getItem("logged_in_as");

function setProfile(pid){
	localStorage.setItem("searchtype","celeb");
	localStorage.setItem("person_idd", pid);
	window.location = "person.html";
}

function setrecommendid2(x){
	localStorage.setItem("searchtype","TV Show");
	localStorage.setItem("tv_idd",x);
}

$(document).ready(function($) {
	var url =  'https://api.themoviedb.org/3/tv/' + id + '/images?' + 'api_key=' + key; /*This is the url to get the poster_path of the most appropiate image.*/
		// console.log(url);

		/*Here we will get the url of the image with height greater than 800 and then minimum among them.*/
		$.getJSON(url,function(data){
			var string;
			console.log(data);
			string = 'http://image.tmdb.org/t/p/original/' + data.posters[1].file_path;

			$('.jumbotron').css({
				"background-color": "#fff"
			});
			$('.jumbotron').html('<img src="'+string+'" style="width:100%;height:600px;" />');

		});

		/*Get all the movie details here*/
		var for_details_url = 'https://api.themoviedb.org/3/tv/' + id + '?api_key=' + key + '&language=en-US';
		// console.log(for_details_url);
		$.getJSON(for_details_url,function(data){
			var value_rating = data.vote_average;
			$("#stars").rating({min:1, stars:10, max:10, step:0.1, size:'xs',hoverEnabled:false,disabled:true});
			$('#stars').rating('update', value_rating);
			var title = data.name;
			$('#overview').append('<h1>' + title + '</h1>');
				var overview = data.overview;
				$('#overview').append('<p>' + overview + '</p>');
		});

		var url_for_cast = 'https://api.themoviedb.org/3/tv/' + id + '/credits?api_key=' + key;
		console.log(url_for_cast);
		$.getJSON(url_for_cast,function(data){
			console.log(data);
			var x=0;
			$.each(data.cast,function(i,j){
				var x=0;
				var id_of_person = j.id;
				console.log(id_of_person);
				var url_for_name = 'https://api.themoviedb.org/3/person/' + id_of_person +'?api_key=' + key + '&language=en-US';
				console.log(url_for_name);
				var url_for_image = 'https://api.themoviedb.org/3/person/' + id_of_person +'/images?api_key=' + key;
				$.getJSON(url_for_name,function(data){
					func(data.name,url_for_image,id_of_person,id_of_person);
					console.log(data.name);
					no_of_actor++;
					console.log(no_of_actor);
				});
				if(i==8)
					return false;
			});
		});

		function func(name,url_for_image,id,id_person){	
			console.log(url_for_image);
			$.getJSON(url_for_image,function(data){
				console.log(data.profiles[0].file_path);
				var path = data.profiles[0].file_path;
				console.log(data);
				var image_url  = 'http://image.tmdb.org/t/p/w154' + path;
				console.log(image_url);
				var cast_item = $('#cast_template').clone();
				cast_item.css('display','inline-block');
				cast_item.attr('id','cast-' + id);
				cast_item.find('.view-link').attr('data-pid', id_person);
				cast_item.find('.cast-img').attr('src',image_url);
				cast_item.find('.cast-name').text(name);
				$('#cast').append(cast_item);
			});
		}

		var url_for_recommendations = 'https://api.themoviedb.org/3/tv/' + id + '/recommendations?api_key=' + key + '&language=en-US&page=1';
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
 			var url_for_movie_name  = 'https://api.themoviedb.org/3/tv/' + x +'?api_key=' + key + '&language=en-US';
 			$.getJSON(url_for_movie_name,function(data){
 				console.log(data.original_name);
 				var string1 = '<ul><h4><a href="tv.html" onclick="setrecommendid2('+ x +')" >'+ data.name +'</a></h4></ul>';
 				console.log(string1);
 				$('#recommend').append(string1);
 			});
 		}

 		if(session!=null){
 			var user_search = 'https://api.themoviedb.org/3/account/'+ account_id  +'/rated/movies?api_key=' + key + '&language=en-US&sort_by=created_at.desc&page=1&session_id=' + session;
 			$.getJSON(user_search,function(data){
 				console.log(data);
 			});
 			$('#rating_user').css("display" , "inline-block");
 			var url_for_post = 'https://api.themoviedb.org/3/tv/'+ id +'/rating?api_key=' + key;
 			console.log(logged_in_as_here);
 			if(logged_in_as_here=="guest"){
 				url_for_post += '&guest_session_id=' + session;
 			}
 			else{
 				url_for_post += '&session_id=' + session;
 			}
 			console.log(url_for_post);
 			$("#stars1").rating({min:1, stars:10, max:10, step:0.50, size:'xs'});
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
				  // else{
				  // 	alert("Try again");
				  // }
				})  //.fail(function(){
					//alert("try again");
				//});
    			}
			});
 		}

});