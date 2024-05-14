create table if not exists photoz (
    id bigint identity primary key,
    file_name varchar(255),
    content_type varchar(255),
    data binary
);

CREATE TABLE IF NOT EXISTS users (
    id BIGINT IDENTITY PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);
DROP TABLE GroupPermissions;
DROP TABLE Documents;


CREATE TABLE IF NOT EXISTS Documents (
    id INT PRIMARY KEY AUTO_INCREMENT,
    owner VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    content VARCHAR(255) ,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS GroupPermissions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    document_id INT NOT NULL,
    username VARCHAR(255) NOT NULL,
    can_view BOOLEAN DEFAULT FALSE,
    can_edit BOOLEAN DEFAULT FALSE,
    can_rename BOOLEAN DEFAULT FALSE,
    can_delete BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (document_id) REFERENCES Documents(id)
);