export default function validate(values){

  const errors = {};

    if(!values.name){
      errors.name = "Falta el nombre del cliente";
    } else if(values.name.length > 50){
      errors.name = "Muchos caracteres";
    }

    if(!values.surname){
      errors.surname = "Falta el apellido del cliente";
    } else if(values.surname.length > 50){
      errors.surname = "Muchos caracteres";
    }

    if(!values.email){
      errors.email = "Falta el email del cliente";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
      errors.email = "Email invalido";
    } else if(typeof(values.email) !== "undefined"){
      if(values.email.length > 50){
        errors.email = "Muchos caracteres";
      }
    }

    if(!values.company){
      errors.company = "Falta la empresad del cliente";
    } else if(typeof(values.company) !== "undefined"){
      if(values.company.length > 40){
        errors.company = "Muchos caracteres";
      }
    }

    if(!values.workstation){
      errors.workstation = "Falta el puesto de trabajo del cliente";
    } else if(typeof(values.workstation) !== "undefined"){
      if(values.workstation.length > 50){
        errors.workstation = "Muchos caracteres";
      }
    }

    if(!values.password || !values.passwordChecker){
      errors.password = "Asigna una contraseña al cliente";
      errors.passwordChecker = "Necesario para verificar";
    }else if(values.password !== values.passwordChecker){
      errors.password = "Error de coincidencia";
    }else if(typeof(values.password) !== "undefined"){
      if(values.password.length < 4){
        errors.password = "Muy pocos caracteres";
      }
    }


  if(typeof(values.phone1) !== "undefined"){
    if(!Number(values.phone1)){
      errors.phone1 = "Solo numeros";
    } else if(values.phone1.length > 15){
      errors.phone1 = "Muchos numeros";
    }
  }

  if(typeof(values.phone2) !== "undefined"){
    if(!Number(values.phone2)){
      errors.phone2 = "Solo numeros";
    } else if(values.phone2.length > 15){
      errors.phone2 = "Muchos numeros";
    }
  }

  if(typeof(values.department) !== "undefined"){
    if(values.department.length > 50){
      errors.department = "Muchos caracteres";
    }
  }

  if(typeof(values.address) !== "undefined"){
    if(values.address.length > 150){
      errors.address = "Muchos caracteres";
    }
  }

  if(typeof(values.workstation) !== "undefined"){
    if(values.workstation.length > 30){
      errors.workstation = "Muchos caracteres";
    }
  }

  return errors;

}
