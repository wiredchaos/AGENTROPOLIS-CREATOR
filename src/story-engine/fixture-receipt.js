export function buildFixtureReceipt(batch) {
  if (batch.fixture_data !== true) throw new TypeError('Fixture receipt requires fixture data.');
  return batch;
}
