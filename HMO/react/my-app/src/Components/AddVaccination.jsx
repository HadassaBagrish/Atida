import React, { useRef, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addVaccin, updateVaccin } from "../redux/reducer/vaccinationReducer";
import { addProduces } from "../redux/reducer/producesReducer";

export default function AddVaccination({ isUpdate, vaccineDetails }) {
  const location = useLocation();
  const { state } = location;
  const vaccineToUpdate = state && state.vaccineToUpdate; // הוספת בדיקה שה-state קיים ושיש בו את ה-vaccineToUpdate

  const dispatch = useDispatch();
  const [selectedManufacturer, setSelectedManufacturer] = useState("");
  useEffect(() => {
    dispatch({ type: 'GET_PRODUCES'});
  }, []);

  const patientIdRef = useRef(null);
  const dateRef = useRef(null);
  const manufacturerRef = useRef(null);
  const [newManufacturer, setNewManufacturer] = useState("");

  useEffect(() => {
    if (vaccineToUpdate) {
      setSelectedManufacturer(vaccineToUpdate.manufacturer);
      patientIdRef.current.value = vaccineToUpdate.patient_id;
      dateRef.current.value = vaccineToUpdate.date;
    }
  }, [vaccineToUpdate]);

  const insertVaccin = () => {
    const formData = {
      patient_id: patientIdRef.current.value,
      date: dateRef.current.value,
      manufacturer: parseInt(selectedManufacturer),
    };
    dispatch(addVaccin(formData));
  };

  const updateVaccinHandler = () => {
    const formData = {
        id: vaccineToUpdate.vaccine_id,
        patient_id: patientIdRef.current.value,
        date: dateRef.current.value,
        manufacturer: parseInt(selectedManufacturer),
    };
    dispatch(updateVaccin(formData));
  };

  const handleAddManufacturer = () => {
    if (manufacturerRef){
        dispatch(addProduces(newManufacturer));
    }
  };

  return (
    <>
      <h1>{isUpdate ? "Update" : "Add"} Vaccination</h1>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="given-name"
            name="firstName"
            required
            fullWidth
            id="firstName"
            type= "number"
            label="Patient ID"
            autoFocus
            inputRef={patientIdRef}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="date"
            label="Date"
            type="date"
            name="date"
            autoComplete="family-name"
            inputRef={dateRef}
          />
        </Grid>

        <Grid item xs={12} sm={6}>

        <select
            value={selectedManufacturer}
            onChange={(e) => {
                setSelectedManufacturer(e.target.value);
            }}
            style={{ width: "100%", padding: "10px" }}
        >
            <option value="">Select Manufacturer</option>
            {(useSelector((state) => state.produces.listProduces)).map((manufacturer) => (
                <option key={manufacturer.id} value={manufacturer.id}>
                    {manufacturer.name}
                </option>
            ))}
        </select>
          <TextField
            required
            fullWidth
            id="newManufacturer"
            label="New Manufacturer"
            name="newManufacturer"
            value={newManufacturer}
            onChange={(e) => setNewManufacturer(e.target.value)}
          />
          
          <Button
            type="button"
            variant="contained"
            onClick={handleAddManufacturer}
            style={{ marginTop: "10px" }}
          >
            Add New Manufacturer
          </Button>
        </Grid>
      </Grid>

      <Button
        type="button"
        fullWidth
        variant="contained"
        onClick={isUpdate ? updateVaccinHandler : insertVaccin} // שינוי קטן כאן
        style={{ marginTop: "20px" }}
      >
        {isUpdate ? "Update" : "Add"}
      </Button>
    </>
  );
}
