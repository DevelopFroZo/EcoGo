let qrcode;

qrcode = require( "qrcode" );

qrcode.create = ( text ) => {
  return new Promise( ( res, rej ) => {
    qrcode.toDataURL( text, ( error, url ) => {
      if( error ) rej( error );
      else res( url );
    } );
  } );
};

module.exports = qrcode;
