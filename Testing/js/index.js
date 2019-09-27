let requests, cookie;

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
  //     description : "Bottle 0.5",
  //     cost : 5
  //   }
  // );
  // console.log( data );
  // data = await requests.post(
  //   "/rates/add",
  //   {
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
}

window.addEventListener( "load", index );
