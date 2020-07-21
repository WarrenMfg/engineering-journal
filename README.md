# Engineering Journal

**Consolidate and organize bookmarks from browsers and scattered links collected in reading lists, note apps, docs, and spreadsheets.**

***

# utils.js

`DOMPurify` [🔗](https://github.com/WarrenMfg/engineering-journal/blob/18aac9fbbeb39851adb7de0f7244c6143f07d48f/client/assets/js/utils.js#L2)
- Object
- Configures allowed tags from user input

`API_URL` [🔗](https://github.com/WarrenMfg/engineering-journal/blob/18aac9fbbeb39851adb7de0f7244c6143f07d48f/client/assets/js/utils.js#L5)
- String
- Sets the origin for the [API](https://github.com/WarrenMfg/engineering-journal-api)

`timeoutID` [🔗](https://github.com/WarrenMfg/engineering-journal/blob/18aac9fbbeb39851adb7de0f7244c6143f07d48f/client/assets/js/utils.js#L8)
- Integer
- Timeout ID for [error feedback dropdown](https://github.com/WarrenMfg/engineering-journal/blob/18aac9fbbeb39851adb7de0f7244c6143f07d48f/client/topic.html#L57)

`handleErrors` [🔗](https://github.com/WarrenMfg/engineering-journal/blob/18aac9fbbeb39851adb7de0f7244c6143f07d48f/client/assets/js/utils.js#L10)
- Function
- Provides error feedback to users
- Params: feedback: string
- Returns: undefined (side effects only)

`populateDropdownMenu` [🔗](https://github.com/WarrenMfg/engineering-journal/blob/18aac9fbbeb39851adb7de0f7244c6143f07d48f/client/assets/js/utils.js#L55)
- Function
- Add topics (namespaces) to navigation dropdown menu
- Params: namespaces: string[], collection: string
- Returns: namespaces: string[]

`populateEditTopic` [🔗](https://github.com/WarrenMfg/engineering-journal/blob/18aac9fbbeb39851adb7de0f7244c6143f07d48f/client/assets/js/utils.js#L97)
- Function
- Add topcs (namespaces) to edit modal's select element
- Params: sortedNamespaces: string[], collection: string
- Returns: undefined (side effects only)

`validateResourceInputs` [🔗](https://github.com/WarrenMfg/engineering-journal/blob/18aac9fbbeb39851adb7de0f7244c6143f07d48f/client/assets/js/utils.js#L114)
- Function
- Validates user inputs for a new resource
- Params: description: string, keywords: string, link: string
- Invokes: [handleErrors](https://github.com/WarrenMfg/engineering-journal/blob/18aac9fbbeb39851adb7de0f7244c6143f07d48f/client/assets/js/utils.js#L10) if invalid inputs
- Returns: object of valid user inputs, with property `createdAt: Date.now()`

`validateSearchInputs` [🔗](https://github.com/WarrenMfg/engineering-journal/blob/18aac9fbbeb39851adb7de0f7244c6143f07d48f/client/assets/js/utils.js#L151)
- Function
- Validates user input for search modal
- Params: search: string, site: string
- Invokes: [handleErrors](https://github.com/WarrenMfg/engineering-journal/blob/18aac9fbbeb39851adb7de0f7244c6143f07d48f/client/assets/js/utils.js#L10) if invalid inputs
- Returns: object with valid user inputs

`getHost` [🔗](https://github.com/WarrenMfg/engineering-journal/blob/18aac9fbbeb39851adb7de0f7244c6143f07d48f/client/assets/js/utils.js#L173)
- Function
- Splits resource link to find domain/host before inserting into DOM
- Params: link: string
- Returns: domain/host

`tableRow` [🔗](https://github.com/WarrenMfg/engineering-journal/blob/18aac9fbbeb39851adb7de0f7244c6143f07d48f/client/assets/js/utils.js#L185)
- Function
- Creates a table row for the resources table
- Params: className: string, createdAt: integer, description: string, keywords: string[], link: string, _id: ObjectId
- Returns: HTML string

`unfreezeBody` [🔗](https://github.com/WarrenMfg/engineering-journal/blob/18aac9fbbeb39851adb7de0f7244c6143f07d48f/client/assets/js/utils.js#L195)
- Function
- Unfreezes body element when closing a modal
- Params: none
- Returns: undefined (side effects only)

`filterTableRows` [🔗](https://github.com/WarrenMfg/engineering-journal/blob/18aac9fbbeb39851adb7de0f7244c6143f07d48f/client/assets/js/utils.js#L214)
- Function
- Filter function invoked when typing stops in filter input; or when filtered, and adding a new resource; or when filtered, and making an edit to a resource
- Params: input event
- Returns: undefined (side effects only)

# search.js

`searchModal` [🔗](https://github.com/WarrenMfg/engineering-journal/blob/784a7214d5eac5e528dc1bc18c8ab4de703e9613/client/assets/js/search.js#L1)
- Function
- Decorates [search modal](https://github.com/WarrenMfg/engineering-journal/blob/784a7214d5eac5e528dc1bc18c8ab4de703e9613/client/topic.html#L142) with event listeners
- Invoked in: [onload.js IIFE](https://github.com/WarrenMfg/engineering-journal/blob/784a7214d5eac5e528dc1bc18c8ab4de703e9613/client/assets/js/onload.js#L90)

# onload.js

`$.ajax` [🔗](https://github.com/WarrenMfg/engineering-journal/blob/9765c3f4bb2fb11af5fe907bfef647d11d31e341/client/assets/js/onload.js#L10)
- GET request invoked when loading a topic page
- Populates table with the topic's corresonding resources (see below)

`appendToTable` [🔗](https://github.com/WarrenMfg/engineering-journal/blob/9765c3f4bb2fb11af5fe907bfef647d11d31e341/client/assets/js/onload.js#L39)
- Function
- Appends resources to table body
- Params: resources: array of objects
- Returns: undefined (side effects only)

`prependToTable` [🔗](https://github.com/WarrenMfg/engineering-journal/blob/9765c3f4bb2fb11af5fe907bfef647d11d31e341/client/assets/js/onload.js#L73)
- Function
- Prepends pinned resources to table body
- Params: tbody: HTML element, pinOrder: array of pins, pins: array of objects (pinned resources)
- Returns: undefined (side effects only)

`editModal` [🔗](https://github.com/WarrenMfg/engineering-journal/blob/9765c3f4bb2fb11af5fe907bfef647d11d31e341/client/assets/js/onload.js#L96)
- Event listeners
- Close modal event listeners: keydown, mousedown, click
- Delete resource event listener: click

`table` [🔗](https://github.com/WarrenMfg/engineering-journal/blob/9765c3f4bb2fb11af5fe907bfef647d11d31e341/client/assets/js/onload.js#L138)
- Event listeners
- Show edit modal delegated event listener: click
- Pin and unpin resources event listener: click
  - PUT request to pin
  - PUT request to unpin

`#error-feedback` [🔗](https://github.com/WarrenMfg/engineering-journal/blob/9765c3f4bb2fb11af5fe907bfef647d11d31e341/client/assets/js/onload.js#L274)
- Event listener
- Toggles [error feedback](https://github.com/WarrenMfg/engineering-journal/blob/9765c3f4bb2fb11af5fe907bfef647d11d31e341/client/topic.html#L57) display to none

`debounce` [🔗](https://github.com/WarrenMfg/engineering-journal/blob/9765c3f4bb2fb11af5fe907bfef647d11d31e341/client/assets/js/onload.js#L285)
- Function
- To delay filter [filterTableRows](https://github.com/WarrenMfg/engineering-journal/blob/9765c3f4bb2fb11af5fe907bfef647d11d31e341/client/assets/js/utils.js#L214) until typing stops
- Params: func: filterTableRows function, delay: integer in milliseconds
- Returns: anonymous function to be invoked by input event when filtering

# addResource.js

`addResource` [🔗](https://github.com/WarrenMfg/engineering-journal/blob/9f8a82d8183e38c19eff33a6903ea88d3199a2d2/client/assets/js/addResource.js#L1)
- Function
- Adds a new resource to the current topic
- Params: click event
- Returns: undefined (side effects only)
- POST request to add new resource
  - Invokes: [handleErrors](https://github.com/WarrenMfg/engineering-journal/blob/9f8a82d8183e38c19eff33a6903ea88d3199a2d2/client/assets/js/utils.js#L10) if errors, otherwise [prependToTable](https://github.com/WarrenMfg/engineering-journal/blob/9f8a82d8183e38c19eff33a6903ea88d3199a2d2/client/assets/js/addResource.js#L62) (see below)

`prependToTable` [🔗](https://github.com/WarrenMfg/engineering-journal/blob/9f8a82d8183e38c19eff33a6903ea88d3199a2d2/client/assets/js/addResource.js#L62)
- Function
- Prepends new resource to table body but after pinned items, if any
- Invoked by: POST request from [addResource](https://github.com/WarrenMfg/engineering-journal/blob/9f8a82d8183e38c19eff33a6903ea88d3199a2d2/client/assets/js/addResource.js#L35)
- Params: resource object
- Returns: undefined (side effects only)

`filterInputValue` [🔗](https://github.com/WarrenMfg/engineering-journal/blob/9f8a82d8183e38c19eff33a6903ea88d3199a2d2/client/assets/js/addResource.js#L99)
- String
- User input from filter input element
- If a user input exists while adding a new resource, [filterTableRows](https://github.com/WarrenMfg/engineering-journal/blob/9f8a82d8183e38c19eff33a6903ea88d3199a2d2/client/assets/js/utils.js#L214) is invoked

***

**Note**: See the [Engineering Journal API](https://github.com/WarrenMfg/engineering-journal-api) repo to integrate.

## Roadmap

- Consolidate this Engineering Journal repo and the Engineering Journal API repo into single repo
- Add OAuth
- Update codebase with documenation
- Convert to React single-page application

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

- [Dr. Ian Carnaghan](https://www.carnaghan.com/)
