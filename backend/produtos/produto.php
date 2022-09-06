<?php

require "../classProduto.php";

try{
    $not = new Produto();
    $id = $_POST['id'];
    $data = $not->findbyPk($id);
    json_encode($data);
    print $data;

}catch(Exception $e){

}

?>