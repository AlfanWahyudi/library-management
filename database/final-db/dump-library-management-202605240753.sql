--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

-- Started on 2026-05-24 07:53:47

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 865 (class 1247 OID 24598)
-- Name: genderenum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.genderenum AS ENUM (
    'm',
    'f'
);


ALTER TYPE public.genderenum OWNER TO postgres;

--
-- TOC entry 868 (class 1247 OID 24618)
-- Name: violationlevel; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.violationlevel AS ENUM (
    'minor',
    'moderate',
    'high'
);


ALTER TYPE public.violationlevel OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 223 (class 1259 OID 25846)
-- Name: authors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.authors (
    id integer NOT NULL,
    full_name character varying(255) NOT NULL,
    country_code character(2),
    active_since integer,
    about text,
    created_by character varying(25),
    created_at timestamp without time zone,
    updated_by character varying(25),
    updated_at timestamp without time zone,
    deleted_by character varying(25) DEFAULT NULL::character varying,
    deleted_at timestamp without time zone
);


ALTER TABLE public.authors OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 25845)
-- Name: authors_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.authors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.authors_id_seq OWNER TO postgres;

--
-- TOC entry 5028 (class 0 OID 0)
-- Dependencies: 222
-- Name: authors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.authors_id_seq OWNED BY public.authors.id;


--
-- TOC entry 235 (class 1259 OID 58850)
-- Name: authors_view; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.authors_view AS
SELECT
    NULL::integer AS id,
    NULL::character varying(255) AS full_name,
    NULL::bigint AS book_count,
    NULL::character(2) AS country_code,
    NULL::character varying(255) AS country_name,
    NULL::integer AS active_since,
    NULL::text AS about,
    NULL::timestamp without time zone AS created_at,
    NULL::timestamp without time zone AS updated_at;


ALTER VIEW public.authors_view OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 25871)
-- Name: book_authors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.book_authors (
    author_id integer NOT NULL,
    book_id integer NOT NULL,
    created_by character varying(25),
    created_at timestamp without time zone
);


ALTER TABLE public.book_authors OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 25968)
-- Name: book_loans; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.book_loans (
    id integer NOT NULL,
    member_id integer,
    book_id integer,
    start_date timestamp without time zone NOT NULL,
    end_date timestamp without time zone NOT NULL,
    finished_date timestamp without time zone,
    created_by character varying(25),
    created_at timestamp without time zone,
    updated_by character varying(25) DEFAULT NULL::character varying,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.book_loans OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 25967)
-- Name: book_loans_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.book_loans_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.book_loans_id_seq OWNER TO postgres;

--
-- TOC entry 5029 (class 0 OID 0)
-- Dependencies: 229
-- Name: book_loans_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.book_loans_id_seq OWNED BY public.book_loans.id;


--
-- TOC entry 225 (class 1259 OID 25858)
-- Name: books; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.books (
    id integer NOT NULL,
    isbn character varying(50) NOT NULL,
    title character varying(255) NOT NULL,
    sub_title character varying(255),
    publisher character varying(255),
    publication_date date NOT NULL,
    page integer,
    language character varying(255),
    edition integer,
    created_by character varying(25),
    created_at timestamp without time zone,
    updated_by character varying(25),
    updated_at timestamp without time zone,
    deleted_by character varying(25) DEFAULT NULL::character varying,
    deleted_at timestamp without time zone
);


ALTER TABLE public.books OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 25857)
-- Name: books_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.books_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.books_id_seq OWNER TO postgres;

--
-- TOC entry 5030 (class 0 OID 0)
-- Dependencies: 224
-- Name: books_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.books_id_seq OWNED BY public.books.id;


--
-- TOC entry 228 (class 1259 OID 25903)
-- Name: members; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.members (
    id integer NOT NULL,
    full_name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    phone character varying(20) NOT NULL,
    address text NOT NULL,
    birth_date date NOT NULL,
    gender public.genderenum NOT NULL,
    created_by character varying(25),
    created_at timestamp without time zone,
    updated_by character varying(25),
    updated_at timestamp without time zone
);


ALTER TABLE public.members OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 67048)
-- Name: books_on_loan_view; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.books_on_loan_view AS
 SELECT bl.id,
    bl.book_id,
    b.title AS book_title,
    b.isbn AS book_isbn,
    bl.member_id,
    m.full_name AS member_full_name,
    m.email AS member_email,
    bl.start_date,
    bl.end_date,
    bl.created_by,
    bl.created_at,
    bl.updated_by,
    bl.updated_at
   FROM ((public.book_loans bl
     LEFT JOIN public.books b ON ((bl.book_id = b.id)))
     LEFT JOIN public.members m ON ((bl.member_id = m.id)))
  WHERE ((bl.finished_date IS NULL) AND ((b.deleted_by IS NULL) AND (b.deleted_at IS NULL)));


ALTER VIEW public.books_on_loan_view OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 42159)
-- Name: countries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.countries (
    code character(2) NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.countries OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 25902)
-- Name: members_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.members_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.members_id_seq OWNER TO postgres;

--
-- TOC entry 5031 (class 0 OID 0)
-- Dependencies: 227
-- Name: members_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.members_id_seq OWNED BY public.members.id;


--
-- TOC entry 232 (class 1259 OID 26068)
-- Name: permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.permissions (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text
);


ALTER TABLE public.permissions OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 26067)
-- Name: permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.permissions_id_seq OWNER TO postgres;

--
-- TOC entry 5032 (class 0 OID 0)
-- Dependencies: 231
-- Name: permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.permissions_id_seq OWNED BY public.permissions.id;


--
-- TOC entry 233 (class 1259 OID 26080)
-- Name: role_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.role_permissions (
    role_id integer NOT NULL,
    permission_id integer NOT NULL,
    created_by character varying(25),
    created_at timestamp without time zone,
    updated_by character varying(25),
    updated_at timestamp without time zone
);


ALTER TABLE public.role_permissions OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 25803)
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    created_by character varying(25),
    created_at timestamp without time zone,
    updated_by character varying(25),
    updated_at timestamp without time zone
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 25802)
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.roles_id_seq OWNER TO postgres;

--
-- TOC entry 5033 (class 0 OID 0)
-- Dependencies: 219
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- TOC entry 221 (class 1259 OID 25828)
-- Name: user_roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_roles (
    user_id integer NOT NULL,
    role_id integer NOT NULL,
    created_by character varying(25),
    created_at timestamp without time zone,
    updated_by character varying(25),
    updated_at timestamp without time zone
);


ALTER TABLE public.user_roles OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 25776)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(25) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    full_name character varying(255) NOT NULL,
    address text,
    gender public.genderenum NOT NULL,
    created_by character varying(25),
    created_at timestamp without time zone,
    updated_by character varying(25),
    updated_at timestamp without time zone,
    deleted_by character varying(25) DEFAULT NULL::character varying,
    deleted_at timestamp without time zone
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 25775)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 5034 (class 0 OID 0)
-- Dependencies: 217
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 4805 (class 2604 OID 25849)
-- Name: authors id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.authors ALTER COLUMN id SET DEFAULT nextval('public.authors_id_seq'::regclass);


--
-- TOC entry 4810 (class 2604 OID 25971)
-- Name: book_loans id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.book_loans ALTER COLUMN id SET DEFAULT nextval('public.book_loans_id_seq'::regclass);


--
-- TOC entry 4807 (class 2604 OID 25861)
-- Name: books id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.books ALTER COLUMN id SET DEFAULT nextval('public.books_id_seq'::regclass);


--
-- TOC entry 4809 (class 2604 OID 25906)
-- Name: members id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.members ALTER COLUMN id SET DEFAULT nextval('public.members_id_seq'::regclass);


--
-- TOC entry 4813 (class 2604 OID 26071)
-- Name: permissions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permissions ALTER COLUMN id SET DEFAULT nextval('public.permissions_id_seq'::regclass);


--
-- TOC entry 4804 (class 2604 OID 25806)
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- TOC entry 4802 (class 2604 OID 25779)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 5011 (class 0 OID 25846)
-- Dependencies: 223
-- Data for Name: authors; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.authors VALUES (1, 'Asti Musman', 'ID', NULL, NULL, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20', NULL, NULL);
INSERT INTO public.authors VALUES (2, 'Wahidah Murriska', 'ID', NULL, 'Memiliki pengalaman kerja sebagai English translator di Perpustakaan Ganesa, Sukoharjo (2015), English teacher di Erje Privat (2016), dan Writer di Sanggar Bahasa Yogyakarta (2017). Latar belakang pendidikannya adalah Sastra Inggris, Fakultas Ilmu Budaya, Universitas Sebelas Maret, dan Ilmu Linguistik, Fakultas Ilmu Budaya, Universitas Gadjah Mada', '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20', NULL, NULL);
INSERT INTO public.authors VALUES (3, 'Greg McKeown', 'GB', NULL, NULL, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20', NULL, NULL);
INSERT INTO public.authors VALUES (4, 'Alice Monroe', 'CA', 1998, 'Lorem ipsum', '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20', NULL, NULL);
INSERT INTO public.authors VALUES (5, 'Javier Ortega', 'ES', 2005, 'Dolor sit amet', '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20', NULL, NULL);
INSERT INTO public.authors VALUES (6, 'Nina Patel', 'IN', 2010, 'Consectetur', '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20', NULL, NULL);
INSERT INTO public.authors VALUES (7, 'Tomoko Sato', 'JP', 1995, 'Adipiscing', '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20', NULL, NULL);
INSERT INTO public.authors VALUES (8, 'Liam O’Connor', 'IE', 2001, 'Elit lorem', '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20', NULL, NULL);
INSERT INTO public.authors VALUES (9, 'Fatima Zahra', 'MA', 2012, 'Sed do', '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20', NULL, NULL);
INSERT INTO public.authors VALUES (10, 'George Smith', 'US', 1987, 'Eiusmod', '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20', NULL, NULL);
INSERT INTO public.authors VALUES (11, 'Chen Wei', 'CN', 2003, 'Tempor', '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20', NULL, NULL);
INSERT INTO public.authors VALUES (12, 'Sofia Rossi', 'IT', 1999, 'Incididunt', '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20', NULL, NULL);
INSERT INTO public.authors VALUES (13, 'Hans Müller', 'DE', 2007, 'Ut labore', '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20', NULL, NULL);
INSERT INTO public.authors VALUES (14, 'Amara Johnson', 'ZA', 2015, 'Et dolore', '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20', NULL, NULL);
INSERT INTO public.authors VALUES (15, 'Mateo Silva', 'BR', 2000, 'Magna aliqua', '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20', NULL, NULL);
INSERT INTO public.authors VALUES (16, 'Elena Petrova', 'RU', 1993, 'Ut enim', '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20', NULL, NULL);
INSERT INTO public.authors VALUES (17, 'Yusuf Demir', 'TR', 2008, 'Ad minim', '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20', NULL, NULL);
INSERT INTO public.authors VALUES (18, 'Grace Lee', 'KP', 2011, 'Veniam', '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20', NULL, NULL);
INSERT INTO public.authors VALUES (19, 'Omar Khalid', 'EG', 1996, 'Quis nostrud', '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20', NULL, NULL);
INSERT INTO public.authors VALUES (20, 'Isabelle Dubois', 'FR', 2004, 'Exercitation', '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20', NULL, NULL);
INSERT INTO public.authors VALUES (21, 'Nguyen Thi Lan', 'VN', 2006, 'Ullamco', '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20', NULL, NULL);
INSERT INTO public.authors VALUES (22, 'John Doe', 'AU', 1990, 'Laboris nisi', '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20', NULL, NULL);
INSERT INTO public.authors VALUES (23, 'Maria Gonzalez', 'MX', 2013, 'Ut aliquip', '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20', NULL, NULL);
INSERT INTO public.authors VALUES (24, 'Ahmed Al-Farsi', 'SA', 2002, 'Ex ea', '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20', NULL, NULL);
INSERT INTO public.authors VALUES (25, 'Katarzyna Nowak', 'PL', 1997, 'Commodo', '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20', NULL, NULL);
INSERT INTO public.authors VALUES (26, 'Daniel Svensson', 'SE', 2009, 'Consequat', '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20', NULL, NULL);
INSERT INTO public.authors VALUES (27, 'Beatrice Ncube', 'ZW', 2014, 'Duis aute', '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20', NULL, NULL);
INSERT INTO public.authors VALUES (28, 'Tariq Rahman', 'PK', 2006, 'Irure dolor', '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20', NULL, NULL);
INSERT INTO public.authors VALUES (34, 'Test Tambah Lewat Form', 'ID', 2020, 'test', '1', '2025-09-16 19:34:23.463261', '1', '2025-09-16 19:34:23.463261', NULL, NULL);
INSERT INTO public.authors VALUES (35, 'Alfan', 'ID', 2020, NULL, '1', '2025-09-18 09:21:44.845349', '1', '2025-09-18 09:21:44.845349', NULL, NULL);
INSERT INTO public.authors VALUES (36, 'Alfan', 'ID', 2020, '', '1', '2025-09-18 09:26:20.469248', '1', '2025-09-18 09:26:20.469248', NULL, NULL);
INSERT INTO public.authors VALUES (37, 'Alfan', 'ID', 2020, '', '1', '2025-09-18 09:27:02.572175', '1', '2025-09-18 09:27:02.572175', NULL, NULL);
INSERT INTO public.authors VALUES (38, 'Alfan', 'ID', 2020, '', '1', '2025-09-18 09:29:56.815269', '1', '2025-09-18 09:29:56.815269', NULL, NULL);
INSERT INTO public.authors VALUES (39, 'Test Tambah Lewat Form', 'ID', 2020, NULL, '1', '2025-09-18 09:32:33.116024', '1', '2025-09-18 09:32:33.116024', NULL, NULL);
INSERT INTO public.authors VALUES (41, 'Test Isi nama lengkap saja', 'ID', 2022, 'test input tentang', '1', '2025-09-18 09:40:12.577218', '1', '2025-09-18 09:40:12.577218', NULL, NULL);
INSERT INTO public.authors VALUES (44, 'Test 11', 'ID', 2025, 'test  saja', '1', '2025-09-18 14:17:16.073884', '1', '2025-09-18 14:17:16.073884', NULL, NULL);
INSERT INTO public.authors VALUES (45, 'Test lagi aja', 'ID', 2025, '1 2 3 4 5', '1', '2025-09-18 14:31:30.820119', '1', '2025-09-18 14:31:30.820119', NULL, NULL);
INSERT INTO public.authors VALUES (46, 'test', 'ID', 2022, 'TESt', '1', '2025-09-18 14:42:58.166598', '1', '2025-09-18 14:42:58.166598', NULL, NULL);
INSERT INTO public.authors VALUES (48, 'Alfan Wahyudi', 'ID', 2025, 'test aja bang', '1', '2025-09-18 14:46:29.19822', '1', '2025-09-18 14:46:29.19822', NULL, NULL);
INSERT INTO public.authors VALUES (51, 'Tambah aja bang', 'ID', 2025, 'test tambah aja', '1', '2025-09-18 14:53:15.405305', '1', '2025-09-18 14:53:15.405305', NULL, NULL);
INSERT INTO public.authors VALUES (52, 'Test tambah lagi Update', 'ID', 2022, 'test aja update', '1', '2025-09-18 14:54:16.384734', '1', '2026-01-25 06:28:11.765478', NULL, NULL);
INSERT INTO public.authors VALUES (42, 'test', 'ID', 2022, 'test', '1', '2025-09-18 13:58:24.12775', '1', '2025-09-18 13:58:24.12775', NULL, NULL);
INSERT INTO public.authors VALUES (50, 'Killua update', 'ID', 2020, 'test update killua', '1', '2025-09-18 14:49:49.884172', '1', '2026-02-02 13:02:41.976099', NULL, NULL);
INSERT INTO public.authors VALUES (55, 'Alfan', 'ID', 2004, '', '1', '2025-09-22 14:35:42.210468', '1', '2025-10-31 21:16:48.368042', '1', '2025-11-03 14:52:34.374339');
INSERT INTO public.authors VALUES (123, 'Test Update Author', 'BR', 2020, 'tidak ada', '1', '2026-01-23 11:01:53.580566', '1', '2026-01-25 06:27:29.406173', NULL, NULL);
INSERT INTO public.authors VALUES (125, 'test tambah 20 Update', 'BR', 2015, '', '1', '2026-02-02 13:03:24.501097', '1', '2026-02-02 13:29:36.777091', NULL, NULL);
INSERT INTO public.authors VALUES (65, 'Alfan', 'AL', 2020, 'Test aja', '1', '2025-09-22 15:17:25.55784', '1', '2025-09-22 15:17:25.55784', '1', '2025-09-24 17:01:42.13083');
INSERT INTO public.authors VALUES (64, 'Test coba aja', 'AX', 2021, 'tesdf', '1', '2025-09-22 15:16:42.211649', '1', '2025-09-22 15:16:42.211649', '1', '2025-10-02 20:54:50.290765');
INSERT INTO public.authors VALUES (63, 'Test Lagi 2', 'ID', 2021, 'test coba lagi yang ke 2', '1', '2025-09-22 15:15:55.676661', '1', '2025-09-22 15:15:55.676661', '1', '2025-11-03 15:55:33.970941');
INSERT INTO public.authors VALUES (61, 'Alfan', 'BB', 2020, 'tentang', '1', '2025-09-22 14:50:39.457173', '1', '2025-09-22 14:50:39.457173', '1', '2025-11-03 15:57:13.532991');
INSERT INTO public.authors VALUES (59, 'Alfan', 'ID', 2029, NULL, '1', '2025-09-22 14:36:49.610581', '1', '2025-09-22 14:36:49.610581', '1', '2025-11-03 15:57:32.9212');
INSERT INTO public.authors VALUES (58, 'Alfan', 'ID', 2025, NULL, '1', '2025-09-22 14:36:47.038679', '1', '2025-09-22 14:36:47.038679', '1', '2025-11-03 15:57:41.220954');
INSERT INTO public.authors VALUES (69, 'Alfan', 'AF', NULL, NULL, '1', '2025-09-22 15:26:06.656079', '1', '2025-09-22 15:26:06.656079', '1', '2025-11-03 19:49:48.158929');
INSERT INTO public.authors VALUES (60, 'Test', 'ID', 2020, 'this is about yay', '1', '2025-09-22 14:41:10.287741', '1', '2025-09-22 14:41:10.287741', '1', '2025-11-03 21:04:27.522053');
INSERT INTO public.authors VALUES (67, 'Alfan', 'AF', NULL, NULL, '1', '2025-09-22 15:26:05.126115', '1', '2025-09-22 15:26:05.126115', '1', '2025-11-03 21:04:51.48593');
INSERT INTO public.authors VALUES (33, 'Nama Pengarang', 'PL', NULL, NULL, '1', '2025-09-12 15:03:52.912701', '1', '2025-09-12 15:03:52.912701', '1', '2025-11-03 21:13:27.628389');
INSERT INTO public.authors VALUES (47, 'Test lagi aja', 'ID', 2025, 'test aja bang', '1', '2025-09-18 14:43:29.552207', '1', '2025-09-18 14:43:29.552207', '1', '2025-11-03 21:19:12.103021');
INSERT INTO public.authors VALUES (31, 'test tambah data pengarang', 'FR', 2020, 'tentang aja', '1', '2025-09-12 14:38:55.036591', '1', '2025-09-12 14:38:55.036591', '1', '2025-11-03 21:20:06.643176');
INSERT INTO public.authors VALUES (66, 'Alfan Update', 'AU', 2025, 'test update saja', '1', '2025-09-22 15:26:00.86741', '1', '2025-11-03 21:25:11.418067', '1', '2026-01-23 07:40:00.916318');
INSERT INTO public.authors VALUES (57, 'Alfan', 'ID', 2022, NULL, '1', '2025-09-22 14:36:43.400319', '1', '2025-09-22 14:36:43.400319', '1', '2026-01-23 07:40:32.27806');
INSERT INTO public.authors VALUES (56, 'test', 'ID', NULL, NULL, '1', '2025-09-22 14:36:31.25874', '1', '2025-09-22 14:36:31.25874', '1', '2026-01-23 07:40:49.162914');
INSERT INTO public.authors VALUES (54, 'dsadad', 'ID', NULL, NULL, '1', '2025-09-22 14:20:02.823764', '1', '2025-09-22 14:20:02.823764', '1', '2026-01-23 07:47:15.186141');
INSERT INTO public.authors VALUES (40, 'test lagi', 'ID', 2020, 'tentang', '1', '2025-09-18 09:35:39.254944', '1', '2025-09-18 09:35:39.254944', '1', '2026-01-29 20:25:27.256507');
INSERT INTO public.authors VALUES (49, 'Alfan', 'ID', 2025, 'test aja coba dulu', '1', '2025-09-18 14:48:09.655395', '1', '2025-09-18 14:48:09.655395', '1', '2026-01-29 20:48:37.362818');
INSERT INTO public.authors VALUES (96, 'Alfan Wahyudi', 'BT', 2020, 'test tambah data aja', '1', '2025-09-22 16:55:59.729246', '1', '2025-09-22 16:55:59.729246', '1', '2025-09-24 15:02:21.280877');
INSERT INTO public.authors VALUES (93, 'Alfan', 'AF', 2022, 'test', '1', '2025-09-22 15:27:51.898118', '1', '2025-09-22 15:27:51.898118', '1', '2025-09-24 16:53:26.26293');
INSERT INTO public.authors VALUES (107, 'Update Lewat Form', 'DE', 2023, 'Updating Author data dari Form ya', '1', '2025-09-23 12:08:54.88438', '1', '2025-09-23 20:45:20.550458', '1', '2025-09-24 09:01:28.465426');
INSERT INTO public.authors VALUES (98, 'Test Tambah Lewat Form', 'DZ', 2025, 'test', '1', '2025-09-23 08:57:06.629522', '1', '2025-09-23 08:57:06.629522', '1', '2025-09-24 09:02:12.856157');
INSERT INTO public.authors VALUES (62, 'Test Buat Component Baru', 'AW', 2020, 'Test dengan membuat komponen terpisah untuk form nya', '1', '2025-09-22 15:15:07.645041', '1', '2025-09-22 15:15:07.645041', '1', '2025-09-24 16:54:01.970683');
INSERT INTO public.authors VALUES (102, 'Test Tambah data baru', 'CG', 2020, 'test aja', '1', '2025-09-23 11:57:10.109499', '1', '2025-09-23 11:57:10.109499', '1', '2025-09-24 09:25:52.737024');
INSERT INTO public.authors VALUES (100, 'Test tambah data lagi', 'SV', 2025, 'Test aja', '1', '2025-09-23 11:05:33.306958', '1', '2025-09-23 11:05:33.306958', '1', '2025-09-24 09:29:18.5447');
INSERT INTO public.authors VALUES (99, 'Alfan Wahyudi', 'ID', NULL, NULL, '1', '2025-09-23 09:01:49.05818', '1', '2025-09-23 11:45:48.125766', '1', '2025-09-24 09:29:38.564011');
INSERT INTO public.authors VALUES (101, 'Alfan Wahyudi', 'ID', 2025, 'Test update data lewat form', '1', '2025-09-23 11:54:11.759932', '1', '2025-09-23 11:54:11.759932', '1', '2025-09-24 09:29:46.646394');
INSERT INTO public.authors VALUES (95, 'Alfan', 'AX', 2020, 'test', '1', '2025-09-22 15:28:25.271855', '1', '2025-09-22 15:28:25.271855', '1', '2025-10-02 20:54:29.981487');
INSERT INTO public.authors VALUES (108, 'Test Update', 'HT', 2025, 'test Update data aja', '1', '2025-09-23 18:37:50.906656', '1', '2025-09-24 11:09:05.761692', '1', '2025-09-24 11:11:49.114987');
INSERT INTO public.authors VALUES (104, 'Alfan Wahyudi', 'ID', 2025, '', '1', '2025-09-23 11:58:00.194382', '1', '2025-09-23 11:58:00.194382', '1', '2025-09-24 11:44:56.274962');
INSERT INTO public.authors VALUES (105, 'Alfan Wahyudi Update', 'ID', 2020, 'Update pengarang lewat Form', '1', '2025-09-23 11:59:17.291816', '1', '2025-09-23 11:59:17.291816', '1', '2025-09-24 11:45:19.609091');
INSERT INTO public.authors VALUES (103, 'Alfan Wahyudi', 'ID', 2025, '', '1', '2025-09-23 11:57:42.028514', '1', '2025-09-23 11:57:42.028514', '1', '2025-09-24 11:51:32.721995');
INSERT INTO public.authors VALUES (106, 'Alfan Wahyudi', 'ID', NULL, '', '1', '2025-09-23 12:02:35.846445', '1', '2025-09-23 12:02:35.846445', '1', '2025-09-24 11:52:04.226203');
INSERT INTO public.authors VALUES (97, 'Justin', 'CU', 2025, 'tidak ada', '1', '2025-09-23 08:55:54.935392', '1', '2025-09-23 08:55:54.935392', '1', '2025-09-24 14:16:20.13339');
INSERT INTO public.authors VALUES (94, 'Alfan Update Lagi', 'AF', 2022, 'test', '1', '2025-09-22 15:28:12.929936', '1', '2025-10-02 20:55:22.451415', '1', '2025-10-02 20:55:31.686256');
INSERT INTO public.authors VALUES (109, 'Test', 'AL', 2020, 'test aja', '1', '2025-10-10 11:17:14.294559', '1', '2025-10-10 11:17:14.294559', '1', '2025-10-10 11:17:26.986732');
INSERT INTO public.authors VALUES (92, 'Alfan', 'AF', 2022, 'test', '1', '2025-09-22 15:27:51.401689', '1', '2025-09-22 15:27:51.401689', '1', '2025-10-10 11:17:47.569505');
INSERT INTO public.authors VALUES (83, 'Alfan', 'AF', NULL, NULL, '1', '2025-09-22 15:26:44.850879', '1', '2025-09-22 15:26:44.850879', '1', '2025-10-10 11:17:57.113727');
INSERT INTO public.authors VALUES (91, 'Alfan', 'AF', 2022, 'test', '1', '2025-09-22 15:27:50.783626', '1', '2025-09-22 15:27:50.783626', '1', '2025-10-10 11:20:51.828842');
INSERT INTO public.authors VALUES (90, 'Alfan', 'AF', 2022, 'test', '1', '2025-09-22 15:27:50.225924', '1', '2025-09-22 15:27:50.225924', '1', '2025-10-10 11:21:10.476249');
INSERT INTO public.authors VALUES (89, 'Alfan Update', 'AF', 2022, 'test Update', '1', '2025-09-22 15:27:49.51674', '1', '2025-10-10 11:22:45.168745', '1', '2025-10-10 11:22:54.371517');
INSERT INTO public.authors VALUES (88, 'Alfan', 'AF', 2022, 'test', '1', '2025-09-22 15:27:48.449267', '1', '2025-09-22 15:27:48.449267', '1', '2025-10-10 11:23:56.46567');
INSERT INTO public.authors VALUES (87, 'Alfan', 'AF', 2022, 'test', '1', '2025-09-22 15:27:46.550974', '1', '2025-09-22 15:27:46.550974', '1', '2025-10-10 11:24:28.733512');
INSERT INTO public.authors VALUES (86, 'Alfan', 'AF', 2022, 'test', '1', '2025-09-22 15:27:41.132712', '1', '2025-09-22 15:27:41.132712', '1', '2025-10-10 11:25:04.904885');
INSERT INTO public.authors VALUES (85, 'Alfan', 'AF', 2022, 'test', '1', '2025-09-22 15:27:39.892753', '1', '2025-09-22 15:27:39.892753', '1', '2025-10-10 11:25:15.338343');
INSERT INTO public.authors VALUES (84, 'Alfan', 'AF', 2022, 'test', '1', '2025-09-22 15:27:36.998949', '1', '2025-09-22 15:27:36.998949', '1', '2025-10-10 11:25:36.932708');
INSERT INTO public.authors VALUES (82, 'Alfan', 'AF', NULL, NULL, '1', '2025-09-22 15:26:43.219971', '1', '2025-09-22 15:26:43.219971', '1', '2025-10-10 11:25:46.226468');
INSERT INTO public.authors VALUES (81, 'Alfan', 'AF', NULL, NULL, '1', '2025-09-22 15:26:25.725384', '1', '2025-09-22 15:26:25.725384', '1', '2025-10-10 11:27:33.405962');
INSERT INTO public.authors VALUES (111, 'Alfan Wah', 'HT', 2020, 'Tes t', '1', '2025-10-11 06:27:37.450706', '1', '2025-10-11 06:27:37.450706', '1', '2025-10-15 12:00:43.32019');
INSERT INTO public.authors VALUES (110, 'Test tambah data lagi', 'BJ', 2025, 'test test s t etest', '1', '2025-10-11 06:26:59.968536', '1', '2025-10-11 06:26:59.968536', '1', '2025-10-15 12:00:49.631483');
INSERT INTO public.authors VALUES (80, 'Alfan', 'AF', NULL, NULL, '1', '2025-09-22 15:26:25.104236', '1', '2025-09-22 15:26:25.104236', '1', '2025-10-15 12:00:54.519269');
INSERT INTO public.authors VALUES (79, 'Alfan', 'AF', NULL, NULL, '1', '2025-09-22 15:26:24.550237', '1', '2025-09-22 15:26:24.550237', '1', '2025-10-15 12:00:59.001916');
INSERT INTO public.authors VALUES (78, 'Alfan', 'AF', NULL, NULL, '1', '2025-09-22 15:26:23.770292', '1', '2025-09-22 15:26:23.770292', '1', '2025-10-15 12:01:03.928541');
INSERT INTO public.authors VALUES (73, 'Alfan', 'AF', NULL, NULL, '1', '2025-09-22 15:26:09.564126', '1', '2025-09-22 15:26:09.564126', '1', '2025-11-03 15:38:18.914041');
INSERT INTO public.authors VALUES (112, 'Test Update Nama', 'AF', 2021, 'test update tentang', '1', '2025-10-15 12:06:33.68297', '1', '2025-10-15 12:06:54.408321', '1', '2025-10-15 12:07:00.680521');
INSERT INTO public.authors VALUES (114, 'Test tambah dua', 'BJ', 2025, 'test saj abang', '1', '2025-11-03 14:17:23.488029', '1', '2025-11-03 14:17:23.488029', '1', '2025-11-03 14:18:54.600282');
INSERT INTO public.authors VALUES (115, 'Test tambah data lagi', 'AF', 2020, '', '1', '2025-11-03 14:40:05.55363', '1', '2025-11-03 14:40:05.55363', '1', '2025-11-03 14:40:20.879992');
INSERT INTO public.authors VALUES (116, 'test reload page setelah berhasil tambah', 'AO', 2022, 'test aja', '1', '2025-11-03 14:44:58.879598', '1', '2025-11-03 14:44:58.879598', '1', '2025-11-03 14:52:08.417365');
INSERT INTO public.authors VALUES (77, 'Alfan', 'AF', 2020, 'tidak ada', '1', '2025-09-22 15:26:21.477796', '1', '2025-10-15 12:01:27.411646', '1', '2025-11-03 14:52:48.9168');
INSERT INTO public.authors VALUES (117, 'Test ke 4', 'AD', 2020, 'Test refresh table setelah berhasil tambah data pengarang', '1', '2025-11-03 15:36:31.615851', '1', '2025-11-03 15:36:31.615851', '1', '2025-11-03 15:37:33.824593');
INSERT INTO public.authors VALUES (76, 'Alfan', 'AF', NULL, NULL, '1', '2025-09-22 15:26:11.271474', '1', '2025-09-22 15:26:11.271474', '1', '2025-11-03 15:38:10.892331');
INSERT INTO public.authors VALUES (113, 'test tambah data dan Update nya', 'AS', 2025, 'lorem ipsum hanya test saja update data saja', '1', '2025-11-03 14:14:38.47216', '1', '2025-11-03 14:18:19.653955', '1', '2025-11-03 15:47:06.897978');
INSERT INTO public.authors VALUES (75, 'Alfan', 'AF', NULL, NULL, '1', '2025-09-22 15:26:10.654642', '1', '2025-09-22 15:26:10.654642', '1', '2025-11-03 15:48:58.332489');
INSERT INTO public.authors VALUES (74, 'Alfan', 'AF', NULL, NULL, '1', '2025-09-22 15:26:10.099566', '1', '2025-09-22 15:26:10.099566', '1', '2025-11-03 15:49:45.944806');
INSERT INTO public.authors VALUES (70, 'Alfan', 'AF', NULL, NULL, '1', '2025-09-22 15:26:07.836955', '1', '2025-09-22 15:26:07.836955', '1', '2025-11-03 15:51:45.350095');
INSERT INTO public.authors VALUES (72, 'Alfan', 'AF', NULL, NULL, '1', '2025-09-22 15:26:08.975123', '1', '2025-09-22 15:26:08.975123', '1', '2025-11-03 15:52:21.439811');
INSERT INTO public.authors VALUES (53, 'Test lagi lagi', 'ID', 2023, 'test aja lah biar gg', '1', '2025-09-18 14:58:09.37798', '1', '2025-09-18 14:58:09.37798', '1', '2026-01-23 07:53:58.617786');
INSERT INTO public.authors VALUES (122, 'Test Update Aja', 'BS', NULL, '', '1', '2025-12-23 14:15:35.363945', '1', '2025-12-23 14:18:07.902732', '1', '2025-12-23 14:29:42.683695');
INSERT INTO public.authors VALUES (120, 'Budi Santoso Update', 'ID', 2005, 'coba Update data budi santoso', '1', '2025-12-22 09:17:39.771998', '1', '2025-12-23 09:34:29.462706', '1', '2025-12-23 14:29:59.393463');
INSERT INTO public.authors VALUES (124, 'Test Tambah 5  Update 1', 'AL', 2001, 'Test tambah 5 update 1', '1', '2026-01-25 06:28:35.531004', '1', '2026-01-25 06:33:25.67869', '1', '2026-01-29 20:47:39.860755');


--
-- TOC entry 5014 (class 0 OID 25871)
-- Dependencies: 226
-- Data for Name: book_authors; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.book_authors VALUES (50, 28, '1', '2026-03-30 10:25:00.263776');
INSERT INTO public.book_authors VALUES (25, 28, '1', '2026-03-30 10:25:00.263776');
INSERT INTO public.book_authors VALUES (1, 1, '1', '2025-06-01 08:05:20');
INSERT INTO public.book_authors VALUES (2, 2, '1', '2025-06-01 08:05:20');
INSERT INTO public.book_authors VALUES (3, 3, '1', '2025-06-01 08:05:20');
INSERT INTO public.book_authors VALUES (3, 1, '1', '2025-06-01 08:05:20');
INSERT INTO public.book_authors VALUES (3, 2, '1', '2025-06-01 08:05:20');
INSERT INTO public.book_authors VALUES (5, 9, '1', '2026-02-04 14:13:27.502223');
INSERT INTO public.book_authors VALUES (6, 13, '1', '2026-02-04 14:18:50.828273');
INSERT INTO public.book_authors VALUES (7, 15, '1', '2026-02-04 14:20:01.490018');
INSERT INTO public.book_authors VALUES (7, 17, '1', '2026-02-04 14:23:10.496728');
INSERT INTO public.book_authors VALUES (8, 17, '1', '2026-02-04 14:23:10.496728');
INSERT INTO public.book_authors VALUES (9, 26, '1', '2026-02-04 14:50:14.632366');
INSERT INTO public.book_authors VALUES (9, 27, '1', '2026-02-04 14:55:23.947112');


--
-- TOC entry 5018 (class 0 OID 25968)
-- Dependencies: 230
-- Data for Name: book_loans; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.book_loans VALUES (50, 10, 27, '2026-04-20 13:26:40.050182', '2026-04-27 23:59:59.999', '2026-04-20 15:13:53.588851', '1', '2026-04-20 13:26:40.050182', '1', '2026-04-20 15:13:53.588851');
INSERT INTO public.book_loans VALUES (51, 10, 28, '2026-04-20 13:26:40.050182', '2026-04-27 23:59:59.999', '2026-04-20 15:23:25.77941', '1', '2026-04-20 13:26:40.050182', '1', '2026-04-20 15:23:25.77941');
INSERT INTO public.book_loans VALUES (56, 16, 15, '2026-04-20 15:24:31.233865', '2026-04-27 23:59:59.999', '2026-04-21 17:10:05.397035', '1', '2026-04-20 15:24:31.233865', '1', '2026-04-21 17:10:05.397035');
INSERT INTO public.book_loans VALUES (55, 5, 1, '2026-04-20 13:28:43.551475', '2026-04-27 23:59:59.999', '2026-04-21 17:12:36.306951', '1', '2026-04-20 13:28:43.551475', '1', '2026-04-21 17:12:36.306951');
INSERT INTO public.book_loans VALUES (54, 14, 9, '2026-04-20 13:28:02.106248', '2026-04-27 23:59:59.999', '2026-04-21 17:13:07.336407', '1', '2026-04-20 13:28:02.106248', '1', '2026-04-21 17:13:07.336407');
INSERT INTO public.book_loans VALUES (53, 14, 13, '2026-04-20 13:28:02.106248', '2026-04-27 23:59:59.999', '2026-04-21 17:14:22.767407', '1', '2026-04-20 13:28:02.106248', '1', '2026-04-21 17:14:22.767407');
INSERT INTO public.book_loans VALUES (52, 12, 2, '2026-04-20 13:27:32.186761', '2026-04-27 23:59:59.999', '2026-04-21 17:22:27.153946', '1', '2026-04-20 13:27:32.186761', '1', '2026-04-21 17:22:27.153946');
INSERT INTO public.book_loans VALUES (57, 4, 3, '2026-05-18 14:19:49.238052', '2026-05-25 23:59:59.999', '2026-05-21 20:54:34.922463', '1', '2026-05-18 14:19:49.238052', '1', '2026-05-21 20:54:34.922463');
INSERT INTO public.book_loans VALUES (58, 12, 17, '2026-05-21 20:55:40.8352', '2026-05-28 23:59:59.999', '2026-05-21 20:55:45.461819', '1', '2026-05-21 20:55:40.8352', '1', '2026-05-21 20:55:45.461819');
INSERT INTO public.book_loans VALUES (5, 5, 2, '2025-06-13 11:30:01', '2025-06-20 23:59:59', '2025-06-20 09:00:00', '2', '2025-06-13 11:30:01', '1', '2025-06-20 09:00:00');
INSERT INTO public.book_loans VALUES (4, 4, 1, '2025-06-07 15:50:01', '2025-06-14 23:59:59', '2025-06-14 23:59:59', '3', '2025-06-07 15:50:01', '1', '2025-06-14 23:59:59');
INSERT INTO public.book_loans VALUES (3, 3, 3, '2025-06-06 15:50:01', '2025-06-13 23:59:59', '2025-06-13 09:10:13', '3', '2025-06-06 15:50:01', '3', '2025-06-13 09:10:13');
INSERT INTO public.book_loans VALUES (1, 1, 1, '2025-06-06 15:50:01', '2025-06-13 23:59:59', '2025-06-13 11:00:00', '2', '2025-06-06 15:50:01', '2', '2025-06-13 11:00:00');
INSERT INTO public.book_loans VALUES (2, 2, 2, '2025-06-06 15:50:01', '2025-06-13 23:59:59', '2025-06-13 15:21:33', '2', '2025-06-06 15:50:01', '2', '2025-06-13 15:21:33');
INSERT INTO public.book_loans VALUES (39, 7, 1, '2026-03-30 16:51:40.166827', '2026-04-06 23:59:59.999', '2026-04-05 09:10:13', '1', '2026-03-30 16:51:40.166827', '1', '2026-04-05 09:10:13');
INSERT INTO public.book_loans VALUES (40, 7, 2, '2026-03-30 16:57:36.2932', '2026-04-06 23:59:59.999', '2026-04-06 09:16:13', '1', '2026-03-30 16:57:36.2932', '1', '2026-04-06 09:16:13');
INSERT INTO public.book_loans VALUES (41, 7, 13, '2026-03-30 16:57:36.2932', '2026-04-06 23:59:59.999', '2026-04-06 10:00:13', '1', '2026-03-30 16:57:36.2932', '1', '2026-04-06 10:00:13');
INSERT INTO public.book_loans VALUES (43, 19, 3, '2026-03-30 16:58:15.25984', '2026-04-06 23:59:59.999', '2026-04-05 10:00:13', '1', '2026-03-30 16:58:15.25984', '1', '2026-04-05 10:00:13');
INSERT INTO public.book_loans VALUES (44, 19, 28, '2026-03-30 16:58:40.119734', '2026-04-06 23:59:59.999', '2026-04-06 09:00:13', '1', '2026-03-30 16:58:40.119734', '1', '2026-04-06 09:00:13');
INSERT INTO public.book_loans VALUES (45, 14, 16, '2026-03-30 16:59:06.204603', '2026-04-06 23:59:59.999', '2026-04-06 09:20:13', '1', '2026-03-30 16:59:06.204603', '1', '2026-04-06 09:20:13');
INSERT INTO public.book_loans VALUES (46, 6, 15, '2026-03-30 17:00:50.909408', '2026-04-06 23:59:59.999', '2026-04-06 13:25:13', '1', '2026-03-30 17:00:50.909408', '1', '2026-04-06 13:25:13');
INSERT INTO public.book_loans VALUES (48, 6, 26, '2026-03-30 17:00:50.909408', '2026-04-06 23:59:59.999', '2026-04-06 14:00:13', '1', '2026-03-30 17:00:50.909408', '1', '2026-04-06 14:00:13');
INSERT INTO public.book_loans VALUES (49, 19, 27, '2026-03-30 17:12:07.56247', '2026-04-06 23:59:59.999', '2026-04-06 15:00:13', '1', '2026-03-30 17:12:07.56247', '1', '2026-04-06 15:00:13');


--
-- TOC entry 5013 (class 0 OID 25858)
-- Dependencies: 225
-- Data for Name: books; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.books VALUES (3, '9786020656151', 'Esensialisme', 'Pentingkan yang penting saja', 'Gramedia Pustaka Utama', '2022-02-16', 354, 'Indonesia', 1, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20', NULL, NULL);
INSERT INTO public.books VALUES (9, '111444111444', 'Book Title', 'Book Sub Title', 'Publisher', '2000-05-12', 50, 'Indonesia', 1, '1', '2026-02-04 14:13:27.502223', '1', '2026-02-04 14:13:27.502223', NULL, NULL);
INSERT INTO public.books VALUES (13, '2224445555', 'Test Lewat Postman 2', NULL, NULL, '2000-05-20', NULL, NULL, NULL, '1', '2026-02-04 14:18:50.828273', '1', '2026-02-04 14:18:50.828273', NULL, NULL);
INSERT INTO public.books VALUES (15, '1111444455', 'Test Lewat Postman 3', NULL, NULL, '2000-06-10', NULL, NULL, NULL, '1', '2026-02-04 14:20:01.490018', '1', '2026-02-04 14:20:01.490018', NULL, NULL);
INSERT INTO public.books VALUES (16, '333335555511111', 'Test Lewat Postman 4', 'Book Sub Title 4', 'test publisher 4', '2000-07-10', 26, 'Inggris', 1, '1', '2026-02-04 14:20:46.572174', '1', '2026-02-04 14:20:46.572174', NULL, NULL);
INSERT INTO public.books VALUES (17, '111166667777', 'Test Lewat Postman 5', 'Book Sub Title 5', 'test publisher 5', '2000-07-24', 78, 'Inggris', 1, '1', '2026-02-04 14:23:10.496728', '1', '2026-02-04 14:23:10.496728', NULL, NULL);
INSERT INTO public.books VALUES (26, '333333', 'Test Lewat Postman 6', 'Book Sub Title 6', 'test publisher 6', '2000-07-21', 100, 'Inggris', NULL, '1', '2026-02-04 14:50:14.632366', '1', '2026-02-04 14:50:14.632366', NULL, NULL);
INSERT INTO public.books VALUES (1, '9786231648303', 'Arsitektur Rumah Jawa', 'Mengungkap Filosofi Makna dan Simbologinya', 'Anak Hebat Indonesia', '2024-06-18', 230, 'Indonesia', 1, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20', NULL, NULL);
INSERT INTO public.books VALUES (2, '9786237661535', 'Buku Praktis Belajar Bahasa Inggris', 'Cara mudah dan singkat kuasai bahasa inggris', 'Checklist', '2014-06-20', 312, 'Indonesia', 6, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20', NULL, NULL);
INSERT INTO public.books VALUES (27, '9990001111', 'Test Lewat Postman 7', 'Book Sub Title 7', 'test publisher 7', '2000-07-01', 100, 'Indonesia', 2, '1', '2026-02-04 14:55:23.947112', '1', '2026-02-04 14:55:23.947112', NULL, NULL);
INSERT INTO public.books VALUES (31, '111444123123', 'Test tambah lewat form', 'test tambah lewat form', 'test penerbit', '2026-02-11', 200, 'Indonesia', 1, '1', '2026-02-10 15:51:16.919942', '1', '2026-02-16 14:50:21.094704', '1', '2026-02-18 14:24:57.63225');
INSERT INTO public.books VALUES (30, '4444555511', 'Test Lewat Postman 9 Update dari Form', 'Book Sub Title 9 Update', 'test publisher 9 Update', '2000-10-12', 3044, 'Indonesia Update', 123, '1', '2026-02-05 17:11:07.33951', '1', '2026-02-10 15:58:58.339282', '1', '2026-02-18 14:25:15.094255');
INSERT INTO public.books VALUES (28, '111144422244', 'Test Lewat Postman 8', 'Book Sub Title 8', 'test publisher 8', '2000-08-12', 100, 'Inggris', 2, '1', '2026-02-05 17:08:30.131731', '1', '2026-03-30 10:25:00.263776', NULL, NULL);


--
-- TOC entry 5022 (class 0 OID 42159)
-- Dependencies: 234
-- Data for Name: countries; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.countries VALUES ('AF', 'Afghanistan');
INSERT INTO public.countries VALUES ('AX', 'Åland Islands');
INSERT INTO public.countries VALUES ('AL', 'Albania');
INSERT INTO public.countries VALUES ('DZ', 'Algeria');
INSERT INTO public.countries VALUES ('AS', 'American Samoa');
INSERT INTO public.countries VALUES ('AD', 'Andorra');
INSERT INTO public.countries VALUES ('AO', 'Angola');
INSERT INTO public.countries VALUES ('AI', 'Anguilla');
INSERT INTO public.countries VALUES ('AQ', 'Antarctica');
INSERT INTO public.countries VALUES ('AG', 'Antigua and Barbuda');
INSERT INTO public.countries VALUES ('AR', 'Argentina');
INSERT INTO public.countries VALUES ('AM', 'Armenia');
INSERT INTO public.countries VALUES ('AW', 'Aruba');
INSERT INTO public.countries VALUES ('AU', 'Australia');
INSERT INTO public.countries VALUES ('AT', 'Austria');
INSERT INTO public.countries VALUES ('AZ', 'Azerbaijan');
INSERT INTO public.countries VALUES ('BS', 'Bahamas');
INSERT INTO public.countries VALUES ('BH', 'Bahrain');
INSERT INTO public.countries VALUES ('BD', 'Bangladesh');
INSERT INTO public.countries VALUES ('BB', 'Barbados');
INSERT INTO public.countries VALUES ('BY', 'Belarus');
INSERT INTO public.countries VALUES ('BE', 'Belgium');
INSERT INTO public.countries VALUES ('BZ', 'Belize');
INSERT INTO public.countries VALUES ('BJ', 'Benin');
INSERT INTO public.countries VALUES ('BM', 'Bermuda');
INSERT INTO public.countries VALUES ('BT', 'Bhutan');
INSERT INTO public.countries VALUES ('BO', 'Bolivia (Plurinational State of)');
INSERT INTO public.countries VALUES ('BQ', 'Bonaire, Sint Eustatius and Saba');
INSERT INTO public.countries VALUES ('BA', 'Bosnia and Herzegovina');
INSERT INTO public.countries VALUES ('BW', 'Botswana');
INSERT INTO public.countries VALUES ('BV', 'Bouvet Island');
INSERT INTO public.countries VALUES ('BR', 'Brazil');
INSERT INTO public.countries VALUES ('IO', 'British Indian Ocean Territory');
INSERT INTO public.countries VALUES ('BN', 'Brunei Darussalam');
INSERT INTO public.countries VALUES ('BG', 'Bulgaria');
INSERT INTO public.countries VALUES ('BF', 'Burkina Faso');
INSERT INTO public.countries VALUES ('BI', 'Burundi');
INSERT INTO public.countries VALUES ('CV', 'Cabo Verde');
INSERT INTO public.countries VALUES ('KH', 'Cambodia');
INSERT INTO public.countries VALUES ('CM', 'Cameroon');
INSERT INTO public.countries VALUES ('CA', 'Canada');
INSERT INTO public.countries VALUES ('KY', 'Cayman Islands');
INSERT INTO public.countries VALUES ('CF', 'Central African Republic');
INSERT INTO public.countries VALUES ('TD', 'Chad');
INSERT INTO public.countries VALUES ('CL', 'Chile');
INSERT INTO public.countries VALUES ('CN', 'China');
INSERT INTO public.countries VALUES ('CX', 'Christmas Island');
INSERT INTO public.countries VALUES ('CC', 'Cocos (Keeling) Islands');
INSERT INTO public.countries VALUES ('CO', 'Colombia');
INSERT INTO public.countries VALUES ('KM', 'Comoros');
INSERT INTO public.countries VALUES ('CG', 'Congo');
INSERT INTO public.countries VALUES ('CD', 'Congo (Democratic Republic of the)');
INSERT INTO public.countries VALUES ('CK', 'Cook Islands');
INSERT INTO public.countries VALUES ('CR', 'Costa Rica');
INSERT INTO public.countries VALUES ('CI', 'Côte d''Ivoire');
INSERT INTO public.countries VALUES ('HR', 'Croatia');
INSERT INTO public.countries VALUES ('CU', 'Cuba');
INSERT INTO public.countries VALUES ('CW', 'Curaçao');
INSERT INTO public.countries VALUES ('CY', 'Cyprus');
INSERT INTO public.countries VALUES ('CZ', 'Czechia');
INSERT INTO public.countries VALUES ('DK', 'Denmark');
INSERT INTO public.countries VALUES ('DJ', 'Djibouti');
INSERT INTO public.countries VALUES ('DM', 'Dominica');
INSERT INTO public.countries VALUES ('DO', 'Dominican Republic');
INSERT INTO public.countries VALUES ('EC', 'Ecuador');
INSERT INTO public.countries VALUES ('EG', 'Egypt');
INSERT INTO public.countries VALUES ('SV', 'El Salvador');
INSERT INTO public.countries VALUES ('GQ', 'Equatorial Guinea');
INSERT INTO public.countries VALUES ('ER', 'Eritrea');
INSERT INTO public.countries VALUES ('EE', 'Estonia');
INSERT INTO public.countries VALUES ('SZ', 'Eswatini');
INSERT INTO public.countries VALUES ('ET', 'Ethiopia');
INSERT INTO public.countries VALUES ('FK', 'Falkland Islands (Malvinas)');
INSERT INTO public.countries VALUES ('FO', 'Faroe Islands');
INSERT INTO public.countries VALUES ('FJ', 'Fiji');
INSERT INTO public.countries VALUES ('FI', 'Finland');
INSERT INTO public.countries VALUES ('FR', 'France');
INSERT INTO public.countries VALUES ('GF', 'French Guiana');
INSERT INTO public.countries VALUES ('PF', 'French Polynesia');
INSERT INTO public.countries VALUES ('TF', 'French Southern Territories');
INSERT INTO public.countries VALUES ('GA', 'Gabon');
INSERT INTO public.countries VALUES ('GM', 'Gambia');
INSERT INTO public.countries VALUES ('GE', 'Georgia');
INSERT INTO public.countries VALUES ('DE', 'Germany');
INSERT INTO public.countries VALUES ('GH', 'Ghana');
INSERT INTO public.countries VALUES ('GI', 'Gibraltar');
INSERT INTO public.countries VALUES ('GR', 'Greece');
INSERT INTO public.countries VALUES ('GL', 'Greenland');
INSERT INTO public.countries VALUES ('GD', 'Grenada');
INSERT INTO public.countries VALUES ('GP', 'Guadeloupe');
INSERT INTO public.countries VALUES ('GU', 'Guam');
INSERT INTO public.countries VALUES ('GT', 'Guatemala');
INSERT INTO public.countries VALUES ('GG', 'Guernsey');
INSERT INTO public.countries VALUES ('GN', 'Guinea');
INSERT INTO public.countries VALUES ('GW', 'Guinea-Bissau');
INSERT INTO public.countries VALUES ('GY', 'Guyana');
INSERT INTO public.countries VALUES ('HT', 'Haiti');
INSERT INTO public.countries VALUES ('HM', 'Heard Island and McDonald Islands');
INSERT INTO public.countries VALUES ('VA', 'Holy See');
INSERT INTO public.countries VALUES ('HN', 'Honduras');
INSERT INTO public.countries VALUES ('HK', 'Hong Kong');
INSERT INTO public.countries VALUES ('HU', 'Hungary');
INSERT INTO public.countries VALUES ('IS', 'Iceland');
INSERT INTO public.countries VALUES ('IN', 'India');
INSERT INTO public.countries VALUES ('ID', 'Indonesia');
INSERT INTO public.countries VALUES ('IR', 'Iran (Islamic Republic of)');
INSERT INTO public.countries VALUES ('IQ', 'Iraq');
INSERT INTO public.countries VALUES ('IE', 'Ireland');
INSERT INTO public.countries VALUES ('IM', 'Isle of Man');
INSERT INTO public.countries VALUES ('IL', 'Israel');
INSERT INTO public.countries VALUES ('IT', 'Italy');
INSERT INTO public.countries VALUES ('JM', 'Jamaica');
INSERT INTO public.countries VALUES ('JP', 'Japan');
INSERT INTO public.countries VALUES ('JE', 'Jersey');
INSERT INTO public.countries VALUES ('JO', 'Jordan');
INSERT INTO public.countries VALUES ('KZ', 'Kazakhstan');
INSERT INTO public.countries VALUES ('KE', 'Kenya');
INSERT INTO public.countries VALUES ('KI', 'Kiribati');
INSERT INTO public.countries VALUES ('KP', 'Korea (Democratic People''s Republic of)');
INSERT INTO public.countries VALUES ('KR', 'Korea, Republic of');
INSERT INTO public.countries VALUES ('KW', 'Kuwait');
INSERT INTO public.countries VALUES ('KG', 'Kyrgyzstan');
INSERT INTO public.countries VALUES ('LA', 'Lao People''s Democratic Republic');
INSERT INTO public.countries VALUES ('LV', 'Latvia');
INSERT INTO public.countries VALUES ('LB', 'Lebanon');
INSERT INTO public.countries VALUES ('LS', 'Lesotho');
INSERT INTO public.countries VALUES ('LR', 'Liberia');
INSERT INTO public.countries VALUES ('LY', 'Libya');
INSERT INTO public.countries VALUES ('LI', 'Liechtenstein');
INSERT INTO public.countries VALUES ('LT', 'Lithuania');
INSERT INTO public.countries VALUES ('LU', 'Luxembourg');
INSERT INTO public.countries VALUES ('MO', 'Macao');
INSERT INTO public.countries VALUES ('MG', 'Madagascar');
INSERT INTO public.countries VALUES ('MW', 'Malawi');
INSERT INTO public.countries VALUES ('MY', 'Malaysia');
INSERT INTO public.countries VALUES ('MV', 'Maldives');
INSERT INTO public.countries VALUES ('ML', 'Mali');
INSERT INTO public.countries VALUES ('MT', 'Malta');
INSERT INTO public.countries VALUES ('MH', 'Marshall Islands');
INSERT INTO public.countries VALUES ('MQ', 'Martinique');
INSERT INTO public.countries VALUES ('MR', 'Mauritania');
INSERT INTO public.countries VALUES ('MU', 'Mauritius');
INSERT INTO public.countries VALUES ('YT', 'Mayotte');
INSERT INTO public.countries VALUES ('MX', 'Mexico');
INSERT INTO public.countries VALUES ('FM', 'Micronesia (Federated States of)');
INSERT INTO public.countries VALUES ('MD', 'Moldova (Republic of)');
INSERT INTO public.countries VALUES ('MC', 'Monaco');
INSERT INTO public.countries VALUES ('MN', 'Mongolia');
INSERT INTO public.countries VALUES ('ME', 'Montenegro');
INSERT INTO public.countries VALUES ('MS', 'Montserrat');
INSERT INTO public.countries VALUES ('MA', 'Morocco');
INSERT INTO public.countries VALUES ('MZ', 'Mozambique');
INSERT INTO public.countries VALUES ('MM', 'Myanmar');
INSERT INTO public.countries VALUES ('NA', 'Namibia');
INSERT INTO public.countries VALUES ('NR', 'Nauru');
INSERT INTO public.countries VALUES ('NP', 'Nepal');
INSERT INTO public.countries VALUES ('NL', 'Netherlands');
INSERT INTO public.countries VALUES ('NC', 'New Caledonia');
INSERT INTO public.countries VALUES ('NZ', 'New Zealand');
INSERT INTO public.countries VALUES ('NI', 'Nicaragua');
INSERT INTO public.countries VALUES ('NE', 'Niger');
INSERT INTO public.countries VALUES ('NG', 'Nigeria');
INSERT INTO public.countries VALUES ('NU', 'Niue');
INSERT INTO public.countries VALUES ('NF', 'Norfolk Island');
INSERT INTO public.countries VALUES ('MK', 'North Macedonia');
INSERT INTO public.countries VALUES ('MP', 'Northern Mariana Islands');
INSERT INTO public.countries VALUES ('NO', 'Norway');
INSERT INTO public.countries VALUES ('OM', 'Oman');
INSERT INTO public.countries VALUES ('PK', 'Pakistan');
INSERT INTO public.countries VALUES ('PW', 'Palau');
INSERT INTO public.countries VALUES ('PS', 'Palestine, State of');
INSERT INTO public.countries VALUES ('PA', 'Panama');
INSERT INTO public.countries VALUES ('PG', 'Papua New Guinea');
INSERT INTO public.countries VALUES ('PY', 'Paraguay');
INSERT INTO public.countries VALUES ('PE', 'Peru');
INSERT INTO public.countries VALUES ('PH', 'Philippines');
INSERT INTO public.countries VALUES ('PN', 'Pitcairn');
INSERT INTO public.countries VALUES ('PL', 'Poland');
INSERT INTO public.countries VALUES ('PT', 'Portugal');
INSERT INTO public.countries VALUES ('PR', 'Puerto Rico');
INSERT INTO public.countries VALUES ('QA', 'Qatar');
INSERT INTO public.countries VALUES ('RE', 'Réunion');
INSERT INTO public.countries VALUES ('RO', 'Romania');
INSERT INTO public.countries VALUES ('RU', 'Russian Federation');
INSERT INTO public.countries VALUES ('RW', 'Rwanda');
INSERT INTO public.countries VALUES ('BL', 'Saint Barthélemy');
INSERT INTO public.countries VALUES ('SH', 'Saint Helena, Ascension and Tristan da Cunha');
INSERT INTO public.countries VALUES ('KN', 'Saint Kitts and Nevis');
INSERT INTO public.countries VALUES ('LC', 'Saint Lucia');
INSERT INTO public.countries VALUES ('MF', 'Saint Martin (French part)');
INSERT INTO public.countries VALUES ('PM', 'Saint Pierre and Miquelon');
INSERT INTO public.countries VALUES ('VC', 'Saint Vincent and the Grenadines');
INSERT INTO public.countries VALUES ('WS', 'Samoa');
INSERT INTO public.countries VALUES ('SM', 'San Marino');
INSERT INTO public.countries VALUES ('ST', 'Sao Tome and Principe');
INSERT INTO public.countries VALUES ('SA', 'Saudi Arabia');
INSERT INTO public.countries VALUES ('SN', 'Senegal');
INSERT INTO public.countries VALUES ('RS', 'Serbia');
INSERT INTO public.countries VALUES ('SC', 'Seychelles');
INSERT INTO public.countries VALUES ('SL', 'Sierra Leone');
INSERT INTO public.countries VALUES ('SG', 'Singapore');
INSERT INTO public.countries VALUES ('SX', 'Sint Maarten (Dutch part)');
INSERT INTO public.countries VALUES ('SK', 'Slovakia');
INSERT INTO public.countries VALUES ('SI', 'Slovenia');
INSERT INTO public.countries VALUES ('SB', 'Solomon Islands');
INSERT INTO public.countries VALUES ('SO', 'Somalia');
INSERT INTO public.countries VALUES ('ZA', 'South Africa');
INSERT INTO public.countries VALUES ('GS', 'South Georgia and the South Sandwich Islands');
INSERT INTO public.countries VALUES ('SS', 'South Sudan');
INSERT INTO public.countries VALUES ('ES', 'Spain');
INSERT INTO public.countries VALUES ('LK', 'Sri Lanka');
INSERT INTO public.countries VALUES ('SD', 'Sudan');
INSERT INTO public.countries VALUES ('SR', 'Suriname');
INSERT INTO public.countries VALUES ('SJ', 'Svalbard and Jan Mayen');
INSERT INTO public.countries VALUES ('SE', 'Sweden');
INSERT INTO public.countries VALUES ('CH', 'Switzerland');
INSERT INTO public.countries VALUES ('SY', 'Syrian Arab Republic');
INSERT INTO public.countries VALUES ('TW', 'Taiwan, Province of China');
INSERT INTO public.countries VALUES ('TJ', 'Tajikistan');
INSERT INTO public.countries VALUES ('TZ', 'Tanzania, United Republic of');
INSERT INTO public.countries VALUES ('TH', 'Thailand');
INSERT INTO public.countries VALUES ('TL', 'Timor-Leste');
INSERT INTO public.countries VALUES ('TG', 'Togo');
INSERT INTO public.countries VALUES ('TK', 'Tokelau');
INSERT INTO public.countries VALUES ('TO', 'Tonga');
INSERT INTO public.countries VALUES ('TT', 'Trinidad and Tobago');
INSERT INTO public.countries VALUES ('TN', 'Tunisia');
INSERT INTO public.countries VALUES ('TR', 'Türkiye');
INSERT INTO public.countries VALUES ('TM', 'Turkmenistan');
INSERT INTO public.countries VALUES ('TC', 'Turks and Caicos Islands');
INSERT INTO public.countries VALUES ('TV', 'Tuvalu');
INSERT INTO public.countries VALUES ('UG', 'Uganda');
INSERT INTO public.countries VALUES ('UA', 'Ukraine');
INSERT INTO public.countries VALUES ('AE', 'United Arab Emirates');
INSERT INTO public.countries VALUES ('GB', 'United Kingdom of Great Britain and Northern Ireland');
INSERT INTO public.countries VALUES ('US', 'United States of America');
INSERT INTO public.countries VALUES ('UM', 'United States Minor Outlying Islands');
INSERT INTO public.countries VALUES ('UY', 'Uruguay');
INSERT INTO public.countries VALUES ('UZ', 'Uzbekistan');
INSERT INTO public.countries VALUES ('VU', 'Vanuatu');
INSERT INTO public.countries VALUES ('VE', 'Venezuela (Bolivarian Republic of)');
INSERT INTO public.countries VALUES ('VN', 'Viet Nam');
INSERT INTO public.countries VALUES ('VG', 'Virgin Islands (British)');
INSERT INTO public.countries VALUES ('VI', 'Virgin Islands (U.S.)');
INSERT INTO public.countries VALUES ('WF', 'Wallis and Futuna');
INSERT INTO public.countries VALUES ('EH', 'Western Sahara');
INSERT INTO public.countries VALUES ('YE', 'Yemen');
INSERT INTO public.countries VALUES ('ZM', 'Zambia');
INSERT INTO public.countries VALUES ('ZW', 'Zimbabwe');


--
-- TOC entry 5016 (class 0 OID 25903)
-- Dependencies: 228
-- Data for Name: members; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.members VALUES (1, 'Siti Nurhaliza', 'siti@gmail.com', '081234567890', 'Bandung', '1995-04-12', 'f', '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.members VALUES (2, 'Arif Prasetyo', 'arif@gmail.com', '082133445566', 'Bandung', '1999-03-20', 'm', '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.members VALUES (3, 'Dewi Lestari', 'dewi@gmail.com', '087722119988', 'Bandung', '2000-01-01', 'f', '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.members VALUES (4, 'Budi Santoso', 'budi@gmail.com', '081322223333', 'Bandung', '1997-05-25', 'm', '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.members VALUES (5, 'Nina Kartini', 'nina@gmail.com', '085688990011', 'Bandung', '1998-09-10', 'f', '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.members VALUES (6, 'Rizky Andika', 'rizky@gmail.com', '082244112299', 'Bandung', '2000-05-27', 'm', '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.members VALUES (7, 'Melati Ayu', 'melati@gmail.com', '088855556666', 'Bandung', '2000-08-24', 'f', '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.members VALUES (8, 'Hendra Wirawan', 'hendra@gmail.com', '081211117777', 'Bandung', '1995-02-10', 'm', '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.members VALUES (9, 'Putri Maharani', 'putri@gmail.com', '086533558822', 'Bandung', '1995-03-22', 'f', '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.members VALUES (10, 'Yoga Pranata', 'yoga@gmail.com', '083877778888', 'Bandung', '1996-09-19', 'm', '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.members VALUES (11, 'member1', 'member1@gmail.com', '084523419314', 'jalan bandung selatan', '2000-05-20', 'f', '1', '2025-12-19 17:04:07.235244', '1', '2025-12-19 17:04:07.235244');
INSERT INTO public.members VALUES (12, 'Member 2 Update', 'member2_update@gmail.com', '085284241920', 'jalan update bandung selatan', '2000-05-22', 'f', '1', '2025-12-19 17:31:45.887002', '1', '2025-12-19 20:20:50.012908');
INSERT INTO public.members VALUES (13, 'Test Member Dari Form', 'test_member_dari_form@gmail.com', '085214215215', 'Sukabumi', '2000-12-01', 'm', '1', '2025-12-20 10:00:07.22333', '1', '2025-12-20 10:00:07.22333');
INSERT INTO public.members VALUES (14, 'Tiara Ayu', 'tiara@gmail.com', '082222222299', 'Jalan Bandung Telah Berhasil di Update', '2000-12-10', 'f', '1', '2025-12-20 10:09:14.959838', '1', '2025-12-20 13:09:04.179442');
INSERT INTO public.members VALUES (15, 'Rian Hermawan', 'rian@gmail.com', '081111122222', 'Jakarta', '2006-02-15', 'm', '1', '2025-12-20 13:47:56.331958', '1', '2025-12-20 13:47:56.331958');
INSERT INTO public.members VALUES (18, 'John Ryan', 'john@gmail.com', '081111155555', 'Bekasi', '1991-03-05', 'm', '1', '2025-12-23 07:54:15.810248', '1', '2025-12-23 09:11:30.232011');
INSERT INTO public.members VALUES (16, 'Lina Dewi', 'lina@gmail.com', '085555555333', 'Jakarta', '2005-06-05', 'f', '1', '2025-12-20 13:48:58.122055', '1', '2025-12-23 09:16:33.410728');
INSERT INTO public.members VALUES (19, 'Rahmat', 'rahmat@gmail.com', '085555599999', 'Jakarta', '1980-02-04', 'm', '1', '2025-12-23 15:04:29.862527', '1', '2025-12-23 15:08:31.215531');
INSERT INTO public.members VALUES (20, 'Test Update 2 Lagi', 'test1updatelagi@gmail.com', '082222211111', 'Bandung', '2025-12-10', 'm', '1', '2025-12-23 15:08:57.868559', '1', '2026-01-23 14:29:38.003251');
INSERT INTO public.members VALUES (21, 'Test Tambah 10 update', 'test10update@gmail.com', '087782141251', 'Jalan Jakarta Update', '2000-01-31', 'm', '1', '2026-01-23 14:30:23.898099', '1', '2026-02-02 12:57:37.549682');
INSERT INTO public.members VALUES (23, 'Test tambah 11', 'test11@gmail.com', '0899913415114', 'Bandung', '1997-02-10', 'm', '1', '2026-02-02 12:58:34.196109', '1', '2026-02-02 12:58:34.196109');
INSERT INTO public.members VALUES (22, 'Test Update 9 Lagi', 'test9update@gmail.com', '089993333312', 'Tangerang', '1995-05-15', 'm', '1', '2026-01-23 15:18:47.685092', '1', '2026-03-03 09:39:53.054855');


--
-- TOC entry 5020 (class 0 OID 26068)
-- Dependencies: 232
-- Data for Name: permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.permissions VALUES (1, 'create_member', 'Can create members');
INSERT INTO public.permissions VALUES (2, 'update_member', 'Can update members');
INSERT INTO public.permissions VALUES (3, 'delete_member', 'Can delete members');
INSERT INTO public.permissions VALUES (4, 'view_member', 'Can view members');
INSERT INTO public.permissions VALUES (5, 'create_book', 'Can create books');
INSERT INTO public.permissions VALUES (6, 'update_book', 'Can update books');
INSERT INTO public.permissions VALUES (7, 'delete_book', 'Can delete books');
INSERT INTO public.permissions VALUES (8, 'view_book', 'Can view books');
INSERT INTO public.permissions VALUES (9, 'create_book_reservation', 'Can create book reservations');
INSERT INTO public.permissions VALUES (10, 'update_book_reservation', 'Can update book reservations');
INSERT INTO public.permissions VALUES (11, 'delete_book_reservation', 'Can delete book reservations');
INSERT INTO public.permissions VALUES (12, 'view_book_reservation', 'Can view book reservations');
INSERT INTO public.permissions VALUES (13, 'create_book_loan', 'Can create book loans');
INSERT INTO public.permissions VALUES (14, 'update_book_loan', 'Can update book loans');
INSERT INTO public.permissions VALUES (15, 'delete_book_loan', 'Can delete book loans');
INSERT INTO public.permissions VALUES (16, 'view_book_loan', 'Can view book loans');
INSERT INTO public.permissions VALUES (17, 'create_book_image', 'Can create book images');
INSERT INTO public.permissions VALUES (18, 'update_book_image', 'Can update book images');
INSERT INTO public.permissions VALUES (19, 'delete_book_image', 'Can delete book images');
INSERT INTO public.permissions VALUES (20, 'view_book_image', 'Can view book images');
INSERT INTO public.permissions VALUES (21, 'create_author', 'Can create authors');
INSERT INTO public.permissions VALUES (22, 'update_author', 'Can update authors');
INSERT INTO public.permissions VALUES (23, 'delete_author', 'Can delete authors');
INSERT INTO public.permissions VALUES (24, 'view_author', 'Can view authors');
INSERT INTO public.permissions VALUES (25, 'create_violation', 'Can create violations');
INSERT INTO public.permissions VALUES (26, 'update_violation', 'Can update violations');
INSERT INTO public.permissions VALUES (27, 'delete_violation', 'Can delete violations');
INSERT INTO public.permissions VALUES (28, 'view_violation', 'Can view violations');
INSERT INTO public.permissions VALUES (29, 'create_sanction', 'Can create sanctions');
INSERT INTO public.permissions VALUES (30, 'update_sanction', 'Can update sanctions');
INSERT INTO public.permissions VALUES (31, 'delete_sanction', 'Can delete sanctions');
INSERT INTO public.permissions VALUES (32, 'view_sanction', 'Can view sanctions');
INSERT INTO public.permissions VALUES (33, 'create_loan_violation', 'Can create loan violations');
INSERT INTO public.permissions VALUES (34, 'update_loan_violation', 'Can update loan violations');
INSERT INTO public.permissions VALUES (35, 'delete_loan_violation', 'Can delete loan violations');
INSERT INTO public.permissions VALUES (36, 'view_loan_violation', 'Can view loan violations');
INSERT INTO public.permissions VALUES (37, 'download_book_reservation', 'Can download book reservations');
INSERT INTO public.permissions VALUES (38, 'download_book_loan', 'Can download book loans');
INSERT INTO public.permissions VALUES (39, 'download_loan_violation', 'Can download loan violations');
INSERT INTO public.permissions VALUES (40, 'create_permission', 'Can create permissions');
INSERT INTO public.permissions VALUES (41, 'view_permission', 'Can view permissions');
INSERT INTO public.permissions VALUES (42, 'create_role_permission', 'Can create role permissions');
INSERT INTO public.permissions VALUES (43, 'update_role_permission', 'Can update role permissions');
INSERT INTO public.permissions VALUES (44, 'delete_role_permission', 'Can delete role permissions');
INSERT INTO public.permissions VALUES (45, 'view_role_permission', 'Can view role permissions');
INSERT INTO public.permissions VALUES (46, 'create_user_role', 'Can create user roles');
INSERT INTO public.permissions VALUES (47, 'update_user_role', 'Can update user roles');
INSERT INTO public.permissions VALUES (48, 'delete_user_role', 'Can delete user roles');
INSERT INTO public.permissions VALUES (49, 'view_user_role', 'Can view user roles');
INSERT INTO public.permissions VALUES (50, 'create_role', 'Can create roles');
INSERT INTO public.permissions VALUES (51, 'update_role', 'Can update roles');
INSERT INTO public.permissions VALUES (52, 'delete_role', 'Can delete roles');
INSERT INTO public.permissions VALUES (53, 'view_role', 'Can view roles');


--
-- TOC entry 5021 (class 0 OID 26080)
-- Dependencies: 233
-- Data for Name: role_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.role_permissions VALUES (1, 1, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (1, 2, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (1, 3, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (1, 4, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (1, 5, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (1, 6, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (1, 7, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (1, 8, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (1, 9, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (1, 10, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (1, 11, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (1, 12, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (1, 13, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (1, 14, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (1, 15, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (1, 16, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (1, 17, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (1, 18, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (1, 19, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (1, 20, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (1, 21, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (1, 22, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (1, 23, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (1, 24, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (1, 25, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (1, 26, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (1, 27, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (1, 28, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (1, 29, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (1, 30, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (1, 31, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (1, 32, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (1, 33, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (1, 34, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (1, 35, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (1, 36, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (1, 37, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (1, 38, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (1, 39, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (1, 40, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (1, 41, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (1, 42, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (1, 43, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (1, 44, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (1, 45, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (1, 46, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (1, 47, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (1, 48, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (1, 49, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (1, 50, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (1, 51, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (1, 52, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (1, 53, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (2, 1, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (2, 2, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (2, 3, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (2, 4, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (2, 5, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (2, 6, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (2, 7, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (2, 8, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (2, 9, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (2, 10, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (2, 11, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (2, 12, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (2, 13, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (2, 14, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (2, 15, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (2, 16, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (2, 17, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (2, 18, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (2, 19, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (2, 20, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (2, 21, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (2, 22, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (2, 23, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (2, 24, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (2, 25, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (2, 26, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (2, 27, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (2, 28, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (2, 29, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (2, 30, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (2, 31, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (2, 32, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (2, 33, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (2, 34, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (2, 35, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (2, 36, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (2, 37, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (2, 38, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (2, 39, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (3, 4, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (3, 8, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (3, 12, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (3, 16, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (3, 20, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (3, 24, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (3, 28, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (3, 32, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (3, 36, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (3, 41, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (3, 45, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (3, 49, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.role_permissions VALUES (3, 53, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');


--
-- TOC entry 5008 (class 0 OID 25803)
-- Dependencies: 220
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.roles VALUES (1, 'Super Admin', '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.roles VALUES (2, 'Pustakawan', '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.roles VALUES (3, 'Viewer', '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');


--
-- TOC entry 5009 (class 0 OID 25828)
-- Dependencies: 221
-- Data for Name: user_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.user_roles VALUES (1, 1, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.user_roles VALUES (2, 2, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.user_roles VALUES (3, 3, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.user_roles VALUES (4, 3, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.user_roles VALUES (5, 3, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.user_roles VALUES (6, 3, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.user_roles VALUES (7, 3, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');
INSERT INTO public.user_roles VALUES (8, 3, '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20');


--
-- TOC entry 5006 (class 0 OID 25776)
-- Dependencies: 218
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users VALUES (3, 'pustakawan2', 'pustakawan2@gmail.com', '$2b$10$PNjl/rWLE8aTObKqeufbTujfFDxuxD6Bhku5.2l0MUqsoYvYxT9V6', 'Pustakawan 2', 'Jl. Melawai 5, RT.3/RW.1, Melawai, Kec. Kby. Baru, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12160', 'm', '1', '2025-06-01 08:05:20', '3', '2025-06-16 05:15:19', 'superadmin1', '2025-06-17 19:42:36');
INSERT INTO public.users VALUES (4, 'viewer1', 'viewer1@gmail.com', '$2b$10$PNjl/rWLE8aTObKqeufbTujfFDxuxD6Bhku5.2l0MUqsoYvYxT9V6', 'Viewer 1', 'Jl. Pintu Satu Senayan, Gelora, Kecamatan Tanah Abang, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10270', 'm', '1', '2025-06-01 08:05:20', '4', '2025-06-15 15:50:01', NULL, NULL);
INSERT INTO public.users VALUES (5, 'viewer2', 'viewer2@gmail.com', '$2b$10$PNjl/rWLE8aTObKqeufbTujfFDxuxD6Bhku5.2l0MUqsoYvYxT9V6', 'Viewer 2', 'Jl. Pintu Satu Senayan, Gelora, Kecamatan Tanah Abang, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10270', 'f', '1', '2025-06-01 08:05:20', '5', '2025-06-10 19:42:36', NULL, NULL);
INSERT INTO public.users VALUES (8, 'viewer5', 'viewer5@gmail.com', '$2b$10$PNjl/rWLE8aTObKqeufbTujfFDxuxD6Bhku5.2l0MUqsoYvYxT9V6', 'Viewer 5', 'Jl. Pintu Satu Senayan, Gelora, Kecamatan Tanah Abang, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10270', 'f', '1', '2025-06-01 08:05:20', '8', '2025-06-12 15:50:01', NULL, NULL);
INSERT INTO public.users VALUES (2, 'pustakawan1', 'pustakawan1@gmail.com', '$2b$10$PNjl/rWLE8aTObKqeufbTujfFDxuxD6Bhku5.2l0MUqsoYvYxT9V6', 'Pustakawan 1', 'Jl. Raya Halim Perdanakusuma No.1, RT.3/RW.8, Kb. Pala, Kec. Makasar, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13610', 'm', '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20', NULL, NULL);
INSERT INTO public.users VALUES (6, 'viewer3', 'viewer3@gmail.com', '$2b$10$PNjl/rWLE8aTObKqeufbTujfFDxuxD6Bhku5.2l0MUqsoYvYxT9V6', 'Viewer 3', 'Jl. Pintu Satu Senayan, Gelora, Kecamatan Tanah Abang, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10270', 'm', '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20', NULL, NULL);
INSERT INTO public.users VALUES (7, 'viewer4', 'viewer4@gmail.com', '$2b$10$PNjl/rWLE8aTObKqeufbTujfFDxuxD6Bhku5.2l0MUqsoYvYxT9V6', 'Viewer 4', 'Jl. Pintu Satu Senayan, Gelora, Kecamatan Tanah Abang, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10270', 'f', '1', '2025-06-01 08:05:20', '1', '2025-06-01 08:05:20', NULL, NULL);
INSERT INTO public.users VALUES (1, 'superadmin1', 'superadmin1@gmail.com', '$2b$10$PNjl/rWLE8aTObKqeufbTujfFDxuxD6Bhku5.2l0MUqsoYvYxT9V6', 'Super Admin Test', 'Jl. Raya Halim Perdanakusuma, Halim Perdanakusuma, Kec. Makasar, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13610', 'm', '1', '2025-06-01 08:05:20', '1', '2026-02-02 13:17:23.002717', NULL, NULL);


--
-- TOC entry 5035 (class 0 OID 0)
-- Dependencies: 222
-- Name: authors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.authors_id_seq', 125, true);


--
-- TOC entry 5036 (class 0 OID 0)
-- Dependencies: 229
-- Name: book_loans_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.book_loans_id_seq', 58, true);


--
-- TOC entry 5037 (class 0 OID 0)
-- Dependencies: 224
-- Name: books_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.books_id_seq', 31, true);


--
-- TOC entry 5038 (class 0 OID 0)
-- Dependencies: 227
-- Name: members_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.members_id_seq', 23, true);


--
-- TOC entry 5039 (class 0 OID 0)
-- Dependencies: 231
-- Name: permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.permissions_id_seq', 53, true);


--
-- TOC entry 5040 (class 0 OID 0)
-- Dependencies: 219
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_id_seq', 3, true);


--
-- TOC entry 5041 (class 0 OID 0)
-- Dependencies: 217
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 8, true);


--
-- TOC entry 4826 (class 2606 OID 25856)
-- Name: authors authors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.authors
    ADD CONSTRAINT authors_pkey PRIMARY KEY (id);


--
-- TOC entry 4832 (class 2606 OID 25877)
-- Name: book_authors book_authors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.book_authors
    ADD CONSTRAINT book_authors_pkey PRIMARY KEY (author_id, book_id);


--
-- TOC entry 4840 (class 2606 OID 25977)
-- Name: book_loans book_loans_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.book_loans
    ADD CONSTRAINT book_loans_pkey PRIMARY KEY (id);


--
-- TOC entry 4828 (class 2606 OID 25870)
-- Name: books books_isbn_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_isbn_key UNIQUE (isbn);


--
-- TOC entry 4830 (class 2606 OID 25868)
-- Name: books books_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_pkey PRIMARY KEY (id);


--
-- TOC entry 4848 (class 2606 OID 42163)
-- Name: countries countries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.countries
    ADD CONSTRAINT countries_pkey PRIMARY KEY (code);


--
-- TOC entry 4834 (class 2606 OID 25915)
-- Name: members members_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.members
    ADD CONSTRAINT members_email_key UNIQUE (email);


--
-- TOC entry 4836 (class 2606 OID 25917)
-- Name: members members_phone_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.members
    ADD CONSTRAINT members_phone_key UNIQUE (phone);


--
-- TOC entry 4838 (class 2606 OID 25913)
-- Name: members members_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.members
    ADD CONSTRAINT members_pkey PRIMARY KEY (id);


--
-- TOC entry 4842 (class 2606 OID 26079)
-- Name: permissions permissions_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT permissions_name_key UNIQUE (name);


--
-- TOC entry 4844 (class 2606 OID 26077)
-- Name: permissions permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT permissions_pkey PRIMARY KEY (id);


--
-- TOC entry 4846 (class 2606 OID 26086)
-- Name: role_permissions role_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_permissions
    ADD CONSTRAINT role_permissions_pkey PRIMARY KEY (role_id, permission_id);


--
-- TOC entry 4821 (class 2606 OID 25810)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- TOC entry 4823 (class 2606 OID 25834)
-- Name: user_roles user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (user_id, role_id);


--
-- TOC entry 4815 (class 2606 OID 25790)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4817 (class 2606 OID 25786)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4819 (class 2606 OID 25788)
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- TOC entry 4824 (class 1259 OID 26047)
-- Name: authors_full_name_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX authors_full_name_index ON public.authors USING btree (full_name);


--
-- TOC entry 5003 (class 2618 OID 58853)
-- Name: authors_view _RETURN; Type: RULE; Schema: public; Owner: postgres
--

CREATE OR REPLACE VIEW public.authors_view AS
 SELECT a.id,
    a.full_name,
    count(ba.book_id) AS book_count,
    a.country_code,
    c.name AS country_name,
    a.active_since,
    a.about,
    a.created_at,
    a.updated_at
   FROM ((public.authors a
     JOIN public.countries c ON ((c.code = a.country_code)))
     LEFT JOIN ( SELECT ba1.author_id,
            ba1.book_id
           FROM (public.book_authors ba1
             LEFT JOIN public.books b ON ((b.id = ba1.book_id)))
          WHERE ((b.deleted_at IS NULL) AND (b.deleted_by IS NULL))) ba ON ((ba.author_id = a.id)))
  GROUP BY a.id, c.name
 HAVING ((a.deleted_at IS NULL) AND (a.deleted_by IS NULL));


--
-- TOC entry 4851 (class 2606 OID 42171)
-- Name: authors authors_country_code_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.authors
    ADD CONSTRAINT authors_country_code_fkey FOREIGN KEY (country_code) REFERENCES public.countries(code);


--
-- TOC entry 4852 (class 2606 OID 25878)
-- Name: book_authors book_authors_author_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.book_authors
    ADD CONSTRAINT book_authors_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.authors(id) ON DELETE CASCADE;


--
-- TOC entry 4853 (class 2606 OID 25883)
-- Name: book_authors book_authors_book_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.book_authors
    ADD CONSTRAINT book_authors_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.books(id) ON DELETE CASCADE;


--
-- TOC entry 4854 (class 2606 OID 25983)
-- Name: book_loans book_loans_book_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.book_loans
    ADD CONSTRAINT book_loans_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.books(id) ON DELETE CASCADE;


--
-- TOC entry 4855 (class 2606 OID 25978)
-- Name: book_loans book_loans_member_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.book_loans
    ADD CONSTRAINT book_loans_member_id_fkey FOREIGN KEY (member_id) REFERENCES public.members(id) ON DELETE CASCADE;


--
-- TOC entry 4856 (class 2606 OID 26092)
-- Name: role_permissions role_permissions_permission_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_permissions
    ADD CONSTRAINT role_permissions_permission_id_fkey FOREIGN KEY (permission_id) REFERENCES public.permissions(id) ON DELETE CASCADE;


--
-- TOC entry 4857 (class 2606 OID 26087)
-- Name: role_permissions role_permissions_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_permissions
    ADD CONSTRAINT role_permissions_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id) ON DELETE CASCADE;


--
-- TOC entry 4849 (class 2606 OID 25840)
-- Name: user_roles user_roles_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id) ON DELETE CASCADE;


--
-- TOC entry 4850 (class 2606 OID 25835)
-- Name: user_roles user_roles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


-- Completed on 2026-05-24 07:53:47

--
-- PostgreSQL database dump complete
--

