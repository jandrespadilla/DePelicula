function pelicula(pelicula,idioma) {
  if (idioma=='en') {
     $("#toggle-event").prop("checked", false)
  }    
  $.ajax(
        'https://api.themoviedb.org/3/movie/'+pelicula+'?api_key=5e5fc3b9e60f1572acb749241e477ec9&language='+idioma,
        {
            success: function(data) {
                $("#pelicula").slideUp("slow", function(){ 
                    $('#pelicula').html('');
                    $('#pelicula').append('<div id="columna" class="row"></div>');
                    $('#columna').append('<div id="divPoster" class="col"></div>');
                    $('#divPoster').append('<img id="poster" class="imagenPeli inline" src="https://image.tmdb.org/t/p/w500/'+data.poster_path+'">');
                    $('#columna').append('<div id="divParrafo" class="col"></div>');
                    $('#divParrafo').append('<h2 id="nombre">'+data.title+'</p>');
                    $('#divParrafo').append('<p id="parrafo" class="pSinopsis" >'+data.overview+'</p>');
                    let elenco=Array();
                    buscarActores(data.id,elenco);
                    for (let persona of elenco) {
                       // const act = elenco[index];
                       // console.log(persona[0]);
                       // sinopsis.appendChild(act.name);  
                       // actoresArmados.push();
                    }   
                    $("#pelicula").slideDown(1000);
                  });                    
            },
            error: function() {
              alert('Hubo un error al cargar los datos de la pelicula.');
            }
         }
      );  

}
pelicula(parametrosUrl('idPeli'),parametrosUrl('lang'));


async function buscarActores(id,actoresArmados) {

    // Traigo actores
    let response = await fetch("https://api.themoviedb.org/3/movie/"+id+"/credits?api_key=5e5fc3b9e60f1572acb749241e477ec9&language=es")
            .then( response => response.json() )
            .then( json => {
                
                return json;
            });

      actores = await response;
      for (let index = 0; index < 5; index++) {
        const act = actores.cast[index];
        actoresArmados.push(act);
       
    }
     
      return actoresArmados;
  }

  $(function() {
    $('#toggle-event').change(function() {
          if ($(this).prop('checked')) {
            pelicula(parametrosUrl('idPeli'),'es');
            loadMenu('es');
        }else{
            loadMenu('en');
            pelicula(parametrosUrl('idPeli'),'en');
        }
     })
  })