import * as React from 'react';
import mainImage from './pages/mainImage'
import newAppointmentButton from './pages/NewAppointmentButton';

const Home = () => {
    document.title = 'Home'
    return (
        <>
            {mainImage()}
            {newAppointmentButton}

        </>
    );
};

export default Home;
