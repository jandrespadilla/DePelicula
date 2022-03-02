// Get the canvas node and the drawing context
const canvas = document.getElementById('canvasMatrix');
const ctx = canvas.getContext('2d');

// set the width and height of the canvas
const w = canvas.width = document.body.offsetWidth;
const h = canvas.height = document.body.offsetHeight;

// draw a black rectangle of width and height same as that of the canvas
ctx.fillStyle = '#000';
ctx.fillRect(0, 0, w, h);

const cols = Math.floor(w / 20) + 1;
const ypos = Array(cols).fill(0);

function matrix () {
	// Draw a semitransparent black rectangle on top of previous drawing
	ctx.fillStyle = '#0001';
	ctx.fillRect(0, 0, w, h);

	// Set color to green and font to 15pt monospace in the drawing context
	ctx.fillStyle = '#0f0';
	ctx.font = '20pt monospace';

	// for each column put a random character at the end
	ypos.forEach((y, ind) => {
		// generate a random character
		const text = String.fromCharCode(Math.random() * 122);

		// x coordinate of the column, y coordinate is already given
		const x = ind * 20;
		// render the character at (x, y)
		ctx.fillText(text, x, y);

		// randomly reset the end of the column if it's at least 100px high
		if (y > 100 + Math.random() * 10000) ypos[ind] = 0;
		// otherwise just move the y coordinate for the column 20px down,
		else ypos[ind] = y + 20;
	});
}

// render the animation at 20 FPS.
setInterval(matrix, 50);


function parametrosUrl(parametro) {  
	var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');  
	for (var i = 0; i < url.length; i++) {  
		var parametroArr = url[i].split('=');  
		if (parametroArr[0] == parametro) {  
			return parametroArr[1];  
		}  
	}  
}  

window.onload = function () {
	var ln = window.navigator.language || navigator.browserLanguage;
	arregloln = ln.split('-');
	
	//alert(localStorage.getItem('lang'))
 
	idioma=localStorage.getItem('lang');
	//alert(idioma)
	if (idioma==null) {
		localStorage.setItem('lang',arregloln[0]);
	} else {
		 $('#toggle-event').attr('checked', false);
	}
 
	loadMenu();
};


async function buscadorTexto(texto,buscar,pagina=1) {
	let resultados = await fetch('https://api.themoviedb.org/3/search/'+buscar+'?api_key=5e5fc3b9e60f1572acb749241e477ec9&language='+localStorage.getItem('lang')+'&query='+texto+'&page='+pagina+'&include_adult=false')
			.then( response => response.json() )
			.then( json => {
				return json;
			});
	let texto_resultado='';
	$('#divResultado').html('');
	indice=0;
	//console.log(resultados);
	for (let resultado of resultados.results) {
		switch (buscar) {
			case 'tv':
                    $('#divResultado').append('<div id="columna'+indice+'" class="col-4 py-3 "></div>');
                    $('#columna'+indice).append('<div id="card'+indice+'" class="card"></div>');
                    $('#card'+indice).append('<a id="link'+indice+'" href="./serie.html?idSerie='+resultado.id+'"></a>');
					if (resultado.backdrop_path!=null) {
						$('#link'+indice).append('<img class="card-img-top img_card_tv" src="https://image.tmdb.org/t/p/w300/'+resultado.backdrop_path+'">');	
					} else {
						$('#link'+indice).append('<img class="card-img-top img_card_tv" src="./style/images/peliculas.png">');
						}
					$('#card'+indice).append('<div id="card_body'+indice+'" class="card-body body_card_search" ></div>');
                    $('#card_body'+indice).append('<h3 class="text-center text-white bg-dark p-1" >'+resultado.name+'</h3>');
                    $('#card_body'+indice).append('<p class="card-text text-dark clase" >'+resultado.overview+'</p>');
				break;
			case 'movie':
				$('#divResultado').append('<div id="columna'+indice+'" class="col-4 py-3 "></div>');
				$('#columna'+indice).append('<div id="card'+indice+'" class="card card_default_interna"></div>');
				$('#card'+indice).append('<a id="link'+indice+'" href="./pelicula.html?idPeli='+resultado.id+'"></a>');
				if (resultado.poster_path!=null) {
					$('#link'+indice).append('<img class="card-img-top img_card" src="https://image.tmdb.org/t/p/w500/'+resultado.poster_path+'">');
				} else {
					$('#link'+indice).append('<img class="card-img-top img_card" src="./style/images/peliculas.png">');	
				}
				$('#card'+indice).append('<div id="card_body'+indice+'" class="card-body body_card_search" ></div>');
				$('#card_body'+indice).append('<h3 class="text-center text-white bg-dark p-1" >'+resultado.title+'</h3>');
				if (resultado.overview!='') {
					$('#card_body'+indice).append('<p class="card-text text-dark clase" >'+resultado.overview+'</p>');	
				} else {
					$('#card_body'+indice).append('<p class="card-text text-dark" >Sin sinopsis.</p>');
				}	 
				break;
			case 'person':
				$('#divResultado').append('<div id="columna'+indice+'" class="col-4 py-3 "></div>');
				$('#columna'+indice).append('<div id="card'+indice+'" class="card card_default_interna"></div>');
				$('#card'+indice).append('<a id="link'+indice+'" href="./interprete.html?interprete='+resultado.id+'"></a>');
				if (resultado.profile_path!=null) {
					$('#link'+indice).append('<img class="card-img-top img_card" src="https://image.tmdb.org/t/p/w300/'+resultado.profile_path+'">');
				} else {
					$('#link'+indice).append('<img class="card-img-top img_card img_card_sin" src="./style/images/persona.png">');
				}
				$('#card'+indice).append('<div id="card_body'+indice+'" class="card-body body_card_search" ></div>');
				$('#card_body'+indice).append('<h3 class="text-center text-white bg-dark p-1" >'+resultado.name+'</h3>');
				 buscarDatosPerson(resultado.id,indice)
				break;
 									
			default:
				break;
		}
 
		indice++;
		// texto_resultado = texto_resultado +  JSON.stringify(resultado);	
		}	
		  $('#divResultado').append('<nav id="navPaginacion" aria-label="Resuldato "></nav>');
  		  $('#navPaginacion').append('<ul id="ulPaginacion" class="pagination"></ul>');
		 paginaActual=resultados.page;
		 if (resultados.total_pages>1) {
				if (paginaActual==1) {
					$('#ulPaginacion').append(' <li class="page-item disabled"> <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Anterior</a></li>');
					$('#ulPaginacion').append(' <li class="page-item"  aria-current="page"> <a class="page-link"    >'+paginaActual+'</a></li>');
					$('#ulPaginacion').append(' <li class="page-item" > <a class="page-link" onclick="buscadorTexto(\''+texto+'\',\''+buscar+'\','+(paginaActual+1)+')"   >'+(paginaActual+1)+'</a></li>');
					$('#ulPaginacion').append('<li class="page-item"><a class="page-link" onclick="buscadorTexto(\''+texto+'\',\''+buscar+'\','+(paginaActual+1)+')">Proxima</a> </li>');
				} else if (paginaActual<resultados.total_pages) {
					$('#ulPaginacion').append(' <li class="page-item "> <a class="page-link" onclick="buscadorTexto(\''+texto+'\',\''+buscar+'\','+(paginaActual-1)+')" tabindex="-1" aria-disabled="true">Anterior</a></li>');
					$('#ulPaginacion').append(' <li class="page-item"  aria-current="page"> <a class="page-link" href="#"   >'+paginaActual+'</a></li>');
					$('#ulPaginacion').append(' <li class="page-item" > <a class="page-link" onclick="buscadorTexto(\''+texto+'\',\''+buscar+'\','+(paginaActual+1)+')"   >'+(paginaActual+1)+'</a></li>');
					$('#ulPaginacion').append('<li class="page-item"><a class="page-link" onclick="buscadorTexto(\''+texto+'\',\''+buscar+'\','+(paginaActual+1)+')" >Proxima</a> </li>');	 
				}else{
					$('#ulPaginacion').append(' <li class="page-item "> <a class="page-link" onclick="buscadorTexto(\''+texto+'\',\''+buscar+'\','+(paginaActual-1)+')"   tabindex="-1" aria-disabled="true">Anterior</a></li>');
					$('#ulPaginacion').append(' <li class="page-item"  aria-current="page"> <a class="page-link" href="#"   >'+(paginaActual-1)+'</a></li>');
					$('#ulPaginacion').append(' <li class="page-item" > <a class="page-link"  >'+paginaActual+'</a></li>');
					$('#ulPaginacion').append('<li class="page-item disabled"><a class="page-link" href="#">Proxima</a> </li>');
						}
				}	  
  }
  

  async function buscarDatosPerson(idPersona,indi) {
	// if ($('#toggle-event').prop('checked')) {localStorage.getItem('lang')='es'}else{localStorage.getItem('lang')='en'}
	 $.ajax(
		 'https://api.themoviedb.org/3/person/'+idPersona+'?api_key=5e5fc3b9e60f1572acb749241e477ec9&language='+localStorage.getItem('lang'),
		 {
			 success: function(data) {
				if (data.biography!='') {
					$('#card_body'+indi).append('<p class="card-text text-dark clase" >'+titulos[0][localStorage.getItem('lang')]['lblBiografia']+': '+data.biography+'</p>');
				} else {
					$('#card_body'+indi).append('<p class="card-text text-dark" >No '+titulos[0][localStorage.getItem('lang')]['lblBiografia']+'.</p>');
				}	
				if (data.birthday!=null) {
					$('#card_body'+indi).append('<p class="card-text text-dark" >'+titulos[0][localStorage.getItem('lang')]['lblNacimiento']+': '+data.birthday+'</p>');
				} 		    
			 },
			 error: function() {
			   alert('Hubo un error al cargar los datos de la persona.');
			 }
		  }
	   );
   }


   
   const menu_es=[
	["Inicio",'./index.html'],
	["Interpretes",'./interpretes.html'],
	["Peliculas",'./peliculas.html'],
	["Series",'./series.html'],
	["Contactos",'./contacto.html']
]
const menu_en=[
	["Home",'./index.html'],
	["Interpreters",'./interpretes.html'],
	["Movies",'./peliculas.html'],
	["TV Shows",'./series.html'],
	["Contacts",'./contacto.html']
]    
const menu = [{'es': menu_es ,'en':menu_en } ] 

const titulo_es={
	'titulo_page_new':"Lo que se viene",
	'titulo_page_person':"Elenco e Interprete",
	'titulo_page_movie':"Peliculas",
	'titulo_page_tv':"Series",
	'titulo_page_contact':"Formulario de Contacto",
	'lblNombre':"Nombre Completo",
	'lblEmail':"Correo Electronico",
	'lblConsulta':"Consulta",
	'tituloBusqueda':'Resultados de Busqueda',
	'lblBiografia':'Biografia',
	'lblNacimiento':'Nacio',
	'lblMuerte':'Murio',
	'lblInterprete':'Elenco e Interprete',
	'lblSinopsis':'Sinopsis',
	'lblTemporadas':'Temporadas',
	'lblFilmografia':'Filmografia'		
}
const titulo_en={
	'titulo_page_new':"Coming Soon",
	'titulo_page_person':"Interpreters",
	'titulo_page_movie':"Movies",
	'titulo_page_tv':"TV Shows",
	'titulo_page_contact':"Contact Form",
	'lblNombre':"Full Name",
	'lblEmail':"Email",
	'lblConsulta':"Question",	
	'tituloBusqueda':'Search results',
	'lblBiografia':'Biography',
	'lblNacimiento':'Born',
	'lblMuerte':'Dead',
	'lblInterprete':'Interpreters',
	'lblSinopsis':'Synopsis',
	'lblTemporadas':'Seasons',
	'lblFilmografia':'Filmography'		
}   
const titulos = [{'es': titulo_es ,'en':titulo_en } ] 

const boton_es={
	'btnBuscar':"Buscar",
	'enviar_datos':"Enviar Datos",
	'cargar_datos':"Cargar Datos",
	'borrar_datos':"Borrar Datos"
}
const boton_en={
	'btnBuscar':"Search",
	'enviar_datos':"Send Form",
	'cargar_datos':"Load Form",
	'borrar_datos':"Clean Form"
}   
const botones = [{'es': boton_es ,'en':boton_en } ] 