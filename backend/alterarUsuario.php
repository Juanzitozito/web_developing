<?php
require "classUsuario.php";

try {

    $id = $_POST['id'];

    $usu = Usuario::findbyPk($id);
    if(!$usu){
        throw new Exception("Usuário não encontrado!");
    }
    $usu->setNick($_POST['nick']);
    $usu->setNome($_POST['nome']);
    $usu->setEmail($_POST['email']);
    $usu->setSenha($_POST['senha']);
    $usu->alterar();
    print $usu;
}catch(Exception $e){
    print json_encode([
        "error" => true,
        "message" => $e->getMessage()
    ]);
}