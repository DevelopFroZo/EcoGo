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

function index(){
  let router;

  router = express.Router();

  router.post( "/add", addHandler );

  return router;
}

module.exports = index();
