 Declare @DocInfo VarChar(120),@MainAmount money,@Status int

SET @DocInfo='Македон Євгеній Віталійович;;;;,;;;;'
SET @MainAmount=399701
SET @Status=1

CREATE TABLE #rez(Id int, crncyamount money,mainamount money)

CREATE TABLE #rez1(Id int, crncyamount money,mainamount money)

CREATE TABLE #rez2(Id int, crncyamount money,mainamount money)

CREATE TABLE #rez3(Type_ varchar(6),Status_ int,MainAmount money)

INSERT INTO #rez(Id,mainamount)
SELECT  b.Id
       ,b.mainamount
FROM bills b with 
(nolock
)
JOIN sv_RepoParams sv
ON sv.OwnerId=b.id AND sv.TaskCode='bills' AND sv.ParamCode='DocInfo'
WHERE b.ActionId=336 
AND ( ( 0=1 OR ( ProcessFlag & 3 = 1 ) OR ( ProcessFlag & 3 = 3 ) ) ) 
AND sv.Param=@DocInfo 
AND b.DayDate=datediff(day,0,getdate()) 

INSERT INTO #rez1(Id,mainamount)
SELECT  b.Id
       ,b.mainamount
FROM bills b with 
(nolock
)
JOIN sv_RepoParams sv
ON sv.OwnerId=b.id AND sv.TaskCode='bills' AND sv.ParamCode='DocInfo'
WHERE b.ActionId=336 
AND ( ( 0=1 OR ( ProcessFlag & 3 = 1 ) OR ( ProcessFlag & 3 = 3 ) ) ) 
AND sv.Param=@DocInfo 
AND b.DayDate=datediff(day,0,getdate())-7 

INSERT INTO #rez2(Id,mainamount)
SELECT  b.Id
       ,b.mainamount
FROM bills b with 
(nolock
)
JOIN sv_RepoParams sv
ON sv.OwnerId=b.id AND sv.TaskCode='bills' AND sv.ParamCode='DocInfo'
WHERE b.ActionId=336 
AND ( ( 0=1 OR ( ProcessFlag & 3 = 1 ) OR ( ProcessFlag & 3 = 3 ) ) ) 
AND sv.Param=@DocInfo 
AND b.DayDate=datediff(day,0,getdate())-30 If isnull(( 
SELECT  COUNT(1)
FROM #rez),0)<>0 Begin If (
SELECT  SUM(mainamount)
FROM #rez)<400000 begin If ((
SELECT  SUM(mainamount)
FROM #rez)+@MainAmount)<=400000 Begin

SET @Status=1 End Else Begin
SET @MainAmount=400000-(
SELECT  SUM(mainamount)
FROM #rez)-@MainAmount

SET @Status=1 End end else Begin
SET @MainAmount=0
SET @Status=0 end end If @MainAmount<0 Begin
SET @MainAmount=0
SET @Status=0 end

INSERT INTO #rez3(Type_,Status_,MainAmount)
SELECT  'Day'
       ,@Status
       ,@MainAmount

DROP TABLE #rez If isnull((
SELECT  COUNT(1)
FROM #rez1),0)<>0 Begin If (
SELECT  SUM(mainamount)
FROM #rez1)<800000 begin If ((
SELECT  SUM(mainamount)
FROM #rez1)+@MainAmount)<=800000 Begin

SET @Status=1 End Else Begin
SET @MainAmount=800000-(
SELECT  SUM(mainamount)
FROM #rez1)-@MainAmount

SET @Status=1 End end else Begin
SET @MainAmount=0
SET @Status=0 end end If @MainAmount<0 Begin
SET @MainAmount=0
SET @Status=0 end

INSERT INTO #rez3(Type_,Status_,MainAmount)
SELECT  'week'
       ,@Status
       ,@MainAmount

DROP TABLE #rez1 If isnull((
SELECT  COUNT(1)
FROM #rez2),0)<>0 Begin If (
SELECT  SUM(mainamount)
FROM #rez2)<3200000 begin If ((
SELECT  SUM(mainamount)
FROM #rez2)+@MainAmount)<=3200000 Begin

SET @Status=1 End Else Begin
SET @MainAmount=3200000-(
SELECT  SUM(mainamount)
FROM #rez2)-@MainAmount

SET @Status=1 End end else Begin
SET @MainAmount=0
SET @Status=0 end end If @MainAmount<0 Begin
SET @MainAmount=0
SET @Status=0 end

INSERT INTO #rez3(Type_,Status_,MainAmount)
SELECT  'month'
       ,@Status
       ,@MainAmount

DROP TABLE #rez2
SELECT  Type_
       ,Status_
       ,MainAmount
FROM #rez3

DROP TABLE #rez3