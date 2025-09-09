import { createRouteModel } from "../models/route-model"

const routeConst = {
  login: createRouteModel({
    url: '/login',
    title: 'Login',
    method: 'get',
  }),
  dashboard: createRouteModel({
    url: '/dashboard',
    title: 'Dashboard',
    method: 'get'
  }),
  authors: createRouteModel({
    url: '/dashboard/authors',
    title: 'Pengarang',
    method: 'get',
    path: {
    },
  }),
  bookLoans: createRouteModel({
    url: '/dashboard/book-loans',
    title: 'Peminjaman Buku',
    method: 'get',
  }),
  bookReservations: createRouteModel({
    url: '/dashboard/book-reservations',
    title: 'Reservasi Buku',
    method: 'get',
  }),
  books: createRouteModel({
    url: '/dashboard/books',
    title: 'Buku',
    method: 'get',
  }),
  loanViolations: createRouteModel({
    url: '/dashboard/loan-violations',
    title: 'Pelanggaran Peminjaman Buku',
    method: 'get',
  }),
  members: createRouteModel({
    url: '/dashboard/members',
    title: 'Anggota Perpustakaan',
    method: 'get',
  }),
  userProfiles: createRouteModel({
    url: '/dashboard/user-profiles',
    title: 'Profile Pengguna',
    method: 'get',
  }),
  violationSanctions: createRouteModel({
    url: '/dashboard/violation-sanctions',
    title: 'Pelanggaran dan Sanksi',
    method: 'get',
  }),
}

export default routeConst