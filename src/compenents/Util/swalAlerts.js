import Swal from "sweetalert2";
import jsonParse from "./jsonParse";

const SwalAlerts= (alertType, params, resultFunction) => {
    if (alertType == 'appointmentDelete') {
        Swal.fire({
            title: ("Appointments have been deleted!"),
            icon: "success",
            confirmButtonColor: "#d33",
            confirmButtonText: "close",
            allowOutsideClick: false,
            allowEscapeKey: false,
        }).then((result) => {
            if (result.isConfirmed) {
                return (resultFunction);
            }
        })
    }
    if (alertType == 'appointmentFormSubmission') {
        Swal.fire({
            title: "Success!",
            text: "The Appointment Was Added!",
            icon: "success",
          }).then(function() {
            window.location = "/search-appointments";
          });
    }
    if(alertType=='assignDoctor'){
        Swal.fire({
            title: 'Success!',
            text: 'This day was assigned to the doctor!',
            icon: 'success',
        }).then(function() {
            window.location = "/available-dates";
          });
    }
    if (alertType == 'doctorDelete') {
        Swal.fire({
            title: ("Doctor is jobless!"),
            icon: "success",
            confirmButtonColor: "#d33",
            confirmButtonText: "close",
            allowOutsideClick: false,
            allowEscapeKey: false,
        }).then((result) => {
            if (result.isConfirmed) {
                return (resultFunction);
            }
        })
    }
    if(alertType=='newDoctor'){
        Swal.fire({
            title: "Enter Doctor's Name",
            input: "text",
            inputLabel: "Doctor's Name:",
            showCancelButton: true,
            inputValidator: (value) => {
                const doctorsNames = jsonParse('doctorsNames');
                const newDoctor = { label: value, value: value };
                doctorsNames.push(newDoctor);
                localStorage.setItem('doctorsNames', JSON.stringify(doctorsNames));
                console.log(value);
                alert(`Dr. ${value} was added to the system!`)
            }
        }).then(function() {
            window.location = "/doctor-management";
          });
    }
}


export default SwalAlerts;