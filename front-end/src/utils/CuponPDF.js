import Logo from '../images/logo'
import { MoneyFormatter } from '../utils/helpers';

function Header(doc, receiptId) {
          const imgData = Logo
          doc.addImage(imgData, 'PNG', 5, 5);

          doc.setFontSize(12);
          doc.text(200, 35, 'www.gvatours.com');
          doc.textWithLink('info@gvatours.com', 200, 55, { url: 'info@gvatours.com' });

          
          doc.textWithLink( 'Av Fidel Velázquez Sánchez 64',310, 35,{ url: 'https://goo.gl/maps/KgRQhTxJQoMNe8nv9' });
          doc.text(315, 50, 'Santa Elena Alcalde');
          doc.text(315, 70, 'CP:44230 Guadalajara, Jal');

          
          doc.setDrawColor(0);
          doc.setFillColor(7, 109, 150);
          doc.roundedRect(500, 25, 100, 45, 10, 10, 'FD'); //  Black square with rounded corners
          doc.text(530, 37, 'FOLIO');

          doc.setDrawColor(0);
          doc.setFillColor(255, 255, 255);
          doc.rect(500, 45, 100, 25,'F'); 
          doc.text(525, 57, receiptId);

          doc.setDrawColor(0);
          doc.setFillColor(255, 255, 255);
          doc.roundedRect(500, 25, 100, 45, 10, 10); //  Black square with rounded corners
}


function Destino(doc, DESTINO, HOTEL, DIRECCION_HOTEL, TELEFONO_HOTEL) {

        doc.setFillColor(230, 248, 255);
        doc.roundedRect(15, 100, 90, 22, 3, 3, 'F');

        //label destino
        doc.text(30, 115, 'DESTINO:');
        doc.text(110, 115, DESTINO);
            // x -- y length - y   
        doc.line(15, 121, 105, 121);


        //label hotel
        doc.setFillColor(230, 248, 255);
        doc.roundedRect(15, 122, 90, 22, 3, 3, 'F');

        doc.text(30, 136, 'HOTEL:');
        doc.text(110, 136, HOTEL);
        // x -- y length - y   
        doc.line(15, 143, 105, 143);


        //label direccion
        doc.setFillColor(230, 248, 255);
        doc.roundedRect(15, 144, 90, 22, 3, 3, 'F');

        doc.text(30, 160, 'DIRECCION:');
        doc.text(110, 160, DIRECCION_HOTEL);
        // x -- y length - y   
        doc.line(15, 165, 105, 165);



        //label telefono
        doc.setDrawColor(0);
        doc.setFillColor(230, 248, 255);
        doc.roundedRect(15, 166, 90, 22, 3, 3, 'F');

        //doc.rect(15, 166, 582, 22);
        doc.text(30, 184, 'TELEFONO:');
        doc.text(110, 184, TELEFONO_HOTEL);

        doc.roundedRect(15, 100, 582, 88, 3, 3);


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
    Destino,
    Cliente,
    Cuadros,
    Fecha
}