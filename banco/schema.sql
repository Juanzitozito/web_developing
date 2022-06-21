
CREATE DATABASE gamesite;

USE gamesite;

CREATE TABLE noticia(
    id int AUTO_INCREMENT NOT NULL,
    imagem varchar(255),
    titulo varchar(50) NOT NULL,
    descricao varchar(255) NOT NULL,
    conteudo varchar(1000) NOT NULL,
    dataPublicacao date NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE produto(
    id int AUTO_INCREMENT NOT NULL,
    nome varchar(80) NOT NULL,
    preço decimal(6,2) NOT NULL,
    siteProduto varchar(255) NOT NULL,
    tipo varchar(40) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE usuario(
    id int AUTO_INCREMENT NOT NULL,
    nome varchar(200) NOT NULL,
    nick varchar(30) NOT NULL,
    dtnasc date NOT NULL,
    cargo varchar(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE noticia_usuario(
    id_usuario int NOT NULL,
    id_noticia int NOT NULL,
    FOREIGN KEY(id_usuario) REFERENCES usuario(id),
    FOREIGN KEY(id_noticia) REFERENCES noticia(id)
);