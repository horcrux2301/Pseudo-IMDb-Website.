var key = "e5ea7f1b8855e4b94adbc5737e995abb";


console.log(localStorage.getItem("searchtype"));
var details_for = localStorage.getItem("searchtype");
function goback(){
	var str = '<p>OOPS Nothing to see here.! <a href="index.html"' + '>Go back</a>';
	$('#add_all_here').append(str);
}

function setLocalStoragemovie(x){
	localStorage.setItem("movie_idd",x);
}

function setLocalStoragetv(x){
	localStorage.setItem("tv_idd",x);
}


function setCelebId(x){
	localStorage.setItem("person_idd",x);
}


$(document).ready(function() {

	var y = localStorage.getItem("logged_in_as");
	if(y=='guest'){
		$('#place_info_here').html("<h3>Logged in as " + 'guest</h3>');
	}
	else if(y=='account'){
		var temp = localStorage.getItem("username");
		$('#place_info_here').html("<h3>Logged in as " + temp  + "</h3>");
		console.log(temp);
	}
	console.log(localStorage.getItem("session_id"));
	console.log(details_for);
	if(details_for=="Movie"){
		var searching_for = localStorage.getItem("searchfor");
		console.log("blah");
		var url = 'https://api.themoviedb.org/3/search/movie?api_key=' + key + '&query=' + searching_for + '&page=1';
		console.log(url);
		$.getJSON(url,function(data){
			console.log(data.results.length);
			var length_of_result = data.results.length;
			if(length_of_result==0){
				goback();
			}
			else{
				$.each(data.results,function(k,j){
					var movie_pop = j.popularity;
					var movie_id = j.id;
					var movie_title = j.title;
					var poster = j.poster_path;
					var more_data = j.overview;
					console.log(j.id);
					addthismovie(movie_id,movie_pop,movie_title,poster,length_of_result,more_data,k);
					});
				}
			});

			function addthismovie(id,pop,title,poster,max,overview,i){
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
					var str = '<div class="row"><div class="col-md-4"> <div class="thumbnail"><img src="' + poster + '"alt="Poster_here"><div class="caption"><h3>' + title +'</h3><p>' + desc + '</p><p><a href="movie.html" class="btn btn-primary" role="button" onclick="setLocalStoragemovie(' + id + ') ">Read More and Explore</a> </p></div></div></div></div>';
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
					var str = '<div class="row"><div class="col-md-4"> <div class="thumbnail"><img src="' + poster + '"alt="Poster_here"><div class="caption"><h3>' + title +'</h3><p>' + desc + '</p><p><a href="movie.html" class="btn btn-primary" role="button" onclick="setLocalStoragemovie(' + id + ') ">Read More and Explore</a> </p></div></div></div></div>';
					console.log(str);
					$('.row:last ').append(str);
				}
				i++;
				console.log(i);
				}		
		}
	else if(details_for=="TV Show"){
		console.log(details_for);
		var searching_for = localStorage.getItem("searchfor");
		var url = 'https://api.themoviedb.org/3/search/tv?api_key=' + key + '&query=' + searching_for + '&page=1';
		console.log(url);
		$.getJSON(url,function(data){
			console.log(data.results.length);
			var length_of_result = data.results.length;
			if(length_of_result==0){
				goback();
			}
			else{
				$.each(data.results,function(k,j){
				var movie_pop = j.popularity;
				var movie_id = j.id;
				var movie_title = j.name;
				var poster = j.poster_path;
				var more_data = j.overview;
				console.log(j.id);
				addthistv(movie_id,movie_pop,movie_title,poster,length_of_result,more_data,k);
				});
			}
		});

		function addthistv(id,pop,title,poster,max,overview,i){
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
				var str = '<div class="row"><div class="col-md-4"> <div class="thumbnail"><img src="' + poster + '"alt="Poster_here"><div class="caption"><h3>' + title +'</h3><p>' + desc + '</p><p><a href="tv.html" class="btn btn-primary" role="button" onclick="setLocalStoragetv(' + id + ') ">Read More and Explore</a> </p></div></div></div></div>';
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
				var str = '<div class="row"><div class="col-md-4"> <div class="thumbnail"><img src="' + poster + '"alt="Poster_here"><div class="caption"><h3>' + title +'</h3><p>' + desc + '</p><p><a href="tv.html" class="btn btn-primary" role="button" onclick="setLocalStoragetv(' + id + ') ">Read More and Explore</a> </p></div></div></div></div>';
				console.log(str);
				$('.row:last ').append(str);
			}
			i++;
			console.log(i);

			}
		}

	else{
		console.log(details_for);
		var searching_for = localStorage.getItem("searchfor");
		var url = 'https://api.themoviedb.org/3/search/person?api_key=' + key + '&language=en-US&page=1&include_adult=false&query=' + searching_for;
		console.log(url);
		$.getJSON(url,function(data){
			console.log(data);
			var length_of_result = data.results.length;
			if(length_of_result==0){
				goback();
			}
			else{
				$.each(data.results,function(k,j){
				var name = j.name;
				var url_for_photo =  j.profile_path;
				var celeb_id = j.id;
				console.log(j.id);
				addthisCeleb(celeb_id,name,url_for_photo,k);
				});
			}
		});

		function addthisCeleb(id,name,url,i){
			var poster='';
			console.log("i in % else " + i);
				if(url==null)
					poster = "place_here.jpg";
				else
					poster = 'http://image.tmdb.org/t/p/w300' + url;
				console.log(poster);
				var str = '<div class="row"><div class="col-md-4"> <div class="thumbnail"><img src="' + poster + '"alt="Poster_here"><div class="caption"><h3>' +name +'</h3><p><a href="person.html" class="btn btn-primary" role="button" onclick="setCelebId(' + id + ') ">Read More and Explore</a> </p></div></div></div></div>';
				console.log(str);			
			if(i%3==0){
				$('#add_all_here').append(str);
			}
			else{
				$('.row:last ').append(str);
			}
			i++;
			console.log(i);
			}	

	}
	
});