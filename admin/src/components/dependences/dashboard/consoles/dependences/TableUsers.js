import { Table, TableHead } from "@mui/material"
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useSelector } from "react-redux";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';

const columns = [
    {
        field: 'name',
        headerName: 'Nombre',
        width: 150,
        editable: false,
        hideable: false
    },
    {
        field: 'apellidos',
        headerName: 'Apellidos',
        width: 200,
        editable: false,
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 250,
        editable: false,
    },
]

const TableUsers = ({users, setSelectedUser}) => {

    const admin = useSelector(state => state.admin)



    return (
            <DataGrid onCellEditStop={e => console.log(e)} onRowClick={e => setSelectedUser(e.row.id)} columns={columns} rows={users} slots={{ toolbar: GridToolbar }} />
    )


}


export default TableUsers
