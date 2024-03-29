import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { deleteVaccin,getVaccinesById } from '../redux/reducer/vaccinationReducer';

export default function Vaccination() {
    const navigate = useNavigate();
    const dispatch = useDispatch(); 
    const listVaccines = useSelector((state) => state.vaccines.listVaccines);
     useEffect(() => {
         dispatch({ type: 'GET_VACCINES'});
     }, [dispatch]); 
    const listPatients = useSelector((state) => state.patients.listPatients);

    
    const selectedVaccine = useSelector((state) => state.vaccines.selectedVaccine);
    useEffect(() => {
        dispatch({ type: 'GET_PATIENTS'});
    }, [dispatch]);

    
    const [displayUsers, setDisplayUsers] = useState(false);
    const [displayFind, setDisplayFind] = useState(false);
    const [displayDelete, setDisplayDelete] = useState(false);
    const [displayUpdate, setDisplayUpdate] = useState(false);


    const addClick = () => {
        navigate('/AddVaccination');
    };
    

    const handleFind = (idToFind) => {
        const id = listPatients.find(vaccine => vaccine.id === idToFind);
        if(!id) {alert('id patient to fint vaccines not exsist')}
        else{        dispatch(getVaccinesById(idToFind));
        }
    };

    const getClick = () => {
        return (
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="idToFind"
                        label="ID of patientVaccine to find"
                        name="idToFind"
                        autoComplete="id"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={() => handleFind(document.getElementById('idToFind').value)}

                    >
                        Find
                    </Button>
                </Grid>
                {/* {selectedVaccine && selectedVaccine.map((vaccine, index) => (
             <Grid item xs={12} key={index}>
             <p><strong>VACCINE ID:</strong> {vaccine[3]}</p>
             <p><strong>PATIENT ID:</strong> {vaccine[0]}</p>
              <p><strong>DATE:</strong> {vaccine[1]}</p>
            <p><strong>MANUFACTURER:</strong> {vaccine[2]}</p>
                </Grid>
             ))} */}
            </Grid>

            
        );

        
    };

    const handleDelete = () => {
        const idToDelete = document.getElementById('idToDelete').value;
        dispatch(deleteVaccin(idToDelete))
        alert('delete clicked!'); 
    };
    const delClick = () => {
        return (
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="idToDelete"
                        label="ID of vaccine to Delete"
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
    };

    const handleUpdate = (id) => {
        const vaccineToUpdate = listVaccines.find(vaccine => vaccine.vaccine_id === id);
        if (!vaccineToUpdate){alert('the vaccine number isnt exsist')  }
         else{navigate(`/AddVaccination`, { state: { vaccineToUpdate } });}
    };
    

    const upClick = () => {
        return (
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="idToUpdate"
                        label="ID of vaccine to Update"
                        name="idToUpdate"
                        autoComplete="id"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={() => handleUpdate(parseInt(document.getElementById('idToUpdate').value))}
                    >
                        Update
                    </Button>
                </Grid>
            </Grid>
        );
    };


    return (
        <> 
            <div>
                <Button variant="contained" onClick={addClick}>Add</Button>
                <Button variant="contained" onClick={() => setDisplayDelete(!displayDelete)}>Delete</Button>
                <Button variant="contained" onClick={()=>setDisplayUpdate(!displayUpdate)}>Update</Button>
                <Button variant="contained" onClick={() => setDisplayFind(!displayFind)}>Get by id</Button>
                <button variant="contained" onClick={() => setDisplayUsers(!displayUsers)}>
                    {displayUsers ? 'Hide Vaccines' : 'Show Vaccines'}
                </button>
                {displayUsers && (
                    <ul>
                        {listVaccines.map((vaccine) => (
                            <li key={vaccine.id}>
                                <p><strong>PATIENT ID:</strong> {vaccine.id}</p>
                                <p><strong>DATE:</strong> {vaccine.name}</p>
                            </li>
                            
                        ))}
                    </ul>
                )}

                {displayDelete && delClick()}
                {displayUpdate && upClick()}
                {displayFind && getClick()}
            </div>
        </>
    );
}
