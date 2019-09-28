let requests = new Requests( {
    dataType : "json",
    responsePreprocess : data => JSON.parse( data )
} );

async function getPoints(){
    return res = await requests.post(
        '/receptionPoints/get'
    )
}

//Получение координат по адресу (вводить адрес в формате "Город улица дом"), возвращвет массив из двух элементов
async function getCoordsViaAdress( address ){
    let data = address.split( ' ' )
    address = ''
    for( let i = 0; i < data.length; i++ ){
        if( i == data.length-1 ) address += data[i]
        else address+= data[i] + '+'
    } 
    data = await requests.get(
        `https://geocode-maps.yandex.ru/1.x/?apikey=7d628504-e28d-43e5-9119-114035dcc629&format=json&geocode=${address}`
    )

    return data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split( ' ' ) 
}

//Получение адреса по координатам, возвращвет строку
async function getAddressViaCoords( lat, long ){
    let data = await requests.get(
        `https://geocode-maps.yandex.ru/1.x/?apikey=7d628504-e28d-43e5-9119-114035dcc629&format=json&geocode=${lat},${long}`
    )

    data = data.response.GeoObjectCollection.featureMember[0].GeoObject 

    return `${data.name}, ${data.description}`
} 

function getDistance(lat1,lon1,lat2,lon2) {
    let R = 6371; // Radius of the earth in km
    let dLat = deg2rad(lat2-lat1);  // deg2rad below
    let dLon = deg2rad(lon2-lon1); 
    let a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2); 
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    let d = R * c * 1000; // Distance in km
    return Math.floor( d );
  }
  
function deg2rad(deg) {
    return deg * (Math.PI/180)
}

function getTop( receptionPoints, types ){
    let data;

    for( let i = 0; i < types.length; i++ ){
        console.log( receptionPoint )
        return
    }

    console.log( receptionPoints )
}

function map() {
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
            fullscreenControl : false,
            zoomControl : false
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
         
        // console.log( await requests.post( 
        //     '/rates/get',
        //     {
        //         typeOfTrashId : 1
        //     }
        //  ) )

        let types = []

        // вывод меток
        for( let i = 0; i < receptionPoint.length; i++ ){
            let el = receptionPoint[i]

            let res =  await requests.post( 
                '/typesOfTrashes/get',
                {
                    receptionPointId : receptionPoint[i].id
                }
            )

            for( let j = 0; j < res.typesOfTrashes.length; j++ ){
                if( types.indexOf( res.typesOfTrashes[j].typeoftrashid ) == -1 ){
                    types.push( res.typesOfTrashes[j].typeoftrashid )
                } 
            }

            receptionPoint[i].types = res

            marker = DG.marker( [ el.lat, el.long ], { icon : receptionPointIcon } );
            marker.addTo( map ).bindLabel( el.name );
            marker.addEventListener( "click", () => showReceptionPoint( receptionPoint[i], res ) )
        }

        getTop( receptionPoint, types )

        //getCoordsViaAdress( 'Казань Зинина 5' )
        //getAddressViaCoords( 37.611347, 55.760241 )
        //console.log( getDistance( 55.781376, 49.113619, 55.788423, 49.12814 ) )
    } ) 
        
    
}