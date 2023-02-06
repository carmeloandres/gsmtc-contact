export const Edit = (props) => {
 
    const { className } = props;

    return(
    
    <div className={ className }>
        <div className="gsmtc-contact">
            <h2 className="gsmtc-contact-titulo">Contacto</h2>
            <form className="gsmtc-contact-form">
                <input
                    type="text"
                    className="gsmtc-contact-input"
                    placeholder="nombre (requerido)"
                    name="username"
                /> 
                <input
                    type="email"
                    className="gsmtc-contact-input"
                    placeholder="email (requerido)"
                    name="email"
                />               
                <textarea
                    className="gsmtc-contact-textarea"
                    placeholder="Mensaje (requerido)"
                    name="mensaje"
                /> 
                <input
                    type="submit"
                    className="gsmtc-contact-submit"
                    value="Contactar"
                    name="email"
                />               
            </form>
        </div>
    </div>


    )

}