<?

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
  return rand(10, 500)
}

//Return bad Requests
function get_server_badrequests(){
  return rand(10, 50)
}

function get_server_networkin(){
  return rand(500, 50000)
}

function get_server_networkout(){
  return rand(5000, 50000)
}


$data = array(
  'memory' => get_server_memory_usage(),
  'cpu' => get_server_cpu_usage(),
  'requests' => get_server_requests(),
  'badrequests' => get_server_badrequests(),
  'networkin' => get_server_networkin(),
  'networkout' => get_server_networkout()
 );
header('Content-Type: application/json');
echo json_encode($data);


?>
