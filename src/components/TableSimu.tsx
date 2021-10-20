import { useState } from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableRow, TablePagination} from '@mui/material';
import { TablePaginationActions } from './table/TablePagination';
//import { population } from "../utils/moranProcess";

interface typeMatrix {
    matrix: string[][];
}

export const TableSimu = ({matrix}: typeMatrix ) => {
  
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    //const [matrix, setMatrix] = useState([["R", "R", "R", "R", "R", "R", "R", "R", "R", "R"]]);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - matrix[0].length) : 0;

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                <TableBody>
                {(rowsPerPage > 0
                    ? matrix.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : matrix
                ).map((row, i) => (
                    <TableRow key={i}>
                        <TableCell component="th" scope="row">
                            {
                               row.map((cell, k) => (
                                    cell === 'M'
                                    ? 
                                        <img src="https://www.redusers.com/noticias/wp-content/uploads/2016/07/graham-650x442.jpg" alt="Mutante" style={{width: "150px", margin: "5px"}}/>
                                    : 
                                        <img src="https://i.ytimg.com/vi/O4f58BU_Hbs/maxresdefault.jpg" alt="Residente" style={{width: "150px", margin: "5px"}}/>
                               ))
                            }
                        </TableCell>
                    </TableRow>
                ))}
                {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                    </TableRow>
                )}
                </TableBody>
                <TableFooter>
                <TableRow>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                        colSpan={3}
                        count={matrix[0].length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                            inputProps: {
                            'aria-label': 'rows per page',
                            },
                            native: true,
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                    />
                </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    )
}
