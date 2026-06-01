"""
Получение заявки из калькулятора и сохранение в базу данных для менеджеров.
"""
import json
import os
import psycopg2
from datetime import datetime


def handler(event: dict, context) -> dict:
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, X-User-Id, X-Auth-Token, X-Session-Id",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    if event.get("httpMethod") != "POST":
        return {"statusCode": 405, "headers": headers, "body": json.dumps({"error": "Method not allowed"})}

    body = json.loads(event.get("body") or "{}")
    name = body.get("name", "").strip()
    phone = body.get("phone", "").strip()
    order_data = body.get("orderData", {})

    if not name or not phone:
        return {
            "statusCode": 400,
            "headers": headers,
            "body": json.dumps({"error": "Имя и телефон обязательны"}, ensure_ascii=False),
        }

    order_type = order_data.get("type", "unknown")
    total = order_data.get("total", 0)
    order_json = json.dumps(order_data, ensure_ascii=False)

    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()

    cur.execute(
        "INSERT INTO orders (client_name, phone, order_type, total, order_data, created_at) VALUES (%s, %s, %s, %s, %s, %s) RETURNING id",
        (name, phone, order_type, total, order_json, datetime.utcnow()),
    )
    order_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()

    return {
        "statusCode": 200,
        "headers": headers,
        "body": json.dumps({
            "success": True,
            "orderId": order_id,
            "message": "Заявка принята. Менеджер свяжется с вами в течение 15 минут.",
        }, ensure_ascii=False),
    }