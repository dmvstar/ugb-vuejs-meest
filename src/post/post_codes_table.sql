CREATE TABLE postcodes (
id                 SERIAL PRIMARY KEY
,country           VARCHAR(2) DEFAULT 'UA'
,postindex_loc     VARCHAR(10)
,postindex_vpz     VARCHAR(10)

,region_ua         VARCHAR(128) 
,distinct_ua       VARCHAR(128)
,locality_ua       VARCHAR(128)

,street_type_ua    VARCHAR(128)
,street_ua         VARCHAR(128)
,house_numbers_ua  VARCHAR(1024)
,post_office_ua    VARCHAR(128)

,region_en         VARCHAR(128)  
,distinct_en       VARCHAR(128)
,locality_en       VARCHAR(128)

,street_type_en    VARCHAR(128)
,street_en         VARCHAR(128)
--,house_numbers_en  VARCHAR(648)
,post_office_en    VARCHAR(128)
);
--DROP TABLE postcodes;
--TRUNCATE TABLE postcodes;

CREATE INDEX postindex_loc_ua_idx ON postcodes ( postindex_loc );
CREATE INDEX postindex_region_ua_idx ON postcodes (region_ua );
CREATE INDEX postindex_distinct_ua_idx ON postcodes (distinct_ua );
CREATE INDEX postindex_locality_ua_idx ON postcodes (locality_ua );
CREATE INDEX postindex_street_type_ua_idx ON postcodes (street_type_ua );
CREATE INDEX postindex_street_ua_idx ON postcodes (street_ua );

CREATE INDEX postindex_loc_ua_idx ON postcodes ( postindex_loc );
CREATE INDEX postindex_region_ua_idx ON postcodes (region_ua COLLATE "uk_UA");
CREATE INDEX postindex_distinct_ua_idx ON postcodes (distinct_ua COLLATE "uk_UA");
CREATE INDEX postindex_locality_ua_idx ON postcodes (locality_ua COLLATE "uk_UA");
CREATE INDEX postindex_street_type_ua_idx ON postcodes (street_type_ua COLLATE "uk_UA");
CREATE INDEX postindex_street_ua_idx ON postcodes (street_ua COLLATE "uk_UA");


SELECT COUNT(*) FROM postcodes;

-- sudo su - postgres
-- psql -d nrlog -f /working/develop/node-js/workings/projects/postcodes/postcodes_DB_10-09-2018-utf-8.sql 
