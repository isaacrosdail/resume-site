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
- Installed Python, nginx, gunicorn
	- Added config, made symlink
Workflow notes (will be obsolete when I set up actions but):
- Pull changes, restart nginx
	
	Workflow for future updates to site:
	Open Linode web terminal and pull changes in local repo there
	Make sure debug=True is NOT in app.run()
	Restart Gunicorn using sudo systemctl restart gunicorn

## [Sat 24.05.25]

**Goal(s):**
1. Get running locally, copy scripts over from main project (build, dev, deploy scripts)
2. Switch Bootstrap to Tailwind
3. Update domain config

**Log:**
1. Synchronize setup to match Vesper's
	- Copy over navbar from Vesper design
		- Move branding, links, & language toggle into navbar.html to match Vesper
	- Adjust Blueprints (e.g., main -> main_bp)
	- Remove Bootstrap & accompanying styles
	- Installed jest, browser-sync, concurrently, & cross-env
	- Copy over npm scripts
	- Commented out auth for now
2. Set up server side stuff, update SSL cert
3. Add Dockerfile to simplify deployment

**Next Up:**
1. Set up deployment in Github actions
2. Flesh out content to be able to link it in portfolio!
	- Update LinkedIn, link to Vesper
