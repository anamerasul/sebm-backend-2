#!/bin/bash

# Remove existing cron job
(crontab -l | grep -v "node /www/wwwroot/sebm-backend/get_500.js") | crontab -

# Add new cron job
(crontab -l ; echo "*/30 * * * * /usr/bin/node /www/wwwroot/sebm-backend/get_500.js") | crontab -

echo "Cron job renewed successfully"

