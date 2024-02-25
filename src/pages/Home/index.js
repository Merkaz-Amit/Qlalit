import * as React from 'react';
import MainImage from './mainImage'
import newAppointmentButton from '../NewAppointmentButton';

const Home = () => {
    document.title = 'Home'
    return (
        <>
            <MainImage />
            {newAppointmentButton}

        </>
    );
};

export default Home;
