<?php

require "../classNoticia.php";

try{
    $not = new Noticia();
    $id = $_POST['id'];
    $data = $not->findbyPk($id);
    json_encode($data);
    print $data;

}catch(Exception $e){

}

?>