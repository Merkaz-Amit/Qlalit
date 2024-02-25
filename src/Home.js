import * as React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    document.title = 'Home'
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
                <img
                    src="https://t3.ftcdn.net/jpg/03/72/16/74/360_F_372167479_R6w10vAq0KYSqriDyrbfBGkA6j6gJlDa.jpg"
                    alt="Our Patients"
                    className="photo"
                    style={{ width: '2000px', height: '857px' }}
                />
            </div>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', fontFamily: 'Inter'}}>
                <Link to="/newappointment" style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: '1',
                    backgroundColor: '#e27474',
                    color: 'white',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '5px',
                    textDecoration: 'none',
                    display: 'inline-block', 
                    cursor: 'pointer' 
                    
                }}>
                    New Appointment
                </Link>

            </div>

        </>
    );
};

export default Home;
