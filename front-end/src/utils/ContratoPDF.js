import gvalogo from '../images/gvalogo'
import footer from '../images/footer';
import { MoneyFormatter } from '../utils/helpers';

//buen azul para etiquetas  129, 139, 182
function Header(doc, Folio) {
          let color_encabezado = (170, 182, 198);//(255,255,255);
          let azul_fuerte_letras = (29,34,78)
          doc.setFillColor(170, 182, 198) //red
          
          doc.ellipse(-20, -50, 950, 131, 'F');
          doc.setDrawColor(170, 182, 198);
          doc.ellipse(-20, -45, 950, 131, 'D');
          doc.ellipse(-20, -40, 950, 131, 'D');
          


          try {
            doc.addImage(gvalogo, 'PNG', 20, 20, 170, 50);
          } catch (error) {
            console.log(gvalogo)
          }
          doc.setFontSize(17);

          
          doc.setTextColor(29,34,78) //azul fuerte
          
        
          doc.textWithLink( 'Contrato de Prestación',217, 45,{ url: 'https://goo.gl/maps/KgRQhTxJQoMNe8nv9' });
          doc.text(210, 65, 'de Servicios "Transporte"');
          

          doc.setFontSize(11);
          doc.setDrawColor(0);
          
          doc.setFillColor(29,34,78) //rojo
          doc.roundedRect(470, 30, 100, 44, 3, 3, 'FD'); //Fill D/border
          
          doc.setTextColor(255,255,255);
          doc.text(500, 43, 'FOLIO');
          
          doc.setTextColor(0,0,0);

          doc.setDrawColor(0);
          doc.setFillColor(255, 255, 255);
          doc.rect(470, 52, 100, 25,'F'); 
          
          doc.setTextColor(29,34,78);
          doc.text(502, 64, Folio);
        
          doc.setDrawColor(0);
          doc.setFillColor(255, 255, 255);
          doc.roundedRect(470, 30, 100, 44, 3, 3); //  Black square with rounded corners
           ///       x    y  ancho altura 
}


function Detalles(doc, CLIENTE_NOMBRE, CLIENTE_DIRECCION, CLIENTE_CIUDAD, CLIENTE_TELEFONO
  ,DESTINO, FECHA_SALIDA, HORA_SALIDA, HORA_PRESENTARSE,  ENCARGADO, DIRECCION_SALIDA, ENTRE_CALLES, 
  COLONIA_CIUDAD, PUNTO_REFERENCIA, FECHA_REGRESO, HORA_REGRESO,FECHA_CONTRATO,
  TIPO_UNIDAD, CAPACIDAD,EQUIPADA,checkBox, IMPORTE_TOTAL, ANTICIPO, SALDO ) {

        let starty = 90;
        let increment = 24;
        let tabinsidesection = 17
        let color_labels = (255,255,255);//(255,255,255);
        let color_azules = (62, 53, 125);//(255,255,255);
        let color_valores = (0,0,0);//(255,255,255);
        doc.setDrawColor(29,34,78);
        doc.setLineWidth(.8)

        doc.setTextColor(color_valores)
        doc.setFont('helvetica', "bold")
        doc.text(20, starty+13, 'DATOS DEL CONTRATANTE');
        doc.setFont('helvetica', "normal")
        starty += tabinsidesection; 

        doc.setFillColor(126, 152, 186) //azul relleno
        doc.roundedRect(15, starty, 90, 51, 6, 6, 'F');
        doc.rect(95, starty, 10, 51, 'F')
        doc.roundedRect(15, starty, 550, 51, 6, 6, 'D');


        doc.setTextColor(color_labels);
        doc.text(30, starty+13, 'NOMBRE');
        doc.setTextColor(color_valores) 
        doc.text(110, starty+13, CLIENTE_NOMBRE);
        doc.setLineWidth(.5)
        doc.line(15, starty+17, 565, starty+17);
        

        starty += tabinsidesection;
        
        doc.setFillColor(126, 152, 186) //azul relleno
        doc.setTextColor(color_labels)
        doc.text(30, starty+13, 'DIRECCION');
        doc.setTextColor(color_valores)
        doc.text(110, starty+13, CLIENTE_DIRECCION);
        
        
        doc.line(15, starty+17, 565, starty+17);
        

        starty += tabinsidesection;
        doc.setTextColor(color_labels)
        doc.text(30, starty+13, 'CIUDAD');
        doc.setTextColor(color_valores)
        doc.text(110, starty+13, CLIENTE_CIUDAD);
        

        doc.setFillColor(126, 152, 186) //azul relleno
        doc.rect(330, starty, 69, 17, 'F');
        doc.setTextColor(color_labels)
        doc.text(335, starty+13, 'TELEFONO');
        doc.setTextColor(color_valores)
        doc.text(420, starty+13, CLIENTE_TELEFONO);
        

        doc.setLineWidth(.8)
        starty += tabinsidesection; 
        doc.setTextColor(color_valores)
        doc.setFont('helvetica', "bold")
        doc.text(20, starty+13, 'DATOS DE SALIDA Y REGRESO DE VIAJE');
        doc.setFont('helvetica', "normal")
        
        
        starty += tabinsidesection;
        // rectangulo de toda la seccion  DATOS DE SALIDA Y REGRESO DE VIAJE
        doc.setTextColor(color_valores)
        doc.roundedRect(15, starty, 550, 250, 3, 3, 'D');
        // rectangulo de toda la seccion  DATOS DE SALIDA Y REGRESO DE VIAJE

        doc.setLineWidth(.5)
        doc.setTextColor(color_azules)
        doc.text(30, starty+13, 'DESTINO');
        doc.setTextColor(color_valores)
        doc.text(110, starty+13, DESTINO);
        doc.line(15, starty+17, 565, starty+17);
        
        
        doc.setTextColor(color_azules)
        doc.text(335, starty+13, 'FECHA DE SALIDA');
        doc.setTextColor(color_valores)
        doc.text(444, starty+13, FECHA_SALIDA);
        
        
        starty += tabinsidesection; 

        doc.setTextColor(color_azules)
        doc.text(30, starty+13, 'HORA DE SALIDA');
        doc.setTextColor(color_valores)
        doc.text(130, starty+13, HORA_SALIDA);
        doc.line(15, starty+17, 565, starty+17);
        
        
        doc.setTextColor(color_azules)
        doc.text(335, starty+13, 'PRESENTARSE');
        doc.setTextColor(color_valores)
        doc.text(444, starty+13, HORA_PRESENTARSE);
        
        starty += tabinsidesection; 

        doc.setTextColor(color_azules)
        doc.text(30, starty+13, 'ENCARGADO DE LA UNIDAD');
        doc.setTextColor(color_valores)
        doc.text(190, starty+13, ENCARGADO);
        doc.line(15, starty+17, 565, starty+17);
        
        
        doc.setTextColor(color_azules)
        doc.text(335, starty+13, 'TEL / CEL');
        doc.setTextColor(color_valores)
        doc.text(444, starty+13, ENCARGADO);
        
        starty += tabinsidesection; 

        doc.setTextColor(color_azules)
        doc.text(30, starty+13, 'DIRECCION DE SALIDA');
        doc.setTextColor(color_valores)
        doc.text(165, starty+13, DIRECCION_SALIDA);
        doc.line(15, starty+17, 565, starty+17);
        
        starty += tabinsidesection; 
        doc.setTextColor(color_azules)
        doc.text(30, starty+13, 'ENTRE LAS CALLES');
        doc.setTextColor(color_valores)
        doc.text(165, starty+13, ENTRE_CALLES);
        doc.line(15, starty+17, 565, starty+17);
        
        starty += tabinsidesection; 

        doc.setTextColor(color_azules)
        doc.text(30, starty+13, 'COLONIA Y CIUDAD');
        doc.setTextColor(color_valores)
        doc.text(165, starty+13, COLONIA_CIUDAD);
        doc.line(15, starty+17, 565, starty+17);
        
        starty += tabinsidesection; 

        doc.setTextColor(color_azules)
        doc.text(30, starty+13, 'PUNTO DE REFERENCIA');
        doc.setTextColor(color_valores)
        doc.text(165, starty+13, PUNTO_REFERENCIA);
        doc.line(15, starty+17, 565, starty+17);
        
        starty += tabinsidesection; 

        doc.setTextColor(color_azules)
        doc.text(30, starty+13, 'ITINERARIO');
        doc.setTextColor(color_valores)

         doc.roundedRect(30, starty+15, 500, 57, 3, 3, 'D');

        //var splitObservacion = doc.splitTextToSize(ITINERARIO, 550);
        var splitObservacion = "" 
        doc.text(160, starty+13, splitObservacion);
        
        starty += increment; 
        starty += increment; 
        starty += increment; 

        
        doc.setTextColor(color_azules)
        doc.text(30, starty+13, 'FECHA DE REGRESO');
        doc.setTextColor(color_valores)
        doc.text(165, starty+13, FECHA_REGRESO);
        doc.line(15, starty+17, 565, starty+17);
        
        
        doc.setTextColor(color_azules)
        doc.text(335, starty+13, 'HORA DE REGRESO');
        doc.setTextColor(color_valores)
        doc.text(444, starty+13, HORA_REGRESO);

        starty += increment; 
        doc.setTextColor(color_valores)

        console.log(doc.getFont())
        console.log(doc.getFontList())
        doc.setFontSize(9)
        doc.setFont('helvetica', "italic")
        var splitObservacion = doc.splitTextToSize('IMPORTANTE: TRASLADO O PASEO EXTRA NO ESPECIFICADO TIENE COSTO EXTRA Y TENDRA QUE SER LIQUIDADO AL MOMENTO DE REALIZARLO DIRECTO CON EL OPERADOR', 550);
        doc.text(20, starty+13, splitObservacion);
        doc.setFontSize(11)
        doc.setFont('helvetica', "normal")


        //FIN RECTANGULO
        starty += tabinsidesection*2; 
        doc.setLineWidth(.8)
        doc.setTextColor(color_valores)
        doc.setFont('helvetica', "bold")
        doc.text(20, starty+13, 'CARACTERISTICAS DE LA UNIDAD CONTRATADA');
        doc.setFont('helvetica', "normal")
        starty += tabinsidesection;
        // rectangulo de toda la seccion TIPO UNIDAD
        doc.setTextColor(color_valores)
        doc.roundedRect(15, starty, 550, 90, 3, 3, 'D');
        // rectangulo de toda la seccion TIPO UNIDAD

        doc.setLineWidth(.5)
        doc.setTextColor(color_azules)
        doc.text(30, starty+13, 'TIPO DE UNIDAD');
        doc.setTextColor(color_valores)
        doc.text(124, starty+13, TIPO_UNIDAD);
        doc.line(15, starty+17, 565, starty+17);
        
        
        doc.setTextColor(color_azules)
        doc.text(180, starty+13, 'CAPACIDAD');
        doc.setTextColor(color_valores)
        doc.text(250, starty+13, CAPACIDAD);

        doc.setTextColor(color_azules)
        doc.text(335, starty+13, 'FECHA CONTRATO');
        doc.setTextColor(color_valores)
        doc.text(444, starty+13, FECHA_CONTRATO);

        starty += tabinsidesection; 
        doc.setTextColor(color_azules)
        doc.text(30, starty+13, 'UNIDAD EQUIPADA CON:');


        starty += increment+5; 
        
        doc.setFontSize(8)
        console.log(EQUIPADA)
        doc.circle(60, starty, 7, 'D'); //AIRE   
            doc.text(57, starty+3, EQUIPADA.includes('AIRE ACONDICIONADO') ? 'X' : '');
        doc.text(70, starty+3, 'AIRE ACONDICIONADO'); 

        doc.circle(180, starty, 7, 'D'); //sanitario
            doc.text(177, starty+3, EQUIPADA.includes('SANITARIO') ? 'X' : '');
        doc.text(190, starty+3, 'SANITARIO');

        doc.circle(300, starty, 7, 'D'); //TV/DVD
            doc.text(297, starty+3, EQUIPADA.includes('TV/DVD') ? 'X' : ''); 
        doc.text(310, starty+3, 'TV/DVD');

        doc.circle(420, starty, 7, 'D');  //Microfono
            doc.text(417, starty+3, EQUIPADA.includes('MICROFONO') ? 'X' : '');
        doc.text(430, starty+3, 'MICROFONO');
        
        starty += increment; 

        doc.circle(60, starty, 7, 'D'); //STEREO
            doc.text(57, starty+3, EQUIPADA.includes('STEREO') ? 'X' : '');
        doc.text(70, starty+3, 'STEREO');
        
        doc.circle(180, starty, 7, 'D'); //SEGURO DE PASAJEROS
            doc.text(177, starty+3, EQUIPADA.includes('SEGURO DE PASAJERO') ? 'X' : '');
            doc.text(177, starty+3, EQUIPADA.includes('SEGURO DE VIAJERO') ? 'X' : '');
            
        doc.text(190, starty+3, 'SEGURO DE PASAJEROS');

        doc.circle(380, starty, 7, 'D'); //OTROS
        doc.text(390, starty+3, 'OTROS:');

        doc.setFontSize(11)
        doc.setLineWidth(.8)
        
        starty += tabinsidesection; 
        doc.setTextColor(color_valores)
        doc.setFont('helvetica', "bold")
        doc.text(20, starty+13, 'PAGOS');
        doc.setFont('helvetica', "normal")
        starty += tabinsidesection; 
        doc.setTextColor(color_valores)
        doc.roundedRect(15, starty, 550, 60, 3, 3, 'D');
        // rectangulo de toda la seccion TIPO UNIDAD
        
        doc.setLineWidth(.5)
        doc.line(15, starty+20, 565, starty+20);
        starty += tabinsidesection; 
        doc.setTextColor(color_azules)
        doc.text(30, starty, 'IMPORTE TOTAL');
        doc.setTextColor(color_valores)
        doc.text(120, starty, IMPORTE_TOTAL);
        
        doc.line(15, starty+22, 565, starty+22);
        starty += tabinsidesection; 
        
        doc.setTextColor(color_azules)
        doc.text(30, starty, 'ANTICIPO');
        doc.setTextColor(color_valores)
        doc.text(120, starty, ANTICIPO);

        starty += tabinsidesection; 
        doc.setTextColor(color_azules)
        doc.text(30, starty, 'SALDO');
        doc.setTextColor(color_valores)
        doc.text(120, starty, SALDO);

        
        starty += increment; 
        doc.setFontSize(8);
         // rectangulo de toda la seccion TIPO UNIDAD
         doc.setTextColor(color_valores)
         doc.roundedRect(15, starty-10, 550, 105, 3, 3, 'D');
         // rectangulo de toda la seccion TIPO UNIDAD

       

        doc.setTextColor(color_azules)
        var derivado = doc.splitTextToSize("Derivado del Servicio de Transporte Terrestre que solicite a la empresa GVA Tours S.A. de C.V., y una vez que he leido el total de las condiciones que se adjuntan al presente contrato, estoy de acuerdo con el total de su contenido.", 530);
        doc.text(20, starty, derivado);
        
        starty += increment*3; 
        doc.line(90, starty-10, 240, starty-10);
        
        doc.text(90, starty, 'Nombre y Firma de aceptación del Cliente');
        doc.line(300, starty-10, 450, starty-10);

        doc.text(300, starty, 'Nombre y Firma del prestador de servicios');
        starty += tabinsidesection;
        doc.text(300, starty, 'TELEFONO DE EMERGENCIA:');

        starty += tabinsidesection;
        doc.text(20, starty, 'NOTA IMPORTANTE: A la firma del contrato deberá cubrirse el 30% del importe total, y el saldo una semana antes de la realización del viaje.');

        doc.setFontSize(10);
       
}

function condiciones(doc) {
  doc.addPage();
  let starty = 55;
  let tabinsidesection = 17
  let div = 64;
  doc.setLineWidth(.8)
  doc.roundedRect(15, starty, 550, 600, 3, 3, 'D');

  starty = 70;
  doc.setFont(undefined, 'bold')
let texto = "CLAUSULAS";
doc.text(280, starty, texto);
starty += tabinsidesection* parseInt(texto.length/div);
doc.setFont(undefined, 'normal')

starty= 90

texto = "1.- Los pasajeros se comprometen a respetar los horarios e itinerarios estipulados tanto de salidas como de llegadas, de no ser así se le cobrará al contratante el tiempo excedente proporcionalmente a lo estipulado en este contrato, por lo que en caso de ampliar la ruta, el horario o cualquier modificación al kilometraje acordado, en el presente contrato, será cubierto con una cantidad adicional fijada por la empresa transportista en la ciudad donde se celebró el contrato."
var splitObservacion = doc.splitTextToSize(texto, 250);
doc.text(40, starty, splitObservacion);
starty += tabinsidesection* parseInt(texto.length/div);

texto = "2.- Cuando el contratante cancela este contrato tendrá derecho al importe total del mismo, siempre y cuando lo haga con un mínimo de 15 días antes de la fecha y horario establecido de salida. "
var splitObservacion = doc.splitTextToSize(texto, 250);
doc.text(40, starty, splitObservacion);
starty += tabinsidesection* parseInt(texto.length/div)+17;

texto = "Si el aviso de cancelación se realiza entre 14 a 10 días la sanción será del 30%, si es de 9 a 5 días la sanción será del 50% y de 4 días a la fecha y hora de salida será del 100%. Esto mismo aplica para la cancelación de los servicios adicionales contratados."
var splitObservacion = doc.splitTextToSize(texto, 250);
doc.text(40, starty, splitObservacion);
starty += tabinsidesection* parseInt(texto.length/div) ;
texto = "El aviso de cancelación deberá darse por escrito y con acuse de recibido."
var splitObservacion = doc.splitTextToSize(texto, 250);
doc.text(40, starty, splitObservacion);
starty += tabinsidesection* parseInt(texto.length/div)+17 ;
texto = "3.- Si el contratante interrumpiera su viaje en un lugar u horario intermedio de lo acordado en el presente contrato por causas no imputables a GVA Tours S.A. de C.V., el cliente NO tendrá derecho al reembolso. "
var splitObservacion = doc.splitTextToSize(texto, 250);
doc.text(40, starty, splitObservacion);
starty += tabinsidesection* parseInt(texto.length/div) ;
texto = "4.- El número de pasajeros en ningún caso deberá exceder la capacidad autorizada del vehículo que se contrate, de lo contrario GVA Tours S.A. de C.V. solo estará obligado a aceptar y realizar el viaje con la capacidad de personas previamente establecida en el contrato. Si aun así el contratante continuara exigiendo el servicio y a voluntad de GVA Tours S.A. de C.V. se realizara el mismo. El contratante se hará responsable de todas y cada una de las sanciones que la Secretaria de Comunicaciones y Transportes o cualesquiera otra autoridad aplique al respecto, sin responsabilidad para GVA Tours S.A. de C.V. "
var splitObservacion = doc.splitTextToSize(texto, 250);
doc.text(40, starty, splitObservacion);
starty += tabinsidesection* parseInt(texto.length/div) ;
texto = "5.- En el caso en que la unidad contratada no se presente en el lugar y fecha establecidos, la empresa GVA Tours S.A. de C.V., queda obligada a devolver el importe cobrado; el contratante no podrá exigir una mayor cantidad a la expresada en el presente contrato."
var splitObservacion = doc.splitTextToSize(texto, 250);
doc.text(40, starty, splitObservacion);
starty += tabinsidesection* parseInt(texto.length/div);



starty = 77;
div = 50;

let columna2 = "6.- GVA Tours S.A. de C.V. no se hace responsable de daños o perjuicios que se provoquen al contratante por retrasos en llegada o salida de cualquiera de los puntos señalados en el contrato debido a las fallas mecánicas, condiciones desfavorables del tiempo, impedimento de pasos, revisiones oficiales y otras causas de fuerza mayor. "
var splitObservacion = doc.splitTextToSize(columna2, 250);
doc.text(300, starty+13, splitObservacion);
starty += tabinsidesection* parseInt(columna2.length/div) ;

columna2 = "7.- Se prohíbe al contratante conjuntamente con los pasajeros ingerir bebidas alcohólicas y/o drogas durante el trayecto del viaje. La empresa se reserva el derecho de transportación de esta (s) persona (s)."
var splitObservacion = doc.splitTextToSize(columna2, 250);
doc.text(300, starty+13, splitObservacion);
starty += tabinsidesection* parseInt(columna2.length/div) ;

columna2 = "8.- Los daños ocasionados al autobús por negligencia o culpa directa del contratante o pasajeros, serán cobrados en su totalidad al contratante."
var splitObservacion = doc.splitTextToSize(columna2, 250);
doc.text(300, starty+13, splitObservacion);
starty += tabinsidesection* parseInt(columna2.length/div) ;

columna2 = "9.- GVA Tours S.A. de C.V. no se hace responsable por objetos olvidados en el autobús por alguno de los pasajeros."
var splitObservacion = doc.splitTextToSize(columna2, 250);
doc.text(300, starty+13, splitObservacion);
starty += tabinsidesection* parseInt(columna2.length/div) ;

columna2 = "10.-  Los autobuses no pueden entrar en caminos estrechos o de terracería que pongan en peligro a la unidad. Cualquier daño o perjuicio por insistencia del cliente será cobrada en su totalidad."
var splitObservacion = doc.splitTextToSize(columna2, 250);
doc.text(300, starty+13, splitObservacion);
starty += tabinsidesection* parseInt(columna2.length/div) ;

columna2 = "11.-  Por disposiciones de la Secretaria de Hacienda y Crédito Público, las empresas de autotransporte estarán sujetas al régimen simplificado según el artículo 67de título IIA de la Ley del impuesto sobre la renta. La empresa transportara no reflejará el IVA en su facturación, de acuerdo al artículo 15 del impuesto del valor agregado."
var splitObservacion = doc.splitTextToSize(columna2, 250);
doc.text(300, starty+13, splitObservacion);
starty += tabinsidesection* parseInt(columna2.length/div) ;

columna2 = "12.- En caso de requerirse alguna modificación en el itinerario u horario autorizo a ___________________________________________________________ para que realice los trámites necesarios que procedan originados por dichas modificaciones la contrato."
var splitObservacion = doc.splitTextToSize(columna2, 250);
doc.text(300, starty+13, splitObservacion);
starty += tabinsidesection* parseInt(columna2.length/div) ;

columna2 = "13.- GVA Tours S.A. de C.V. se obliga en caso de descompostura reemplazar la unidad con características semejantes a la contratada, en un plazo de tiempo igual al tiempo de recorrido del punto de descompostura a la base de la empresa en la ciudad de Guadalajara."


var splitObservacion = doc.splitTextToSize(columna2, 250);
doc.text(300, starty+13, splitObservacion);

doc.setFillColor(170, 182, 198)
doc.setDrawColor(170, 182, 198);
doc.ellipse(-20, 800, 950, 131, 'F');
doc.ellipse(-20, 795, 950, 131, 'D');
doc.ellipse(-20, 790, 950, 131, 'D');
let color_valores = (0,0,0);
doc.setTextColor(color_valores)
doc.setFont(undefined, 'bold');
let pie = "GVA Tours S.A. de C.V."
doc.text(xcenter(doc,pie), 700, pie);
pie = "AV. Fidel Velazquez #643-A Col. Santa Elena Alcalde CP. 44230 Guadalajara, Jalisco"
doc.text(xcenter(doc,pie), 715, pie);

doc.textWithLink('www.gvatours.com',60, 730,{ url: 'www.gvatours.com' });

doc.textWithLink('T. (33) 3631 3036 con 10 lineas',252, 730,{ url: '3631 3036' });

doc.textWithLink('info@gvatours.com',450, 730,{ url: 'mailto:info@gvatours.com' });
  

} 

function xcenter(doc, phrase){
    return (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth(phrase) * doc.internal.getFontSize() / 2);
    
}

function pieCharter(doc){
    let starty = 615;
    let incremento = 13;

    doc.addImage(footer, 'PNG', 0, starty, doc.internal.pageSize.width, 305);
    
    doc.setLineDash([1, 1], 0);
    // doc.line(15, starty-incremento, 560, starty-incremento);
    
    let righty = starty
    doc.setTextColor(7, 109, 150) // azul blue
    doc.setFontSize(10);
    const salidas1 = "Los puntos de Salida son:";
    doc.text(30, starty, salidas1);
    const salidas2 = "5:30 am Soriana Rio Nilo a un costado de Banamex (Rio Nilo y Patria)";
    starty += incremento; 
    doc.text(30, starty, salidas2);
    const salidas3 = "6:00 am Plaza Forum sobre Blvd Tlaquepaque";
    starty += incremento; 
    doc.text(30, starty, salidas3);
    const salidas4 = "7:00 am Minerva Frente al Hotel Fiesta Americana Minerva";
    starty += incremento; 
    doc.text(30, starty, salidas4);
    const salidas5 = "7:15 am Central Zapopan en Oxxo y Pollo Pepe";
    starty += incremento; 
    doc.text(30, starty, salidas5);
    const salidas6 = "Se les pide estar 30 min antes para su registro";
    starty += incremento; 
    doc.text(30, starty, salidas6);
    ///
    const regreso1 = "Los Horario de Regreso son los siguientes:";
    doc.text(350, righty, regreso1);
    const regreso2 = "Pto. Vallarta de 1:20 pm a 2:00 pm";
    righty += incremento; 
    doc.text(350, righty, regreso2);
    const regreso3 = "Nvo. Vallarta de 2:00 pm a 2:30 pm";
    righty += incremento; 
    doc.text(350, righty, regreso3);
    const regreso4 = "Bucerias 2:30 pm";
    righty += incremento; 
    doc.text(350, righty, regreso4);
    const regreso5 = "Punta de Mita 3:00 pm a 3:20 pm";
    righty += incremento; 
    doc.text(350, righty, regreso5);
    const regreso6 = "Sayulita 3:30 pm";
    righty += incremento; 
    doc.text(350, righty, regreso6);
    const regreso7 = "Guayabitos de 3:30 pm a 4:00 pm";
    righty += incremento; 
    doc.text(350, righty, regreso7);
    const regreso8 = "Los horarios son reconfirmados el dia";
    righty += incremento; 
    doc.text(350, righty, regreso8);
    const regreso9 = "de su Salida en Guadalajara";
    righty += incremento; 
    doc.text(350, righty, regreso9);

    
    incremento = 16
    starty += incremento*2.5; 
    
    

    



    doc.setLineDash([1, 1], 0);
    doc.line(15, starty, 560, starty);

    doc.setFontSize(10)
    
    doc.setFont("normal" ,"bold");
    
    doc.setTextColor(7, 109, 150) // azul

    starty += 10;
    let leyenda0  = "Charter Terrestre es un servicio de Transporte Turístico, el cual debe de estar acompañado de una Reservación de Hotel;";
    doc.text(leyenda0, xcenter(doc,leyenda0), starty );

    starty += 10;
    leyenda0  = "por eso es obligatorio presentar su Cupón o confirmación de Hospedaje al abordar la unidad en el punto de salida;";
    doc.text(leyenda0, xcenter(doc,leyenda0), starty );
    

    starty += 10;
    leyenda0  = "el no presentarlo,  será motivo para negar el servicio.";
    doc.text(leyenda0, xcenter(doc,leyenda0), starty );

    starty += 10;
    leyenda0  = "Cualquier cambio de fecha aplica un cargo de $200 por persona adulto y niños sujeto a disponibilidad";
    doc.text(leyenda0, xcenter(doc,leyenda0), starty );
    

    starty += 10;
    const leyenda1  = "TELEFONO DE EMERGENCIA EN LA SALIDA 333-808-6093 CON GUSTAVO JAUREGUI";
    doc.text(leyenda1, xcenter(doc,leyenda1), starty );
    

    doc.setFontSize(8)
    
    starty += 10;
    doc.setTextColor(7, 109, 150)
    const leyenda3  = "Av. Fidel Velazquez #643-A, Col. Santa Elena Alcande., CP 44230, Guadalajara, Jal. "
    doc.text(leyenda3, xcenter(doc,leyenda3), starty );
    const leyenda4  = "Tel. (33) 3631 3036 con 10 líneas";
    starty += 10; 
    doc.text(leyenda4, xcenter(doc,leyenda4), starty );

}

function FormaPago(doc, forma_pago){

    doc.setFillColor(230, 248, 255);
    doc.roundedRect(15, 205, 185, 22, 3, 3, 'F');

    doc.text(30, 220, 'FORMA DE PAGO');
    doc.text(200, 220, forma_pago);

    doc.roundedRect(15, 205, 582, 22, 3, 3);

}

function PagosRegistrados(doc, total, registrados, pendiente){

    doc.setFillColor(230, 248, 255);
    doc.roundedRect(15, 255, 180, 22, 3, 3, 'F');

    doc.text(30, 250, 'IMPORTE TOTAL');
    doc.text(200, 250, total);

    // doc.setFillColor(230, 248, 255);
    // doc.roundedRect(15, 205, 255, 22, 3, 3, 'F');
    doc.text(30, 275, 'PAGOS REGISTRADOS');
    doc.text(200, 275, registrados);

    // doc.setFillColor(230, 248, 255);
    // doc.roundedRect(15, 205, 285, 22, 3, 3, 'F');
    doc.text(30, 300, 'SALDO PENDIENTE');
    doc.text(200, 300, pendiente);


    doc.roundedRect(15, 235, 582, 66, 3, 3);

}

function Fecha(doc, FECHA_ENTRADA, FECHA_SALIDA, TOTAL_NOCHES) {
    

    doc.setDrawColor(0);
    doc.setFillColor(230, 93, 101);
    doc.roundedRect(15, 210, 582, 50, 3, 3, 'FD'); //  Black square with rounded corners
    
    
    doc.setDrawColor(0);
    doc.setFillColor(255, 255, 255);
    doc.rect(15, 235, 582, 25,'F');


    doc.setTextColor(255,255,255);
    doc.text(60, 225, 'FECHA ENTRADA');
    doc.setTextColor(0,0,0);
    doc.text(70, 253, FECHA_ENTRADA);


    doc.setTextColor(255,255,255);
    doc.text(240, 225, 'FECHA SALIDA');
    doc.setTextColor(0,0,0);
    doc.text(250, 253, FECHA_SALIDA);


    doc.setTextColor(255,255,255);
    doc.text(420, 225, 'TOTAL NOCHES');
    doc.setTextColor(0,0,0);
    doc.text(430, 253, TOTAL_NOCHES);

    //doc.setDrawColor(0);
    
    doc.roundedRect(15, 210, 582, 50, 3, 3);

   
}

function Cliente (doc,  NOMBRE_PASAJERO, TOTAL_PAGADO) {

    doc.setDrawColor(0);
    doc.setFillColor(230, 93, 101);
    doc.roundedRect(15, 310, 582, 50, 3, 3, 'FD'); //  Black square with rounded corners
    
    
    doc.setDrawColor(0);
    doc.setFillColor(255, 255, 255);
    doc.rect(15, 335, 582, 25,'F');


    doc.setTextColor(255,255,255);
    doc.text(60, 325, 'NOMBRE PASAJERO');
    doc.setTextColor(0,0,0);
    doc.text(70, 353, NOMBRE_PASAJERO);


    doc.setTextColor(255,255,255);
    doc.text(440, 325, 'TOTAL PAGADO');
    doc.setTextColor(0,0,0);
    console.log(TOTAL_PAGADO)
    doc.text(460, 353, MoneyFormatter(TOTAL_PAGADO) );

}

function Cuadros (doc, NUM_HABITACIONES, NOMBRE_AGENCIA,  NUM_SGL, NUM_DBL, NUM_TPL,  NUM_CPL,  CIUDAD_AGENCIA, MEN_CC, MEN_SC,  MEN_JR, TELEFONO_AGENCIA, PLAN_CONTRATADO, CONTACTO_AGENCIA,  CONFIRMADO_POR, OBSERVACIONES, CLAVE) {

    doc.setDrawColor(0);
    doc.setFillColor(230, 93, 101);
    doc.roundedRect(15, 410, 582, 25, 3, 3, 'FD'); //  Black square with rounded corners
    
    
    doc.setDrawColor(0);
    doc.setFillColor(255, 255, 255);
    doc.rect(5, 435, 582, 25,'F');


    doc.setTextColor(255,255,255);
    doc.text(60, 425, 'RELACION DE HABITACIONES');
    doc.setTextColor(0,0,255);
    doc.setFontSize(11);
    doc.text(30, 448, 'No. DE HABITACIONES RESERVADAS:');
    doc.setTextColor(0,0,0);
    doc.setFontSize(12);
    doc.text(30, 458, NUM_HABITACIONES);
    //
    doc.setTextColor(0,0,255);
    doc.setFontSize(11);
    doc.text(30, 472, 'DESGLOCE OCUPACION:');
    doc.setTextColor(0,0,0);
    doc.setFontSize(12);
    doc.text(30, 485, `SGL: ${NUM_SGL} DBL: ${NUM_DBL} TPL: ${NUM_TPL} CPL: ${NUM_CPL}`);
    //
    doc.setTextColor(0,0,255);
    doc.setFontSize(11);
    doc.text(30, 499, 'MENORES:');
    doc.setTextColor(0,0,0);
    doc.setFontSize(12);
    doc.text(30, 510, `C/C: ${MEN_CC} S/C ${MEN_SC} JR ${MEN_JR} `);
    //
    doc.setTextColor(0,0,255);
    doc.setFontSize(11);
    doc.text(30, 520, 'PLAN CONTRADO');
    doc.setTextColor(0,0,0);
    doc.setFontSize(12);
    doc.text(30, 530, PLAN_CONTRATADO);
    //
    doc.setTextColor(0,0,255);
    doc.setFontSize(11);
    doc.text(30, 550, 'CONFIRMADO POR');
    doc.setTextColor(0,0,0);
    doc.setFontSize(12);
    doc.text(30, 560, CONFIRMADO_POR);
    //
    doc.setTextColor(0,0,255);
    doc.setFontSize(11);
    doc.text(30, 574, 'CLAVE');
    doc.setTextColor(0,0,0);
    doc.setFontSize(12);
    doc.text(30, 584, CLAVE);
    
    //DATOS AGENCIA
    doc.setTextColor(255,255,255);
    doc.text(390, 425, 'DATOS DE LA AGENCIA');
    doc.setTextColor(0,0,0);
    doc.setTextColor(0,0,255);
    doc.setFontSize(11);
    doc.text(390, 448, 'NOMBRE DE LA AGENCIA');
    doc.setTextColor(0,0,0);
    doc.setFontSize(12);
    doc.text(390, 458, NOMBRE_AGENCIA);
    //
    doc.setTextColor(0,0,255);
    doc.setFontSize(11);
    doc.text(390, 472, 'CIUDAD');
    doc.setTextColor(0,0,0);
    doc.setFontSize(12);
    doc.text(390, 485, CIUDAD_AGENCIA);
    //
    doc.setTextColor(0,0,255);
    doc.setFontSize(11);
    doc.text(390, 499, 'TELEFONO');
    doc.setTextColor(0,0,0);
    doc.setFontSize(12);
    doc.text(390, 510, TELEFONO_AGENCIA);
    //
    doc.setTextColor(0,0,255);
    doc.setFontSize(11);
    doc.text(390, 520, 'CONTACTO');
    doc.setTextColor(0,0,0);
    doc.setFontSize(12);
    doc.text(390, 5410, CONTACTO_AGENCIA);
    //
    doc.setTextColor(0,0,255);
    doc.setFontSize(11);
    doc.text(390, 550, 'OBSERVACIONES');
    doc.setTextColor(0,0,0);
    doc.setFontSize(12);
    doc.text(390, 560, OBSERVACIONES);
    

}




export default {
    Header,
    Detalles,
    condiciones,
    pieCharter,
    
    Cliente,
    Cuadros,
    Fecha,
    FormaPago,
    PagosRegistrados
}