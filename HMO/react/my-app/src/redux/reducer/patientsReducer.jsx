import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listPatients: [],
    patient:[],
    siks:[],
  }

  export const patientsSlice=createSlice({
    name:'patients',
    initialState,

    reducers: {
        getPatients:(state, action)=>{
            console.log("reducer_patients");
            console.log("action.payload",action.payload);
            state.listPatients = (action.payload);
        },
        addPatient: (state, action)=>{
          state.listPatients.concat(action.payload);
        },
        deletePatient: (state, action)=>{
          const patientIdToDelete = action.payload;
          state.listPatients = state.listPatients.filter(patient => patient.id !== patientIdToDelete); 
           },
           
          getPatientsByMonth:(state, action)=>{
             state.siks=(action.payload);
          },
          getPatientById: (state, action) => {
            const patientId = action.payload;
            state.patient = (action.payload);
          }
    }
  })
  export const {getPatients, addPatient, deletePatient,getPatientsByMonth, getPatientById} = patientsSlice.actions;

  export default patientsSlice.reducer;