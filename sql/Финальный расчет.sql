/*
��������� ��������� ����� �������� ������������ ����������� ��� ������ ����������� � ������ ��������� ����������� - ������������� �������
������������ ������ �������� � �������� ���������. ��������� (����� �����������) ������������ � ������� RESULT
*/
ALTER PROCEDURE final_raschet
	@MaxBudget INT
AS

DECLARE @ACTIVITY_ID INT
DECLARE @Number INT			/*���������� �����������*/
DECLARE @i INT		
DECLARE @j INT		
DECLARE @k INT		
DECLARE @Risk FLOAT			/*������� ���� ������� */
DECLARE @CURSOR CURSOR
DECLARE @economy FLOAT		/*������������ ������������� ������������� ��� ���������� ������ �����������*/
DECLARE @besteconomy FLOAT	/*������������� ������������� ��� ��������� ������ �����������*/
DECLARE @cost FLOAT			/*����� ��������� �����������*/
DECLARE @startrisk FLOAT	/*��������� ���� �������*/

set @Number = 0;
set @besteconomy = 0;

/*���������� ���� ������� �� ���������� �����������*/
UPDATE ACTIVITY set IsActive = 0;
execute risk_project @RiskOfProject = @startrisk OUTPUT;

/*��������� ������ �������������*/
SET @CURSOR  = CURSOR SCROLL
FOR
select 
ID
from 
ACTIVITY

OPEN @CURSOR
FETCH NEXT FROM @CURSOR INTO @ACTIVITY_ID
WHILE @@FETCH_STATUS = 0
	BEGIN
		/*�������� ��� ����������� ��� ����������� ��������*/
		UPDATE ACTIVITY set Number = @Number where ID = @ACTIVITY_ID;
		set @Number = @Number + 1;
		FETCH NEXT FROM @CURSOR INTO @ACTIVITY_ID
	END
CLOSE @CURSOR

/*�������� �����������, ���������� �������� ���� ���������� ������������� �������������. */
/*�.�. ����� ���������� ������� ����� ��������� ����� � ���������� �����������*/
set @i=0;
WHILE @i < @Number
	BEGIN
		/*���������� ��������� �����������*/
		set @cost = (SELECT Summa FROM ACTIVITY WHERE Number = @i)
		/*������������� ������ ����������� � ������ ������������� �������*/
		IF @cost <= @MaxBudget
			BEGIN
				/*���������� ��� ����������� � ��� ������� ������������ ����� ���� �������*/ 
				UPDATE ACTIVITY set IsActive = 0;
				UPDATE ACTIVITY set IsActive = 1 where Number = @i;
				execute risk_project @RiskOfProject = @Risk OUTPUT;
				set @economy = @startrisk - @Risk - @cost;
				/*���������� �������� �����������*/
				if @besteconomy < @economy
					BEGIN
						delete result;
						insert into result (CACTIVITY, StartRisk, FinalRisk, Cost, Economy) values ((SELECT ID FROM ACTIVITY WHERE Number = @i), @startrisk, @Risk, (SELECT Summa FROM ACTIVITY WHERE Number = @i), @economy);
						set @besteconomy = @economy;
					END
			END
		set @i=@i+1;
	END

/*����������� ������� ��������� ��� ������ �� ����� ���� �����������*/
set @i=0;
set @j=0;
WHILE @i < @Number
	BEGIN
		set @j = @i + 1
		WHILE @j < @Number
			BEGIN
				set @cost = (SELECT Summa FROM ACTIVITY WHERE Number = @i) + (SELECT Summa FROM ACTIVITY WHERE Number = @j)
				IF @cost <= @MaxBudget
					BEGIN
						UPDATE ACTIVITY set IsActive = 0;
						UPDATE ACTIVITY set IsActive = 1 where Number = @i;
						UPDATE ACTIVITY set IsActive = 1 where Number = @j;
						execute risk_project @RiskOfProject = @Risk OUTPUT;
						set @economy = @startrisk - @Risk - @cost;
						if @besteconomy < @economy
							BEGIN
								delete result;
								insert into result (CACTIVITY, StartRisk, FinalRisk, Cost, Economy) values ((SELECT ID FROM ACTIVITY WHERE Number = @i), @startrisk, @Risk, (SELECT Summa FROM ACTIVITY WHERE Number = @i), @economy);
								insert into result (CACTIVITY, StartRisk, FinalRisk, Cost, Economy) values ((SELECT ID FROM ACTIVITY WHERE Number = @j), @startrisk, @Risk, (SELECT Summa FROM ACTIVITY WHERE Number = @j), @economy);
								set @besteconomy = @economy;
							END
					END
				set @j=@j+1;
			END
		set @i=@i+1;
END

/*����������� ������� ��������� ��� ������ �� ����� ���� �����������*/
set @i=0;
set @j=0;
set @k=0;
WHILE @i < @Number
	BEGIN
		set @j = @i + 1
		WHILE @j < @Number
			BEGIN
				set @k = @j + 1
				WHILE @k < @Number
					BEGIN
						set @cost = (SELECT Summa FROM ACTIVITY WHERE Number = @i) + (SELECT Summa FROM ACTIVITY WHERE Number = @j) + (SELECT Summa FROM ACTIVITY WHERE Number = @k)
						IF @cost <= @MaxBudget
							BEGIN
								UPDATE ACTIVITY set IsActive = 0;
								UPDATE ACTIVITY set IsActive = 1 where Number = @i;
								UPDATE ACTIVITY set IsActive = 1 where Number = @j;
								UPDATE ACTIVITY set IsActive = 1 where Number = @k;
								execute risk_project @RiskOfProject = @Risk OUTPUT;
								set @economy = @startrisk - @Risk - @cost;
								if @besteconomy < @economy
									BEGIN
										delete result;
										insert into result (CACTIVITY, StartRisk, FinalRisk, Cost, Economy) values ((SELECT ID FROM ACTIVITY WHERE Number = @i), @startrisk, @Risk, (SELECT Summa FROM ACTIVITY WHERE Number = @i), @economy);
										insert into result (CACTIVITY, StartRisk, FinalRisk, Cost, Economy) values ((SELECT ID FROM ACTIVITY WHERE Number = @j), @startrisk, @Risk, (SELECT Summa FROM ACTIVITY WHERE Number = @j), @economy);
										insert into result (CACTIVITY, StartRisk, FinalRisk, Cost, Economy) values ((SELECT ID FROM ACTIVITY WHERE Number = @k), @startrisk, @Risk, (SELECT Summa FROM ACTIVITY WHERE Number = @k), @economy);
										set @besteconomy = @economy;
									END
							END
						set @k = @k + 1;
					END
				set @j=@j+1;
			END
		set @i=@i+1;
	END

GO