Project Log

## Saturday [06.04.25]
Goal(s): See where I'm at and get site opened up

Log:
- Begin Blueprint for main and auth routes
- Begin learning for EN/DE toggle (involves cookies & STRINGS dicts)
Goal for toggle:
	1. implement cookie in JS for immediate feedback DONE
	2. on next pg load, read cookie in Flask so lang loads pre-applied DONE
	3. Use a cookie for handshake between
- Restart Linode for flask resume site
	Cleared, installed Python, installed dependencies, installed gunicorn (WSGI server), installed nginx (reverse proxy server), 
	Command with gunicorn to get the site up and running (need to run in flask app directory):
	gunicorn run:app --bind 0.0.0.0:8000
	
	Xginx config saved under /etc/nginx/sites-available/myflaskapp
	
	Then did:
	sudo ln -s /etc/nginx/sites-available/myflaskapp /etc/nginx/sites-enabled/

	Site should be reachable from anywhere if you type:
	139.162.180.181
	
	Workflow for future updates to site:
	Open Linode web terminal and pull changes in local repo there
	Make sure debug=True is NOT in app.run()
	Restart Gunicorn using sudo systemctl restart gunicorn
