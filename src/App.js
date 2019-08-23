import React, {useState, useEffect, Fragment} from 'react';



/////////////////////////
function Cita ({cita , index , eliminarCita}) {
  return (
    <div className="cita">
      <p>Mascota: <span>{cita.mascota} </span></p>
      <p>Dueño: <span>{cita.propietario} </span></p>
      <p>Fecha: <span>{cita.fecha} </span></p>
      <p>Hora: <span>{cita.hora} </span></p>
      <p>Sintomas: <span>{cita.sintomas} </span></p>
      <button 
      onClick={() => eliminarCita(index)}
      type='button' 
      className='button eliminar u-full-width'>Eliminar</button>
    </div>
  )
}



//////////////////////////
function Formulario ({crearCita}) {

  const stateInicial = {
    mascota : '',
    propietario: '',
    fecha: '',
    hora: '',
    sintomas: ''
  }

  const [unaCita, actualizarCita] = useState(stateInicial);

    //actualiza el state
    const handleChange = e => {
      actualizarCita({
        ...unaCita,
        [e.target.name] : e.target.value 
      })
    }

    
 

    const handleSubmit = e => {
      e.preventDefault();
      
     
      //pasar la cita hacia la App (componente prinicpal)
        crearCita(unaCita) 

      //reiniciar el state(reiniciar el form)
      actualizarCita(stateInicial)

    }
  
    return (
        <Fragment>
          <h2>Crear Cita</h2>

          <form onSubmit={handleSubmit}>
                <label>Nombre Mascota</label>
                <input 
                  type="text" 
                  name="mascota"
                  className="u-full-width" 
                  placeholder="Nombre Mascota" 
                  onChange={handleChange}
                  value={unaCita.mascota}
                  required
                />

                <label>Nombre Dueño</label>
                <input 
                  type="text" 
                  name="propietario"
                  className="u-full-width"  
                  placeholder="Nombre Dueño de la Mascota" 
                  onChange={handleChange}
                  value={unaCita.propietario}
                />

                <label>Fecha</label>
                <input 
                  type="date" 
                  className="u-full-width"
                  name="fecha"
                  onChange={handleChange}
                  value={unaCita.fecha}
                />               

                <label>Hora</label>
                <input 
                  type="time" 
                  className="u-full-width"
                  name="hora" 
                  onChange={handleChange}
                  value={unaCita.hora}
                />

                <label>Sintomas</label>
                <textarea 
                  className="u-full-width"
                  name="sintomas"
                  onChange={handleChange}
                  value={unaCita.sintomas}
                ></textarea>

                <button type="submit" className="button-primary u-full-width">Agregar</button>
          </form>
      </Fragment>
  )
}


//////////////////////////////////////
function App () {

  //cargar las citas del localstorage como state inicial para que no se reinicie
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));

    if(!citasIniciales) {
      citasIniciales = [];
    } 


  //useState retorna 2 funciones
  const [citas, guardarCita] = useState(citasIniciales);

  //agregar las nuevas citas al state
  const crearCita = (citaCliente) => {
    //tomar una copia del state y agregar el nuevo cliente
    const nuevasCitas = [...citas, citaCliente]

    //almacenamos en el state
    guardarCita(nuevasCitas);

  }



  //elimina las citas del state
  const eliminarCita = (index) => {
    const nuevasCitas = [...citas];

    nuevasCitas.splice(index, 1)  //nos permite eliminar un elemento de un array

    guardarCita(nuevasCitas);
  } 


  //localstorage
  useEffect( () => {
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));

    if(citasIniciales) {
      localStorage.setItem('citas', JSON.stringify(citas));
    } else {
      localStorage.setItem('citas' , JSON.stringify([]));
    }
  }, [citas] )//agregamos citas a las dependencias para q solo se ejecute useefect cuando hay cambio en citas, y no siempre

  //cargar condicionalmente un titulo
  const titulo = Object.keys(citas).length === 0 ? 'No hay Citas' : 'Todas las Citas';  

  return(
    <Fragment>
    <h1>Administrador</h1>
    <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario 
              crearCita = {crearCita}
            />      

          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
              {citas.map((cita, index) => {
                  return (
                      <Cita 
                        key = {index}
                        index={index}
                        cita={cita}
                        eliminarCita={eliminarCita}
                      />
                  )
              })}
          </div>
        </div>
    </div>
    </Fragment>
  )
}

export default App;