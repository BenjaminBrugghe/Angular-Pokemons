DROP TABLE POKEMONS;

CREATE TABLE POKEMONS(
	ID INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	NAME VARCHAR(50) NOT NULL,
	TYPE1 VARCHAR(50) NOT NULL,
	TYPE2 VARCHAR(50) NOT NULL,
	EVOLUTION VARCHAR(50) NOT NULL,
	PRICE FLOAT NOT NULL,
	DESCRIPTION VARCHAR(300) NOT NULL,
	IMAGE VARCHAR (300) NOT NULL
)

INSERT INTO [dbo].[POKEMONS] ( [NAME], [TYPE1], [TYPE2], [EVOLUTION], [PRICE], [DESCRIPTION], [IMAGE] )
VALUES
(N'Salamèche', N'Feu', N'', N'True', N'12.99', N'Salamèche est un pokémon de départ', N''),
(N'Bulbizarre', N'Plante', N'Poison', N'True', N'12.99', N'Bulbizarre est un pokémon de départ', N''),
(N'Carapuce', N'Eau', N'', N'True', N'12.99', N'Carapuce est un pokémon de départ', N'')
