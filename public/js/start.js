let coords = []
let map

$(document).ready(function () {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
            coords.push( position.coords.latitude, position.coords.longitude );

            DG.then( () => {
                map = DG.map( "map", {
                    center : [ coords[0], coords[1] ],
                    zoom : 16,
                    fullscreenControl : false,
                    zoomControl : false
                } );
                
                marker = DG.marker( [ coords[0], coords[1] ] );
                marker.addTo( map ).bindLabel( "Вы здесь" );
            } )

        });
    } else {
        console.log("error")
    }
})

