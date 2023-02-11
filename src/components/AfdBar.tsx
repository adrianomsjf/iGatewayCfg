import * as React from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { Box, Typography, TextField, Checkbox, Button, Snackbar  } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import ptLocale from 'date-fns/locale/pt'
import { baixarAfd } from '../back/irep'
import { isValid } from 'date-fns'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
   function Alert(props,ref) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
   }
);

const AfdBar = (props:any) => {

   const { eid, setPronto } = props

   const handleCloseAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
         return;
      }  
      setOpenAlert(false);
   };

   type TSx = {
      width : string,
      svg? : object
   }

   function valorInicialIni() {
      const now = new Date()
      return new Date(now.getFullYear(), now.getMonth(), 1);
   }

   const [valueIni, setValueIni] = React.useState<Date>(valorInicialIni());
   const [valueFim, setValueFim] = React.useState<Date>(new Date());
   const [completo, setCompleto] = React.useState(false);
   const [openAlert, setOpenAlert] = React.useState(false);
   const [msgAlert, setMsgAlert] = React.useState('Mensagem');
       
   return (
      <Box bgcolor='#FFFFFF'
         paddingTop={window.screen.availWidth < 780 ? '40px' : '0px'}
         paddingBottom={window.screen.availWidth < 780 ? '40px' : '0px'}
      >
         <Box
            display='flex'
            justifyContent="left"
            alignItems="center"
            minHeight="80px"
            marginLeft={window.screen.availWidth < 780 ? '10px' : '80px'}
            marginRight={window.screen.availWidth < 780 ? '10px' : '40px'}
            flexDirection={window.screen.availWidth < 780 ? 'column' : 'row'}
         >
            <Box
               display='flex'
               justifyContent="flex-start"
               alignItems="center"   
               flexDirection={window.screen.availWidth < 780 ? 'column' : 'row'}
            >
               <Box width='10px' height='40px'/>
               <Box
                  display='flex'
                  justifyContent="flex-start"
                  alignItems="center"
                  border={1}
                  padding='10px 7px 7px 7px'        
                  borderColor='#c4c4c4'
                  borderRadius='4px'   
               >
               <Checkbox
                  onChange={(e,v)=>{
                     setCompleto(!v)
                  }}
                  checked={!completo}
               />
               <Typography whiteSpace='nowrap' sx={{font:'roboto',fontWeight:'600',fontSize:"18px",color:'#2E3B52',display: { xs: 'none', md: 'flex' }}}>
                  AFD Parcial
               </Typography>
               <Box width='15px' sx={{display: { xs: 'none', md: 'flex' }}}/>
               <LocalizationProvider adapterLocale={ptLocale} dateAdapter={AdapterDateFns} >
                  <DatePicker
                     label="Início"
                     value={valueIni}
                     disabled={completo}
                     inputFormat="dd/MM/yyyy"
                     onChange={(newValue) => {
                        if (newValue) setValueIni(newValue);
                     }}
                     renderInput={(params) => {
                        const sx:TSx = {width:window.screen.availWidth < 780 ? '120px' : '150px'}
                        if (!params?.inputProps?.disabled) {
                           sx.svg = {fill: "#2684FE"}
                        }
                        return (
                           <TextField size="small" {...params} 
                           inputProps={{...params.inputProps,placeholder: "dd/mm/aaaa"}}
                           sx={sx} />
                        )
                     }}
                  />
               </LocalizationProvider>
               <Box width='15px'/>
               <LocalizationProvider adapterLocale={ptLocale} dateAdapter={AdapterDateFns}>
                  <DatePicker
                     label="Fim"
                     value={valueFim}
                     disabled={completo}
                     inputFormat="dd/MM/yyyy"
                     onChange={(newValue) => {
                        if (newValue) setValueFim(newValue);
                     }}
                     renderInput={(params) => {
                        const sx:TSx = {width:window.screen.availWidth < 780 ? '120px' : '150px'}
                        if (!params?.inputProps?.disabled) {
                           sx.svg = {fill: "#2684FE"}
                        }
                        return(
                           <TextField size="small" {...params} 
                           inputProps={{...params.inputProps,placeholder: "dd/mm/aaaa"}}
                           sx={sx} />
                     )}}
                  />
               </LocalizationProvider>
               </Box>
               <Box width='10px' height='40px'/>
               <Box
                  display='flex'
                  justifyContent="flex-start"
                  alignItems="center"
                  border={1}
                  padding='10px 7px 7px 7px'        
                  borderColor='#c4c4c4'
                  borderRadius='4px'       
                  width='297px'
               >
                  <Checkbox
                     onChange={(e,v)=>{
                        setCompleto(v)
                     }}
                     checked={completo}
                  />
                  <Typography whiteSpace='nowrap' sx={{font:'roboto',fontWeight:'600',fontSize:"18px",color:'#2E3B52'}}>
                     AFD Completo
                  </Typography>
               </Box>
               <Box width='10px' height='40px'/>
            </Box>
            <Box
               width='100%'
               display='flex'
               justifyContent={window.screen.availWidth < 780 ? "center" : "flex-end"}
               alignItems="center"
            >
               <Button 
                  variant="contained"
                  color="primary"
                  onClick={async ()=>{
                     if ((isValid(valueIni) && isValid(valueFim))||completo){
                        const ret = await baixarAfd(eid,valueIni,valueFim,completo)
                        if (!ret?.status) {
                           setMsgAlert(ret?.erro||'')
                           setOpenAlert(true)
                        }
                        setPronto(false)
                     } else {
                        setMsgAlert('Data Inválida!')
                        setOpenAlert(true)         
                     }
                  }}
                  sx={{
                     marginRight: window.screen.availWidth < 780 ? '0px' : '40px',
                     font:'roboto',
                     fontWeight:'600',
                     fontSize:"13px",
                     color:'#FFFFFF'}}
               >
                  Baixar AFD
               </Button>
            </Box>
         </Box>
             <Snackbar open={openAlert} autoHideDuration={20000} onClose={handleCloseAlert}>
               <Alert onClose={handleCloseAlert} severity="error" sx={{ width: '100%' }}>
                  {msgAlert}
               </Alert>
            </Snackbar>
      </Box>
   );
};

export default AfdBar;
