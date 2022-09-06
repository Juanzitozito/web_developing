<?php
require dirname(__FILE__) . "/../classUsuario.php";

try {
    $usu = new Usuario();
    $id = $_POST['id'];
    $data = $usu->findbyPk($id);
    json_encode($data);
    print $data;
} catch (Exception $e) {
    json_encode([
        'error' => true,
        'message' => $e->getMessage()
    ]);
}
