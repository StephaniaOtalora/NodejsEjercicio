var http = require("http");
var fs = require("fs");
var axios = require("axios");
var url = require("url");

const jcli =
  "https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json";
const jprov =
  "https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json";
const urlProveedores = new URL("http://localhost:8081/api/proveedores");
const urlClientes = new URL("http://localhost:8081/api/clientes");

console.log(urlProveedores);
console.log(urlClientes);

http
  .createServer(function (req, res) {
    if (req.url === urlProveedores.pathname) {
      let tabla =
        '<table class="table table-striped"><thead> <tr> <th scope="col">ID</th> <th scope="col">NOMBRE</th> <th scope="col">CONTACTO</th> </tr> </thead> <tbody>';
      let info = "";

      fs.readFile("./proveedores.html", (error, datos) => {
        axios.get(jprov).then((response) => {
          response.data.forEach((element) => {
            tabla =
              tabla +
              '<tr><th scope="row">' +
              element.idproveedor +
              "</th><td>" +
              element.nombrecompania +
              "</td><td>" +
              element.nombrecontacto +
              "</td></tr>";
          });
          tabla = tabla + "</tbody> </table>";

          info = datos.toString();
          info = info.replace("{{LISTADOPROVEEDORES}}", tabla);

          res.write(info);
          res.end();
        });
      });

    } else if (req.url === urlClientes.pathname) {
      let tabla =
        '<table class="table table-striped"><thead> <tr> <th scope="col">ID</th> <th scope="col">NOMBRE</th> <th scope="col">CONTACTO</th> </tr> </thead> <tbody>';
      let info = "";
      
      fs.readFile("./clientes.html", (error, datos) => {
        axios.get(jcli).then((response) => {
          console.log("clientes");
          response.data.forEach((element) => {
            tabla =
              tabla +
              '<tr><th scope="row">' +
              element.idCliente +
              "</th><td>" +
              element.NombreCompania +
              "</td><td>" +
              element.NombreContacto +
              "</td></tr>";
          });
          tabla = tabla + "</tbody> </table>";

          info = datos.toString();
          info = info.replace("{{LISTADOCLIENTES}}", tabla);

          res.write(info);
          res.end();
        });
      });
    }
  })
  .listen(8081);
