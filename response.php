<?php
/**
 * Created by PhpStorm.
 * User: Vizteck
 * Date: 7/13/2016
 * Time: 5:17 PM
 */


$get_entry_list_parameters = array(
    //session id
    'session' => $session_id,

    //The name of the module from which to retrieve records
    'module_name' => 'Leads',

    //The SQL WHERE clause without the word "where".
    'query' => "",

    //The SQL ORDER BY clause without the phrase "order by".
    'order_by' => "",

    //The record offset from which to start.
    'offset' => 0,

    //A list of fields to include in the results.
    'select_fields' => array(
        'id',
        'name',
        'title',
    ),
    //A list of link names and the fields to be returned for each link name.
    'link_name_to_fields_array' => array(
        array(
            'name' => 'email_addresses',
            'value' => array(
                'email_address',
                'opt_out',
                'primary_address'
            ),
        ),
    ),
    //The maximum number of results to return.
    'max_results' => 2,

    //If deleted records should be included in results.
    'deleted' => 0,

    //If only records marked as favorites should be returned.
    'favorites' => false,
);





$show=json_encode($get_entry_list_parameters);
print_r($show);
return false;

$php_array = json_decode($_POST["info"]);
print_r($php_array);
echo("Making ajax call");

die;