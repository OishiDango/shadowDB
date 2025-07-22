DROP TABLE IF EXISTS feedback;
DROP TABLE IF EXISTS hidden_users;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS flags;
DROP TABLE IF EXISTS session_data;
DROP TABLE IF EXISTS blind_data;

CREATE TABLE feedback (
  id SERIAL PRIMARY KEY,
  comment TEXT NOT NULL
);

CREATE TABLE users (
  username VARCHAR(50) PRIMARY KEY,
  password VARCHAR(100) NOT NULL
);

CREATE TABLE flags (
  id SERIAL PRIMARY KEY,
  flag TEXT NOT NULL
);

CREATE TABLE hidden_users (
  hide_username VARCHAR(50) PRIMARY KEY,
  hide_password VARCHAR(100) NOT NULL
);

CREATE TABLE session_data (
  session_id TEXT,
  secret TEXT
);

CREATE TABLE blind_data (
  id SERIAL PRIMARY KEY,
  session_id TEXT NOT NULL,
  data TEXT NOT NULL
);

INSERT INTO users (username, password) VALUES
  ('admin', 'secret123'),
  ('alice', 'qwerty'),
  ('bob', 'hunter2');

INSERT INTO hidden_users (hide_username, hide_password) VALUES
  ('hidden_admin', 'hidden_password'),
  ('hidden_alice', 'hidden_qwerty'),
  ('hidden_bob', 'hidden_hunter2');

INSERT INTO flags (flag) VALUES
  ('flag{You_found_the_flag_with_union!}');


INSERT INTO session_data VALUES
  ('abc123', 'The cake is a lie.'),
  ('admin_session', 'flag{case_insensitive_bypass}');


INSERT INTO blind_data (id, session_id, data) VALUES
  (1,'abcd', 'flag{You_found_the_flag_with_blind!}'),
  (2,'efgh', 'flag{You_found_the_flag_with_error_based!}');