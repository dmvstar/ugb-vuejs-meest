SELECT
  cls.reqid,
  cls.payload -> 'person' -> 'inn' AS inn,
  *
FROM
  cllogs cls
WHERE
  cls.reqid IN (
    SELECT
      DISTINCT reqId
    FROM
      cllogs cl
      JOIN cllast last ON cl.date >= last.date
    WHERE
      1 = 1
      AND cl.source LIKE '%PRO%openbank cli reply%' --AND cl.payload ->> 'result' = 'error'
      AND cl.payload ->> 'code' <> '1200'
      AND reqId IS NOT NULL
      AND reqId > 0
      AND cl.date > last.date
  )
  AND 1 = 1

	AND (    cls.source LIKE '%PRO%openbank cli reply%' 
      OR cls.source LIKE '%PRO%openbank cli xml out%'
      OR cls.source LIKE '%PRO%openbank cli begin%'
    )
    

ORDER BY reqid