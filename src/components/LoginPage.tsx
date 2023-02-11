import * as React from 'react';
import { Typography, Autocomplete, TextField, Button } from '@mui/material';
import { Box } from '@mui/system';
import { cnpj, cpf } from 'magic-masks';
import { cnpj as validCnpj, cpf as validCpf } from 'cpf-cnpj-validator';
import { listarEmpresas } from '../back/irep'
import BottomBar from './BottomBar';

function LoginPage(props:any) {

  function acessar() {
      if (cpf(cpfResp)==senha) {
         setLogin('true') 
         setErroSenha(false)
         sessionStorage.setItem('login','true')
         sessionStorage.setItem('nomeFantasia',nomeFantasia)
         sessionStorage.setItem('eid',eid)
      } else {
         setErroSenha(true)
      }   
  }

  const { setLogin, setNomeFantasia, setEid, nomeFantasia, eid }= props

  const [nomes,setNomes] = React.useState([{ label : "", senha:null, eid: "" }])
  const [senha,setSenha] = React.useState(null)
  const [cnpjCpf,setCnpjCpf] = React.useState("")
  const [cpfResp,setCpfResp] = React.useState("")
  const [erroSenha,setErroSenha] = React.useState(false)

  React.useEffect(() => {
   (async () => {

      //setLoading(true);
      if (cnpjCpf) {
         const response = await listarEmpresas(cnpjCpf)
         if (response.data?.length) {
            setNomes(response.data.map((e:any)=>({label:e.dados.nf,senha:cpf(e.cpf_resp),eid:e.eid})))
         } else {
            setNomes([{ label : "", senha:null, eid: ""  }])
         }
      }
      //setLoading(false);
   })();
   }, [cnpjCpf]);
   
  return (
   <>
      <Box
         display="flex"
         flexDirection="column"
         justifyContent="center"
         alignItems="center"
         minHeight="100vh"
         bgcolor="#017BFF"
      >
         <Box
            minHeight="524px"
            minWidth={window.screen.availWidth < 780 ? "268px" : "921px"}
            bgcolor="#F5F6FA"
            borderRadius="10px"
            boxShadow="20px 50px 50px rgba(0, 0, 0, 0.25)"
            display="flex"
            justifyContent="right"
            sx={{border:"10px solid #FFFFFF"}}
         >
            <Box
               display="flex"
               justifyContent="center"
               alignItems="center"
               flexDirection="column"
               padding="32px"
               width={window.screen.availWidth < 780 ? "268px" :"468px"}
            >
               <Box sx={{width:'312px',height:'73px', marginBottom:"40px"}}>
                  <img src="rep-p.png"  height='100%' width='100%'/>
               </Box>
               <TextField 
                  label="CNPJ/CPF"
                  size="small"
                  inputProps={{style:{ font:'roboto',fontWeight:'700',fontSize:"14px"}}}
                  InputLabelProps={{style:{ font:'roboto',fontWeight:'700',fontSize:"14px"}}}
                  sx={{width:"312px",marginTop:"20px",boxShadow:"0px 4px 10px #CDCED9"}} 
                  onChange={e => {
                     if (e.target.value.length>14) {
                        e.target.value = cnpj(e.target.value)
                     } else {
                        e.target.value = cpf(e.target.value)
                     }
                     if (e.target.value.length==14) {
                        if (validCpf.isValid(e.target.value)) {
                           setCnpjCpf(e.target.value)
                        }
                     }
                     if (e.target.value.length==18) {
                        if (validCnpj.isValid(e.target.value)) {
                           setCnpjCpf(e.target.value)
                        }
                     }
                  }}
               />
               <Autocomplete
                  disablePortal
                  disabled={nomes[0].label==""}
                  id="combo-box-demo"
                  size="small"
                  options={nomes}
                  noOptionsText={'Nemhuma empresa econtrada'}
                  sx={{width:"312px",marginTop:"20px",boxShadow:"0px 4px 10px #CDCED9"}} 
                  onChange={(e,v)=>{
                     setSenha(v?.senha || null)
                     setNomeFantasia(v?.label)
                     setEid(v?.eid)
                  }}
                  renderInput={(params) => {
                     params.inputProps.style={ font:'roboto',fontWeight:'700',fontSize:"14px"}
                     params.InputLabelProps.style={ font:'roboto',fontWeight:'700',fontSize:"14px"}
                     return (
                     <TextField 
                        {...params} 
                        label="Unidade" 
                     />
                     )
                  }}
               />
               <TextField 
                  label="Senha"
                  size="small"
                  disabled={!senha}
                  error={erroSenha}
                  type="password"
                  helperText={erroSenha && 'Senha Incorreta!'}
                  inputProps={{style:{ font:'roboto',fontWeight:'700',fontSize:"14px"}}}
                  InputLabelProps={{style:{ font:'roboto',fontWeight:'700',fontSize:"14px"}}}
                  sx={{width:"312px",marginTop:"20px",boxShadow:"0px 4px 10px #CDCED9"}} 
                  onChange={e => {
                     setCpfResp(e.target.value)
                  }}
                  onKeyUp={e => {
                     if (e.key=='Enter') acessar()
                  }}
               />
               <Box
                  display='flex'
                  flexDirection='row'
                  justifyContent='flex-end'
                  width='312px'
                  marginTop='20px'
               >
                  <Button 
                     disabled={!senha}
                     variant="contained"
                     color="primary"
                     onClick={()=>{acessar()}}
                     sx={{width:'120px', font:'roboto',fontWeight:'600',fontSize:"13px",color:'#FFFFFF'}}
                  >
                     Acessar
                  </Button>
               </Box>
            </Box>
            <Box
               width="325px"
               bgcolor="#2684FE"
               display={{ xs: 'none', md: 'flex' }}
               alignItems="center"
               flexDirection="column"
               padding="32px"
            >
               <Box sx={{width:'284px'}}>
                  <img src="loginImage.png"  height='100%' width='100%'/>
               </Box>
               <Box
                  display="flex"
                  alignItems="left"
                  width="100%"
               >
                  <Typography sx={{font:'roboto',fontWeight:'900',fontSize:"26px",color:'#F5F6FA'}}>
                     O que é REP-P
                  </Typography>
               </Box>
               <Box>
                  <Typography sx={{font:'roboto',fontWeight:'400',fontSize:"14px",color:'#F5F6FA'}}>
                     O REP-P é o Registrador Eletrônico de Ponto por Programa, um novo conceito criado pela Portaria 671. Trata-se de um software que é parte do sistema de registro eletrônico de ponto via programa, que inclui também os coletores de marcações, o armazenamento de registro de ponto, e o programa de tratamento de ponto.
                  </Typography>
               </Box>
               <Box
                  display="flex"
                  width="100%"
                  justifyContent="left"
                  alignItems="center"
                  flexDirection="row"
                  sx={{marginTop:"10px"}}
               >
                  <a 
                     href='https://lp.inspell.com.br/rep-p'
                     style={{
                        textDecoration:"none",
                        display:"flex",
                        justifyContent:"left",
                        alignItems:"center",
                        flexDirection:"row",
                     }}
                  >
                  <Typography sx={{font:'roboto',fontWeight:'300',fontSize:"14px",color:'#014EA3',marginRight:"10px"}}>
                     Quero saber mais
                  </Typography>
                  <svg width="9" height="8" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M5.84874 0L9 3.50877V4.49123L5.84874 8L4.95378 7.01754L7.02101 4.70176H0V3.29825H7.02101L4.94118 0.982456L5.84874 0Z" fill="#014EA3"/>
                  </svg>
                  </a>
               </Box>
            </Box>   
         </Box>
         <Box
            position="absolute"
            bottom="0px"
         >
            <BottomBar textColor='#F5F6FA'/>
         </Box>
      </Box>
   </>
  )
}

export default LoginPage
