let express;

express = require( "express" );

async function registerHandler( req, res ){
  res.send( await req.db.rates.add(
    //
  ) );
}

function index(){
  let router;

  router = express.Router();

  router.post( "/register", registerHandler );

  return router;
}

module.exports = index();
