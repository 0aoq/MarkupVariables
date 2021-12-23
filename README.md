# MarkupVariables

- Enter text in HTML elements that starts with "v!{" and ends with "}"
- These will be inside of a hidden element until they are declared with a JavaScript function
- After being declared, they will be replaced with the string that they were declared to be, and then will be visible

## Example Code

```js
// index.html:16

// create a new MarkupVariableHandler object
let markupVariableHandler = new MarkupVariableHandler()

markupVariableHandler.set({
    name: 'test_variable_name',
    value: 'Hello, world! This text no longer says: "v!{test_variable_name}"'
})
```