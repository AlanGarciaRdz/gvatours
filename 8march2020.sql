PGDMP         '                x            postgres    11.5    12.2 7    )           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            *           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            +           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            ,           1262    14007    postgres    DATABASE     z   CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';
    DROP DATABASE postgres;
                postgres    false            -           0    0    DATABASE postgres    COMMENT     N   COMMENT ON DATABASE postgres IS 'default administrative connection database';
                   postgres    false    3884            .           0    0    SCHEMA public    ACL     �   REVOKE ALL ON SCHEMA public FROM rdsadmin;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;
                   postgres    false    3            �            1259    16421    Clients    TABLE     �   CREATE TABLE public."Clients" (
    uuid_client uuid NOT NULL,
    id_client integer NOT NULL,
    data jsonb NOT NULL,
    status bigint NOT NULL,
    created_at date NOT NULL,
    updated_at date NOT NULL
);
    DROP TABLE public."Clients";
       public            postgres    false            �            1259    16419    Clients_id_client_seq    SEQUENCE     �   CREATE SEQUENCE public."Clients_id_client_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public."Clients_id_client_seq";
       public          postgres    false    199            /           0    0    Clients_id_client_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public."Clients_id_client_seq" OWNED BY public."Clients".id_client;
          public          postgres    false    198            �            1259    16465    Cupon    TABLE     �   CREATE TABLE public."Cupon" (
    uuid_cupon uuid NOT NULL,
    id_cupon integer NOT NULL,
    data jsonb NOT NULL,
    data_rooms jsonb NOT NULL,
    "data_travelA" jsonb NOT NULL,
    created_at date NOT NULL,
    updated_at date NOT NULL
);
    DROP TABLE public."Cupon";
       public            postgres    false            �            1259    16463    Cupon_id_cupon_seq    SEQUENCE     �   CREATE SEQUENCE public."Cupon_id_cupon_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public."Cupon_id_cupon_seq";
       public          postgres    false    207            0           0    0    Cupon_id_cupon_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public."Cupon_id_cupon_seq" OWNED BY public."Cupon".id_cupon;
          public          postgres    false    206            �            1259    16443    Hotels    TABLE     �   CREATE TABLE public."Hotels" (
    uuid_hotel uuid NOT NULL,
    id_hotel integer NOT NULL,
    data jsonb NOT NULL,
    status bigint NOT NULL,
    created_at date NOT NULL,
    updated_at date NOT NULL
);
    DROP TABLE public."Hotels";
       public            postgres    false            �            1259    16441    Hotels_id_hotel_seq    SEQUENCE     �   CREATE SEQUENCE public."Hotels_id_hotel_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public."Hotels_id_hotel_seq";
       public          postgres    false    203            1           0    0    Hotels_id_hotel_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public."Hotels_id_hotel_seq" OWNED BY public."Hotels".id_hotel;
          public          postgres    false    202            �            1259    16454    Receipts    TABLE     �   CREATE TABLE public."Receipts" (
    uuid_receipt uuid NOT NULL,
    id_receipt integer NOT NULL,
    data jsonb NOT NULL,
    relation jsonb NOT NULL,
    created_at date NOT NULL,
    updated_at date NOT NULL
);
    DROP TABLE public."Receipts";
       public            postgres    false            �            1259    16452    Receipts_id_receipt_seq    SEQUENCE     �   CREATE SEQUENCE public."Receipts_id_receipt_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public."Receipts_id_receipt_seq";
       public          postgres    false    205            2           0    0    Receipts_id_receipt_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public."Receipts_id_receipt_seq" OWNED BY public."Receipts".id_receipt;
          public          postgres    false    204            �            1259    16432    TravelAgencies    TABLE     �   CREATE TABLE public."TravelAgencies" (
    "uuid_travelA" uuid NOT NULL,
    "id_travelA" integer NOT NULL,
    data jsonb NOT NULL,
    status bigint NOT NULL,
    created_at date NOT NULL,
    updated_at date NOT NULL
);
 $   DROP TABLE public."TravelAgencies";
       public            postgres    false            �            1259    16430    TravelAgencies_id_travelA_seq    SEQUENCE     �   CREATE SEQUENCE public."TravelAgencies_id_travelA_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE public."TravelAgencies_id_travelA_seq";
       public          postgres    false    201            3           0    0    TravelAgencies_id_travelA_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE public."TravelAgencies_id_travelA_seq" OWNED BY public."TravelAgencies"."id_travelA";
          public          postgres    false    200            �            1259    16410    Users    TABLE     �   CREATE TABLE public."Users" (
    uuid_user uuid NOT NULL,
    password text NOT NULL,
    name text NOT NULL,
    id_user integer NOT NULL,
    email text NOT NULL,
    role bigint NOT NULL,
    created_at date NOT NULL,
    updated_at date NOT NULL
);
    DROP TABLE public."Users";
       public            postgres    false            �            1259    16408    Users_id_user_seq    SEQUENCE     �   CREATE SEQUENCE public."Users_id_user_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public."Users_id_user_seq";
       public          postgres    false    197            4           0    0    Users_id_user_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public."Users_id_user_seq" OWNED BY public."Users".id_user;
          public          postgres    false    196            �            1259    16477    transport_contracts    TABLE     �   CREATE TABLE public.transport_contracts (
    uuid_contract uuid NOT NULL,
    id_contract integer NOT NULL,
    data jsonb NOT NULL,
    data_vehicle jsonb NOT NULL,
    created_at date NOT NULL,
    updated_at date NOT NULL
);
 '   DROP TABLE public.transport_contracts;
       public            postgres    false            �            1259    16475 #   transport_contracts_id_contract_seq    SEQUENCE     �   CREATE SEQUENCE public.transport_contracts_id_contract_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 :   DROP SEQUENCE public.transport_contracts_id_contract_seq;
       public          postgres    false    209            5           0    0 #   transport_contracts_id_contract_seq    SEQUENCE OWNED BY     k   ALTER SEQUENCE public.transport_contracts_id_contract_seq OWNED BY public.transport_contracts.id_contract;
          public          postgres    false    208            �           2604    16424    Clients id_client    DEFAULT     z   ALTER TABLE ONLY public."Clients" ALTER COLUMN id_client SET DEFAULT nextval('public."Clients_id_client_seq"'::regclass);
 B   ALTER TABLE public."Clients" ALTER COLUMN id_client DROP DEFAULT;
       public          postgres    false    198    199    199            �           2604    16468    Cupon id_cupon    DEFAULT     t   ALTER TABLE ONLY public."Cupon" ALTER COLUMN id_cupon SET DEFAULT nextval('public."Cupon_id_cupon_seq"'::regclass);
 ?   ALTER TABLE public."Cupon" ALTER COLUMN id_cupon DROP DEFAULT;
       public          postgres    false    207    206    207            �           2604    16446    Hotels id_hotel    DEFAULT     v   ALTER TABLE ONLY public."Hotels" ALTER COLUMN id_hotel SET DEFAULT nextval('public."Hotels_id_hotel_seq"'::regclass);
 @   ALTER TABLE public."Hotels" ALTER COLUMN id_hotel DROP DEFAULT;
       public          postgres    false    203    202    203            �           2604    16457    Receipts id_receipt    DEFAULT     ~   ALTER TABLE ONLY public."Receipts" ALTER COLUMN id_receipt SET DEFAULT nextval('public."Receipts_id_receipt_seq"'::regclass);
 D   ALTER TABLE public."Receipts" ALTER COLUMN id_receipt DROP DEFAULT;
       public          postgres    false    205    204    205            �           2604    16435    TravelAgencies id_travelA    DEFAULT     �   ALTER TABLE ONLY public."TravelAgencies" ALTER COLUMN "id_travelA" SET DEFAULT nextval('public."TravelAgencies_id_travelA_seq"'::regclass);
 L   ALTER TABLE public."TravelAgencies" ALTER COLUMN "id_travelA" DROP DEFAULT;
       public          postgres    false    200    201    201            �           2604    16413    Users id_user    DEFAULT     r   ALTER TABLE ONLY public."Users" ALTER COLUMN id_user SET DEFAULT nextval('public."Users_id_user_seq"'::regclass);
 >   ALTER TABLE public."Users" ALTER COLUMN id_user DROP DEFAULT;
       public          postgres    false    197    196    197            �           2604    16480    transport_contracts id_contract    DEFAULT     �   ALTER TABLE ONLY public.transport_contracts ALTER COLUMN id_contract SET DEFAULT nextval('public.transport_contracts_id_contract_seq'::regclass);
 N   ALTER TABLE public.transport_contracts ALTER COLUMN id_contract DROP DEFAULT;
       public          postgres    false    208    209    209                      0    16421    Clients 
   TABLE DATA                 public          postgres    false    199   �<       $          0    16465    Cupon 
   TABLE DATA                 public          postgres    false    207   �<                  0    16443    Hotels 
   TABLE DATA                 public          postgres    false    203   =       "          0    16454    Receipts 
   TABLE DATA                 public          postgres    false    205   *=                 0    16432    TravelAgencies 
   TABLE DATA                 public          postgres    false    201   D=                 0    16410    Users 
   TABLE DATA                 public          postgres    false    197   ^=       &          0    16477    transport_contracts 
   TABLE DATA                 public          postgres    false    209   x=       6           0    0    Clients_id_client_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public."Clients_id_client_seq"', 1, false);
          public          postgres    false    198            7           0    0    Cupon_id_cupon_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public."Cupon_id_cupon_seq"', 1, false);
          public          postgres    false    206            8           0    0    Hotels_id_hotel_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public."Hotels_id_hotel_seq"', 1, false);
          public          postgres    false    202            9           0    0    Receipts_id_receipt_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public."Receipts_id_receipt_seq"', 1, false);
          public          postgres    false    204            :           0    0    TravelAgencies_id_travelA_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public."TravelAgencies_id_travelA_seq"', 1, false);
          public          postgres    false    200            ;           0    0    Users_id_user_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public."Users_id_user_seq"', 1, false);
          public          postgres    false    196            <           0    0 #   transport_contracts_id_contract_seq    SEQUENCE SET     R   SELECT pg_catalog.setval('public.transport_contracts_id_contract_seq', 1, false);
          public          postgres    false    208            �           2606    16429    Clients Clients_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public."Clients"
    ADD CONSTRAINT "Clients_pkey" PRIMARY KEY (id_client);
 B   ALTER TABLE ONLY public."Clients" DROP CONSTRAINT "Clients_pkey";
       public            postgres    false    199            �           2606    16473    Cupon Cupon_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Cupon"
    ADD CONSTRAINT "Cupon_pkey" PRIMARY KEY (id_cupon);
 >   ALTER TABLE ONLY public."Cupon" DROP CONSTRAINT "Cupon_pkey";
       public            postgres    false    207            �           2606    16451    Hotels Hotels_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public."Hotels"
    ADD CONSTRAINT "Hotels_pkey" PRIMARY KEY (id_hotel);
 @   ALTER TABLE ONLY public."Hotels" DROP CONSTRAINT "Hotels_pkey";
       public            postgres    false    203            �           2606    16462    Receipts Receipts_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public."Receipts"
    ADD CONSTRAINT "Receipts_pkey" PRIMARY KEY (id_receipt);
 D   ALTER TABLE ONLY public."Receipts" DROP CONSTRAINT "Receipts_pkey";
       public            postgres    false    205            �           2606    16440 "   TravelAgencies TravelAgencies_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public."TravelAgencies"
    ADD CONSTRAINT "TravelAgencies_pkey" PRIMARY KEY ("id_travelA");
 P   ALTER TABLE ONLY public."TravelAgencies" DROP CONSTRAINT "TravelAgencies_pkey";
       public            postgres    false    201            �           2606    16418    Users Users_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id_user);
 >   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_pkey";
       public            postgres    false    197            �           2606    16485 ,   transport_contracts transport_contracts_pkey 
   CONSTRAINT     s   ALTER TABLE ONLY public.transport_contracts
    ADD CONSTRAINT transport_contracts_pkey PRIMARY KEY (id_contract);
 V   ALTER TABLE ONLY public.transport_contracts DROP CONSTRAINT transport_contracts_pkey;
       public            postgres    false    209               
   x���          $   
   x���              
   x���          "   
   x���             
   x���             
   x���          &   
   x���         