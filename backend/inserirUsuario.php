<?php
require "classUsuario.php";

try {
    $usu = new Usuario();
    $usu->setNick($_POST['nick']);
    $usu->setNome($_POST['nome']);
    $usu->setEmail($_POST['email']);
    $usu->setDtnasc($_POST['dtnasc']);
    $usu->setSenha($_POST['senha']);
    $usu->inserir();
    print $usu;
}catch(Exception $e){
    print json_encode([
        "error" => true,
        "message" => $e->getMessage()
    ]);
}