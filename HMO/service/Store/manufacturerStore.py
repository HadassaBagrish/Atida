import sqlite3
from flask import Flask, request, jsonify


def connect_to_database():
    db_path = '../data/database.db'
    conn = sqlite3.connect(db_path)
    return conn




def add_facture(name):
    conn = connect_to_database()
    c = conn.cursor()
    c.execute("select name from manufacturer where name=?", (name ,))
    facture = c.fetchone()
    if facture is None:
        c.execute("INSERT INTO manufacturer (name) VALUES (?)", (name,))
        conn.commit()
        conn.close()
        return jsonify({'message': 'Manufacturer added successfully'}), 201
    else:
        return jsonify({'message': 'manufacturer already exist '})

def get_all_manufacturers():
    conn = connect_to_database()
    c = conn.cursor()
    try:
        c.execute("SELECT * FROM manufacturer")
        manufacturers = c.fetchall()
        formatted_manufacturers = [{'id': man[0], 'name': man[1]} for man in manufacturers]
        return jsonify({'manufacturers': formatted_manufacturers}), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500
    finally:
        conn.close()
