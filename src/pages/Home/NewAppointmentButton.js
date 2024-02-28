import { Link } from 'react-router-dom';
import * as React from 'react';
function newAppointmentButton() {
    return(
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', fontFamily: 'Inter'}}>
                <Link to="/new-appointment" style={{
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
                    cursor: 'pointer', 
                    width: '150px',
                    height: '50px',
                    textAlign: 'center',
                    marginTop: '30px',
                    marginBottom: '30px',
                    lineHeight: '3'

                }}>
                    New Appointment
                </Link>

            </div>
    )
}
export default newAppointmentButton();