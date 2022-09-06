<?php
require "classNoticia.php";

try {

    if(!isset($_FILES['imagem'])){
        throw new Exception('Arquivo é obrigatório');
    }

    $id = $_POST['id'];



    $noticia = Noticia::findbyPk($id);
    $imgAntiga = $noticia->getImagem();

    if(isset($imgAntiga)){
    unlink($imgAntiga);
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

                $filedestination = '../imagens/not/' . $filenamenew;

                move_uploaded_file($filetmpname, $filedestination);

    $not = Noticia::findbyPk($id);
    if(!$not){
        throw new Exception("Notícia não encontrada!");
    }
    $not->setTitulo($_POST['titulo']);
    $not->setDescricao($_POST['descricao']);
    $not->setImagem($filedestination);
    $not->setConteudo($_POST['conteudo']);
    $not->alterar();
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
    
    

}catch(Exception $e){
    print json_encode([
        "error" => true,
        "message" => $e->getMessage()
    ]);
}