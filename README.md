# Engineering Journal

Consolidate and organize bookmarks from browsers and links collected in reading lists, note apps, docs, and spreadsheets.

***

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

# deleteResource.js

`deleteResource` [🔗](https://github.com/WarrenMfg/engineering-journal/blob/7c07a5d94f20ead2972552359d80f77a79027279/client/assets/js/deleteResource.js#L1)
- Function
- Deletes a resource
- Params: click event
- Returns: undefined (side effects only)
- DELETE request to delete resource
  - Invokes: [handleErrors](https://github.com/WarrenMfg/engineering-journal/blob/9f8a82d8183e38c19eff33a6903ea88d3199a2d2/client/assets/js/utils.js#L10) if errors, otherwise [removeRow](https://github.com/WarrenMfg/engineering-journal/blob/7c07a5d94f20ead2972552359d80f77a79027279/client/assets/js/deleteResource.js#L41) (see below)

`removeRow` [🔗](https://github.com/WarrenMfg/engineering-journal/blob/7c07a5d94f20ead2972552359d80f77a79027279/client/assets/js/deleteResource.js#L41)
- Function
- Removes a table row after deleting a resource
- Params: id: string
- Returns: undefined (side effects only)

# editResource.js

`editResource` [🔗](https://github.com/WarrenMfg/engineering-journal/blob/7ff1684fe3e383bd15c731fad80a7b3fcdb24266/client/assets/js/editResource.js#L1)
- Function
- Edits a resource
- Invoked by: [form submission](https://github.com/WarrenMfg/engineering-journal/blob/7ff1684fe3e383bd15c731fad80a7b3fcdb24266/client/topic.html#L123)
- Params: submit event
- Returns: undefined (side effects only)
- PUT request to edit resource
  - Invokes: [handleErrors](https://github.com/WarrenMfg/engineering-journal/blob/9f8a82d8183e38c19eff33a6903ea88d3199a2d2/client/assets/js/utils.js#L10) if errors, otherwise [updateRow](https://github.com/WarrenMfg/engineering-journal/blob/7ff1684fe3e383bd15c731fad80a7b3fcdb24266/client/assets/js/editResource.js#L69) (see below)

`updateRow` [🔗](https://github.com/WarrenMfg/engineering-journal/blob/7ff1684fe3e383bd15c731fad80a7b3fcdb24266/client/assets/js/editResource.js#L69)
- Function
- Updates a table row after editing a resource
- Params: id: string, resource: object
- If a user input exists while adding a new resource, [filterTableRows](https://github.com/WarrenMfg/engineering-journal/blob/9f8a82d8183e38c19eff33a6903ea88d3199a2d2/client/assets/js/utils.js#L214) is invoked
- Returns: undefined (side effects only)

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

# search.js

`searchModal` [🔗](https://github.com/WarrenMfg/engineering-journal/blob/c6c5e54a5f9c896e716e7bf2a94e9f227cb9599c/client/assets/js/search.js#L1)
- Function
- Decorates [search modal](https://github.com/WarrenMfg/engineering-journal/blob/784a7214d5eac5e528dc1bc18c8ab4de703e9613/client/topic.html#L142) with event listeners
  - Open search modal: click
  - Close search modal: keydown, mousedown, click
  - Cancel search modal: click
  - Search user input: click (opens search result in new tab)
- Params: none
- Returns: undefined (side effects only)

# topicCollection.js

`IFFE` [🔗](https://github.com/WarrenMfg/engineering-journal/blob/dd5940a049524fec7b474a84581ae355a5c8c5a1/client/assets/js/topicCollection.js#L1)
- Immediately Invoked Function Expression
- Queries localStorage for topic name and updates `title`, `meta`, and `h1` elements

# topics.js

`IIFE` [🔗](https://github.com/WarrenMfg/engineering-journal/blob/65bd397577919044e0cf8adb0130a37f2337c96b/client/assets/js/topics.js#L1)
- Immediately Invoked Function Expression
- Decorates mulitple DOM elements with event listeners

`Add a Topic` [🔗](https://github.com/WarrenMfg/engineering-journal/blob/5125b9d1aa18ffc52ac80c5ef31dcb82672c755e/client/assets/js/topics.js#L2)

- Dropdown menu: click to set topic name in localStorage, if click on custom topic link
- Display input to add topic: click
- Topic input: blur and keydown (to submit new topic name)
  - POST request to add new topic
  - Invokes: [handleErrors](https://github.com/WarrenMfg/engineering-journal/blob/9f8a82d8183e38c19eff33a6903ea88d3199a2d2/client/assets/js/utils.js#L10) if errors, otherwise [populateDropdownMenu](https://github.com/WarrenMfg/engineering-journal/blob/65bd397577919044e0cf8adb0130a37f2337c96b/client/assets/js/utils.js#L55), and/or [populateEditTopic](https://github.com/WarrenMfg/engineering-journal/blob/65bd397577919044e0cf8adb0130a37f2337c96b/client/assets/js/utils.js#L97) depending if viewing `index.html`

`Delete a Topic` [🔗](https://github.com/WarrenMfg/engineering-journal/blob/5125b9d1aa18ffc52ac80c5ef31dcb82672c755e/client/assets/js/topics.js#L93)

- Click on delete button at bottom of page (of a custom page)
- DELETE request to delete custom topic
- Invokes: [handleErrors](https://github.com/WarrenMfg/engineering-journal/blob/9f8a82d8183e38c19eff33a6903ea88d3199a2d2/client/assets/js/utils.js#L10) if errors
- Redirects to `index.html`

`Update Topic Name` [🔗](https://github.com/WarrenMfg/engineering-journal/blob/5125b9d1aa18ffc52ac80c5ef31dcb82672c755e/client/assets/js/topics.js#L134)

- H1 is editable with `contenteditable` attribute
- Keydown event listener for Enter key, blurs the element
- On blur event listener
  - PUT request to update topic name
  - Invokes: [handleErrors](https://github.com/WarrenMfg/engineering-journal/blob/9f8a82d8183e38c19eff33a6903ea88d3199a2d2/client/assets/js/utils.js#L10) if errors, otherwise updates localStorage topic name and invokes [populateDropdownMenu](https://github.com/WarrenMfg/engineering-journal/blob/65bd397577919044e0cf8adb0130a37f2337c96b/client/assets/js/utils.js#L55) and [populateEditTopic](https://github.com/WarrenMfg/engineering-journal/blob/65bd397577919044e0cf8adb0130a37f2337c96b/client/assets/js/utils.js#L97)

# updatePassword.js

`#update-password` [🔗](https://github.com/WarrenMfg/engineering-journal/blob/acc2421fd03be93885a7c6959d9d1532f90c0f2f/client/assets/js/updatePassword.js#L1)
- Keydown event listener for Enter key
- Updates password
- Used for internal development purposes only

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

***

## Roadmap

- Consolidate this Engineering Journal repo and the [Engineering Journal API](https://github.com/WarrenMfg/engineering-journal-api) repo into single repo
- Add OAuth
- Update API codebase with documenation
- Convert to React single-page application

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

- [Dr. Ian Carnaghan](https://www.carnaghan.com/)
