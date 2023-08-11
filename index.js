const { printSchemaWithDirectives, mapSchema, MapperKind } = require('@graphql-tools/utils');
const { buildASTSchema } = require('graphql/utilities')
const gql = require('graphql-tag');
const  assert = require('node:assert');

const typeDefs = gql`
  type Query {
    
    test1: String
    
    """ already documented """
    test2: String
  }
`;

let schema = buildASTSchema( typeDefs );

schema = mapSchema(schema, {
            [MapperKind.FIELD]: (fieldConfig) => {
                console.log(`Field '${fieldConfig.astNode.name.value}': description=${fieldConfig.description}, astNode.description=${fieldConfig.astNode.description?.value}`);
                if (!fieldConfig.description) {
                    fieldConfig.description = 'transformed';
                } else {
                    fieldConfig.description += 'transformed';
                }
            },
        });

schemaStr = printSchemaWithDirectives(schema);

console.log("\nFinal schema:");
console.log(schemaStr);

assert.strictEqual(schemaStr, 
`schema {
  query: Query
}

type Query {
  """transformed"""
  test1: String
  """ already documented transformed"""
  test2: String
}`, "Final schema is NOT correct")

console.log("\nFinal schema is correct");