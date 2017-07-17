cd /opt/srt_url

sudo pm2 start loader.js

sudo mongod --dbpath /opt/srt_url/mongodb/data/db
