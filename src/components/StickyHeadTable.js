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
import { useNavigate } from 'react-router-dom';
import { Autocomplete, Container, TextField, Typography } from '@mui/material';
import Fuse from 'fuse.js'

/**
 * Search functionality - DONE
 * Pages and routing - DONE
 * Page refresh when time expires - DONE
 * Sorting - DONE
 * Pricing and Date utils - DONE
 * Mobile responsive - 1hr
 * CSS - 6hrs
 * UI Changes - 6hrs 
 */

export default function StickyHeadTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [tickers, setTickers] = useState([]);
  const navigate = useNavigate();
  const [query, setQuery] = useState(" ");
  const [filteredTickers, setFilteredTickers] = useState([]);
  useEffect(()=>{
    fetchData();
  },[]);

  const fuse = new Fuse(tickers, {
    keys: [{
      name: 'name',
      weight: 0.6
    },
    {
      name: 'symbol',
      weight: 0.4
    }]
  });

  useEffect(()=>{
    setFilteredTickers(fuse.search(query));
  },[query, tickers]);

  const columnHeadings = [
    { id: 'symbol', label: 'Symbol', minWidth: 100, align: 'left' },
    { id: 'name', label: 'Name', minWidth: 100, align: 'left' },
    { id: 'sector', label: 'Sector', minWidth: 100, align: 'left' },
  ];

  const fetchData = () => {
    axios.get('https://prototype.sbulltech.com/api/v2/instruments')
    .then(res=>{
      let responseData = res.data.trim();
      const symbols = responseData.split('\n'); // Splits the response via enter
      const symbolSet = symbols.slice(1); // Saves the symbols
      const tickersArray = symbolSet.map((symbol)=>{
        let splits = symbol.split(',');
        let newObject = {
          symbol: splits[0],
          name: splits[1],
          sector: (splits[2]===""?"NA":splits[2])
        };
        return newObject;
      });
      setTickers(tickersArray);
    }).catch(err=>{
      console.log(err);
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSymbolClick = (symbol) => {
    navigate(`/quotes/${symbol}`);
  };

  return (
    <Paper sx={{overflow: 'hidden', margin: 4 }}>
      <TextField
        label="Search here..."
        size='small'
        sx={{m:2}}
        color='success'
        onChange={(event)=>setQuery(" "+event.target.value)}
      />
      <TableContainer sx={{ maxHeight: 380, minHeight: 380 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columnHeadings.map((column, index) => (
                <TableCell
                  key={column.id}
                  style={{ backgroundColor: '#1B9C6E' }}
                  align='left'
                >
                  <Typography sx={{fontWeight: 'bold', color: 'white'}}>{column.label}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTickers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                const { name, symbol, sector } = row.item;
                return (
                  <TableRow onClick={()=>handleSymbolClick(symbol)} hover role="checkbox" tabIndex={-1} key={symbol}>
                    <TableCell align='left'>{symbol}</TableCell>
                    <TableCell align='left'>{name}</TableCell>
                    <TableCell align='left'>{sector}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={tickers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}