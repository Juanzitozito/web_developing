<?php

    require_once dirname(__FILE__) . "/classDB.php";
    require __DIR__ . '/vendor/autoload.php';
    require __DIR__ . "/key.php";
    use Firebase\JWT\JWT;
    use Firebase\JWT\Key;
    $usuario = $_POST['email'];
    $senha = $_POST['senha'];
    $database = DB::getInstance();
    try {
        
        $consulta = $database->prepare("SELECT id, nome, nickname, cargo FROM usuario WHERE email=:email and senha =:senha");
        $consulta->execute([":email" => $usuario, ':senha' => $senha]);
        $consulta->setFetchMode(PDO::FETCH_ASSOC);
        $dados = $consulta->fetch();
        
        if ($dados === false){
            throw new Exception("Dados inválidos!");
        }

        $jwt = JWT::encode($dados, $key, 'HS256');
        print json_encode(['token' => "Bearer ${jwt}", 'usuario' => ['name' => $dados['nome'], 'nickname' => $dados['nickname'], 'cargo' => $dados['cargo']]]);
    } catch(Exception $e){
        die(json_encode(['error' => $e->getMessage()]));
    }