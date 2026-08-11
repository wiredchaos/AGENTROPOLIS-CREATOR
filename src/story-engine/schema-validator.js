function typeMatches(value, type) {
  if (type === 'null') return value === null;
  if (type === 'array') return Array.isArray(value);
  if (type === 'object') return value !== null && typeof value === 'object' && !Array.isArray(value);
  if (type === 'number') return typeof value === 'number' && Number.isFinite(value);
  if (type === 'integer') return Number.isInteger(value);
  return typeof value === type;
}

function resolvePointer(root, reference) {
  if (!reference.startsWith('#/')) throw new Error(`Unsupported schema reference: ${reference}`);
  return reference
    .slice(2)
    .split('/')
    .map((part) => part.replaceAll('~1', '/').replaceAll('~0', '~'))
    .reduce((value, part) => value?.[part], root);
}

function sameJson(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
}

/** Validate the JSON Schema subset used by the checked-in matcher contracts. */
export function validateAgainstSchema(value, schema) {
  const errors = [];

  function visit(current, rule, path) {
    if (rule.$ref) {
      visit(current, resolvePointer(schema, rule.$ref), path);
      return;
    }

    if (rule.anyOf) {
      const valid = rule.anyOf.some((candidate) => {
        const checkpoint = errors.length;
        visit(current, candidate, path);
        const passed = errors.length === checkpoint;
        errors.length = checkpoint;
        return passed;
      });
      if (!valid) errors.push(`${path} does not match any allowed schema.`);
      return;
    }

    if (rule.type) {
      const allowed = Array.isArray(rule.type) ? rule.type : [rule.type];
      if (!allowed.some((type) => typeMatches(current, type))) {
        errors.push(`${path} must be ${allowed.join(' or ')}.`);
        return;
      }
    }

    if (rule.const !== undefined && !sameJson(current, rule.const)) {
      errors.push(`${path} must equal ${JSON.stringify(rule.const)}.`);
    }
    if (rule.enum && !rule.enum.some((candidate) => sameJson(current, candidate))) {
      errors.push(`${path} contains an unsupported value.`);
    }

    if (typeof current === 'string') {
      if (rule.minLength !== undefined && current.length < rule.minLength) {
        errors.push(`${path} is shorter than ${rule.minLength}.`);
      }
      if (rule.pattern && !new RegExp(rule.pattern, 'u').test(current)) {
        errors.push(`${path} does not match ${rule.pattern}.`);
      }
      if (
        rule.format === 'uuid' &&
        !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu.test(current)
      ) {
        errors.push(`${path} must be a UUID.`);
      }
    }

    if (typeof current === 'number') {
      if (rule.minimum !== undefined && current < rule.minimum) errors.push(`${path} is below minimum.`);
      if (rule.maximum !== undefined && current > rule.maximum) errors.push(`${path} is above maximum.`);
      if (rule.exclusiveMinimum !== undefined && current <= rule.exclusiveMinimum) {
        errors.push(`${path} must exceed ${rule.exclusiveMinimum}.`);
      }
    }

    if (Array.isArray(current)) {
      if (rule.minItems !== undefined && current.length < rule.minItems) {
        errors.push(`${path} needs at least ${rule.minItems} item(s).`);
      }
      if (rule.uniqueItems) {
        const serialized = current.map(JSON.stringify);
        if (new Set(serialized).size !== serialized.length) errors.push(`${path} contains duplicates.`);
      }
      if (rule.items) current.forEach((item, index) => visit(item, rule.items, `${path}[${index}]`));
    }

    if (current !== null && typeof current === 'object' && !Array.isArray(current)) {
      for (const required of rule.required ?? []) {
        if (!Object.prototype.hasOwnProperty.call(current, required)) {
          errors.push(`${path}.${required} is required.`);
        }
      }
      for (const [key, item] of Object.entries(current)) {
        if (rule.properties?.[key]) {
          visit(item, rule.properties[key], `${path}.${key}`);
        } else if (rule.additionalProperties === false) {
          errors.push(`${path}.${key} is not allowed.`);
        } else if (rule.additionalProperties && typeof rule.additionalProperties === 'object') {
          visit(item, rule.additionalProperties, `${path}.${key}`);
        }
      }
    }
  }

  visit(value, schema, '$');
  return errors;
}
