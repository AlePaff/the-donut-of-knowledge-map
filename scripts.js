let stack = []


function load_imagemap(id) {
    let imagemap = DATA[id].imagemap;
    let img_src = DATA[id].image;
    let html = `<img id="img-` + id + `" src="` + img_src + `" usemap="#map-` + id + `" >`
    html += `<map name="map-` + id + `">`

    imagemap.forEach(area => {
        html += `<area class="` + area.class + `" shape="` + area.shape + `" coords="` + area.coords + `" href="` + area.href + `" alt="` + area.alt + `" color="` + area.color + `" name="` + area.name + `"`
        //si tiene un puntero a otra seccion, se le añade el evento onclick
        if (area.points_to) {
            html += `onclick=load_section("` + area.points_to + `")`
        }
        html += `>`
    });

    html += `</map>`
    return html;
}



function load_section(id) {
    stack.push(id)

    //si es la seccion principal, no se muestra el boton atras
    if (id == "donut") {
        // $("#atras").hide()
        // $("#home").hide()
    } else {
        $("#atras").show()
        $("#home").show()
    }

    let datos = DATA[id]

    //volver atras y home button
    $("#atras").off("click").on("click", function () {
        stack.pop()        //saca el elemento recien agregado
        load_section(stack.pop())      //devuelve el elemento anterior
    })
    $("#home").off("click").on("click", function () {
        stack = []
        load_section("donut")
    })

    // cosas del autor
    $("#author-name").html(datos.author_name)
    $("#author-link").attr("href", datos.author_link)
    $("#youtube-video").attr("href", datos.youtube_video)


    $(".container").html(load_imagemap(id))         //html() es para poner html dentro de un elemento


    //es necesario cargar el mapster despues de cargar cada html e imagen
    $("#img-" + id).mapster({
        fillColor: 'ffffff',        //color de relleno 
        fill: true,                 //si se rellena el area del color fillColor
        fillOpacity: 0.1,
        render_highlight: {         //cuando pongo el mouse encima
            fillOpacity: 0.5,
            strokeWidth: 8,
        },
        strokeColor: 'ffffff',
        stroke: true,
        singleSelect: true,      //si se puede clickear mas de un area
        mapKey: 'class',       //la clave que se usa para identificar las areas (ver html)
        strokeWidth: 5,
        staticState: true,          //para que un area esté siempre seleccionada

        //hace que las areas con clave 'not-yet' tenga un stroke de color especifo
        areas: [{
            key: 'not-yet',
            // strokeColor: '2ecc71',
            isSelectable: false,         //no se puede clickear, siempre permanece seleccionado
            fill: false,
            stroke: false,
        },
        ]
    });
}


$(document).ready(function () {     //cuando el documento este listo es decir cuando se cargue la pagina

    // añadir como hijo del div container a la clase "donut"
    // document.querySelector(".container").innerHTML = load_imagemap("donut");

    load_section("donut");


    // $('img').mapster({           //recordar: img[usemap] targetea a los que tengan img y el atributo usemap
    //     // fillColor: 'ff0000',        //color de relleno 
    //     fill: true,                 //si se rellena el area del color fillColor
    //     stroke: true,
    //     singleSelect: true,      //si se puede clickear mas de un area
    //     mapKey: 'color',       //la clave que se usa para identificar los areas (ver html)
    //     strokeWidth: 2,
    // 	staticState: true,          //para que un area esté siempre seleccionada


    //     //hace que las areas con clave 'green' tenga un stroke de color especificado
    //     areas: [{
    //         key: 'blue',
    //         strokeColor: '3498db',
    //     },
    //     {
    //         key: 'green',
    //         strokeColor: '2ecc71',
    //         isSelectable: false         //no se puede clickear, siempre permanece seleccionado
    //     },
    //     {
    //         key: 'yellow',
    //         strokeColor: 'f1c40f',
    //     }]
    // });

    // $('area.group1').mapster('select');

    // .empty()    //elimina todos los hijos del elemento seleccionado




});
