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
import { useLocation } from 'react-router-dom';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

export default function QuotesTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [timer, setTimer] = useState(0);
  const [asc, setAsc] = useState(true);
  const [orderby, setOrderby] = useState('time');
  const [quotes, setQuotes] = useState([]);
  const location = useLocation();
  const [symbol, setSymbol] = useState(location.pathname.split('/')[2]);
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
          // const validTill = sortedTime[0].valid_till;
          // const fetchTime = sortedTime[0].time;
          // const differece = Math.abs(Date.parse(validTill)-Date.parse(fetchTime)); // Difference between two strins
          // setTimer(new Date(differece).getSeconds()); // Time to seconds
          setTimer(maxRefresh);
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

  const handleSort = (id) => {
    setAsc(!asc);
    setOrderby(id);
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
                  {asc?
                    <FaArrowDown style={{marginLeft: 2}} onClick={()=> handleSort(column.id)} /> :
                    <FaArrowUp style={{marginLeft: 2}} onClick={()=> handleSort(column.id)} />}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {quotes
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      <TableCell align='left'>{row.time}</TableCell>
                      <TableCell align='left'>₹{Math.round(row.price*100)/100}</TableCell>
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