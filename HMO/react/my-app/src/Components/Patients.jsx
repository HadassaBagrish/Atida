import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { deletePatient,getPatients } from '../redux/reducer/patientsReducer';

export default function Patients() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const listPatients = useSelector(state => state.patients.listPatients);

    useEffect(() => {
        dispatch({ type: 'GET_PATIENTS'});
    }, [dispatch]);

    const [displayUsers, setDisplayUsers] = useState(false);
    const [displayDelete, setDisplayDelete] = useState(false);
    const [idToDelete, setIdToDelete] = useState('');

    const addClick = () => {
        navigate('/AddPatient');
    };

    const handleDelete = () => {
        dispatch(deletePatient(idToDelete));
        alert('delete clicked!');
    };

    const delClick = () => (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    value={idToDelete}
                    onChange={(e) => setIdToDelete(e.target.value)}
                    label="ID to Delete"
                    name="idToDelete"
                    autoComplete="id"
                />
            </Grid>
            <Grid item xs={12}>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleDelete}
                >
                    Delete
                </Button>
            </Grid>
        </Grid>
    );

    const upClick = () => {
        alert('update clicked!');
    };

    return (
        <> 
            <div>
                <Button variant="contained" onClick={addClick} style={{ left: '50px' }}>
                    Add
                </Button>
                <Button variant="contained" onClick={() => setDisplayDelete(!displayDelete)} style={{ left: '60px' }}>
                    Delete
                </Button>
                <Button variant="contained" onClick={upClick} style={{ left: '70px' }}>
                    Update
                </Button>

                <button variant="contained" onClick={() => setDisplayUsers(!displayUsers)} style={{ left: '200px' }}>
                    {displayUsers ? 'Hide Users' : 'Show Users'}
                </button>
                {displayUsers && (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {listPatients.map((patient) => (
            <div key={patient.id} style={{ width: '150px', margin: '10px' }}>
                <h2>{`${patient.first_name} ${patient.last_name}`}</h2>
                <p><strong>ID:</strong> {patient.id}</p>
                <p><strong>Address:</strong> {patient.address}</p>
                <p><strong>Date of Birth:</strong> {patient.date_of_birth}</p>
                <p><strong>Phone:</strong> {patient.phone}</p>
                <p><strong>Mobile Phone:</strong> {patient.mobile_phone}</p>
                <p><strong>Positive:</strong> {patient.positive}</p>
                <p><strong>Recovery:</strong> {patient.recovery}</p>
            </div>
        ))}
    </div>
)}



                {displayDelete && delClick()}
            </div>
        </>
    );
}
