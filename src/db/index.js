const postgres = require('postgres');

const sql = postgres('postgres://postgres:123@localhost:5432/library-management', {
// const sql = postgres('postgres://', {
  // host                 : 'localhost',            // Postgres ip address[es] or domain name[s]
  // port                 : 5432,          // Postgres server port[s]
  path                 : '',            // unix socket path (usually '/tmp')
  // database             : 'library-management',            // Name of database to connect to
  // username             : 'postgres',            // Username of database user
  // password             : '123',            // Password of database user
  ssl                  : false,         // true, prefer, require, tls.connect options
  max                  : 10,            // Max number of connections
  max_lifetime         : null,          // Max lifetime in seconds (more info below)
  idle_timeout         : 0,             // Idle connection timeout in seconds
  connect_timeout      : 30,            // Connect timeout in seconds
  prepare              : true,          // Automatic creation of prepared statements
  types                : [],            // Array of custom types, see more below
})

export default sql