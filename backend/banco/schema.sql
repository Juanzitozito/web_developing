
CREATE DATABASE gamesite;

USE gamesite;

CREATE TABLE produto(
    id int AUTO_INCREMENT NOT NULL,
    nome varchar(80) NOT NULL,
    preço decimal(6,2) NOT NULL,
    descricao varchar(500) NOT NULL,
    siteProduto varchar(255) NOT NULL,
    tipo varchar(40) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE usuario(
    id int AUTO_INCREMENT NOT NULL,
    email varchar(200) NOT NULL,
    senha int(12) NOT NULL,
    nome varchar(200) NOT NULL,
    nickname varchar(30) NOT NULL,
    dtnasc date NOT NULL,
    cargo varchar(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE noticia(
    id int AUTO_INCREMENT NOT NULL,
    imagem varchar(255),
    titulo varchar(50) NOT NULL,
    descricao varchar(255) NOT NULL,
    conteudo varchar(1000) NOT NULL,
    dataPublicacao date NOT NULL,
    idUsuario int NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(idUsuario) REFERENCES usuario(id)
);