PATH  := node_modules/.bin:$(PATH)
SHELL := /usr/bin/env bash
NODE_ENV ?= development

dev:
	next dev

lint:
	next lint

start:
	next start

build:
	next build

test:
	npm run test

format:
	prettier --write ./{pages,styles,components}/**
