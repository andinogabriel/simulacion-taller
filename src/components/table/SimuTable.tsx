import { useState } from 'react';
import { Paper, TableContainer, Table, TableRow, TableBody, TableCell, TablePagination } from '@mui/material';

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
                                                <img src="https://cdn-icons.flaticon.com/png/512/4402/premium/4402987.png?token=exp=1634928423~hmac=53e5e4085adc6ef31891e9260f742ea2" alt="Mutante" style={{width: "100px"}}/>
                                            : 
                                                <img src="https://cdn-icons.flaticon.com/png/512/2880/premium/2880690.png?token=exp=1634928521~hmac=cd3acc63bd8ac723c0484ff54a5740df" alt="Residente" style={{width: "100px"}}/>
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
