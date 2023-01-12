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

/**
 * Search functionality
 * Pages and routing
 * Page refresh when time expires
 * Sorting
 * Pricing and Date utils
 * Mobile responsive
 * CSS
 *  
 */

export default function StickyHeadTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [symbols, setSymbols] = useState([]);
  const [columnHeading, setColumnHeading] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    fetchData();
  },[]);

  const fetchData = () => {
    axios.get('https://prototype.sbulltech.com/api/v2/instruments')
    .then(res=>{
      const response = res.data.split('\n'); // Splits the response via enter
      setColumnHeading(response[0].split(',').slice(0,3)); // Removes the heading for date
      const symbolSet = response.slice(1); // Saves the symbols
      setSymbols(symbolSet);
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
    const symbolClicked = symbol.split(',')[0];
    navigate(`/quotes/${symbolClicked}`);
  };

  return (
    <Paper sx={{overflow: 'hidden', margin: 4 }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columnHeading.map((column, index) => (
                <TableCell
                  key={index}
                  align='left'
                  // style={{ minWidth: 400 }}
                >
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {symbols
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow onClick={()=>handleSymbolClick(row)} hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columnHeading.map((column, index) => {
                      const newValue = row.split(',');
                      return (
                        <TableCell key={column} align='left'>{newValue[index]}</TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={symbols.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}