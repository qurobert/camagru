CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    verify_email BOOLEAN DEFAULT FALSE
);

CREATE TABLE Images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    image_path VARCHAR(255) NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE Comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image_id INT NOT NULL,
    user_id INT NOT NULL,
    comment_text TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (image_id) REFERENCES Images(id),
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE Likes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (image_id) REFERENCES Images(id),
    FOREIGN KEY (user_id) REFERENCES Users(id)
);