#!/bin/bash
declare -A envVars=(
  ["NEXT_PUBLIC_SICS_HOME"]=$NEXT_PUBLIC_SICS_HOME
  ["NEXT_PUBLIC_SICS_MEMBER"]=$NEXT_PUBLIC_SICS_MEMBER
  ["NEXT_PUBLIC_API_URL"]=$NEXT_PUBLIC_API_URL
  ["NEXT_PUBLIC_PRODUCT_NAME"]=$NEXT_PUBLIC_PRODUCT_NAME
  ["NEXT_PUBLIC_QPAY_UUID"]=$NEXT_PUBLIC_QPAY_UUID
)

function replace_env_vars {
  local env_key=$1
  local env_value=$2

  echo "Check that we have $env_key vars"
  test -n "$env_value"

  find /app/.next \( -type d -name .git -prune \) -o -type f -print0 | xargs -0 sed -i "s#APP_$env_key#$env_value#g"
}

echo "Starting Nextjs"

for key in "${!envVars[@]}"; do
  value="${envVars[$key]}"
  replace_env_vars "$key" "$value"
done

exec "$@"
