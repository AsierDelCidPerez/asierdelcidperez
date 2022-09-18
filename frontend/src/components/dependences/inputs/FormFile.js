import { Button } from "@mui/material"

const FormFile = ({name}) => {

    return (
        <Button
            variant="contained"
            component="label"
            >
            Upload File
            <input
                type="file"
                hidden
                multiple
                name={name}
        />
        </Button>
    )
}

export default FormFile