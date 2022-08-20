<?php

require __DIR__ . '/vendor/autoload.php';
require_once dirname(__FILE__) . "/classDB.php";
require __DIR__ . '/interfaceCRUD.php';

date_default_timezone_set('America/Sao_Paulo');

class Noticia{
    private $id;
    private $titulo = '';
    private $imagem = '';
    private $descricao = '';
    private $conteudo = '';
    private $idAutor = '';
    private $dataPublicacao = '';

    function __toString(){
        return json_encode([
            "id" => $this->id,
            "titulo" => $this->titulo,
            "imagem" => $this->imagem,
            "descricao" => $this->descricao,
            "conteudo" => $this->conteudo,
            "idAutor" => $this->idAutor,
            "dataPublicacao" => $this->dataPublicacao,
        ]);
    }

        static function findbyPk ($id){
            $database = DB::getInstance();
            $consulta = $database->prepare("SELECT * FROM noticia WHERE id=:id");
            $consulta->execute([":id" => $id]);
            $consulta->setFetchMode(PDO::FETCH_CLASS, "Noticia");
            return $consulta->fetch();
        }

        static function findAll(){
            $database = DB::getInstance();
            $consulta = $database->prepare("SELECT * FROM noticia");
            $consulta->execute();
            $consulta->setFetchMode(PDO::FETCH_ASSOC);
            $dados = $consulta->fetchAll();
            return $dados;
        }

        function setTitulo($valor){
            $this->titulo = $valor;
        }
        function setDescricao($valor){
            $this->descricao = $valor;
        }
        function setImagem($valor){
            $this->imagem = $valor;
                 
        }
        function setConteudo($valor){
            $this->conteudo = $valor;
        }
        function setAutor($valor){
            $this->idAutor = $valor;
        }
        function getTitulo(){
            return $this->titulo;
        }
        function getDescricao(){
            return $this->descricao;
        }
        function getImagem(){
            return $this->imagem;
        }
        function getConteudo(){
            return $this->conteudo;
        }
        function getAutor(){
            return $this->idAutor;
        }


        function inserir(){
            try{
                $database = DB::getInstance();
                $consulta = $database->prepare("INSERT INTO noticia(titulo, imagem, descricao , conteudo, idAutor, dataPublicacao) VALUES (:titulo, :imagem, :descricao, :conteudo , :idAutor,  :dataPublicacao)");
                $consulta->execute([
                    ":titulo" => $this->titulo,
                    ":imagem" => $this->imagem,
                    ":descricao" => $this->descricao,
                    ":conteudo" => $this->conteudo,
                    ":idAutor" => $this->idAutor,
                    ":dataPublicacao" => date('Y-m-d')

                ]);
                $consulta = $database->prepare("SELECT id FROM noticia ORDER BY id DESC LIMIT 1");
                $consulta->execute();
                $dados = $consulta->fetch(PDO::FETCH_ASSOC);
                $this->id = $dados["id"];
                return $consulta;
            }
            catch(PDOException $e){
                throw new Exception($e);
            }
        }

        function alterar(){
            try{
                $database = DB::getInstance();
                $consulta = $database->prepare("UPDATE noticia SET titulo = :titulo, imagem = :imagem, descricao = :descricao, conteudo = :conteudo, WHERE id = :id");
                $consulta->execute([
                    ":id" => $this->id,
                    ":titulo" => $this->titulo,
                    ":imagem" => $this->imagem,
                    ":descricao" => $this->descricao,
                    ":conteudo" => $this->conteudo,
                ]);
            }
            catch(PDOException $e){
                die($e->getMessage());
            }
        }

        function remover(){
            try{
                $database = DB::getInstance();
                $consulta = $database->prepare("DELETE FROM noticia WHERE id = :id");
                $consulta->execute([":id" => $this->id]);
            }
            catch(PDOException $e){
                die($e->getMessage());
            }
        }
    }

?>

    




