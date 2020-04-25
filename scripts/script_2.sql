USE 'competencias';

CREATE TABLE 'competencias' (
  id INT NOT NULL AUTO_INCREMENT,
  nombre varchar(100) NOT NULL,
  PRIMARY KEY (id)
) 

INSERT INTO 'competencias' VALUES (1, '¿Cuál es la película más aburrida?'), (2,'¿Cuál es la película más bizarra?'),(3,'¿Cuál es la película con mejores actuaciones?'),(4,
'¿Cuál es tu película favorita?'),(5,'¿Cuál es la película que más veces viste'), (6,'¿Cuál es la película con peor final?'), (7,'¿Qué película no recomendarías?'), (8,'¿Qué película tiene la trama más original?');

/* GUIA 2 PASO 3*/
CREATE TABLE 'votos'(
  id INT NOT NULL
  AUTO_INCREMENT,
  PRIMARY KEY
  (id)
)

/* AGREGO EL CAMPO competencia_id en la tabla votos*/
ALTER table 'votos' ADD COLUMN 'competencias_id' INT NOT NULL;

/* CONVIERTO EL CAMPO competencias_id en FOREIGN KEY*/
ALTER table 'votos' ADD FOREIGN KEY (competencias_id) REFERENCES competencias(id);

/* AGREGO EL CAMPO pelicula_id en la tabla votos*/
ALTER table 'votos' ADD COLUMN pelicula_id INT unsigned NOT NULL;

/*CONVIERTO EL CAMPO pelicula_id en FOREIGN KEY*/
ALTER table 'votos' ADD FOREIGN KEY (pelicula_id) REFERENCES pelicula(id);

/* GUIA 3 PASO 3 */
/*AGREGO EL CAMPO genero_id en la tabla competencias*/
ALTER TABLE 'competencias' ADD COLUMN genero_id INT unsigned;

/*CONVIERTO EL CAMPO genero_id en FOREIGN KEY*/
ALTER table 'competencias' ADD FOREIGN KEY (genero_id) REFERENCES genero(id);

/*AGREGO EL CAMPO director_id en la tabla competencias*/
ALTER TABLE 'competencias' ADD COLUMN director_id INT unsigned;

/*CONVIERTO EL CAMPO director_id en FOREIGN KEY*/
ALTER table 'competencias' ADD FOREIGN KEY (director_id) REFERENCES director(id);


/*AGREGO EL CAMPO actor_id en la tabla competencias*/
ALTER TABLE 'competencias' ADD COLUMN actor_id INT unsigned;

/*CONVIERTO EL CAMPO actor_id en FOREIGN KEY*/
ALTER table 'competencias' ADD FOREIGN KEY (actor_id) REFERENCES actor(id);

