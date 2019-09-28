let requests = new Requests( {
    dataType : "json",
    responsePreprocess : data => JSON.parse( data )
} );

async function getPoints(){
    return res = await requests.post(
        '/receptionPoints/get'
    )
}

function markClick(){
    
}

function map() {
    let coords = []
    
    coords.push( 54.98, 82.89 ) 
    console.log( 2 )
    console.log( DG, 1 )
    let map
    DG.then( async () => {
        // иконка
        let receptionPointIcon = DG.icon( {
            iconUrl: './img/v4.png',
            iconSize: [40, 40]
        } )

        // создание карты
        map = DG.map( "map", {
            center : [ 55.790244, 49.119316 ],
            zoom : 16,
            //fullscreenControl : false,
            //zoomControl : false
        } );

        marker = DG.marker( [ 55.790244, 49.119316 ] );
        marker.addTo( map ).bindLabel( "Вы здесь" );
        map.setZoom( 16 ) 

        // определение геолокации
        // map.locate({setView: true, watch: true})
        //     .on('locationfound', function(e) {
                // marker = DG.marker( [ e.latitude, e.longitude ] );
                // marker.addTo( map ).bindLabel( "Вы здесь" );
                // map.setZoom( 16 ) 
        //     })
        //     .on('locationerror', function(e) {
        //         DG.popup()
        //           .setLatLng(map.getCenter())
        //           .setContent('Доступ к определению местоположения отключён')
        //           .openOn(map);
        //     });   
        
        // post на получение меток
        receptionPoint = await getPoints() 
        receptionPoint = receptionPoint.receptionPoints
        console.log( receptionPoint )
        
        // вывод меток
        for( let i = 0; i < receptionPoint.length; i++ ){
            let el = receptionPoint[i]
            marker = DG.marker( [ el.lat, el.long ], { icon : receptionPointIcon } );
            marker.addTo( map ).bindLabel( el.name );
            marker.addEventListener( "click", () => showReceptionPoint( receptionPoint[i] ) )
        }

        //getCoordsViaAdress( 'Казань Зинина 5' )
        //getAddressViaCoords( 37.611347, 55.760241 )
        console.log( getDistance( 55.781376, 49.113619, 55.788423, 49.12814 ) )
    } ) 
        
    
}