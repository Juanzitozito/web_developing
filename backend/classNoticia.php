<?php
require __DIR__ . '/vendor/autoload.php';
require_once dirname(__FILE__) . "/classDB.php";
require __DIR__ . '/interface.CRUD.php';

class Noticia{
    private $id;
    private $titulo = '';
    private $imagem = '';
    private $descricao = '';
    private $conteudo = '';
    private $autor = '';
    private $dataPublicacao;
    private $idUsuario;

    function __toString(){
        return json_encode([
            "id" => $this->id,
            "titulo" => $this->titulo,
            "imagem" => $this->imagem,
            "descricao" => $this->descricao,
            "conteudo" => $this->conteudo,
            "autor" => $this->autor,
            "dataPublicacao" => $this->dataPublicacao,
            "idUsuario" => $this->idUsuario
        ]);
    }

        static function findbyPk ($id){
            $database = DB::getInstance();
            $consulta = $database->prepare("SELECT * FROM noticia WHERE id=:id");
            $consulta->execute([":id" => $id]);
            $consulta->setFetchMode(PDO::FETCH_CLASS, "Noticia");
            return $consulta->fetch();
        }

        function setTitulo($valor){
            $this->titulo = $valor;
        }
        function setImagem($valor){
            $this->imagem = $valor;
        }
        function setConteudo($valor){
            $this->descricao = $valor;
        }
        function setAutor($valor){
            $this->dtnasc = $valor;
        }
        function getTitulo(){
            return $this->titulo;
        }
        function getImagem(){
            return $this->imagem;
        }
        function getConteudo(){
            return $this->senha;
        }
        function getAutor(){
            return $this->autor;
        }
        //Faltam os getters de data e id usuario acho?????


        function inserir(){
            try{
                $database = DB::getInstance();
                $consulta = $database->prepare("INSERT INTO noticia(titulo, imagem, conteudo, autor, dataPublicacao, idUsuario) VALUES (:titulo, :imagem, :conteudo, :autor, :dataPublicacao, :idUsuario)");
                $consulta->execute([
                    ":titulo" => $this->titulo,
                    ":imagem" => $this->imagem,
                    ":conteudo" => $this->conteudo,
                    ":autor" => $this->autor,
                    ":dataPublicacao" => $this->dataPublicacao,
                    ":idUsuario" => $this->idUsuario

                ]);
                $consulta = $database->prepare("SELECT id FROM noticia ORDER BY id DESC LIMIT 1");
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
                $consulta = $database->prepare("UPDATE noticia SET titulo = :titulo, imagem = :imagem, conteudo = :conteudo, WHERE id = :id");
                $consulta->execute([
                    ":id" => $this->id,
                    ":titulo" => $this->titulo,
                    ":imagem" => $this->imagem,
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

    



}
