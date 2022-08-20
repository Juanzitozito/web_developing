<?php

    require_once dirname(__FILE__) . "/classDB.php";
    require dirname(__FILE__) . '/vendor/autoload.php';
    require __DIR__ . "/key.php";
    use Firebase\JWT\JWT;
    $usuario = $_POST['email'];
    $senha = $_POST['senha'];
    $database = DB::getInstance();
    try {
        
        $consulta = $database->prepare("SELECT id, nick, cargo FROM usuario WHERE email=:email and senha =:senha");
        $consulta->execute([":email" => $usuario, ':senha' => $senha]);
        $consulta->setFetchMode(PDO::FETCH_ASSOC);
        $dados = $consulta->fetch();
        
        if ($dados === false){
            throw new Exception("Dados inválidos!");
        }

        $payload = [
            'exp' => time() + 10,
            'iat' => time(),
            'dados' => $dados
        ];

        $jwt = JWT::encode($payload, $_ENV['KEY'], 'HS256');
        print json_encode(['token' => "Bearer ${jwt}"]);
    } catch(Exception $e){
        die(json_encode(['error' => $e->getMessage(), ]));
    }