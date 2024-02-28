import * as React from 'react';
import MainImage from './mainImage'
import NewAppointmentButton from './NewAppointmentButton';

const Home = () => {
    document.title = 'Home'
    return (
        <>
            <MainImage/>
            <NewAppointmentButton/>

        </>
    );
};

export default Home;
