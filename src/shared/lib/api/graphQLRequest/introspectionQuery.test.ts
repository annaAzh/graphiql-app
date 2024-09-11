import { describe, expect, it } from 'vitest';
import INTROSPECTION_QUERY from './IntrospectionQuery';

describe('INTROSPECTION_QUERY', () => {
  it('should match the expected query structure', () => {
    const expectedStructure = {
      query: 'query IntrospectionQuery {',
      fragmentFullType: 'fragment FullType on __Type {',
      fragmentInputValue: 'fragment InputValue on __InputValue {',
      fragmentTypeRef: 'fragment TypeRef on __Type {',
    };

    expect(INTROSPECTION_QUERY).toContain(expectedStructure.query);
    expect(INTROSPECTION_QUERY).toContain(expectedStructure.fragmentFullType);
    expect(INTROSPECTION_QUERY).toContain(expectedStructure.fragmentInputValue);
    expect(INTROSPECTION_QUERY).toContain(expectedStructure.fragmentTypeRef);
  });

  it('should not be empty', () => {
    expect(INTROSPECTION_QUERY.trim()).not.toBe('');
  });

  it('should include all required fragments and fields', () => {
    const requiredFragments = [
      'fragment FullType on __Type',
      'fragment InputValue on __InputValue',
      'fragment TypeRef on __Type',
    ];

    requiredFragments.forEach((fragment) => {
      expect(INTROSPECTION_QUERY).toContain(fragment);
    });
  });
});
