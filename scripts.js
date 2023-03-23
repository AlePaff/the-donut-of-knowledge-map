let stack = []

function is_mobile_device() {
    const WIDTH_MOBILE = 768;

    let width = window.innerWidth
    console.log("width: " + width)
    return (width < WIDTH_MOBILE) ? true : false
    // return navigator.userAgentData.mobile
}


function load_imagemap(id) {
    let imagemap = DATA[id].imagemap;
    let img_src = DATA[id].image;
    if (!is_mobile_device() && DATA[id].image_webp) {
        img_src = DATA[id].image_webp
    }
    let html = `<img id="img-` + id + `" src="` + img_src + `" usemap="#map-` + id + `" ` + `alt="` + DATA[id].title + `" >`
    html += `<map name="map-` + id + `">`

    imagemap.forEach(area => {
        html += `<area class="` + area.class + `" shape="` + area.shape + `" coords="` + area.coords + `" href="` + area.href + `" alt="` + area.alt + `" color="` + area.color + `" name="` + area.name + `"`
        //si tiene un puntero a otra seccion, se le añade el evento onclick
        if (area.points_to && (area.class != "not-yet")) {
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
        $("#atras").hide()
        $("#home").hide()
    } else {
        $("#atras").show()
        $("#home").show()
    }

    let datos = DATA[id]

    console.log(is_mobile_device())
    //volver atras y home button
    $("#atras").off("click").on("click", function () {
        // stack = eliminarBucles(stack)
        stack.pop()        //saca el elemento recien agregado
        load_section(stack.pop())      //devuelve el elemento anterior
    })
    $("#home").off("click").on("click", function () {
        stack = []
        load_section("donut")
    })

    // autor y video
    $("#author-name").html(datos.author_name)
    $("#author-link").attr("href", datos.author_link)

    if (datos.youtube_video != "") {
        $("#youtube-video").show()
        $("#youtube-video").attr("href", datos.youtube_video)
    } else {
        $("#youtube-video").hide()
    }


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

//ejemplos
//[a,b,c,d,c,d] -> [a,b,c,d]
// [a,b,c,b] -> [a,b,c,b]       //no elimina bucles de 1
// [a,b,c,b,b,b,b] -> [a,b,c,b]       //elimina si el ultimo elemento está repetido al lado
//[a,b,c,d,e,f,d,e,f, g,h] -> [a,b,c,d,e,f,g,h]
// function eliminarBucles(lista){
//     let listaSinBucles = []
//     let listaAux = lista.slice()        //copia de la lista
//     while(listaAux.length > 0){
//         let elemento = listaAux.shift()     //saca el primer elemento
//         if(!listaSinBucles.includes(elemento)){
//             listaSinBucles.push(elemento)
//         }
//     }
//     //si hay [a,b,c,d,d,d] -> [a,b,c,d]
//     if(listaSinBucles[listaSinBucles.length-1] == listaSinBucles[listaSinBucles.length-2]){
//         listaSinBucles.pop()
//     }
//     return listaSinBucles
// }


$(document).ready(function () {

    load_section("donut");

});
