import gvalogo from "../images/gvalogo";
import { MoneyFormatter } from "../utils/helpers";

function Header(doc, receiptId, cantidad) {
  //let color_encabezado = (170, 182, 198);//(255,255,255);
  //let azul_fuerte_letras = (29,34,78)
  doc.setFillColor(170, 182, 198); //red

  doc.ellipse(-20, -50, 950, 131, "F");
  doc.setDrawColor(170, 182, 198);
  doc.ellipse(-20, -45, 950, 131, "D");
  doc.ellipse(-20, -40, 950, 131, "D");

  try {
    doc.addImage(gvalogo, "PNG", 20, 20, 170, 50);
  } catch (error) {
    console.log(gvalogo);
  }
  doc.setFontSize(17);

  doc.setTextColor(29, 34, 78); //azul fuerte

  doc.textWithLink("Recibo de", 217, 45, {
    url: "https://goo.gl/maps/KgRQhTxJQoMNe8nv9",
  });
  doc.text(217, 65, "dinero");

  doc.setFontSize(11);
  doc.setDrawColor(0);

  doc.setFillColor(29, 34, 78); //rojo
  doc.roundedRect(470, 30, 100, 44, 3, 3, "FD"); //Fill D/border

  doc.setTextColor(255, 255, 255);
  doc.text(500, 43, "FOLIO");

  doc.setTextColor(0, 0, 0);

  doc.setDrawColor(0);
  doc.setFillColor(255, 255, 255);
  doc.rect(470, 52, 100, 25, "F");

  doc.setTextColor(29, 34, 78);

  // doc.text(502, 64, Folio+"");
  doc.text(540, 64, "E");

  doc.setDrawColor(0);
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(470, 30, 100, 44, 3, 3); //  Black square with rounded corners
  ///       x    y  ancho altura
}

function Detalles(doc, nombre, cantidad, concepto, reservacion) {
  let starty = 90;
  let increment = 24;
  let tabinsidesection = 17;
  let color_labels = (255, 255, 255); //(255,255,255);
  let color_azules = (62, 53, 125); //(255,255,255);
  let color_valores = (0, 0, 0); //(255,255,255);
  doc.setDrawColor(29, 34, 78);
  doc.setLineWidth(0.8);

  starty += tabinsidesection;

  doc.setFillColor(126, 152, 186); //azul relleno
  doc.roundedRect(15, starty, 125, 35, 6, 6, "F");
  doc.rect(135, starty, 10, 35, "F");
  doc.roundedRect(15, starty, 550, 35, 6, 6, "D");

  doc.setTextColor(color_labels);
  doc.text(30, starty + 13, "RECIBIMOS DE:");
  doc.setTextColor(color_valores);
  // doc.text(110, starty+13, CLIENTE_NOMBRE);
  doc.setLineWidth(0.5);
  doc.line(15, starty + 17, 565, starty + 17);

  starty += tabinsidesection;

  doc.setFillColor(126, 152, 186); //azul relleno
  doc.setTextColor(color_labels);
  doc.text(30, starty + 13, "LA CANTIDAD DE:");
  doc.setTextColor(color_valores);

  //POR CONCEPTO DE
  starty += tabinsidesection * 2;
  doc.setLineWidth(0.8);
  doc.setTextColor(color_valores);
  doc.setFont("helvetica", "bold");

  doc.setFont("helvetica", "normal");

  // rectangulo de toda la seccion POR CONCEPTO DE
  doc.setTextColor(color_valores);
  doc.roundedRect(15, starty, 550, 70, 3, 3, "D");
  // rectangulo de toda la seccion POR CONCEPTO DE

  doc.setLineWidth(0.5);
  doc.setTextColor(color_azules);
  doc.setTextColor(color_valores);

  doc.setTextColor(color_azules);
  doc.text(220, starty + 13, "POR CONCEPTO DE:");
  doc.setTextColor(color_valores);
  doc.setTextColor(color_valores);

  starty += increment + 5;
  doc.setTextColor(color_azules);

  doc.setFontSize(8);
  doc.circle(60, starty, 7, "D"); //STEREO
  // doc.text(57, starty+3, EQUIPADA.includes('STEREO') ? 'X' : '');
  doc.text(70, starty + 3, "DEPOSITO EN GARANTÍA");
  doc.circle(240, starty, 7, "D"); //SEGURO DE PASAJEROS
  // doc.text(177, starty+3, EQUIPADA.includes('SEGURO DE PASAJERO') ? 'X' : '');
  // doc.text(177, starty+3, EQUIPADA.includes('SEGURO DE VIAJERO') ? 'X' : '');
  doc.text(250, starty + 3, "ANTICIPO");

  doc.circle(380, starty, 7, "D"); //OTROS
  doc.text(390, starty + 3, "PAGO TOTAL");
  doc.setFontSize(11);
  doc.setLineWidth(0.8);

  // RESERVACION DE
  starty += tabinsidesection * 3;
  doc.setLineWidth(0.8);
  doc.setTextColor(color_valores);
  doc.setFont("helvetica", "bold");

  doc.setFont("helvetica", "normal");

  // rectangulo de toda la seccion POR CONCEPTO DE
  doc.setTextColor(color_valores);
  doc.roundedRect(15, starty, 550, 70, 3, 3, "D");
  // rectangulo de toda la seccion POR CONCEPTO DE

  doc.setLineWidth(0.5);
  doc.setTextColor(color_azules);
  doc.setTextColor(color_valores);

  doc.setTextColor(color_azules);
  doc.text(220, starty + 13, "PARA LA RESERVACIÓN DE:");
  doc.setTextColor(color_valores);
  doc.setTextColor(color_valores);

  starty += increment + 5;
  doc.setTextColor(color_azules);

  doc.setFontSize(8);
  doc.circle(60, starty, 7, "D"); //STEREO
  // doc.text(57, starty+3, EQUIPADA.includes('STEREO') ? 'X' : '');
  doc.text(70, starty + 3, "GRUPOS");
  doc.circle(150, starty, 7, "D"); //SEGURO DE PASAJEROS
  // doc.text(177, starty+3, EQUIPADA.includes('SEGURO DE PASAJERO') ? 'X' : '');
  // doc.text(177, starty+3, EQUIPADA.includes('SEGURO DE VIAJERO') ? 'X' : '');
  doc.text(160, starty + 3, "RENTA DE AUTOBUS/SPRINTER");

  doc.circle(330, starty, 7, "D"); //OTROS
  doc.text(340, starty + 3, "HOTELES");

  doc.circle(410, starty, 7, "D"); //OTROS
  doc.text(420, starty + 3, "EXCRUSIONES / CHARTER/ OTROS");

  doc.setFontSize(11);
  doc.setLineWidth(0.8);

  // FORMA DE PAGO

  starty += tabinsidesection * 3;
  doc.setLineWidth(0.8);
  doc.setTextColor(color_valores);
  doc.setFont("helvetica", "bold");

  doc.setFont("helvetica", "normal");

  // rectangulo de toda la seccion POR CONCEPTO DE
  doc.setTextColor(color_valores);
  doc.roundedRect(15, starty, 550, 70, 3, 3, "D");
  // rectangulo de toda la seccion POR CONCEPTO DE

  doc.setLineWidth(0.5);
  doc.setTextColor(color_azules);
  doc.setTextColor(color_valores);

  doc.setTextColor(color_azules);
  doc.text(220, starty + 13, "FORMA DE PAGO:");
  doc.setTextColor(color_valores);
  doc.setTextColor(color_valores);

  starty += increment + 5;
  doc.setTextColor(color_azules);

  doc.setFontSize(8);
  doc.circle(60, starty, 7, "D"); //STEREO
  // doc.text(57, starty+3, EQUIPADA.includes('STEREO') ? 'X' : '');
  doc.text(70, starty + 3, "EFECTIVO");
  doc.circle(150, starty, 7, "D"); //SEGURO DE PASAJEROS
  // doc.text(177, starty+3, EQUIPADA.includes('SEGURO DE PASAJERO') ? 'X' : '');
  // doc.text(177, starty+3, EQUIPADA.includes('SEGURO DE VIAJERO') ? 'X' : '');
  doc.text(160, starty + 3, "TARJETA DE CREDITO");

  doc.circle(330, starty, 7, "D"); //OTROS
  doc.text(340, starty + 3, "CHEQUE");

  doc.circle(410, starty, 7, "D"); //OTROS
  doc.text(420, starty + 3, "TRANSFERENCIA ELECTRONICA/");
  doc.text(420, starty + 13, "DEPOSITO BANCARIO");

  doc.setFontSize(11);
  doc.setLineWidth(0.8);

  // DESCRIPCION DEL SERVICIO

  starty += tabinsidesection * 3;
  doc.setLineWidth(0.8);
  doc.setTextColor(color_valores);
  doc.setFont("helvetica", "bold");

  doc.setFont("helvetica", "normal");

  // rectangulo de toda la seccion POR CONCEPTO DE
  doc.setTextColor(color_valores);
  doc.roundedRect(15, starty, 550, 210, 3, 3, "D");
  // rectangulo de toda la seccion POR CONCEPTO DE

  doc.setLineWidth(0.5);
  doc.setTextColor(color_azules);
  doc.setTextColor(color_valores);

  doc.setTextColor(color_azules);
  doc.text(30, starty + 13, "DESCRIPCIÓN DEL SERVICIO");
  doc.setTextColor(color_valores);
  doc.setTextColor(color_valores);

  starty += increment + 5;
  doc.setTextColor(color_azules);

  doc.setFontSize(8);

  doc.setFontSize(11);
  doc.setLineWidth(0.8);

  starty += tabinsidesection + 180;

  doc.setFillColor(126, 152, 186); //azul relleno
  doc.roundedRect(15, starty, 125, 35, 6, 6, "F");
  doc.rect(135, starty, 10, 35, "F");
  doc.roundedRect(15, starty, 550, 35, 6, 6, "D");

  doc.setTextColor(color_labels);
  doc.text(30, starty + 13, "LUGAR Y FECHA:");
  doc.setTextColor(color_valores);
  // doc.text(110, starty+13, CLIENTE_NOMBRE);
  doc.setLineWidth(0.5);
  doc.line(15, starty + 17, 565, starty + 17);

  starty += tabinsidesection;

  doc.setFillColor(126, 152, 186); //azul relleno
  doc.setTextColor(color_labels);
  doc.text(30, starty + 13, "NOMBRE Y FIRMA:");
  doc.setTextColor(color_valores);

  doc.setFillColor(170, 182, 198);
  doc.setDrawColor(170, 182, 198);
  doc.ellipse(-20, 800, 950, 131, "F");
  doc.ellipse(-20, 795, 950, 131, "D");
  doc.ellipse(-20, 790, 950, 131, "D");
  color_valores = (0, 0, 0);
  doc.setTextColor(color_valores);
  doc.setFont(undefined, "bold");
  let pie = "GVA Tours S.A. de C.V.";
  doc.text(xcenter(doc, pie), 700, pie);
  pie =
    "AV. Fidel Velazquez #643-A Col. Santa Elena Alcalde CP. 44230 Guadalajara, Jalisco";
  doc.text(xcenter(doc, pie), 715, pie);

  doc.textWithLink("www.gvatours.com", 60, 730, { url: "www.gvatours.com" });

  doc.textWithLink("T. (33) 3631 3036 con 10 lineas", 252, 730, {
    url: "3631 3036",
  });

  doc.textWithLink("info@gvatours.com", 450, 730, {
    url: "mailto:info@gvatours.com",
  });
}

function xcenter(doc, phrase) {
  return (
    doc.internal.pageSize.width / 2 -
    (doc.getStringUnitWidth(phrase) * doc.internal.getFontSize()) / 2
  );
}

function PagosRegistrados(doc, total, registrados, pendiente) {
  doc.setFillColor(230, 248, 255);
  doc.roundedRect(15, 255, 180, 22, 3, 3, "F");

  doc.text(30, 250, "IMPORTE TOTAL");
  doc.text(200, 250, total);

  // doc.setFillColor(230, 248, 255);
  // doc.roundedRect(15, 205, 255, 22, 3, 3, 'F');
  doc.text(30, 275, "PAGOS REGISTRADOS");
  doc.text(200, 275, registrados);

  // doc.setFillColor(230, 248, 255);
  // doc.roundedRect(15, 205, 285, 22, 3, 3, 'F');
  doc.text(30, 300, "SALDO PENDIENTE");
  doc.text(200, 300, pendiente);

  doc.roundedRect(15, 235, 582, 66, 3, 3);
}

function Fecha(doc, FECHA_ENTRADA, FECHA_SALIDA, TOTAL_NOCHES) {
  doc.setDrawColor(0);
  doc.setFillColor(230, 93, 101);
  doc.roundedRect(15, 210, 582, 50, 3, 3, "FD"); //  Black square with rounded corners

  doc.setDrawColor(0);
  doc.setFillColor(255, 255, 255);
  doc.rect(15, 235, 582, 25, "F");

  doc.setTextColor(255, 255, 255);
  doc.text(60, 225, "FECHA ENTRADA");
  doc.setTextColor(0, 0, 0);
  doc.text(70, 253, FECHA_ENTRADA);

  doc.setTextColor(255, 255, 255);
  doc.text(240, 225, "FECHA SALIDA");
  doc.setTextColor(0, 0, 0);
  doc.text(250, 253, FECHA_SALIDA);

  doc.setTextColor(255, 255, 255);
  doc.text(420, 225, "TOTAL NOCHES");
  doc.setTextColor(0, 0, 0);
  doc.text(430, 253, TOTAL_NOCHES);

  //doc.setDrawColor(0);

  doc.roundedRect(15, 210, 582, 50, 3, 3);
}

function Cliente(doc, NOMBRE_PASAJERO, TOTAL_PAGADO) {
  doc.setDrawColor(0);
  doc.setFillColor(230, 93, 101);
  doc.roundedRect(15, 310, 582, 50, 3, 3, "FD"); //  Black square with rounded corners

  doc.setDrawColor(0);
  doc.setFillColor(255, 255, 255);
  doc.rect(15, 335, 582, 25, "F");

  doc.setTextColor(255, 255, 255);
  doc.text(60, 325, "NOMBRE PASAJERO");
  doc.setTextColor(0, 0, 0);
  doc.text(70, 353, NOMBRE_PASAJERO);

  doc.setTextColor(255, 255, 255);
  doc.text(440, 325, "TOTAL PAGADO");
  doc.setTextColor(0, 0, 0);
  console.log(TOTAL_PAGADO);
  doc.text(460, 353, MoneyFormatter(TOTAL_PAGADO));
}

function Cuadros(
  doc,
  NUM_HABITACIONES,
  NOMBRE_AGENCIA,
  NUM_SGL,
  NUM_DBL,
  NUM_TPL,
  NUM_CPL,
  CIUDAD_AGENCIA,
  MEN_CC,
  MEN_SC,
  MEN_JR,
  TELEFONO_AGENCIA,
  PLAN_CONTRATADO,
  CONTACTO_AGENCIA,
  CONFIRMADO_POR,
  OBSERVACIONES,
  CLAVE
) {
  doc.setDrawColor(0);
  doc.setFillColor(230, 93, 101);
  doc.roundedRect(15, 410, 582, 25, 3, 3, "FD"); //  Black square with rounded corners

  doc.setDrawColor(0);
  doc.setFillColor(255, 255, 255);
  doc.rect(5, 435, 582, 25, "F");

  doc.setTextColor(255, 255, 255);
  doc.text(60, 425, "RELACION DE HABITACIONES");
  doc.setTextColor(0, 0, 255);
  doc.setFontSize(11);
  doc.text(30, 448, "No. DE HABITACIONES RESERVADAS:");
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  doc.text(30, 458, NUM_HABITACIONES);
  //
  doc.setTextColor(0, 0, 255);
  doc.setFontSize(11);
  doc.text(30, 472, "DESGLOCE OCUPACION:");
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  doc.text(
    30,
    485,
    `SGL: ${NUM_SGL} DBL: ${NUM_DBL} TPL: ${NUM_TPL} CPL: ${NUM_CPL}`
  );
  //
  doc.setTextColor(0, 0, 255);
  doc.setFontSize(11);
  doc.text(30, 499, "MENORES:");
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  doc.text(30, 510, `C/C: ${MEN_CC} S/C ${MEN_SC} JR ${MEN_JR} `);
  //
  doc.setTextColor(0, 0, 255);
  doc.setFontSize(11);
  doc.text(30, 520, "PLAN CONTRADO");
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  doc.text(30, 530, PLAN_CONTRATADO);
  //
  doc.setTextColor(0, 0, 255);
  doc.setFontSize(11);
  doc.text(30, 550, "CONFIRMADO POR");
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  doc.text(30, 560, CONFIRMADO_POR);
  //
  doc.setTextColor(0, 0, 255);
  doc.setFontSize(11);
  doc.text(30, 574, "CLAVE");
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  doc.text(30, 584, CLAVE);

  //DATOS AGENCIA
  doc.setTextColor(255, 255, 255);
  doc.text(390, 425, "DATOS DE LA AGENCIA");
  doc.setTextColor(0, 0, 0);
  doc.setTextColor(0, 0, 255);
  doc.setFontSize(11);
  doc.text(390, 448, "NOMBRE DE LA AGENCIA");
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  doc.text(390, 458, NOMBRE_AGENCIA);
  //
  doc.setTextColor(0, 0, 255);
  doc.setFontSize(11);
  doc.text(390, 472, "CIUDAD");
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  doc.text(390, 485, CIUDAD_AGENCIA);
  //
  doc.setTextColor(0, 0, 255);
  doc.setFontSize(11);
  doc.text(390, 499, "TELEFONO");
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  doc.text(390, 510, TELEFONO_AGENCIA);
  //
  doc.setTextColor(0, 0, 255);
  doc.setFontSize(11);
  doc.text(390, 520, "CONTACTO");
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  doc.text(390, 5410, CONTACTO_AGENCIA);
  //
  doc.setTextColor(0, 0, 255);
  doc.setFontSize(11);
  doc.text(390, 550, "OBSERVACIONES");
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  doc.text(390, 560, OBSERVACIONES);
}

export default {
  Header,
  Detalles,
  Cliente,
  Cuadros,
  Fecha,
  PagosRegistrados,
};
