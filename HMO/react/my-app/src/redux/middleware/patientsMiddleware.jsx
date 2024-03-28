import axios from "axios";
import { getPatients, addPatient, deletePatient,getPatientsByMonth,getPatientById } from "../reducer/patientsReducer";

export const getPatientsMidd = ({ dispatch, getState }) => next => action => {
    switch (action.type) {
        case 'GET_PATIENTS':
            axios.get('http://127.0.0.1:5000/patients/get_all')
                .then((response) => {
                    dispatch(getPatients(response.data));
                })
                .catch((error) => {
                    console.error('error', error);
                });
            break;

        case 'patients/addPatient':
            const newPatient = action.payload;
            axios.post("http://127.0.0.1:5000/patients/add", newPatient)
                .then((response) => {
                    dispatch(addPatient(response.data));
                    console.log('middleware: ADD_PATIENT');
                })
                .catch((error) => {
                    console.error('error', error);
                });
            break;

        case 'patients/deletePatient':
            const patientIdToDelete = action.payload;
            axios.delete(`http://127.0.0.1:5000/patients/delete/${patientIdToDelete}`)
                .then(() => {
                    dispatch(deletePatient(patientIdToDelete));
                    console.log('middleware: DELETE_PATIENT');
                })
                .catch((error) => {
                    console.error('error', error);
                });
            break;
        case 'patients/getPatientsByMonth':
            axios.get('http://127.0.0.1:5000/patients/get_positive_of_month')
        .then((response) => {
            dispatch(getPatientsByMonth(response.data));
        })
        .catch((error) => {
            console.error('error', error);
        });
    break;
    case 'patients/getPatientById':
            const patientIdToFind = action.payload; 
            axios.get(`http://127.0.0.1:5000/patients/get_by_id/${patientIdToFind}`)
                .then((response) => {
                    dispatch(getPatientById(response.data));                    
                    console.log('middleware: Find_VACCINE'); 
                    
                })              
                .catch((error) => {
                    console.error('error', error);
                });
            break;

    }
    return next(action);
};
