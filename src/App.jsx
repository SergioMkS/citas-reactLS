import { useState, useEffect } from "react";
import Header from "./components/Header";
import Formulario from "./components/Formulario"; 
import ListadoPacientes from "./components/ListadoPacientes"
function App() {

  //creando mi primer Prop (lo usamos aqui por es de hijo a padre que se pasan los props)
  //de aqui salen los datos hacia los demas componentes
  const [pacientes, setPacientes] = useState(JSON.parse( localStorage.getItem('pacientes')) ?? []);
  //este sera para cada obj individual de cada paciente
  const [pacienteObj, setPacienteObj] = useState({});

  

  useEffect( () => {
    localStorage.setItem('pacientes', JSON.stringify(pacientes))
  }, [pacientes])

  const eliminarPaciente = (id) => {
    //te vas a traer todos los diferentes al id que le estas pasando
    //porque si tienes 3 elementos y quieres eliminar 2, tienes que traerte 1 y 3
    const pacientesActualizados = pacientes.filter( paciente  => paciente.id !== id)
    setPacientes(pacientesActualizados)
  }

  return (
    <div className="container mx-auto mt-20 xl: px-12">
      <Header/>

      <div className="mt-12 md:flex">
        <Formulario
          pacientes={pacientes}
          setPacientes={setPacientes}
          pacienteObj={pacienteObj}
          setPacienteObj={setPacienteObj}
        />
        {/* le pasas los pacientes, lee los ya guardados en el arreglo de pacientes*/}
        <ListadoPacientes
          pacientes={pacientes}
          setPacienteObj={setPacienteObj}
          eliminarPaciente={eliminarPaciente}
        />
      </div>
      
    </div>
  )
}

export default App
