class Rates{
  constructor( modules ){
    this.modules = modules;
  }

  async add( typeOfTrashId, description, cost ){
    let id;

    id = ( await this.modules.db.query(
      "insert into rates( typeoftrashid, description, cost ) " +
      "values( $1, $2, $3 ) " +
      "returning id",
      [ typeOfTrashId, description, cost ]
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

  async get( typeOfTrashId ){
    let rates;

    rates = ( await this.modules.db.query(
      "select description, cost " +
      "from rates " +
      "where typeoftrashid = $1",
      [ typeOfTrashId ]
    ) ).rows;

    return {
      isSuccess : true,
      rates
    };
  }
}

module.exports = Rates;
