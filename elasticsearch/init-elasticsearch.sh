#!/bin/sh

echo "Waiting for Elasticsearch to start..."
until curl -s http://elasticsearch:9200 >/dev/null; do
  sleep 5
done

echo "Elasticsearch is up!"

# Define indices and their corresponding JSON files
declare -A indices=(
  ["products"]="/config/create-product-index.json"
)

# Loop through each index and create it if it doesn't exist
for index in "${!indices[@]}"; do
  json_file="${indices[$index]}"
  
  if curl -s -o /dev/null -w "%{http_code}" http://elasticsearch:9200/$index | grep -q "200"; then
    echo "Index '$index' already exists, skipping creation."
  else
    echo "Creating '$index' index..."
    if curl -X PUT "http://elasticsearch:9200/$index" -H "Content-Type: application/json" -d @"$json_file"; then
      echo "Index '$index' created successfully!"
    else
      echo "Error creating index '$index'. Retrying in 10 seconds..."
      sleep 10
      curl -X PUT "http://elasticsearch:9200/$index" -H "Content-Type: application/json" -d @"$json_file"
    fi
  fi
done
