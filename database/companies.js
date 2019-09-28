class Companies{
  constructor( modules ){
    this.modules = modules;
  }

  async add( name ){
    let id;

    id = ( await this.modules.db.query(
      "insert into companies( name ) " +
      "values( $1 ) " +
      "returning id",
      [ name ]
    ) ).rows[0].id;

    return {
      isSuccess : true,
      id
    };
  }
}

module.exports = Companies;
