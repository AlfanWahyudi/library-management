import { createRouteModel } from "../models/route-model"

const BASE_URL_DASHBOARD = '/dashboard'

const BASE_URL_AUTHORS =  BASE_URL_DASHBOARD + '/authors'
const BASE_URL_BOOK_LOANS =  BASE_URL_DASHBOARD + '/book-loans'
const BASE_URL_BOOKS =  BASE_URL_DASHBOARD + '/books'
const BASE_URL_LOAN_VIOLATIONS =  BASE_URL_DASHBOARD + '/loan-violations'
const BASE_URL_MEMBERS =  BASE_URL_DASHBOARD + '/members'
const BASE_URL_USER_PROFILES =  BASE_URL_DASHBOARD + '/user-profiles'
const BASE_URL_VIOLATIONS =  BASE_URL_DASHBOARD + '/violations'

export const ROUTE = {
  LOGIN: createRouteModel({
    url: '/login',
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

  BOOKS: createRouteModel({
    url: BASE_URL_BOOKS,
    title: 'Buku',
    method: 'get',
  }),

  LOAN_VIOLATIONS: createRouteModel({
    url: BASE_URL_LOAN_VIOLATIONS,
    title: 'Pelanggaran Peminjaman Buku',
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

  VIOLATIONS: createRouteModel({
    url: BASE_URL_VIOLATIONS,
    title: 'Pelanggaran',
    method: 'get',
  }),
}
