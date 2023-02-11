import { Box, Typography, Paper } from '@mui/material';

const BottomBar = (props:any) => {

   const { textColor } = props

   return (
      <Box 
         sx={{ backgroundColor:'transparent' }}>
         <Box
            display='flex'
            justifyContent="center"
            alignItems="center"
            minHeight="30px"
         >
            <Typography sx={{font:'roboto',fontWeight:'400',fontSize:"12px",color:textColor}}>
               Copyright © 2022 Inspell Softwares. Todos os direitos reservados.
            </Typography>
         </Box>
      </Box>
   );
};

export default BottomBar;
