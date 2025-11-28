CREATE TABLE book_loan_returns
(
  id serial,
  book_loan_id int references book_loans(id) on delete cascade on update cascade,
  created_by varchar(25),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  primary key (id)
);

