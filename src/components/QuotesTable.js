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
  const [timer, setTimer] = useState(0);
  const [quotes, setQuotes] = useState([]);

  const fetchData = () => {
      axios.get(`https://prototype.sbulltech.com/api/v2/quotes/${symbol}`)
        .then(res=>{
          const buySellData = res.data.payload[symbol];
          setQuotes(buySellData);
          const sortedTime = buySellData.sort((a,b)=>{
            return a.valid_till - b.valid_till;
          });
          const validTill = sortedTime[0].valid_till;
          const fetchTime = sortedTime[0].time;
          const differece = Math.abs(Date.parse(validTill)-Date.parse(fetchTime)); // Difference between two strins
          setTimer(new Date(differece).getSeconds()); // Time to seconds
        }).catch(err=>{
          console.log(err);
        });
  };

  useEffect(()=>{
    if(timer<1)
      fetchData();
    else{
      setTimeout(function(){
        setTimer(timer-1);
      }, 1000);
    }
  },[timer]);

  const columnHeading = [
    { id: 'time', label: 'Time', minWidth: 100, align: 'left' },
    { id: 'price', label: 'Price', minWidth: 100, align: 'left' },
    // { id: 'valid_till', label: 'Valid Till', minWidth: 100, align: 'left' }
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ overflow: 'hidden', margin: 4 }}>
      <p>Page refreshes in {timer} seconds</p>
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
                // console.log(row);
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      <TableCell align='left'>{row.time}</TableCell>
                      <TableCell align='left'>{Math.round(row.price*100)/100}</TableCell>
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