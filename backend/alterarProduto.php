<?php
require "classProduto.php";

try {

    if(!isset($_FILES['imagem'])){
        throw new Exception('Arquivo é obrigatório');
    }

    $id = $_POST['id'];

    $produto = Produto::findbyPk($id);
    $imgAntiga = $produto->getImagem();

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

                $filedestination = '../imagens/' . $filenamenew;

                move_uploaded_file($filetmpname, $filedestination);

    $prod = Produto::findbyPk($id);
    if(!$prod){
        throw new Exception("Produto não encontrado!");
    }
    $prod->setNome($_POST['nome']);
    $prod->setDescricao($_POST['descricao']);
    $prod->setImagem($filedestination);
    $prod->setpreco($_POST['preco']);
    $prod->setSiteProduto($_POST['siteProduto']);
    $prod->setEspecificacoes($_POST['especificacoes']);
    $prod->alterar();
    print $prod;
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