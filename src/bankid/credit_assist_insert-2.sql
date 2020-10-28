INSERT INTO I_CRM_APPLICATION(
       application_id           
       ,application_id_src      
       ,src_name                
       ,creation_date           
       ,statecode               
       ,surname                 
       ,name                    
       ,patronymic              
       ,phone                   
       ,email                   
       ,doc_type                
       ,doc_series              
       ,doc_number              
       ,issue_date              
       ,income                  
       ,object_cost             
       ,cost_currency           
       ,credit_amount           
       ,term                    
       ,rate                    
       ,schedule                
       ,contribution            
)
VALUES (
        {{requestRef}}            
       ,'credit_assist'      	
       ,'Кредитный помощник'      
       ,'2012-08-09 21:38:06.430' 
       ,'3347780927'              
       ,'Кукуцаполь'              
       ,'Кришна'                  
       ,'Олимпиада'              
       ,'380631003256'            
       ,'sava@mail.dot.com'       
       ,"passport"                
       ,"СА"              	
       ,"215523"              
       ,"2012-08-09"              
       ,"12000"                 
       ,"129000"             
       ,"UAH"           
       ,"100000"           
       ,"48"                
       ,"18"                  
       ,"schedule"                
       ,"contribution"            
)

