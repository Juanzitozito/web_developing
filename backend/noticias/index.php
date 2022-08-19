
<?php
    require dirname(__FILE__) . "/../classNoticia.php";

    $o = new Noticia();
    $data = $o->findAll();
    print 'a';

?>
