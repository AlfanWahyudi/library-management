import { createRouteModel } from "../models/route-model"

const BASE_URL_DASHBOARD = '/dashboard'

const BASE_URL_AUTHORS =  BASE_URL_DASHBOARD + '/authors'
const BASE_URL_BOOK_LOANS =  BASE_URL_DASHBOARD + '/book-loans'
const BASE_URL_BOOK_LOAN_HISTORIES =  BASE_URL_DASHBOARD + '/book-loan-histories'
const BASE_URL_BOOKS =  BASE_URL_DASHBOARD + '/books'
const BASE_URL_MEMBERS =  BASE_URL_DASHBOARD + '/members'
const BASE_URL_USER_PROFILES =  BASE_URL_DASHBOARD + '/user-profiles'

export const ROUTE = {
  LOGIN: createRouteModel({
    url: '/',
    title: 'Login',
    method: 'get',
  }),

  DASHBOARD: createRouteModel({
    url: BASE_URL_DASHBOARD,
    title: 'Dashboard',
    method: 'get'
  }),

  AUTHORS: createRouteModel({
    url: BASE_URL_AUTHORS,
    title: 'Pengarang',
    method: 'get',
  }),

  BOOK_LOANS: createRouteModel({
    url: BASE_URL_BOOK_LOANS,
    title: 'Peminjaman Buku',
    method: 'get',
  }),

  BOOK_LOANS_CREATE: createRouteModel({
    url: BASE_URL_BOOK_LOANS + '/create',
    title: 'Tambah Peminjaman Buku',
    method: 'get',
  }),

  BOOK_LOANS_COMPLETE: createRouteModel({
    url: BASE_URL_BOOK_LOANS + '/{id}/complete',
    title: 'Penyelesaian Pinjaman Buku',
    method: 'get',
  }),

  BOOK_LOAN_HISTORIES: createRouteModel({
    url: BASE_URL_BOOK_LOAN_HISTORIES,
    title: 'Riwayat Peminjaman Buku',
    method: 'get',
  }),

  BOOK_LOAN_HISTORIES_VIEW: createRouteModel({
    url: BASE_URL_BOOK_LOAN_HISTORIES + '/{id}',
    params: ['id'],
    title: 'Detail Riwayat Peminjaman Buku',
    method: 'get',
  }),

  BOOKS: createRouteModel({
    url: BASE_URL_BOOKS,
    title: 'Buku',
    method: 'get',
  }),

  BOOKS_CREATE: createRouteModel({
    url: BASE_URL_BOOKS + '/create',
    title: 'Tambah Buku',
    method: 'get',
  }),
  
  BOOKS_UPDATE: createRouteModel({
    url: BASE_URL_BOOKS + '/{id}/update',
    params: ['id'],
    title: 'Update Buku',
    method: 'get',
  }),

  BOOKS_VIEW: createRouteModel({
    url: BASE_URL_BOOKS + '/{id}',
    params: ['id'],
    title: 'Detail Buku',
    method: 'get',
  }),

  MEMBERS: createRouteModel({
    url: BASE_URL_MEMBERS,
    title: 'Anggota',
    method: 'get',
  }),
  MEMBERS_CREATE: createRouteModel({
    url: BASE_URL_MEMBERS + '/create',
    title: 'Tambah Anggota',
    method: 'get',
  }),
  MEMBERS_UPDATE: createRouteModel({
    url: BASE_URL_MEMBERS + '/{id}/update',
    params: ['id'],
    title: 'Update Anggota',
    method: 'get',
  }),
  MEMBERS_VIEW: createRouteModel({
    url: BASE_URL_MEMBERS + '/{id}',
    params: ['id'],
    title: 'Detail Anggota',
    method: 'get',
  }),

  USER_PROFILES: createRouteModel({
    url: BASE_URL_USER_PROFILES,
    title: 'Profile',
    method: 'get',
  }),
}


export const ROUTE_AUTHORIZE = {
  publics: [ROUTE.LOGIN.url],
  protected: [ROUTE.DASHBOARD.url]
}