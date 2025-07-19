# db.py
import psycopg2

def get_connection():
    return psycopg2.connect(
        dbname="shadowdb",       # 你数据库名字
        user="postgres",         # PostgreSQL 用户名
        password="123456",  # 如果设置了密码
        host="localhost",
        port="5432"
    )
