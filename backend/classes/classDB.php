<?php
   /* require __DIR__ . '/vendor/autoload.php'; // não ta funcionando (rip dotenv)

    use Dotenv\Dotenv;

    $dotenv = Dotenv::createImmutable(__DIR__);
    $dotenv->load();

    
    class DB {

        static function getInstance(){
            static $instance = null;
            if ($instance) return $instance;

            $instance = new PDO("mysql:host=localhost;dbname=" . $_ENV['DB_NAME'], $_ENV['DB_USER'], $_ENV['DB_PASSWORD']);

            return $instance;

            echo $instance;
        }
    }*/

    

?>