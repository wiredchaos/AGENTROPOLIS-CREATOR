import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import test from 'node:test'
import { evaluateStoryboardPolicy } from './policy-preflight.mjs'

const here = path.dirname(fileURLToPath(import.meta.url))
const casesPath = path.resolve(here, '../tests/policy-cases.json')
const suite = JSON.parse(await readFile(casesPath, 'utf8'))

for (const policyCase of suite.cases) {
  test(policyCase.name, () => {
    const result = evaluateStoryboardPolicy(policyCase.request)

    assert.equal(result.status, policyCase.expect.status)
    assert.equal(result.transportInvoked, false)
    assert.equal(result.receiptRequired, true)
    assert.match(result.reason, new RegExp(escapeRegex(policyCase.expect.reasonIncludes), 'i'))
  })
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
