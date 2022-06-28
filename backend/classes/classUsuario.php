<?php
require __DIR__ . '/vendor/autoload.php';
require_once dirname(__FILE__) . "/class.DB.php";
require __DIR__ . '/interface.CRUD.php';

    class Usuario{

        private $id;
        private $nick = "";
        private $nome = "";
        private $email = "";
        private $senha = "";
        private $dtnasc = "";
        private $cargo = "";

        function __toString(){
            return json_encode([
                "id" => $this->id,
                "nome" => $this->nome,
                "nick" => $this->nick,
                "email" => $this->email,
                "senha" => $this->senha,
                "dtnasc" => $this->dtnasc,
                "cargo" => $this->cargo
            ]);
        }

        static function findbyPk ($id){
            $database = DB::getInstance();
            $consulta = $database->prepare("SELECT * FROM usuarios WHERE id=:id");
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
        function setNick($valor){
            $this->nick = $valor;
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
        function getNick(){
            return $this->nick;
        }
        function getCargo(){
            return $this->cargo;
        }

        function inserir(){
            try{
                $database = DB::getInstance();
                $consulta = $database->prepare("INSERT INTO usuarios(email, nome, nick, senha, dtnasc, cargo) VALUES (:email, :nome, :nick, :senha, :dtnasc, :cargo)");
                $consulta->execute([
                    ":email" => $this->email,
                    ":nome" => $this->nome,
                    ":nick" => $this->nick,
                    ":senha" => $this->senha,
                    ":dtnasc" => $this->dtnasc,
                    ":cargo" => $this->cargo

                ]);
                $consulta = $database->prepare("SELECT id FROM usuarios ORDER BY id DESC LIMIT 1");
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
                $consulta = $database->prepare("UPDATE usuarios SET email = :email, nome = :nome, nick = :nick  senha = :senha, dtnasc = :dtnasc, cargo = :cargo WHERE id = :id");
                $consulta->execute([
                    ":id" => $this->id,
                    ":email" => $this->email,
                    ":nome" => $this->nome,
                    ":nick" => $this->nick,
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
                $consulta = $database->prepare("DELETE FROM usuarios WHERE id = :id");
                $consulta->execute([":id" => $this->id]);
            }
            catch(PDOException $e){
                die($e->getMessage());
            }
        }
    }

?>