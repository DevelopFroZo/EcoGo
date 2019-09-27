let express;

express = require( "express" );

async function addHandler( req, res ){
  res.send( await req.db.rates.add(
    req.body.description, req.body.cost
  ) );
}

async function connectWithRPHandler( req, res ){
  res.send( await req.db.rates.connectWithRP(
    req.body.receptionPointId, req.body.rateId
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
