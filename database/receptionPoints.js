class ReceptionPoints{
  constructor( modules ){
    this.modules = modules;
  }

  async add( companyId, name, photo, openTime, closeTime, address, lat, long ){
    let id;

    if( photo === undefined ) photo = null;

    id = ( await this.modules.db.query(
      "insert into receptionpoints( companyId, name, photo, opentime, closetime, address, lat, long ) " +
      "values( $1, $2, $3, $4, $5, $6, $7, $8 ) " +
      "returning id",
      [ companyId, name, photo, openTime, closeTime, address, lat, long ]
    ) ).rows[0].id;

    return {
      isSuccess : true,
      id
    };
  }
}

module.exports = ReceptionPoints;
