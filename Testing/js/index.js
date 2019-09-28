let requests, cookie;

async function addReceptionPoints(){
  let receptionPoints;

  // {
  //   typeOfTrashId : ,
  //   description : "",
  //   cost :
  // }

  receptionPoints = {
    "Штаб" : {
      opentime : 0,
      closetime : 1440,
      address : "г. Казань, ул. Татарстан, 20",
      lat : 55.781385,
      long : 49.113656,
      companyid : 1,
      rates : [
        {
          typeOfTrashId : 1,
          description : "",
          cost :
        }
      ]
    },
    "" : {
      opentime : ,
      closetime : ,
      address : "",
      lat : ,
      long : ,
      companyid : ,
      typesOfTrashes : {
        "" : {
          "" : ,
          "" : ,
          "" :
        }
      }
    },
    "" : {
      opentime : ,
      closetime : ,
      address : "",
      lat : ,
      long : ,
      companyid : ,
      typesOfTrashes : {
        "" : {
          "" : ,
          "" : ,
          "" :
        }
      }
    },
    "" : {
      opentime : ,
      closetime : ,
      address : "",
      lat : ,
      long : ,
      companyid : ,
      typesOfTrashes : {
        "" : {
          "" : ,
          "" : ,
          "" :
        }
      }
    },
    "" : {
      opentime : ,
      closetime : ,
      address : "",
      lat : ,
      long : ,
      companyid : ,
      typesOfTrashes : {
        "" : {
          "" : ,
          "" : ,
          "" :
        }
      }
    },
    "" : {
      opentime : ,
      closetime : ,
      address : "",
      lat : ,
      long : ,
      companyid : ,
      typesOfTrashes : {
        "" : {
          "" : ,
          "" : ,
          "" :
        }
      }
    },
    "" : {
      opentime : ,
      closetime : ,
      address : "",
      lat : ,
      long : ,
      companyid : ,
      typesOfTrashes : {
        "" : {
          "" : ,
          "" : ,
          "" :
        }
      }
    },
    "" : {
      opentime : ,
      closetime : ,
      address : "",
      lat : ,
      long : ,
      companyid : ,
      typesOfTrashes : {
        "" : {
          "" : ,
          "" : ,
          "" :
        }
      }
    },
    "" : {
      opentime : ,
      closetime : ,
      address : "",
      lat : ,
      long : ,
      companyid : ,
      typesOfTrashes : {
        "" : {
          "" : ,
          "" : ,
          "" :
        }
      }
    }
  };
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
}

window.addEventListener( "load", index );
