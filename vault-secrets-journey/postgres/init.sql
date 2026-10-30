-- Runs once when the (ephemeral) Postgres container initialises.

CREATE TABLE orders (
  id       serial PRIMARY KEY,
  customer text NOT NULL,
  item     text NOT NULL,
  amount   numeric(10, 2) NOT NULL
);

INSERT INTO orders (customer, item, amount) VALUES
  ('Alex Morgan',  'Noise-cancelling headphones', 249.00),
  ('Sam Cole',     'Mechanical keyboard',         129.50),
  ('Robin Berg',   'USB-C dock',                   89.99),
  ('Kim Lund',     '27" monitor',                 329.00),
  ('Taylor Nyström', 'Webcam',                     74.90);

-- Stage 1 and 2: one long-lived, shared application login.
CREATE ROLE app LOGIN PASSWORD 'Sup3rS3cret!2019';
GRANT SELECT ON orders TO app;
