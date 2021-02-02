import charter from '../../../images/charter'

var {PAPELETA, CLIENTE_NOMBRE, HOTEL_DESTINO, FECHA_SALIDA, FECHA_REGRESO, ABORDA } = "Lorem ipsum"

var {receiptId, DESTINO, HOTEL, DIRECCION_HOTEL, TELEFONO_HOTEL, FECHA_ENTRADA,
	TOTAL_NOCHES, NOMBRE_PASAJERO, TOTAL_PAGADO, NUM_HABITACIONES, NOMBRE_AGENCIA, 
	NUM_SGL, NUM_DBL, NUM_TPL, NUM_CPL, CIUDAD_AGENCIA, MEN_CC, MEN_SC, MEN_JR, TELEFONO_AGENCIA, PLAN_CONTRATADO, 
    CONTACTO_AGENCIA, CONFIRMADO_POR, OBSERVACIONES, CLAVE} = "Lorem ipsum";

const charterHTML = 
`<div style="padding: 2% 15%;">
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
<img style="display: block; margin-left: auto; margin-right: auto; width: 100%; max-width: 200px;" src="${charter}" /></td>
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
<table>
<tbody>
<tr>
<td style="width: 100%;">${CLIENTE_NOMBRE}</td>
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
<table>
<tbody>
<tr>
<td style="width: 100%;">${HOTEL_DESTINO}</td>
</tr>
</tbody>

</table>



&nbsp;</div>
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
<p class="titulo">&nbsp;</p>
<div class="datos_contratante_div">
<table class="tabla_encabezado_color">
<tbody>
<tr class="encabezado">
<td style="border-bottom: none;">NOMBRE DEL PASAJERO</td>
<td style="border-bottom: none;">TOTAL PAGADO</td>
</tr>
<tr style="border-bottom: none;">
<td style="border-bottom: none;">${NOMBRE_PASAJERO}</td>
<td style="border-bottom: none;">${TOTAL_PAGADO}</td>
</tr>
</tbody>
</table>
</div>
<p class="titulo">&nbsp;</p>
<div class="cupon_relacion_datos">
<table id="header_individual">
<tbody>
<tr>
<th width="50%">RELACION DE HABITACIONES</th>
<th width="50%">DATOS DE LA AGENCIA</th>
</tr>
<tr class="titulos_cupon">
<td>No. DE HABITACIONES RESERVADAS:</td>
<td>NOMBRE DE LA AGENCIA:</td>
</tr>
<tr>
<td>${NUM_HABITACIONES}</td>
<td>${NOMBRE_AGENCIA}:</td>
</tr>
<tr class="titulos_cupon">
<td>DESGLOCE OCUPACION:</td>
<td>CIUDAD:</td>
</tr>
<tr>
<td>SGL: ${NUM_SGL} DBL: ${NUM_DBL} TPL: ${NUM_TPL} CPL: ${NUM_CPL}</td>
<td>${CIUDAD_AGENCIA}</td>
</tr>
<tr class="titulos_cupon">
<td>MENORES:</td>
<td>TELEFONO</td>
</tr>
<tr>
<td>C/C: ${MEN_CC} S/C ${MEN_SC} JR ${MEN_JR}</td>
<td>${TELEFONO_AGENCIA}</td>
</tr>
<tr class="titulos_cupon">
<td>PLAN CONTRADO</td>
<td>CONTACTO</td>
</tr>
<tr>
<td>${PLAN_CONTRATADO}</td>
<td>${CONTACTO_AGENCIA}</td>
</tr>
<tr class="titulos_cupon">
<td>CONFIRMADO POR</td>
<td>OBSERVACIONES</td>
</tr>
<tr>
<td>${CONFIRMADO_POR}</td>
<td>${OBSERVACIONES}</td>
</tr>
<tr class="titulos_cupon">
<td>CLAVE</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>${CLAVE}</td>
<td>&nbsp;</td>
</tr>
</tbody>
</table>
</div>
<p class="titulo">&nbsp;</p>
<div class="datos_viaje">
<table class="firmas">
<tbody>
<tr>
<td>&nbsp;</td>
</tr>
<tr>
<td>&nbsp;</td>
</tr>
<tr>
<td>&nbsp;</td>
</tr>
<tr>
<td>&nbsp;</td>
</tr>
<tr>
<td>
<p id="etiqueta_general_firma" class="firma">LUGAR Y FECHA</p>
</td>
<td>
<p id="etiqueta_general_firma" class="firma">RECIBI&Oacute; NOMBRE Y FIRMA</p>
</td>
</tr>
</tbody>
</table>
</div>
</div>
    `;

export default charterHTML;