import {useEffect, useState} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';

export default function QuotesTable({symbol='DABUR'}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [quotes, setQuotes] = useState([]);

  useEffect(()=>{
    axios.get(`https://prototype.sbulltech.com/api/v2/quotes/${symbol}`)
      .then(res=>{
        setQuotes(res.data.payload[symbol]);
        console.log(res.data.payload[symbol]);
      }).catch(err=>{
        console.log(err);
      });
  },[]);

  const columnHeading = [
    { id: 'time', label: 'Time', minWidth: 100, align: 'left' },
    { id: 'price', label: 'Price', minWidth: 100, align: 'left' },
    { id: 'valid_till', label: 'Valid Till', minWidth: 100, align: 'left' }
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columnHeading.map((column, index) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {quotes
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                console.log(row);
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {/* {columnHeading.map((column, index) => {
                      const newValue = row.split(',');
                      return ( */}
                        <TableCell align='left'>{row.time}</TableCell>
                        <TableCell align='left'>{row.price}</TableCell>
                        <TableCell align='left'>{row.valid_till}</TableCell>
                      {/* ); */}
                    {/* })} */}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={quotes.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}