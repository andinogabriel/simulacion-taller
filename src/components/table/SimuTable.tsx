import { useState } from 'react';
import { Paper, TableContainer, Table, TableRow, TableBody, TableCell, TablePagination } from '@mui/material';

interface typeMatrix {
    matrix: string[][];
}
export const SimuTable = ({matrix}: typeMatrix) => {




    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

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
                                                <img src="https://www.redusers.com/noticias/wp-content/uploads/2016/07/graham-650x442.jpg" alt="Mutante" style={{width: "150px", margin: "5px"}}/>
                                            : 
                                                <img src="https://i.ytimg.com/vi/O4f58BU_Hbs/maxresdefault.jpg" alt="Residente" style={{width: "150px", margin: "5px"}}/>
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
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={matrix[0].length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    );
};
