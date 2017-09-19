

var key = "e5ea7f1b8855e4b94adbc5737e995abb";
var i=0;

function setLocalStorage(x){
	localStorage.setItem("movie_idd",x);
	localStorage.setItem("searchtype","TV Show")
}

$(document).ready(function($) {
	console.log("hey");
	var url_for_trending_movie1 = 'https://api.themoviedb.org/3/movie/popular?api_key=' +  key +'&language=en-US&page=1';
	var url_for_trending_movie2 = 'https://api.themoviedb.org/3/movie/popular?api_key=' +  key +'&language=en-US&page=2';
	var url_for_trending_movie3 = 'https://api.themoviedb.org/3/movie/popular?api_key=' +  key +'&language=en-US&page=3';
	adddetails(url_for_trending_movie1);
	adddetails(url_for_trending_movie2);
	adddetails(url_for_trending_movie3);

	function adddetails(url){
$.getJSON(url,function(data){
		$.each(data.results,function(i,j){
			var tv_pop = j.popularity;
			var tv_id = j.id;
			var tv_title = j.title;
			var poster = j.poster_path;
			var more_data = j.overview;
			console.log(j.id);
			addthismovie(tv_id,tv_pop,tv_title,poster,more_data);
		});
	});

	function addthismovie(id,pop,title,poster,overview){
			if(i%3==0){
				console.log("i in % else " + i);
				if(poster==null)
					poster = "place_here.jpg";
				else
					poster = 'http://image.tmdb.org/t/p/w300' + poster;
				console.log(poster);
				var desc='';
				for(var tt=0;tt<overview.length && tt<150;tt++)
					desc+=overview[tt];
				desc+='....';
				var str = '<div class="row"><div class="col-md-4"> <div class="thumbnail"><img src="' + poster + '"alt="Poster_here"><div class="caption"><h3>' + title +'</h3><p>' + desc + '</p><p><a href="movie.html" class="btn btn-primary" role="button" onclick="setLocalStorage(' + id + ') ">Read More and Explore</a> </p></div></div></div></div>';
				console.log(str);
				$('#add_all_here').append(str);
		}
		else{
			console.log("i in else " + i);
			if(poster==null)
					poster = "place_here.jpg";
				else
					poster = 'http://image.tmdb.org/t/p/w300' + poster;
			console.log(poster);
			var desc='';
				for(var tt=0;tt<overview.length && tt<150;tt++)
					desc+=overview[tt];
				desc+='....';
				var str = '<div class="row"><div class="col-md-4"> <div class="thumbnail"><img src="' + poster + '"alt="Poster_here"><div class="caption"><h3>' + title +'</h3><p>' + desc + '</p><p><a href="movie.html" class="btn btn-primary" role="button" onclick="setLocalStorage(' + id + ') ">Read More and Explore</a> </p></div></div></div></div>';
				console.log(str);
			$('.row:last ').append(str);
		}
		i++;
		console.log(i);
	}
	}

});





// $.getJSON(url_for_trending_movies,function(data){
// 		var no_of_pages = data.total_pages;
// 		console.log(no_of_pages);
// 		if(no_of_pages>6)
// 			no_of_pages=6;
// 		for(var x=0;x<=no_of_pages;x++){
// 			$('#add_button').append('<button type="button" class="btn btn-default">Left</button>');
// 		}
// 	})





// // $.getJSON(url_for_trending_movies,function(data){
// // 		var no_of_pages = data.total_pages;
// // 		console.log(no_of_pages);
// // 		if(no_of_pages>6)
// // 			no_of_pages=6;
// // 		for(var x=0;x<=no_of_pages;x++){
// // 			$('#add_button').append('<button type="button" class="btn btn-default">Left</button>');
// // 		}
// // 	})