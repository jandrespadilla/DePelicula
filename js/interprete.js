function interprete(interprete ) {
    if (localStorage.getItem('lang')=='en') {
      $("#toggle-event").prop("checked", false)
    }    
    $.ajax(
        'https://api.themoviedb.org/3/person/'+interprete+'?api_key=5e5fc3b9e60f1572acb749241e477ec9&language='+localStorage.getItem('lang'),
        {
            success: function(data) {
              //console.log(data);
                    $("#personas").slideUp("slow", function(){  
                          $('#personas').html('');
                          $('#personas').append('<div id="columna" class="row"></div>');
                          $('#columna').append('<div id="divPoster" class="col"></div>');
                          $('#divPoster').append('<img id="poster" class="imagenPeli inline" src="https://image.tmdb.org/t/p/w500/'+data.profile_path+'">');
                          $('#columna').append('<div id="divParrafo" class="col"></div>');
                          $('#divParrafo').append('<h2 id="nombre">'+data.name+'</p>');
                          $('#divParrafo').append(' <p id="parrafo" class="pBiografia text-justify" >'+titulos[0][localStorage.getItem('lang')]['lblBiografia']+': '+data.biography+'</p>');
                          $('#divParrafo').append('</label><p id="parrafo" class="pBiografia" >'+titulos[0][localStorage.getItem('lang')]['lblNacimiento']+': '+data.birthday+'</p>');
                          if (data.deathday!=null) {
                            $('#divParrafo').append('<p id="parrafo" class="pBiografia " >'+titulos[0][localStorage.getItem('lang')]['lblMuerte']+': '+data.deathday+'</p>');
                          }
                          let filmografia =  buscarFilmografia();

                          $("#personas").slideDown(2000);
                        }); 
                 

            },
            error: function() {
              alert('Hubo un error al cargar los datos de la persona.');
            }
         }
      );  
};
interprete(parametrosUrl('interprete')) 
function buscarFilmografia() {
  let filmografiaObj=  $.ajax(
        'https://api.themoviedb.org/3/person/'+parametrosUrl('interprete')+'/combined_credits?api_key=5e5fc3b9e60f1572acb749241e477ec9&language='+localStorage.getItem('lang'),
        {   async : false, 
            success: function(data) {

            },
            error: function() {
              alert('Hubo un error al cargar los datos de la persona.');
            }
         }
      ); 
      let participaciones=titulos[0][localStorage.getItem('lang')]['lblFilmografia']+':';
      for (let index = 0; index < filmografiaObj.responseJSON.cast.length; index++) {
            index != 0 ?  participaciones += ' - ' : participaciones += ' ';
    
            if(filmografiaObj.responseJSON.cast[index].first_air_date!=null){
            let anioArr= filmografiaObj.responseJSON.cast[index].first_air_date.split('-');
            anio=anioArr[0];
            } else if(filmografiaObj.responseJSON.cast[index].release_date!=null){
              let anioArr= filmografiaObj.responseJSON.cast[index].release_date.split('-');
              anio=anioArr[0];
            }else{
              anio=' - '
            }
            if (filmografiaObj.responseJSON.cast[index].original_title!=null) {
              participaciones +=  '<a id="link" class="link-secondary" href="./pelicula.html?idPeli='+filmografiaObj.responseJSON.cast[index].id+'">'+filmografiaObj.responseJSON.cast[index].original_title+'('+anio+')</a>'; 
            } else {
              participaciones +=  '<a id="link" class="link-secondary" href="./serie.html?idSerie='+filmografiaObj.responseJSON.cast[index].id+'">'+filmografiaObj.responseJSON.cast[index].original_name+'('+anio+')</a>';  
            }
       
      }
        $('#divParrafo').append(' <p id="parrafo" class="text-justify pBiografia" >'+participaciones+'</p>'); 
      return filmografiaObj.responseJSON;
}


$(function() {
  $('#toggle-event').change(function() {
        if ($(this).prop('checked')) {
          localStorage.setItem('lang','es');
         
          
      }else{
          localStorage.setItem('lang','en');
          
         
      }
      interprete(parametrosUrl('interprete'));
      loadMenu();
   })
}) 