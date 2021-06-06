-- @WHERE clog-easypay-ok-1200-1.sql
WITH temp_session_variables (start_date) AS (
  SELECT
    TO_TIMESTAMP('2021-06-03 14:00:00', 'YYYY-MM-DD HH24:MI:SS') --SELECT DATE('2021-06-03 15:00:00') as start_date
)
SELECT
  cc.reqId,
  *
FROM
  cllogs cc
WHERE
  1 = 1
  AND source LIKE '(PRO) openbank cli begin%'
  AND cc.payload ->> 'merchant_name' = 'bankid_easypay' --AND reqId IN (158928)
  AND reqId IN (
    SELECT
      DISTINCT reqId --, cl.payload -> 'data' -- -> 'orig' -> 'person' -> 'inn' AS INN,
      --, *
    FROM
      cllogs cl
    WHERE
      1 = 1
      AND cl.source LIKE '(PRO) openbank cli begin%'
      --AND cl.payload ->> 'result' = 'ok'
      --AND cl.payload ->> 'code' = '1200'
      AND reqId IS NOT NULL
      AND reqId > 0 --AND date > '2021-06-03 15:00:00'
      --AND date > tsv.start_date
      AND date > (
        SELECT
          start_date
        FROM
          temp_session_variables
      )
  )
  ORDER BY date
 
  
  --update cllast set date = '2021-06-03 15:00:00'
  --select * from cllast
  