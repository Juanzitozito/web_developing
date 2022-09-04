<?php
    require dirname(__FILE__) . "/../classProduto.php";

    $o = new Produto();
    $data = $o->findAll();
    print json_encode($data);

?>