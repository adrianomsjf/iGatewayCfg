import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LoginPage from './components/LoginPage';
import AfdPage from './components/AfdPage'

const theme = createTheme(
   {
     palette: {
       primary: { main: '#2684FE' },
     },
   },
);

function App() {


  function handleClick() {
    setCounter(0)
  }

  const [counter, setCounter] = React.useState(0)
  const [login,setLogin] = React.useState(sessionStorage.getItem('login'))
  const [nomeFantasia,setNomeFantasia] = React.useState(sessionStorage.getItem('nomeFantasia'))
  const [eid,setEid] = React.useState(sessionStorage.getItem('eid'))

  document.addEventListener('click',handleClick)
  document.addEventListener('keypress',handleClick)

  React.useEffect(() => {
   const interval = setInterval(() => {
     setCounter(c => c + 1);
   }, 1000);

   return () => clearInterval(interval);
 }, []);


 React.useEffect(() => {
   if (counter>120) {
      setLogin('false')
    }
 }, [counter]);

return (
   <ThemeProvider theme={theme}>
      {login=='true' ?
        <AfdPage setLogin = {setLogin} nomeFantasia = {nomeFantasia} eid = {eid}/>
      :
        <LoginPage setLogin = {setLogin} setNomeFantasia = {setNomeFantasia} setEid = {setEid} nomeFantasia ={nomeFantasia} eid = {eid}/>
      }
   </ThemeProvider>
  )
}

export default App
