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
    cidade VARCHAR(255) NOT NULL,
    estado VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS restaurante (
    ID_restaurante SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    localizacao VARCHAR(255) NOT NULL,
    cidade VARCHAR(255) NOT NULL DEFAULT 'Salvador',
    estado VARCHAR(255) NOT NULL DEFAULT 'Bahia',
    logo VARCHAR(512) NOT NULL,
    CONSTRAINT restaurante_nome_unique UNIQUE (nome)
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
    FOREIGN KEY (ID_restaurante) REFERENCES restaurante (ID_restaurante),
    FOREIGN KEY (ID_cliente) REFERENCES cliente (ID_cliente),
    FOREIGN KEY (ID_categoria) REFERENCES Categoria (ID_categoria)
);


-- Colocando valores nas tabelas
INSERT INTO restaurante (nome, localizacao, cidade, estado, logo)
VALUES
  ('MacDonalds', 'Avenida Paralela', 'Salvador', 
   'Bahia', 'https://res.cloudinary.com/dfbny1pcr/image/upload/v1698063477/kgh4s3yv5z2o0rn7pcdi.jpg');

INSERT INTO restaurante (nome, localizacao, cidade, estado, logo)
VALUES
  ('Pizza', 'Pinto de Aguiar', 'Salvador', 
   'Bahia', 'https://res.cloudinary.com/dfbny1pcr/image/upload/v1698065108/e7iaqjfxhekv9gdsfjtu.png');

-- Dispara um erro, pois o nome é unico
-- INSERT INTO restaurante (nome, localizacao, cidade, estado, logo)
-- VALUES
--   ('MacDonalds', 'Orlando Gomes', 'Salvador', 
--    'Bahia', 'https://res.cloudinary.com/dfbny1pcr/image/upload/v1698063477/kgh4s3yv5z2o0rn7pcdi.jpg');

INSERT INTO restaurante (nome, localizacao, logo)
VALUES
  ('Açai do monstro', 'Itapuã','https://res.cloudinary.com/dfbny1pcr/image/upload/v1698066805/xjycxc52l0jepwvrhz9k.png');
   
-- Dispara um erro pois a valores nulos
-- INSERT INTO restaurante (nome, localizacao, cidade, estado, logo)
-- VALUES
--   ('Açai do monstro', 'Salvador', 
--    'Bahia', 'https://res.cloudinary.com/dfbny1pcr/image/upload/v1698066805/xjycxc52l0jepwvrhz9k.png');
 
SELECT * FROM restaurante
