<?php

require "classNoticia.php";

try{
    $not = new Noticia();
    $not->findbyPk($_POST['id']);
    print json_encode($not);
    

}catch(Exception $e){

}

?>