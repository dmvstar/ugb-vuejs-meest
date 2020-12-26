SELECT id, date, level, source, message, exception, url
	FROM public.nrlogs 
	WHERE 1=1
	AND source like '%PRO) Transgen XML%' 
	AND level like 'DEBUG'
	AND message like '%12858889329%' 
	--AND date >= DATE(NOW()) --'2020-03-06'
	ORDER BY ID DESC
	LIMIT 100;