from db import get_connection

def run_sql_file():
    with open("init.sql", "r", encoding="utf-8") as f:
        sql = f.read()

    conn = get_connection()
    cur = conn.cursor()

    # 避免多语句报错：一条条执行（按分号切分）
    for statement in sql.split(';'):
        stmt = statement.strip()
        if stmt:
            cur.execute(stmt + ';')

    conn.commit()
    cur.close()
    conn.close()
    print("✅ 数据库初始化完成！")

if __name__ == "__main__":
    run_sql_file()
