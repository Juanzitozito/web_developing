<?php
require __DIR__ . '/vendor/autoload.php';
require_once dirname(__FILE__) . "/classDB.php";
require __DIR__ . '/interfaceCRUD.php';

    class Produto{

        private $id;
        private $nome = "";
        private $preco = "";
        private $imagem = "";
        private $descricao = "";
        private $siteProduto = "";
        private $especificacoes = "";

        function __toString(){
            return json_encode([
                "id" => $this->id,
                "nome" => $this->nome,
                "preco" => $this->preco,
                "descricao" => $this->descricao,
                "siteProduto" => $this->siteProduto,
                'imagem' => $this->imagem,
                'especificacoes' => $this->especificacoes,
                
            ]);
        }

        static function findbyPk ($id){
            $database = DB::getInstance();
            $consulta = $database->prepare("SELECT * FROM produto WHERE id=:id");
            $consulta->execute([":id" => $id]);
            $consulta->setFetchMode(PDO::FETCH_CLASS, "Produto");
            return $consulta->fetch();
        }

        static function findAll(){
            $database = DB::getInstance();
            $consulta = $database->prepare("SELECT * FROM produto LIMIT 20");
            $consulta->execute();
            $consulta->setFetchMode(PDO::FETCH_ASSOC);
            $dados = $consulta->fetchAll();
            return $dados;
        }

        static function find4(){
            $database = DB::getInstance();
            $consulta = $database->prepare("SELECT * FROM produto ORDER BY RAND() LIMIT 4");
            $consulta->execute();
            $consulta->setFetchMode(PDO::FETCH_ASSOC);
            $dados = $consulta->fetchAll();
            return $dados;
        }

        function setNome($valor){
            $this->nome = $valor;
        }
        function setpreco($valor){
            $this->preco = $valor;
        }
        function setImagem($valor){
            $this->imagem = $valor;
        }
        function setDescricao($valor){
            $this->descricao = $valor;
        }
        function setEspecificacoes($valor){
            $this->especificacoes = $valor;
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
        function getEspecificacoes(){
            return $this->especificacoes;
        }
        function getpreco(){
            return $this->preco;
        }
        function getImagem(){
            return $this->imagem;
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
                $consulta = $database->prepare("INSERT INTO produto(nome, preco, descricao, siteProduto, imagem, especificacoes) VALUES (:nome, :preco, :descricao, :siteProduto, :imagem, :especificacoes)");
                $consulta->execute([
                    ":nome" => $this->nome,
                    ":preco" => $this->preco,
                    ":descricao" => $this->descricao,
                    ":siteProduto" => $this->siteProduto,

                    ":imagem" => $this->imagem,
                    ":especificacoes" => $this->especificacoes

                ]);
                $consulta = $database->prepare("SELECT id FROM produto ORDER BY id DESC LIMIT 1");
                $consulta->execute();
                $dados = $consulta->fetch(PDO::FETCH_ASSOC);
                $this->id = $dados["id"];
            }
            catch(PDOException $e){
                throw new Exception($e->getMessage());
            }
        }

        function alterar(){
            try{
                $database = DB::getInstance();
                $consulta = $database->prepare("UPDATE produto SET nome = :nome, preco = :preco, descricao = :descricao, siteProduto = :siteProduto, imagem = :imagem, especificacoes = :especificacoes WHERE id = :id");
                $consulta->execute([
                    ":id" => $this->id,
                    ":nome" => $this->nome,
                    ":preco" => $this->preco,
                    ":descricao" => $this->descricao,
                    ":siteProduto" => $this->siteProduto,
                    ":imagem" => $this->imagem,
                    ":especificacoes" => $this->especificacoes
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