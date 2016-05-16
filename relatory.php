<?php

/* Libraries */

//Returns memory usage
function get_server_memory_usage(){
    return rand (50 , 100);
}

//Returns cpu usage
function get_server_cpu_usage(){
    return rand (50 , 100);
}

//Return Requests
function get_server_requests(){
  return rand(10, 500);
}

//Return bad Requests
function get_server_users(){
  return rand(250, 300);
}

function get_server_networkin(){
  return rand(500, 50000);
}

function get_server_networkout(){
  return rand(5000, 50000);
}

function get_server_reads(){
  return rand(0, 100);
}

$reads = get_server_reads();

$data = array(
  'memory' => get_server_memory_usage(),
  'cpu' => get_server_cpu_usage(),
  'requests' => get_server_requests(),
  'users' => get_server_users(),
  'networkin' => get_server_networkin(),
  'networkout' => get_server_networkout(),
  'reads' => $reads,
  'writes' => 100-$reads,
 );

header('Content-Type: application/json');
echo json_encode($data);

?>
