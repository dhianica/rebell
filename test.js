import lodash from 'lodash'

const obj = {
  foo: {
    bar: {
      baz: [
        {
          bax: 'a'
        }
      ]
    }
  },
  cok: {
    cik : ['a']
  }
};
console.log(lodash.get(obj, ['foo.bar.baz[0].bax', 'cok']))

const object = { 'c': [{ 'python': { 'java': 3 } }]};

// Use of _.get method
console.log(lodash.get(object, ['c', '0', 'python', 'java']));
