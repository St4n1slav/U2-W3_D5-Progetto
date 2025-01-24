const baseUrl = "https://striveschool-api.herokuapp.com/api/product/";
//const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNmE5ZGI3NDcwMTAwMTU4YjJiOGQiLCJpYXQiOjE3Mzc3MTQzMzMsImV4cCI6MTczODkyMzkzM30.4sBMWQsysJTfD95j4Y65OvT_iKJ2pQmXzJsyJa1laAk";

const card = `<div id="%id" class="card col-4 text-center" style="width: 18rem">
          <img src="%url" alt="bookCover01" />
          <h5 class="card-title">%brand</h5>
          <h5 class="card-title">%name</h5>
          <p class="card-text">%description</p>
          <p class="card-text">%price</p>
          <a href="#" onclick="addToCard('card01')" class="btn btn-primary mb-1">Compra Ora</a>
          <a href="#" onclick="scart('card01')" class="btn btn-primary">Scart</a>
        </div>`;

const listaProducts = [];

function popHtml() {
  document.getElementById("card").innerHTML = "";
  listaProducts.forEach((element) => {
    document.getElementById("card").innerHTML += card
      .replace("%id", element.id)
      .replace("%url", element.imageUrl)
      .replace("%brand", element.brand)
      .replace("%name", element.name)
      .replace("%description", element.description)
      .replace("%price", element.price);
  });
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

function deleteProduct(prodotto) {
  fetch(baseUrl + "/" + prodotto.id, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNmE5ZGI3NDcwMTAwMTU4YjJiOGQiLCJpYXQiOjE3Mzc3MTQzMzMsImV4cCI6MTczODkyMzkzM30.4sBMWQsysJTfD95j4Y65OvT_iKJ2pQmXzJsyJa1laAk",
    },
    method: "DELETE",
    body: JSON.stringify(prodotto),
  })
    .then((r) => getProducts())
    .catch((r) => console.log(r));
}

function createProduct() {
  let form = document.getElementById("appointment-form");
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

getProducts();
/* addProduct({
  imageUrl: "https://beautyzon.it/cdn/shop/products/VITALC-HYDRATING-ANTIAGING-SERUM_600x600_crop_center.jpg?v=1736783757",
  brand: "brand3",
  name: "name3",
  description: "lorem",
  price: 9.99,
});
 */
