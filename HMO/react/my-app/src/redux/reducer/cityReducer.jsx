import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listCities: [],
  }

  export const citiesSlice=createSlice({
    name: 'cities',
    initialState,

    reducers: {
        getCities:(state, action)=>{
            console.log("reducer_cities");
            console.log("action.payload",action.payload);
            state.listCities = (action.payload);
        },
        addCities: (state, action)=>{
          state.listCities.concat(action.payload);
        },
        
    }
  })
  export const {getCities, addCities} = citiesSlice.actions;

  export default citiesSlice.reducer;