/* 
  ---- DELETE ALL DATA FROM ENTIRE TABLES ------
*/
DELETE FROM loan_violations;
DELETE FROM book_loans;
DELETE FROM book_reservations;
DELETE FROM book_authors;
DELETE FROM authors;
DELETE FROM book_image_files;
DELETE FROM books;
DELETE FROM block_members_forever;
DELETE FROM block_members;
DELETE FROM members;
DELETE FROM violation_sanctions;
DELETE FROM violations;
DELETE FROM sanctions;
DELETE FROM role_permissions;
DELETE FROM permissions;
DELETE FROM user_roles;
DELETE FROM roles;
DELETE FROM users;


/* 
  ---------------- INSERTING DATA --------------------
*/
--- insert_data_1 users ---
ALTER SEQUENCE users_id_seq RESTART WITH 1;

INSERT INTO users (username, email, password, full_name, address, gender, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('superadmin1', 'superadmin1@gmail.com', '$2b$10$PNjl/rWLE8aTObKqeufbTujfFDxuxD6Bhku5.2l0MUqsoYvYxT9V6', 'Super Admin 1', 'Jl. Raya Halim Perdanakusuma, Halim Perdanakusuma, Kec. Makasar, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13610', 'm', 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20', null, null);
INSERT INTO users (username, email, password, full_name, address, gender, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('pustakawan1', 'pustakawan1@gmail.com', '$2b$10$PNjl/rWLE8aTObKqeufbTujfFDxuxD6Bhku5.2l0MUqsoYvYxT9V6', 'Pustakawan 1', 'Jl. Raya Halim Perdanakusuma No.1, RT.3/RW.8, Kb. Pala, Kec. Makasar, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13610', 'm', 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20', null, null);
INSERT INTO users (username, email, password, full_name, address, gender, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('pustakawan2', 'pustakawan2@gmail.com', '$2b$10$PNjl/rWLE8aTObKqeufbTujfFDxuxD6Bhku5.2l0MUqsoYvYxT9V6', 'Pustakawan 2', 'Jl. Melawai 5, RT.3/RW.1, Melawai, Kec. Kby. Baru, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12160', 'm', 'superadmin1', '2025-06-01 08:05:20', 'pustakawan2', '2025-06-16 05:15:19', 'superadmin1', '2025-06-17 19:42:36');
INSERT INTO users (username, email, password, full_name, address, gender, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('viewer1', 'viewer1@gmail.com', '$2b$10$PNjl/rWLE8aTObKqeufbTujfFDxuxD6Bhku5.2l0MUqsoYvYxT9V6', 'Viewer 1', 'Jl. Pintu Satu Senayan, Gelora, Kecamatan Tanah Abang, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10270', 'm', 'superadmin1', '2025-06-01 08:05:20', 'viewer1', '2025-06-15 15:50:01', null, null);
INSERT INTO users (username, email, password, full_name, address, gender, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('viewer2', 'viewer2@gmail.com', '$2b$10$PNjl/rWLE8aTObKqeufbTujfFDxuxD6Bhku5.2l0MUqsoYvYxT9V6', 'Viewer 2', 'Jl. Pintu Satu Senayan, Gelora, Kecamatan Tanah Abang, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10270', 'f', 'superadmin1', '2025-06-01 08:05:20', 'viewer2', '2025-06-10 19:42:36', null, null);
INSERT INTO users (username, email, password, full_name, address, gender, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('viewer3', 'viewer3@gmail.com', '$2b$10$PNjl/rWLE8aTObKqeufbTujfFDxuxD6Bhku5.2l0MUqsoYvYxT9V6', 'Viewer 3', 'Jl. Pintu Satu Senayan, Gelora, Kecamatan Tanah Abang, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10270', 'm', 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20', null, null);
INSERT INTO users (username, email, password, full_name, address, gender, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('viewer4', 'viewer4@gmail.com', '$2b$10$PNjl/rWLE8aTObKqeufbTujfFDxuxD6Bhku5.2l0MUqsoYvYxT9V6', 'Viewer 4', 'Jl. Pintu Satu Senayan, Gelora, Kecamatan Tanah Abang, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10270', 'f', 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20', null, null);
INSERT INTO users (username, email, password, full_name, address, gender, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('viewer5', 'viewer5@gmail.com', '$2b$10$PNjl/rWLE8aTObKqeufbTujfFDxuxD6Bhku5.2l0MUqsoYvYxT9V6', 'Viewer 5', 'Jl. Pintu Satu Senayan, Gelora, Kecamatan Tanah Abang, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10270', 'f', 'superadmin1', '2025-06-01 08:05:20', 'viewer5', '2025-06-12 15:50:01', null, null);
--- end_insert_data_1 ---



--- insert_data_2 roles ---
ALTER SEQUENCE roles_id_seq RESTART WITH 1;

INSERT INTO roles (name, created_by, created_at, updated_by, updated_at) VALUES ('Super Admin', 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO roles (name, created_by, created_at, updated_by, updated_at) VALUES ('Pustakawan', 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO roles (name, created_by, created_at, updated_by, updated_at) VALUES ('Viewer', 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
--- end_insert_data_2 ---


--- insert_data_3 user_roles ---

INSERT INTO user_roles (user_id, role_id, created_by, created_at, updated_by, updated_at) VALUES (1, 1, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO user_roles (user_id, role_id, created_by, created_at, updated_by, updated_at) VALUES (2, 2, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO user_roles (user_id, role_id, created_by, created_at, updated_by, updated_at) VALUES (3, 3, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO user_roles (user_id, role_id, created_by, created_at, updated_by, updated_at) VALUES (4, 3, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO user_roles (user_id, role_id, created_by, created_at, updated_by, updated_at) VALUES (5, 3, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO user_roles (user_id, role_id, created_by, created_at, updated_by, updated_at) VALUES (6, 3, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO user_roles (user_id, role_id, created_by, created_at, updated_by, updated_at) VALUES (7, 3, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO user_roles (user_id, role_id, created_by, created_at, updated_by, updated_at) VALUES (8, 3, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
--- end_insert_data_3 ---


--- insert_data_4 permissions ---
ALTER SEQUENCE permissions_id_seq RESTART WITH 1;

INSERT INTO permissions (name, description) VALUES ('create_member', 'Can create members');
INSERT INTO permissions (name, description) VALUES ('update_member', 'Can update members');
INSERT INTO permissions (name, description) VALUES ('delete_member', 'Can delete members');
INSERT INTO permissions (name, description) VALUES ('view_member', 'Can view members');
INSERT INTO permissions (name, description) VALUES ('create_book', 'Can create books');
INSERT INTO permissions (name, description) VALUES ('update_book', 'Can update books');
INSERT INTO permissions (name, description) VALUES ('delete_book', 'Can delete books');
INSERT INTO permissions (name, description) VALUES ('view_book', 'Can view books');
INSERT INTO permissions (name, description) VALUES ('create_book_reservation', 'Can create book reservations');
INSERT INTO permissions (name, description) VALUES ('update_book_reservation', 'Can update book reservations');
INSERT INTO permissions (name, description) VALUES ('delete_book_reservation', 'Can delete book reservations');
INSERT INTO permissions (name, description) VALUES ('view_book_reservation', 'Can view book reservations');
INSERT INTO permissions (name, description) VALUES ('create_book_loan', 'Can create book loans');
INSERT INTO permissions (name, description) VALUES ('update_book_loan', 'Can update book loans');
INSERT INTO permissions (name, description) VALUES ('delete_book_loan', 'Can delete book loans');
INSERT INTO permissions (name, description) VALUES ('view_book_loan', 'Can view book loans');
INSERT INTO permissions (name, description) VALUES ('create_book_image', 'Can create book images');
INSERT INTO permissions (name, description) VALUES ('update_book_image', 'Can update book images');
INSERT INTO permissions (name, description) VALUES ('delete_book_image', 'Can delete book images');
INSERT INTO permissions (name, description) VALUES ('view_book_image', 'Can view book images');
INSERT INTO permissions (name, description) VALUES ('create_author', 'Can create authors');
INSERT INTO permissions (name, description) VALUES ('update_author', 'Can update authors');
INSERT INTO permissions (name, description) VALUES ('delete_author', 'Can delete authors');
INSERT INTO permissions (name, description) VALUES ('view_author', 'Can view authors');
INSERT INTO permissions (name, description) VALUES ('create_violation', 'Can create violations');
INSERT INTO permissions (name, description) VALUES ('update_violation', 'Can update violations');
INSERT INTO permissions (name, description) VALUES ('delete_violation', 'Can delete violations');
INSERT INTO permissions (name, description) VALUES ('view_violation', 'Can view violations');
INSERT INTO permissions (name, description) VALUES ('create_sanction', 'Can create sanctions');
INSERT INTO permissions (name, description) VALUES ('update_sanction', 'Can update sanctions');
INSERT INTO permissions (name, description) VALUES ('delete_sanction', 'Can delete sanctions');
INSERT INTO permissions (name, description) VALUES ('view_sanction', 'Can view sanctions');
INSERT INTO permissions (name, description) VALUES ('create_loan_violation', 'Can create loan violations');
INSERT INTO permissions (name, description) VALUES ('update_loan_violation', 'Can update loan violations');
INSERT INTO permissions (name, description) VALUES ('delete_loan_violation', 'Can delete loan violations');
INSERT INTO permissions (name, description) VALUES ('view_loan_violation', 'Can view loan violations');
INSERT INTO permissions (name, description) VALUES ('download_book_reservation', 'Can download book reservations');
INSERT INTO permissions (name, description) VALUES ('download_book_loan', 'Can download book loans');
INSERT INTO permissions (name, description) VALUES ('download_loan_violation', 'Can download loan violations');
INSERT INTO permissions (name, description) VALUES ('create_permission', 'Can create permissions');
INSERT INTO permissions (name, description) VALUES ('view_permission', 'Can view permissions');
INSERT INTO permissions (name, description) VALUES ('create_role_permission', 'Can create role permissions');
INSERT INTO permissions (name, description) VALUES ('update_role_permission', 'Can update role permissions');
INSERT INTO permissions (name, description) VALUES ('delete_role_permission', 'Can delete role permissions');
INSERT INTO permissions (name, description) VALUES ('view_role_permission', 'Can view role permissions');
INSERT INTO permissions (name, description) VALUES ('create_user_role', 'Can create user roles');
INSERT INTO permissions (name, description) VALUES ('update_user_role', 'Can update user roles');
INSERT INTO permissions (name, description) VALUES ('delete_user_role', 'Can delete user roles');
INSERT INTO permissions (name, description) VALUES ('view_user_role', 'Can view user roles');
INSERT INTO permissions (name, description) VALUES ('create_role', 'Can create roles');
INSERT INTO permissions (name, description) VALUES ('update_role', 'Can update roles');
INSERT INTO permissions (name, description) VALUES ('delete_role', 'Can delete roles');
INSERT INTO permissions (name, description) VALUES ('view_role', 'Can view roles');
--- end_insert_data_4 ---



--- insert_data_5 role_permissions ---
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (1, 1, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (1, 2, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (1, 3, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (1, 4, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (1, 5, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (1, 6, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (1, 7, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (1, 8, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (1, 9, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (1, 10, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (1, 11, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (1, 12, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (1, 13, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (1, 14, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (1, 15, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (1, 16, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (1, 17, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (1, 18, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (1, 19, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (1, 20, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (1, 21, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (1, 22, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (1, 23, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (1, 24, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (1, 25, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (1, 26, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (1, 27, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (1, 28, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (1, 29, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (1, 30, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (1, 31, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (1, 32, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (1, 33, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (1, 34, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (1, 35, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (1, 36, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (1, 37, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (1, 38, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (1, 39, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (1, 40, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (1, 41, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (1, 42, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (1, 43, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (1, 44, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (1, 45, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (1, 46, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (1, 47, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (1, 48, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (1, 49, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (1, 50, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (1, 51, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (1, 52, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (1, 53, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (2, 1, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (2, 2, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (2, 3, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (2, 4, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (2, 5, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (2, 6, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (2, 7, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (2, 8, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (2, 9, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (2, 10, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (2, 11, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (2, 12, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (2, 13, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (2, 14, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (2, 15, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (2, 16, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (2, 17, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (2, 18, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (2, 19, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (2, 20, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (2, 21, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (2, 22, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (2, 23, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (2, 24, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (2, 25, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (2, 26, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (2, 27, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (2, 28, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (2, 29, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (2, 30, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (2, 31, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (2, 32, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (2, 33, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (2, 34, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (2, 35, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (2, 36, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (2, 37, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (2, 38, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (2, 39, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (3, 4, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (3, 8, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (3, 12, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (3, 16, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (3, 20, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (3, 24, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (3, 28, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (3, 32, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (3, 36, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (3, 41, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (3, 45, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (3, 49, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO role_permissions (role_id, permission_id, created_by, created_at, updated_by, updated_at) VALUES (3, 53, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
--- end_insert_data_5 --


--- insert_data_6 sanctions ---
ALTER SEQUENCE sanctions_id_seq RESTART WITH 1;

INSERT INTO sanctions (title, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('membayar denda terlambat mengembalikan Rp 5000/hari', 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20', null, null);
INSERT INTO sanctions (title, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('mengganti dengan buku baru', 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20', null, null);
INSERT INTO sanctions (title, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('tidak dapat meminjam buku selama 2 minggu', 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20', null, null);
INSERT INTO sanctions (title, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('mengganti dengan uang sebesar 2X harga buku', 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20', null, null);
INSERT INTO sanctions (title, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('Pencabutan kenggotaan selamanya', 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20', null, null);
--- end_insert_data_6 ---



--- insert_data_7 violations ---
ALTER SEQUENCE violations_id_seq RESTART WITH 1;

INSERT INTO violations (title, level, description, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('Terlambat mengembalikan buku lebih dari 7 hari', 'minor', null, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20', null, null);
INSERT INTO violations (title, level, description, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('Terlambat mengembalikan buku lebih dari 14 hari', 'moderate', null, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20', null, null);
INSERT INTO violations (title, level, description, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('Terlambat mengembalikan buku lebih dari 30 hari', 'high', null, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20', null, null);
INSERT INTO violations (title, level, description, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('Merusak buku kondisi ringan', 'minor', 'Merusak buku dengan kondisi kerusakan ringan. Seperti buku basah, sobek, dicoret-coret', 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20', null, null);
INSERT INTO violations (title, level, description, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('Merusak buku kondisi sedang', 'moderate', 'Merusak buku dengan kondisi kerusakan sedang. Seperti buku basah, sobek, dicoret-coret', 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20', null, null);
INSERT INTO violations (title, level, description, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('Merusak buku kondisi parah', 'high', 'Merusak buku dengan kondisi kerusakan parah. Seperti buku basah, sobek, dicoret-coret', 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20', null, null);
INSERT INTO violations (title, level, description, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('Merusak buku kondisi parah dan buku sudah tidak diterbitkan', 'high', null, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20', null, null);
INSERT INTO violations (title, level, description, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('Menghilangkan buku', 'high', null, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20', null, null);
INSERT INTO violations (title, level, description, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('Terlambat mengembalikan buku kurang dari 7 hari', 'minor', null, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20', null, null);
--- end_insert_data_7 ---



--- insert_data_8 violation_sanctions ---
INSERT INTO violation_sanctions (violation_id, sanction_id, created_by, created_at) VALUES (1, 1, 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO violation_sanctions (violation_id, sanction_id, created_by, created_at) VALUES (2, 1, 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO violation_sanctions (violation_id, sanction_id, created_by, created_at) VALUES (2, 3, 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO violation_sanctions (violation_id, sanction_id, created_by, created_at) VALUES (3, 1, 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO violation_sanctions (violation_id, sanction_id, created_by, created_at) VALUES (3, 5, 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO violation_sanctions (violation_id, sanction_id, created_by, created_at) VALUES (4, 2, 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO violation_sanctions (violation_id, sanction_id, created_by, created_at) VALUES (4, 3, 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO violation_sanctions (violation_id, sanction_id, created_by, created_at) VALUES (5, 2, 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO violation_sanctions (violation_id, sanction_id, created_by, created_at) VALUES (5, 3, 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO violation_sanctions (violation_id, sanction_id, created_by, created_at) VALUES (6, 2, 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO violation_sanctions (violation_id, sanction_id, created_by, created_at) VALUES (6, 5, 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO violation_sanctions (violation_id, sanction_id, created_by, created_at) VALUES (7, 4, 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO violation_sanctions (violation_id, sanction_id, created_by, created_at) VALUES (7, 5, 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO violation_sanctions (violation_id, sanction_id, created_by, created_at) VALUES (8, 5, 'superadmin1', '2025-06-01 08:05:20');
--- end_insert_data_8 ---


--- insert_data_9 members ---
ALTER SEQUENCE members_id_seq RESTART WITH 1;

INSERT INTO members (full_name, email, phone, address, birth_date, gender, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('Siti Nurhaliza', 'siti@gmail.com', '081234567890', 'Bandung', '1995-04-12 00:00:00', 'f', 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20', null, null);
INSERT INTO members (full_name, email, phone, address, birth_date, gender, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('Arif Prasetyo', 'arif@gmail.com', '082133445566', 'Bandung', '1999-03-20 00:00:00', 'm', 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20', null, null);
INSERT INTO members (full_name, email, phone, address, birth_date, gender, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('Dewi Lestari', 'dewi@gmail.com', '087722119988', 'Bandung', '2000-01-01 00:00:00', 'f', 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20', null, null);
INSERT INTO members (full_name, email, phone, address, birth_date, gender, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('Budi Santoso', 'budi@gmail.com', '081322223333', 'Bandung', '1997-05-25 00:00:00', 'm', 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20', null, null);
INSERT INTO members (full_name, email, phone, address, birth_date, gender, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('Nina Kartini', 'nina@gmail.com', '085688990011', 'Bandung', '1998-09-10 00:00:00', 'f', 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20', null, null);
INSERT INTO members (full_name, email, phone, address, birth_date, gender, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('Rizky Andika', 'rizky@gmail.com', '082244112299', 'Bandung', '2000-05-27 00:00:00', 'm', 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20', null, null);
INSERT INTO members (full_name, email, phone, address, birth_date, gender, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('Melati Ayu', 'melati@gmail.com', '088855556666', 'Bandung', '2000-08-24 00:00:00', 'f', 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20', null, null);
INSERT INTO members (full_name, email, phone, address, birth_date, gender, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('Hendra Wirawan', 'hendra@gmail.com', '081211117777', 'Bandung', '1995-02-10 00:00:00', 'm', 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20', null, null);
INSERT INTO members (full_name, email, phone, address, birth_date, gender, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('Putri Maharani', 'putri@gmail.com', '086533558822', 'Bandung', '1995-03-22 00:00:00', 'f', 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20', null, null);
INSERT INTO members (full_name, email, phone, address, birth_date, gender, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('Yoga Pranata', 'yoga@gmail.com', '083877778888', 'Bandung', '1996-09-19 00:00:00', 'm', 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-02 08:05:20');
--- end_insert_data_9 ---


--- insert_data_10 block_members ---
INSERT INTO block_members (member_id, start_date, end_date, is_completed, created_by, created_at) VALUES (9, '2025-06-05 15:50:01', '2025-06-19 15:50:01', TRUE, 'pustakawan1', '2025-06-05 15:50:01');
--- end_insert_data_10 ---


--- insert_data_11 block_members_forever ---
INSERT INTO block_members_forever (member_id, created_by, created_at) VALUES (8, 'pustakawan1', '2025-06-05 15:50:01');
--- end_insert_data_11 ---


--- insert_data_12 books ---
ALTER SEQUENCE books_id_seq RESTART WITH 1;

INSERT INTO books (isbn, title, sub_title, publisher, publication_date, page, language, edition, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('9786231648303', 'Arsitektur Rumah Jawa', 'Mengungkap Filosofi Makna dan Simbologinya', 'Anak Hebat Indonesia', '2024-06-18', 230, 'Indonesia', 1, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20', null, null);
INSERT INTO books (isbn, title, sub_title, publisher, publication_date, page, language, edition, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('9786237661535', 'Buku Praktis Belajar Bahasa Inggris', 'Cara mudah dan singkat kuasai bahasa inggris', 'Checklist', '2014-06-20', 312, 'Indonesia', 6, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20', null, null);
INSERT INTO books (isbn, title, sub_title, publisher, publication_date, page, language, edition, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('9786020656151', 'Esensialisme', 'Pentingkan yang penting saja', 'Gramedia Pustaka Utama', '2022-02-16', 354, 'Indonesia', 1, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20', null, null);
--- end_insert_data_12 ---

--- insert_data_13 book_image_files ---
ALTER SEQUENCE book_image_files_id_seq RESTART WITH 1;
--- end_insert_data_13 ---



--- insert_data_14 authors ---
ALTER SEQUENCE authors_id_seq RESTART WITH 1;

INSERT INTO authors (full_name, nationality, active_since, about, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('Asti Musman', 'Indonesia', null, null, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20', null, null);
INSERT INTO authors (full_name, nationality, active_since, about, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('Wahidah Murriska', 'Indonesia', null, 'Memiliki pengalaman kerja sebagai English translator di Perpustakaan Ganesa, Sukoharjo (2015), English teacher di Erje Privat (2016), dan Writer di Sanggar Bahasa Yogyakarta (2017). Latar belakang pendidikannya adalah Sastra Inggris, Fakultas Ilmu Budaya, Universitas Sebelas Maret, dan Ilmu Linguistik, Fakultas Ilmu Budaya, Universitas Gadjah Mada', 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20', null, null);
INSERT INTO authors (full_name, nationality, active_since, about, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('Greg McKeown', 'Inggris', null, null, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20', null, null);
--- end_insert_data_14 ---



--- insert_data_15 book_authors ---
INSERT INTO book_authors (author_id, book_id, created_by, created_at, updated_by, updated_at) VALUES (1, 1, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO book_authors (author_id, book_id, created_by, created_at, updated_by, updated_at) VALUES (2, 2, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
INSERT INTO book_authors (author_id, book_id, created_by, created_at, updated_by, updated_at) VALUES (3, 3, 'superadmin1', '2025-06-01 08:05:20', 'superadmin1', '2025-06-01 08:05:20');
--- end_insert_data_15 ---


--- insert_data_16 book_reservations ---
ALTER SEQUENCE book_reservations_id_seq RESTART WITH 1;

INSERT INTO book_reservations (member_id, book_id, start_date, end_date, is_completed, is_cancelled, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES (7, 1, '2025-06-12 15:50:01', '2025-06-14 23:59:59', FALSE, FALSE, 'pustakawan1', '2025-06-08 15:50:01', 'pustakawan1', '2025-06-08 15:50:01', null, null);
INSERT INTO book_reservations (member_id, book_id, start_date, end_date, is_completed, is_cancelled, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES (6, 2, '2025-06-14 15:50:01', '2025-06-20 23:59:59', FALSE, FALSE, 'pustakawan1', '2025-06-09 15:50:01', 'pustakawan1', '2025-06-09 15:50:01', null, null);
--- end_insert_data_16 ---


--- insert_data_17 book_loans ---
ALTER SEQUENCE book_loans_id_seq RESTART WITH 1;

INSERT INTO book_loans (member_id, book_id, start_date, end_date, returned_date, is_returned, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES (1, 1, '2025-06-06 15:50:01', '2025-06-13 23:59:59', '2025-06-13 11:00:00', TRUE, 'pustakawan1', '2025-06-06 15:50:01', 'pustakawan1', '2025-06-13 11:00:00', null, null);
INSERT INTO book_loans (member_id, book_id, start_date, end_date, returned_date, is_returned, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES (2, 2, '2025-06-06 15:50:01', '2025-06-13 23:59:59', '2025-06-13 15:21:33', TRUE, 'pustakawan1', '2025-06-06 15:50:01', 'pustakawan1', '2025-06-13 15:21:33', null, null);
INSERT INTO book_loans (member_id, book_id, start_date, end_date, returned_date, is_returned, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES (3, 3, '2025-06-06 15:50:01', '2025-06-13 23:59:59', '2025-06-13 09:10:13', TRUE, 'pustakawan2', '2025-06-06 15:50:01', 'pustakawan2', '2025-06-13 09:10:13', null, null);
INSERT INTO book_loans (member_id, book_id, start_date, end_date, returned_date, is_returned, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES (4, 1, '2025-06-07 15:50:01', '2025-06-14 23:59:59', null, FALSE, 'pustakawan2', '2025-06-07 15:50:01', 'pustakawan2', '2025-06-07 15:50:01', null, null);
INSERT INTO book_loans (member_id, book_id, start_date, end_date, returned_date, is_returned, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES (5, 2, '2025-06-13 11:30:01', '2025-06-20 23:59:59', null, FALSE, 'pustakawan1', '2025-06-13 11:30:01', 'pustakawan1', '2025-06-13 11:30:01', null, null);
--- end_insert_data_17 ---


--- insert_data_18 loan_violations ---
INSERT INTO loan_violations (book_loan_id, violation_id, created_by, created_at, deleted_by, deleted_at) VALUES (1, 9, 'pustakawan1', '2025-06-01 15:50:01',null,null) ;
INSERT INTO loan_violations (book_loan_id, violation_id, created_by, created_at, deleted_by, deleted_at) VALUES (3, 9, 'pustakawan2', '2025-06-01 15:50:01',null,null) ;
--- end_insert_data_18 ---