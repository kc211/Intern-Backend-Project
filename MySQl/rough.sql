show databases;

create database movieticketingsystem;
use movieticketingsystem;
create table theatre(
name varchar(20) NOT NULL,
id int PRIMARY KEY,
location char(255) NOT NULL,
district varchar(20) NOT NULL);

create table movie(
name varchar(30) NOT NULL,
id int PRIMARY KEY,
description char(255) NOT NULL,
genre varchar(10) NOT NULL default "UNKNOWN",
rating char(3),
release_date date);

create table date_theatre_mapping(
id int PRIMARY KEY AUTO_INCREMENT,
booking_date date,
theatre_id int ,
foreign key (id) references  theatre(id)
);

INSERT INTO date_theatre_mapping (booking_date, theatre_id) VALUES
('2024-06-01', 1),
('2024-06-02', 2),
('2024-06-03', 3);

drop table date_theatre_mapping;

create table theatre_movie_mapping(
id int PRIMARY KEY AUTO_INCREMENT,
show_time int,
movie_id int,
theatre_id int,
foreign key (theatre_id) references  theatre(id),
foreign key (movie_id) references  movie(id)
);


INSERT INTO theatre (name, id, location, district) VALUES
('Cineplex', 1, '123 Movie St, Springfield', 'Springfield'),
('Movie Palace', 2, '456 Cinema Rd, Shelbyville', 'Shelbyville'),
('Film House', 3, '789 Screen Ave, Ogdenville', 'Ogdenville');

INSERT INTO movie VALUES
('Inception', 1, 'A mind-bending thriller', 'SCI-FI','U','2024-06-01'),
('The Matrix', 2, 'A hacker discovers a shocking truth', 'SCI-FI','U', '2024-06-02'),
('Titanic', 3, 'A romance on the ill-fated ship', 'DRAMA','A', '2024-06-03');

SELECT * FROM theatre;

SELECT * FROM movie;

INSERT INTO date_theatre_mapping (booking_date, movie_id) VALUES
('2024-06-01', 1),
('2024-06-02', 2),
('2024-06-03', 3),
('2024-06-04', 3),
('2024-06-05', 2),
('2024-06-05', 3);

select * from date_theatre_mapping;


INSERT INTO theatre_movie_mapping (show_time, movie_id, theatre_id) VALUES
(1, 1, 1),
(1, 1, 1),
(1, 2, 2),
(1, 2, 2),
(1, 3, 3),
(3, 3, 3);


select * FROM movie where id=1;

select t2.theatre_id,t2.movie_id from date_theatre_mapping t1 join theatre_movie_mapping t2 on t1.theatre_id = t2.theatre_id and movie_id = 1 and booking_date = DATE_ADD(CURDATE(), INTERVAL 2 DAY);


