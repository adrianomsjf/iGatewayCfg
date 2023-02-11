import * as React from 'react';
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Box, Typography } from '@mui/material';
import { downloadsAfd } from '../back/irep'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, CircularProgress} from '@mui/material';

const AfdTable = (props:any) => {

   const { eid, pronto, setPronto } = props

   function PeridoCell(props:any) {
      const { boxesColor, boxesTextColor, values } = props
      return (
         <Box sx={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <Box 
               bgcolor={boxesColor} borderRadius='5px' width='85px' textAlign='center'
            >
               <Typography sx={{font:'roboto',fontWeight:'700',fontSize:"12px",color:boxesTextColor}}>
                  {values[0]}
               </Typography>
            </Box>
            <Box 
               width='20px' textAlign='center'
            >
               <Typography sx={{font:'roboto',fontWeight:'700',fontSize:"12px",color:'#868FA0'}}>
                  {'>'}
               </Typography>                                    
            </Box>
            <Box 
               bgcolor={boxesColor} borderRadius='5px' width='85px' textAlign='center'
            >
               <Typography sx={{font:'roboto',fontWeight:'700',fontSize:"12px",color:boxesTextColor}}>
                  {values[1]}
               </Typography>
            </Box>
         </Box>
      )
   }

   const [page, setPage] = React.useState(0);
   const [loading, setLoading] = React.useState<boolean | null>(null)
   const [rows, setRows] = React.useState<any[]>([])

   function DTOrows (newrows:any) {
      return newrows.map((row:any,idx:number)=>{
         const marcacao = parseISO(row.marcacao)
         const data = format(parseISO(row.data),'dd MMM yyyy, HH:mm',{locale:ptBR}) 
         let tipo, periodo
         if (row.i) {
            tipo = 'Parcial' 
            periodo = [
               format(parseISO(row.i),'dd MMM yyyy',{locale:ptBR}),
               format(parseISO(row.f),'dd MMM yyyy',{locale:ptBR}),
            ]
         } else {
            tipo = 'Completo'
            periodo = ['-','-']
         }
         return {
            idx,
            data,
            tipo,
            periodo
         }
      })
   }
   
   React.useEffect(() => {
      (async () => {
         if (!pronto) {
            setPronto(true)
            return
         }

         setLoading(true);
         const response = await downloadsAfd(eid)
         setLoading(false);
         setRows(DTOrows(response))
      })();
   }, [pronto]);

   const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
   };
    
   return (
      <Box
         bgcolor="#F5F6FA"
         borderRadius="10px"
         boxShadow="20px 50px 50px rgba(0, 0, 0, 0.25)"
         display="flex"
         justifyContent="flex-start"
         sx={{border:"10px",overflow:"hidden"}}
      >
         <Box
            display="flex"
            bgcolor='#2684FE'
            flexDirection='row'
            alignItems='center'
            justifyContent='center'
            width='80px'
         >
            <Typography sx={{transform:'rotate(-90deg)', font:'roboto',fontWeight:'700',fontSize:"26px",color:'#E9EDF5'}}>
               Histórico
            </Typography>
         </Box>
         <Box 
            width='100%'
            display='flex'
            flexDirection='column'
            justifyContent='space-between'
         >
            <TableContainer component={Paper} sx={{minWidth: '550px', minHeight: '367px' }}>
               {loading ? 
                  <Box
                     width={1}
                     height={1}
                     display='flex'
                     alignItems='center'
                     justifyContent='center'
                  >
                     <CircularProgress /> 
                  </Box>
               : 
               <Table size="small">
                  <TableHead>
                     <TableRow sx={{backgroundColor: '#f4f7fc'}}>
                        <TableCell align="center">#</TableCell>
                        <TableCell align="center">DATA</TableCell>
                        <TableCell align="center">TIPO</TableCell>
                        <TableCell align="center">PERÍODO</TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {rows && rows.slice(page * 10, page * 10 + 10).map((row) => {
                        let tipoBoxColor, tipoFontColor, peridoBoxColor, peridoFontColor;
                        if (row.tipo == 'Completo') {
                           tipoBoxColor = '#017BFF'
                           tipoFontColor = '#F5F6FA'
                           peridoBoxColor = '#E9EDF5'
                           peridoFontColor = '#2E3B52'
                        } else {
                           tipoBoxColor = '#E9EDF5'
                           tipoFontColor = '#2E3B52'
                           peridoBoxColor = '#017BFF'
                           peridoFontColor = '#F5F6FA'
                        }                        
                        return (
                        <TableRow key={row.idx}  sx={{'&:nth-of-type(even)': {backgroundColor: '#f4f7fc'}}}>
                        <TableCell align="center">{row.idx}</TableCell>
                        <TableCell>         
                           <Box sx={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                           <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1.75 12C1.75 13.2426 2.75736 14.25 4 14.25H10.2485C10.5513 14.25 10.8438 14.1401 11.0717 13.9407L13.8231 11.5332C14.0944 11.2958 14.25 10.9529 14.25 10.5925V4C14.25 2.75736 13.2426 1.75 12 1.75H4C2.75736 1.75 1.75 2.75736 1.75 4V12Z" stroke="#2684FE" strokeWidth="1.5"/>
                              <path d="M5.25 6.5H10.75" stroke="#2684FE" strokeWidth="1.5" strokeLinecap="round"/>
                              <path d="M5.25 9.5H8.75" stroke="#2684FE" strokeWidth="1.5" strokeLinecap="round"/>
                           </svg>
                           <Box width='5px'/>
                              {row.data}
                           </Box>               
                        </TableCell>
                        <TableCell align="center">
                           <Box bgcolor={tipoBoxColor} width='65px' borderRadius='5px'>
                              <Typography sx={{font:'roboto',fontWeight:'700',fontSize:"12px",color:tipoFontColor}}>
                                 {row.tipo}
                              </Typography>
                           </Box>
                        </TableCell>
                        <TableCell>
                           <PeridoCell 
                              boxesColor={peridoBoxColor}
                              boxesTextColor={peridoFontColor}
                              values={row.periodo}
                           />
                        </TableCell>
                        </TableRow>
                     )})}
                  </TableBody>
               </Table>}
               </TableContainer>
               <TablePagination
                  sx={{backgroundColor: '#FFFFFF'}}
                  rowsPerPageOptions={[10]}
                  component="div"
                  count={rows && rows.length || 0}
                  rowsPerPage={10}
                  page={page}
                  onPageChange={handleChangePage}
               />
         </Box>
      </Box>
   );
};

export default AfdTable;
