import axios from "axios";
import { getCities,addCities } from "../reducer/cityReducer";

export const getCitiesMidd = ({ dispatch, getState }) => next => action => {
    switch (action.type) {
        case 'GET_CITIES':
            axios.get('http://127.0.0.1:5000/city/get_all')
                .then((response) => { 
                    dispatch(getCities(response.data.cities));
                })
                .catch((error) => {
                    console.error('error', error);
                });
            break;
            case 'cities/addCities':
                const name = action.payload;
                if (name) {
                    axios.put(`http://127.0.0.1:5000/city/add/${name}`)
                    break;
                        // .then((response) => {
                        //     dispatch(addProduces(response.data));
                        //     console.log('middleware: ADD_PATIENT');
                        // })
                        // .catch((error) => {
                        //     console.error('error', error);
                        // });
                }
                break;

    }
    return next(action);
};
