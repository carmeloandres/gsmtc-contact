//import { gsmtcContactSubmit } from "./contact-submit";

export const Save = (props) => {
 
    const { className, attributes } = props;
    const { urlPoliticaPrivacidad, urlAvisoLegal, urlPoliticaCookies } = attributes;
 
    return(
    
    <div className={ className }>
        <div className="gsmtc-contact">
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
                <label className="gsmtc-contact-checkbox-container">
                    <input
                        type="checkbox"
                        className="gsmtc-contact-checkbox"
                        name="aceptacion"
                        required={true}
                    />
                    He leido y acepto la <a href={urlPoliticaPrivacidad} className="gsmtc-contact-enlace-politica-privacidad">Política de privacidad</a>
                </label>
                <input
                    type="submit"
                    className="gsmtc-contact-submit"
                    value="Contactar"
                    name="submit"
                />  
                <button
                    className="gsmtc-contact-accordeon-button"
                    name="boton-accordeon"
                >             
                    Puedes ver la información básica sobre protección de datos aquí <span className="gsmtc-contact-down-arrowhead">&#709;</span>
                </button>
                <div className="gsmtc-contact-accordeon-content">
                    <ul className="gsmtc-contact-lista">
                        <li className="gsmtc-contact-lista-item">
                            <b>Responsable:</b> Carmelo Andrés Desco
                        </li>
                        <li className="gsmtc-contact-lista-item">
                            <b>Finalidad:</b> Atender tu consulta
                        </li>
                        <li className="gsmtc-contact-lista-item">
                            <b>Derechos:</b> Podrás ejercer tus derechos de acceso, rectificación, limitación y suprimir datos de este formulario
                        </li>
                        <li className="gsmtc-contact-lista-item">
                            <b>Información adicional:</b> Puedes consultar el <a href={urlAvisoLegal} className="gsmtc-contact-enlace-politica-privacidad">aviso legal</a> así como la <a href={urlPoliticaPrivacidad} className="gsmtc-contact-enlace-politica-privacidad">política de privacidad</a> y la <a href={urlPoliticaCookies} className="gsmtc-contact-enlace-politica-privacidad">Política de cookies</a> si deseas más información.
                        </li>
                    </ul>
                </div>
            </form>
        </div>
    </div>
    )

}