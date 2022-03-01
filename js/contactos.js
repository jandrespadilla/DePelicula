function contactos() {
  
    $('#formularioContacto').html('');
    $('#formularioContacto').append('<h2 id="titulo_page_contact">'+titulos[0][localStorage.getItem('lang')]['titulo_page_contact']+'</h2>');
    $('#formularioContacto').append('<form id="form1"></form>');
    $('#form1').append('<div id="divNombre" class="mb-3"></div>');
    $('#form1').append('<div id="divEmail" class="mb-3"></div>');
    $('#form1').append('<div id="divConsulta" class="mb-3"></div>');
    $('#divNombre').append('<label id="lblNombre" for="nombre" class="form-label">'+titulos[0][localStorage.getItem('lang')]['lblNombre']+'</label>');
    $('#divNombre').append(' <input type="text" class="form-control" id="nombre">');
    $('#divEmail').append(' <label id="lblEmail" for="mail" class="form-label">'+titulos[0][localStorage.getItem('lang')]['lblEmail']+'</label>');
    $('#divEmail').append('<input type="text" class="form-control" id="mail">');
    $('#divConsulta').append('<label id="lblConsulta" for="consulta" class="form-label">'+titulos[0][localStorage.getItem('lang')]['lblConsulta']+'</label>');
    $('#divConsulta').append('  <textarea class="form-control" id="consulta"></textarea>');
    $('#form1').append(' <button id="enviar_datos" type="button" class="btn btn-primary">'+botones[0][localStorage.getItem('lang')]['enviar_datos']+'</button> ');
    $('#form1').append(' <button id="cargar_datos" type="button" class="btn btn-primary">'+botones[0][localStorage.getItem('lang')]['cargar_datos']+'</button> ');
    $('#form1').append(' <button id="borrar_datos" type="button" class="btn btn-primary">'+botones[0][localStorage.getItem('lang')]['borrar_datos']+'</button> ');
    $('#formularioContacto').append(' <div id="resultado" class="py-5"></div>');
  }
  contactos();

  $(function() {
    $('#toggle-event').change(function() {
          if ($(this).prop('checked')) {
            localStorage.setItem('lang','es');
           
            
        }else{
            localStorage.setItem('lang','en');
            
           
        }
        contactos();
        loadMenu();
     })
  })