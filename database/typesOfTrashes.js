class TypesOfTrashes{
  constructor( modules ){
    this.modules = modules;
  }

  async add( description ){
    let id;

    id = ( await this.modules.db.query(
      "insert into typesOfTrashes( description ) " +
      "values( $1 ) " +
      "returning id",
      [ description ]
    ) ).rows[0].id;

    return {
      isSuccess : true,
      id
    };
  }

  async connectWithRP( receptionPointId, typeOfTrashId ){
    await this.modules.db.query(
      "insert into tottorp( receptionpointid, typeoftrashid ) " +
      "values( $1, $2 )",
      [ receptionPointId, typeOfTrashId ]
    );

    return { isSuccess : true };
  }

  async get( receptionPointId ){
    let typesOfTrashes;

    typesOfTrashes = ( await this.modules.db.query(
      "select tottorp.typeoftrashid, tot.description " +
      "from tottorp, typesoftrashes as tot " +
      "where tottorp.typeoftrashid = tot.id and receptionpointid = $1",
      [ receptionPointId ]
    ) ).rows;

    return {
      isSuccess : true,
      typesOfTrashes
    };
  }
}

module.exports = TypesOfTrashes;
