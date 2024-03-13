-- cria a tabela de clientes
CREATE TABLE IF NOT EXISTS clients (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "name" varchar(255) NULL,
  "email" varchar(255) NOT NULL,
  "phone" varchar(255) NOT NULL,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NULL
);

-- cria a tabela de posições
CREATE TABLE IF NOT EXISTS locations (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "x" INTEGER NOT NULL,
  "y" INTEGER NOT NULL,
  "client_id" INTEGER REFERENCES clients(id) ON DELETE CASCADE,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NULL
);


-- Inserir 10 clientes com posições aleatórias
INSERT INTO clients (name, email, phone)
VALUES
    ('Cliente 1', 'cliente1@example.com', '1234567890'),
    ('Cliente 2', 'cliente2@example.com', '1234567891'),
    ('Cliente 3', 'cliente3@example.com', '1234567892'),
    ('Cliente 4', 'cliente4@example.com', '1234567893'),
    ('Cliente 5', 'cliente5@example.com', '1234567894'),
    ('Cliente 6', 'cliente6@example.com', '1234567895');

-- Inserir posições aleatórias para cada cliente
INSERT INTO locations (x, y, client_id)
SELECT
    ROUND(RANDOM() * 100),
    ROUND(RANDOM() * 100),
    id
FROM
    clients;
