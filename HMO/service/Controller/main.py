import sys
from flask import Flask, request, jsonify, json
from flask_cors import CORS
import sqlite3
from Store import patientsStore as pt, vaccinesStore as vc, manufacturerStore as mn ,CityStore
from DTO.Patient import Patient as p
from DTO.Vaccination import Vaccination as v



app = Flask(__name__)
CORS(app)
DATABASE = '../data/database.db'




@app.route('/vaccines/get_by_id/<int:patient_id>', methods=['GET'])
def get_by_vaccine_id(patient_id):
    return vc.get_by_vaccine_id(patient_id)


@app.route('/vaccines/delete/<string:vaccine_id>', methods=['DELETE'])
def delete_vaccine(vaccine_id):
    return vc.delete_vaccine(vaccine_id)


@app.route('/vaccines/update', methods=['PUT'])
def update_vaccine():
    updated_data = request.json
    vaccine_id = updated_data.get('id')
    patient_id = updated_data.get('patient_id')
    date = updated_data.get('date')
    manufacturer = updated_data.get('manufacturer')
    updated_data = v(patient_id, date, manufacturer)
    result = vc.update_vaccine(vaccine_id, updated_data)
    return jsonify({'message': result}), 200


@app.route('/vaccines/add', methods=['GET','POST'])
def add_vaccine():
    vaccina_data = request.json
    vaccina_data = v(**vaccina_data)
    return vc.add_vaccine(vaccina_data)

@app.route('/vaccines/get_all', methods=['PUT','GET'])
def get_vaccinations():
    return vc.get_vaccinations()

@app.route('/patients/get_positive_of_month', methods=['GET'])
def get_positive_of_month():
    return vc.get_positive_of_month()

@app.route('/patients/add', methods=['GET','POST'])
def add_patient():
    patient_data = request.json

    patient_data = p(**patient_data)

    return pt.add_patient(patient_data)





@app.route('/patients/get_all', methods=['GET'])
def get_patients():
    return pt.get_patients()



@app.route('/patients/get_by_id/<int:id>', methods=['GET'])
def get_patient_by_id(id):
  return pt.get_patient_by_id(id)





@app.route('/patients/delete/<string:id>', methods=['DELETE'])
def delete_patient(id):
    return pt.delete_patient(id)

@app.route('/patients/update/<int:id>', methods=['PUT'])
def update_patient(id):
    return pt.update_patient(id)



@app.route('/manufacturer/add/<string:name>', methods=['PUT', 'GET','POST'])
def add_manufacturer(name):
    return mn.add_facture(name)

@app.route('/manufacturer/get_all', methods=['GET'])
def get_all_manufacturers():
    return mn.get_all_manufacturers()


@app.route('/city/add/<string:name>', methods=['PUT', 'GET','POST'])
def add_city(name):
    return CityStore.add_city(name)

@app.route('/city/get_all', methods=['GET'])
def get_all_city():
    return CityStore.get_all_city()





if __name__ == "__main__":
    vaccinations_list = []
    patients_list = []
    app.run(debug=False)

