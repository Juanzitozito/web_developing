<?php

require "classNoticia.php";

try {

    if (isset($_FILES) || $_FILES != ""){
    $file = $_FILES['imagem'];
    $filename = $file['name'];
    $filetmpname = $file['tmp_name'];
    $filesize = $file['size'];
    $fileerror = $file['error'];
    $filetype = $file['type'];

    $fileext = explode('.', $filename);
    $fileactualext = strtolower(end($fileext));

    $allowed = array('jpeg', 'jpg', 'png');

    if (in_array($fileactualext, $allowed)) {
        if ($fileerror === 0) {
            if ($filesize < 5000000) {
                $filenamenew = uniqid('', true) . '.' . $fileactualext;

                $filedestination = '../imagens/' . $filenamenew;

                move_uploaded_file($filetmpname, $filedestination);

                $not = new Noticia();
    $not->setTitulo($_POST['titulo']);
    $not->setDescricao($_POST['descricao']);
    $not->setImagem($filedestination);
    $not->setConteudo($_POST['conteudo']);
    $not->setAutor($_POST['idAutor']);
    $not->inserir();
    print $not;
            } else {
                echo "ocorreu um problema no tamanho";
            }
        } else {
            echo "ocorreu um problema no arquivo";
        }
    } else {
        echo "formato não permitido";
    }
}

    
} catch (Exception $e) {
    print json_encode([
        "error" => true,
        "message" => $e->getMessage()
    ]);
}
