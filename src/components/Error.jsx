function Error({mensaje}) {

    return (
        <div className="w-full bg-red-600 rounded-md text-center text-white p-3 mb-3 uppercase font-bold">
            <p>{mensaje}</p>
        </div>
    )
}

export default Error;