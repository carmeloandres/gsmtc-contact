export const Edit = (props) => {
    return(
    <>
    <h1>Formulario con Custom Hook</h1>

    <input
        type="text"
        className="form-control"
        placeholder="Username"
        name="username"
    /> 

    <input
        type="email"
        className="form-control mt-2"
        placeholder="carmeload@hotmail.com"
        name="email"
    /> 
              

    <input
        type="text"
        className="form-control mt-2"
        placeholder="Contraseña"
        name="password"
    /> 

</>

    )

}