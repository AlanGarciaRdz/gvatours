module.exports = ({ name, receiptId, cantidad, CANTIDAD_EN_LETRA, DEPOSITO_EN_GARANTIA, GRUPOS, EFECTIVO, importe_total, PAGOS_REGISTRADOS, SALDO_PENDIENTE, DESCRIPCION_DEL_SERVICO }) => {
return `
<!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>CUPON SERVICIOS</title>
          <style>

            body { font-family: 'Roboto', sans-serif; }

            p {
               margin: 0;
               padding: 0;
            }

             .invoice-box {
             /* max-width: 612px; */
             margin: auto;
             padding: 30px;
             /* border: 1px solid #eee; */
             /* box-shadow: 0 0 10px rgba(0, 0, 0, .15); */
             font-size: 16px;
             line-height: 24px;
             /* font-family: 'Helvetica Neue', 'Helvetica'; */
             font-family: 'Roboto', sans-serif;
             }
             

             /* .header-invoce {
               color: #000000;
               background-image: linear-gradient(to top, #0cbdd4, #0c08fc);
               height: 8vh;
               border-bottom-right-radius: 70%;
               border-bottom-left-radius: 30%;
               
             } */

             .margin-top {
             margin-top: 50px;
             }
             .justify-center {
             text-align: center;
             }
             .invoice-box table {
             width: 100%;
             line-height: inherit;
             text-align: left;
             
             }
             .invoice-box table td {
             padding: 5px;
             vertical-align: top;
             }
             .invoice-box table tr td:nth-child(2) {
             text-align: right;
             }

             
             .invoice-box table tr.top table td {
             padding-bottom: 20px;
             }
             .invoice-box table tr.top table td.title {
             font-size: 45px;
             line-height: 45px;
             color: #333;
             }
             .invoice-box table tr.information table td {
             padding-bottom: 40px;
             }
             .invoice-box table tr.heading td {
             background: #eee;
             border-bottom: 1px solid #ddd;
             font-weight: bold;
             }
             .invoice-box table tr.details td {
             padding-bottom: 20px;
             }
             .invoice-box table tr.item td {
             border-bottom: 1px solid #eee;
             }
             .invoice-box table tr.item.last td {
             border-bottom: none;
             }
             .invoice-box table tr.total td:nth-child(2) {
             border-top: 2px solid #eee;
             font-weight: bold;
             }
             @media only screen and (max-width: 600px) {
             .invoice-box table tr.top table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             .invoice-box table tr.information table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             }


             /* HEADER */
               table.header {
                  width: 100%;
               }
               table.header td, table.header th {

               }
                  /* FOLIO HEADER */

               .div_folio {
                  border: 1.5px solid rgb(7, 109, 150);
                  border-radius: 12px;
               }
                  table.folio {
                     
                     border-radius: 10px;
                     background-color: rgb(7, 109, 150);
                     width: 100%;
                     /* height: 97%; */
                     text-align: center;
                     border-collapse: collapse;
                     color: rgb(255, 255, 255);
                     font-size: 15px;
                  }
                  table.folio td, table.folio th {
                     /* border: 1px solid #4F7849; */
                     border-bottom-left-radius: 11px;
                     border-bottom-right-radius: 10px;
                     padding: 3px 2px;
                  }
                  table.folio tbody td {
                     
                     
                  }
                  table.folio tr:nth-child(even) {
                     background: #FFFFFF;
                     color: red;
                     font-size: 12px;
                     font-weight: 500;
                  }
                  
             


             /* Datos contratante */
             .titulo {
               font-size: 15px;
               font-weight: bold;
               color: rgb(7, 109, 150);
               margin-left: 25px;
               padding-bottom: 5px;
               padding-top: 5px;
             }

             #sin_borde_inferior {
                  border-bottom: none;
              }

             #nota_importante {
               font-size: 15px;
               /* font-weight: bold; */
               color: rgb(7, 109, 150);
               margin-left: 25px;
               padding-bottom: 120px;
               padding-top: 5px;
             }

             .datos_contratante_div {
               border: solid 1px rgb(7, 109, 150);
                  border-radius: 15px;
                  width: 95%;
                  margin: auto;
                  
             }

             table.datos_del_contratante {
                  /* margin-left: 15px; */
                  border-radius: 15px;
                  /* background-color: rgb(7, 109, 150); */
                  background-color: rgb(230, 248, 255);
                  
                  width: 97%;
                  text-align: left;
                  border-collapse: collapse;
               }
               table.datos_del_contratante td, table.datos_del_contratante th {
                  padding: 5px 7px;
                  border-bottom: .5px solid rgb(7, 109, 150);
                  
               }

               table.datos_del_contratante tbody td {
                  font-size: 12px;
                  font-weight: 400;
                  color: rgb(37, 37, 37);
               }

               table.datos_del_contratante tbody tr #etiqueta {
                  color: rgb(54, 54, 54);
                  padding-left: 15px;
               }

               table.datos_del_contratante td:nth-child(even) {
                  background: rgb(255, 255, 255);
                  border-bottom: .5px solid rgb(7, 109, 150);
               }
              
               
               
              


               /* DATOS DE SALIDA */
               .datos_viaje {
                  border: solid 1px rgba(32, 94, 209, 0.733);
                  border-radius: 15px;
                  width: 95%;
                  margin: auto;
               }

               .datos_viaje_pagos {
                  border: solid 1px rgba(32, 94, 209, 0.733);
                  border-radius: 5px;
                  width: 95%;
                  margin: auto;
               }

               table.datos_salida {
                  margin-left: auto;
	               margin-right: auto;
                  width: 100%;
                  text-align: left;
                  border-collapse: collapse;
                  border-radius: 15px;
               }

               table.datos_salida td, table.datos_salida th {
                  padding: 3px 2px;               
               }
               
               table.datos_salida tbody td {
               font-size: 13px;
               margin-left: 25px;
               }

               table.datos_salida tbody tr #etiqueta_general {
                  color: rgb(54, 54, 54);
                  padding-left: 15px;
               }


               table.datos_salida tr {
                  /* background: rgb(255, 255, 255); */
                  border-bottom: .5px solid rgb(7, 109, 150);
               }

              
              

               /*  UNIDAD CONTRATADA*/

               table.unidad_contratada {
                  margin-left: auto;
	              margin-right: auto;
                  width: 100%;
                  text-align: left;
                  border-collapse: collapse;
               }

               table.unidad_contratada td, table.unidad_contratada th {
               
                  padding: 3px 2px;
               }
               table.unidad_contratada tbody td {
                  font-size: 13px;
               }

               table.unidad_contratada tbody tr #etiqueta_general {
                  color: rgb(54, 54, 54);
                  padding-left: 15px;
               }


               table.unidad_contratada tr {
                  /* background: rgb(255, 255, 255); */
                  border-bottom: .5px solid rgb(7, 109, 150);
               }

               table.unidad_contratada tr:nth-child(even) {
                  /* background: #D0E4F5; */
               }
               


               /* PAGOS */

               table.pagos {
                  margin-left: auto;
	               margin-right: auto;
                  width: 100%;
                  text-align: left;
                  border-collapse: collapse;
               }
               table.pagos td, table.pagos th {
                  padding: 3px 2px;
               }
               table.pagos tbody td {
                  font-size: 13px;
               }
               table.pagos tr:nth-child(even) {
                  /* background: #D0E4F5; */
               }
               table.pagos tfoot td {
                  font-size: 14px;
               }
               table.pagos tfoot .links {
               text-align: right;
               }
               table.pagos tfoot .links a{
               display: inline-block;
               background: #1C6EA4;
               color: #FFFFFF;
               padding: 2px 8px;
               border-radius: 5px;
               }

               table.pagos tbody tr #etiqueta_general {
                  color: rgb(54, 54, 54);
                  padding-left: 15px;
               }


               table.pagos tr {
                  /* background: rgb(255, 255, 255); */
                  border-bottom: .5px solid rgb(7, 109, 150);
               }




               /* firmas */
               table.firmas {
                  margin-left: auto;
	               margin-right: auto;
                  width: 100%;
                  text-align: left;
                  border-collapse: collapse;
               }
               table.firmas td, table.firmas th {
               /*  */
               padding: 3px 2px;
               }
               table.firmas tbody td {
               font-size: 13px;
               }
               table.firmas tr:nth-child(even) {
               /* background: #D0E4F5; */
               }

               table.firmas tbody tr #etiqueta_general {
                  color: rgb(54, 54, 54);
                  padding-left: 15px;
                  padding-right: 15px;
                  
               }

               table.firmas tbody tr #etiqueta_general_firma {
                  color: rgb(54, 54, 54);
                  padding-left: 15px;
                  text-align: center;
               }


               table.firmas tr .firma {
                  /* background: rgb(255, 255, 255); */
                  border-top: .5px solid rgb(7, 109, 150);
                  margin-left: 20px;
                  margin-right: 20px;
               }

               /* Clausulas */

               .div_clausulas {
                  border: solid 1px rgba(32, 94, 209, 0.733);
                  border-radius: 15px;
                  width: 95%;
                  margin: auto;

               }
               table.clausulas {
               
               width: 95%;
               
               border-collapse: collapse;         
               }

               #clausula_text {
                  padding-bottom: 5px;
               }
               table.clausulas td, table.clausulas th {
                /* border: 1px solid #FFFFFF; */
                padding: 3px 2px;
                /* width: 50%; */
                /* text-align: justify; */
                padding: 1%;
               }
               table.clausulas tbody td {
                font-size: 14px;
               }


               /* reservacion */

               .opcion {
                    color: rgb(54, 54, 54);
                  padding-left: 15px;
               }

               table.reservacion {
                    width: 95%;
                    border-collapse: collapse;         
               }

               table.reservacion td, table.reservacion th {
                padding: 3px 2px;
                padding: 1%;
               }

               table.reservacion tbody td {
                font-size: 14px;
               }
               
               
  
          </style>
       </head> 
       <body>
          
            <table class="header">
               <tbody>
               <tr>
               <td><img  src="https://transportamex-production-bucket-1ll3nrbfgiob8.s3.amazonaws.com/2016/08/GVA-Tours1.jpg"
                  style="display: block;
                  margin-left: auto;
                  margin-right: auto;
                  width: 50%; width:100%; max-width:200px;"></td>
                  <td style="text-align: center;">RECIBO DE DINERO</td>
               <td>
                  <div class="div_folio">
                        <table class="folio">
                              <tbody>
                              <tr>
                              <td>Folio</td>
                              </tr>
                              <tr>
                              <td>&#8470; ${receiptId}</td>
                              </tr>

                              <tr>
                                    <td>BUENO POR</td>
                                    </tr>
                                    <tr>
                                    <td>$ ${cantidad}</td>
                                    </tr>
                              </tbody>
                           </table>

                          
                  </div>
               </td>
               </tr>
               </tbody>
               </table>
         
               <p class="titulo">&nbsp;</p> 
               
            <div class="datos_contratante_div">
                  <table class="datos_del_contratante">
                        <tbody>
                        <tr>
                        <td id="etiqueta">RECIBIMOS DE:</td>
                        <td>${name}</td>
                        </tr>
                        <tr>
                        <td id="etiqueta">LA CANTIDAD DE:</td>
                        <td>${CANTIDAD_EN_LETRA} </td>
                        </tr>

                        <tr>
                           <td id="etiqueta">POR CONCEPTO DE:</td>
                           <td>EJEMPLO: ${DEPOSITO_EN_GARANTIA} </td>
                        </tr>

                        <tr>
                           <td id="etiqueta" style="border-bottom: none;">PARA LA RESERVACION DE:</td>
                           <td style="border-bottom: none;">EJEMPLO: ${GRUPOS} </td>
                        </tr>


                        <!-- style="border-bottom: none;" -->
                        </tbody>
                        </table>
            </div>

            <p class="titulo">&nbsp;</p>
            <div class="datos_contratante_div">
                  <table class="datos_del_contratante">
                        <tbody>
                        <tr style="border-bottom: none;">
                        <td style="border-bottom: none;">FORMA DE PAGO:</td>
                        <td style="border-bottom: none;">EJEMPLO: ${EFECTIVO}</td>
                        </tr>
                        
                        </tbody>
                        </table>
            </div>


            <p class="titulo">&nbsp;</p>
            <div class="datos_viaje_pagos">
                  
               <table class="pagos">
                  <tbody>
                <!-- <td colspan="2" style="text-align: center; padding-top: 10px;"><p class="titulo">PAGOS</p></td> -->
                  <tr>
                  <td id="etiqueta_general">IMPORTE TOTAL:</td>
                  <td id="etiqueta_general">${importe_total}</td>
                  </tr>
                  <tr>
                  <td id="etiqueta_general">PAGOS REGISTRADOS:</td>
                  <td id="etiqueta_general">${PAGOS_REGISTRADOS}</td>
                  </tr>
                  <tr id="sin_borde_inferior">
                  <td id="etiqueta_general">SALDO PENDIENTE:</td>
                  <td id="etiqueta_general">${SALDO_PENDIENTE}</td>
                  </tr>
                  </tbody>
               </table>

            </div>
           
           <p class="titulo">&nbsp;</p>
            <div class="datos_viaje">

                  <table class="firmas">
                        <tbody>
                        <td colspan="2" style="text-align: center; padding-top: 10px;"><p class="titulo">DESCRIPCION DEL SERVICIO:</p></td>
                        
                        <tr><td></td></tr>
                        
                        <tr><td colspan="2" id="etiqueta_general">${DESCRIPCION_DEL_SERVICO}</td></tr>
                        <!-- <tr><td colspan="2" id="etiqueta_general">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</td></tr> -->
                        <tr><td></td></tr>
                        <tr><td></td></tr>
                        <tr><td></td></tr>
                        <tr><td></td></tr>
                        <tr>
                           <td>
                              <p id="etiqueta_general_firma" class="firma"> LUGAR Y FECHA</p>
                           </td>
                           <td>
                                 <p id="etiqueta_general_firma" class="firma"> RECIBIÓ NOMBRE Y FIRMA  </p>
                           </td>
                        </tr>
                        
                        </tbody>
                        </tr>
                    </table>
            </div>

            

          
          
       </body>
    </html>
    `;
   };