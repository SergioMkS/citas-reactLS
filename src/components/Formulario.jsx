import { useState, useEffect } from "react";
import Error from "./Error"

function Formulario({ pacientes, setPacientes, pacienteObj, setPacienteObj}) {
    //variable + funciones
    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');

    const [error, setError] = useState(false);

    useEffect(() => {
        //comprobar si un obj esta vacio en react
        if(Object.keys(pacienteObj).length > 0) {
            setNombre(pacienteObj.nombre)
            setPropietario(pacienteObj.propietario)
            setEmail(pacienteObj.email)
            setFecha(pacienteObj.fecha)
            setSintomas(pacienteObj.sintomas)
        }
    }, [pacienteObj])
    

    function generarId() {
        const random = Math.random().toString(36).substring(2)
        const fecha = Date.now().toString(36)

        return random + fecha;
    }
    //para enviar los datos del form
    function handleSubmit(e) {
        e.preventDefault();

        //validacion de formulario
        if([nombre, propietario, email, fecha, sintomas].includes('')) {
            setError(true)
            return;
        }
        
        setError(false);

        //objeto de paciente, no le pasas valor porque ya estan definidos en el state
        //este tambienes es el obj en memoria
        const objetoPaciente = {
            nombre, 
            propietario, 
            email, 
            fecha, 
            sintomas,
        }
        
        //editando el paciente individual
        if(pacienteObj.id) {
            //editando el registro
            //creamos el id y lo pasamos a el obj
            objetoPaciente.id = pacienteObj.id;

            //iteramos la lista de pacientes(leemos desde le state, que registro estamos editando ? entonces, retornamos el objeto que esta actualizado : caso contrario, retorno el objeto tal como esta sin modificarse)
            const pacienteActualizado = pacientes.map( pacienteState => pacienteState.id === pacienteState.id ? objetoPaciente : pacienteState)

            setPacientes(pacienteActualizado)

            //limpias el objeto viejo del state
            setPacienteObj({})
        }else {
            //nuevo registro
            //ya que es nuevo, le agregamos un id al obj
            objetoPaciente.id = generarId()
            //se hace una copia del arreglo de pacientes
            //para luego pasarle el obj, asi no modificas el original
            //en react todo debe ser inmutable, es decir no modifica el original
            setPacientes([...pacientes, objetoPaciente])
        }
        

        //reiniciamos el form luego de agregar un paciente
        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('')
    }

    return (
        <div className="md:w-1/2 lg:w-2/5">
            <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

            <p className="text-lg mt-5 text-center mb-10">
                Añade Pacientes y {''}
                <span className="text-indigo-600 font-bold">Administralos</span>
            </p>

            <form 
                onSubmit={handleSubmit}
                className="bg-white shadow-sm rounded-lg py-10 px-5 mb-10"
            >
                { error && <Error mensaje="Todos los campos son obligatorios"/>}
                <div className="mb-5">
                    <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">Nombre Mascota</label>
                    <input
                        id="mascota" 
                        type="text" 
                        placeholder="Nombre"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md outline-indigo-400"
                        value={nombre}
                        onChange={ (e) => setNombre(e.target.value)}
                        
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">Propietario</label>
                    <input
                        id="propietario" 
                        type="text" 
                        placeholder="Propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md outline-indigo-400"
                        value={propietario}
                        onChange={ (e) => setPropietario(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="email" className="block text-gray-700 uppercase font-bold">Email</label>
                    <input
                        id="email" 
                        type="email" 
                        placeholder="Email"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md outline-indigo-400"
                        value={email}
                        onChange={ (e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">Fecha de Alta</label>
                    <input
                        id="alta" 
                        type="date" 
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md outline-indigo-400"
                        value={fecha}
                        onChange={ (e) => setFecha(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">Síntomas</label>
                    
                    <textarea 
                        name="" 
                        id="sintomas" 
                        placeholder="Describe los síntomas"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md outline-indigo-400"
                        value={sintomas}
                        onChange={ (e) => setSintomas(e.target.value)}
                    />
                </div>
                <input 
                    type="submit"
                    className="bg-indigo-600 w-full p-2 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer"
                    value={pacienteObj.id ? 'Guardar Cambios' : 'Agregar Paciente'}
                />
            </form>
        </div>
    )
}

export default Formulario;