DECLARE @DocInfo VARCHAR(120), @MainAmount MONEY, @Status INT, @MaxAmountDay MONEY, @MaxAmountWeek MONEY, @MaxAmountMonth MONEY;
DECLARE @CurrencyTag VARCHAR(10)
--SET @DocInfo = 'Македон Євгеній Віталійович;;;;,;;;;';
--SET @MainAmount = 500000;
--SET @CurrencyTag='USD';
SET @DocInfo='{{payload.docInfo}}'
SET @MainAmount='{{payload.mainAmount}}'
SET @CurrencyTag='{{payload.currencyTag}}'

IF @CurrencyTag <> 'UAH' 
    BEGIN
    DECLARE @today INT
    SET @today = datediff(DD, '', GETDATE());
    SELECT @MainAmount=dbo.fn_GetCrossAmountByActionId(@today, @MainAmount,@CurrencyTag,'',0,0)
/*
Сегодняшний экв. 100 долл
dbo.fn_GetCrossAmountByActionId
( @DayDate TDate , -- дата на которую проводится расчет
  @CrncyAmount TMoney , -- исходная Сумма
  @FromTag TTag , -- исходная Валюта
  @IntoTag TTag  -- нужная валюта
 ,@FromActionId TRowId = 0 -- Тип операции
 ,@IntoActionId TRowId = 0 -- Тип операции
)
*/
END;

SET @Status = 1;
SET @MaxAmountDay = 400000;
SET @MaxAmountWeek = 800000;
SET @MaxAmountMonth = 3200000;
CREATE TABLE #rez
(Id          INT, 
 crncyamount MONEY, 
 mainamount  MONEY
);
CREATE TABLE #rez1
(Id          INT, 
 crncyamount MONEY, 
 mainamount  MONEY
);
CREATE TABLE #rez2
(Id          INT, 
 crncyamount MONEY, 
 mainamount  MONEY
);
CREATE TABLE #rez3
(Type_      VARCHAR(6), 
 MaxAmount_ MONEY, 
 Status_    INT, 
 MainAmount MONEY
);
INSERT INTO #rez
(Id
, mainamount
)
       SELECT b.Id
            , b.mainamount
       FROM bills b WITH(NOLOCK)
            JOIN sv_RepoParams sv ON sv.OwnerId = b.id
                                     AND sv.TaskCode = 'bills'
                                     AND sv.ParamCode = 'DocInfo'
       WHERE b.ActionId = 336
             AND ((0 = 1
                   OR (ProcessFlag&3 = 1)
                   OR (ProcessFlag&3 = 3)))
             AND sv.Param = @DocInfo
             AND b.DayDate = DATEDIFF(day, 0, GETDATE());
INSERT INTO #rez1
(Id
, mainamount
)
       SELECT b.Id
            , b.mainamount
       FROM bills b WITH(NOLOCK)
            JOIN sv_RepoParams sv ON sv.OwnerId = b.id
                                     AND sv.TaskCode = 'bills'
                                     AND sv.ParamCode = 'DocInfo'
       WHERE b.ActionId = 336
             AND ((0 = 1
                   OR (ProcessFlag&3 = 1)
                   OR (ProcessFlag&3 = 3)))
             AND sv.Param = @DocInfo
             AND b.DayDate = DATEDIFF(day, 0, GETDATE()) - 7;
INSERT INTO #rez2
(Id
, mainamount
)
       SELECT b.Id
            , b.mainamount
       FROM bills b WITH(NOLOCK)
            JOIN sv_RepoParams sv ON sv.OwnerId = b.id
                                     AND sv.TaskCode = 'bills'
                                     AND sv.ParamCode = 'DocInfo'
       WHERE b.ActionId = 336
             AND ((0 = 1
                   OR (ProcessFlag&3 = 1)
                   OR (ProcessFlag&3 = 3)))
             AND sv.Param = @DocInfo
             AND b.DayDate = DATEDIFF(day, 0, GETDATE()) - 30;
IF ISNULL(
(
    SELECT COUNT(1)
    FROM #rez
), 0) <> 0
    BEGIN
        IF
        (
            SELECT SUM(mainamount)
            FROM #rez
        ) < @MaxAmountDay
            BEGIN
                IF(
                (
                    SELECT SUM(mainamount)
                    FROM #rez
                ) + @MainAmount) <= @MaxAmountDay
                    BEGIN
                        SET @Status = 1;
                END;
                    ELSE
                    BEGIN
                        SET @MainAmount = @MaxAmountDay -
                        (
                            SELECT SUM(mainamount)
                            FROM #rez
                        ) - @MainAmount;
                        SET @Status = 1;
                END;
        END;
            ELSE
            BEGIN
                SET @MainAmount = 0;
                SET @Status = 0;
        END;
END;
ELSE 
BEGIN
    IF(@MainAmount > @MaxAmountDay)
    BEGIN
        SET @MainAmount = 0;
        SET @Status = 0;
    END;
END;
IF @MainAmount < 0
    BEGIN
        SET @MainAmount = 0;
        SET @Status = 0;
END;
INSERT INTO #rez3
(Type_
, MaxAmount_
, Status_
, MainAmount
)
       SELECT 'Day'
            , @MaxAmountDay
            , @Status
            , @MainAmount;
DROP TABLE #rez;
IF ISNULL(
(
    SELECT COUNT(1)
    FROM #rez1
), 0) <> 0
    BEGIN
        IF
        (
            SELECT SUM(mainamount)
            FROM #rez1
        ) < @MaxAmountWeek
            BEGIN
                IF(
                (
                    SELECT SUM(mainamount)
                    FROM #rez1
                ) + @MainAmount) <= @MaxAmountWeek
                    BEGIN
                        SET @Status = 1;
                END;
                    ELSE
                    BEGIN
                        SET @MainAmount = @MaxAmountWeek -
                        (
                            SELECT SUM(mainamount)
                            FROM #rez1
                        ) - @MainAmount;
                        SET @Status = 1;
                END;
        END;
            ELSE
            BEGIN
                SET @MainAmount = 0;
                SET @Status = 0;
        END;
END;
ELSE 
BEGIN
    IF(@MainAmount > @MaxAmountWeek)
    BEGIN
        SET @MainAmount = 0;
        SET @Status = 0;
    END;
END;
IF @MainAmount < 0
    BEGIN
        SET @MainAmount = 0;
        SET @Status = 0;
END;
INSERT INTO #rez3
(Type_
, MaxAmount_
, Status_
, MainAmount
)
       SELECT 'week'
            , @MaxAmountWeek
            , @Status
            , @MainAmount;
DROP TABLE #rez1;
IF ISNULL(
(
    SELECT COUNT(1)
    FROM #rez2
), 0) <> 0
    BEGIN
        IF
        (
            SELECT SUM(mainamount)
            FROM #rez2
        ) < @MaxAmountMonth
            BEGIN
                IF(
                (
                    SELECT SUM(mainamount)
                    FROM #rez2
                ) + @MainAmount) <= @MaxAmountMonth
                    BEGIN
                        SET @Status = 1;
                END;
                    ELSE
                    BEGIN
                        SET @MainAmount = @MaxAmountMonth -
                        (
                            SELECT SUM(mainamount)
                            FROM #rez2
                        ) - @MainAmount;
                        SET @Status = 1;
                END;
        END;
            ELSE
            BEGIN
                SET @MainAmount = 0;
                SET @Status = 0;
        END;
END;
ELSE 
BEGIN
    IF(@MainAmount > @MaxAmountMonth)
    BEGIN
        SET @MainAmount = 0;
        SET @Status = 0;
    END;
END;
IF @MainAmount < 0
    BEGIN
        SET @MainAmount = 0;
        SET @Status = 0;
END;
INSERT INTO #rez3
(Type_
, MaxAmount_
, Status_
, MainAmount
)
       SELECT 'month'
            , @MaxAmountMonth
            , @Status
            , @MainAmount;
DROP TABLE #rez2;
SELECT Type_ AS type
     , MaxAmount_ AS maxAmount
     , Status_ AS status
     , MainAmount AS mainAmount
FROM #rez3;
DROP TABLE #rez3;