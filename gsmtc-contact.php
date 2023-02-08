<?php
/**
 * Plugin Name:       Gsmtc Contact
 * Description:       Plugin for the use of static contact forms.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       gsmtc-contact
 *
 * @package           GsmtcContact
 */
if ( ! defined( 'ABSPATH' ) ) {die;} ; // to prevent direct access

if ( ! defined('PLUGIN_DIR')) define ('PLUGIN_DIR',plugin_dir_path(__FILE__));

require_once(dirname(__FILE__).'/inc/class-gsmtc-contact.php');

$gsmtc_contact = new Gsmtc_Contact();

// method for activation

register_activation_hook(__FILE__,array($gsmtc_contact,'activate'));

 // method for deactivation 
 
 register_deactivation_hook(__FILE__,array($gsmtc_contact,'deactivate'));
 
 function gsmtc_register_blocks(){

	/*** Ceamos una variable que contenga los assets creados por la funcion build para encolarlos ****/
	$assets_file = include_once(PLUGIN_DIR.'contact/build/index.asset.php');
	
	/**** Funcion convencional de registro de scripts para registrar los scrips necesarios para el bloque
			contine el manejador 'plz-register-block ' y la ruta donde esta el fichero index.js
			ademas tiene las dependencias que hemos obtenido en assets_file
			y la version  *******/
	wp_register_script(
		'gsmtc-contact-register-block',
		plugins_url('./contact/build/index.js',__FILE__),
		$assets_file['dependencies'],
		$assets_file['version'],	
	);
	/** Funcion de wordpress para registrar el script del submit del bloque  */
	wp_register_script(
		'gsmtc-contact-script',
		plugins_url('./contact/gsmtc-contact.js',__FILE__),
		$assets_file['dependencies'],
		$assets_file['version'],	
	);

	/** Funcion de wordpress para registrar los estilos del bloque contact */
	wp_register_style(
		'gsmtc-contact-style',
		plugins_url('contact/build/style-index.css',__FILE__),
		array(),
		$assets_file['version']
	);
	
	/***** funcion especifica de wordpress para registrar el bloque
		contiene el nombre del bloque usado en registerBlockType del fichero index.js, en este caso 'plz/register'
		y un array de configuración, en este caso solo un elemento editor_script que utilizara el manejador
		creado en el encolado del script del bloque en esta caso 'plz-register-block' */
		register_block_type(
		'gsmtc/contact',
		array(
			'editor_script' => 'gsmtc-contact-register-block',
			'style'			=> 'gsmtc-contact-style',
			'script'		=> 'gsmtc-contact-script'
		)
	);

	/**
	 * Esta función carga las datos para acceder a la api y poder hacer el posteo de los contactos
	 */
	wp_localize_script('gsmtc-contact-script','gsmtcContactApi',array(
		'restUrl' => rest_url('/gsmtc/contact'),
		'nonce' => wp_create_nonce('wp_rest')
	));

}

/**** Hook necesarios para incluir la función de registro de bloque en wordpress ******/
add_action('init','gsmtc_register_blocks');


