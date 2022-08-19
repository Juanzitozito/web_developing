<?php

require "classNoticia.php";

try {
    $not = new Noticia();
    $not->setTitulo($_POST['titulo']);
    $not->setDescricao($_POST['descricao']);
    $not->setImagem($_POST['imagem']);
    $not->setConteudo($_POST['conteudo']);
    $not->setAutor($_POST['idAutor']);
    $not->inserir();
    print $not;
}catch(Exception $e){
    print json_encode([
        "error" => true,
        "message" => $e->getMessage()
    ]);
}