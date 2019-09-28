delete from receptionpoints;
alter sequence receptionpoints_id_seq restart;

delete from typesoftrashes;
alter sequence typesoftrashes_id_seq restart;

delete from tottorp;

delete from rates;
alter sequence rates_id_seq restart;

delete from ratestorp;

delete from users;
alter sequence users_id_seq restart;
