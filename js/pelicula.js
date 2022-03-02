function pelicula(pelicula) {
  if (localStorage.getItem('lang')=='en') {
    $("#toggle-event").prop("checked", false)
  }   
  $.ajax(
        'https://api.themoviedb.org/3/movie/'+pelicula+'?api_key=5e5fc3b9e60f1572acb749241e477ec9&language='+localStorage.getItem('lang'),
        {
            success: function(data) {
                $("#pelicula").slideUp("slow", function(){ 
                    $('#pelicula').html('');
                    $('#pelicula').append('<div id="columna" class="row"></div>');
                    $('#columna').append('<div id="divPoster" class="col"></div>');
                    if (data.poster_path!=null) {
                      $('#divPoster').append('<img id="poster" class="imagenPeli inline" src="https://image.tmdb.org/t/p/w500/'+data.poster_path+'">'); 
                    } else {
                      $('#divPoster').append('<img id="poster" class="imagenPeli inline" src="./style/images/peliculas.png">');
                    }
                    
                    $('#columna').append('<div id="divParrafo" class="col"></div>');
                    $('#divParrafo').append('<h2 id="nombre">'+data.title+'</p>');
                    $('#divParrafo').append('<p id="parrafo" class="pSinopsis" >'+titulos[0][localStorage.getItem('lang')]['lblSinopsis']+': '+data.overview+'</p>');
                    
                    buscarActores(data.id);
 
                    $("#pelicula").slideDown(1000);
                  });                    
            },
            error: function() {
              alert('Hubo un error al cargar los datos de la pelicula.');
            }
         }
      );  

}
pelicula(parametrosUrl('idPeli'));


async function buscarActores(id) {

    // Traigo actores
    let response = await fetch("https://api.themoviedb.org/3/movie/"+id+"/credits?api_key=5e5fc3b9e60f1572acb749241e477ec9&language="+localStorage.getItem('lang'))
            .then( response => response.json() )
            .then( json => {
                
                return json;
            });

      actores = await response;
      let interpretes=titulos[0][localStorage.getItem('lang')]['lblInterprete']+': ';
       
      if ( actores.cast.length>0) {
        for (let index = 0; index < actores.cast.length; index++) {
          const act = actores.cast[index];
        
          index != 0 ?  interpretes += ' - ' : interpretes += ' ';
          interpretes +=  '<a id="link" class="link-secondary" href="./interprete.html?interprete='+act.id+'">'+act.name+'</a>';  
         }
         $('#divParrafo').append(' <p id="parrafo" class="text-justify pBiografia" >'+interpretes+'</p>'); 
      }

      
        
      return actores;
  }

  $(function() {
    $('#toggle-event').change(function() {
        if ($(this).prop('checked')) {
          localStorage.setItem('lang','es');
        }else{
          localStorage.setItem('lang','en');
        }
        pelicula( parametrosUrl('idPeli'));
        loadMenu();
     })
  })
