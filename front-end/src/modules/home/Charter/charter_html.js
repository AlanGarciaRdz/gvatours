import charter from '../../../images/charter'

var {PAPELETA, CLIENTE_NOMBRE, HOTEL_DESTINO, FECHA_SALIDA, FECHA_REGRESO, ABORDA, 
	TRAVELAGENCY_NOMBRE , TRAVELAGENCY_CIUDAD, CLAVE , INCLUYE, OBSERVACIONES } = "";





	
function setvariables(PAPELETA, CLIENTE_NOMBRE, HOTEL_DESTINO, FECHA_SALIDA, FECHA_REGRESO, ABORDA, 
	TRAVELAGENCY_NOMBRE , TRAVELAGENCY_CIUDAD, CLAVE , INCLUYE, OBSERVACIONES ) {
		this.PAPELETA = PAPELETA;

		return `<div style="padding: 2% 15%;">
		<table class="header">
		   <tbody>
			  <tr>
				 <td>
					<table>
					   <tbody>
						  <tr>
							 <td>&nbsp;</td>
						  </tr>
					   </tbody>
					</table>
					<img style="display: block; margin-left: auto; margin-right: auto; width: 100%; max-width: 200px;" src="${charter}" />
				 </td>
				 <td style="text-align: center;">&nbsp;</td>
				 <td style="text-align: center;">
					<p style="text-align: center;">CUPON DE CHARTER TURISTICO</p>
				 </td>
				 <td>
					<div class="div_folio_charter">
					   <table class="folio_charter">
						  <tbody>
							 <tr>
								<th>Folio</th>
							 </tr>
							 <tr>
								<td id="papeleta">${PAPELETA}</td>
							 </tr>
						  </tbody>
					   </table>
					</div>
				 </td>
			  </tr>
		   </tbody>
		</table>
		<p class="titulo">&nbsp;</p>
		<div class="datos_contratante">
		   <table id="header_individual" style="height: 24px;" width="">
			  <tbody>
				 <tr>
					<th style="width: 80%;">NOMBRE DEL PASAJERO</th>
				 </tr>
			  </tbody>
		   </table>
		   <table id="individual">
		   <tbody>
			  <tr>
				 <td style="width: 800px;">${CLIENTE_NOMBRE}</td>
			  </tr>
		   </tbody>
		   <!-- hotel destino-->
		   <table id="header_individual" style="height: 24px;" width="">
			  <tbody>
				 <tr>
					<th style="width: 80%;">HOTEL / DESTINO</th>
				 </tr>
			  </tbody>
		   </table>
		   <table id="individual">
			  <tbody>
				 <tr>
					<td style="width: 800px;">${HOTEL_DESTINO}</td>
				 </tr>
			  </tbody>
		   </table>
		   &nbsp;
		</div>
		<div class="datos_contratante_div">
		   <table class="tabla_encabezado_color">
			  <tbody>
				 <tr class="encabezado">
					<td style="border-bottom: none;">FECHA SALIDA</td>
					<td style="border-bottom: none;">FECHA REGRESO</td>
					<td style="border-bottom: none;">ABORDA Y EN HORARIO</td>
				 </tr>
				 <tr style="border-bottom: none;">
					<td style="border-bottom: none;">${FECHA_SALIDA}</td>
					<td style="border-bottom: none;">${FECHA_REGRESO}</td>
					<td style="border-bottom: none;">${ABORDA}</td>
				 </tr>
			  </tbody>
		   </table>
		</div>
		<!-- personas -->
		<table style="height: 29px;" width="430">
		   <tbody>
			  <tr>
				 <td style="width: 65px;">No. ADULTOS Y JUNIORS</td>
				 <td style="width: 65px;">&nbsp;</td>
				 <td style="width: 65px;">No. MENORES CON CARGO</td>
				 <td style="width: 65px;">&nbsp;</td>
				 <td style="width: 65px;">No. MENORES SIN CARGO</td>
				 <td style="width: 65px;">&nbsp;</td>
			  </tr>
		   </tbody>
		</table>
		<div class="datos_contratante">
		   <table id="header_individual" style="height: 24px;" width="">
			  <tbody>
				 <tr>
					<th style="width: 80%;">NOMBRE DE AGENCIA</th>
				 </tr>
			  </tbody>
		   </table>
		   <table id="individual">
		   <tbody>
			  <tr>
				 <td style="width: 800px;">${TRAVELAGENCY_NOMBRE}</td>
			  </tr>
		   </tbody>
		   <!-- hotel destino-->
		   <table id="header_individual" style="height: 24px;" width="">
			  <tbody>
				 <tr>
					<th style="width: 80%;">CIUDAD</th>
				 </tr>
			  </tbody>
		   </table>
		   <table id="individual">
			  <tbody>
				 <tr>
					<td style="width: 800px;">${TRAVELAGENCY_CIUDAD}</td>
				 </tr>
			  </tbody>
		   </table>
		   <table id="header_individual" style="height: 24px;" width="">
			  <tbody>
				 <tr>
					<th style="width: 80%;">CLAVE DE RESERVACION</th>
				 </tr>
			  </tbody>
		   </table>
		   <table id="individual">
		   <tbody>
			  <tr>
				 <td style="width: 800px;">${CLAVE}</td>
			  </tr>
		   </tbody>
		   <!-- hotel destino-->
		   <table id="header_individual" style="height: 24px;" width="">
			  <tbody>
				 <tr>
					<th style="width: 80%;">INCLUYE</th>
				 </tr>
			  </tbody>
		   </table>
		   <table id="individual">
			  <tbody>
				 <tr>
					<td style="width: 800px;">${INCLUYE}</td>
				 </tr>
			  </tbody>
		   </table>
		   <!-- hotel destino-->
		   <table id="header_individual" style="height: 24px;" width="">
			  <tbody>
				 <tr>
					<th style="width: 80%;">OBSERVACIONES</th>
				 </tr>
			  </tbody>
		   </table>
		   <table id="individual">
			  <tbody>
				 <tr>
					<td style="width: 800px; height:100px;">${OBSERVACIONES}</td>
				 </tr>
			  </tbody>
		   </table>
		</div>
		<!-- footer -->
		<DIV id="charter_footer">
		   <P class="">Los puntos de Salida son:</P>
		   <P class="">5:30 am Soriana Rio Nilo a un costado de Banamex (Rio Nilo y Patria)</P>
		   <P class="">6:00 am Plaza Forum sobre Blvd Tlaquepaque</P>
		   <P class="">7:00 am Minerva Frente al Hotel Fiesta Americana Minerva</P>
		   <P class="">7:15 am Central Zapopan en Oxxo y Pollo Pepe</P>
		   <P class="">Se les pide estar 30 min antes para su registro</P>
		   <P class=""">
			  TELEFONO DE EMERGENCIA EN LA SALIDA 
			  <NOBR>333-808-6093</NOBR>
			  CON GUSTAVO JAUREGUI
		   </P>
		   <P class=""">FAVOR DE PRESENTARSE 30 MINUTOS ANTE DE SU SALIDA</P>
		   <P class=""">
			  Av. Fidel Velazquez 
			  <NOBR>#643-A,</NOBR>
			  Col. Santa Elena Alcande., Cp.P. 44230, Guadalajara, Jal.
		   </P>
		   <P class=""">Tel. (33) 3631 3036 con 10 líneas</P>
		</DIV>
	 </div>
	 </div>
	`;

}
	

export default {
	setvariables
};