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
DELETE FROM resources;
DELETE FROM operations;
DELETE FROM user_roles;
DELETE FROM roles;
DELETE FROM users;




/* 
  ---------------- INSERTING DATA --------------------
*/
--- insert_data_1 users ---
ALTER SEQUENCE users_id_seq RESTART WITH 1;

INSERT INTO users (username, email, password, full_name, address, gender, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('superadmin1', 'superadmin1@gmail.com', '$2b$10$PNjl/rWLE8aTObKqeufbTujfFDxuxD6Bhku5.2l0MUqsoYvYxT9V6', 'Super Admin 1', 'Jl. Raya Halim Perdanakusuma, Halim Perdanakusuma, Kec. Makasar, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13610', 'M', 'superadmin1', '2025-06-20 08:05:20', 'superadmin1', '2025-06-24 08:05:20', null, null);
INSERT INTO users (username, email, password, full_name, address, gender, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('pustakawan1', 'pustakawan1@gmail.com', '$2b$10$PNjl/rWLE8aTObKqeufbTujfFDxuxD6Bhku5.2l0MUqsoYvYxT9V6', 'Pustakawan 1', 'Jl. Raya Halim Perdanakusuma No.1, RT.3/RW.8, Kb. Pala, Kec. Makasar, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13610', 'M', 'superadmin1', '2025-06-29 18:10:00', 'pustakawan1', '2025-06-29 18:10:00', null, null);
INSERT INTO users (username, email, password, full_name, address, gender, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('pustakawan2', 'pustakawan2@gmail.com', '$2b$10$PNjl/rWLE8aTObKqeufbTujfFDxuxD6Bhku5.2l0MUqsoYvYxT9V6', 'Pustakawan 2', 'Jl. Melawai 5, RT.3/RW.1, Melawai, Kec. Kby. Baru, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12160', 'M', 'superadmin1', '2025-06-14 05:15:19', 'pustakawan2', '2025-06-14 05:15:19', null, null);
INSERT INTO users (username, email, password, full_name, address, gender, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('pustakawan3', 'pustakawan3@gmail.com', '$2b$10$PNjl/rWLE8aTObKqeufbTujfFDxuxD6Bhku5.2l0MUqsoYvYxT9V6', 'Pustakawan 3', 'Jl. Pintu Satu Senayan, Gelora, Kecamatan Tanah Abang, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10270', 'F', 'superadmin1', '2025-06-01 15:50:01', 'pustakawan3', '2025-06-15 15:50:01', null, null);
INSERT INTO users (username, email, password, full_name, address, gender, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('pustakawan4', 'pustakawan4@gmail.com', '$2b$10$PNjl/rWLE8aTObKqeufbTujfFDxuxD6Bhku5.2l0MUqsoYvYxT9V6', 'Pustakawan 4', 'Jl. Pintu Satu Senayan, Gelora, Kecamatan Tanah Abang, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10270', 'F', 'superadmin1', '2025-06-10 19:42:36', 'pustakawan4', '2025-06-10 19:42:36', 'superadmin1', '2025-06-11 19:42:36');
--- end_insert_data_1 ---



--- insert_data_2 roles ---
INSERT INTO roles (code, name) VALUES ('SPR_ADM', 'Super Admin');
INSERT INTO roles (code, name) VALUES ('PUS', 'Pustakawan');
--- end_insert_data_2 ---


--- insert_data_3 user_roles ---
INSERT INTO user_roles (user_id, role_code, created_by, created_at, updated_by, updated_at) VALUES (1, 'SPR_ADM', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO user_roles (user_id, role_code, created_by, created_at, updated_by, updated_at) VALUES (2, 'PUS', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO user_roles (user_id, role_code, created_by, created_at, updated_by, updated_at) VALUES (3, 'PUS', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO user_roles (user_id, role_code, created_by, created_at, updated_by, updated_at) VALUES (4, 'PUS', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
--- end_insert_data_3 ---



--- insert_data_4 operations ---
INSERT INTO operations (code, name) VALUES ('POST', 'Post');
INSERT INTO operations (code, name) VALUES ('DEL', 'Delete');
INSERT INTO operations (code, name) VALUES ('UPD', 'Update');
INSERT INTO operations (code, name) VALUES ('GET', 'Get');
--- end_insert_data_4 ---



--- insert_data_5 resources ---
INSERT INTO resources (code, name) VALUES ('MEM', 'Member');
INSERT INTO resources (code, name) VALUES ('BK_LOA', 'Book Loan');
INSERT INTO resources (code, name) VALUES ('BK_RSV', 'Book Reservation');
INSERT INTO resources (code, name) VALUES ('BK', 'Book');
INSERT INTO resources (code, name) VALUES ('AUT', 'Author');
INSERT INTO resources (code, name) VALUES ('LOA_VLT', 'Loan Violation');
INSERT INTO resources (code, name) VALUES ('VLT_LVL', 'Violation Level');
INSERT INTO resources (code, name) VALUES ('VLT', 'Violation');
INSERT INTO resources (code, name) VALUES ('VLT_SANC', 'Violation Sanction');
INSERT INTO resources (code, name) VALUES ('SANC', 'Sanction');
INSERT INTO resources (code, name) VALUES ('USR', 'User');
INSERT INTO resources (code, name) VALUES ('ROLE', 'Role');
INSERT INTO resources (code, name) VALUES ('OPER', 'Operation');
INSERT INTO resources (code, name) VALUES ('PER', 'Permission');
INSERT INTO resources (code, name) VALUES ('USR_ROLE', 'User Role');
INSERT INTO resources (code, name) VALUES ('ROLE_PER', 'Role Permission');
--- end_insert_data_5 ---



--- insert_data_6 permissions ---
ALTER SEQUENCE permissions_id_seq RESTART WITH 1;

INSERT INTO permissions (operation_code, resource_code) VALUES ('POST', 'MEM');
INSERT INTO permissions (operation_code, resource_code) VALUES ('DEL', 'MEM');
INSERT INTO permissions (operation_code, resource_code) VALUES ('UPD', 'MEM');
INSERT INTO permissions (operation_code, resource_code) VALUES ('GET', 'MEM');
INSERT INTO permissions (operation_code, resource_code) VALUES ('POST', 'BK_LOA');
INSERT INTO permissions (operation_code, resource_code) VALUES ('DEL', 'BK_LOA');
INSERT INTO permissions (operation_code, resource_code) VALUES ('UPD', 'BK_LOA');
INSERT INTO permissions (operation_code, resource_code) VALUES ('GET', 'BK_LOA');
INSERT INTO permissions (operation_code, resource_code) VALUES ('POST', 'BK_RSV');
INSERT INTO permissions (operation_code, resource_code) VALUES ('DEL', 'BK_RSV');
INSERT INTO permissions (operation_code, resource_code) VALUES ('UPD', 'BK_RSV');
INSERT INTO permissions (operation_code, resource_code) VALUES ('GET', 'BK_RSV');
INSERT INTO permissions (operation_code, resource_code) VALUES ('POST', 'BK');
INSERT INTO permissions (operation_code, resource_code) VALUES ('DEL', 'BK');
INSERT INTO permissions (operation_code, resource_code) VALUES ('UPD', 'BK');
INSERT INTO permissions (operation_code, resource_code) VALUES ('GET', 'BK');
INSERT INTO permissions (operation_code, resource_code) VALUES ('POST', 'AUT');
INSERT INTO permissions (operation_code, resource_code) VALUES ('DEL', 'AUT');
INSERT INTO permissions (operation_code, resource_code) VALUES ('UPD', 'AUT');
INSERT INTO permissions (operation_code, resource_code) VALUES ('GET', 'AUT');
INSERT INTO permissions (operation_code, resource_code) VALUES ('POST', 'LOA_VLT');
INSERT INTO permissions (operation_code, resource_code) VALUES ('DEL', 'LOA_VLT');
INSERT INTO permissions (operation_code, resource_code) VALUES ('UPD', 'LOA_VLT');
INSERT INTO permissions (operation_code, resource_code) VALUES ('GET', 'LOA_VLT');
INSERT INTO permissions (operation_code, resource_code) VALUES ('POST', 'VLT_LVL');
INSERT INTO permissions (operation_code, resource_code) VALUES ('DEL', 'VLT_LVL');
INSERT INTO permissions (operation_code, resource_code) VALUES ('UPD', 'VLT_LVL');
INSERT INTO permissions (operation_code, resource_code) VALUES ('GET', 'VLT_LVL');
INSERT INTO permissions (operation_code, resource_code) VALUES ('POST', 'VLT');
INSERT INTO permissions (operation_code, resource_code) VALUES ('DEL', 'VLT');
INSERT INTO permissions (operation_code, resource_code) VALUES ('UPD', 'VLT');
INSERT INTO permissions (operation_code, resource_code) VALUES ('GET', 'VLT');
INSERT INTO permissions (operation_code, resource_code) VALUES ('POST', 'VLT_SANC');
INSERT INTO permissions (operation_code, resource_code) VALUES ('DEL', 'VLT_SANC');
INSERT INTO permissions (operation_code, resource_code) VALUES ('UPD', 'VLT_SANC');
INSERT INTO permissions (operation_code, resource_code) VALUES ('GET', 'VLT_SANC');
INSERT INTO permissions (operation_code, resource_code) VALUES ('POST', 'SANC');
INSERT INTO permissions (operation_code, resource_code) VALUES ('DEL', 'SANC');
INSERT INTO permissions (operation_code, resource_code) VALUES ('UPD', 'SANC');
INSERT INTO permissions (operation_code, resource_code) VALUES ('GET', 'SANC');
INSERT INTO permissions (operation_code, resource_code) VALUES ('POST', 'USR');
INSERT INTO permissions (operation_code, resource_code) VALUES ('DEL', 'USR');
INSERT INTO permissions (operation_code, resource_code) VALUES ('UPD', 'USR');
INSERT INTO permissions (operation_code, resource_code) VALUES ('GET', 'USR');
INSERT INTO permissions (operation_code, resource_code) VALUES ('POST', 'ROLE');
INSERT INTO permissions (operation_code, resource_code) VALUES ('DEL', 'ROLE');
INSERT INTO permissions (operation_code, resource_code) VALUES ('UPD', 'ROLE');
INSERT INTO permissions (operation_code, resource_code) VALUES ('GET', 'ROLE');
INSERT INTO permissions (operation_code, resource_code) VALUES ('POST', 'OPER');
INSERT INTO permissions (operation_code, resource_code) VALUES ('DEL', 'OPER');
INSERT INTO permissions (operation_code, resource_code) VALUES ('UPD', 'OPER');
INSERT INTO permissions (operation_code, resource_code) VALUES ('GET', 'OPER');
INSERT INTO permissions (operation_code, resource_code) VALUES ('POST', 'PER');
INSERT INTO permissions (operation_code, resource_code) VALUES ('DEL', 'PER');
INSERT INTO permissions (operation_code, resource_code) VALUES ('UPD', 'PER');
INSERT INTO permissions (operation_code, resource_code) VALUES ('GET', 'PER');
INSERT INTO permissions (operation_code, resource_code) VALUES ('POST', 'USR_ROLE');
INSERT INTO permissions (operation_code, resource_code) VALUES ('DEL', 'USR_ROLE');
INSERT INTO permissions (operation_code, resource_code) VALUES ('UPD', 'USR_ROLE');
INSERT INTO permissions (operation_code, resource_code) VALUES ('GET', 'USR_ROLE');
INSERT INTO permissions (operation_code, resource_code) VALUES ('POST', 'ROLE_PER');
INSERT INTO permissions (operation_code, resource_code) VALUES ('DEL', 'ROLE_PER');
INSERT INTO permissions (operation_code, resource_code) VALUES ('UPD', 'ROLE_PER');
INSERT INTO permissions (operation_code, resource_code) VALUES ('GET', 'ROLE_PER');
--- end_insert_data_6 ---





--- insert_data_7 role_permissions ---
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('SPR_ADM', '1', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('SPR_ADM', '2', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('SPR_ADM', '3', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('SPR_ADM', '4', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('SPR_ADM', '5', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('SPR_ADM', '6', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('SPR_ADM', '7', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('SPR_ADM', '8', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('SPR_ADM', '9', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('SPR_ADM', '10', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('SPR_ADM', '11', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('SPR_ADM', '12', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('SPR_ADM', '13', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('SPR_ADM', '14', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('SPR_ADM', '15', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('SPR_ADM', '16', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('SPR_ADM', '17', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('SPR_ADM', '18', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('SPR_ADM', '19', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('SPR_ADM', '20', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('SPR_ADM', '21', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('SPR_ADM', '22', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('SPR_ADM', '23', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('SPR_ADM', '24', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('SPR_ADM', '25', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('SPR_ADM', '26', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('SPR_ADM', '27', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('SPR_ADM', '28', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('SPR_ADM', '29', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('SPR_ADM', '30', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('SPR_ADM', '31', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('SPR_ADM', '32', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('SPR_ADM', '33', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('SPR_ADM', '34', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('SPR_ADM', '35', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('SPR_ADM', '36', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('SPR_ADM', '37', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('SPR_ADM', '38', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('SPR_ADM', '39', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('SPR_ADM', '40', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('SPR_ADM', '41', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('SPR_ADM', '42', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('SPR_ADM', '43', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('SPR_ADM', '44', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('SPR_ADM', '45', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('SPR_ADM', '46', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('SPR_ADM', '47', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('SPR_ADM', '48', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('SPR_ADM', '49', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('SPR_ADM', '50', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('SPR_ADM', '51', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('SPR_ADM', '52', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('SPR_ADM', '53', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('SPR_ADM', '54', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('SPR_ADM', '55', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('SPR_ADM', '56', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('SPR_ADM', '57', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('SPR_ADM', '58', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('SPR_ADM', '59', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('SPR_ADM', '60', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('SPR_ADM', '61', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('SPR_ADM', '62', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('SPR_ADM', '63', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('SPR_ADM', '64', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('PUS', '1', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('PUS', '2', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('PUS', '3', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('PUS', '4', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('PUS', '5', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('PUS', '6', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('PUS', '7', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('PUS', '8', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('PUS', '9', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('PUS', '10', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('PUS', '11', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('PUS', '12', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('PUS', '13', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('PUS', '14', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('PUS', '15', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('PUS', '16', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('PUS', '17', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('PUS', '18', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('PUS', '19', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('PUS', '20', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('PUS', '21', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('PUS', '22', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('PUS', '23', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('PUS', '24', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('PUS', '25', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('PUS', '26', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('PUS', '27', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('PUS', '28', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('PUS', '29', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('PUS', '30', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('PUS', '31', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('PUS', '32', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('PUS', '33', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('PUS', '34', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('PUS', '35', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('PUS', '36', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('PUS', '37', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('PUS', '38', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('PUS', '39', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO role_permissions (role_code, permission_id, created_by, created_at, updated_by, updated_at) VALUES ('PUS', '40', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01');
--- end_insert_data_7 ---



--- insert_data_8 sanctions ---
ALTER SEQUENCE sanctions_id_seq RESTART WITH 1;

INSERT INTO sanctions (title, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('membayar denda terlambat mengembalikan Rp 5000/hari', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01', null, null);
INSERT INTO sanctions (title, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('mengganti dengan buku baru', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01', null, null);
INSERT INTO sanctions (title, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('tidak dapat meminjam buku selama 2 minggu', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01', null, null);
INSERT INTO sanctions (title, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('mengganti dengan uang sebesar 2X harga buku', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01', null, null);
INSERT INTO sanctions (title, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('Pencabutan kenggotaan selamanya', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01', null, null);
--- end_insert_data_8 ---



--- insert_data_9 violations ---
ALTER SEQUENCE violations_id_seq RESTART WITH 1;

INSERT INTO violations (title, level, description, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('Tidak mengembalikan buku lebih dari 7 hari', 'Minor', null, 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01', null, null);
INSERT INTO violations (title, level, description, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('Tidak mengembalikan buku lebih dari 14 hari', 'Moderate', null, 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01', null, null);
INSERT INTO violations (title, level, description, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('Tidak mengembalikan buku lebih dari 30 hari', 'High', null, 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01', null, null);
INSERT INTO violations (title, level, description, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('Merusak buku kondisi ringan', 'Minor', 'Merusak buku dengan kondisi kerusakan ringan. Seperti buku basah, sobek, dicoret-coret', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01', null, null);
INSERT INTO violations (title, level, description, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('Merusak buku kondisi sedang', 'Moderate', 'Merusak buku dengan kondisi kerusakan sedang. Seperti buku basah, sobek, dicoret-coret', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01', null, null);
INSERT INTO violations (title, level, description, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('Merusak buku kondisi parah', 'High', 'Merusak buku dengan kondisi kerusakan parah. Seperti buku basah, sobek, dicoret-coret', 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01', null, null);
INSERT INTO violations (title, level, description, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('Merusak buku kondisi parah dan buku sudah tidak diterbitkan', 'High', null, 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01', null, null);
INSERT INTO violations (title, level, description, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('Menghilangkan buku', 'High', null, 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01', null, null);
INSERT INTO violations (title, level, description, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('Terlambat mengembalikan buku kurang dari 7 hari', 'Minor', null, 'superadmin1', '2025-06-01 15:50:01', 'superadmin1', '2025-06-01 15:50:01', null, null);
--- end_insert_data_9 ---



--- insert_data_10 violation_sanctions ---
INSERT INTO violation_sanctions (violation_id, sanction_id, created_by, created_at) VALUES (1, 1, 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO violation_sanctions (violation_id, sanction_id, created_by, created_at) VALUES (2, 1, 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO violation_sanctions (violation_id, sanction_id, created_by, created_at) VALUES (2, 3, 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO violation_sanctions (violation_id, sanction_id, created_by, created_at) VALUES (3, 1, 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO violation_sanctions (violation_id, sanction_id, created_by, created_at) VALUES (3, 5, 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO violation_sanctions (violation_id, sanction_id, created_by, created_at) VALUES (4, 2, 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO violation_sanctions (violation_id, sanction_id, created_by, created_at) VALUES (4, 3, 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO violation_sanctions (violation_id, sanction_id, created_by, created_at) VALUES (5, 2, 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO violation_sanctions (violation_id, sanction_id, created_by, created_at) VALUES (5, 3, 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO violation_sanctions (violation_id, sanction_id, created_by, created_at) VALUES (6, 2, 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO violation_sanctions (violation_id, sanction_id, created_by, created_at) VALUES (6, 5, 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO violation_sanctions (violation_id, sanction_id, created_by, created_at) VALUES (7, 4, 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO violation_sanctions (violation_id, sanction_id, created_by, created_at) VALUES (7, 5, 'superadmin1', '2025-06-01 15:50:01');
INSERT INTO violation_sanctions (violation_id, sanction_id, created_by, created_at) VALUES (8, 5, 'superadmin1', '2025-06-01 15:50:01');
--- end_insert_data_10 ---


--- insert_data_11 members ---
ALTER SEQUENCE members_id_seq RESTART WITH 1;

INSERT INTO members (full_name, email, phone, address, birth_date, gender, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('Siti Nurhaliza', 'siti@gmail.com', '081234567890', 'Bandung', '1995-04-12 00:00:00', 'F', 'superadmin1', '2025-06-05 15:50:01', 'superadmin1', '2025-06-05 15:50:01', null, null);
INSERT INTO members (full_name, email, phone, address, birth_date, gender, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('Arif Prasetyo', 'arif@gmail.com', '082133445566', 'Bandung', '1999-03-20 00:00:00', 'M', 'superadmin1', '2025-06-05 15:50:01', 'superadmin1', '2025-06-05 15:50:01', null, null);
INSERT INTO members (full_name, email, phone, address, birth_date, gender, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('Dewi Lestari', 'dewi@gmail.com', '087722119988', 'Bandung', '2000-01-01 00:00:00', 'F', 'superadmin1', '2025-06-05 15:50:01', 'superadmin1', '2025-06-05 15:50:01', null, null);
INSERT INTO members (full_name, email, phone, address, birth_date, gender, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('Budi Santoso', 'budi@gmail.com', '081322223333', 'Bandung', '1997-05-25 00:00:00', 'M', 'superadmin1', '2025-06-05 15:50:01', 'superadmin1', '2025-06-05 15:50:01', null, null);
INSERT INTO members (full_name, email, phone, address, birth_date, gender, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('Nina Kartini', 'nina@gmail.com', '085688990011', 'Bandung', '1998-09-10 00:00:00', 'F', 'superadmin1', '2025-06-05 15:50:01', 'superadmin1', '2025-06-05 15:50:01', null, null);
INSERT INTO members (full_name, email, phone, address, birth_date, gender, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('Rizky Andika', 'rizky@gmail.com', '082244112299', 'Bandung', '2000-05-27 00:00:00', 'M', 'superadmin1', '2025-06-05 15:50:01', 'superadmin1', '2025-06-05 15:50:01', null, null);
INSERT INTO members (full_name, email, phone, address, birth_date, gender, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('Melati Ayu', 'melati@gmail.com', '088855556666', 'Bandung', '2000-08-24 00:00:00', 'F', 'superadmin1', '2025-06-05 15:50:01', 'superadmin1', '2025-06-05 15:50:01', null, null);
INSERT INTO members (full_name, email, phone, address, birth_date, gender, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('Hendra Wirawan', 'hendra@gmail.com', '081211117777', 'Bandung', '1995-02-10 00:00:00', 'M', 'superadmin1', '2025-06-05 15:50:01', 'superadmin1', '2025-06-05 15:50:01', null, null);
INSERT INTO members (full_name, email, phone, address, birth_date, gender, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('Putri Maharani', 'putri@gmail.com', '086533558822', 'Bandung', '1995-03-22 00:00:00', 'F', 'superadmin1', '2025-06-05 15:50:01', 'superadmin1', '2025-06-05 15:50:01', null, null);
INSERT INTO members (full_name, email, phone, address, birth_date, gender, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('Yoga Pranata', 'yoga@gmail.com', '083877778888', 'Bandung', '1996-09-19 00:00:00', 'M', 'superadmin1', '2025-06-05 15:50:01', 'superadmin1', '2025-06-05 15:50:01', 'superadmin1', '2025-06-07 15:50:01');
--- end_insert_data_11 ---


--- insert_data_12 block_members ---
INSERT INTO block_members (member_id, start_date, end_date, is_completed, created_by, created_at) VALUES (9, '2025-06-05 15:50:01', '2025-06-19 15:50:01', TRUE, 'pustakawan1', '2025-06-05 15:50:01');
--- end_insert_data_12 ---


--- insert_data_13 block_members_forever ---
INSERT INTO block_members_forever (member_id, created_by, created_at) VALUES (8, 'pustakawan1', '2025-06-05 15:50:01');
--- end_insert_data_13 ---


--- insert_data_14 books ---
ALTER SEQUENCE books_id_seq RESTART WITH 1;

INSERT INTO books (isbn, title, sub_title, publisher, publication_date, page, language, edition, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('9786231648303', 'Arsitektur Rumah Jawa', 'Mengungkap Filosofi Makna dan Simbologinya', 'Anak Hebat Indonesia', '2024-06-18', 230, 'Indonesia', 1, 'superadmin1', '2025-06-05 15:50:01', 'superadmin1', '2025-06-05 15:50:01', null, null);
INSERT INTO books (isbn, title, sub_title, publisher, publication_date, page, language, edition, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('9786237661535', 'Buku Praktis Belajar Bahasa Inggris', 'Cara mudah dan singkat kuasai bahasa inggris', 'Checklist', '2014-06-20', 312, 'Indonesia', 6, 'superadmin1', '2025-06-05 15:50:01', 'superadmin1', '2025-06-05 15:50:01', null, null);
INSERT INTO books (isbn, title, sub_title, publisher, publication_date, page, language, edition, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('9786020656151', 'Esensialisme', 'Pentingkan yang penting saja', 'Gramedia Pustaka Utama', '2022-02-16', 354, 'Indonesia', 1, 'superadmin1', '2025-06-05 15:50:01', 'superadmin1', '2025-06-05 15:50:01', null, null);
--- end_insert_data_14 ---

--- insert_data_15 book_image_files ---
ALTER SEQUENCE book_image_files_id_seq RESTART WITH 1;
--- end_insert_data_15 ---



--- insert_data_16 authors ---
ALTER SEQUENCE authors_id_seq RESTART WITH 1;

INSERT INTO authors (full_name, nationality, active_since, about, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('Asti Musman', 'Indonesia', null, null, 'superadmin1', '2025-06-05 15:50:01', 'superadmin1', '2025-06-05 15:50:01', null, null);
INSERT INTO authors (full_name, nationality, active_since, about, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('Wahidah Murriska', 'Indonesia', null, 'Memiliki pengalaman kerja sebagai English translator di Perpustakaan Ganesa, Sukoharjo (2015), English teacher di Erje Privat (2016), dan Writer di Sanggar Bahasa Yogyakarta (2017). Latar belakang pendidikannya adalah Sastra Inggris, Fakultas Ilmu Budaya, Universitas Sebelas Maret, dan Ilmu Linguistik, Fakultas Ilmu Budaya, Universitas Gadjah Mada', 'superadmin1', '2025-06-05 15:50:01', 'superadmin1', '2025-06-05 15:50:01', null, null);
INSERT INTO authors (full_name, nationality, active_since, about, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES ('Greg McKeown', 'Inggris', null, null, 'superadmin1', '2025-06-05 15:50:01', 'superadmin1', '2025-06-05 15:50:01', null, null);
--- end_insert_data_16 ---



--- insert_data_17 book_authors ---
INSERT INTO book_authors (author_id, book_id, created_by, created_at, updated_by, updated_at) VALUES (1, 1, 'superadmin1', '2025-06-05 15:50:01', 'superadmin1', '2025-06-05 15:50:01');
INSERT INTO book_authors (author_id, book_id, created_by, created_at, updated_by, updated_at) VALUES (2, 2, 'superadmin1', '2025-06-05 15:50:01', 'superadmin1', '2025-06-05 15:50:01');
INSERT INTO book_authors (author_id, book_id, created_by, created_at, updated_by, updated_at) VALUES (3, 3, 'superadmin1', '2025-06-05 15:50:01', 'superadmin1', '2025-06-05 15:50:01');
--- end_insert_data_17 ---



--- insert_data_18 book_reservations ---
ALTER SEQUENCE book_reservations_id_seq RESTART WITH 1;

INSERT INTO book_reservations (member_id, book_id, start_date, end_date, is_completed, is_cancelled, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES (7, 1, '2025-06-12 15:50:01', '2025-06-14 23:59:59', FALSE, FALSE, 'pustakawan1', '2025-06-08 15:50:01', 'pustakawan1', '2025-06-08 15:50:01', null, null);
INSERT INTO book_reservations (member_id, book_id, start_date, end_date, is_completed, is_cancelled, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES (6, 2, '2025-06-14 15:50:01', '2025-06-20 23:59:59', FALSE, FALSE, 'pustakawan1', '2025-06-09 15:50:01', 'pustakawan1', '2025-06-09 15:50:01', null, null);
--- end_insert_data_18 ---



--- insert_data_19 book_loans ---
ALTER SEQUENCE book_loans_id_seq RESTART WITH 1;

INSERT INTO book_loans (member_id, book_id, start_date, end_date, returned_date, is_returned, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES (1, 1, '2025-06-06 15:50:01', '2025-06-13 23:59:59', '2025-06-13 11:00:00', TRUE, 'pustakawan1', '2025-06-06 15:50:01', 'pustakawan1', '2025-06-13 11:00:00', null, null);
INSERT INTO book_loans (member_id, book_id, start_date, end_date, returned_date, is_returned, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES (2, 2, '2025-06-06 15:50:01', '2025-06-13 23:59:59', '2025-06-13 15:21:33', TRUE, 'pustakawan1', '2025-06-06 15:50:01', 'pustakawan1', '2025-06-13 15:21:33', null, null);
INSERT INTO book_loans (member_id, book_id, start_date, end_date, returned_date, is_returned, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES (3, 3, '2025-06-06 15:50:01', '2025-06-13 23:59:59', '2025-06-13 09:10:13', TRUE, 'pustakawan2', '2025-06-06 15:50:01', 'pustakawan2', '2025-06-13 09:10:13', null, null);
INSERT INTO book_loans (member_id, book_id, start_date, end_date, returned_date, is_returned, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES (4, 1, '2025-06-07 15:50:01', '2025-06-14 23:59:59', null, FALSE, 'pustakawan2', '2025-06-07 15:50:01', 'pustakawan2', '2025-06-07 15:50:01', null, null);
INSERT INTO book_loans (member_id, book_id, start_date, end_date, returned_date, is_returned, created_by, created_at, updated_by, updated_at, deleted_by, deleted_at) VALUES (5, 2, '2025-06-13 11:30:01', '2025-06-20 23:59:59', null, FALSE, 'pustakawan1', '2025-06-13 11:30:01', 'pustakawan1', '2025-06-13 11:30:01', null, null);
--- end_insert_data_19 ---


--- insert_data_20 loan_violations ---
INSERT INTO loan_violations (book_loan_id, violation_id, created_by, created_at, deleted_by, deleted_at) VALUES (1, 9, 'pustakawan1', '2025-06-01 15:50:01',null,null) ;
INSERT INTO loan_violations (book_loan_id, violation_id, created_by, created_at, deleted_by, deleted_at) VALUES (3, 9, 'pustakawan2', '2025-06-01 15:50:01',null,null) ;
--- end_insert_data_20 ---