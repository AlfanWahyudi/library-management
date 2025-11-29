import { createRouteModel } from "../models/route-model"

export const ROUTE = {
  LOGIN: createRouteModel({
    url: '/login',
    title: 'Login',
    method: 'get',
  }),
  DASHBOARD: createRouteModel({
    url: '/dashboard',
    title: 'Dashboard',
    method: 'get'
  }),
  AUTHORS: createRouteModel({
    url: '/dashboard/authors',
    title: 'Pengarang',
    method: 'get',
    path: {
    },
  }),
  BOOK_LOANS: createRouteModel({
    url: '/dashboard/book-loans',
    title: 'Peminjaman Buku',
    method: 'get',
  }),
  BOOKS: createRouteModel({
    url: '/dashboard/books',
    title: 'Buku',
    method: 'get',
  }),
  LOAN_VIOLATIONS: createRouteModel({
    url: '/dashboard/loan-violations',
    title: 'Pelanggaran Peminjaman Buku',
    method: 'get',
  }),
  MEMBERS: createRouteModel({
    url: '/dashboard/members',
    title: 'Anggota',
    method: 'get',
  }),
  USER_PROFILES: createRouteModel({
    url: '/dashboard/user-profiles',
    title: 'Profile',
    method: 'get',
  }),
  VIOLATIONS: createRouteModel({
    url: '/dashboard/violations',
    title: 'Pelanggaran',
    method: 'get',
  }),
}
