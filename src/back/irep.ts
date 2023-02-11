import axios from 'axios'
import fileDownload from 'js-file-download'
import { format } from 'date-fns'

const irepHost = import.meta.env.VITE_IREP_HOST

const irep = axios.create({
   baseURL : irepHost,
   headers : {
      keyInspell : 'ueFMKeLZgmNjgXYNwGkCTAaq9C5Z0wicMPRtF3uXmtJhai4sCMANZSuU1RpcT'
   }
})

type TBaixarAfd = {
   status : boolean,
   data? : any,
   erro? : string
}

export const listarEmpresas = async (cnpjCpf: string) => {
   return await irep.get(
      'empresas/' + cnpjCpf.replaceAll('.','').replace('-','').replace('/','')
   )
};

export const baixarAfd = async (eid: string,valueIni:Date,valueFim:Date,completo:boolean):Promise<TBaixarAfd> => {
   let filtro
   try {
      filtro = completo ? '' : '?i='+format(valueIni,'yyyy-MM-dd')+'&f='+format(valueFim,'yyyy-MM-dd')
   } catch {
      return {
         status : false,
         erro : 'Período Invalido!'
      }
   }
   try {
      const reponse =  await irep.get(
         'afds/' + eid + filtro,
         {
            responseType: 'blob'
         }
      )
      fileDownload(reponse.data,'AFD.zip')
      return {
         status : true,
      }
   } catch(err:any) {
      return {
         status : false,
         erro : await err.response.data.text()
      }
   }
};

export const downloadsAfd = async (eid: string) => {
   const reponse =  await irep.get(
      'downloads/' + eid 
   )
   return reponse.data
};
