<?php
require "classProduto.php";

try{
    $id = $_POST['id'];
    $prod = Produto::findbyPk($id);
    if(!$prod){
         throw new Exception('não encontrado');
    }

    $img = $prod->getImagem();
    if(isset($img)){
        unlink($img);
    }
    $prod->remover(); 

}catch(Exception $e){
    print json_encode([
        "error" => true,
        "message" => $e->getMessage()
    ]);
}
?>