import axios from "axios";
import { getProduces,addProduces } from "../reducer/producesReducer";

export const getProducesMidd = ({ dispatch, getState }) => next => action => {
    switch (action.type) {
        case 'GET_PRODUCES':
            axios.get('http://127.0.0.1:5000/manufacturer/get_all')
                .then((response) => {
                    dispatch(getProduces(response.data.manufacturers));
                })
                .catch((error) => {
                    console.error('error', error);
                });
            break;

            case 'produces/addProduces':
                const name = action.payload;
                if (name) {
                    axios.put(`http://127.0.0.1:5000/manufacturer/add/${name}`)
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
