
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';

const TableUser = ({user, editEvents}) => {

    const keys = Object.keys(user)
    const rows = Object.values(user)



    console.log(rows)

    return (

        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Propiedad</TableCell>
              <TableCell >Valor</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>{user.id}</TableCell>
                <TableCell></TableCell>
            </TableRow>
            <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{editEvents[0] === null ? (<></>) : (<Button onClick={editEvents[0]}>Editar</Button>)}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell>Rol de acceso</TableCell>
                <TableCell>{user.rank}</TableCell>
                <TableCell>{editEvents[1] === null ? (<></>) : (<Button onClick={editEvents[1]}>Editar</Button>)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

    )

}

export default TableUser