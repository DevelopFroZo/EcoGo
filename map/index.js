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

$(document).ready( async function () {
    let coords = []

    coords.push( 54.98, 82.89 ) 
    if ( "geolocation" in navigator ) {
        navigator.geolocation.getCurrentPosition( ( position ) => {
            coords = [ position.coords.latitude, position.coords.longitude ]
            
            let map
            DG.then( () => {
                // иконка
                let receptionPointIcon = DG.icon( {
                    iconUrl: '../public/img/v4.png',
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
                
                receptionPoint = [ [55.61302, 49.293037], [55.612148, 49.302092], [55.609894, 49.295826]]
                
                // вывод меток
                for( let i = 0; i < receptionPoint.length; i++ ){
                    marker = DG.marker( [ receptionPoint[i][0], receptionPoint[i][1] ], { icon : receptionPointIcon } );
                    marker.addTo( map ).bindLabel( "Пункт приема мусора" );
                    marker.addEventListener( "click", markClick )
                }

                //getCoordsViaAdress( 'Казань Зинина 5' )
                getAddressViaCoords( 37.611347, 55.760241 )
            } ) 
        } )
    }
    

})