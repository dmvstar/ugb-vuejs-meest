-- @WHERE clog-easypay-errors-1502-1.sql
-- @WHAT
-- QSDDVAJRRT521GSDGGH89

--BEGIN TRANSACTION;

/*
DROP TABLE IF EXISTS temp_session_variables;

CREATE TEMP TABLE temp_session_variables (phone TEXT, date timestamp, reqId INT);

INSERT INTO
  temp_session_variables (date)
VALUES
  ('2021-06-03');

--SELECT * FROM temp_session_variables;
--SELECT COUNT(*) FROM temp_session_variables;

--COMMIT
*/

WITH temp_session_variables (start_date) AS (
   SELECT TO_TIMESTAMP('2021-06-03 15:30:00', 'YYYY-MM-DD HH24:MI:SS')
   --SELECT DATE('2021-06-03 15:00:00') as start_date
)
SELECT
  --tsv.start_date, 
  x.reqId,
  x.id,
  x.date,
  to_char(x.date, 'dd.mm.YYYY') AS td,
  x.payload -> 'merchant_name' AS merchant_name,
  x.payload -> 'person' -> 'inn' AS INN
  , x.source
  , x.payload 
  , x.message
FROM
  cllogs x, temp_session_variables tsv
WHERE
  1 = 1
  AND x.reqid IN (
    SELECT
      cc.reqId
      /*  
              , cc.id, 
              date,
              to_char(date, 'dd.mm.YYYY') AS td,
              cc.payload -> 'merchant_name' AS merchant_name,
              cc.payload -> 'person' -> 'inn' AS INN
              
              , cc.source
              , cc.payload
            */
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
          AND cl.source LIKE '%PRO%openbank cli reply%'
          AND cl.payload ->> 'result' = 'error'
          AND cl.payload ->> 'code' = '1502'
          AND reqId IS NOT NULL
          AND reqId > 0
          --AND date > '2021-06-03 15:00:00'
          --AND date > tsv.start_date
          --AND date > (SELECT start_date FROM temp_session_variables)
          AND date > (SELECT date FROM cllast)
      )
  ) --AND (x.source LIKE '%openbank cli begin%' OR x.source LIKE '%openbank send callback%'    )
  
  AND (
    x.source LIKE '%openbank cli begin%'
    OR x.source LIKE '%openbank cli reply Ok%'
  ) --AND x.reqID = 158928
  --AND x.message LIKE '%2418204872%'
  AND x.date > '2021-06-02'
ORDER BY
  x.reqID
  , x.date
  --,x.id;  
  
