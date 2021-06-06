-- @WHERE clog-easypay-errors-1502-2.sql
-- @WHAT for send notifications
--SELECT * FROM cllast;

WITH temp_session_variables (start_date) AS (
  SELECT
    date FROM cllast l
)
SELECT
  DISTINCT l.date, reqId
FROM
  cllogs cl
  JOIN  cllast l ON  cl.date >= l.date
WHERE
  1 = 1
  AND cl.source LIKE '%PRO%openbank cli reply%'
  AND cl.payload ->> 'result' = 'error'
  AND cl.payload ->> 'code' = '1502'
  AND reqId IS NOT NULL
  AND reqId > 0
  AND cl.date > (SELECT l.date FROM cllast l)
  ;  
  
  
--UPDATE cllast SET date = '2021-06-03 15:00:00';
--UPDATE cllast SET date = '2021-06-04 15:00:00';
--UPDATE cllast SET date = NOW();
--SELECT l.date FROM cllast l

