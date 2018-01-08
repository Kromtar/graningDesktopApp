export default function validate(values){

    const errors = {};

    if(!values.name){
      errors.name = "Tienes que definir el nombre del cliente";
    } else if(values.name.length > 100){
      errors.name = "Muchos caracteres";
    }

    if(!values.internalcode){
      errors.internalcode = "Tienes que definir el apellido del cliente";
    } else if(values.internalcode.length > 15){
      errors.internalcode = "Muchos caracteres";
    }

    if(typeof(values.proyectnumber) !== "undefined"){
      if(values.proyectnumber.length > 20){
        errors.proyectnumber = "Muchos caracteres";
      }
    }

    if(typeof(values.contractnumber) !== "undefined"){
      if(values.contractnumber.length > 20){
        errors.contractnumber = "Muchos caracteres";
      }
    }

    if(typeof(values.purchaseordernumber) !== "undefined"){
      if(values.purchaseordernumber.length > 20){
        errors.purchaseordernumber = "Muchos caracteres";
      }
    }

    if(typeof(values.term) !== "undefined"){
      if(!Number(values.term)){
        errors.term = "Tienen que ser solo numeros";
      } else if(values.term.length > 10){
        errors.term = "Muchos numeros";
      }
    }


    return errors;

}
