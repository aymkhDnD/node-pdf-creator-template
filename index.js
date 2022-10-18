const pdf = require("pdf-creator-node");
const fs = require("fs");


// READING TEMPLATE (HTML)
const html = fs.readFileSync("./templates/index.html", "utf8");

// CUSTOM OPTION
const header_LANDSCAPE = `
  <table id="custom-header">
    <tr>
      <td> 
        <img src="https://www.referenseo.com/wp-content/uploads/2019/03/image-attractive-960x540.jpg" alt="logo" id="image-header">
      </td>
      <td>header_LANDSCAPE</td>
      <td>page{{page}} / {{pages}}</td>
    </tr>
  </table>
`;
const header_PORTRAIT = `
  <table id="custom-header">
  <tr>
    <td> 
      <img src="https://www.referenseo.com/wp-content/uploads/2019/03/image-attractive-960x540.jpg" alt="logo" id="image-header">
    </td>
    <td>header_PORTRAIT</td>
    <td>page{{page}} / {{pages}}</td>
  </tr>
  </table>
`;
const footer_CONTENT = `
    <div id="custom-footer">
    <table>
      <tr>
        <td><span></span></td>
        <td>{{page}}</td>
        <td><span></span></td>
      </tr>
    </table>
    </div>
`;
const orientation = "portrait";
const format = "A4";

// DOCUMENT OPTIONS
const options = {
  format: format,
  orientation: orientation,
  border: '1cm',
  header: {
    height: "25mm",
    contents: (orientation === 'portrait') ? header_PORTRAIT : header_LANDSCAPE,
  },
  footer: {
    height: "18mm",
    contents: {
      default: footer_CONTENT, // fallback value
    }
  }
};


// DATA TO RENDER (COULD BE SUBMITTED USING A FORM)
const footerContent = {
  phoneNumber: 12345678,
  email: 'dnd@gmail.com',
  companyName: "DnD SERV",
  signature: "Ceci est une signature personnalisée"
}

const filename = Date.now();
const document = {
  html: html,
  data: {
    footerContent
  },
  path: `./output/${filename}.pdf`,
  type: ""
};


// EXECUTION
pdf
  .create(document, options)
  .then((res) => {
    console.log(res);
  })
  .catch((error) => {
    console.error(error);
  });