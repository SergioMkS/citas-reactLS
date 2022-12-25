import Paciente from "./Paciente";
function ListadoPacientes({pacientes, setPacienteObj, eliminarPaciente}) {
    
    return (
        <div className="overflow-y-hidden md:w-1/2 lg:w-3/5 md:h-screen md:overflow-y-scroll">

            {/*Forma de Comprobrar si tiene algo un Arreglo en react */}
            {pacientes && pacientes.length ? (
                <>
                    {/*si tiene algo retonarmos esto */}
                    <h2 className="font-black text-3xl text-center">Listado pacientes</h2>
                    <p className="text-xl mt-5 mb-10 text-center">
                        Administra tus {''}
                        <span className="text-indigo-600 font-bold">Pacientes y Citas</span>
                    </p>

                    {/*con estos pacientes */}
                    { pacientes.map( paciente => {
                        {/*key es obligatorio cuanto es una lista array de element */}
                        return (
                            <Paciente 
                                key={paciente.id}
                                paciente={paciente}
                                setPacienteObj={setPacienteObj}
                                eliminarPaciente={eliminarPaciente}
                            />
                        )
                    })}
                </>
            ) : (

                <>
                    <h2 className="font-black text-3xl text-center">No hay pacientes</h2>
                    <p className="text-xl mt-5 mb-10 text-center">
                        Agrega {''}
                        <span className="text-indigo-600 font-bold">Pacientes</span>
                    </p>
                
                </>
            )}
            
        </div>
    )
}

export default ListadoPacientes;