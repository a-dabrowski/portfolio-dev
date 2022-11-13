PATH  := node_modules/.bin:$(PATH)
SHELL := /usr/bin/env bash
NODE_ENV ?= development

start:
	next start

build:
	next build
