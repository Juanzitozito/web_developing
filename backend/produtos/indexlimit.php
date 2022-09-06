<?php
    require dirname(__FILE__) . "/../classProduto.php";

    $o = new Produto();
    $data = $o->find4();
    print json_encode($data);

?>