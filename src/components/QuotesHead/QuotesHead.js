import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

export default function QuotesHead ({title, orderby, asc, handleSort}) {
    console.log(title, orderby);
    return(
        <Stack direction='row'>
            <Typography sx={{fontWeight: 'bold', color: 'white'}} onClick={()=> handleSort(title.toLowerCase())}>{title}</Typography>
            {
                orderby===title.toLowerCase()?(asc ? <FaArrowDown color='white' style={{marginLeft: 2, marginTop: 4, marginBottom: 4}}/> :
                <FaArrowUp style={{marginLeft: 2, marginTop: 4, marginBottom: 4}} color='white' /> ): ""
            }
        </Stack>
    );
};