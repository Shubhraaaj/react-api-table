import { Typography, Stack } from "@mui/material";
// import { Stack } from "@mui/system";
import { FaArrowLeft } from "react-icons/fa";

export default function Back () {
    return(
        <Stack  sx={{width: 'fit-content', cursor: 'pointer', margin: 0}} direction='row' spacing={1}>
            <FaArrowLeft style={{margin: 'auto'}} />
            <Typography variant="body1" sx={{display: {xs: 'none', md:'inline-block'}, margin: 0}} fontWeight={600}>Back</Typography>
        </Stack>
    );
};