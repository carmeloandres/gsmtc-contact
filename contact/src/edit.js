import { InspectorControls } from "@wordpress/block-editor";
import {Panel,PanelBody,TextControl} from "@wordpress/components";

export const Edit = (props) => {
 
    const { className, attributes, setAttributes } = props;
    const { urlPoliticaPrivacidad, urlAvisoLegal, urlPoliticaCookies } = attributes;

    return(
        <>
            <InspectorControls>
                <Panel>
                    <PanelBody title="Opciones" initialOpen={true}>
                        <TextControl
                            label = "Url de la política de privacidad"
                            value = { urlPoliticaPrivacidad }
                            onChange = { (newLabel) => setAttributes({urlPoliticaPrivacidad : newLabel}) }
                        />
                        <TextControl
                            label = "Url del aviso legal"
                            value = { urlAvisoLegal }
                            onChange = { (newLabel) => setAttributes({urlAvisoLegal : newLabel}) }
                        />
                        <TextControl
                            label = "Url de la política de cookies"
                            value = { urlPoliticaCookies }
                            onChange = { (newLabel) => setAttributes({urlPoliticaCookies : newLabel}) }
                        />
                    </PanelBody>
                </Panel>
            </InspectorControls>        
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
                    name="email"
                />
                <button
                    className="gsmtc-contact-accordeon-button"
                    name="boton-accordeon"
                >             
                    Puedes ver la información básica sobre protección de datos aqui <span className="gsmtc-contact-down-arrowhead">&#709;</span>
                </button>
                <div className="gsmtc-contact-accordeon-content">
                    <ul className="gsmtc-contact-lista">
                        <li className="gsmtc-contact-lista-item">
                            <b>Respondable:</b>Carmelo Andrés Desco
                        </li>
                        <li className="gsmtc-contact-lista-item">
                            <b>Finalidad:</b>Atender tu consulta
                        </li>
                        <li className="gsmtc-contact-lista-item">
                            <b>Derechos:</b>Podrás ejercer tus derechos de acceso, rectificación, limitacion y suprimir datos de este formulario
                        </li>
                        <li className="gsmtc-contact-lista-item">
                            <b>Información adicional:</b>Puedes consultar el <a href={urlAvisoLegal} className="gsmtc-contact-enlace-politica-privacidad">aviso legal</a>
                            asi como la <a href={urlPoliticaPrivacidad} className="gsmtc-contact-enlace-politica-privacidad">política de privacidad</a> y la 
                            <a href={urlPoliticaCookies} className="gsmtc-contact-enlace-politica-privacidad">Política de cookies</a> si deseas más informacin.
                        </li>
                    </ul>
                </div>
            </form>
        </div>
    </div>
        </>
    )

}