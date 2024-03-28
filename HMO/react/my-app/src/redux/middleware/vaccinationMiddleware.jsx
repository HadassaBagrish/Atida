import axios from "axios";
import { getVaccines, addVaccin, deleteVaccin, getVaccinesById, updateVaccin} from "../reducer/vaccinationReducer";

export const getVaccinesMidd = ({ dispatch, getState }) => next => action => {
    switch(action.type) {
        case 'GET_VACCINES':
            axios.get('http://127.0.0.1:5000/vaccines/get_all')
                .then((response) => {
                    dispatch(getVaccines(response.data.vaccines)); 
                })
                .catch((error) => {
                    console.error('error', error);
                });
            break;

        case 'vaccines/addVaccin':
            const newVaccine = action.payload; 
            axios.post("http://127.0.0.1:5000//vaccines/add", newVaccine)
                .then((response) => {
                    dispatch(addVaccin(response.data)); 
                    console.log('middleware: ADD_VACCINE'); 
                })
                .catch((error) => {
                    console.error('error', error);
                });
            break;

        case 'vaccines/deleteVaccin':
            const vaccineIdToDelete = action.payload; 
            axios.delete(`http://127.0.0.1:5000/vaccines/delete/${vaccineIdToDelete}`)
                .then((response) => {
                    dispatch(deleteVaccin(response.data));
                    console.log('middleware: DELETE_VACCINE'); 
                })
                .catch((error) => {
                    console.error('error', error);
                });
            break;
        case 'vaccines/getVaccinesById':
            const vaccineIdToFind = action.payload; 
            axios.get(`http://127.0.0.1:5000/vaccines/get_by_id/${vaccineIdToFind}`)
                .then((response) => {
                    dispatch(getVaccinesById(response.data));                    
                    console.log('middleware: Find_VACCINE'); 
                    
                })              
                .catch((error) => {
                    console.error('error', error);
                });
            break;
        case 'vaccines/updateVaccin':
            const updatedVaccine = action.payload; 
            axios.put(`http://127.0.0.1:5000/vaccines/update`, updatedVaccine)
                .then((response) => {
                    dispatch(updateVaccin(response.data)); 
                    console.log('middleware: UPDATE_VACCINE'); 
                })
                .catch((error) => {
                    console.error('error', error);
                });
            break;
    }
    return next(action);
};
