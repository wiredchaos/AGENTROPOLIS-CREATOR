#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORK="${ROOT}/work"
ARTIFACT_B64="${ROOT}/artifacts/agentropolis-creator-loop-v0.1.0.zip.b64"
ARTIFACT_ZIP="${WORK}/agentropolis-creator-loop-v0.1.0.zip"
EXPECTED_SHA="c8dc0756cb5f7dfb94587481e8fb61c1b1abdba75de739f9f7b9a5985b232ade"
RECEIPT_DIR="${ROOT}/receipts"
RECEIPT="${RECEIPT_DIR}/hermes-completion-receipt.json"
STARTED_AT="$(date -u +'%Y-%m-%dT%H:%M:%SZ')"

mkdir -p "${WORK}" "${RECEIPT_DIR}"
base64 --decode "${ARTIFACT_B64}" > "${ARTIFACT_ZIP}"
ACTUAL_SHA="$(sha256sum "${ARTIFACT_ZIP}" | awk '{print $1}')"

if [[ "${ACTUAL_SHA}" != "${EXPECTED_SHA}" ]]; then
  printf '{"status":"FAILED","reason":"checksum_mismatch","expected":"%s","actual":"%s"}\n' "${EXPECTED_SHA}" "${ACTUAL_SHA}" > "${RECEIPT}"
  exit 10
fi

rm -rf "${WORK}/repo"
mkdir -p "${WORK}/repo"
unzip -q "${ARTIFACT_ZIP}" -d "${WORK}/repo"
cd "${WORK}/repo"

if [[ -f package-lock.json ]]; then
  npm ci --ignore-scripts
elif [[ -f package.json ]]; then
  npm install --ignore-scripts
fi

npm run build
npm test
npm run demo

RESULT_PATH="var/demo-output/result.json"
if [[ ! -f "${RESULT_PATH}" ]]; then
  printf '{"status":"FAILED","reason":"missing_demo_receipt"}\n' > "${RECEIPT}"
  exit 20
fi

FINAL_STATE="$(node -e "const r=require('./${RESULT_PATH}'); console.log(r.finalState || r.final_state || '')")"
if [[ "${FINAL_STATE}" != "COMPLETED" ]]; then
  printf '{"status":"FAILED","reason":"campaign_not_completed","final_state":"%s"}\n' "${FINAL_STATE}" > "${RECEIPT}"
  exit 30
fi

FINISHED_AT="$(date -u +'%Y-%m-%dT%H:%M:%SZ')"
cat > "${RECEIPT}" <<JSON
{
  "mandate_id": "mandate:creator-loop:2026-08-05:v0.1",
  "task_id": "task:hermes:creator-loop:execute:v0.1",
  "actor": "agent:hermes:creator-steward",
  "runtime": "hermes",
  "runtime_baseline": "v2026.7.30-canary",
  "artifact_sha256": "${ACTUAL_SHA}",
  "skills_used": ["creator-loop-v0.1"],
  "tools_used": ["bash", "node", "npm", "unzip", "sha256sum"],
  "policy_decision": "bounded_offline_execution_approved",
  "authorization_receipt": "mission-envelope:hermes-mission.json",
  "completion_criteria": [
    "artifact checksum matches",
    "strict TypeScript compilation passes",
    "runtime policy tests pass",
    "offline campaign reaches COMPLETED"
  ],
  "evidence": ["${RESULT_PATH}"],
  "validation_status": "PASS",
  "status": "COMPLETED",
  "exceptions": [],
  "started_at": "${STARTED_AT}",
  "finished_at": "${FINISHED_AT}"
}
JSON

cat "${RECEIPT}"
