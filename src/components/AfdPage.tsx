import * as React from 'react';
import { Typography, Paper } from '@mui/material';
import { Box } from '@mui/system';
import TopBar from './TopBar';
import AfdBar from './AfdBar';
import AfdTable from './AfdTable';
import BottomBar from './BottomBar';

function AfdPage(props:any) {

  const { setLogin, nomeFantasia, eid } = props

  const [pronto, setPronto] = React.useState(false);
  const [cnpjCpf,setCnpjCpf] = React.useState("")
 
  return (
   <>
      <Box
         display="flex"
         flexDirection="column"
         justifyContent="space-between"
         alignItems="center"
         minHeight={window.screen.availWidth < 780 ? '80vH' :"100vh"}
         bgcolor={window.screen.availWidth < 780 ?'#FFFFFF':"#EBF0FA"}
      >
         <Box  minWidth='100vw'>
            <TopBar setLogin = {setLogin} nomeFantasia = {nomeFantasia}/>
            <AfdBar eid = {eid} setPronto ={setPronto}/>
         </Box>
         {window.screen.availWidth < 780 ? <></> : 
            <AfdTable eid = {eid} pronto = {pronto} setPronto ={setPronto}/>
         }
         <BottomBar textColor='#2E3B52'/>
      </Box>
   </>
  )
}

export default AfdPage
