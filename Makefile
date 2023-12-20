SHELL := /bin/bash

.PHONY: install
install:
	npm install

.PHONY: build
build:
	npm run build

.PHONY: test
test:
	npm run test

.PHONY: dev
dev:
	npm run dev
