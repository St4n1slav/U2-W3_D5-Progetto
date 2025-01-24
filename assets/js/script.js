const baseUrl = "https://striveschool-api.herokuapp.com/api/product/";
//const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNmE5ZGI3NDcwMTAwMTU4YjJiOGQiLCJpYXQiOjE3Mzc3MTQzMzMsImV4cCI6MTczODkyMzkzM30.4sBMWQsysJTfD95j4Y65OvT_iKJ2pQmXzJsyJa1laAk";

const card = `<div id="%id" class="card col-4 text-center" style="width: 18rem">
          <img src="%url" alt="imgProdotto" />
          <h5 class="card-title">%brand</h5>
          <h5 class="card-title">%name</h5>
          <p class="card-text">%description</p>
          <p class="card-text">%price</p>
          <a href="#" onclick="editCompilato('%id')" class="btn btn-primary mb-1">Modifica</a>
          <a href="./ditails.html" class="btn btn-warning mb-1">Dettagli</a>
        </div>`;

let listaProducts = [];

function popHtml() {
  document.getElementById("products").innerHTML = "";
  listaProducts.forEach((element) => {
    document.getElementById("products").innerHTML += card
      .replace("%id", element.id)
      .replace("%url", element.imageUrl)
      .replace("%brand", element.brand)
      .replace("%name", element.name)
      .replace("%description", element.description)
      .replace("%price", element.price);
  });
}

let dettagliTemporanei = null;

function popDitails(productId) {
  let prodotto = listaProducts.filter((e) => (e.id = productId))[0];
  dettagliTemporanei = prodotto;
  window.location.href = "./ditails.html";
}

let prodottoTemporaneo = null;

function editCompilato(productId) {
  let prodotto = listaProducts.filter((e) => (e.id = productId))[0];
  prodottoTemporaneo = prodotto;
  window.location.href = "./editoffice.html";
}

function onEditOffice() {
  let id = document.getElementById("productId");
  let name = document.getElementById("name");
  let brand = document.getElementById("brand");
  let description = document.getElementById("description");
  let url = document.getElementById("url");
  let price = document.getElementById("price");

  let prodotto = prodottoTemporaneo;

  id.value = prodotto.id;
  name.value = prodotto.name;
  brand.value = prodotto.brand;
  description.value = prodotto.description;
  url.value = prodotto.url;
  price.value = prodotto.price;
}

function getProducts() {
  fetch(baseUrl, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNmE5ZGI3NDcwMTAwMTU4YjJiOGQiLCJpYXQiOjE3Mzc3MTQzMzMsImV4cCI6MTczODkyMzkzM30.4sBMWQsysJTfD95j4Y65OvT_iKJ2pQmXzJsyJa1laAk",
    },
    method: "GET",
  })
    .then((result) => {
      return result.json();
    })
    .then((result) => {
      listaProducts = result;
      popHtml();
    })
    .catch((r) => console.log(r));
}

function addProduct(prodotto) {
  fetch(baseUrl, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNmE5ZGI3NDcwMTAwMTU4YjJiOGQiLCJpYXQiOjE3Mzc3MTQzMzMsImV4cCI6MTczODkyMzkzM30.4sBMWQsysJTfD95j4Y65OvT_iKJ2pQmXzJsyJa1laAk",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(prodotto),
  })
    .then((r) => getProducts())
    .catch((r) => console.log(r));
}

function editProduct(prodotto) {
  fetch(baseUrl + "/" + prodotto.id, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNmE5ZGI3NDcwMTAwMTU4YjJiOGQiLCJpYXQiOjE3Mzc3MTQzMzMsImV4cCI6MTczODkyMzkzM30.4sBMWQsysJTfD95j4Y65OvT_iKJ2pQmXzJsyJa1laAk",
    },
    method: "PUT",
    body: JSON.stringify(prodotto),
  })
    .then((r) => getProducts())
    .catch((r) => console.log(r));
}

function updateProduct() {
  let id = document.getElementById("productId");
  let name = document.getElementById("name");
  let brand = document.getElementById("brand");
  let description = document.getElementById("description");
  let url = document.getElementById("url");
  let price = document.getElementById("price");

  const newProduct = {
    id: id.value,
    imageUrl: url.value,
    brand: brand.value,
    name: name.value,
    description: description.value,
    price: +price.value,
  };
  editProduct(newProduct);
}

function deleteProduct(productId) {
  fetch(baseUrl + "/" + productId, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNmE5ZGI3NDcwMTAwMTU4YjJiOGQiLCJpYXQiOjE3Mzc3MTQzMzMsImV4cCI6MTczODkyMzkzM30.4sBMWQsysJTfD95j4Y65OvT_iKJ2pQmXzJsyJa1laAk",
    },
    method: "DELETE",
  })
    .then((r) => getProducts())
    .catch((r) => console.log(r));
}

function deleteById() {
  let productToDelet = document.getElementById("productId");
  deleteProduct(productToDelet.value);
}

function createProduct() {
  let name = document.getElementById("name");
  let brand = document.getElementById("brand");
  let description = document.getElementById("description");
  let url = document.getElementById("url");
  let price = document.getElementById("price");

  const newProduct = {
    imageUrl: url.value,
    brand: brand.value,
    name: name.value,
    description: description.value,
    price: +price.value,
  };
  addProduct(newProduct);
}

function confirmReset(event) {
  event.preventDefault();

  const userConfirmed = confirm("Premendo 'Si' tutti i dati verranno persi.");

  if (userConfirmed) {
    event.target.form.reset();
  } else {
    return false;
  }
}

function confirmDelete(event) {
  event.preventDefault();

  const userConfirmed = confirm("Premendo 'Si' tutti i dati verranno eliminati.");

  if (userConfirmed) {
    event.target.form.submit();
  } else {
    return false;
  }
}

getProducts();
/* addProduct({
  imageUrl: "https://beautyzon.it/cdn/shop/products/VITALC-HYDRATING-ANTIAGING-SERUM_600x600_crop_center.jpg?v=1736783757",
  brand: "brand3",
  name: "name3",
  description: "lorem",
  price: 9.99,
});
 */

document.addEventListener("DOMContentLoaded", getProducts, false);
