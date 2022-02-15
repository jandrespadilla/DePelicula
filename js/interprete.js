function interprete(interprete ) {
    if (localStorage.getItem('lang')=='en') {
      $("#toggle-event").prop("checked", false)
    }    
    $.ajax(
        'https://api.themoviedb.org/3/person/'+interprete+'?api_key=5e5fc3b9e60f1572acb749241e477ec9&language='+localStorage.getItem('lang'),
        {
            success: function(data) {
                    $("#personas").slideUp("slow", function(){  
                          $('#personas').html('');
                          $('#personas').append('<div id="columna" class="row"></div>');
                          $('#columna').append('<div id="divPoster" class="col"></div>');
                          $('#divPoster').append('<img id="poster" class="imagenPeli inline" src="https://image.tmdb.org/t/p/w500/'+data.profile_path+'">');
                          $('#columna').append('<div id="divParrafo" class="col"></div>');
                          $('#divParrafo').append('<h2 id="nombre">'+data.name+'</p>');
                          $('#divParrafo').append('<p id="parrafo" class="pBiografia" >'+data.biography+'</p>');
                          $("#personas").slideDown(2000);
                        }); 
                  /* Codigo para traer proximamente en donde actuo o que dirijio  
                      let filmografia =  buscarFilmografia();
                    
                    for (let index = 0; index < filmografia.cast.length; index++) {
                       
                        console.log(filmografia.cast[index]);
                    } */

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
                    return data ;
            },
            error: function() {
              alert('Hubo un error al cargar los datos de la persona.');
            }
         }
      ); 
      return filmografiaObj.responseJSON;
}

$(function() {
  $('#toggle-event').change(function() {
        if ($(this).prop('checked')) {
          interprete(parametrosUrl('interprete'),'es');
          loadMenu('es');
      }else{
          loadMenu('en');
          interprete(parametrosUrl('interprete'),'en');
      }
   })
})