
let requests = new Requests( {
    dataType : "json",
    responsePreprocess : data => JSON.parse( data )
  } );

function getCoords() {
    return new Promise( (res, rej) => {  
        let coords = []

        if ( "geolocation" in navigator ) {
            navigator.geolocation.getCurrentPosition( ( position ) => {
                coords.push( position.coords.latitude, position.coords.longitude );
                console.log( coords )
            } )
        } else {
            coords = null 
        }

        console.log( coords )
        res( coords )
    } )
}

function markClick(){
    alert( 1 )
}

async function mapLoader() {
    let map
    
    console.log(1)
    coords = await getCoords()
    console.log( 2 )

    if ( coords !== null ){
        map = DG.map( "map", {
            center : [ coords[0], coords[1] ],
            zoom : 14,
            fullscreenControl : false,
            zoomControl : false
        } );
        
        marker = DG.marker( [ coords[0], coords[1] ] );
        marker.addTo( map ).bindLabel( "Вы здесь" );
    } else {
        console.log( getCoords() )
    }
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

function init(){
    var myMap = new ymaps.Map("map", {
        // Координаты центра карты.
        // Порядок по умолчанию: «широта, долгота».
        // Чтобы не определять координаты центра карты вручную,
        // воспользуйтесь инструментом Определение координат.
        center: [55.76, 37.64],
        // Уровень масштабирования. Допустимые значения:
        // от 0 (весь мир) до 19.
        zoom: 7
    });

    let  multiRoute = new ymaps.multiRouter.MultiRoute({
        referencePoints: [
            "Москва, Красная площадь",
            [55.749, 37.524]
        ],
        params: {
            //Тип маршрутизации - пешеходная маршрутизация.
            routingMode: 'pedestrian'
        }
    } )
    console.log( multiRoute )
}

async function getPoints(){
    return res = await requests.post(
        '/receptionPoints/get'
    )
}

$(document).ready( async function () {
    let coords = []
    
    coords.push( 54.98, 82.89 ) 
    if ( "geolocation" in navigator ) {
        navigator.geolocation.getCurrentPosition( ( position ) => {
            coords = [ position.coords.latitude, position.coords.longitude ]
            
            let map
            DG.then( async () => {
                // иконка
                let receptionPointIcon = DG.icon( {
                    iconUrl: './img/v4.png',
                    iconSize: [40, 40]
                } )

                // создание карты
                map = DG.map( "map", {
                    center : [ 54.98, 82.89 ],
                    zoom : 16,
                    //fullscreenControl : false,
                    //zoomControl : false
                } );

                // определение геолокации
                map.locate({setView: true, watch: true})
                    .on('locationfound', function(e) {
                        marker = DG.marker( [ e.latitude, e.longitude ] );
                        marker.addTo( map ).bindLabel( "Вы здесь" );
                        map.setZoom( 16 ) 
                    })
                    .on('locationerror', function(e) {
                        DG.popup()
                          .setLatLng(map.getCenter())
                          .setContent('Доступ к определению местоположения отключён')
                          .openOn(map);
                    });   
                
                // post на получение меток
                receptionPoint = await getPoints() 
                receptionPoint = receptionPoint.receptionPoints 
                
                // вывод меток
                for( let i = 0; i < receptionPoint.length; i++ ){
                    let el = receptionPoint[i]
                    marker = DG.marker( [ el.lat, el.long ], { icon : receptionPointIcon } );
                    marker.addTo( map ).bindLabel( el.name );
                    marker.addEventListener( "click", markClick )
                }

                //getCoordsViaAdress( 'Казань Зинина 5' )
                //getAddressViaCoords( 37.611347, 55.760241 )
                console.log( getDistance( 55.781376, 49.113619, 55.788423, 49.12814 ) )
            } ) 
        } )
    }
    

})