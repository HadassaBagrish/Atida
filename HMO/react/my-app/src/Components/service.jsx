import { observable, action, makeObservable } from 'mobx';
import axios from 'axios';
import { runInAction } from 'mobx';

class PatientDetails {
    
    patients = [  ];

    constructor() {
        makeObservable(this, {
            patients: observable,
            getPatients: action,
            fetchPatients: action,
            addPatient: action,
            updatePatient: action,
            deletePatient: action,
        });

        // Fetch patients upon initialization
        this.getPatients();
    }

    async getPatients() {
        try {
            const response = await axios.get("http://127.0.0.1:5000/patients/get_all");
            this.fetchPatients(response.data); // Call action to update patients
        } catch (error) {
            console.error("Error fetching patients:", error);
        }
        console.log(this.patients);
        return this.patients;
    }

    // Action to update patients
    fetchPatients(data) {        
        this.patients = data;
    }

    async addPatient(patient) {
        try {
            const response = await axios.post("http://127.0.0.1:5000/patients/add", patient);
            runInAction(() => {
                this.patients.push(response.data);
            });
        } catch (error) {
            console.error('Error adding patient:', error);
        }
    }

    async updatePatient(updatedPatient) {
        try {
            const response = await axios.put(`http://127.0.0.1:5000/patients/update/${updatedPatient.id}`, updatedPatient);
            runInAction(() => {
                const index = this.patients.findIndex(patient => patient.id === updatedPatient.id);
                if (index !== -1) {
                    this.patients[index] = response.data;
                }
            });
        } catch (error) {
            console.error('Error updating patient:', error);
        }
    }

    async deletePatient(patientId) {
    try {
        await axios.delete(`http://127.0.0.1:5000/patients/delete/${patientId}`);
        runInAction(() => {
            this.patients = this.patients.filter(patient => patient.id !== patientId);
        });
    } catch (error) {
        console.error('Error deleting patient:', error);
    }
}

}

export default new PatientDetails();
