Project Log

## Saturday [06.04.25]
Goal(s): See where I'm at and get site opened up
**Log:**
- Begin Blueprint for main and auth routes
- Begin learning for EN/DE toggle (involves cookies & STRINGS dicts)
	- Goal for toggle:
		1. Implement cookie in JS for immediate feedback DONE
		2. On next pg load, read cookie in Flask so lang loads pre-applied DONE
		3. Use cookie for handshake between
- Installed Python, nginx, gunicorn
	- Added config, made symlink
- Workflow: pull changes, restart gunicorn

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

## [Sun 25.05.25]
**Goal(s):**
1. Sync testing suite/dependencies between Vesper & resume site
2. Set up CI/Actions and begin enforcing branch pipeline from Vesper for this project too
**Log:**
1. Sync testing suite/dependencies/etc between Vesper & resume site
	- Install pytest/-cov/-mock/-dotenv, add pytest.ini -> add dummy test to confirm we're up
	- Install jest-environment-jsdom to match
	- Add .vscode/launch.json & .vscode/settings.json
	- Added _macros.html for style classes
	- Chose 'Manrope' font for both sites (weight 500)
		- Defined in Tailwind Preflight stuff in input stylesheet
2. Did not set up CI/Actions yet!
- Added first and second drafts of resume site content
- Added anchor links for sections
	- Uses JS in index.js for scrollspy functionality to highlight sections (need to iron this out a bit)
. Pushed to live!
**Next Up:**
1. Set up CI via GitHub Actions


