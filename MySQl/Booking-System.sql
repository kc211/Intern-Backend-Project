create database Booking_System;
use Booking_System; 
create table registered_users(id integer primary key auto_increment,name varchar(25) not null,
email varchar(30) not null unique,password varchar(225) not null unique,phone_number INT unique not null);
show tables;
desc registered_users;
alter table registered_users modify phone_number varchar(20);
alter table registered_users modify password varchar(300);
insert into registered_users value(1,"Charan Teja", "devadeepkolla211@gmail.com","Kranti211@","7416922489" );
select * from registered_users;
truncate table registered_users;


create table Movies(
id int PRIMARY KEY auto_increment,
name varchar(100) NOT NULL,
description text NOT NULL,
genre varchar(30) NOT NULL default "UNKNOWN",
rating char(10),
release_date date);

drop table Theatres;
drop table Movies;
create table Theatres(
id int PRIMARY KEY auto_increment,
name varchar(50) NOT NULL,
location char(255) NOT NULL,
district varchar(30) NOT NULL);

alter table Theatres modify name  varchar(65) not null unique;
INSERT INTO Movies VALUES
(1,'The Garifield Movie', "The new 'Garfield movie', set for release in 2024, is an animated film featuring Chris Pratt as the voice of Garfield and Samuel L. Jackson
 voicing a new character, Vic, who is Garfield's father. The movie is expected to follow the classic themes of Garfield's adventures and humorous antics,
 while also introducing new elements and characters to expand on the beloved comic strip's universe. 
The film aims to appeal to both long-time fans of the comic strip and new audiences.", 'comedy','U/A','2024-06-01'),


(2,'Kingdom of the Planet of the Apes',"'Kingdom of the Planet of the Apes' is a science fiction action film recently released in May 2024 
. It serves as a standalone sequel to 'War for the Planet of the Apes' (2017), making it the tenth film and fourth installment in the overall 'Planet of the Apes' 
reboot franchise.
The cast features Owen Teague in the lead role as Noa, alongside Freya Allan and established actors like Kevin Durand, Peter Macon, and William H. Macy.",
 'Action','R', '2024-06-02'),
 
 
(3,'Srikanth', "'Srikanth' is a biographical film based on the life of Srikanth Bolla, a visually-impaired industrialist and founder of Bollant Industries. 
Released on May 10, 2024, it stars Rajkummar Rao in the titular role. 
The movie chronicles Srikanth's journey, showcasing his struggles and triumphs despite his disability. 
Jyothika portrays his guardian, while Alaya F and Sharad Kelkar play supporting roles.", 'Autobiogrpahy','U', '2024-06-03'),


(4,'Furiosa: A Mad Max saga',"Furiosa: A Mad Max Saga, a prequel to the action-packed Mad Max: Fury Road (2015), 
recently hit theaters in May 2024.  This film dives into the backstory of the iconic character Imperator Furiosa,
 played by Anya Taylor-Joy taking over from Charlize Theron.  
 The high-octane adventure follows a younger Furiosa as she's snatched from her home and falls into the hands of a ruthless warlord.  
 Her fight for survival and eventual quest to return home fuels the thrilling narrative.
  Alongside Anya Taylor-Joy, Chris Hemsworth portrays a mysterious new character whose role in Furiosa's journey is yet to be fully revealed.",
  'Action','A', '2024-06-02');
  
  
  
select * from Movies;

insert into Theatres values(1,"AAA Cinemas","Ameerpet","Hyd"),
(2,"AMB Cinemas","Gachibowli","Hyd"),
(3,"Asian Cinemart","RC Puram","Hyd"),
(4,"Asian Cineplanet Multiplex","Kompally","Hyd"),
(5,"Asian CineSquare Multiplex","Uppal","Hyd"),
(6,"Asian M Cube Mall","Attapur","Hyd"),
(7,"Asian Mukta Cinemas A2","MJR Square, Narapally","Hyd"),
(8,"Asian Sha & Shahensha","Chintal","Hyd"),
(9,"Cinepolis: Lulu Mall","Balnagar","Hyd"),
(10,"INOX: GSM Mall","Madeenaguda","Hyd")
;

select * from Theatres;
select * from Movies;

alter table Movies add column (src varchar(70));
alter table Movies modify src varchar(255);
desc Movies;

update Movies set src ="image1.png" where name="The Garifield Movie";
update Movies set src= ("image2.png") where name="Kingdom of the Planet of the Apes";
update Movies set src=("image3.png") where name ="Srikanth";
update Movies set src= ("image4.png") where name = "Furiosa: A Mad Max saga";


create table Timings (id int primary key , show_timing varchar(20));

insert into  Timings values (1,"11:00 AM"),(2,"2:30 PM"),(3,"6:30 PM"),(4,"10:00 PM"); 

update Movies set name= ("The Garfield Movie") where id =1;


create table movie_theatre (
id integer primary key auto_increment,
movie_id int,
theatre_id int,
foreign key (theatre_id) references Theatres(id),
foreign key(movie_id) references Movies(id)
 );
 
 
 insert into movie_theatre (movie_id,theatre_id)values
 (1,1),
 (1,2),
 (1,4),
 (1,9),
 (1,10),
 (2,2),
 (2,4),
 (2,5),
 (2,6),
 (2,10),
 (3,1),
 (3,3),
 (3,5),
 (3,7),
 (3,8),
 (4,2),
 (4,1),
 (4,3),
 (4,4),
 (4,5)
;
 
 select t1.movie_id, t1.theatre_id,t2.* from Theatres t2 inner join movie_theatre t1 on t2.id=  t1.theatre_id where t1.movie_id =1;
 
 drop table movie_theatre;
 
 
 create table refreshToken (id int primary key auto_increment, r_token varchar(255), date_ date);
 truncate table refreshToken;
 select* from refreshToken;
 
 
 create table Billing_tickets(id int auto_increment primary key,u_email varchar(100) not null, 
 movie_id int not null,selectedSeats varchar(20) not null, 
 theatre_name varchar(255) not null
 , show_timing varchar(20) not null,date_ date not null,
 foreign key (u_email) references registered_users(email),
 foreign key (theatre_name) references Theatres(name),
foreign key(movie_id) references Movies(id),
foreign key (show_timing) references Timing(show_timing)
 );
 
 drop table tickets;
 
 
