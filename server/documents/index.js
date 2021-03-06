module.exports = ({ name, price1, price2, receiptId }) => {
    const today = new Date();
return `
<!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>PDF Result Template</title>
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
                  
             


             /* DAtos contratante */
             .titulo {
               font-size: 15px;
               font-weight: bold;
               color: rgb(7, 109, 150);
               margin-left: 15px;
               padding-bottom: 5px;
               padding-top: 5px;
             }

             .datos_contratante_div {
               border: solid 1px rgb(7, 109, 150);
                  border-radius: 25px;
                  width: 95%;
                  margin: auto;
             }

             table.datos_del_contratante {
               /* margin-left: 15px; */
               border-radius: 25px;
               background-color: rgb(7, 109, 150);
               width: 97%;
               text-align: left;
               border-collapse: collapse;
               }
               table.datos_del_contratante td, table.datos_del_contratante th {
                  padding: 5px 7px;
                  
               }

               table.datos_del_contratante tbody td {
               font-size: 12px;
               font-weight: 400;
               color: rgb(37, 37, 37);
               }

               table.datos_del_contratante tbody tr #etiqueta {
                  color: #FFFFFF;
                  padding-left: 15px;
               }

               table.datos_del_contratante td:nth-child(even) {
                  background: rgb(255, 255, 255);
                  border-bottom: .5px solid rgb(7, 109, 150);
               }
              
               
               
              


               /* DATOS DE SALIDA */
               .datos_viaje {
                  border: solid 1px rgba(32, 94, 209, 0.733);
                  border-radius: 25px;
                  width: 95%;
                  margin: auto;
               }




               /* Clausulas */

               .div_clausulas {
                  border: solid 1px rgba(32, 94, 209, 0.733);
                  border-radius: 25px;
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
               width: 50%;
               text-align: justify;
               padding: 1%;
               }
               table.clausulas tbody td {
               font-size: 14px;
               
               }
               table.clausulas tr:nth-child(even) {
               /* background: #D0E4F5; */
               }
               table.clausulas tfoot td {
               font-size: 14px;
               }
  
          </style>
       </head>
       <body>
            <!-- <div class="header-invoce">
                  <table cellpadding="0" cellspacing="0">
                        <tr class="top">
                           <td>
                              <table>
                                 <tr>
                                    <td class="title"><img  src="https://transportamex-production-bucket-1ll3nrbfgiob8.s3.amazonaws.com/2016/08/GVA-Tours1.jpg"
                                       style="width:100%; max-width:156px;"></td>
                                    <td style="text-align:center; color:rgb(1, 1, 71);">
                                       Contrato de Prestacion de Servicios "Transporte"
                                    </td>
                                    <tr>
                                       <td>
                                          Folio:
                                       </td>
                                       <td>
                                          Num: 10971
                                       </td>
                                    </tr>

                                    
                                    
                                    
                                 </tr>
                              </table>
                           </td>
                        </tr>
               </table>
            </div> -->
            <table class="header">
               <tbody>
               <tr>
               <td><img  src="https://transportamex-production-bucket-1ll3nrbfgiob8.s3.amazonaws.com/2016/08/GVA-Tours1.jpg"
                  style="display: block;
                  margin-left: auto;
                  margin-right: auto;
                  width: 50%; width:100%; max-width:200px;"></td>
                  <td style="text-align: center;">Contrato de Prestacion de Servicios "Transporte"</td>
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
                              </tbody>
                           </table>
                  </div>
                  

               </td>
               </tr>
               </tbody>
               </table>
         
            <p class="titulo">DATOS DEL CONTRATANTE</p>
            <div class="datos_contratante_div">
                  <table class="datos_del_contratante">
                        <tbody>
                        <tr>
                        <td id="etiqueta">NOMBRE</td>
                        <td>${name}</td>
                        </tr>
                        <tr>
                        <td id="etiqueta">DIRECCIÓN</td>
                        <td>ALAN JOSUE GARCIA RODRIGUEZ RODRIGUEZ RODRIGUEZ RODRIGUEZ RODRIGUEZ </td>
                        </tr>
                        <tr>
                        <td id="etiqueta">CIUDAD</td>
                        <td>${name}</td>
                        </tr>
                        <tr>
                        <td id="etiqueta">TELEFONO</td>
                        <td>${name}</td>
                        </tr>
                        </tbody>
                        </table>
            </div>



            <p class="titulo">DATOS DE SALIDA Y REGRESO DEL VIAJE</p>
            <div class="datos_viaje">
                  

            </div>

            <p class="titulo">CARACTERISTICAS DE LA UNIDAD CONTRATADA</p>
            <div class="datos_viaje">
                  

            </div>

            <p class="titulo">PAGOS</p>
            <div class="datos_viaje">
                  

            </div>

            
            <div class="datos_viaje">
            <p>Derivado del Servicio de Transporte Terrestre que solicité a la empresa GVA Tours S.A. de C.V. y una vez que he leido el tota lde las condicioanes que se adjuntan al presente contrato, estoy de acuerdo con el total de su contenido.</p>
            <p> NOMBRE Y FIRMA DE ACEPTACION DEL CIENTE   </p>
            <p> NOMBRE Y FIRMA DEL PRESTADOR DE SERVICIOS   </p>
            <p> TELEFONO DE EMERGENCIA:   </p>
            </div>

            <p>NOTA IMPORTANTE: A la firma del contrato debera cubrirse el 30% del importe total, y el saldo una semana antes de la realizacion del viaje. </p>
             

           


          <div class="div_clausulas">
               <table class="clausulas" >
                     <tbody>
                     <tr>
                     <td colspan="2" style="text-align: center;"><p class="titulo">CLAUSULAS</p></td>
                     </tr>
                     <tr >
                     <td>
                        <p id="clausula_text">1. Los pasajeros se comprometen a respetar los horarios e itinerarios estipulados tanto de salidas como de Ilegadas, de no ser asi se le cobrarå al contratante el tiempo excedente proporcionalmente a 10 estipulado en este contrato, por 10 que en caso de ampliar la ruta, el horario o cualquier modificaciön al kilometraje acordado, en el presente contrato, serå cubierto con una cantidad adicional fijada por la empresa transportista en la ciudad donde se celebrö el contrato. </p>
         
                        <p id="clausula_text">2. Cuando el contratante cancela este contrato tendrå derecho al importe total del mismo, siempre y cuando 10 haga con un minimo de 15 dias antes de la fecha y horario establecido de salida. Si el aviso de cancelaciön se realiza entre 14 a 10 dias la sanciön serå del 30%, si es de 9 a 5 dias la sanciön serå del 50% y de 4 dias a la fecha y hora de salida serå del 100%. Esto mismo aplica para la cancelaciön de los servicios adicionales contratados. El aviso de cancelaciön deberå darse por escrito y con acuse de recibido. </p>
                        
                        <p id="clausula_text">3.Si el contratante interrumpiera su viaje en un lugar u horariO intermedio de 10 acordado en el presente contrato por causas no imputables a GVA Tours S.A. de el cliente NO tendrå derecho al reembolso. </p>
                        
                        <p id="clausula_text">4. El nümero de pasajeros en ningün caso deberå exceder la capacidad autorizada del vehiculo que se contrate, de 10 contrario GVATours S.A.de C.V. solo estarå obligado a aceptar y realizar el viaje con la capacidad de personas previamente establecida en el contrato. Si aün asi el contratante continuara exigiendo el servicio y a voluntad de GVA Tours S.A. de C.V. se realizara el mismo.El contratante de harå responsable de todas y cada una de las sanciones que la Secretaria de Comunicacio- nes y Transportes o cualesquiera Otra autoridad aplique al respecto, sin responsabilidad para GVA Tours S.A. de C.V. 5. En el caso en que la unidad contratada no se presente en el lugar y fecha establecidos, la empresa GVA Tours SA. de C.V., queda obligada a devolver el importe cobrado; el contratante no podrå exigir una mayor cantidad a la expresada en el presente contrato.</p>
                        
                        </td>
                     <td>
                        <p id="clausula_text">5. En el caso en que la unidad contratada no se presente en el lugar y fecha establecidos, la empresa GVA Tours S.A. de C.V., queda obligada a devolver el importe cobrado; el contratante no podrå exigir una mayor cantidad a la expresada en el presente contrato.</p>
         
                        <p id="clausula_text">6. GVA Tours SA de C.V. no se hace responsable de dahos o perjuicios que se provoquen al contratante por retrasos en Ilegada o salida de cualquiera de los puntos senalados en el contrato debido a las fallas mecånicas, condiciones desfavo- rabies del tiempo, impedimento de pasos, revisiones oficiales y otras causas de fuerza mayor. </p>
         
                        <p id="clausula_text">7. Se prohibe al contratante conjuntamente con los pasajeros ingerir bebidas alcohölicas y/o drogas durante el trayecto del viaje. La empresa se reserva el derecho de trasportaciön de esta (s) persona (s). </p>
         
                        <p id="clausula_text">8. Los dahos ocasionados al autobüs por negligencia o culpa directa del contratante o pasajeros, serån cobrados en su totalidad al contratante. </p>
         
                        <p id="clausula_text">9. GVA Tours S.A. de C.V. no se hace responsable por objetos olvidados en el autobüs por alguno de los pasajeros. </p>
         
                        <p id="clausula_text">10. Los autobuses no pueden entrar en caminos estrechos o d terraceria que pongan en peligro la unidad. Cualquier daho perjuicio por insistencia del cliente sera cobrada en su totalidad. </p>
         
                        <p id="clausula_text">11. Por disposiciones de la Secretaria de Hacienda y Créd Püblico, las empresas de autotransporte estarån sujetas régimen simplificado segün el articulo 67 de titulo IIA de Ia del impuesto sobre la renta. La empresa transportadora reflejarå el IVA en su facturaciön, de acuerdo al articulo 15 impuesto del valor agregado. </p>
         
                        <p id="clausula_text">12. En caso de requerirse alguna modificaciön en el itinerario horario autorizo a para que realice los tråmites necesarios que procedan originad por dichas modificaciones Ia contrato. </p>
         
                        <p id="clausula_text">13. GVA Tours S.A. de C.V. se obliga en caso de descompostura reemplazar la unidad con caracteristicas semejantes a contratada, en un plazo de tiempo igual al tiempo de recorrido del punto de descompostura a Ia base de la empresa en ciudad de Guadalajara.</p>
         
         
                     </td>
                     </tr>
                     <tr>
                     <td colspan="3">cell1_3</td>
                     </tr>
                     </tbody>
                     </table>

          </div>
          
       </body>
    </html>

    `;
};