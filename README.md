This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Set up database

Database using **PostgreSQL**, after that you can import the sql backup file inside `./database/final-db` folder. Choose the latest version to import. For the migration files are not updated to the latest like in sql backup file, so don't use it to database.

```bash
database/
  - final-db/
    - sql_backup_file.sql
```

### Environment File

Make a new file `.env` on a root folder, to put configurations for tha app. All of the config example save in `env.example.txt`, that can be copy and paste to `.env` file.

### Run Project

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To login application with user data that stored inside `users` table, with given roles. Roles that used are "Super Admin, Pustakawan and Viewer". Then for the password use `123` to all users data.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

Root folder

![Root Folder](/assets/images/library-root-folder.png "Root folder")

### Outdated Folder / Files

Folder or files that are not update are :

- `route-handler` folder
- database seed, schema sql query

### Images

#### Login

![Login to Library Management](/assets/images/library-login.png "Login Page")

#### Dashboard

![Dashboard page](/assets/images/library-dashboard.png "Dashboard Page")

#### Anggota

![Anggota page that display list data](/assets/images/library-anggota.png "Anggota Page")

#### Detail Anggota

![Detail anggota page to view more detail about anggota data](/assets/images/library-anggota-detail.png "Detail Anggota Page")

#### Buku

![Buku page that display list data](/assets/images/library-buku.png "Buku Page")

#### Tambah Buku

![Tambah Buku page to save a new book data](/assets/images/library-tambah-buku.png "Tambah Buku Page")

#### Riwayat Peminjaman Buku

![Riwayat Peminjaman Buku page for display list data](/assets/images/library-riwayat-peminjaman-buku.png "Riwayat Peminjaman Buku Page")

#### User Profile

![User Profile page that view a user data and also can update or change a username](/assets/images/library-user-profile.png "User Profile Page")
