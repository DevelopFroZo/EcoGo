let express;

express = require( "express" );

async function addHandler( req, res ){
  res.send( await req.db.rates.add(
    req.body.typeOfTrashId, req.body.description, req.body.cost
  ) );
}

async function connectWithRPHandler( req, res ){
  res.send( await req.db.rates.connectWithRP(
    req.body.receptionPointId, req.body.rateId
  ) );
}

async function getHandler( req, res ){
  res.send( await req.db.rates.get(
    req.body.typeOfTrashId
  ) );
}

function index(){
  let router;

  router = express.Router();

  router.post( "/add", addHandler );
  router.post( "/connectWithRP", connectWithRPHandler );
  router.post( "/get", getHandler );

  return router;
}

module.exports = index();
