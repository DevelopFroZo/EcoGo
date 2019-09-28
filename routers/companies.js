let express;

express = require( "express" );

async function addHandler( req, res ){
  res.send( await req.db.companies.add(
    req.body.name
  ) );
}

function index(){
  let router;

  router = express.Router();

  router.post( "/add", addHandler );

  return router;
}

module.exports = index();
