<?php
require "classNoticia.php";

try{
    $id = $_POST['id'];
    $not = Noticia::findbyPk($id);
    if(!$not){
         throw new Exception('não encontrado');
    }

    $img = $not->getImagem();
    if(isset($img)){
        unlink($img);
    }
    $not->remover(); 

}catch(Exception $e){
    print json_encode([
        "error" => true,
        "message" => $e->getMessage()
    ]);
}
?>