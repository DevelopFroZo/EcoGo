let express;

express = require( "express" );

async function registerHandler( req, res ){
  res.send( await req.db.users.register(
    req.body.fi, req.body.email,
    req.body.phone, req.body.password
  ) );
}

async function authHandler( req, res ){
  res.send( await req.db.users.auth(
    req.body.emailOrPhone, req.body.password
  ) );
}

async function testHandler( req, res ){
  res.send( await req.db.users.test() );
}

function index(){
  let router;

  router = express.Router();

  router.post( "/register", registerHandler );
  router.post( "/auth", authHandler );
  router.post( "/test", testHandler );

  return router;
}

module.exports = index();
