import React, { useRef, useState, useEffect } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { addPatient } from "../redux/reducer/patientsReducer";
import { useDispatch, useSelector } from "react-redux";
import { addCities, getCities } from "../redux/reducer/cityReducer";

export default function AddPatient() {

    const dispatch = useDispatch();
    // const citiesList = useSelector((state) => state.cities.listCities); // Assuming you have this state slice
    const listCities=useEffect(() => {
      dispatch({ type: 'GET_CITIES'});
    }, [])
    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const idRef = useRef(null);
    const positiveRef = useRef(null);
    const recoveryRef = useRef(null);
    const dateOfBirthRef = useRef(null);
    const cityRef = useRef(null);
    const phoneRef = useRef(null);
    const mobilePhoneRef = useRef(null);
    const [newCity, setNewCity] = useState("");

    const insertPatient = () => {
        if (!firstNameRef.current.value || !lastNameRef.current.value || !idRef.current.value || !dateOfBirthRef.current.value || !newCity || !phoneRef.current.value || !mobilePhoneRef.current.value) {
            alert('Please fill in all fields');
            return;
        }

        const idRegex = /^[0-9]{9}$/;
        if (!idRegex.test(idRef.current.value)) {
            alert('Please enter a valid ID number (9 digits)');
            return;
        }

        const phoneRegex = /^[0-9]{9}$/;
        if (!phoneRegex.test(phoneRef.current.value)) {
            alert('Please enter a valid phone number (9 digits)');
            return;
        }

        const mobilePhoneRegex = /^[0-9]{10}$/;
        if (!mobilePhoneRegex.test(mobilePhoneRef.current.value)) {
            alert('Please enter a valid mobile phone number (10 digits)');
            return;
        }

        const formData = {
            first_name: firstNameRef.current.value,
            last_name: lastNameRef.current.value,
            id: idRef.current.value,
            date_of_birth: dateOfBirthRef.current.value,
            address: parseInt(newCity),
            phone: phoneRef.current.value,
            mobile_phone: mobilePhoneRef.current.value,
            positive: positiveRef.current.value,
            recovery: recoveryRef.current.value
        };

        dispatch(addPatient(formData));
    };

    const handleAddCity = () => {
        if (newCity) {
            dispatch(addCities(newCity));
        }
    };

    return (
        <>
            <h1>Press patient details</h1>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        autoComplete="given-name"
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                        inputRef={firstNameRef}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="family-name"
                        inputRef={lastNameRef}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        id="id"
                        label="ID"
                        name="id"
                        inputRef={idRef}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        id="date_of_birth"
                        label="Date of Birth"
                        name="date_of_birth"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        inputRef={dateOfBirthRef}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        type="date"
                        id="positive"
                        label="positive date"
                        name="positive"
                        inputRef={positiveRef}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        type="date"
                        id="recovery"
                        label="recovery date"
                        name="recovery"
                        inputRef={recoveryRef}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <select
                        value={newCity}
                        onChange={(e) => setNewCity(e.target.value)}
                        style={{ width: "100%", padding: "10px" }}
                    >
                        <option value="">Select city</option>
                        {(useSelector((state) => state.cities.listCities)).map((city) => (
                            <option key={city.neme} value={city.id}>
                                {city.name}
                            </option>
                        ))}
                    </select>
                    <TextField
                        required
                        fullWidth
                        id="newCity"
                        label="New City"
                        name="newCity"
                        value={newCity}
                        onChange={(e) => setNewCity(e.target.value)}
                    />
                    <Button
                        type="button"
                        variant="contained"
                        onClick={handleAddCity}
                        style={{ marginTop: "10px" }}
                    >
                        Add New City
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        name="phone"
                        label="Phone"
                        type="phone"
                        inputRef={phoneRef}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        name="mobile_phone"
                        label="Mobile Phone"
                        inputRef={mobilePhoneRef}
                    />
                </Grid>
                <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    onClick={insertPatient}
                    sx={{ mt: 3, mb: 2 }}
                >
                    Add
                </Button>
            </Grid>
        </>
    )
};
