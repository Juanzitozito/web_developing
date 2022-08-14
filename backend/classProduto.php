<?php
require __DIR__ . '/vendor/autoload.php';
require_once dirname(__FILE__) . "/classDB.php";
require __DIR__ . '/interfaceCRUD.php';

    class Produto{

        private $id;
        private $nome = "";
        private $preco = "";
        private $descricao = "";
        private $siteProduto = "";
        private $tipo = "";

        function __toString(){
            return json_encode([
                "id" => $this->id,
                "nome" => $this->nome,
                "preco" => $this->preco,
                "descricao" => $this->descricao,
                "siteProduto" => $this->siteProduto,
                "tipo" => $this->tipo
            ]);
        }

        static function findbyPk ($id){
            $database = DB::getInstance();
            $consulta = $database->prepare("SELECT * FROM produto WHERE id=:id");
            $consulta->execute([":id" => $id]);
            $consulta->setFetchMode(PDO::FETCH_CLASS, "Produto");
            return $consulta->fetch();
        }

        function setNome($valor){
            $this->nome = $valor;
        }
        function setpreco($valor){
            $this->preco = $valor;
        }
        function setDescricao($valor){
            $this->descricao = $valor;
        }
        function setSiteProduto($valor){
            $this->siteProduto = $valor;
        }
        function setTipo($valor){
            $this->tipo = $valor;
        }
        function getNome(){
            return $this->nome;
        }
        function getpreco(){
            return $this->email;
        }
        function getDescricao(){
            return $this->senha;
        }
        function getSiteProduto(){
            return $this->dtnasc;
        }
        function getTipo(){
            return $this->nickname;
        }

        function inserir(){
            try{
                $database = DB::getInstance();
                $consulta = $database->prepare("INSERT INTO produto(nome, preco, descricao, siteProduto, tipo) VALUES (:nome, :preco, :descricao, :siteProduto, :tipo)");
                $consulta->execute([
                    ":nome" => $this->nome,
                    ":preco" => $this->preco,
                    ":descricao" => $this->descricao,
                    ":siteProduto" => $this->siteProduto,
                    ":tipo" => $this->tipo

                ]);
                $consulta = $database->prepare("SELECT id FROM produto ORDER BY id DESC LIMIT 1");
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
                $consulta = $database->prepare("UPDATE produto SET nome = :nome, preco = :preco, descricao = :descricao, siteProduto = :siteProduto, tipo = :tipo WHERE id = :id");
                $consulta->execute([
                    ":id" => $this->id,
                    ":nome" => $this->nome,
                    ":preco" => $this->preco,
                    ":descricao" => $this->descricao,
                    ":siteProduto" => $this->siteProduto,
                    ":tipo" => $this->tipo
                ]);
            }
            catch(PDOException $e){
                die($e->getMessage());
            }
        }

        function remover(){
            try{
                $database = DB::getInstance();
                $consulta = $database->prepare("DELETE FROM produto WHERE id = :id");
                $consulta->execute([":id" => $this->id]);
            }
            catch(PDOException $e){
                die($e->getMessage());
            }
        }
    }