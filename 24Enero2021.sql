--
-- PostgreSQL database dump
--

-- Dumped from database version 11.5
-- Dumped by pg_dump version 12.2

-- Started on 2020-03-09 22:07:10 CST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

--
-- TOC entry 199 (class 1259 OID 16421)
-- Name: Clients; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Clients" (
    uuid_client uuid NOT NULL,
    id_client integer NOT NULL,
    data jsonb NOT NULL,
    status bigint NOT NULL,
    created_at date NOT NULL,
    updated_at date NOT NULL
);


ALTER TABLE public."Clients" OWNER TO postgres;

--
-- TOC entry 198 (class 1259 OID 16419)
-- Name: Clients_id_client_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Clients_id_client_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Clients_id_client_seq" OWNER TO postgres;

--
-- TOC entry 3871 (class 0 OID 0)
-- Dependencies: 198
-- Name: Clients_id_client_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Clients_id_client_seq" OWNED BY public."Clients".id_client;


--
-- TOC entry 207 (class 1259 OID 16465)
-- Name: Cupon; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Cupon" (
    uuid_cupon uuid NOT NULL,
    id_cupon integer NOT NULL,
    data jsonb NOT NULL,
    data_rooms jsonb NOT NULL,
    "data_travelA" jsonb NOT NULL,
    created_at date NOT NULL,
    updated_at date NOT NULL
);


ALTER TABLE public."Cupon" OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 16463)
-- Name: Cupon_id_cupon_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Cupon_id_cupon_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Cupon_id_cupon_seq" OWNER TO postgres;

--
-- TOC entry 3872 (class 0 OID 0)
-- Dependencies: 206
-- Name: Cupon_id_cupon_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Cupon_id_cupon_seq" OWNED BY public."Cupon".id_cupon;


--
-- TOC entry 203 (class 1259 OID 16443)
-- Name: Hotels; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Hotels" (
    uuid_hotel uuid NOT NULL,
    id_hotel integer NOT NULL,
    data jsonb NOT NULL,
    status bigint NOT NULL,
    created_at date NOT NULL,
    updated_at date NOT NULL
);


ALTER TABLE public."Hotels" OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 16441)
-- Name: Hotels_id_hotel_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Hotels_id_hotel_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Hotels_id_hotel_seq" OWNER TO postgres;

--
-- TOC entry 3873 (class 0 OID 0)
-- Dependencies: 202
-- Name: Hotels_id_hotel_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Hotels_id_hotel_seq" OWNED BY public."Hotels".id_hotel;


--
-- TOC entry 205 (class 1259 OID 16454)
-- Name: Receipts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Receipts" (
    uuid_receipt uuid NOT NULL,
    id_receipt integer NOT NULL,
    data jsonb NOT NULL,
    relation jsonb NOT NULL,
    created_at date NOT NULL,
    updated_at date NOT NULL
);


ALTER TABLE public."Receipts" OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 16452)
-- Name: Receipts_id_receipt_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Receipts_id_receipt_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Receipts_id_receipt_seq" OWNER TO postgres;

--
-- TOC entry 3874 (class 0 OID 0)
-- Dependencies: 204
-- Name: Receipts_id_receipt_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Receipts_id_receipt_seq" OWNED BY public."Receipts".id_receipt;


--
-- TOC entry 201 (class 1259 OID 16432)
-- Name: TravelAgencies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TravelAgencies" (
    "uuid_travelA" uuid NOT NULL,
    "id_travelA" integer NOT NULL,
    data jsonb NOT NULL,
    status bigint NOT NULL,
    created_at date NOT NULL,
    updated_at date NOT NULL
);


ALTER TABLE public."TravelAgencies" OWNER TO postgres;

--
-- TOC entry 200 (class 1259 OID 16430)
-- Name: TravelAgencies_id_travelA_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."TravelAgencies_id_travelA_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."TravelAgencies_id_travelA_seq" OWNER TO postgres;

--
-- TOC entry 3875 (class 0 OID 0)
-- Dependencies: 200
-- Name: TravelAgencies_id_travelA_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."TravelAgencies_id_travelA_seq" OWNED BY public."TravelAgencies"."id_travelA";


--
-- TOC entry 197 (class 1259 OID 16410)
-- Name: Users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Users" (
    uuid_user uuid NOT NULL,
    password text NOT NULL,
    name text NOT NULL,
    id_user integer NOT NULL,
    email text NOT NULL,
    role bigint NOT NULL,
    iniciales text NOT NULL,
    data jsonb NOT NULL,
    created_at date NOT NULL,
    updated_at date NOT NULL
);

delete from public."Users";
ALTER TABLE public."Users" ADD COLUMN iniciales text NOT NULL;
ALTER TABLE public."Users" ADD COLUMN data jsonb NOT NULL;


ALTER TABLE public."Users" OWNER TO postgres;

--
-- TOC entry 196 (class 1259 OID 16408)
-- Name: Users_id_user_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Users_id_user_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Users_id_user_seq" OWNER TO postgres;

--
-- TOC entry 3876 (class 0 OID 0)
-- Dependencies: 196
-- Name: Users_id_user_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Users_id_user_seq" OWNED BY public."Users".id_user;


--
-- TOC entry 209 (class 1259 OID 16477)
-- Name: transport_contracts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transport_contracts (
    uuid_contract uuid NOT NULL,
    id_contract integer NOT NULL,
    data jsonb NOT NULL,
    data_vehicle jsonb NOT NULL,
    created_at date NOT NULL,
    updated_at date NOT NULL
);


ALTER TABLE public.transport_contracts OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 16475)
-- Name: transport_contracts_id_contract_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.transport_contracts_id_contract_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.transport_contracts_id_contract_seq OWNER TO postgres;

--
-- TOC entry 3877 (class 0 OID 0)
-- Dependencies: 208
-- Name: transport_contracts_id_contract_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.transport_contracts_id_contract_seq OWNED BY public.transport_contracts.id_contract;


--
-- TOC entry 3724 (class 2604 OID 16424)
-- Name: Clients id_client; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Clients" ALTER COLUMN id_client SET DEFAULT nextval('public."Clients_id_client_seq"'::regclass);


--
-- TOC entry 3728 (class 2604 OID 16468)
-- Name: Cupon id_cupon; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cupon" ALTER COLUMN id_cupon SET DEFAULT nextval('public."Cupon_id_cupon_seq"'::regclass);


--
-- TOC entry 3726 (class 2604 OID 16446)
-- Name: Hotels id_hotel; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Hotels" ALTER COLUMN id_hotel SET DEFAULT nextval('public."Hotels_id_hotel_seq"'::regclass);


--
-- TOC entry 3727 (class 2604 OID 16457)
-- Name: Receipts id_receipt; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Receipts" ALTER COLUMN id_receipt SET DEFAULT nextval('public."Receipts_id_receipt_seq"'::regclass);


--
-- TOC entry 3725 (class 2604 OID 16435)
-- Name: TravelAgencies id_travelA; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TravelAgencies" ALTER COLUMN "id_travelA" SET DEFAULT nextval('public."TravelAgencies_id_travelA_seq"'::regclass);


--
-- TOC entry 3723 (class 2604 OID 16413)
-- Name: Users id_user; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users" ALTER COLUMN id_user SET DEFAULT nextval('public."Users_id_user_seq"'::regclass);


--
-- TOC entry 3729 (class 2604 OID 16480)
-- Name: transport_contracts id_contract; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transport_contracts ALTER COLUMN id_contract SET DEFAULT nextval('public.transport_contracts_id_contract_seq'::regclass);


--
-- TOC entry 3733 (class 2606 OID 16429)
-- Name: Clients Clients_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Clients"
    ADD CONSTRAINT "Clients_pkey" PRIMARY KEY (id_client);


--
-- TOC entry 3741 (class 2606 OID 16473)
-- Name: Cupon Cupon_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cupon"
    ADD CONSTRAINT "Cupon_pkey" PRIMARY KEY (id_cupon);


--
-- TOC entry 3737 (class 2606 OID 16451)
-- Name: Hotels Hotels_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Hotels"
    ADD CONSTRAINT "Hotels_pkey" PRIMARY KEY (id_hotel);


--
-- TOC entry 3739 (class 2606 OID 16462)
-- Name: Receipts Receipts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Receipts"
    ADD CONSTRAINT "Receipts_pkey" PRIMARY KEY (id_receipt);


--
-- TOC entry 3735 (class 2606 OID 16440)
-- Name: TravelAgencies TravelAgencies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TravelAgencies"
    ADD CONSTRAINT "TravelAgencies_pkey" PRIMARY KEY ("id_travelA");


--
-- TOC entry 3731 (class 2606 OID 16418)
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id_user);


--
-- TOC entry 3743 (class 2606 OID 16485)
-- Name: transport_contracts transport_contracts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transport_contracts
    ADD CONSTRAINT transport_contracts_pkey PRIMARY KEY (id_contract);


--
-- TOC entry 3870 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM rdsadmin;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2020-03-09 22:07:21 CST

--
-- PostgreSQL database dump complete
--

CREATE TABLE public."Charters" (
    uuid_charter uuid NOT NULL,
    id_charter integer NOT NULL,
    data jsonb NOT NULL,
    status bigint NOT NULL,
    created_at date NOT NULL,
    updated_at date NOT NULL
);


ALTER TABLE public."Charters" OWNER TO postgres;