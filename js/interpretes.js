async function buscarperson() {
    if (localStorage.getItem('lang')=='en') {
        $("#toggle-event").prop("checked", false)
      }     
    // Traigo personas
    let response = await fetch("https://api.themoviedb.org/3/trending/person/week?api_key=5e5fc3b9e60f1572acb749241e477ec9&language="+localStorage.getItem('lang'))
            .then( response => response.json() )
            .then( json => {
                return json;
            });
            $("#personas").slideUp("slow", function(){      
                    $('#personas').html('');
                    $('#personas').append('<div class="row justify-content-between">'
                    +'<div class="row align-items-start">'
                     + '<div class="col-6 ">'
                     + '<h2>Elenco e Interprete</h2>'
                     + '</div>'
                     + '<div class="col-6">'
                     + '<div class="input-group  justify-content-end "  ><input type="text" class="form-control" id="txtInterpretes"  aria-describedby="btnInterpretes" ><button class="btn btn-outline-secondary" type="button" id="btnProximamente">Buscar</button></div>   '
                     + '</div>'
                    +'</div>');
                    $('#personas').append('<div class="row justify-content-between" id="divResultado" ></div>');                    
                    indice=0;
                    for (let persona of response.results) {
                        if (persona.profile_path!=null) {
                            indice++;
                            $('#divResultado').append('<div id="columna'+indice+'" class="col-4 py-3"></div>');
                            $('#columna'+indice).append('<div id="card'+indice+'" class="card"></div>');
                            $('#card'+indice).append('<img class="card-img-top img_card" src="https://image.tmdb.org/t/p/w500/'+persona.profile_path+'">');
                            $('#card'+indice).click(function(){
                                $('#detallePersona').modal('toggle');
                                $('#detallePersonaLabel').html(persona.name);
                                personaObj = buscarDatosPerson(persona.id); 
                                
                                } );
                            $('#card'+indice).append('<div id="card_body'+indice+'" class="card-body body_card" ></div>');
                            $('#card_body'+indice).append('<h3 class="text-center text-white bg-dark p-1" >'+persona.name+'</h3>');
                            for (let catalogo of persona.known_for) {
                                if (catalogo.title!=null) {
                                    $('#card_body'+indice).append('<p class="text-dark" >'+catalogo.title+'</p>');
                                }
                            }            
                        }
                    }              
                $("#personas").slideDown(2000);
                $("#txtInterpretes").keyup(function(event){
                    let texto = $("#txtInterpretes").val();
                    if ((texto.length>=3)) {
                      $('#divResultado').html('');
                      $('#divResultado').append('<h2>Falta Implementar el search</h2>');
                      $('#divResultado').append(texto);
                    }else if(texto.length==0) {
                        buscarperson() ;
                      }
                    
                  });                  
            });         
  }


async function buscarDatosPerson(idPersona) {
   // if ($('#toggle-event').prop('checked')) {localStorage.getItem('lang')='es'}else{localStorage.getItem('lang')='en'}
    $.ajax(
        'https://api.themoviedb.org/3/person/'+idPersona+'?api_key=5e5fc3b9e60f1572acb749241e477ec9&language='+localStorage.getItem('lang'),
        {
            success: function(data) {
              $('#infoPersona').html(data.biography);
              $('#btnVerMas').click(
                function(){
                    window.location = "./interprete.html?interprete=" + data.id;//+'&lang='+localStorage.getItem('lang');
                }
            )              
            },
            error: function() {
              alert('Hubo un error al cargar los datos de la persona.');
            }
         }
      );
  }
 
     buscarperson();

  $(function() {
    $('#toggle-event').change(function() {
          if ($(this).prop('checked')) {
            localStorage.setItem('lang','es');
           
            
        }else{
            localStorage.setItem('lang','en');
            
           
        }
        buscarperson();
        loadMenu();
     })
  })