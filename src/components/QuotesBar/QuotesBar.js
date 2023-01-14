import { Box, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Back from "../Back/Back";

export default function QuotesBar({timer, symbol}){
    const navigate = useNavigate();
    return(
        <Grid container sx={{p:2}}>
            <Grid item md={1} xs={2}>
                <Box onClick={()=>navigate('/')}><Back /></Box>
            </Grid>
            <Grid item md={10} xs={8}>
                <Typography variant='h6' sx={{fontWeight: 'bold', textAlign: 'center', fontSize: {xs: 18, md: 24}}}>{symbol}</Typography>
            </Grid>
            <Grid item md={1} xs={2}>
                <Typography variant='body1' sx={{margin: 0, fontSize: {xs: 14, md: 24}, color:timer<11?'red':'#000'}} >{timer}</Typography>
            </Grid>
      </Grid>
    )
};