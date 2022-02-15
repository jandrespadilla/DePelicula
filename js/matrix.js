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
	//alert($('#toggle-event').is(':checked'))
	 
    /*if (arregloln[0] == 'es') {
		localStorage.setItem('lang','es');
			
	}else{
		localStorage.setItem('lang','en');

	}*/
	loadMenu();
};


async function buscadorTexto(texto) {
	// Traigo actores
   
	let response = await fetch('https://api.themoviedb.org/3/search/multi?api_key=5e5fc3b9e60f1572acb749241e477ec9&language='+localStorage.getItem('lang')+'&query='+texto+'&page=1&include_adult=false')
			.then( response => response.json() )
			.then( json => {
				return json;
			});
	  estrenos = await response.results;
	
	  return estrenos;
  }
  