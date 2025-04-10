DROP DATABASE IF EXISTS HGW_database;
CREATE DATABASE HGW_database;
USE HGW_database;

-- Tabla de roles
CREATE TABLE roles (
    id_rol INT PRIMARY KEY AUTO_INCREMENT,
    nombre_rol VARCHAR(50)
);

-- Tabla de medios de pago
CREATE TABLE medios_pago (
    id_medio INT PRIMARY KEY AUTO_INCREMENT,
    nombre_medio VARCHAR(50)
);

-- Tabla unificada de ubicaciones (países y ciudades)
CREATE TABLE ubicaciones (
    id_ubicacion INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    tipo ENUM('pais', 'ciudad') NOT NULL,
    ubicacion_padre INT,
    FOREIGN KEY (ubicacion_padre) REFERENCES ubicaciones(id_ubicacion) ON DELETE CASCADE
);

-- Tabla de membresías
CREATE TABLE membresias (
    id_membresia INT PRIMARY KEY AUTO_INCREMENT,
    nombre_membresia VARCHAR(50),
    precio_membresia DOUBLE
);

-- Tabla de usuarios
CREATE TABLE usuarios (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    nombre_usuario VARCHAR(50) NOT NULL UNIQUE,
    pss VARCHAR(255) NOT NULL,
    correo_electronico VARCHAR(50) NOT NULL UNIQUE,
    numero_telefono VARCHAR(50),
    url_foto_perfil VARCHAR(255),
    patrocinador VARCHAR(50),
    membresia INT NOT NULL,
    medio_pago INT,
    rol INT NOT NULL,
    FOREIGN KEY (rol) REFERENCES roles(id_rol),
    FOREIGN KEY (membresia) REFERENCES membresias(id_membresia),
    FOREIGN KEY (medio_pago) REFERENCES medios_pago(id_medio)
);

-- Tabla de direcciones
CREATE TABLE direcciones (
    id_direccion INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    direccion TEXT NOT NULL,
    codigo_postal VARCHAR(50),
    id_ubicacion INT NOT NULL,
    lugar_entrega ENUM('Casa', 'Apartamento', 'Hotel', 'Oficina', 'Otro'),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_ubicacion) REFERENCES ubicaciones(id_ubicacion)
);

-- Tabla de categorías y subcategorías
CREATE TABLE categorias (
    id_categoria INT PRIMARY KEY AUTO_INCREMENT,
    nombre_categoria VARCHAR(40)
);

CREATE TABLE subcategoria (
    id_subcategoria INT PRIMARY KEY AUTO_INCREMENT,
    nombre_subcategoria VARCHAR(50),
    categoria INT,
    FOREIGN KEY (categoria) REFERENCES categorias(id_categoria) ON DELETE CASCADE
);

-- Tabla de productos
CREATE TABLE productos (
    id_producto INT PRIMARY KEY AUTO_INCREMENT,
    categoria INT NOT NULL,
    subcategoria INT NOT NULL,
    nombre_producto VARCHAR(50) NOT NULL,
    precio_producto FLOAT NOT NULL,
    imagen_producto TEXT NOT NULL,
    descripcion TEXT NOT NULL,
    stock INT NOT NULL,
    FOREIGN KEY (categoria) REFERENCES categorias(id_categoria),
    FOREIGN KEY (subcategoria) REFERENCES subcategoria(id_subcategoria)
);

-- Carrito de compras y productos en el carrito
CREATE TABLE carrito_compras (
    id_carrito INT PRIMARY KEY AUTO_INCREMENT
);

CREATE TABLE productos_carrito (
    producto INT,
    cantidad_producto INT,
    carrito INT NOT NULL,
    FOREIGN KEY (producto) REFERENCES productos(id_producto) ON DELETE CASCADE,
    FOREIGN KEY (carrito) REFERENCES carrito_compras(id_carrito) ON DELETE CASCADE
);

-- Tabla de bonos
CREATE TABLE bonos (
    id_bono INT PRIMARY KEY AUTO_INCREMENT,
    nombre_bono VARCHAR(50) NOT NULL,
    porcentaje DECIMAL(5,2),
    tipo VARCHAR(50),
    costo_activacion INT
);

-- Historial de bonos por usuario
CREATE TABLE bonos_usuarios (
    id_bono_usuario INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    id_bono INT NOT NULL,
    fecha DATE NOT NULL,
    detalle TEXT,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_bono) REFERENCES bonos(id_bono) ON DELETE CASCADE
);

-- Tabla de educación y contenido educativo
CREATE TABLE educacion (
    id_tema INT PRIMARY KEY AUTO_INCREMENT,
    tema VARCHAR(50) NOT NULL
);

CREATE TABLE contenido_tema (
    id_contenido INT PRIMARY KEY AUTO_INCREMENT,
    url_documentos TEXT,
    url_videos TEXT,
    tema INT NOT NULL,
    FOREIGN KEY (tema) REFERENCES educacion(id_tema) ON DELETE CASCADE
);

-- Inserción inicial de membresías
INSERT INTO membresias (nombre_membresia, precio_membresia) VALUES
('Cliente', 10.0),
('Pre Junior', 20.0),
('Junior', 30.0),
('Senior', 40.0),
('Master', 50.0);

INSERT INTO medios_pago (nombre_medio) VALUES
("tarjeta");

INSERT INTO roles (nombre_rol) VALUES
("Admin"), 
("Moderador"), 
("Usuario");

-- Insertar países
INSERT INTO ubicaciones (nombre, tipo, ubicacion_padre) VALUES ('Colombia', 'pais', NULL);
INSERT INTO ubicaciones (nombre, tipo, ubicacion_padre) VALUES ('México', 'pais', NULL);

-- Obtener los ID de los países insertados
SET @id_colombia = LAST_INSERT_ID() - 1;
SET @id_mexico = LAST_INSERT_ID();

-- Insertar ciudades de Colombia
INSERT INTO ubicaciones (nombre, tipo, ubicacion_padre) VALUES ('Bogotá', 'ciudad', @id_colombia);
INSERT INTO ubicaciones (nombre, tipo, ubicacion_padre) VALUES ('Medellín', 'ciudad', @id_colombia);
INSERT INTO ubicaciones (nombre, tipo, ubicacion_padre) VALUES ('Cali', 'ciudad', @id_colombia);
INSERT INTO ubicaciones (nombre, tipo, ubicacion_padre) VALUES ('Barranquilla', 'ciudad', @id_colombia);
INSERT INTO ubicaciones (nombre, tipo, ubicacion_padre) VALUES ('Cartagena', 'ciudad', @id_colombia);
INSERT INTO ubicaciones (nombre, tipo, ubicacion_padre) VALUES ('Cúcuta', 'ciudad', @id_colombia);
INSERT INTO ubicaciones (nombre, tipo, ubicacion_padre) VALUES ('Bucaramanga', 'ciudad', @id_colombia);
INSERT INTO ubicaciones (nombre, tipo, ubicacion_padre) VALUES ('Pereira', 'ciudad', @id_colombia);
INSERT INTO ubicaciones (nombre, tipo, ubicacion_padre) VALUES ('Santa Marta', 'ciudad', @id_colombia);
INSERT INTO ubicaciones (nombre, tipo, ubicacion_padre) VALUES ('Ibagué', 'ciudad', @id_colombia);

-- Insertar ciudades de México
INSERT INTO ubicaciones (nombre, tipo, ubicacion_padre) VALUES ('Ciudad de México', 'ciudad', @id_mexico);
INSERT INTO ubicaciones (nombre, tipo, ubicacion_padre) VALUES ('Guadalajara', 'ciudad', @id_mexico);
INSERT INTO ubicaciones (nombre, tipo, ubicacion_padre) VALUES ('Monterrey', 'ciudad', @id_mexico);
INSERT INTO ubicaciones (nombre, tipo, ubicacion_padre) VALUES ('Puebla', 'ciudad', @id_mexico);
INSERT INTO ubicaciones (nombre, tipo, ubicacion_padre) VALUES ('Tijuana', 'ciudad', @id_mexico);
INSERT INTO ubicaciones (nombre, tipo, ubicacion_padre) VALUES ('León', 'ciudad', @id_mexico);
INSERT INTO ubicaciones (nombre, tipo, ubicacion_padre) VALUES ('Ciudad Juárez', 'ciudad', @id_mexico);
INSERT INTO ubicaciones (nombre, tipo, ubicacion_padre) VALUES ('Zapopan', 'ciudad', @id_mexico);
INSERT INTO ubicaciones (nombre, tipo, ubicacion_padre) VALUES ('Mérida', 'ciudad', @id_mexico);
INSERT INTO ubicaciones (nombre, tipo, ubicacion_padre) VALUES ('Toluca', 'ciudad', @id_mexico);
SELECT * FROM productos;