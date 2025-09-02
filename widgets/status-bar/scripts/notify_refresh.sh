#!/bin/bash

# Notify Übersicht to refresh workspace data
curl -X POST http://localhost:8234/refresh > /dev/null 2>&1
