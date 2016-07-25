'use strict';

function cmp(schema, oldVal, newVal) {
  return (
    typeof schema !== 'object' || schema === null || oldVal === null || newVal === null || oldVal === undefined || newVal === undefined?
      oldVal === newVal
      :
      Array.isArray(schema)?
        oldVal.length === newVal.length && (
          typeof schema[0] !== 'object'?
            oldVal.reduce(function (acc, cur, idx) {
              return acc && cur === newVal[idx];
            }, true)
            :
            oldVal.reduce(function (acc, cur, idx) {
              return acc && cmp(schema[0], cur, newVal[idx]);
            }, true)
        )
        :
        Object.keys(schema).reduce(function (acc, key) {
          return acc && (
            typeof schema[key] !== 'object' || schema[key] === null?
              oldVal.hasOwnProperty(key) &&
              newVal.hasOwnProperty(key) &&
              oldVal[key] === newVal[key]
              :
              cmp(schema[key], oldVal[key], newVal[key])
          );
        }, true)
  );
}

module.exports = cmp;
