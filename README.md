lean-mean-nutrition-sample
==========================

Just a simple 80's themed food journal

Setup
=====

1) Download [data set](https://s3.amazonaws.com/valeri.karpov.mongodb/usda.nutrition.tgz)

2) Untar data set and run mongorestore

3) Copy nutrition data to `leanmean` database: `db.copyDatabase('usda', 'leanmean', 'localhost')`

4) Create a text index on `description`: `use leanmean; db.nutrition.ensureIndex({ "description" : "text" });`
