-- 清除旧表（按依赖顺序删除）
DROP TABLE IF EXISTS feedback;
DROP TABLE IF EXISTS hidden_users;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS flags;
DROP TABLE IF EXISTS session_data;

-- 创建 feedback 表
CREATE TABLE feedback (
  id SERIAL PRIMARY KEY,
  comment TEXT NOT NULL
);

-- 创建 users 表
CREATE TABLE users (
  username VARCHAR(50) PRIMARY KEY,
  password VARCHAR(100) NOT NULL
);

CREATE TABLE flags (
  id SERIAL PRIMARY KEY,
  flag TEXT NOT NULL
);

-- 创建 hidden_users 表
CREATE TABLE hidden_users (
  hide_username VARCHAR(50) PRIMARY KEY,
  hide_password VARCHAR(100) NOT NULL
);

CREATE TABLE session_data (
  session_id TEXT,
  secret TEXT
);


-- 插入 users 数据
INSERT INTO users (username, password) VALUES
  ('admin', 'secret123'),
  ('alice', 'qwerty'),
  ('bob', 'hunter2');

-- 插入 hidden_users 数据
INSERT INTO hidden_users (hide_username, hide_password) VALUES
  ('hidden_admin', 'hidden_password'),
  ('hidden_alice', 'hidden_qwerty'),
  ('hidden_bob', 'hidden_hunter2');

-- 插入 flags 数据
INSERT INTO flags (flag) VALUES
  ('flag{You_found_the_flag_with_union!}');


INSERT INTO session_data VALUES
  ('abc123', 'The cake is a lie.'),
  ('admin_session', 'flag{case_insensitive_bypass}');
