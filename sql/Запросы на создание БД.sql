create table RESULT
(
	ID INT PRIMARY KEY IDENTITY,
	CACTIVITY INT,
	StartRisk float,
	FinalRisk float,
	Cost float,
	Economy float
	FOREIGN KEY(CACTIVITY) REFERENCES  ACTIVITY (ID)
)

CREATE TABLE TEMPRESULT
(
	ID INT PRIMARY KEY IDENTITY,
	CRISK INT,
	Damage decimal(19, 4),
	CFACTOR INT,
	[SET] INT,
	[Percent] float
)