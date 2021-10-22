import { useState } from 'react';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';

interface typeMatrix {
    matrix: string[][];
}
export const SimuTable = ({matrix}: typeMatrix) => {


    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer >
          <Table>
            <TableBody>
                {
                    matrix.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, i) => (
                        <TableRow  key={i}>
                            {
                                row.map((col, j) => (
                                    <TableCell key={j}>
                                        {
                                            col === 'M'
                                            ? 
                                                <img src={require('../../assets/images/mutant.png')} alt="Mutante" style={{width: "100px"}}/>
                                            : 
                                                <img src={require('../../assets/images/resident.png')} alt="Residente" style={{width: "100px"}}/>
                                        }
                                    </TableCell>
                                ))
                            }
                        </TableRow>
                    ))
                }
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={matrix.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Simulaciones por pagina"
        />
      </Paper>
    );
};
