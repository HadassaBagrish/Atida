import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listProduces: [],
  }

  export const producesSlice=createSlice({
    name:'produces',
    initialState,

    reducers: {
        getProduces:(state, action)=>{
            console.log("reducer_sharing");
            console.log("action.payload",action.payload);
            state.listProduces = (action.payload); 
        },
        addProduces: (state, action)=>{
          state.listProduces.concat(action.payload);
        }
    } 
  })
  export const {getProduces, addProduces, } = producesSlice.actions;

  export default producesSlice.reducer;