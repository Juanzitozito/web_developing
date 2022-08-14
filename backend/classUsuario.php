<?php
require __DIR__ . '/vendor/autoload.php';
require_once dirname(__FILE__) . "/classDB.php";
require __DIR__ . '/interfaceCRUD.php';

    class Usuario{

        private $id;
        private $nickname = "";
        private $nome = "";
        private $email = "";
        private $senha = "";
        private $dtnasc = "";
        private $cargo = "";

        function __toString(){
            return json_encode([
                "id" => $this->id,
                "nome" => $this->nome,
                "nickname" => $this->nickname,
                "email" => $this->email,
                "senha" => $this->senha,
                "dtnasc" => $this->dtnasc,
                "cargo" => $this->cargo
            ]);
        }

        static function findbyPk ($id){
            $database = DB::getInstance();
            $consulta = $database->prepare("SELECT * FROM usuario WHERE id=:id");
            $consulta->execute([":id" => $id]);
            $consulta->setFetchMode(PDO::FETCH_CLASS, "Usuario");
            return $consulta->fetch();
        }

        function setNome($valor){
            $this->nome = $valor;
        }
        function setEmail($valor){
            $this->email = $valor;
        }
        function setSenha($valor){
            $this->senha = $valor;
        }
        function setDtnasc($valor){
            $this->dtnasc = $valor;
        }
        function setNickname($valor){
            $this->nickname = $valor;
        }
        function setCargo($valor){
            $this->cargo = $valor;
        }
        function getNome(){
            return $this->nome;
        }
        function getEmail(){
            return $this->email;
        }
        function getSenha(){
            return $this->senha;
        }
        function getDtnasc(){
            return $this->dtnasc;
        }
        function getNickname(){
            return $this->nickname;
        }
        function getCargo(){
            return $this->cargo;
        }

        function inserir(){
            try{
                $database = DB::getInstance();
                $consulta = $database->prepare("INSERT INTO usuario(email, nome, nickname, senha, dtnasc, cargo) VALUES (:email, :nome, :nickname, :senha, :dtnasc, :cargo)");
                $consulta->execute([
                    ":email" => $this->email,
                    ":nome" => $this->nome,
                    ":nickname" => $this->nickname,
                    ":senha" => $this->senha,
                    ":dtnasc" => $this->dtnasc,
                    ":cargo" => $this->cargo

                ]);
                $consulta = $database->prepare("SELECT id FROM usuario ORDER BY id DESC LIMIT 1");
                $consulta->execute();
                $dados = $consulta->fetch(PDO::FETCH_ASSOC);
                $this->id = $dados["id"];
            }
            catch(PDOException $e){
                throw new Exception("Ocorreu um erro interno!");
            }
        }

        function alterar(){
            try{
                $database = DB::getInstance();
                $consulta = $database->prepare("UPDATE usuario SET email = :email, nome = :nome, nickname = :nickname, senha = :senha, dtnasc = :dtnasc, cargo = :cargo WHERE id = :id");
                $consulta->execute([
                    ":id" => $this->id,
                    ":email" => $this->email,
                    ":nome" => $this->nome,
                    ":nickname" => $this->nickname,
                    ":senha" => $this->senha,
                    ":dtnasc" => $this->dtnasc,
                    ":cargo" => $this->cargo
                ]);
            }
            catch(PDOException $e){
                die($e->getMessage());
            }
        }

        function remover(){
            try{
                $database = DB::getInstance();
                $consulta = $database->prepare("DELETE FROM usuario WHERE id = :id");
                $consulta->execute([":id" => $this->id]);
            }
            catch(PDOException $e){
                die($e->getMessage());
            }
        }
    }

?>