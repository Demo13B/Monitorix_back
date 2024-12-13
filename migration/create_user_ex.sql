-- Create a user
CREATE USER [user name] WITH PASSWORD [password];

GRANT CONNECT ON DATABASE [database name] TO [user name];
GRANT USAGE ON SCHEMA [schema name] TO [user name];

GRANT SELECT, INSERT, DELETE ON ALL TABLES IN SCHEMA $4 TO [user name];

GRANT USAGE ON SEQUENCE [sequence name] TO [user name];