let pg, connectSettings;

pg = require( "pg" );
connectSettings = require( "./connectSettings.json" );

function index(){
  let modules;

  modules = {};
  modules.db = pg.Pool( connectSettings );
  modules.receptionPoints = new ( require( "./receptionPoints" ) )( modules );
  modules.typesOfTrashes = new ( require( "./typesOfTrashes" ) )( modules );
  modules.rates = new ( require( "./rates" ) )( modules );
  modules.users = new ( require( "./users" ) )( modules );
  modules.companies = new ( require( "./companies" ) )( modules );  

  return modules;
}

module.exports = index();
