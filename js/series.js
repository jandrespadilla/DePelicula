async function buscarSeries() {
  if (localStorage.getItem('lang')=='en') {
    $("#toggle-event").prop("checked", false)
  }     
    // Traigo series
    let response = await fetch("https://api.themoviedb.org/3/trending/tv/week?api_key=5e5fc3b9e60f1572acb749241e477ec9&language="+localStorage.getItem('lang'))
            .then( response => response.json() )
            .then( json => {
                return json;
            });
            $("#series").slideUp("slow", function(){
            $('#series').html('');
            $('#series').append('<div class="row justify-content-between">'
            +'<div class="row align-items-start">'
             + '<div class="col-6 ">'
             + '<h2>Series</h2>'
             + '</div>'
             + '<div class="col-6">'
             + '<div class="input-group  justify-content-end "  ><input type="text" class="form-control" id="txtSeries"  aria-describedby="btnSerie" ><button class="btn btn-outline-secondary" type="button" id="btnProximamente">Buscar</button></div>   '
             + '</div>'
            +'</div>');
            $('#series').append('<div class="row justify-content-between" id="divResultado" ></div>');              
            indice=0;
            for (let serie of response.results) {
                indice++;
                      $('#divResultado').append('<div id="columna'+indice+'" class="col-4 py-3"></div>');
                      $('#columna'+indice).append('<div id="card'+indice+'" class="card"></div>');
                      //Al link lo agrego despues para no tener que meterme en esto primero termino el resto de los datos que me faltan en los demas detalles
                     // $('#card'+indice).append('<a id="link'+indice+'" href="./pelicula.html?idPeli='+serie.id+'&lang='+idioma+'"></a>');
                      $('#card'+indice).append('<img class="card-img-top img_card" src="https://image.tmdb.org/t/p/w300/'+serie.poster_path+'">');
                      $('#card'+indice).append('<div id="card_body'+indice+'" class="card-body body_card" ></div>');
                      $('#card_body'+indice).append('<h3 class="text-center text-white bg-dark p-1" >'+serie.name+'</h3>');
                      $('#card_body'+indice).append('<p class="card-text text-dark" >'+serie.overview+'</p>');
                } 
                $("#series").slideDown(2000);
                $("#txtSeries").keyup(function(event){
                  let texto = $("#txtSeries").val();
                  if ((texto.length>=3)) {
                    $('#divResultado').html('');
                    $('#divResultado').append('<h2>Falta Implementar el search</h2>');
                    $('#divResultado').append(texto);
                  }else if(texto.length==0) {
                    buscarSeries() ;
                  }
                  
                });                 
              });             
  }

buscarSeries();
  $(function() {
    $('#toggle-event').change(function() {
        if ($(this).prop('checked')) {
          localStorage.setItem('lang','es');
        }else{
          localStorage.setItem('lang','en');
        }
        buscarSeries( );
        loadMenu();
     })
  })