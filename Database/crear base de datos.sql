DROP DATABASE IF EXISTS HGW_database;
CREATE DATABASE HGW_database;
USE HGW_database;

-- Tabla de roles
CREATE TABLE roles (
    id_rol INT PRIMARY KEY AUTO_INCREMENT,
    nombre_rol VARCHAR(50) NOT NULL
);

-- Tabla de países
CREATE TABLE paises (
    id_pais INT PRIMARY KEY AUTO_INCREMENT,
    nombre_pais VARCHAR(50) NOT NULL
);

-- Tabla de ciudades
CREATE TABLE ciudades (
    id_ciudad INT PRIMARY KEY AUTO_INCREMENT,
    nombre_ciudad VARCHAR(50) NOT NULL,
    pais INT NOT NULL,
    FOREIGN KEY (pais) REFERENCES paises(id_pais) ON DELETE CASCADE
);

-- Tabla de categorías
CREATE TABLE categorias (
    id_categoria INT PRIMARY KEY AUTO_INCREMENT,
    nombre_categoria VARCHAR(40) NOT NULL
);

-- Tabla de subcategorías
CREATE TABLE subcategorias (
    id_subcategoria INT PRIMARY KEY AUTO_INCREMENT,
    nombre_subcategoria VARCHAR(50) NOT NULL,
    categoria INT NOT NULL,
    FOREIGN KEY (categoria) REFERENCES categorias(id_categoria) ON DELETE CASCADE
);

-- Tabla de membresías
CREATE TABLE membresias (
    id_membresia INT PRIMARY KEY AUTO_INCREMENT,
    nombre_membresia VARCHAR(50) NOT NULL,
    precio_membresia DECIMAL(10,2) NOT NULL
);

-- Tabla de medios de pago
CREATE TABLE medios_pago (
    id_medio INT PRIMARY KEY AUTO_INCREMENT,
    nombre_medio VARCHAR(50) NOT NULL
);

-- Tabla de usuarios
CREATE TABLE usuarios (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT, 
    nombre VARCHAR(50) NOT NULL, 
    apellido VARCHAR(50) NOT NULL, 
    patrocinador VARCHAR(50), 
    nombre_usuario VARCHAR(50) NOT NULL UNIQUE, 
    contrasena VARCHAR(255) NOT NULL, 
    numero_telefono VARCHAR(50) NOT NULL,
    correo_electronico VARCHAR(50) NOT NULL UNIQUE,
    pais INT NOT NULL,
    url_foto_perfil VARCHAR(255) NOT NULL,
    membresia INT NOT NULL,
    medio_pago INT,
    rol INT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (rol) REFERENCES roles(id_rol),
    FOREIGN KEY (pais) REFERENCES paises(id_pais),
    FOREIGN KEY (membresia) REFERENCES membresias(id_membresia),
    FOREIGN KEY (medio_pago) REFERENCES medios_pago(id_medio)
);

-- Tabla de direcciones
CREATE TABLE direcciones (
    id_direccion INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    direccion_envio VARCHAR(60) NOT NULL,
    ciudad INT NOT NULL,
    provincia VARCHAR(60),
    codigo_postal VARCHAR(50),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (ciudad) REFERENCES ciudades(id_ciudad)
);

-- Tabla de bonos
CREATE TABLE bonos (
    id_bono INT PRIMARY KEY AUTO_INCREMENT,
    nombre_bono VARCHAR(50) NOT NULL,
    porcentaje DECIMAL(5,2),
    tipo_bono VARCHAR(50),
    costo_activacion INT
);

-- Historial de bonos recibidos por los usuarios
CREATE TABLE bonos_usuarios (
    id_bono_usuario INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    id_bono INT NOT NULL,
    fecha DATE NOT NULL,
    detalle TEXT,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_bono) REFERENCES bonos(id_bono) ON DELETE CASCADE
);

-- Inserción de membresías
INSERT INTO membresias (nombre_membresia, precio_membresia) VALUES
    ("Cliente", 10.00), 
    ("Pre Junior", 20.00), 
    ("Junior", 30.00), 
    ("Senior", 40.00), 
    ("Master", 50.00);

-- Tabla de productos
CREATE TABLE productos (
    id_producto INT PRIMARY KEY AUTO_INCREMENT, 
    categoria INT NOT NULL, 
    subcategoria INT NOT NULL,
    nombre_producto VARCHAR(50) NOT NULL,
    precio_producto DECIMAL(10,2) NOT NULL,
    imagen_producto VARCHAR(255) NOT NULL,
    stock INT NOT NULL,
    FOREIGN KEY (categoria) REFERENCES categorias(id_categoria),
    FOREIGN KEY (subcategoria) REFERENCES subcategorias(id_subcategoria)
);

-- Tabla de carrito de compras
CREATE TABLE carrito_compras (
    id_carrito INT PRIMARY KEY AUTO_INCREMENT
);

-- Productos en carrito
CREATE TABLE productos_carrito (
    producto INT NOT NULL, 
    cantidad_producto INT NOT NULL, 
    carrito INT NOT NULL, 
    FOREIGN KEY (producto) REFERENCES productos(id_producto) ON DELETE CASCADE, 
    FOREIGN KEY (carrito) REFERENCES carrito_compras(id_carrito) ON DELETE CASCADE
);

-- Tabla de temas de educación
CREATE TABLE educacion (
    id_tema INT PRIMARY KEY AUTO_INCREMENT, 
    nombre_tema VARCHAR(50) NOT NULL
);

-- Contenido relacionado con cada tema
CREATE TABLE contenido_tema (
    id_contenido INT PRIMARY KEY AUTO_INCREMENT, 
    url_documentos TEXT, 
    url_videos TEXT, 
    tema INT NOT NULL, 
    FOREIGN KEY (tema) REFERENCES educacion(id_tema) ON DELETE CASCADE
);
