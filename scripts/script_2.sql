USE 'competencias';

CREATE TABLE 'competencias' (
  id INT NOT NULL AUTO_INCREMENT,
  nombre varchar(100) NOT NULL,
  PRIMARY KEY (id)
) 

INSERT INTO 'competencias' VALUES (1, '¿Cuál es la película más aburrida?'), (2,'¿Cuál es la película más bizarra?'),(3,'¿Cuál es la película con mejores actuaciones?'),(4,
'¿Cuál es tu película favorita?'),(5,'¿Cuál es la película que más veces viste'), (6,'¿Cuál es la película con peor final?'), (7,'¿Qué película no recomendarías?'), (8,'¿Qué película tiene la trama más original?');