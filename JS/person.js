var key = "e5ea7f1b8855e4b94adbc5737e995abb";
var id = localStorage.getItem("person_idd");

function setmovieid(x){
	localStorage.setItem("movie_idd",x);
	localStorage.setItem("searchtype",'Movie');
	window.location = "movie.html";
}

console.log(id);

$(document).ready(function($) {
	// console.log(localStorage.getItem("person_idd"))	;
	console.log(id);
	var url_for_image = 'https://api.themoviedb.org/3/person/' + id + '/images?api_key=' + key;
	console.log(url_for_image);
	$.getJSON(url_for_image,function(data){
		console.log(data);
		var string = data.profiles[0].file_path;
		string = 'http://image.tmdb.org/t/p/w500/' + string;
		console.log(string);
		$('#actor-here').append('<img src="'+string+'"  />');
		addrest1();
		addrest2();
	});
	function addrest1(){
		var url_for_details = 'https://api.themoviedb.org/3/person/' + id +'?api_key=' + key + '&language=en-US';
		$.getJSON(url_for_details,function(data){
			console.log(data);
			var name = data.name;
			var birth = data.birthday;
			var bio = data.biography;
			$("#place_here").prepend('<div class="style1">Birthday: '+ birth +'</p>');
			$("#place_here").prepend('<div class="style2">Biography: '+ bio +'</p>');
			$("#place_here").prepend('<div class="style1">'+ name +'</p>');
		});
	}

	function addrest2(){
		var url_for_details = 'https://api.themoviedb.org/3/person/' + id + '/movie_credits?api_key=' + key + '&language=en-US';
		$.getJSON(url_for_details,function(data){
			console.log(data);
			$.each(data.cast,function(i,j){
				var movie_id = j.id;
				var character = j.character;
				var title = j.title;
				addmovies(movie_id,character,title);
				if(i==5)
					return false;
			});
		});
	}

	function addmovies(id,character,title){
		var url_for_thumb_image = 'https://api.themoviedb.org/3/movie/'+ id +'images?api_key='+ key +'&language=en-US';
		console.log(url_for_thumb_image);
		$.getJSON(url_for_thumb_image,function(data){
			var image = data.poster_path;
			console.log(image);
			var poster = 'http://image.tmdb.org/t/p/w185/' + image;
			console.log(poster);
			var add = $("#add_movies_template").clone();
			add.css('display', 'inline-block');
			add.find('.view-link').attr('data-pid',id);
			add.find('.movie_name').text(title);
			add.find('img').attr('src',poster);
			add.find('.movie_name h3').css('font-size', '3px');
			$('#place_here').append(add);
		})
		
	}
});


























