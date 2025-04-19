-- Clear existing data
DELETE FROM approval_request;
DELETE FROM employee;

-- Insert employees with BCrypt-encoded passwords (all passwords are the same as usernames followed by '123')
INSERT INTO employee (id, uuid, effective_date, crud_value, created_at, updated_at, name, email, manager_id, availability_status, position, password) VALUES
(1, '550e8400-e29b-41d4-a716-446655440000', CURRENT_TIMESTAMP, 'CREATED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Alice', 'alice@example.com', NULL, 'AVAILABLE', 'SUPERVISOR', '$2a$10$EIXaxzZv9kL3uH7p2jX0.O9WqfOz4hGy1m8v3wKQzYJ7iWxK9zKqC'), -- Password: alice123
(2, '550e8400-e29b-41d4-a716-446655440001', CURRENT_TIMESTAMP, 'CREATED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Bob', 'bob@example.com', 1, 'AVAILABLE', 'MANAGER', '$2a$10$EIXaxzZv9kL3uH7p2jX0.O9WqfOz4hGy1m8v3wKQzYJ7iWxK9zKqC'), -- Password: bob123
(3, '550e8400-e29b-41d4-a716-446655440002', CURRENT_TIMESTAMP, 'CREATED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Charlie', 'charlie@example.com', 2, 'AVAILABLE', 'EMPLOYEE', '$2a$10$EIXaxzZv9kL3uH7p2jX0.O9WqfOz4hGy1m8v3wKQzYJ7iWxK9zKqC'); -- Password: charlie123