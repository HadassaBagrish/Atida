import React from "react";
import Header from "./Header";

const sections = [
    { title: 'Patients', url: '/Patients' },
    { title: 'back', url: '/' },
    { title: 'vaccination', url: '/Vaccination' },
];

export default function Menu(){    
    return(
        <>        
            <Header title="BACACLICK" sections={sections} style={{left:"50px", title:"HMO"}} />        
        </>
    );    
}
