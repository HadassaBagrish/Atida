import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listVaccines: [],
  selectedVaccine: [],

  }

  export const vaccinesSlice=createSlice({
    name:'vaccines',
    initialState,

    reducers: {
        getVaccines:(state, action)=>{
            console.log("reducer_sharing");
            console.log("action.payload",action.payload);
            state.listVaccines = (action.payload);
        },
        addVaccin: (state, action)=>{
          state.listVaccines.push(action.payload);
        },
        deleteVaccin: (state, action)=>{
          const vaccinIdToDelete = action.payload;
          state.listVaccines = state.listVaccines.filter(patient => patient.id !== vaccinIdToDelete);
         },
         getVaccinesById: (state, action) => {
          const patientId = action.payload;
          state.selectedVaccine = (action.payload);
        }, 
         updateVaccin: (state, action) => {
          const updatedVaccine = action.payload;
          state.listVaccines = state.listVaccines.map(vaccine => {
            if (vaccine.id === updatedVaccine.id) {
              return updatedVaccine;
            }
            return vaccine;
          });
        }
      }
  })
  export const {getVaccines, addVaccin, deleteVaccin, getVaccinesById ,updateVaccin} = vaccinesSlice.actions;

  export default vaccinesSlice.reducer;