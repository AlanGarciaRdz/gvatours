import charter from '../images/charter'
import footer from '../images/footer';
import footer2 from '../images/footer2';
import { MoneyFormatter } from '../utils/helpers';

function Header(doc, PAPELETA, cantidad) {
          const imgData = charter
          
          try {
            doc.addImage(imgData, 'PNG', 30, 30, 200, 80, 'FAST');
          } catch (error) {
            console.log(imgData)
          }
          
          
          PAPELETA = PAPELETA.split(' ')

        //   doc.setFontSize(12);
        //   doc.text(200, 35, 'CUPON DE');
        //   doc.text(200, 55, 'CHARTER');
        //   doc.textWithLink('TURISTICO', 200, 70, { url: 'info@gvatours.com' });

         doc.setFontSize(20);
        
          doc.textWithLink( 'CUPON DE',280, 46,{ url: 'https://goo.gl/maps/KgRQhTxJQoMNe8nv9' });
          doc.text(280, 64, 'CHARTER');
          doc.text(280, 84, 'TURISTICO');

          doc.setFontSize(11);
          doc.setDrawColor(0);
          //   doc.setFillColor(7, 109, 150); //blue
          doc.setFillColor(232,68, 86) //red
          doc.roundedRect(470, 30, 100, 44, 3, 3, 'FD'); //Fill D/border
          
          doc.setTextColor(255,255,255);
          doc.text(500, 43, 'FOLIO');
          doc.setTextColor(0,0,0);

          doc.setDrawColor(0);
          doc.setFillColor(255, 255, 255);
          doc.rect(470, 52, 100, 25,'F'); 
          
          doc.setTextColor(220, 43, 27);
          doc.text(490, 64, PAPELETA[0]);
          doc.text(510, 64, PAPELETA[PAPELETA.length-1]);

          doc.setDrawColor(0);
          doc.setFillColor(255, 255, 255);
          doc.roundedRect(470, 30, 100, 44, 3, 3); //  Black square with rounded corners
           ///       x    y  ancho altura 
}


function Detalles(doc, CLIENTE_NOMBRE, HOTEL , DESTINO, FECHA_SALIDA, FECHA_REGRESO, ABORDA, 
    adultos_juniors, menores_cargo, menores_sin_cargo, 
    TRAVELAGENCY_NOMBRE, TRAVELAGENCY_CIUDAD, AGENTE, CLAVE, INCLUYE, 
    redondo, OBSERVACIONES ) {

        let starty = 120;
        let increment = 24;
        let color_labels = (255,255,255);//(255,255,255);
        let color_valores = (0,0,0);//(255,255,255);

        doc.setFillColor(232,68, 86) //red
        doc.roundedRect(15, starty, 185, 17, 3, 3, 'F');
        doc.setTextColor(color_labels) 
        doc.text(30, starty+13, 'NOMBRE DEL PASAJERO');
        

        starty += increment;
        doc.setTextColor(color_valores) 
        doc.text(40, starty+13, CLIENTE_NOMBRE);
        doc.roundedRect(15, starty, 550, 17, 3, 3, 'D');
        

        starty += increment; 
        doc.setFillColor(232,68, 86) //red
        doc.roundedRect(15, starty, 185, 17, 3, 3, 'F');
        doc.setTextColor(color_labels)
        doc.text(30, starty+13, 'HOTEL / DESTINO');
        
        starty += increment; 
        doc.setTextColor(color_valores)
        var splithoteldestino= doc.splitTextToSize(HOTEL  + ' / ' +  DESTINO, 250);
        doc.text(40, starty+13, splithoteldestino);

        // doc.text(40, starty+13, HOTEL  + ' / ' +  DESTINO);
        doc.roundedRect(15, starty, 550, 30, 3, 3, 'D');
        
        //FECHA
        starty += increment+10; 
        doc.setFillColor(232,68, 86) //red
        doc.roundedRect(15, starty, 550, 17, 3, 3, 'F');
        doc.setTextColor(color_labels)
        doc.text(30, starty+13, 'FECHA DE SALIDA');
        doc.text(150, starty+13, 'FECHA DE REGRESO');
        doc.text(300, starty+13, 'ABORDA EN Y HORARIO');
        
        starty += increment; 
        doc.setTextColor(color_valores) 
        doc.text(50, starty+13, FECHA_SALIDA);
        doc.text(180, starty+13, FECHA_REGRESO);
        //doc.text(300, starty+13, "MINERVA A LAS 07:00HRS");
        //doc.textWithLink( ABORDA,300, starty+13,{ url: 'https://goo.gl/maps/KgRQhTxJQoMNe8nv9' });

        var splitAborda = doc.splitTextToSize(ABORDA, 250);
        doc.text(300, starty+13, splitAborda);


        doc.roundedRect(15, starty, 550, 30, 3, 3, 'D');

        //adultos y juniors
        starty += increment+10; 
        doc.setFillColor(232,68, 86) //red
        doc.roundedRect(15, starty, 95, 33, 3, 3, 'F');
        doc.setTextColor(color_labels)
        doc.text(30, starty+13, 'No. ADULTOS ');
        doc.text(30, starty+28, 'Y JUNIORS ');
        
        doc.setTextColor(color_valores) 
        doc.roundedRect(120, starty, 40, 33, 3, 3, 'D');
        doc.text(130, starty+20, adultos_juniors);


        //menores cargo
        doc.setFillColor(232,68, 86) //red
        doc.roundedRect(190, starty, 95, 33, 3, 3, 'F');
        doc.setTextColor(color_labels)
        doc.text(200, starty+13, 'No. MENORES ');
        doc.text(200, starty+28, 'CON CARGO ');
        
        doc.setTextColor(color_valores) 
        doc.roundedRect(300, starty, 40, 33, 3, 3, 'D');
        doc.text(310, starty+20, menores_cargo);
        
        //menores sin cargo
        doc.setFillColor(232,68, 86) //red
        doc.roundedRect(355, starty, 95, 33, 3, 3, 'F');
        doc.setTextColor(color_labels)
        doc.text(365, starty+13, 'No. MENORES ');
        doc.text(365, starty+28, 'SIN CARGO ');
        
        doc.setTextColor(color_valores) 
        doc.roundedRect(465, starty, 40, 33, 3, 3, 'D');
        doc.text(475, starty+20, menores_sin_cargo);
        

        //Nombre agencia
        starty += increment+13; 
        doc.setFillColor(232,68, 86) //red
        doc.roundedRect(15, starty, 185, 17, 3, 3, 'F');
        doc.setTextColor(color_labels)
        doc.text(30, starty+13, 'NOMBRE DE AGENCIA');
        
        starty += increment; 
        doc.setTextColor(color_valores) 
        doc.text(40, starty+13, TRAVELAGENCY_NOMBRE);
        doc.roundedRect(15, starty, 550, 17, 3, 3, 'D');

        //CIUDAD
        
        starty += increment; 
        doc.setFillColor(232,68, 86) //red
        doc.roundedRect(15, starty, 250, 17, 3, 3, 'F');
        doc.setTextColor(color_labels)
        doc.text(30, starty+13, 'CIUDAD');

        //AGENTE
        doc.setFillColor(232,68, 86) //red
        doc.roundedRect(310, starty, 250, 17, 3, 3, 'F');
        doc.setTextColor(color_labels)
        doc.text(325, starty+13, 'AGENTE');
        
        starty += increment; 
        doc.setTextColor(color_valores) 
        doc.text(40, starty+13, TRAVELAGENCY_CIUDAD);
        doc.roundedRect(15, starty, 250, 17, 3, 3, 'D');

        doc.setTextColor(color_valores) 
        doc.roundedRect(310, starty, 250, 17, 3, 3, 'D');
        doc.text(325, starty+13, AGENTE);

         //CLAVE RESERVACION
         starty += increment; 
         doc.setFillColor(232,68, 86) //red
         doc.roundedRect(15, starty, 185, 17, 3, 3, 'F');
         doc.setTextColor(color_labels)
         doc.text(30, starty+13, 'CLAVE DE RESERVACION');
         
         starty += increment; 
         doc.setTextColor(color_valores) 
         doc.text(40, starty+13, CLAVE);
         doc.roundedRect(15, starty, 550, 17, 3, 3, 'D');

        //INCLUYE
        starty += increment; 
        doc.setFillColor(232,68, 86) //red
        doc.roundedRect(15, starty, 185, 17, 3, 3, 'F');
        doc.setTextColor(color_labels)
        doc.text(30, starty+13, 'OBSERVACIONES');
        
        starty += increment; 
        doc.setTextColor(color_valores) 
        var splitObservacion = doc.splitTextToSize(INCLUYE, 400);
        doc.text(40, starty+13, splitObservacion);
        doc.roundedRect(15, starty, 550, 17, 3, 3, 'D');

          //OBSERVACIONES
        starty += increment; 
        doc.setFillColor(232,68, 86) //red
        doc.roundedRect(15, starty, 185, 17, 3, 3, 'F');
        doc.setTextColor(color_labels)
        doc.text(30, starty+13, 'INCLUYE');
        
        starty += increment; 
        doc.setTextColor(color_valores) 
        var splitObservacion = doc.splitTextToSize(redondo + " -- "+ OBSERVACIONES + " -- " + ABORDA, 400);
        doc.text(40, starty+13, splitObservacion);

        doc.roundedRect(15, starty, 550, 72, 3, 3, 'D');


}

function xcenter(doc, phrase){
    return (doc.internal.pageSize.width / 2) - (doc.getStringUnitWidth(phrase) * doc.internal.getFontSize() / 2);
    
}

function pieCharter(doc){
    let starty = 630;
    let incremento = 17;

    doc.addImage(footer, 'PNG', 0, starty, doc.internal.pageSize.width, 305);
    
    doc.setLineDash([1, 1], 0);
    doc.line(15, starty-incremento, 560, starty-incremento);
    
    doc.setTextColor(7, 109, 150) // azul blue
    doc.setFontSize(11);
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

    doc.setLineDash([1, 1], 0);
    doc.line(15, starty+5, 560, starty+5);

    doc.setFontSize(12)
    doc.setFont("normal" ,"bold");
    
    doc.setTextColor(7, 109, 150) // azul blue
    const leyenda1  = "TELEFONO DE EMERGENCIA EN LA SALIDA 333-808-6093 CON GUSTAVO JAUREGUI";
    starty += incremento; 
    
    doc.text(leyenda1, xcenter(doc,leyenda1), starty );
    // doc.text(30, starty, leyenda1);
    const leyenda2  = "FAVOR DE PRESENTARSE 30 MINUTOS ANTE DE SU SALIDA";
    starty += incremento; 
    doc.text(leyenda2, xcenter(doc,leyenda2), starty );

    doc.setFontSize(8)
    doc.setTextColor(72,59, 130)
    const leyenda3  = "Av. Fidel Velazquez #643-A, Col. Santa Elena Alcande., Cp.P. 44230, Guadalajara, Jal. "
    starty += incremento; 
    doc.text(leyenda3, xcenter(doc,leyenda3), starty );
    const leyenda4  = "Tel. (33) 3631 3036 con 10 líneas";
    starty += incremento; 
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
    pieCharter,



    
    Cliente,
    Cuadros,
    Fecha,
    FormaPago,
    PagosRegistrados
}