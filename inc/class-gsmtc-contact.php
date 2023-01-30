<?php

/**
 * Gsmtc_Contact
 * 
 * This class manage the wordpress side code of plugin
 */
class Gsmtc_Contact{

	function __construct(){

        add_action('init',array($this,'init'));

	}

    /**
	 * This method is used to activate the plugin
	 */
    function activate(){

        $this->init();
        flush_rewrite_rules();

    }

    /**
	 * This method is used to deactivate the plugin
	 */
    function deactivate(){
        flush_rewrite_rules();
    }


	/**
	 * Esta función crea los custom post types y el rol de usuario 'restaurador'
	 */
	function init() {


		$labels_gsmtc_contact = array(
			'name'               => _x( 'Gsmtc Contactos', 'post type general name', 'gsmtc-contact' ),
			'singular_name'      => _x( 'Gsmtc Contacto', 'post type singular name', 'gsmtc-contact' ),
			'menu_name'          => _x( 'Gsmtc Contactos', 'admin menu', 'gsmtc-contact' ),
			'add_new'            => _x( 'Añadir nuevo', 'contacto', 'gsmtc-contact' ),
			'add_new_item'       => __( 'Añadir nuevo contacto', 'gsmtc-contact' ),
			'new_item'           => __( 'Nuevo contacto', 'gsmtc-contact' ),
			'edit_item'          => __( 'Editar contacto', 'gsmtc-contact' ),
			'view_item'          => __( 'Ver contacto', 'gsmtc-contact' ),
			'all_items'          => __( 'Todos los contactos', 'gsmtc-contact' ),
			'search_items'       => __( 'Buscar contactos', 'gsmtc-contact' ),
			'not_found'          => __( 'No hay contactos.', 'gsmtc-contact' ),
			'not_found_in_trash' => __( 'No hay contactos en la papelera.', 'gsmtc-contact' ),
            'parent_item_colon'  => ''
		);
	

		register_post_type('gsmtc-contacts',
			array(
				'labels'			=> $labels_gsmtc_contact,
				'description' 		=> 'Custom post type used to store data from gsmtc-contact form',
                'show_ui'           => true, 
                'show_in_rest'      => false,
				'capability_type'    => 'post',
				'menu_position'      => null,
				'supports'           => array( 'title','editor','custom-fields'),
					)			
		);

	}
}