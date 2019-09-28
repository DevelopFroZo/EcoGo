let requests, cookie;

async function addReceptionPoints(){
  let companies, typesOfTrashes, receptionPoints;

  companies = [ "ООО Исток", "Эколайн", "Хартия" ];
  typesOfTrashes = [
    {
      description : "Бумага",
      rates : [
        {
          typeOfTrashId : 1,
          description : "0-10 килограмм",
          cost : 10
        },
        {
          typeOfTrashId : 1,
          description : "10+ килограмм",
          cost : 20
        }
      ]
    },
    {
      description : "Пластик",
      rates : [
        {
          typeOfTrashId : 2,
          description : "0.5л",
          cost : 5
        },
        {
          typeOfTrashId : 2,
          description : "1л",
          cost : 10
        },
        {
          typeOfTrashId : 2,
          description : "1.5",
          cost : 20
        }
      ]
    },
    {
      description : "Металл",
      rates : [
        {
          typeOfTrashId : 3,
          description : "за 100г",
          cost : 5
        }
      ]
    },
    {
      description : "Батарейки",
      rates : [
        {
          typeOfTrashId : 4,
          description : "ААА",
          cost : 5
        },
        {
          typeOfTrashId : 4,
          description : "АА",
          cost : 10
        },
        {
          typeOfTrashId : 4,
          description : "А",
          cost : 15
        }
      ]
    },
    {
      description : "Стекло",
      rates : [
        {
          typeOfTrashId : 5,
          description : "0.5л",
          cost : 10
        },
        {
          typeOfTrashId : 5,
          description : "1л",
          cost : 15
        },
        {
          typeOfTrashId : 5,
          description : "1.5л",
          cost : 20
        }
      ]
    },
    {
      description : "Одежда",
      rates : [
        {
          typeOfTrashId : 6,
          description : "За шт",
          cost : 5
        }
      ]
    },
    {
      description : "Лампочки",
      rates : [
        {
          typeOfTrashId : 7,
          description : "За шт",
          cost : 5
        }
      ]
    }
  ];

  console.log( "Add companies" );
  console.log();

  for( let i = 0; i < companies.length; i++ )
    console.log( await requests.post(
      "/companies/add",
      { name : companies[i] }
    ) );

  console.log( "Add types of trashes" );
  console.log();

  for( let i = 0; i < typesOfTrashes.length; i++ )
    console.log( await requests.post(
      "/typesOfTrashes/add",
      { description : typesOfTrashes[i].description }
    ) )

  receptionPoints = [
    {
      name : "Штаб",
      openTime : 0,
      closeTime : 1440,
      address : "г. Казань, ул. Татарстан, 20",
      lat : 55.781385,
      long : 49.113656,
      companyId : Math.floor( Math.random() * 3 ) + 1
    },
    {
      name : "МОЛОДО-ЗЕЛЕНО И М.ВИДЕО",
      openTime : 600,
      closeTime : 1320,
      address : "г. Казань, ул. Петербургская, 1",
      lat : 55.786707,
      long : 49.124739,
      companyId : Math.floor( Math.random() * 3 ) + 1
    },
    {
      name : "GREEN LIFE",
      openTime : 540,
      closeTime : 1260,
      address : "г. Казань, ул. Московская, д. 2",
      lat : 55.788601,
      long : 49.121247,
      companyId : Math.floor( Math.random() * 3 ) + 1
    },
    {
      name : "ПУНКТ ПРИЁМА БАТАРЕЕК",
      openTime : 540,
      closeTime : 1260,
      address : "г. Казань, ул. Московская, д. 2",
      lat : 55.792392,
      long : 49.102171,
      companyId : Math.floor( Math.random() * 3 ) + 1
    },
    {
      name : "ПУНКТ ПРИЁМА ЭКОТЕК",
      openTime : 780,
      closeTime : 960,
      address : "г. Казань, ул. Салимжанова, 14",
      lat : 55.774603,
      long : 49.13491,
      companyId : Math.floor( Math.random() * 3 ) + 1
    },
    {
      name : "ЭКОЛОГИЯ ПОВОЛЖЬЯ",
      openTime : 510,
      closeTime : 1050,
      address : "г. Казань, ул. Вишневского, д. 26А, офис 110",
      lat : 55.779968,
      long : 49.145215,
      companyId : Math.floor( Math.random() * 3 ) + 1
    },
    {
      name : "СЕТКА ДЛЯ ПЛАСТИКА",
      openTime : 0,
      closeTime : 1440,
      address : "г. Казань, ул. Вишневского, 57",
      lat : 55.78264,
      long : 49.149877,
      companyId : Math.floor( Math.random() * 3 ) + 1
    },
    {
      name : "СЕТКА ДЛЯ ПЛАСТИКА",
      openTime : 0,
      closeTime : 1440,
      address : "г. Казань, ул. Толбухина, 7",
      lat : 55.781213,
      long : 49.168561,
      companyId : Math.floor( Math.random() * 3 ) + 1
    },
    {
      name : "БАЗАЛЬТ",
      openTime : 480,
      closeTime : 1020,
      address : "г. Казань, ул. Даурская, д. 46А",
      lat : 55.767536,
      long : 49.189472,
      companyId : Math.floor( Math.random() * 3 ) + 1
    }
  ];

  console.log( "Create reception points" );
  console.log();

  for( let i = 0; i < receptionPoints.length; i++ )
    console.log( await requests.post(
      "/receptionPoints/add",
      receptionPoints[i]
    ) );

  console.log( "Connect types of trashs to receptions points" );
  console.log();

  for( let i = 0; i < receptionPoints.length; i++ )
    for( let j = 0; j < typesOfTrashes.length; j++ )
      if( Math.random() <= 0.4 )
        console.log( await requests.post(
          "/typesOfTrashes/connectWithRP",
          { receptionPointId : i + 1, typeOfTrashId : j + 1 }
        ) );
}

async function index(){
  let data;

  requests = new Requests( {
    dataType : "json",
    responsePreprocess : data => JSON.parse( data )
  } );
  cookie = new Cookie();
  cookie.delete( "token" );

  // data = await requests.post(
  //   "/receptionPoints/add",
  //   {
  //     companyId : 1,
  //     name : "Testing",
  //     openTime : 123456,
  //     closeTime : 1234567,
  //     address : "Something address",
  //     lat : 54,
  //     long : 60
  //   }
  // );
  // console.log( data );
  // data = await requests.post(
  //   "/typesOfTrashes/add",
  //   {
  //     description : "Glass"
  //   }
  // );
  // console.log( data );
  // data = await requests.post(
  //   "/typesOfTrashes/add",
  //   {
  //     description : "Plastic"
  //   }
  // );
  // console.log( data );
  // data = await requests.post(
  //   "/typesOfTrashes/connectWithRP",
  //   {
  //     receptionPointId : 1,
  //     typeOfTrashId : 1
  //   }
  // );
  // console.log( data );
  // data = await requests.post(
  //   "/typesOfTrashes/connectWithRP",
  //   {
  //     receptionPointId : 1,
  //     typeOfTrashId : 2
  //   }
  // );
  // console.log( data );
  // data = await requests.post(
  //   "/rates/add",
  //   {
  //     typeOfTrashId : 1,
  //     description : "Bottle 0.5",
  //     cost : 5
  //   }
  // );
  // console.log( data );
  // data = await requests.post(
  //   "/rates/add",
  //   {
  //     typeOfTrashId : 1,
  //     description : "Bottle 1",
  //     cost : 10
  //   }
  // );
  // console.log( data );
  // data = await requests.post(
  //   "/rates/connectWithRP",
  //   {
  //     receptionPointId : 1,
  //     rateId : 1
  //   }
  // );
  // console.log( data );
  // data = await requests.post(
  //   "/rates/connectWithRP",
  //   {
  //     receptionPointId : 1,
  //     rateId : 2
  //   }
  // );
  // console.log( data );
  // data = await requests.post(
  //   "/receptionPoints/get"
  // );
  // console.log( data );
  // data = await requests.post(
  //   "/typesOfTrashes/get",
  //   { receptionPointId : 1 }
  // );
  // console.log( data );
  // data = await requests.post(
  //   "/rates/get",
  //   { typeOfTrashId : 1 }
  // );
  // console.log( data );
  // data = await requests.post(
  //   "/users/register",
  //   {
  //     fi : "Иванов Иван",
  //     email : "example@example.com",
  //     phone : "89999999999",
  //     password : "123456"
  //   }
  // );
  // console.log( data );
  // data = await requests.post(
  //   "/users/auth",
  //   {
  //     emailOrPhone : "example@example.com",
  //     password : "123456"
  //   }
  // );
  // console.log( data );
  // data = await requests.post(
  //   "/users/test"
  // );
  // console.log( data );
  addReceptionPoints();
}

window.addEventListener( "load", index );
