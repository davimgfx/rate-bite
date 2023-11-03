-- Função para verificar a avaliação
CREATE OR REPLACE FUNCTION check_avaliacao(avaliacao INT)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN avaliacao >= 0 AND avaliacao <= 5;
END;
$$ LANGUAGE plpgsql;

-- Criando tabelas
CREATE TABLE IF NOT EXISTS cliente(
    ID_cliente SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    idade INT NOT NULL,
    cidade VARCHAR(255) DEFAULT 'Salvador',
    estado VARCHAR(255) DEFAULT 'Bahia'
);

CREATE TABLE IF NOT EXISTS restaurante (
    ID_restaurante SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    localizacao VARCHAR(255) NOT NULL,
    cidade VARCHAR(255) DEFAULT 'Salvador',
    estado VARCHAR(255) DEFAULT 'Bahia',
    logo VARCHAR(512) NOT NULL,
    CONSTRAINT restaurante_nome_localizacao_unique UNIQUE (nome, localizacao);
);

CREATE TABLE IF NOT EXISTS atendimento (
    ID_atendimento SERIAL PRIMARY KEY,
    ID_cliente INT NOT NULL,
    ID_restaurante INT NOT NULL,
    avaliacao INT CHECK (check_avaliacao(avaliacao)) NOT NULL,
    dia DATE NOT NULL,
    FOREIGN KEY (ID_cliente) REFERENCES cliente (ID_cliente),
    FOREIGN KEY (ID_restaurante) REFERENCES restaurante (ID_restaurante)
);

CREATE TABLE IF NOT EXISTS categoria (
    ID_categoria SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS prato (
    ID_prato SERIAL PRIMARY KEY,
    ID_restaurante INT NOT NULL,
    ID_cliente INT NOT NULL,
    ID_categoria INT NOT NULL,
    nome VARCHAR(255) NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    avaliacao INT CHECK (check_avaliacao(avaliacao)) NOT NULL,
    dia DATE NOT NULL,
    comentario VARCHAR(500) NOT NULL;
    FOREIGN KEY (ID_restaurante) REFERENCES restaurante (ID_restaurante),
    FOREIGN KEY (ID_cliente) REFERENCES cliente (ID_cliente),
    FOREIGN KEY (ID_categoria) REFERENCES Categoria (ID_categoria)
);


-- Colocando valores nas tabelas
-- Restaurante
INSERT INTO restaurante (nome, localizacao, cidade, estado, logo)
VALUES
  ('MacDonalds', 'Avenida Paralela', 'Salvador', 
   'Bahia', 'https://res.cloudinary.com/dfbny1pcr/image/upload/v1698063477/kgh4s3yv5z2o0rn7pcdi.jpg');

INSERT INTO restaurante (nome, localizacao, cidade, estado, logo)
VALUES
  ('Pizza', 'Pinto de Aguiar', 'Salvador', 
   'Bahia', 'https://res.cloudinary.com/dfbny1pcr/image/upload/v1698065108/e7iaqjfxhekv9gdsfjtu.png');

INSERT INTO restaurante (nome, localizacao, logo)
VALUES
  ('Açai do monstro', 'Itapuã','https://res.cloudinary.com/dfbny1pcr/image/upload/v1698066805/xjycxc52l0jepwvrhz9k.png');


-- Cliente
INSERT INTO cliente (nome, idade)
VALUES
  ('Arnaldo', 23);

  INSERT INTO cliente (nome, idade)
VALUES
  ('Davi', 19);
 
 INSERT INTO cliente (nome, idade)
VALUES
  ('Davi', 29);
 
-- Atendimento

	-- Mac Donalds
	INSERT INTO atendimento (id_cliente, id_restaurante, avaliacao, dia)
	VALUES (2, 1, 4, CURRENT_DATE)
	
	INSERT INTO atendimento (id_cliente, id_restaurante, avaliacao, dia)
	VALUES (3, 1, 1, CURRENT_DATE)
	
	INSERT INTO atendimento (id_cliente, id_restaurante, avaliacao, dia)
	VALUES (3, 2, 1, CURRENT_DATE)
	
	INSERT INTO atendimento (id_cliente, id_restaurante, avaliacao, dia)
	VALUES (1, 1, 2, CURRENT_DATE)
	
	INSERT INTO atendimento (id_cliente, id_restaurante, avaliacao, dia)
	VALUES (3, 1, 5, CURRENT_DATE)	
	
	INSERT INTO atendimento (id_cliente, id_restaurante, avaliacao, dia)
	VALUES (2, 1, 0, CURRENT_DATE)
	
	INSERT INTO atendimento (id_cliente, id_restaurante, avaliacao, dia)
	VALUES (1, 1, 5, CURRENT_DATE)
	
	INSERT INTO atendimento (id_cliente, id_restaurante, avaliacao, dia)
	VALUES (1, 1, 0, CURRENT_DATE)


	INSERT INTO atendimento (id_cliente, id_restaurante, avaliacao, dia)
	VALUES (1, 2, 5, CURRENT_DATE)

	-- Pizza
	INSERT INTO atendimento (id_cliente, id_restaurante, avaliacao, dia)
	VALUES (1, 2, 0, CURRENT_DATE)

	INSERT INTO atendimento (id_cliente, id_restaurante, avaliacao, dia)
	VALUES (1, 2, 5, CURRENT_DATE)
		
-- Categoria

INSERT INTO categoria(nome)
VALUES('pizza')

INSERT INTO categoria(nome)
VALUES('açai')

INSERT INTO categoria(nome)
VALUES('hamburguer')
SELECT * FROM atendimento

-- Prato

INSERT INTO prato (id_restaurante, id_cliente, id_categoria, nome, valor, avaliacao, dia, comentario)
VALUES (1, 1, 3, 'Big Mac', 12.2, 3, CURRENT_DATE, 'Achei muita salgado' )

INSERT INTO prato (id_restaurante, id_cliente, id_categoria, nome, valor, avaliacao, dia, comentario)
VALUES (2, 1, 1, 'Pizza calabresa pequena', 40.2, 3, CURRENT_DATE, 'Achei muita massa, e pedi sem cebola porém veio com' )

INSERT INTO prato (id_restaurante, id_cliente, id_categoria, nome, valor, avaliacao, dia, comentario)
VALUES (3, 2, 2, 'Açai com granola', 20.5, 5, CURRENT_DATE, 'perfeito!' )

-- Criando view para facilitar a visualização das tabelas juntas
		
-- Para ver a tabela geral do site
CREATE OR REPLACE VIEW restaurantes_avaliacoes AS
SELECT
    r.id_restaurante AS id_restaurante,
    r.localizacao AS localizacao_restaurante,
    r.nome AS nome_restaurante,
    r.logo AS logo_restaurante,
    r.cidade AS cidade_restaurante,
    r.estado AS estado_restaurante,
    COALESCE(AVG(a.avaliacao), 0) AS media_avaliacao_atendimento,
    COUNT(a.avaliacao) AS pessoas_avaliacao_atendimento,
    COALESCE(AVG(p2.avaliacao), 0) AS media_avaliacao_prato_gerais,
    COUNT(DISTINCT c.id_cliente) AS pessoas_avaliacao_prato_gerais
FROM restaurante r
LEFT JOIN atendimento a ON r.ID_restaurante = a.id_restaurante
LEFT JOIN prato p2 ON r.ID_restaurante = p2.id_restaurante
LEFT JOIN cliente c ON p2.id_cliente = c.id_cliente
GROUP BY r.ID_restaurante;;

SELECT * FROM restaurantes_avaliacoes

-- Para ver os pratos avaliados
CREATE OR REPLACE VIEW avaliacoes_pratos  AS
SELECT
    prato.id_prato AS id_prato,
    prato.nome AS nome_prato,
    restaurante.nome AS nome_restaurante,
    categoria.nome AS nome_categoria,
    cliente.nome AS nome_cliente,
    cliente.idade AS idade_cliente,
    prato.avaliacao AS avaliacao_cliente
FROM prato
INNER JOIN restaurante ON prato.id_restaurante = restaurante.ID_restaurante
INNER JOIN categoria ON prato.id_categoria = categoria.ID_categoria
INNER JOIN cliente ON prato.id_cliente = cliente.ID_cliente;
		
SELECT * FROM avaliacoes_pratos ORDER BY id_prato ASC;

-- Para ver os atendimentos avaliados
CREATE OR REPLACE VIEW avaliacoes_atendimento AS
SELECT
    r.nome AS restaurante_nome,
    a.id_atendimento AS atendimento_id,
    a.avaliacao AS avaliacao_nota,
    c.id_cliente AS cliente_id,
    c.nome AS cliente_nome
FROM atendimento a
INNER JOIN restaurante r ON a.id_restaurante = r.id_restaurante
INNER JOIN cliente c ON a.id_cliente = c.id_cliente;

SELECT * FROM avaliacoes_atendimento;

-- Alterando valores das tabelas
	
UPDATE restaurante SET localizacao = 'Av Paralela' WHERE id_restaurante = 1
UPDATE restaurante SET localizacao = 'Av Pinto de Aguiar' WHERE id_restaurante = 2
UPDATE restaurante SET localizacao = 'Salvador Norte Shopping' WHERE nome = 'Pizza Hut'

