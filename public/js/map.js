let requests = new Requests( {
    dataType : "json",
    responsePreprocess : data => JSON.parse( data )
} );

var receptionPointIcon;
var map
let marker
let coords = [ 55.790244, 49.119316 ]
var markers = []
var types

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

function getTop( receptionPoints, types, coords ){
    let data
    let dataIndex
    let min = []
    let tmp

    for( let i = 0; i < types.length; i++ ){
        data = -1
        dataIndex = -1
        for( let j = 0; j < receptionPoints.length; j++ ){
            tmp = receptionPoints[j].types.typesOfTrashes
            for(let k = 0; k < tmp.length; k++ ){
                if(
                    tmp[k].typeoftrashid == types[i] &&
                    (
                        data == -1 ||
                        data > getDistance( coords[0], coords[1], receptionPoints[j].lat, receptionPoints[j].long )
                    ) 
                ) {
                    data = getDistance( coords[0], coords[1], receptionPoints[j].lat, receptionPoints[j].long );
                    dataIndex = j
                }
            }
        }
        min.push( {
            type : types[i],
            index : dataIndex,
            distance : data
        } )
    }

    for (let i = 0, endI = min.length - 1; i < endI; i++) {
        for (let j = 0, endJ = endI - i; j < endJ; j++) {
            if (min[j].distance > min[j + 1].distance) {
                let swap = min[j].distance;
                min[j].distance = min[j + 1].distance;
                min[j + 1].distance = swap;
            }
        }
    }

    return min
}

async function createMarkers( receptionPoint, receptionPointIcon, map, type ){
    for( let i = 0; i < markers.length; i++ ){
        markers[i].removeFrom( map )
    }

    markers = []

    types = []
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

        if( type !== "" ){
            let e = el.types.typesOfTrashes
            for( let i = 0; i < e.length; i++ ){
                if( e[i].description == type ){
                    marker = DG.marker( [ el.lat, el.long ], { icon : receptionPointIcon } );
                    marker.addTo( map ).bindLabel( el.name );
                    marker.addEventListener( "click", () => showReceptionPoint( receptionPoint[i], res ) )
                    markers.push( marker )
                }
            }
        } else {
            marker = DG.marker( [ el.lat, el.long ], { icon : receptionPointIcon } );
            marker.addTo( map ).bindLabel( el.name );
            marker.addEventListener( "click", () => showReceptionPoint( receptionPoint[i], res ) )
            markers.push( marker )
        }
    }
}

async function search( address ){
    let addressCoords = await getCoordsViaAdress( address )
    map.setView( 
        addressCoords,
        16
     )
}

function clickHandler( e ){
    marker.removeFrom( map )
    marker = null
    coords = [e.latlng.lat, e.latlng.lng]
    marker = DG.marker( [e.latlng.lat, e.latlng.lng] )
    marker.addTo( map ).bindLabel( "Вы здесь" );
}

function map() {
    DG.then( async () => {
        // иконка
        receptionPointIcon = DG.icon( {
            iconUrl: './img/v4.png',
            iconSize: [40, 40]
        } )

        // создание карты
        map = DG.map( "map", {
            center : [ coords[0], coords[1] ],
            zoom : 16,
            fullscreenControl : false,
            zoomControl : false
        } );

        marker = DG.marker( [ coords[0], coords[1] ] );
        marker.addTo( map ).bindLabel( "Вы здесь" );
        map.setZoom( 16 ) 
        //map.addEventListener( 'click', (e) => { clickHandler(e) } )

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

        // вывод меток
        await createMarkers( receptionPoint, receptionPointIcon, map, "" )

        getTop( receptionPoint, types, coords)
        //await search( 'город Иркутск улица Пискунова дом 102' )
    } ) 
}