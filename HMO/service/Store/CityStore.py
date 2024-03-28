import sqlite3
from flask import Flask, request, jsonify


def connect_to_database():
    db_path = '../data/database.db'
    conn = sqlite3.connect(db_path)
    return conn


def add_city(name):
    conn = connect_to_database()
    c = conn.cursor()
    c.execute("SELECT name FROM city WHERE name=?", (name,))
    city = c.fetchone()
    if city is None:
        c.execute("INSERT INTO city (name) VALUES (?)", (name,))
        conn.commit()
        conn.close()
        return jsonify({'message': 'City added successfully'}), 201
    else:
        conn.close()
        return jsonify({'message': 'City already exists'})


def get_all_city():
    conn = connect_to_database()
    c = conn.cursor()
    try:
        c.execute("SELECT * FROM city")
        cities = c.fetchall()
        formatted_cities = [{'id': city[0], 'name': city[1]} for city in cities]
        return jsonify({'cities': formatted_cities}), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500
    finally:
        conn.close()
