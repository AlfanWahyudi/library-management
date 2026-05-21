CREATE TABLE replace_lost_book_loans
(
  id serial,
  lost_book_loan_id int references lost_book_loans(id) on delete cascade on update cascade,
  replace_by_member boolean not null,
  created_by varchar(25),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  primary key (id)
);

