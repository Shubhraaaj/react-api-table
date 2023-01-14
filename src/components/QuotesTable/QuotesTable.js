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
import { useLocation, useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import QuotesBar from '../QuotesBar/QuotesBar';
import QuotesHead from '../QuotesHead/QuotesHead';

export default function QuotesTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [timers, setTimers] = useState(0);
  const [asc, setAsc] = useState(true);
  const [orderby, setOrderby] = useState('time');
  const [quotes, setQuotes] = useState([]);
  const location = useLocation();
  const symbol = location.pathname.split('/')[2];

  const fetchData = () => {
      axios.get(`https://prototype.sbulltech.com/api/v2/quotes/${symbol}`)
        .then(res=>{
          const buySellData = res.data.payload[symbol];
          setQuotes(buySellData);
          let maxRefresh = Number.MAX_VALUE;
          buySellData.map((a)=>{
            const refreshTime = Math.abs(((new Date(a.time).getTime())/1000) - ((new Date(a.valid_till).getTime())/1000));
            if(refreshTime<maxRefresh)
                maxRefresh = refreshTime;
          });
          setTimers(maxRefresh);
        }).catch(err=>{
          console.log(err);
        });
  };

  const sortFunction = () => {
    if(asc){
      const data = orderby==='time' ? quotes.sort((a,b)=>{
        return (new Date(a.time)-new Date(b.time));
      }) : quotes.sort((a,b)=>{
        return a.price-b.price;
      });
      setQuotes(data);
    } else {
      const data = orderby==='time' ? quotes.sort((a,b)=>{
        return (new Date(b.time)-new Date(a.time));
      }) : quotes.sort((a,b)=>{
        return b.price-a.price;
      });
      setQuotes(data);
    }
  };

  useEffect(()=>{
    sortFunction();
  },[asc, orderby]);

  useEffect(()=>{
    if(timers<1)
      fetchData();
    else{
      setTimeout(function(){
        setTimers(timers-1);
      }, 1000);
    }
  },[timers]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSort = (id) => {
    setAsc(!asc);
    setOrderby(id);
  };

  return (
    <Paper sx={{ overflow: 'hidden', margin: 4 }}>
      <QuotesBar timer={timers} symbol={symbol} />
      <TableContainer sx={{ maxHeight: 380, minHeight: 380 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
                <TableCell align='left' style={{ minWidth: 100, backgroundColor: '#1B9C6E' }}>
                    <QuotesHead title='Time' asc={asc} orderby={orderby} handleSort={handleSort} />
                </TableCell>
                <TableCell align='left' style={{ minWidth: 100, backgroundColor: '#1B9C6E' }}>
                  <QuotesHead title='Price' asc={asc} orderby={orderby} handleSort={handleSort} />
                </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {quotes
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      <TableCell align='left'>{row.time}</TableCell>
                      <TableCell align='left'><Typography sx={{fontWeight: 'bold'}}>₹{Math.round(row.price*100)/100}</Typography></TableCell>
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