sudo apt-get install mongodb

curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs

sudo apt-get update
sudo apt-get install git

cd /opt/

git clone https://github.com/gmreis/srt_url

cd /opt/srt_url

mkdir mongodb
mkdir mongodb/data
mkdir mongodb/data/db

sudo npm install

sudo npm install -g pm2
