-- @WHERE clog-easypay-errors-1502-4.sql
-- @WHAT for send notifications
-- STEP 1
SELECT 
cls.reqid
, cls.payload -> 'person' -> 'inn' AS inn
, * 
FROM cllogs cls 
WHERE cls.reqid IN 
(  
  SELECT
    DISTINCT reqId
  FROM
    cllogs cl
    JOIN  cllast last ON  cl.date >= last.date
  WHERE
    1 = 1
    AND cl.source LIKE '%PRO%openbank cli reply%'
    AND cl.payload ->> 'result' = 'error'
    AND cl.payload ->> 'code' = '1502'
    AND reqId IS NOT NULL
    AND reqId > 0
    AND cl.date > last.date  
) 
AND 1 = 1

AND (    cls.source LIKE '%PRO%openbank cli reply%' 
      --OR cls.source LIKE '%PRO%openbank cli xml out%'
      --OR cls.source LIKE '%PRO%openbank cli begin%'
    )
    
AND cls.payload ->> 'statusCode' = '500'
ORDER BY reqid

-- STEP 2
--UPDATE cllast SET date = NOW();

  
--UPDATE cllast SET date = '2021-06-07 22:00:00';
--UPDATE cllast SET date = '2021-06-07 00:00:00';
--SELECT l.date FROM cllast l
