/*
ѕроцедура выполн€ет расчет риска проекта с учетом активных меропри€тий (поле IsAttiv в таблице ACTIVITY равно 1)
–езультат записываетс€ в параметр @RiskOfProject
*/
ALTER PROCEDURE risk_project
@RiskOfProject FLOAT OUTPUT
AS

DECLARE @RISK_ID INT
DECLARE @Damage DECIMAL(19,4)
DECLARE @FACTORRISK_ID INT
DECLARE @Set INT
DECLARE @tekPercent FLOAT
DECLARE @CURSOR CURSOR

set @RiskOfProject = 0;
delete TEMPRESULT;

/*«аполн€ем курсор данными дерева отказов*/
SET @CURSOR  = CURSOR SCROLL
FOR
select 
RISK.ID as RISK_ID,
RISK.Damage,
FACTORRISK.ID as FACTORRISK_ID,
FACTORRISK.[Set],
case when ACTIVITY.isActive IS NULL or ACTIVITY.isActive = 0 then FACTORRISK.[Percent] else REDUCTION.NewPercent end as tekPercent
from 
RISK
inner join FACTORRISK ON FACTORRISK.CRISK = RISK.ID
left join REDUCTION on REDUCTION.CFACTORRISK = FACTORRISK.ID
left join ACTIVITY on ACTIVITY.ID = REDUCTION.CACTIVITY

OPEN @CURSOR
FETCH NEXT FROM @CURSOR INTO @RISK_ID, @Damage, @FACTORRISK_ID, @Set, @tekPercent
WHILE @@FETCH_STATUS = 0
	BEGIN
		/* группируем факторы риска по зависимым. “.е. если какие-то факторы риска могут привести к событию только при одновременном возникновении 
		   то итоговую веро€тность считаем как перемножение веро€тности каждого фактора*/
        IF NOT EXISTS (SELECT * FROM TEMPRESULT WHERE CRISK=@RISK_ID and [Set] = @Set)
            INSERT INTO TEMPRESULT (CRISK, Damage, [SET], [Percent]) VALUES (@RISK_ID, @Damage, @Set, @tekPercent / 100);
		else
			UPDATE TEMPRESULT set [Percent] = ([Percent] * @tekPercent / 100) where CRISK=@RISK_ID and [Set] = @Set;
		FETCH NEXT FROM @CURSOR INTO @RISK_ID, @Damage, @FACTORRISK_ID, @Set, @tekPercent
	END
CLOSE @CURSOR

/*ƒалее выполн€ем подсчет потенциального ущерба как произведение ущерба риска на итоговую веро€тность факторов данного риска
  —читаем общий риск проекта - суммируем потенциалоьный ущерб по всем рискам*/
SET @CURSOR = CURSOR SCROLL
FOR
select Damage, [Percent] from TEMPRESULT
OPEN @CURSOR
FETCH NEXT FROM @CURSOR INTO @Damage, @tekPercent
WHILE @@FETCH_STATUS = 0
	BEGIN
        set @RiskOfProject = @RiskOfProject + @Damage * @tekPercent
		FETCH NEXT FROM @CURSOR INTO @Damage, @tekPercent
	END
CLOSE @CURSOR
/*возвращаем значение переменной @RiskOfProject - общий потенциальный ущерб*/
RETURN
GO