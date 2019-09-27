class Rates{
  constructor( modules ){
    this.modules = modules;
  }

  async add( description, cost ){
    let id;

    id = ( await this.modules.db.query(
      "insert into rates( description, cost ) " +
      "values( $1, $2 ) " +
      "returning id",
      [ description, cost ]
    ) ).rows[0].id;

    return {
      isSuccess : true,
      id
    };
  }

  async connectWithRP( receptionPointId, rateId ){
    await this.modules.db.query(
      "insert into ratestorp( receptionpointid, rateid ) " +
      "values( $1, $2 )",
      [ receptionPointId, rateId ]
    );

    return { isSuccess : true };
  }
}

module.exports = Rates;
