CREATE TABLE IF NOT EXISTS `user` (
    `id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
    `lastname` varchar(255) NOT NULL,
    `firstname` varchar(255) NOT NULL,
    `age` int NOT NULL,
    `password` varchar(255) NOT NULL
);

INSERT INTO `user` VALUES (1, 'Doe', 'John', 23, '$2b$10$ML6OBEE4PUZstUBB12ZYuenqc7gz4Rcsvq/KIWjQHY.2V69VBVX3W');
INSERT INTO `user` VALUES (2, 'Doe', 'Janette', 32, '$2b$10$06myJrm3/cgB40ErynSi4eI3qTE3/Qeub0taD0F3P3p6yYC9TeyRa');
INSERT INTO `user` VALUES (3, 'Lux', 'Popo', 21, '$2b$10$NF9V2fxGHioCxNNZuGFC7e50WNBQipqrX6agOav3xgy.1hSS/rcjS');

CREATE TABLE IF NOT EXISTS `association` (
    `id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
    `name` varchar(255) NOT NULL
);

INSERT INTO `association` VALUES (1, 'Assoc1');

CREATE TABLE IF NOT EXISTS `role` (
    `idUser` int NOT NULL,
    `idAssociation` int NOT NULL,
    `role` varchar(255) NOT NULL,
    PRIMARY KEY (`idUser`, `idAssociation`),
    FOREIGN KEY (`idUser`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`idAssociation`) REFERENCES `association` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO `role` VALUES (1, 1, 'member');
INSERT INTO `role` VALUES (2, 1, 'president');

CREATE TABLE IF NOT EXISTS `association_users_user` (
    `associationId` int NOT NULL,
    `userId` int NOT NULL,
    PRIMARY KEY (`associationId`, `userId`),
    FOREIGN KEY (`associationId`) REFERENCES `association` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO `association_users_user` VALUES (1, 1);
INSERT INTO `association_users_user` VALUES (1, 2);

CREATE TABLE IF NOT EXISTS `minute_voters_user` (
    `minuteId` int NOT NULL,
    `userId` int NOT NULL,
    PRIMARY KEY (`minuteId`, `userId`),
    FOREIGN KEY (`minuteId`) REFERENCES `minute` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO `minute_voters_user` VALUES (1, 1);
INSERT INTO `minute_voters_user` VALUES (1, 2);
INSERT INTO `minute_voters_user` VALUES (1, 3);
INSERT INTO `minute_voters_user` VALUES (2, 1);
INSERT INTO `minute_voters_user` VALUES (2, 2);
INSERT INTO `minute_voters_user` VALUES (2, 3);

CREATE TABLE IF NOT EXISTS `minute` (
    `id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
    `date` date NOT NULL,
    `content` varchar(255) NOT NULL,
    `associationId` int,
    FOREIGN KEY (`associationId`) REFERENCES `association` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);

INSERT INTO `minute` VALUES (1, '2021-12-12', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et sagittis sem. Praesent sollicitudin lacus.', 1);
INSERT INTO `minute` VALUES (2, '2021-12-12', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et sagittis sem. Praesent sollicitudin lacus.', 1);

-- Note: MariaDB does not use sqlite_sequence, so these lines can be omitted.

CREATE INDEX `IDX_26b9ccf6b8ad1765ea4ea64e18` ON `association_users_user` (`associationId`);
CREATE INDEX `IDX_43f9cad9b4c9408efc74f718ee` ON `association_users_user` (`userId`);
CREATE INDEX `IDX_7b097739450cf3bc005b612b39` ON `minute_voters_user` (`minuteId`);
CREATE INDEX `IDX_303f5172221d89347124d49947` ON `minute_voters_user` (`userId`);