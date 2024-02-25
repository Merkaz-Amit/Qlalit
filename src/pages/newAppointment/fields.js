import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';

function tableFields(fieldType, fieldData){
    if(fieldType==="fullName"){
        return(
        <TextField
            id="fullName"
            name="fullName"
            label="Full Name"
            value={fieldData}
            margin="normal"
            required
            pattern="[a-z]"
            type="text"
            fullWidth
          />
    )}
}
export default tableFields();