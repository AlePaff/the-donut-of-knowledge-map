
function load_imagemap(id) {
    let imagemap = DATA[id].imagemap;
    let img_src = DATA[id].image;
    let html = `<img id="img-` + id + `" src="` + img_src + `" usemap="#map-` + id + `" >`
    html += `<map name="map-` + id + `">`

    imagemap.forEach(area => {
        html += `<area class="` + area.class + `" shape="` + area.shape + `" coords="` + area.coords + `" href="` + area.href + `" alt="` + area.alt + `" color="` + area.color + `" title="` + area.title + `" />`
    });

    html += `</map>`
    return html;
}

$(document).ready(function () {

    // añadir como hijo del div container a la clase "donut"
    document.querySelector(".container").innerHTML = load_imagemap("donut");
    

    $('img').mapster({           //recordar: img[usemap] targetea a los que tengan img y el atributo usemap
        // fillColor: 'ff0000',        //color de relleno 
        fill: true,                 //si se rellena el area del color fillColor
        stroke: true,
        singleSelect: false,      //si se puede clickear mas de un area
        mapKey: 'color',       //la clave que se usa para identificar los areas (ver html)
        strokeWidth: 2,


        //hace que las areas con clave 'green' tenga un stroke de color especificado
        areas: [{
            key: 'blue',
            strokeColor: '3498db',
        },
        {
            key: 'green',
            strokeColor: '2ecc71',
            isSelectable: false         //no se puede clickear, siempre permanece seleccionado
        },
        {
            key: 'yellow',
            strokeColor: 'f1c40f',
        }]
    });

    $('area.group1').mapster('select');



});
