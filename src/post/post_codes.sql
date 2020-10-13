CREATE TABLE post_codes (
id                 SERIAL PRIMARY KEY
,country           VARCHAR(2) DEFAULT 'UA'
,postindex_loc     VARCHAR(10)
,postindex_vpz     VARCHAR(10)

,region_ua         VARCHAR(128) 
,distinct_ua       VARCHAR(128)
,locality_ua       VARCHAR(128)

,street_type_ua    VARCHAR(128)
,street_ua         VARCHAR(128)
,house_numbers_ua  VARCHAR(128)
,post_office_ua    VARCHAR(128)

,region_en         VARCHAR(128)  
,distinct_en       VARCHAR(128)
,locality_en       VARCHAR(128)

,street_type_en    VARCHAR(128)
,street_en         VARCHAR(128)
,house_numbers_en  VARCHAR(128)
,post_office_en    VARCHAR(128)
);
--DROP TABLE post_codes;

CREATE INDEX postindex_loc_ua_idx ON post_codes ( postindex_loc );
