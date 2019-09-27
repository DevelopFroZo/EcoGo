let express;

express = require( "express" );

async function addHandler( req, res ){
  res.send( await req.db.typesOfTrashes.add(
    req.body.description
  ) );
}

async function connectWithRPHandler( req, res ){
  res.send( await req.db.typesOfTrashes.connectWithRP(
    req.body.receptionPointId, req.body.typeOfTrashId
  ) );
}

function index(){
  let router;

  router = express.Router();

  router.post( "/add", addHandler );
  router.post( "/connectWithRP", connectWithRPHandler );

  return router;
}

module.exports = index();
