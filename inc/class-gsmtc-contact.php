<?php

/**
 * Gsmtc_Contact
 * 
 * This class manage the wordpress side code of plugin
 */
class Gsmtc_Contact{

	public $table_name_spam;

	function __construct(){

		global $wpdb;
		$this->table_name_spam = $wpdb->prefix.'gsmtc_contact_spam';

        add_action('init',array($this,'init'));
		add_action('rest_api_init',array($this,'endpoints')); 
		add_filter('bulk_actions-edit-gsmtc-contact',array($this,'bulk_actions'));
		add_filter('handle_bulk_actions-edit-gsmtc-contact',array($this,'handle_bulk_actions'),10,3);
		add_filter('manage_gsmtc-contact_posts_columns',array($this,'manage_gsmtc_contact_posts_columns'),10,2);
		add_action('manage_gsmtc-contact_posts_custom_column',array($this,'manage_gsmtc_contact_posts_custom_column'),10,2);

	}


    /**
	 * This method is used to activate the plugin
	 */
    function activate(){

        $this->init();
        flush_rewrite_rules();
		$this->create_tables();
		$this->load_spam_from_commments();

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
	

		register_post_type('gsmtc-contact',
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

	/**
	 * endpoints
	 * 
	 * Este metodo crea los endpoints para la conexion con la api de la aplicación
	 *
	 * @return void
	 */
	function endpoints(){
		register_rest_route('gsmtc','contact',array(
			'methods'  => 'POST',
			'callback' => array($this,'manage_api_request'),
			'permission_callback' => function(){ return true; },		

		));
	}

	/**
	 * manage_api_request
	 * 
	 * This method manage de request of the endpoints 
	 *
	 * @return void
	 */
		
	 function manage_api_request(WP_REST_Request $request ){

		$params = $request->get_params();
		$result = 0;
		if (isset($params['email'])){
			error_log ('La funcion "manage_api_request" ha sido ejecutada : '.var_export($params,true));
			if ( ! $this->is_in_spam($params['email']))
			{
				$meta_contact = array(
					'email' => wp_strip_all_tags($params['email']),
					'aceptacion' => wp_strip_all_tags($params['aceptacion'])
				);

				$post_contact = array(
					'post_title' =>wp_strip_all_tags( $params['nombre'] ), 
					'post_content' => wp_strip_all_tags($params['mensaje']),
					'post_type' => 'gsmtc-contact',
					'post_status' => 'private',
					'meta_input' => $meta_contact
				);

				$result = wp_insert_post($post_contact);
				if ($result > 0){
					$administradores = get_users(array('role_in' => 'administrator'));
					foreach( $administradores as $administrador){
						$mensaje = 'Se ha enviado información de contacto desde '.home_url().PHP_EOL;
						$mensaje .= 'Nombre : '.$params['nombre'].PHP_EOL;
						$mensaje .= 'Email : '.$params['email'].PHP_EOL;
						$mensaje .= 'Mensaje : '.$params['mensaje'].PHP_EOL;
						$mensaje .= 'A las '.date('H:i').' del '.date('d-m-Y').PHP_EOL;

						wp_mail($administrador->user_email,'Contacto desde '.home_url().' - por :'.$params['nombre'],$mensaje);
					}
				}

			} else $result = 1; // Para no mostrar error a los spamers

		} 
		echo json_encode($result);
		exit();
	}


	/**
	 * create_tables
	 * 
	 * This method creates the tables used by the plugin 
	 *
	 * @return void
	 */

	 function create_tables(){

		global $wpdb;

		/**
         * The spam table stores all the email form has been sent contact considered spam 
         */
        $query_spam = "CREATE TABLE IF NOT EXISTS " . $this->table_name_spam . " (
			id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
			email varchar (256)COLLATE utf8mb4_unicode_ci,
			
			PRIMARY KEY (id)
			) DEFAULT CHARSET = utf8mb4 COLLATE=utf8mb4_unicode_ci;";

		$wpdb->query($query_spam);
	 }

	/**
	 * is_in_spam
	 * 
	 * This method checks if an email is in the spam table 
	 *
	 * @return bool
	 */

	 function is_in_spam($email){

		global $wpdb;
		$result = true;

		if(filter_var($email,FILTER_VALIDATE_EMAIL)){
			$query = "SELECT COUNT(*) FROM ".$this->table_name_spam." WHERE email = '".$email."'";
			$counter = $wpdb->get_var($query);

			if ($counter  == 0)
				$result = false;
		}
		return $result;
	 }


	/**
	 * load_spam_from_comments
	 * 
	 * This method loads the emails checked as spam and stores it 
	 * in the spam table if it is not there in spam table. 
	 *
	 * @return void
	 */

	 function load_spam_from_commments(){
		global $wpdb;
				
		$query = "SELECT comment_author_email FROM ".$wpdb->comments." WHERE comment_approved = 'spam'";
		$emails = $wpdb->get_results($query);
		foreach ($emails as $email){

			if ( ! $this->is_in_spam($email->comment_author_email)){
				$datos['email'] = $email;
				$resultado_insercion = $wpdb->insert($this->table_name_spam,array('email' => $email->comment_author_email),array('%s'));
				
			}
		}

	 }

	/**
	 * bulk_actions
	 * 
	 * This method add an action to the bulk list of gsmtc-contant post type admin page 
	 *
	 * @return array
	 */

	function bulk_actions($actions) {
//		error_log ('the function "my_custom_bulk_actions" has been executed : '.var_export($actions,true));

//		$current_screen = get_current_screen();
//		error_log ('the function "my_custom_bulk_actions" has been executed - $current_screen: '.var_export($current_screen,true));

		$actions['spam-gsmtc']='Marcar como span y eliminar';
      return $actions;
    }

	/**
	 * handle_bulk_actions
	 * 
	 * This method perform the action aftere submited bulk actions at gsmtc-contact admin page 
	 *
	 * @return array
	 */

	function handle_bulk_actions($sendback,$doaction,$items) {
		global $wpdb;

		if ($doaction == 'spam-gsmtc'){

			foreach($items as $item){
//				error_log ('the function "my_handle_bulk_actions" has been executed - inside-bucle - $item: '.var_export($item,true).PHP_EOL);

				$spam_email = get_post_meta($item,'email',true);

				if ( ! $this->is_in_spam($spam_email))
					$wpdb->insert($this->table_name_spam,array('email' => $spam_email),array('%s'));

				wp_delete_post($item,true);
			}
		}
//		error_log ('the function "my_handle_bulk_actions" has been executed - senback: '.var_export($sendback,true).PHP_EOL);
//		error_log ('the function "my_handle_bulk_actions" has been executed - doaction: '.var_export($doaction,true));
//		error_log ('the function "my_handle_bulk_actions" has been executed - items: '.var_export($items,true));

//		$current_screen = get_current_screen();$doation
//		error_log ('the function "my_custom_bulk_actions" has been executed - $current_screen: '.var_export($current_screen,true));

//		$actions['spam-gsmtc']='Marcar como span y eliminar';
//		unset( $actions['delete'] );
        return $sendback;
    }

	/**
	 * manage_gsmtc_contact_posts_columns
	 * 
	 * This method add two new columns to the list of gsmtc-contact posts 
	 *
	 * @return array
	 */

	function manage_gsmtc_contact_posts_columns($post_columns){

		$nuevas_columnas = array_merge( 
				array_slice($post_columns,0,2,true),
				array(
					'email' => 'Correo',
				),
				array_slice($post_columns,2,1,true),
				array(
					'aceptacion' => 'RGPD'
				)
			);
		
		$nuevas_columnas['title'] = 'Nombre';


		return $nuevas_columnas;
	}

	/**
	 * manage_gsmtc_contact_posts_custom_column
	 * 
	 * This method add the content at de diferent cells of the list of gsmtc-contact posts 
	 *
	 * @return array
	 */

	function manage_gsmtc_contact_posts_custom_column($column_name, $post_id){

		switch ($column_name){
			case 'email':
					echo get_post_meta($post_id,'email',true);
					break;
			case 'aceptacion':
					$aceptacion = get_post_meta($post_id,'aceptacion',true);
					if ($aceptacion == 'on')
						echo '<input type="checkbox" disabled checked/>';
					else
						echo '<input type="checkbox" disabled />';
					break;
		}

	}

}