DROP DATABASE IF EXISTS gamesite;

CREATE DATABASE gamesite;

USE gamesite;

CREATE TABLE produto(
    id int AUTO_INCREMENT NOT NULL,
    nome varchar(80) NOT NULL,
    imagem varchar(255) NOT NULL,
    preco decimal(6,2) NOT NULL,
    descricao varchar(500) NOT NULL,
    especificacoes varchar(2000) NOT NULL,
    siteProduto varchar(255) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE usuario(
    id int AUTO_INCREMENT NOT NULL,
    email varchar(200) NOT NULL,
    senha int(12) NOT NULL,
    nome varchar(200) NOT NULL,
    nick varchar(30) NOT NULL UNIQUE,
    dtnasc date NOT NULL,
    cargo varchar(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE noticia(
    id int AUTO_INCREMENT NOT NULL,
    imagem varchar(255),
    titulo varchar(50) NOT NULL,
    descricao varchar(255) NOT NULL,
    conteudo varchar(5000) NOT NULL,
    dataPublicacao date NOT NULL,
    idAutor int NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(idAutor) REFERENCES usuario(id)
);