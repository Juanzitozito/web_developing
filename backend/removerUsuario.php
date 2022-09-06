<?php
require "classUsuario.php";

try{
    $id = $_POST['id'];
    $usu = Usuario::findbyPk($id);
    if(!$usu){
         throw new Exception('não encontrado');
    }
    $usu->remover(); 

}catch(Exception $e){
    print json_encode([
        "error" => true,
        "message" => $e->getMessage()
    ]);
}
?>