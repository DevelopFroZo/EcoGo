let data = {
  "companies" : [
    "ООО Исток",
    "Эколайн",
    "Хартия"
  ],
  "users" : [
    "Миронов Филипп",
    "Харитонова София",
    "Журавлёв Бронислав",
    "Герасимова Дина",
    "Колесников Пётр",
    "Мухина Марина",
    "Нестеров Ленар",
    "Андрусейко Доминика",
    "Жуков Захар",
    "Городецка Светлана",
    "Силин Доминик",
    "Самойлова Борислава",
    "Мухин Фёдор",
    "Сидорова Дарья",
    "Киселёв Стефан",
    "Бутко Ульяна",
    "Константинов Эрик",
    "Соловьёва Таисия",
    "Иваненко Геннадий",
    "Козлова Майя"
  ],
  "typesOfTrashes" : [
    {
      "description" : "Пластик",
      "rates" : [
        {
          "description" : "0-10 килограмм",
          "cost" : 10
        },
        {
          "description" : "10+ килограмм",
          "cost" : 20
        }
      ]
    },
    {
      "description" : "Батарейки",
      "rates" : [
        {
          "description" : "0.5л",
          "cost" : 5
        },
        {
          "description" : "1л",
          "cost" : 10
        },
        {
          "description" : "1.5",
          "cost" : 20
        }
      ]
    },
    {
      "description" : "Лампочки",
      "rates" : [
        {
          "description" : "за 100г",
          "cost" : 5
        }
      ]
    },
    {
      "description" : "Тетрапак",
      "rates" : [
        {
          "description" : "ААА",
          "cost" : 5
        },
        {
          "description" : "АА",
          "cost" : 10
        },
        {
          "description" : "А",
          "cost" : 15
        }
      ]
    },
    {
      "description" : "Железо",
      "rates" : [
        {
          "description" : "0.5л",
          "cost" : 10
        },
        {
          "description" : "1л",
          "cost" : 15
        },
        {
          "description" : "1.5л",
          "cost" : 20
        }
      ]
    }
  ],
  "receptionPoints" : [
    {
      "name" : "Штаб",
      "openTime" : 0,
      "closeTime" : 1440,
      "address" : "г. Казань, ул. Татарстан, 20",
      "lat" : 55.781385,
      "long" : 49.113656,
      "companyId" : Math.floor( Math.random() * 3 ) + 1
    },
    {
      "name" : "МОЛОДО-ЗЕЛЕНО И М.ВИДЕО",
      "openTime" : 600,
      "closeTime" : 1320,
      "address" : "г. Казань, ул. Петербургская, 1",
      "lat" : 55.786707,
      "long" : 49.124739,
      "companyId" : Math.floor( Math.random() * 3 ) + 1
    },
    {
      "name" : "GREEN LIFE",
      "openTime" : 540,
      "closeTime" : 1260,
      "address" : "г. Казань, ул. Московская, д. 2",
      "lat" : 55.788601,
      "long" : 49.121247,
      "companyId" : Math.floor( Math.random() * 3 ) + 1
    },
    {
      "name" : "ПУНКТ ПРИЁМА БАТАРЕЕК",
      "openTime" : 540,
      "closeTime" : 1260,
      "address" : "г. Казань, ул. Московская, д. 2",
      "lat" : 55.792392,
      "long" : 49.102171,
      "companyId" : Math.floor( Math.random() * 3 ) + 1
    },
    {
      "name" : "ПУНКТ ПРИЁМА ЭКОТЕК",
      "openTime" : 780,
      "closeTime" : 960,
      "address" : "г. Казань, ул. Салимжанова, 14",
      "lat" : 55.774603,
      "long" : 49.13491,
      "companyId" : Math.floor( Math.random() * 3 ) + 1
    },
    {
      "name" : "ЭКОЛОГИЯ ПОВОЛЖЬЯ",
      "openTime" : 510,
      "closeTime" : 1050,
      "address" : "г. Казань, ул. Вишневского, д. 26А, офис 110",
      "lat" : 55.779968,
      "long" : 49.145215,
      "companyId" : Math.floor( Math.random() * 3 ) + 1
    },
    {
      "name" : "СЕТКА ДЛЯ ПЛАСТИКА",
      "openTime" : 0,
      "closeTime" : 1440,
      "address" : "г. Казань, ул. Вишневского, 57",
      "lat" : 55.78264,
      "long" : 49.149877,
      "companyId" : Math.floor( Math.random() * 3 ) + 1
    },
    {
      "name" : "СЕТКА ДЛЯ ПЛАСТИКА",
      "openTime" : 0,
      "closeTime" : 1440,
      "address" : "г. Казань, ул. Толбухина, 7",
      "lat" : 55.781213,
      "long" : 49.168561,
      "companyId" : Math.floor( Math.random() * 3 ) + 1
    },
    {
      "name" : "БАЗАЛЬТ",
      "openTime" : 480,
      "closeTime" : 1020,
      "address" : "г. Казань, ул. Даурская, д. 46А",
      "lat" : 55.767536,
      "long" : 49.189472,
      "companyId" : Math.floor( Math.random() * 3 ) + 1
    }
  ]
}

async function index(){
  let n, tmp;

  n = 500;
  requests = new Requests( {
    dataType : "json",
    responsePreprocess : data => JSON.parse( data )
  } );
  cookie = new Cookie();

  console.log( "Start add companies..." );

  for( let i = 0; i < data.companies.length; i++ )
    console.log( await requests.post(
      "/companies/add",
      { name : data.companies[i] }
    ) );

  console.log( "Finished" );
  console.log( "Start add users..." );

  for( let i = 0; i < data.users.length; i++ )
    console.log( await requests.post(
      "/users/register",
      { fi : data.users[i], email : "q@w.e", phone : "89999999999", password : "123456" }
    ) );

  console.log( "Finished" );
  console.log( "Start add types of trashes..." );

  for( let i = 0; i < data.typesOfTrashes.length; i++ )
    console.log( await requests.post(
      "/typesOfTrashes/add",
      { description : data.typesOfTrashes[i].description }
    ) );

  console.log( "Finished" );
  console.log( "Start add rates..." );

  for( let i = 0; i < data.typesOfTrashes.length; i++ ){
    tmp = data.typesOfTrashes[i].rates;

    for( let j = 0; j < tmp.length; j++ )
      console.log( await requests.post(
        "/rates/add",
        {
          typeOfTrashId : i + 1,
          description : tmp[j].description,
          cost : tmp[j].cost
        }
      ) );
  }

  console.log( "Finished" );
  console.log( "Start add reception points..." );

  for( let i = 0; i < data.receptionPoints.length; i++ ){
    tmp = data.receptionPoints[i];

    console.log( await requests.post(
      "/receptionPoints/add",
      {
        companyId : Math.floor( Math.random( data.companies.length ) ) + 1,
        name : tmp.name,
        openTime : tmp.openTime,
        closeTime : tmp.closeTime,
        address : tmp.address,
        lat : tmp.lat,
        long : tmp.long
      }
    ) );
  }

  console.log( "Finished" );
  console.log( "Connect types of trashes and rates to reception points..." );

  for( let i = 0; i < data.receptionPoints.length; i++ )
    for( let j = 0; j < data.typesOfTrashes.length; j++ )
      if( Math.random() <= 0.4 ){
        console.log( 0, await requests.post(
          "/typesOfTrashes/connectWithRP",
          { receptionPointId : i + 1, typeOfTrashId : j + 1 }
        ), i + 1, j + 1 );
        console.log( 1, await requests.post(
          "/rates/connectWithRP",
          { receptionPointId : i + 1, rateId : j + 1 }
        ), i + 1, j + 1 );
      }

  console.log( "Finished" );
  console.log( `Start ${n} iterations...` );
}

index();
