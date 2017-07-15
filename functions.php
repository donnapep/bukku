<?php

function enqueue_scripts() {
	wp_enqueue_style( 'style', get_stylesheet_directory_uri() . '/dist/css/style.css', array(), wp_get_theme()->Version );
}

add_action( 'wp_enqueue_scripts', 'enqueue_scripts' );
