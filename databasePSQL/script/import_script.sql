--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2 (Debian 15.2-1.pgdg110+1)
-- Dumped by pg_dump version 15.2

-- Started on 2023-05-22 18:13:36 UTC

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

SET default_table_access_method = heap;

--
-- TOC entry 214 (class 1259 OID 16385)
-- Name: container; Type: TABLE; Schema: public; Owner: gorchitechUser
--

CREATE TABLE public.container (
    id integer NOT NULL,
    name text NOT NULL,
    cpu numeric,
    memory integer,
    storage text,
    label text,
    ip text,
    port integer,
    status text,
    containerid text,
    scopeid integer,
    imageid integer,
    volumeid integer,
    networkid integer,
    created timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.container OWNER TO "gorchitechUser";

--
-- TOC entry 215 (class 1259 OID 16393)
-- Name: container_id_seq; Type: SEQUENCE; Schema: public; Owner: gorchitechUser
--

CREATE SEQUENCE public.container_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.container_id_seq OWNER TO "gorchitechUser";

--
-- TOC entry 3431 (class 0 OID 0)
-- Dependencies: 215
-- Name: container_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gorchitechUser
--

ALTER SEQUENCE public.container_id_seq OWNED BY public.container.id;


--
-- TOC entry 216 (class 1259 OID 16394)
-- Name: image; Type: TABLE; Schema: public; Owner: gorchitechUser
--

CREATE TABLE public.image (
    id integer NOT NULL,
    created timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    date text DEFAULT ''::text,
    deleted timestamp with time zone,
    imageid text DEFAULT ''::text,
    label text DEFAULT ''::text,
    name text DEFAULT ''::text,
    repository text DEFAULT ''::text,
    size numeric DEFAULT 0,
    updated timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.image OWNER TO "gorchitechUser";

--
-- TOC entry 217 (class 1259 OID 16407)
-- Name: image_id_seq; Type: SEQUENCE; Schema: public; Owner: gorchitechUser
--

CREATE SEQUENCE public.image_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.image_id_seq OWNER TO "gorchitechUser";

--
-- TOC entry 3433 (class 0 OID 0)
-- Dependencies: 217
-- Name: image_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gorchitechUser
--

ALTER SEQUENCE public.image_id_seq OWNED BY public.image.id;


--
-- TOC entry 218 (class 1259 OID 16408)
-- Name: network; Type: TABLE; Schema: public; Owner: gorchitechUser
--

CREATE TABLE public.network (
    id integer NOT NULL,
    alias text DEFAULT ''::text,
    created timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted timestamp with time zone,
    driver text DEFAULT ''::text,
    gateway text DEFAULT ''::text,
    label text DEFAULT ''::text,
    name text DEFAULT ''::text,
    networkid text DEFAULT ''::text,
    subnet text DEFAULT ''::text,
    updated timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.network OWNER TO "gorchitechUser";

--
-- TOC entry 219 (class 1259 OID 16422)
-- Name: network_id_seq; Type: SEQUENCE; Schema: public; Owner: gorchitechUser
--

CREATE SEQUENCE public.network_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.network_id_seq OWNER TO "gorchitechUser";

--
-- TOC entry 3435 (class 0 OID 0)
-- Dependencies: 219
-- Name: network_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gorchitechUser
--

ALTER SEQUENCE public.network_id_seq OWNED BY public.network.id;


--
-- TOC entry 220 (class 1259 OID 16423)
-- Name: role; Type: TABLE; Schema: public; Owner: gorchitechUser
--

CREATE TABLE public.role (
    id integer NOT NULL,
    name text NOT NULL,
    description text
);


ALTER TABLE public.role OWNER TO "gorchitechUser";

--
-- TOC entry 221 (class 1259 OID 16428)
-- Name: role_id_seq; Type: SEQUENCE; Schema: public; Owner: gorchitechUser
--

CREATE SEQUENCE public.role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.role_id_seq OWNER TO "gorchitechUser";

--
-- TOC entry 3437 (class 0 OID 0)
-- Dependencies: 221
-- Name: role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gorchitechUser
--

ALTER SEQUENCE public.role_id_seq OWNED BY public.role.id;


--
-- TOC entry 222 (class 1259 OID 16429)
-- Name: scope; Type: TABLE; Schema: public; Owner: gorchitechUser
--

CREATE TABLE public.scope (
    id integer NOT NULL,
    name text NOT NULL,
    description text,
    created timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.scope OWNER TO "gorchitechUser";

--
-- TOC entry 223 (class 1259 OID 16437)
-- Name: scope_id_seq; Type: SEQUENCE; Schema: public; Owner: gorchitechUser
--

CREATE SEQUENCE public.scope_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.scope_id_seq OWNER TO "gorchitechUser";

--
-- TOC entry 3439 (class 0 OID 0)
-- Dependencies: 223
-- Name: scope_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gorchitechUser
--

ALTER SEQUENCE public.scope_id_seq OWNED BY public.scope.id;


--
-- TOC entry 224 (class 1259 OID 16438)
-- Name: transaction; Type: TABLE; Schema: public; Owner: gorchitechUser
--

CREATE TABLE public.transaction (
    id integer NOT NULL,
    userid integer,
    containerid integer,
    created timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.transaction OWNER TO "gorchitechUser";

--
-- TOC entry 225 (class 1259 OID 16444)
-- Name: transaction_id_seq; Type: SEQUENCE; Schema: public; Owner: gorchitechUser
--

CREATE SEQUENCE public.transaction_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.transaction_id_seq OWNER TO "gorchitechUser";

--
-- TOC entry 3441 (class 0 OID 0)
-- Dependencies: 225
-- Name: transaction_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gorchitechUser
--

ALTER SEQUENCE public.transaction_id_seq OWNED BY public.transaction.id;


--
-- TOC entry 226 (class 1259 OID 16445)
-- Name: user; Type: TABLE; Schema: public; Owner: gorchitechUser
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    username text NOT NULL,
    name text NOT NULL,
    password text NOT NULL,
    email text NOT NULL,
    created timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    roleid integer
);


ALTER TABLE public."user" OWNER TO "gorchitechUser";

--
-- TOC entry 227 (class 1259 OID 16453)
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: gorchitechUser
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO "gorchitechUser";

--
-- TOC entry 3443 (class 0 OID 0)
-- Dependencies: 227
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gorchitechUser
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- TOC entry 228 (class 1259 OID 16454)
-- Name: volumen; Type: TABLE; Schema: public; Owner: gorchitechUser
--

CREATE TABLE public.volumen (
    id integer NOT NULL,
    created timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted timestamp with time zone,
    driver text DEFAULT ''::text,
    label text DEFAULT ''::text,
    mount text DEFAULT ''::text,
    name text DEFAULT ''::text,
    size numeric DEFAULT 0,
    source text DEFAULT ''::text,
    target text DEFAULT ''::text,
    type text DEFAULT ''::text,
    updated timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    volumenid text DEFAULT ''::text
);


ALTER TABLE public.volumen OWNER TO "gorchitechUser";

--
-- TOC entry 229 (class 1259 OID 16470)
-- Name: volumen_id_seq; Type: SEQUENCE; Schema: public; Owner: gorchitechUser
--

CREATE SEQUENCE public.volumen_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.volumen_id_seq OWNER TO "gorchitechUser";

--
-- TOC entry 3445 (class 0 OID 0)
-- Dependencies: 229
-- Name: volumen_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gorchitechUser
--

ALTER SEQUENCE public.volumen_id_seq OWNED BY public.volumen.id;


--
-- TOC entry 3211 (class 2604 OID 16471)
-- Name: container id; Type: DEFAULT; Schema: public; Owner: gorchitechUser
--

ALTER TABLE ONLY public.container ALTER COLUMN id SET DEFAULT nextval('public.container_id_seq'::regclass);


--
-- TOC entry 3215 (class 2604 OID 16472)
-- Name: image id; Type: DEFAULT; Schema: public; Owner: gorchitechUser
--

ALTER TABLE ONLY public.image ALTER COLUMN id SET DEFAULT nextval('public.image_id_seq'::regclass);


--
-- TOC entry 3224 (class 2604 OID 16473)
-- Name: network id; Type: DEFAULT; Schema: public; Owner: gorchitechUser
--

ALTER TABLE ONLY public.network ALTER COLUMN id SET DEFAULT nextval('public.network_id_seq'::regclass);


--
-- TOC entry 3234 (class 2604 OID 16474)
-- Name: role id; Type: DEFAULT; Schema: public; Owner: gorchitechUser
--

ALTER TABLE ONLY public.role ALTER COLUMN id SET DEFAULT nextval('public.role_id_seq'::regclass);


--
-- TOC entry 3235 (class 2604 OID 16475)
-- Name: scope id; Type: DEFAULT; Schema: public; Owner: gorchitechUser
--

ALTER TABLE ONLY public.scope ALTER COLUMN id SET DEFAULT nextval('public.scope_id_seq'::regclass);


--
-- TOC entry 3239 (class 2604 OID 16476)
-- Name: transaction id; Type: DEFAULT; Schema: public; Owner: gorchitechUser
--

ALTER TABLE ONLY public.transaction ALTER COLUMN id SET DEFAULT nextval('public.transaction_id_seq'::regclass);


--
-- TOC entry 3243 (class 2604 OID 16477)
-- Name: user id; Type: DEFAULT; Schema: public; Owner: gorchitechUser
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- TOC entry 3247 (class 2604 OID 16478)
-- Name: volumen id; Type: DEFAULT; Schema: public; Owner: gorchitechUser
--

ALTER TABLE ONLY public.volumen ALTER COLUMN id SET DEFAULT nextval('public.volumen_id_seq'::regclass);


--
-- TOC entry 3260 (class 2606 OID 16480)
-- Name: container container_pkey; Type: CONSTRAINT; Schema: public; Owner: gorchitechUser
--

ALTER TABLE ONLY public.container
    ADD CONSTRAINT container_pkey PRIMARY KEY (id);


--
-- TOC entry 3262 (class 2606 OID 16482)
-- Name: image image_pkey; Type: CONSTRAINT; Schema: public; Owner: gorchitechUser
--

ALTER TABLE ONLY public.image
    ADD CONSTRAINT image_pkey PRIMARY KEY (id);


--
-- TOC entry 3264 (class 2606 OID 16484)
-- Name: network network_pkey; Type: CONSTRAINT; Schema: public; Owner: gorchitechUser
--

ALTER TABLE ONLY public.network
    ADD CONSTRAINT network_pkey PRIMARY KEY (id);


--
-- TOC entry 3266 (class 2606 OID 16486)
-- Name: role role_pkey; Type: CONSTRAINT; Schema: public; Owner: gorchitechUser
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (id);


--
-- TOC entry 3268 (class 2606 OID 16488)
-- Name: scope scope_pkey; Type: CONSTRAINT; Schema: public; Owner: gorchitechUser
--

ALTER TABLE ONLY public.scope
    ADD CONSTRAINT scope_pkey PRIMARY KEY (id);


--
-- TOC entry 3270 (class 2606 OID 16490)
-- Name: transaction transaction_pkey; Type: CONSTRAINT; Schema: public; Owner: gorchitechUser
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT transaction_pkey PRIMARY KEY (id);


--
-- TOC entry 3272 (class 2606 OID 16492)
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: gorchitechUser
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- TOC entry 3274 (class 2606 OID 16494)
-- Name: volumen volumen_pkey; Type: CONSTRAINT; Schema: public; Owner: gorchitechUser
--

ALTER TABLE ONLY public.volumen
    ADD CONSTRAINT volumen_pkey PRIMARY KEY (id);


--
-- TOC entry 3275 (class 2606 OID 16495)
-- Name: container container_imageid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gorchitechUser
--

ALTER TABLE ONLY public.container
    ADD CONSTRAINT container_imageid_fkey FOREIGN KEY (imageid) REFERENCES public.image(id);


--
-- TOC entry 3276 (class 2606 OID 16500)
-- Name: container container_networkid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gorchitechUser
--

ALTER TABLE ONLY public.container
    ADD CONSTRAINT container_networkid_fkey FOREIGN KEY (networkid) REFERENCES public.network(id);


--
-- TOC entry 3277 (class 2606 OID 16505)
-- Name: container container_scopeid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gorchitechUser
--

ALTER TABLE ONLY public.container
    ADD CONSTRAINT container_scopeid_fkey FOREIGN KEY (scopeid) REFERENCES public.scope(id);


--
-- TOC entry 3278 (class 2606 OID 16510)
-- Name: container container_volumeid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gorchitechUser
--

ALTER TABLE ONLY public.container
    ADD CONSTRAINT container_volumeid_fkey FOREIGN KEY (volumeid) REFERENCES public.volumen(id);


--
-- TOC entry 3279 (class 2606 OID 16515)
-- Name: transaction transaction_containerid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gorchitechUser
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT transaction_containerid_fkey FOREIGN KEY (containerid) REFERENCES public.container(id);


--
-- TOC entry 3280 (class 2606 OID 16520)
-- Name: transaction transaction_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gorchitechUser
--

ALTER TABLE ONLY public.transaction
    ADD CONSTRAINT transaction_userid_fkey FOREIGN KEY (userid) REFERENCES public."user"(id);


--
-- TOC entry 3281 (class 2606 OID 16525)
-- Name: user user_roleid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gorchitechUser
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_roleid_fkey FOREIGN KEY (roleid) REFERENCES public.role(id);

CREATE USER jagarciasrd WITH PASSWORD 'RDppjagarcias';
GRANT CONNECT ON DATABASE "gorchitechDatabase" TO jagarciasrd;
GRANT USAGE ON SCHEMA information_schema TO jagarciasrd;
GRANT SELECT ON ALL TABLES IN SCHEMA information_schema TO jagarciasrd;



--
-- TOC entry 3429 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

GRANT USAGE ON SCHEMA public TO jagarciasrd;


--
-- TOC entry 3430 (class 0 OID 0)
-- Dependencies: 214
-- Name: TABLE container; Type: ACL; Schema: public; Owner: gorchitechUser
--

GRANT SELECT ON TABLE public.container TO jagarciasrd;


--
-- TOC entry 3432 (class 0 OID 0)
-- Dependencies: 216
-- Name: TABLE image; Type: ACL; Schema: public; Owner: gorchitechUser
--

GRANT SELECT ON TABLE public.image TO jagarciasrd;


--
-- TOC entry 3434 (class 0 OID 0)
-- Dependencies: 218
-- Name: TABLE network; Type: ACL; Schema: public; Owner: gorchitechUser
--

GRANT SELECT ON TABLE public.network TO jagarciasrd;


--
-- TOC entry 3436 (class 0 OID 0)
-- Dependencies: 220
-- Name: TABLE role; Type: ACL; Schema: public; Owner: gorchitechUser
--

GRANT SELECT ON TABLE public.role TO jagarciasrd;


--
-- TOC entry 3438 (class 0 OID 0)
-- Dependencies: 222
-- Name: TABLE scope; Type: ACL; Schema: public; Owner: gorchitechUser
--

GRANT SELECT ON TABLE public.scope TO jagarciasrd;


--
-- TOC entry 3440 (class 0 OID 0)
-- Dependencies: 224
-- Name: TABLE transaction; Type: ACL; Schema: public; Owner: gorchitechUser
--

GRANT SELECT ON TABLE public.transaction TO jagarciasrd;


--
-- TOC entry 3442 (class 0 OID 0)
-- Dependencies: 226
-- Name: TABLE "user"; Type: ACL; Schema: public; Owner: gorchitechUser
--

GRANT SELECT ON TABLE public."user" TO jagarciasrd;


--
-- TOC entry 3444 (class 0 OID 0)
-- Dependencies: 228
-- Name: TABLE volumen; Type: ACL; Schema: public; Owner: gorchitechUser
--

GRANT SELECT ON TABLE public.volumen TO jagarciasrd;


-- Completed on 2023-05-22 18:13:36 UTC

--
-- PostgreSQL database dump complete
--

