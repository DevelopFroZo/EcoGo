let crypto, salt, qrcode;

crypto = require( "crypto" );
salt = require( "./support/salt" );
qrcode = require( "./support/qrcode" );

class Users{
  constructor( modules ){
    this.modules = modules;
  }

  async register( fi, email, phone, password ){
    let salt_, id;

    salt_ = salt( 5 );
    password = crypto.createHash( "sha256" ).update( `${email}${password}${salt_}` ).digest( "hex" );

    id = ( await this.modules.db.query(
      "insert into users( fi, email, phone, password ) " +
      "values( $1, $2, $3, $4 ) " +
      "returning id",
      [ fi, email, phone, `${password};${salt_}` ]
    ) ).rows[0].id;

    return {
      isSuccess : true,
      id
    };
  }

  async auth( emailOrPhone, password ){
    let data, password_, token, qrcodeImage;

    data = ( await this.modules.db.query(
      "select id, fi, email, password, token " +
      "from users " +
      "where email = $1 or phone = $1",
      [ emailOrPhone ]
    ) ).rows[0];
    password_ = data.password.split( ";" );

    password = crypto.createHash( "sha256" ).update( `${data.email}${password}${password_[1]}` ).digest( "hex" );

    if( password !== password_[0] ) return { isSuccess : false };

    if( data.token !== null ) return {
      isSuccess : true,
      token : data.token
    };

    token = crypto.createHash( "sha256" ).update( `${data.email}${data.fi}${( new Date() ).getTime()}` ).digest( "hex" );
    qrcodeImage = await qrcode.create( token );

    await this.modules.db.query(
      "update users " +
      "set token = $1, qrcode = $2 " +
      "where email = $3",
      [ token, qrcodeImage, data.email ]
    );

    return {
      isSuccess : true,
      token
    };
  }

  async getUserInfo( token ){
    let data;

    data = await this.modules.db.query(
      "select fi, email, phone, balance, qrcode " +
      "from users " +
      "where token = $1",
      [ token ]
    );

    if( data.rowCount === 0 ) return {
      isSuccess : false,
      message : "Invalid token"
    };

    data = data.rows[0];

    return {
      isSuccess : true,
      fi : data.fi,
      email : data.email,
      phone : data.phone,
      balance : data.balance,
      qrcode : data.qrcode
    };
  }
}

module.exports = Users;
