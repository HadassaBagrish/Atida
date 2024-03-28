import sqlite3
from flask import Flask, request, jsonify
from DTO.Patient import Patient
patients_list = []


def connect_to_database():
    db_path = '../data/database.db'
    conn = sqlite3.connect(db_path)
    return conn


def add_patient(patient_data):
    try:
        conn = connect_to_database()
        c = conn.cursor()
        first_name = patient_data.first_name
        last_name = patient_data.last_name
        id = patient_data.id
        date_of_birth = patient_data.date_of_birth
        address = patient_data.address
        phone = patient_data.phone
        mobile_phone = patient_data.mobile_phone
        positive = patient_data.positive
        recovery = patient_data.recovery
        r = c.execute("SELECT * FROM Patients WHERE id=?", (id,))
        result = r.fetchone()
        if result is None:
            c.execute(
                "INSERT INTO Patients (first_name, last_name, id, address, date_of_birth, phone, mobile_phone,positive,recovery) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
                (first_name, last_name, id, address, date_of_birth, phone, mobile_phone, positive, recovery))
            conn.commit()
            return jsonify({'message': 'Patient added successfully'}), 201
        else:
            return jsonify({'message': 'Patient with this ID already exists'}), 400
    except Exception as e:
        return jsonify({'message': str(e)}), 500
    finally:
        conn.close()


def get_patients():
    conn = connect_to_database()
    c = conn.cursor()
    c.execute(
        "SELECT first_name, last_name, id, address, date_of_birth, phone, mobile_phone, positive, recovery FROM patients")
    patients_list = []
    for row in c.fetchall():
        patients_list.append({
            'first_name': row[0],
            'last_name': row[1],
            'id': row[2],
            'address': row[3],
            'date_of_birth': row[4],
            'phone': row[5],
            'mobile_phone': row[6],
            'positive': row[7],
            'recovery': row[8]
        })
    if patients_list:
        return jsonify(patients_list)
    else:
        return "the patients list is empty"

def get_patient_by_id(id):
    conn = connect_to_database()
    c = conn.cursor()
    c.execute("SELECT * FROM patients WHERE id=?", (id,))
    patient_data = c.fetchone()
    if patient_data:
        return jsonify(patient_data)
    else:
        return "not found id"


def delete_patient(id):
    try:
        conn = connect_to_database()
        c = conn.cursor()
        c.execute("SELECT * FROM patients WHERE id=?", (id,))
        patient = c.fetchone()
        c.execute("DELETE FROM patients WHERE id=?", (id,))
        conn.commit()
        conn.close()
        if patient:
            return jsonify({'message': 'Patient deleted successfully'}), 200
        else:
            return jsonify({'message': 'Patient does not exist'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


def update_patient(id):
    data = request.json
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    address = data.get('address')
    date_of_birth = data.get('date_of_birth')
    phone = data.get('phone')
    mobile_phone = data.get('mobile_phone')
    positive = data.get('positive')
    recovery = data.get('recovery')

    conn = connect_to_database()
    c = conn.cursor()

    update_query = "UPDATE Patients SET "
    params = []

    if first_name:
        update_query += "first_name=?, "
        params.append(first_name)
    if last_name:
        update_query += "last_name=?, "
        params.append(last_name)
    if address:
        update_query += "address=?, "
        params.append(address)
    if date_of_birth:
        update_query += "date_of_birth=?, "
        params.append(date_of_birth)
    if phone:
        update_query += "phone=?, "
        params.append(phone)
    if mobile_phone:
        update_query += "mobile_phone=?, "
        params.append(mobile_phone)
    if positive:
        update_query += "positive=?, "
        params.append(positive)
    if recovery:
        update_query += "recovery=?, "
        params.append(recovery)

    update_query = update_query[:-2]
    update_query += " WHERE id=?"
    params.append(id)
    
    c.execute(update_query, tuple(params))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Patient updated successfully'}), 200




def get_positive_of_month():
    last_month = datetime.date.today().replace(day=1) - datetime.timedelta(days=1)
    first_day_of_last_month = last_month.replace(day=1)

    start_date = first_day_of_last_month
    end_date = last_month
    conn = connect_to_database()
    c = conn.cursor()

    c.execute("SELECT DATE(positive) AS date, COUNT(*) AS patient FROM patients WHERE DATE(positive) BETWEEN ? AND ?  GROUP BY DATE(positive)ORDER BY DATE(positive)", (start_date,end_date,))
    result = c.fetchone()
    return jsonify(result)
