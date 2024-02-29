import * as React from 'react';
import MainImage from './mainImage'
import ButtonLink from '../../compenents/Util/Buttons';

const Home = () => {
    document.title = 'Home'
    return (
        <>
            <MainImage/>
            {ButtonLink("mainButton","/new-appointment", "New Appointmant")}
        </>
    );
};

export default Home;
