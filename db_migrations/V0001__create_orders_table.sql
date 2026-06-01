CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    client_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    order_type VARCHAR(50) NOT NULL DEFAULT 'unknown',
    total NUMERIC(12, 2) DEFAULT 0,
    order_data JSONB,
    status VARCHAR(50) NOT NULL DEFAULT 'new',
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
