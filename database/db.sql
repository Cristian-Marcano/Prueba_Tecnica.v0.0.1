create database if not exists EMQU;
use EMQU;
create table websocialstime(
    correo varchar(80) not null,
    tiempoF int(11) not null,
    tiempoW int(11) not null,
    tiempoTw int(11) not null,
    tiempoIg int(11) not null,
    tiempoTik int(11) not null,
    sex char(1) not null,
    favorite varchar(10) not null,
    edad char(6) not null,
    primary key(correo)
);
describe websocialstime;
