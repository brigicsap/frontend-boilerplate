install:
	npm install

# Clean public directories and reinstall dependencies
reset:
	make clean
	@rm -rf node_modules
	npm install

# Clean public directories
clean:
	@rm -rf ./public/_css
	@rm -rf ./public/_fonts
	@rm -rf ./public/_img
	@rm -rf ./public/_js
	@rm -rf ./public/_svg

start: build serve

build: clean fonts images svg webpack

build_prod: clean fonts images svg webpack-prod

# Copy fonts to public
fonts:
	@mkdir -p ./public/_fonts
	@cp -a ./assets/fonts/. ./public/_fonts

# Copy images to public
images:
	@mkdir -p ./public/_img
	@cp -a ./assets/img/. ./public/_img

# Copy svgs to public
svg:
	@mkdir -p ./public/_svg
	@cp -a ./assets/svg/. ./public/_svg
	@node ./node_modules/.bin/svgo -f ./public/_svg --enable=removeTitle

# Serve site on http://localhost:8080
serve:
	webpack-dev-server --mode development --watch --open

# Run webpack in development mode
webpack:
	webpack --mode development --progress

# Run webpack in production mode
webpack-prod:
	webpack --mode production
