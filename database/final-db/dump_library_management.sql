--
-- PostgreSQL database dump
--

\restrict P7xwXVh43wPm1ClpQVlIpVlIuFN2LVdvDE8tvknYjMyeU8hwD3Na2W8kPQjSTWk

-- Dumped from database version 16.14 (Ubuntu 16.14-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.14 (Ubuntu 16.14-0ubuntu0.24.04.1)

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

--
-- Name: genderenum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.genderenum AS ENUM (
    'm',
    'f'
);


ALTER TYPE public.genderenum OWNER TO postgres;

--
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
-- Name: authors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.authors_id_seq OWNED BY public.authors.id;


--
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
-- Name: book_loan_hist_view; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.book_loan_hist_view AS
 SELECT bl.id,
    bl.book_id,
    b.title AS book_title,
    b.isbn AS book_isbn,
    bl.member_id,
    m.full_name AS member_full_name,
    m.email AS member_email,
    bl.start_date,
    bl.end_date,
    bl.finished_date,
    bl.created_by,
    bl.created_at,
    bl.updated_by,
    bl.updated_at
   FROM ((public.book_loans bl
     LEFT JOIN public.books b ON ((bl.book_id = b.id)))
     LEFT JOIN public.members m ON ((bl.member_id = m.id)))
  WHERE ((bl.finished_date IS NOT NULL) AND (b.deleted_by IS NULL) AND (b.deleted_at IS NULL));


ALTER VIEW public.book_loan_hist_view OWNER TO postgres;

--
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
-- Name: book_loans_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.book_loans_id_seq OWNED BY public.book_loans.id;


--
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
-- Name: books_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.books_id_seq OWNED BY public.books.id;


--
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
-- Name: countries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.countries (
    code character(2) NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.countries OWNER TO postgres;

--
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
-- Name: members_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.members_id_seq OWNED BY public.members.id;


--
-- Name: permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.permissions (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text
);


ALTER TABLE public.permissions OWNER TO postgres;

--
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
-- Name: permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.permissions_id_seq OWNED BY public.permissions.id;


--
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
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
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
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: authors id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.authors ALTER COLUMN id SET DEFAULT nextval('public.authors_id_seq'::regclass);


--
-- Name: book_loans id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.book_loans ALTER COLUMN id SET DEFAULT nextval('public.book_loans_id_seq'::regclass);


--
-- Name: books id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.books ALTER COLUMN id SET DEFAULT nextval('public.books_id_seq'::regclass);


--
-- Name: members id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.members ALTER COLUMN id SET DEFAULT nextval('public.members_id_seq'::regclass);


--
-- Name: permissions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permissions ALTER COLUMN id SET DEFAULT nextval('public.permissions_id_seq'::regclass);


--
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: authors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.authors (id, full_name, country_code, active_since, about, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) FROM stdin;
1	Asti Musman	ID	\N	\N	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20	\N	\N
2	Wahidah Murriska	ID	\N	Memiliki pengalaman kerja sebagai English translator di Perpustakaan Ganesa, Sukoharjo (2015), English teacher di Erje Privat (2016), dan Writer di Sanggar Bahasa Yogyakarta (2017). Latar belakang pendidikannya adalah Sastra Inggris, Fakultas Ilmu Budaya, Universitas Sebelas Maret, dan Ilmu Linguistik, Fakultas Ilmu Budaya, Universitas Gadjah Mada	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20	\N	\N
3	Greg McKeown	GB	\N	\N	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20	\N	\N
4	Alice Monroe	CA	1998	Lorem ipsum	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20	\N	\N
5	Javier Ortega	ES	2005	Dolor sit amet	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20	\N	\N
6	Nina Patel	IN	2010	Consectetur	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20	\N	\N
7	Tomoko Sato	JP	1995	Adipiscing	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20	\N	\N
8	Liam O’Connor	IE	2001	Elit lorem	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20	\N	\N
9	Fatima Zahra	MA	2012	Sed do	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20	\N	\N
10	George Smith	US	1987	Eiusmod	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20	\N	\N
11	Chen Wei	CN	2003	Tempor	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20	\N	\N
12	Sofia Rossi	IT	1999	Incididunt	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20	\N	\N
13	Hans Müller	DE	2007	Ut labore	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20	\N	\N
14	Amara Johnson	ZA	2015	Et dolore	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20	\N	\N
15	Mateo Silva	BR	2000	Magna aliqua	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20	\N	\N
16	Elena Petrova	RU	1993	Ut enim	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20	\N	\N
17	Yusuf Demir	TR	2008	Ad minim	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20	\N	\N
18	Grace Lee	KP	2011	Veniam	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20	\N	\N
19	Omar Khalid	EG	1996	Quis nostrud	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20	\N	\N
20	Isabelle Dubois	FR	2004	Exercitation	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20	\N	\N
21	Nguyen Thi Lan	VN	2006	Ullamco	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20	\N	\N
22	John Doe	AU	1990	Laboris nisi	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20	\N	\N
23	Maria Gonzalez	MX	2013	Ut aliquip	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20	\N	\N
24	Ahmed Al-Farsi	SA	2002	Ex ea	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20	\N	\N
25	Katarzyna Nowak	PL	1997	Commodo	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20	\N	\N
26	Daniel Svensson	SE	2009	Consequat	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20	\N	\N
27	Beatrice Ncube	ZW	2014	Duis aute	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20	\N	\N
28	Tariq Rahman	PK	2006	Irure dolor	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20	\N	\N
34	Test Tambah Lewat Form	ID	2020	test	1	2025-09-16 19:34:23.463261	1	2025-09-16 19:34:23.463261	\N	\N
35	Alfan	ID	2020	\N	1	2025-09-18 09:21:44.845349	1	2025-09-18 09:21:44.845349	\N	\N
36	Alfan	ID	2020		1	2025-09-18 09:26:20.469248	1	2025-09-18 09:26:20.469248	\N	\N
37	Alfan	ID	2020		1	2025-09-18 09:27:02.572175	1	2025-09-18 09:27:02.572175	\N	\N
38	Alfan	ID	2020		1	2025-09-18 09:29:56.815269	1	2025-09-18 09:29:56.815269	\N	\N
39	Test Tambah Lewat Form	ID	2020	\N	1	2025-09-18 09:32:33.116024	1	2025-09-18 09:32:33.116024	\N	\N
41	Test Isi nama lengkap saja	ID	2022	test input tentang	1	2025-09-18 09:40:12.577218	1	2025-09-18 09:40:12.577218	\N	\N
44	Test 11	ID	2025	test  saja	1	2025-09-18 14:17:16.073884	1	2025-09-18 14:17:16.073884	\N	\N
45	Test lagi aja	ID	2025	1 2 3 4 5	1	2025-09-18 14:31:30.820119	1	2025-09-18 14:31:30.820119	\N	\N
46	test	ID	2022	TESt	1	2025-09-18 14:42:58.166598	1	2025-09-18 14:42:58.166598	\N	\N
48	Alfan Wahyudi	ID	2025	test aja bang	1	2025-09-18 14:46:29.19822	1	2025-09-18 14:46:29.19822	\N	\N
51	Tambah aja bang	ID	2025	test tambah aja	1	2025-09-18 14:53:15.405305	1	2025-09-18 14:53:15.405305	\N	\N
52	Test tambah lagi Update	ID	2022	test aja update	1	2025-09-18 14:54:16.384734	1	2026-01-25 06:28:11.765478	\N	\N
42	test	ID	2022	test	1	2025-09-18 13:58:24.12775	1	2025-09-18 13:58:24.12775	\N	\N
50	Killua update	ID	2020	test update killua	1	2025-09-18 14:49:49.884172	1	2026-02-02 13:02:41.976099	\N	\N
55	Alfan	ID	2004		1	2025-09-22 14:35:42.210468	1	2025-10-31 21:16:48.368042	1	2025-11-03 14:52:34.374339
123	Test Update Author	BR	2020	tidak ada	1	2026-01-23 11:01:53.580566	1	2026-01-25 06:27:29.406173	\N	\N
125	test tambah 20 Update	BR	2015		1	2026-02-02 13:03:24.501097	1	2026-02-02 13:29:36.777091	\N	\N
65	Alfan	AL	2020	Test aja	1	2025-09-22 15:17:25.55784	1	2025-09-22 15:17:25.55784	1	2025-09-24 17:01:42.13083
64	Test coba aja	AX	2021	tesdf	1	2025-09-22 15:16:42.211649	1	2025-09-22 15:16:42.211649	1	2025-10-02 20:54:50.290765
63	Test Lagi 2	ID	2021	test coba lagi yang ke 2	1	2025-09-22 15:15:55.676661	1	2025-09-22 15:15:55.676661	1	2025-11-03 15:55:33.970941
61	Alfan	BB	2020	tentang	1	2025-09-22 14:50:39.457173	1	2025-09-22 14:50:39.457173	1	2025-11-03 15:57:13.532991
59	Alfan	ID	2029	\N	1	2025-09-22 14:36:49.610581	1	2025-09-22 14:36:49.610581	1	2025-11-03 15:57:32.9212
58	Alfan	ID	2025	\N	1	2025-09-22 14:36:47.038679	1	2025-09-22 14:36:47.038679	1	2025-11-03 15:57:41.220954
69	Alfan	AF	\N	\N	1	2025-09-22 15:26:06.656079	1	2025-09-22 15:26:06.656079	1	2025-11-03 19:49:48.158929
60	Test	ID	2020	this is about yay	1	2025-09-22 14:41:10.287741	1	2025-09-22 14:41:10.287741	1	2025-11-03 21:04:27.522053
67	Alfan	AF	\N	\N	1	2025-09-22 15:26:05.126115	1	2025-09-22 15:26:05.126115	1	2025-11-03 21:04:51.48593
33	Nama Pengarang	PL	\N	\N	1	2025-09-12 15:03:52.912701	1	2025-09-12 15:03:52.912701	1	2025-11-03 21:13:27.628389
47	Test lagi aja	ID	2025	test aja bang	1	2025-09-18 14:43:29.552207	1	2025-09-18 14:43:29.552207	1	2025-11-03 21:19:12.103021
31	test tambah data pengarang	FR	2020	tentang aja	1	2025-09-12 14:38:55.036591	1	2025-09-12 14:38:55.036591	1	2025-11-03 21:20:06.643176
66	Alfan Update	AU	2025	test update saja	1	2025-09-22 15:26:00.86741	1	2025-11-03 21:25:11.418067	1	2026-01-23 07:40:00.916318
57	Alfan	ID	2022	\N	1	2025-09-22 14:36:43.400319	1	2025-09-22 14:36:43.400319	1	2026-01-23 07:40:32.27806
56	test	ID	\N	\N	1	2025-09-22 14:36:31.25874	1	2025-09-22 14:36:31.25874	1	2026-01-23 07:40:49.162914
54	dsadad	ID	\N	\N	1	2025-09-22 14:20:02.823764	1	2025-09-22 14:20:02.823764	1	2026-01-23 07:47:15.186141
40	test lagi	ID	2020	tentang	1	2025-09-18 09:35:39.254944	1	2025-09-18 09:35:39.254944	1	2026-01-29 20:25:27.256507
49	Alfan	ID	2025	test aja coba dulu	1	2025-09-18 14:48:09.655395	1	2025-09-18 14:48:09.655395	1	2026-01-29 20:48:37.362818
96	Alfan Wahyudi	BT	2020	test tambah data aja	1	2025-09-22 16:55:59.729246	1	2025-09-22 16:55:59.729246	1	2025-09-24 15:02:21.280877
93	Alfan	AF	2022	test	1	2025-09-22 15:27:51.898118	1	2025-09-22 15:27:51.898118	1	2025-09-24 16:53:26.26293
107	Update Lewat Form	DE	2023	Updating Author data dari Form ya	1	2025-09-23 12:08:54.88438	1	2025-09-23 20:45:20.550458	1	2025-09-24 09:01:28.465426
98	Test Tambah Lewat Form	DZ	2025	test	1	2025-09-23 08:57:06.629522	1	2025-09-23 08:57:06.629522	1	2025-09-24 09:02:12.856157
62	Test Buat Component Baru	AW	2020	Test dengan membuat komponen terpisah untuk form nya	1	2025-09-22 15:15:07.645041	1	2025-09-22 15:15:07.645041	1	2025-09-24 16:54:01.970683
102	Test Tambah data baru	CG	2020	test aja	1	2025-09-23 11:57:10.109499	1	2025-09-23 11:57:10.109499	1	2025-09-24 09:25:52.737024
100	Test tambah data lagi	SV	2025	Test aja	1	2025-09-23 11:05:33.306958	1	2025-09-23 11:05:33.306958	1	2025-09-24 09:29:18.5447
99	Alfan Wahyudi	ID	\N	\N	1	2025-09-23 09:01:49.05818	1	2025-09-23 11:45:48.125766	1	2025-09-24 09:29:38.564011
101	Alfan Wahyudi	ID	2025	Test update data lewat form	1	2025-09-23 11:54:11.759932	1	2025-09-23 11:54:11.759932	1	2025-09-24 09:29:46.646394
95	Alfan	AX	2020	test	1	2025-09-22 15:28:25.271855	1	2025-09-22 15:28:25.271855	1	2025-10-02 20:54:29.981487
108	Test Update	HT	2025	test Update data aja	1	2025-09-23 18:37:50.906656	1	2025-09-24 11:09:05.761692	1	2025-09-24 11:11:49.114987
104	Alfan Wahyudi	ID	2025		1	2025-09-23 11:58:00.194382	1	2025-09-23 11:58:00.194382	1	2025-09-24 11:44:56.274962
105	Alfan Wahyudi Update	ID	2020	Update pengarang lewat Form	1	2025-09-23 11:59:17.291816	1	2025-09-23 11:59:17.291816	1	2025-09-24 11:45:19.609091
103	Alfan Wahyudi	ID	2025		1	2025-09-23 11:57:42.028514	1	2025-09-23 11:57:42.028514	1	2025-09-24 11:51:32.721995
106	Alfan Wahyudi	ID	\N		1	2025-09-23 12:02:35.846445	1	2025-09-23 12:02:35.846445	1	2025-09-24 11:52:04.226203
97	Justin	CU	2025	tidak ada	1	2025-09-23 08:55:54.935392	1	2025-09-23 08:55:54.935392	1	2025-09-24 14:16:20.13339
94	Alfan Update Lagi	AF	2022	test	1	2025-09-22 15:28:12.929936	1	2025-10-02 20:55:22.451415	1	2025-10-02 20:55:31.686256
109	Test	AL	2020	test aja	1	2025-10-10 11:17:14.294559	1	2025-10-10 11:17:14.294559	1	2025-10-10 11:17:26.986732
92	Alfan	AF	2022	test	1	2025-09-22 15:27:51.401689	1	2025-09-22 15:27:51.401689	1	2025-10-10 11:17:47.569505
83	Alfan	AF	\N	\N	1	2025-09-22 15:26:44.850879	1	2025-09-22 15:26:44.850879	1	2025-10-10 11:17:57.113727
91	Alfan	AF	2022	test	1	2025-09-22 15:27:50.783626	1	2025-09-22 15:27:50.783626	1	2025-10-10 11:20:51.828842
90	Alfan	AF	2022	test	1	2025-09-22 15:27:50.225924	1	2025-09-22 15:27:50.225924	1	2025-10-10 11:21:10.476249
89	Alfan Update	AF	2022	test Update	1	2025-09-22 15:27:49.51674	1	2025-10-10 11:22:45.168745	1	2025-10-10 11:22:54.371517
88	Alfan	AF	2022	test	1	2025-09-22 15:27:48.449267	1	2025-09-22 15:27:48.449267	1	2025-10-10 11:23:56.46567
87	Alfan	AF	2022	test	1	2025-09-22 15:27:46.550974	1	2025-09-22 15:27:46.550974	1	2025-10-10 11:24:28.733512
86	Alfan	AF	2022	test	1	2025-09-22 15:27:41.132712	1	2025-09-22 15:27:41.132712	1	2025-10-10 11:25:04.904885
85	Alfan	AF	2022	test	1	2025-09-22 15:27:39.892753	1	2025-09-22 15:27:39.892753	1	2025-10-10 11:25:15.338343
84	Alfan	AF	2022	test	1	2025-09-22 15:27:36.998949	1	2025-09-22 15:27:36.998949	1	2025-10-10 11:25:36.932708
82	Alfan	AF	\N	\N	1	2025-09-22 15:26:43.219971	1	2025-09-22 15:26:43.219971	1	2025-10-10 11:25:46.226468
81	Alfan	AF	\N	\N	1	2025-09-22 15:26:25.725384	1	2025-09-22 15:26:25.725384	1	2025-10-10 11:27:33.405962
111	Alfan Wah	HT	2020	Tes t	1	2025-10-11 06:27:37.450706	1	2025-10-11 06:27:37.450706	1	2025-10-15 12:00:43.32019
110	Test tambah data lagi	BJ	2025	test test s t etest	1	2025-10-11 06:26:59.968536	1	2025-10-11 06:26:59.968536	1	2025-10-15 12:00:49.631483
80	Alfan	AF	\N	\N	1	2025-09-22 15:26:25.104236	1	2025-09-22 15:26:25.104236	1	2025-10-15 12:00:54.519269
79	Alfan	AF	\N	\N	1	2025-09-22 15:26:24.550237	1	2025-09-22 15:26:24.550237	1	2025-10-15 12:00:59.001916
78	Alfan	AF	\N	\N	1	2025-09-22 15:26:23.770292	1	2025-09-22 15:26:23.770292	1	2025-10-15 12:01:03.928541
73	Alfan	AF	\N	\N	1	2025-09-22 15:26:09.564126	1	2025-09-22 15:26:09.564126	1	2025-11-03 15:38:18.914041
112	Test Update Nama	AF	2021	test update tentang	1	2025-10-15 12:06:33.68297	1	2025-10-15 12:06:54.408321	1	2025-10-15 12:07:00.680521
114	Test tambah dua	BJ	2025	test saj abang	1	2025-11-03 14:17:23.488029	1	2025-11-03 14:17:23.488029	1	2025-11-03 14:18:54.600282
115	Test tambah data lagi	AF	2020		1	2025-11-03 14:40:05.55363	1	2025-11-03 14:40:05.55363	1	2025-11-03 14:40:20.879992
116	test reload page setelah berhasil tambah	AO	2022	test aja	1	2025-11-03 14:44:58.879598	1	2025-11-03 14:44:58.879598	1	2025-11-03 14:52:08.417365
77	Alfan	AF	2020	tidak ada	1	2025-09-22 15:26:21.477796	1	2025-10-15 12:01:27.411646	1	2025-11-03 14:52:48.9168
117	Test ke 4	AD	2020	Test refresh table setelah berhasil tambah data pengarang	1	2025-11-03 15:36:31.615851	1	2025-11-03 15:36:31.615851	1	2025-11-03 15:37:33.824593
76	Alfan	AF	\N	\N	1	2025-09-22 15:26:11.271474	1	2025-09-22 15:26:11.271474	1	2025-11-03 15:38:10.892331
113	test tambah data dan Update nya	AS	2025	lorem ipsum hanya test saja update data saja	1	2025-11-03 14:14:38.47216	1	2025-11-03 14:18:19.653955	1	2025-11-03 15:47:06.897978
75	Alfan	AF	\N	\N	1	2025-09-22 15:26:10.654642	1	2025-09-22 15:26:10.654642	1	2025-11-03 15:48:58.332489
74	Alfan	AF	\N	\N	1	2025-09-22 15:26:10.099566	1	2025-09-22 15:26:10.099566	1	2025-11-03 15:49:45.944806
70	Alfan	AF	\N	\N	1	2025-09-22 15:26:07.836955	1	2025-09-22 15:26:07.836955	1	2025-11-03 15:51:45.350095
72	Alfan	AF	\N	\N	1	2025-09-22 15:26:08.975123	1	2025-09-22 15:26:08.975123	1	2025-11-03 15:52:21.439811
53	Test lagi lagi	ID	2023	test aja lah biar gg	1	2025-09-18 14:58:09.37798	1	2025-09-18 14:58:09.37798	1	2026-01-23 07:53:58.617786
122	Test Update Aja	BS	\N		1	2025-12-23 14:15:35.363945	1	2025-12-23 14:18:07.902732	1	2025-12-23 14:29:42.683695
120	Budi Santoso Update	ID	2005	coba Update data budi santoso	1	2025-12-22 09:17:39.771998	1	2025-12-23 09:34:29.462706	1	2025-12-23 14:29:59.393463
124	Test Tambah 5  Update 1	AL	2001	Test tambah 5 update 1	1	2026-01-25 06:28:35.531004	1	2026-01-25 06:33:25.67869	1	2026-01-29 20:47:39.860755
\.


--
-- Data for Name: book_authors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.book_authors (author_id, book_id, created_by, created_at) FROM stdin;
50	28	1	2026-03-30 10:25:00.263776
25	28	1	2026-03-30 10:25:00.263776
1	1	1	2025-06-01 08:05:20
2	2	1	2025-06-01 08:05:20
3	3	1	2025-06-01 08:05:20
3	1	1	2025-06-01 08:05:20
3	2	1	2025-06-01 08:05:20
5	9	1	2026-02-04 14:13:27.502223
6	13	1	2026-02-04 14:18:50.828273
7	15	1	2026-02-04 14:20:01.490018
7	17	1	2026-02-04 14:23:10.496728
8	17	1	2026-02-04 14:23:10.496728
9	26	1	2026-02-04 14:50:14.632366
9	27	1	2026-02-04 14:55:23.947112
\.


--
-- Data for Name: book_loans; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.book_loans (id, member_id, book_id, start_date, end_date, finished_date, created_by, created_at, updated_by, updated_at) FROM stdin;
50	10	27	2026-04-20 13:26:40.050182	2026-04-27 23:59:59.999	2026-04-20 15:13:53.588851	1	2026-04-20 13:26:40.050182	1	2026-04-20 15:13:53.588851
51	10	28	2026-04-20 13:26:40.050182	2026-04-27 23:59:59.999	2026-04-20 15:23:25.77941	1	2026-04-20 13:26:40.050182	1	2026-04-20 15:23:25.77941
56	16	15	2026-04-20 15:24:31.233865	2026-04-27 23:59:59.999	2026-04-21 17:10:05.397035	1	2026-04-20 15:24:31.233865	1	2026-04-21 17:10:05.397035
55	5	1	2026-04-20 13:28:43.551475	2026-04-27 23:59:59.999	2026-04-21 17:12:36.306951	1	2026-04-20 13:28:43.551475	1	2026-04-21 17:12:36.306951
54	14	9	2026-04-20 13:28:02.106248	2026-04-27 23:59:59.999	2026-04-21 17:13:07.336407	1	2026-04-20 13:28:02.106248	1	2026-04-21 17:13:07.336407
53	14	13	2026-04-20 13:28:02.106248	2026-04-27 23:59:59.999	2026-04-21 17:14:22.767407	1	2026-04-20 13:28:02.106248	1	2026-04-21 17:14:22.767407
52	12	2	2026-04-20 13:27:32.186761	2026-04-27 23:59:59.999	2026-04-21 17:22:27.153946	1	2026-04-20 13:27:32.186761	1	2026-04-21 17:22:27.153946
57	4	3	2026-05-18 14:19:49.238052	2026-05-25 23:59:59.999	2026-05-21 20:54:34.922463	1	2026-05-18 14:19:49.238052	1	2026-05-21 20:54:34.922463
58	12	17	2026-05-21 20:55:40.8352	2026-05-28 23:59:59.999	2026-05-21 20:55:45.461819	1	2026-05-21 20:55:40.8352	1	2026-05-21 20:55:45.461819
5	5	2	2025-06-13 11:30:01	2025-06-20 23:59:59	2025-06-20 09:00:00	2	2025-06-13 11:30:01	1	2025-06-20 09:00:00
4	4	1	2025-06-07 15:50:01	2025-06-14 23:59:59	2025-06-14 23:59:59	3	2025-06-07 15:50:01	1	2025-06-14 23:59:59
3	3	3	2025-06-06 15:50:01	2025-06-13 23:59:59	2025-06-13 09:10:13	3	2025-06-06 15:50:01	3	2025-06-13 09:10:13
1	1	1	2025-06-06 15:50:01	2025-06-13 23:59:59	2025-06-13 11:00:00	2	2025-06-06 15:50:01	2	2025-06-13 11:00:00
2	2	2	2025-06-06 15:50:01	2025-06-13 23:59:59	2025-06-13 15:21:33	2	2025-06-06 15:50:01	2	2025-06-13 15:21:33
39	7	1	2026-03-30 16:51:40.166827	2026-04-06 23:59:59.999	2026-04-05 09:10:13	1	2026-03-30 16:51:40.166827	1	2026-04-05 09:10:13
40	7	2	2026-03-30 16:57:36.2932	2026-04-06 23:59:59.999	2026-04-06 09:16:13	1	2026-03-30 16:57:36.2932	1	2026-04-06 09:16:13
41	7	13	2026-03-30 16:57:36.2932	2026-04-06 23:59:59.999	2026-04-06 10:00:13	1	2026-03-30 16:57:36.2932	1	2026-04-06 10:00:13
43	19	3	2026-03-30 16:58:15.25984	2026-04-06 23:59:59.999	2026-04-05 10:00:13	1	2026-03-30 16:58:15.25984	1	2026-04-05 10:00:13
44	19	28	2026-03-30 16:58:40.119734	2026-04-06 23:59:59.999	2026-04-06 09:00:13	1	2026-03-30 16:58:40.119734	1	2026-04-06 09:00:13
45	14	16	2026-03-30 16:59:06.204603	2026-04-06 23:59:59.999	2026-04-06 09:20:13	1	2026-03-30 16:59:06.204603	1	2026-04-06 09:20:13
46	6	15	2026-03-30 17:00:50.909408	2026-04-06 23:59:59.999	2026-04-06 13:25:13	1	2026-03-30 17:00:50.909408	1	2026-04-06 13:25:13
48	6	26	2026-03-30 17:00:50.909408	2026-04-06 23:59:59.999	2026-04-06 14:00:13	1	2026-03-30 17:00:50.909408	1	2026-04-06 14:00:13
49	19	27	2026-03-30 17:12:07.56247	2026-04-06 23:59:59.999	2026-04-06 15:00:13	1	2026-03-30 17:12:07.56247	1	2026-04-06 15:00:13
\.


--
-- Data for Name: books; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.books (id, isbn, title, sub_title, publisher, publication_date, page, language, edition, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) FROM stdin;
3	9786020656151	Esensialisme	Pentingkan yang penting saja	Gramedia Pustaka Utama	2022-02-16	354	Indonesia	1	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20	\N	\N
9	111444111444	Book Title	Book Sub Title	Publisher	2000-05-12	50	Indonesia	1	1	2026-02-04 14:13:27.502223	1	2026-02-04 14:13:27.502223	\N	\N
13	2224445555	Test Lewat Postman 2	\N	\N	2000-05-20	\N	\N	\N	1	2026-02-04 14:18:50.828273	1	2026-02-04 14:18:50.828273	\N	\N
15	1111444455	Test Lewat Postman 3	\N	\N	2000-06-10	\N	\N	\N	1	2026-02-04 14:20:01.490018	1	2026-02-04 14:20:01.490018	\N	\N
16	333335555511111	Test Lewat Postman 4	Book Sub Title 4	test publisher 4	2000-07-10	26	Inggris	1	1	2026-02-04 14:20:46.572174	1	2026-02-04 14:20:46.572174	\N	\N
17	111166667777	Test Lewat Postman 5	Book Sub Title 5	test publisher 5	2000-07-24	78	Inggris	1	1	2026-02-04 14:23:10.496728	1	2026-02-04 14:23:10.496728	\N	\N
26	333333	Test Lewat Postman 6	Book Sub Title 6	test publisher 6	2000-07-21	100	Inggris	\N	1	2026-02-04 14:50:14.632366	1	2026-02-04 14:50:14.632366	\N	\N
1	9786231648303	Arsitektur Rumah Jawa	Mengungkap Filosofi Makna dan Simbologinya	Anak Hebat Indonesia	2024-06-18	230	Indonesia	1	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20	\N	\N
2	9786237661535	Buku Praktis Belajar Bahasa Inggris	Cara mudah dan singkat kuasai bahasa inggris	Checklist	2014-06-20	312	Indonesia	6	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20	\N	\N
27	9990001111	Test Lewat Postman 7	Book Sub Title 7	test publisher 7	2000-07-01	100	Indonesia	2	1	2026-02-04 14:55:23.947112	1	2026-02-04 14:55:23.947112	\N	\N
31	111444123123	Test tambah lewat form	test tambah lewat form	test penerbit	2026-02-11	200	Indonesia	1	1	2026-02-10 15:51:16.919942	1	2026-02-16 14:50:21.094704	1	2026-02-18 14:24:57.63225
30	4444555511	Test Lewat Postman 9 Update dari Form	Book Sub Title 9 Update	test publisher 9 Update	2000-10-12	3044	Indonesia Update	123	1	2026-02-05 17:11:07.33951	1	2026-02-10 15:58:58.339282	1	2026-02-18 14:25:15.094255
28	111144422244	Test Lewat Postman 8	Book Sub Title 8	test publisher 8	2000-08-12	100	Inggris	2	1	2026-02-05 17:08:30.131731	1	2026-03-30 10:25:00.263776	\N	\N
\.


--
-- Data for Name: countries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.countries (code, name) FROM stdin;
AF	Afghanistan
AX	Åland Islands
AL	Albania
DZ	Algeria
AS	American Samoa
AD	Andorra
AO	Angola
AI	Anguilla
AQ	Antarctica
AG	Antigua and Barbuda
AR	Argentina
AM	Armenia
AW	Aruba
AU	Australia
AT	Austria
AZ	Azerbaijan
BS	Bahamas
BH	Bahrain
BD	Bangladesh
BB	Barbados
BY	Belarus
BE	Belgium
BZ	Belize
BJ	Benin
BM	Bermuda
BT	Bhutan
BO	Bolivia (Plurinational State of)
BQ	Bonaire, Sint Eustatius and Saba
BA	Bosnia and Herzegovina
BW	Botswana
BV	Bouvet Island
BR	Brazil
IO	British Indian Ocean Territory
BN	Brunei Darussalam
BG	Bulgaria
BF	Burkina Faso
BI	Burundi
CV	Cabo Verde
KH	Cambodia
CM	Cameroon
CA	Canada
KY	Cayman Islands
CF	Central African Republic
TD	Chad
CL	Chile
CN	China
CX	Christmas Island
CC	Cocos (Keeling) Islands
CO	Colombia
KM	Comoros
CG	Congo
CD	Congo (Democratic Republic of the)
CK	Cook Islands
CR	Costa Rica
CI	Côte d'Ivoire
HR	Croatia
CU	Cuba
CW	Curaçao
CY	Cyprus
CZ	Czechia
DK	Denmark
DJ	Djibouti
DM	Dominica
DO	Dominican Republic
EC	Ecuador
EG	Egypt
SV	El Salvador
GQ	Equatorial Guinea
ER	Eritrea
EE	Estonia
SZ	Eswatini
ET	Ethiopia
FK	Falkland Islands (Malvinas)
FO	Faroe Islands
FJ	Fiji
FI	Finland
FR	France
GF	French Guiana
PF	French Polynesia
TF	French Southern Territories
GA	Gabon
GM	Gambia
GE	Georgia
DE	Germany
GH	Ghana
GI	Gibraltar
GR	Greece
GL	Greenland
GD	Grenada
GP	Guadeloupe
GU	Guam
GT	Guatemala
GG	Guernsey
GN	Guinea
GW	Guinea-Bissau
GY	Guyana
HT	Haiti
HM	Heard Island and McDonald Islands
VA	Holy See
HN	Honduras
HK	Hong Kong
HU	Hungary
IS	Iceland
IN	India
ID	Indonesia
IR	Iran (Islamic Republic of)
IQ	Iraq
IE	Ireland
IM	Isle of Man
IL	Israel
IT	Italy
JM	Jamaica
JP	Japan
JE	Jersey
JO	Jordan
KZ	Kazakhstan
KE	Kenya
KI	Kiribati
KP	Korea (Democratic People's Republic of)
KR	Korea, Republic of
KW	Kuwait
KG	Kyrgyzstan
LA	Lao People's Democratic Republic
LV	Latvia
LB	Lebanon
LS	Lesotho
LR	Liberia
LY	Libya
LI	Liechtenstein
LT	Lithuania
LU	Luxembourg
MO	Macao
MG	Madagascar
MW	Malawi
MY	Malaysia
MV	Maldives
ML	Mali
MT	Malta
MH	Marshall Islands
MQ	Martinique
MR	Mauritania
MU	Mauritius
YT	Mayotte
MX	Mexico
FM	Micronesia (Federated States of)
MD	Moldova (Republic of)
MC	Monaco
MN	Mongolia
ME	Montenegro
MS	Montserrat
MA	Morocco
MZ	Mozambique
MM	Myanmar
NA	Namibia
NR	Nauru
NP	Nepal
NL	Netherlands
NC	New Caledonia
NZ	New Zealand
NI	Nicaragua
NE	Niger
NG	Nigeria
NU	Niue
NF	Norfolk Island
MK	North Macedonia
MP	Northern Mariana Islands
NO	Norway
OM	Oman
PK	Pakistan
PW	Palau
PS	Palestine, State of
PA	Panama
PG	Papua New Guinea
PY	Paraguay
PE	Peru
PH	Philippines
PN	Pitcairn
PL	Poland
PT	Portugal
PR	Puerto Rico
QA	Qatar
RE	Réunion
RO	Romania
RU	Russian Federation
RW	Rwanda
BL	Saint Barthélemy
SH	Saint Helena, Ascension and Tristan da Cunha
KN	Saint Kitts and Nevis
LC	Saint Lucia
MF	Saint Martin (French part)
PM	Saint Pierre and Miquelon
VC	Saint Vincent and the Grenadines
WS	Samoa
SM	San Marino
ST	Sao Tome and Principe
SA	Saudi Arabia
SN	Senegal
RS	Serbia
SC	Seychelles
SL	Sierra Leone
SG	Singapore
SX	Sint Maarten (Dutch part)
SK	Slovakia
SI	Slovenia
SB	Solomon Islands
SO	Somalia
ZA	South Africa
GS	South Georgia and the South Sandwich Islands
SS	South Sudan
ES	Spain
LK	Sri Lanka
SD	Sudan
SR	Suriname
SJ	Svalbard and Jan Mayen
SE	Sweden
CH	Switzerland
SY	Syrian Arab Republic
TW	Taiwan, Province of China
TJ	Tajikistan
TZ	Tanzania, United Republic of
TH	Thailand
TL	Timor-Leste
TG	Togo
TK	Tokelau
TO	Tonga
TT	Trinidad and Tobago
TN	Tunisia
TR	Türkiye
TM	Turkmenistan
TC	Turks and Caicos Islands
TV	Tuvalu
UG	Uganda
UA	Ukraine
AE	United Arab Emirates
GB	United Kingdom of Great Britain and Northern Ireland
US	United States of America
UM	United States Minor Outlying Islands
UY	Uruguay
UZ	Uzbekistan
VU	Vanuatu
VE	Venezuela (Bolivarian Republic of)
VN	Viet Nam
VG	Virgin Islands (British)
VI	Virgin Islands (U.S.)
WF	Wallis and Futuna
EH	Western Sahara
YE	Yemen
ZM	Zambia
ZW	Zimbabwe
\.


--
-- Data for Name: members; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.members (id, full_name, email, phone, address, birth_date, gender, created_by, created_at, updated_by, updated_at) FROM stdin;
1	Siti Nurhaliza	siti@gmail.com	081234567890	Bandung	1995-04-12	f	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
2	Arif Prasetyo	arif@gmail.com	082133445566	Bandung	1999-03-20	m	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
3	Dewi Lestari	dewi@gmail.com	087722119988	Bandung	2000-01-01	f	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
4	Budi Santoso	budi@gmail.com	081322223333	Bandung	1997-05-25	m	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
5	Nina Kartini	nina@gmail.com	085688990011	Bandung	1998-09-10	f	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
6	Rizky Andika	rizky@gmail.com	082244112299	Bandung	2000-05-27	m	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
7	Melati Ayu	melati@gmail.com	088855556666	Bandung	2000-08-24	f	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
8	Hendra Wirawan	hendra@gmail.com	081211117777	Bandung	1995-02-10	m	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
9	Putri Maharani	putri@gmail.com	086533558822	Bandung	1995-03-22	f	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
10	Yoga Pranata	yoga@gmail.com	083877778888	Bandung	1996-09-19	m	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
11	member1	member1@gmail.com	084523419314	jalan bandung selatan	2000-05-20	f	1	2025-12-19 17:04:07.235244	1	2025-12-19 17:04:07.235244
12	Member 2 Update	member2_update@gmail.com	085284241920	jalan update bandung selatan	2000-05-22	f	1	2025-12-19 17:31:45.887002	1	2025-12-19 20:20:50.012908
13	Test Member Dari Form	test_member_dari_form@gmail.com	085214215215	Sukabumi	2000-12-01	m	1	2025-12-20 10:00:07.22333	1	2025-12-20 10:00:07.22333
14	Tiara Ayu	tiara@gmail.com	082222222299	Jalan Bandung Telah Berhasil di Update	2000-12-10	f	1	2025-12-20 10:09:14.959838	1	2025-12-20 13:09:04.179442
15	Rian Hermawan	rian@gmail.com	081111122222	Jakarta	2006-02-15	m	1	2025-12-20 13:47:56.331958	1	2025-12-20 13:47:56.331958
18	John Ryan	john@gmail.com	081111155555	Bekasi	1991-03-05	m	1	2025-12-23 07:54:15.810248	1	2025-12-23 09:11:30.232011
16	Lina Dewi	lina@gmail.com	085555555333	Jakarta	2005-06-05	f	1	2025-12-20 13:48:58.122055	1	2025-12-23 09:16:33.410728
19	Rahmat	rahmat@gmail.com	085555599999	Jakarta	1980-02-04	m	1	2025-12-23 15:04:29.862527	1	2025-12-23 15:08:31.215531
20	Test Update 2 Lagi	test1updatelagi@gmail.com	082222211111	Bandung	2025-12-10	m	1	2025-12-23 15:08:57.868559	1	2026-01-23 14:29:38.003251
21	Test Tambah 10 update	test10update@gmail.com	087782141251	Jalan Jakarta Update	2000-01-31	m	1	2026-01-23 14:30:23.898099	1	2026-02-02 12:57:37.549682
23	Test tambah 11	test11@gmail.com	0899913415114	Bandung	1997-02-10	m	1	2026-02-02 12:58:34.196109	1	2026-02-02 12:58:34.196109
22	Test Update 9 Lagi	test9update@gmail.com	089993333312	Tangerang	1995-05-15	m	1	2026-01-23 15:18:47.685092	1	2026-03-03 09:39:53.054855
\.


--
-- Data for Name: permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.permissions (id, name, description) FROM stdin;
1	create_member	Can create members
2	update_member	Can update members
3	delete_member	Can delete members
4	view_member	Can view members
5	create_book	Can create books
6	update_book	Can update books
7	delete_book	Can delete books
8	view_book	Can view books
9	create_book_reservation	Can create book reservations
10	update_book_reservation	Can update book reservations
11	delete_book_reservation	Can delete book reservations
12	view_book_reservation	Can view book reservations
13	create_book_loan	Can create book loans
14	update_book_loan	Can update book loans
15	delete_book_loan	Can delete book loans
16	view_book_loan	Can view book loans
17	create_book_image	Can create book images
18	update_book_image	Can update book images
19	delete_book_image	Can delete book images
20	view_book_image	Can view book images
21	create_author	Can create authors
22	update_author	Can update authors
23	delete_author	Can delete authors
24	view_author	Can view authors
25	create_violation	Can create violations
26	update_violation	Can update violations
27	delete_violation	Can delete violations
28	view_violation	Can view violations
29	create_sanction	Can create sanctions
30	update_sanction	Can update sanctions
31	delete_sanction	Can delete sanctions
32	view_sanction	Can view sanctions
33	create_loan_violation	Can create loan violations
34	update_loan_violation	Can update loan violations
35	delete_loan_violation	Can delete loan violations
36	view_loan_violation	Can view loan violations
37	download_book_reservation	Can download book reservations
38	download_book_loan	Can download book loans
39	download_loan_violation	Can download loan violations
40	create_permission	Can create permissions
41	view_permission	Can view permissions
42	create_role_permission	Can create role permissions
43	update_role_permission	Can update role permissions
44	delete_role_permission	Can delete role permissions
45	view_role_permission	Can view role permissions
46	create_user_role	Can create user roles
47	update_user_role	Can update user roles
48	delete_user_role	Can delete user roles
49	view_user_role	Can view user roles
50	create_role	Can create roles
51	update_role	Can update roles
52	delete_role	Can delete roles
53	view_role	Can view roles
\.


--
-- Data for Name: role_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) FROM stdin;
1	1	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
1	2	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
1	3	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
1	4	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
1	5	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
1	6	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
1	7	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
1	8	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
1	9	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
1	10	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
1	11	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
1	12	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
1	13	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
1	14	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
1	15	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
1	16	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
1	17	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
1	18	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
1	19	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
1	20	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
1	21	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
1	22	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
1	23	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
1	24	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
1	25	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
1	26	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
1	27	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
1	28	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
1	29	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
1	30	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
1	31	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
1	32	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
1	33	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
1	34	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
1	35	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
1	36	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
1	37	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
1	38	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
1	39	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
1	40	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
1	41	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
1	42	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
1	43	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
1	44	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
1	45	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
1	46	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
1	47	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
1	48	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
1	49	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
1	50	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
1	51	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
1	52	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
1	53	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
2	1	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
2	2	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
2	3	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
2	4	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
2	5	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
2	6	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
2	7	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
2	8	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
2	9	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
2	10	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
2	11	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
2	12	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
2	13	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
2	14	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
2	15	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
2	16	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
2	17	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
2	18	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
2	19	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
2	20	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
2	21	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
2	22	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
2	23	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
2	24	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
2	25	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
2	26	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
2	27	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
2	28	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
2	29	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
2	30	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
2	31	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
2	32	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
2	33	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
2	34	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
2	35	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
2	36	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
2	37	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
2	38	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
2	39	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
3	4	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
3	8	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
3	12	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
3	16	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
3	20	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
3	24	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
3	28	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
3	32	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
3	36	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
3	41	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
3	45	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
3	49	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
3	53	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, name, created_by, created_at, updated_by, updated_at) FROM stdin;
1	Super Admin	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
2	Pustakawan	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
3	Viewer	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
\.


--
-- Data for Name: user_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_roles (user_id, role_id, created_by, created_at, updated_by, updated_at) FROM stdin;
1	1	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
2	2	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
3	3	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
4	3	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
5	3	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
6	3	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
7	3	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
8	3	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, email, password, full_name, address, gender, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) FROM stdin;
3	pustakawan2	pustakawan2@gmail.com	$2b$10$PNjl/rWLE8aTObKqeufbTujfFDxuxD6Bhku5.2l0MUqsoYvYxT9V6	Pustakawan 2	Jl. Melawai 5, RT.3/RW.1, Melawai, Kec. Kby. Baru, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12160	m	1	2025-06-01 08:05:20	3	2025-06-16 05:15:19	superadmin1	2025-06-17 19:42:36
4	viewer1	viewer1@gmail.com	$2b$10$PNjl/rWLE8aTObKqeufbTujfFDxuxD6Bhku5.2l0MUqsoYvYxT9V6	Viewer 1	Jl. Pintu Satu Senayan, Gelora, Kecamatan Tanah Abang, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10270	m	1	2025-06-01 08:05:20	4	2025-06-15 15:50:01	\N	\N
5	viewer2	viewer2@gmail.com	$2b$10$PNjl/rWLE8aTObKqeufbTujfFDxuxD6Bhku5.2l0MUqsoYvYxT9V6	Viewer 2	Jl. Pintu Satu Senayan, Gelora, Kecamatan Tanah Abang, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10270	f	1	2025-06-01 08:05:20	5	2025-06-10 19:42:36	\N	\N
8	viewer5	viewer5@gmail.com	$2b$10$PNjl/rWLE8aTObKqeufbTujfFDxuxD6Bhku5.2l0MUqsoYvYxT9V6	Viewer 5	Jl. Pintu Satu Senayan, Gelora, Kecamatan Tanah Abang, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10270	f	1	2025-06-01 08:05:20	8	2025-06-12 15:50:01	\N	\N
2	pustakawan1	pustakawan1@gmail.com	$2b$10$PNjl/rWLE8aTObKqeufbTujfFDxuxD6Bhku5.2l0MUqsoYvYxT9V6	Pustakawan 1	Jl. Raya Halim Perdanakusuma No.1, RT.3/RW.8, Kb. Pala, Kec. Makasar, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13610	m	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20	\N	\N
6	viewer3	viewer3@gmail.com	$2b$10$PNjl/rWLE8aTObKqeufbTujfFDxuxD6Bhku5.2l0MUqsoYvYxT9V6	Viewer 3	Jl. Pintu Satu Senayan, Gelora, Kecamatan Tanah Abang, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10270	m	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20	\N	\N
7	viewer4	viewer4@gmail.com	$2b$10$PNjl/rWLE8aTObKqeufbTujfFDxuxD6Bhku5.2l0MUqsoYvYxT9V6	Viewer 4	Jl. Pintu Satu Senayan, Gelora, Kecamatan Tanah Abang, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10270	f	1	2025-06-01 08:05:20	1	2025-06-01 08:05:20	\N	\N
1	superadmin1	superadmin1@gmail.com	$2b$10$PNjl/rWLE8aTObKqeufbTujfFDxuxD6Bhku5.2l0MUqsoYvYxT9V6	Super Admin Test	Jl. Raya Halim Perdanakusuma, Halim Perdanakusuma, Kec. Makasar, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13610	m	1	2025-06-01 08:05:20	1	2026-02-02 13:17:23.002717	\N	\N
\.


--
-- Name: authors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.authors_id_seq', 125, true);


--
-- Name: book_loans_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.book_loans_id_seq', 58, true);


--
-- Name: books_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.books_id_seq', 31, true);


--
-- Name: members_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.members_id_seq', 23, true);


--
-- Name: permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.permissions_id_seq', 53, true);


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_id_seq', 3, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 8, true);


--
-- Name: authors authors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.authors
    ADD CONSTRAINT authors_pkey PRIMARY KEY (id);


--
-- Name: book_authors book_authors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.book_authors
    ADD CONSTRAINT book_authors_pkey PRIMARY KEY (author_id, book_id);


--
-- Name: book_loans book_loans_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.book_loans
    ADD CONSTRAINT book_loans_pkey PRIMARY KEY (id);


--
-- Name: books books_isbn_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_isbn_key UNIQUE (isbn);


--
-- Name: books books_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_pkey PRIMARY KEY (id);


--
-- Name: countries countries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.countries
    ADD CONSTRAINT countries_pkey PRIMARY KEY (code);


--
-- Name: members members_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.members
    ADD CONSTRAINT members_email_key UNIQUE (email);


--
-- Name: members members_phone_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.members
    ADD CONSTRAINT members_phone_key UNIQUE (phone);


--
-- Name: members members_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.members
    ADD CONSTRAINT members_pkey PRIMARY KEY (id);


--
-- Name: permissions permissions_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT permissions_name_key UNIQUE (name);


--
-- Name: permissions permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT permissions_pkey PRIMARY KEY (id);


--
-- Name: role_permissions role_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_permissions
    ADD CONSTRAINT role_permissions_pkey PRIMARY KEY (role_id, permission_id);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: user_roles user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (user_id, role_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: authors_full_name_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX authors_full_name_index ON public.authors USING btree (full_name);


--
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
-- Name: authors authors_country_code_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.authors
    ADD CONSTRAINT authors_country_code_fkey FOREIGN KEY (country_code) REFERENCES public.countries(code);


--
-- Name: book_authors book_authors_author_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.book_authors
    ADD CONSTRAINT book_authors_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.authors(id) ON DELETE CASCADE;


--
-- Name: book_authors book_authors_book_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.book_authors
    ADD CONSTRAINT book_authors_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.books(id) ON DELETE CASCADE;


--
-- Name: book_loans book_loans_book_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.book_loans
    ADD CONSTRAINT book_loans_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.books(id) ON DELETE CASCADE;


--
-- Name: book_loans book_loans_member_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.book_loans
    ADD CONSTRAINT book_loans_member_id_fkey FOREIGN KEY (member_id) REFERENCES public.members(id) ON DELETE CASCADE;


--
-- Name: role_permissions role_permissions_permission_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_permissions
    ADD CONSTRAINT role_permissions_permission_id_fkey FOREIGN KEY (permission_id) REFERENCES public.permissions(id) ON DELETE CASCADE;


--
-- Name: role_permissions role_permissions_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_permissions
    ADD CONSTRAINT role_permissions_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id) ON DELETE CASCADE;


--
-- Name: user_roles user_roles_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id) ON DELETE CASCADE;


--
-- Name: user_roles user_roles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict P7xwXVh43wPm1ClpQVlIpVlIuFN2LVdvDE8tvknYjMyeU8hwD3Na2W8kPQjSTWk

