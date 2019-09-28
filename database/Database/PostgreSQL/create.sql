-- ecogo
CREATE DATABASE ecogo
    WITH
    OWNER = ecogo
    ENCODING = 'UTF8'
    LC_COLLATE = 'Russian_Russia.1251'
    LC_CTYPE = 'Russian_Russia.1251'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

-- companies
CREATE TABLE public.companies
(
    id serial NOT NULL,
    name character varying(100) COLLATE pg_catalog."default" NOT NULL
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.companies
    OWNER to ecogo;

-- rates
CREATE TABLE public.rates
(
    description character varying(100) COLLATE pg_catalog."default" NOT NULL,
    cost integer NOT NULL,
    id serial NOT NULL,
    typeoftrashid integer NOT NULL
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.rates
    OWNER to ecogo;

-- ratestorp
CREATE TABLE public.ratestorp
(
    receptionpointid integer NOT NULL,
    rateid integer NOT NULL
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.ratestorp
    OWNER to ecogo;

-- receptionpoints
CREATE TABLE public.receptionpoints
(
    name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    photo text COLLATE pg_catalog."default",
    opentime bigint NOT NULL,
    closetime bigint NOT NULL,
    address text COLLATE pg_catalog."default" NOT NULL,
    lat double precision NOT NULL,
    "long" double precision NOT NULL,
    companyid integer NOT NULL,
    id serial NOT NULL
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.receptionpoints
    OWNER to ecogo;

-- tottorp
CREATE TABLE public.tottorp
(
    receptionpointid integer NOT NULL,
    typeoftrashid integer NOT NULL
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.tottorp
    OWNER to ecogo;

-- trashdrops
CREATE TABLE public.trashdrops
(
    id serial NOT NULL,
    tottorpid integer NOT NULL,
    ratestorpid integer NOT NULL,
    date date NOT NULL,
    userid integer NOT NULL
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.trashdrops
    OWNER to ecogo;

-- typesoftrashes
CREATE TABLE public.typesoftrashes
(
    description character varying(100) COLLATE pg_catalog."default" NOT NULL,
    id integer NOT NULL DEFAULT nextval('typesoftrashes_id_seq'::regclass)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.typesoftrashes
    OWNER to ecogo;

-- users
CREATE TABLE public.users
(
    id serial NOT NULL,
    fi character varying(100) COLLATE pg_catalog."default" NOT NULL,
    email character varying(100) COLLATE pg_catalog."default" NOT NULL,
    password character varying(100) COLLATE pg_catalog."default" NOT NULL,
    phone character varying(20) COLLATE pg_catalog."default" NOT NULL,
    token character varying(528) COLLATE pg_catalog."default",
    balance integer NOT NULL DEFAULT 0,
    qrcode text COLLATE pg_catalog."default"
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.users
    OWNER to ecogo;
