from DTO import Patient, Vaccination
import sqlite3
from flask import Flask, request, jsonify
from datetime import datetime, timedelta

vaccinations_list = []


def connect_to_database():
    db_path = '../data/database.db'
    conn = sqlite3.connect(db_path)
    return conn


def get_by_vaccine_id(patient_id):
    if patient_id is None:
        return "Invalid patient ID", 400
    conn = connect_to_database()
    c = conn.cursor()
    c.execute("SELECT * FROM Vaccines WHERE patient_id=?", (patient_id,))
    vaccines = c.fetchall()
    conn.close()
    if vaccines:
        return jsonify(vaccines)
    else:
        return f"No vaccines found for patient {patient_id}", 404


def delete_vaccine(vaccine_id):
    conn = connect_to_database()
    c = conn.cursor()
    c.execute("SELECT * FROM vaccines WHERE vaccine_id=?", (vaccine_id,))
    vaccine = c.fetchone()
    if vaccine:
        c.execute("DELETE FROM vaccines WHERE vaccine_id=?", (vaccine_id,))
        conn.commit()
        conn.close()
        return f"Vaccine with ID {vaccine_id} deleted successfully"
    else:
        conn.close()
        return f"Vaccine with ID {vaccine_id} not found"

def get_vaccinations():
    conn = connect_to_database()
    c = conn.cursor()
    try:
        c.execute("select * from vaccines")
        vaccines = c.fetchall()
        formatted_vaccines = [{'vaccine_id': vaccine[3] ,'patient_id': vaccine[0], 'date': vaccine[1],'manufacturer':vaccine[2] } for vaccine in vaccines]
        return jsonify({'vaccines': formatted_vaccines}), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500
    finally:
        conn.close()


def add_vaccine(vaccina_data):
    patient_id = vaccina_data.patient_id
    date = vaccina_data.date
    manufacturer = vaccina_data.manufacturer
    conn = connect_to_database()
    c = conn.cursor()
    c.execute("SELECT * FROM Patients WHERE id=?", (patient_id,))
    patient = c.fetchone()
    if patient:
        c.execute("SELECT COUNT(*) FROM vaccines WHERE patient_id=?", (patient_id,))
        vaccine_count = c.fetchone()[0]
        if vaccine_count < 4:
            c.execute("INSERT INTO vaccines (patient_id, date, manufacturer) VALUES (?, ?,?)",
                      (patient_id, date, manufacturer))
            conn.commit()
            conn.close()
            return f"Vaccine '{manufacturer}' added successfully for patient {patient_id}"
        else:
            conn.close()
            return jsonify({'message': 'Patient {patient_id} has already received 4 vaccines'}), 400

def update_vaccine(vaccine_id, updated_data):
    conn = connect_to_database()
    c = conn.cursor()
    c.execute("SELECT * FROM vaccines WHERE vaccine_id=?", (vaccine_id,))
    vaccine = c.fetchone()
    if vaccine:
        c.execute("UPDATE vaccines SET date=?, manufacturer=? WHERE vaccine_id=?",
                  (updated_data.date, updated_data.manufacturer, vaccine_id))
        conn.commit()
        conn.close()
        return f"Vaccine with ID {vaccine_id} updated successfully"
    else:
        conn.close()
        return f"Vaccine with ID {vaccine_id} not found"

