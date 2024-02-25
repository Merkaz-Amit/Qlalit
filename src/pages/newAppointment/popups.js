import Swal from 'sweetalert2'
function Popups(x){
    if (x==="Success"){
        Swal.fire({
            title: "Success!",
            text: "The Appointment Was Added!",
            icon: "success"
                })}
    if(x==="DateError"){
        Swal.fire({
            title: "Error!",
            text: "You Forgot To Add A Date!",
            icon: "error"
        })
    }
}
export default Popups();