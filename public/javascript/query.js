$(document).ready(function(){
    $('#form').change(function(){
      if($('#form option:selected').val() == 'plot'){
        $('#query').html('<form><div class="form-group"><label for="inpuPlot">Plot</label><input type="text" class="form-control" id="inputPlot" placeholder="Enter words of a movie plot"></div></form>')
      }
      else if($('#form option:selected').val() == 'title'){
        $('#query').html('<form><div class="form-group"><label for="inputTitle">Title</label><input type="text" class="form-control" id="inputTitle" placeholder="Enter the title of a movie"></div></form>')
      }
      else if($('#form option:selected').val() == 'year'){
        $('#query').html('<form><div class="form-group"><label for="inputYear">Year</label><input type="text" class="form-control" id="inputYear" placeholder="Enter a year"></div></form>')
      }
      else if($('#form option:selected').val() == 'rank'){
        $('#query').html('<form><div class="form-group"><label for="inputRankMin">Minimum rank</label><input type="text" class="form-control" id="inputRankMin" placeholder="Enter the minimum rank"></div><div class="form-group"><label for="inputRankMax">Maximum rank</label><input type="text" class="form-control" id="inputRankMax" placeholder="Enter the maximum rank"></div></form>')
      }
      else if($('#form option:selected').val() == 'rate'){
        $('#query').html('<form><div class="form-group"><label for="inputRateMin">Minimum rating</label><input type="text" class="form-control" id="inputRateMin" placeholder="Enter the minimum rate"></div><div class="form-group"><label for="inputRateMax">Maximum rating</label><input type="text" class="form-control" id="inputRateMax" placeholder="Enter the maximum rate"></div></form>')
      }
    });

    $('#search').click(function(){
      $.post('http://localhost:3000/film/query', {
        title: {
          $regex: $('#inputTitle').val()
        }
      }, function(movies){
        $("#grid").html("");
        if(movies.length > 0 && movies.length < 50) {
          $("#grid").append("<div class='col-12'>"+movies.length+" movies found with your query</div>")
        }
        else if (movies.length == 50) {
          $("#grid").append("<div class='col-12'>Max results reached: 50 movies are displayed</div>")
        }
        else {
          $("#grid").append("<div class='col-12'>We didn't find any movie with your query.</div>")
        }

        movies.forEach(function(movie){
          $("#grid").append('<div class="mdl-card mdl-cell mdl-cell--4-col mdl-cell--4-col-tablet mdl-shadow--8dp" id='+movie['_id']+'><figure class="mdl-card__media"><img src="'+movie.image+'" alt=""/></figure><div class="mdl-card__title"><h2 class="mdl-card__title-text">'+movie.title+' ('+movie.year+')</h2></div><div class="mdl-card__supporting-text bold">'+movie.directors+'</div><div class="mdl-card__supporting-text"></div><div class="mdl-card__actions mdl-card--border"><a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" target="_blank" href="#">More information</a><div class="mdl-layout-spacer"></div><button class="mdl-button mdl-button--icon mdl-button--colored"><i class="material-icons">favorite</i></button></div></div>');
        })
      })
    })

});
