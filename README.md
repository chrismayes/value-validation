# value-validation
A simple javascript/ES6 value validation tool

[NPM](https://www.npmjs.com/package/value-validation)

```shell
	$ npm install value-validation --save
```

## Example

```javascript
	import valueValidation from "value-validation";
	const validated = valueValidation(["required","maxLength(256)","isEmail"], "testing.email@test-domain.tst");
	console.log(validated);
```