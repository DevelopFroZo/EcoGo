let express;

express = require( "express" );

async function addHandler( req, res ){
  let body;

  body = req.body;
  res.send( await req.db.receptionPoints.add(
    body.companyId, body.name,
    body.photo, body.openTime,
    body.closeTime, body.address,
    body.lat, body.long
  ) );
}

async function getHandler( req, res ){
  res.send( await req.db.receptionPoints.get() );
}

function index(){
  let router;

  router = express.Router();

  router.post( "/add", addHandler );
  router.post( "/get", getHandler );

  return router;
}

module.exports = index();
