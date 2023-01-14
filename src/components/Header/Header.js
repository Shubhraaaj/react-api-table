import { Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function Header () {
    return (
        <Box sx={{width: '100%', backgroundColor: '#1B9C6E'}}>
            <Typography variant="h1" sx={{width: 'fit-content', px:4, py: 2, fontSize: {xs: 28, md: 32}}} color='white'>Sensibull Ticker</Typography>
        </Box>
    );
}