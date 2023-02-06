//import { gsmtcContactSubmit } from "./contact-submit";

export const Save = (props) => {
 
    const { className } = props;
 
    return(
    
    <div className={ className }>
        <div className="gsmtc-contact">
        <h3 className="gsmtc-contact-titulo">Contacto</h3>
        <form className="gsmtc-contact-form">
            <input
                type="text"
                className="gsmtc-contact-input"
                placeholder="nombre (requerido)"
                name="nombre"
                required={true}
            /> 
            <input
                type="email"
                className="gsmtc-contact-input"
                placeholder="email (requerido)"
                name="email"
                required={true}

            />               
            <textarea
                className="gsmtc-contact-textarea"
                placeholder="Mensaje (requerido)"
                name="mensaje"
                required={true}
            /> 
            <input
                type="submit"
                className="gsmtc-contact-submit"
                value="Contactar"
                name="submit"
            />               
        </form>
        </div>
    </div>


    )

}