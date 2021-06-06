--@WHERE clog-easypay-totals.sql
--SELECT * FROM cllogs cl ORDER BY id DESC LIMIT 10;
SELECT
  'PRO' AS dest,
  'DEBUG' AS level,
  'easypay' AS merchant,
  CAST(date :: date AS VARCHAR(10)) AS dt,
  to_char(date, 'dd.mm.YYYY') AS td,
  COUNT(*) AS count
FROM
  cllogs cl
WHERE 1 = 1
  AND cl.source LIKE '(PRO) openbank cli begin%'
  AND cl.payload ->> 'merchant_name' = 'bankid_easypay'
GROUP BY dt, td
ORDER BY dt, td DESC;


/*
SELECT * FROM 
  cllogs cl
WHERE 1 = 1
  AND cl.source LIKE '(PRO) openbank cli reply%'
  AND cl.payload ->> 'code' = '1200'
  AND date > '2021-06-03 00:00:00'
*/


 