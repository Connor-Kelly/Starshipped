#!/bin/bash

dotnet ef migrations script -o ../database/migration.sql  --idempotent