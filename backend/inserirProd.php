<?php

require "classProduto.php";

try {
    if(!isset($_FILES['imagem'])){
        throw new Exception('Arquivo é obrigatório');
    }
    
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

                $filedestination = '../imagens/prod/' . $filenamenew;

                move_uploaded_file($filetmpname, $filedestination);

    $not = new Produto();
    $not->setNome($_POST['nome']);
    $not->setDescricao($_POST['descricao']);
    $not->setImagem($filedestination);
    $not->setpreco($_POST['preco']);
    /* $not->setAutor($_POST['idAutor']); */
    $not->setSiteProduto($_POST['siteProduto']);
    $not->setEspecificacoes($_POST['especificacoes']);
    $not->inserir();
    print $not;
            } else {
                throw new Exception("ocorreu um problema no tamanho");
            }
        } else {
            throw new Exception("ocorreu um problema no arquivo");
        }
    } else {
        throw new Exception("formato errado");

}

    
} catch (Exception $e) {
    print json_encode([
        "error" => true,
        "message" => $e->getMessage()
    ]);
}
