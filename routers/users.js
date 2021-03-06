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

async function getUserInfoHandler( req, res ){
  res.send( await req.db.users.getUserInfo(
    req.cookies.token
  ) );
}

function index(){
  let router;

  router = express.Router();

  router.post( "/register", registerHandler );
  router.post( "/auth", authHandler );
  router.post( "/getUserInfo", getUserInfoHandler );

  return router;
}

module.exports = index();
