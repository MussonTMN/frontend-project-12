install:
	npm ci

build:
	npm run build

start:
	npm start

lint:
	make -C frontend lint

deploy:
	npm start & make -C frontend start