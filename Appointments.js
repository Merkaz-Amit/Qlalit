
import * as React from 'react';



function MyFrm() {
    document.title = 'Available  Appointments'
    const allAppointments = JSON.parse(localStorage.getItem('formData')) || [];
    return (
        <div>
            <h1>Appointments</h1>
            <table>
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Age</th>
                        <th>Medical Type</th>
                        <th>Reason</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>

                    {allAppointments.map((appointments , index) => (
                        <tr key={index}>
                            <td>{appointments.fullName}</td>
                            <td>{appointments.age}</td>
                            <td>{appointments.medicalHelp}</td>
                            <td>{appointments.reason}</td>
                            <td>{appointments.selectedDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default MyFrm;
