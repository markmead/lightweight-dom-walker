# Lightweight DOM Walker

Find and replace differences between new and old HTML.

## Example

```html
<head>
  <!-- Call in DOM Walker through a CDN -->
  <script src="./dist/domwalker.min.js"></script>
</head>

<body>
  <div id="firstExample">
    <h2>Non Reactive Element</h2>

    <h3 data-reactive="title">Reactive Element</h3>

    <ul data-reactive="list"></ul>
  </div>

  <!-- This won't change as it's not being targeted -->
  <p data-reactive="title">Reactive Element Outside Target</p>

  <div id="secondExample">
    <h3 data-reactive="title">Reactive Element</h3>

    <ul data-reactive="list">
      <li>Point 1</li>
    </ul>
  </div>
</body>
```

```js
document
  .getElementById("fakeButtonForFirstExample")
  .addEventListener("click", function () {
    new DOMWalker("#firstExample", "/first-example");
  });

document
  .getElementById("fakeButtonForSecondExample")
  .addEventListener("click", function () {
    new DOMWalker("#secondExample", "/second-example");
  });
```

On click of `#fakeButtonForFirstExample` there will be a `GET` request sent to `/first-example` which in this example returns the following HTML:

```html
<p data-reactive="title">Different</p>

<ul data-reactive="list">
  <li>Point 1</li>
  <li>Point 2</li>
  <li>Point 3</li>
</ul>
```

This will then walk the returned HTML and look for `data-reactive` elements and connect them based on the attribute value to other `data-reactive` elements in the current DOM, but only within the target element.

It's important to note the first parameter of `new DOMWalker`, in this example `#firstExample`. This is the target element on the page that wraps the content you want compared with the new HTML from the `GET` request. It will **only replace HTML of matching elements within the target**.

The same process applies to `#fakeButtonForSecondExample`.
