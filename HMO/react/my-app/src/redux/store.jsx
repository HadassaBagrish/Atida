import { configureStore } from "@reduxjs/toolkit";
import { getPatientsMidd } from './middleware/patientsMiddleware';
import { getVaccinesMidd } from './middleware/vaccinationMiddleware';
import { getProducesMidd } from "./middleware/producesMiddleware";
import { getCitiesMidd } from "./middleware/cityMiddleware";
import patientsReducer from "./reducer/patientsReducer";
import vaccinationReducer from "./reducer/vaccinationReducer";
import producesReducer from "./reducer/producesReducer";
import cityReducer from "./reducer/cityReducer";

export const store = configureStore({
    reducer: {
        patients: patientsReducer,
        vaccines: vaccinationReducer,
        produces: producesReducer,
        cities:cityReducer
    },
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware({ serializableCheck: false }),
        getPatientsMidd,
        getVaccinesMidd,
        getProducesMidd,
        getCitiesMidd,
    ]
});
