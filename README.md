# graphqlToolsUtils-printSchemaWithDirectives-reproducer

Reproducer for issue [#5508](https://github.com/ardatan/graphql-tools/issues/5508) in `@graphql-tools/utils` project's `printSchemaWithDirectives` method.

Problem is that existing schema descriptions (for fields, objects etc.) modified over schema transformation (eg. using `mapSchema`) are not printed correctly by `printSchemaWithDirectives` as it prefers descriptions from `astNode` instead from schema config object itself. But `astNode` is immutable in transformation, only schema config object can be changed.


## Requires
* yarn
* Node.js 18+

## How to run the reproducer
```
yarn install
yarn start
```

Prints info with final schema to console, `assert` is implemented to check correct final schema.

In final schema, `field2` has to have `already documented transformed` description, not `already documented` from source schema.