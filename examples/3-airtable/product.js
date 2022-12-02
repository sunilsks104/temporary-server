const result = document.querySelector('.result');

const fetchProduct = async () => {
  result.innerHTML = `<h4>Hello</h4>`;
  try {
    const id = window.location.search;
    const {
      data: { fields },
    } = await axios.get(`/api/3-product${id}`);
    console.log(fields);
    const { name, description, price, image } = fields;
    console.log({ name, description, price, image });
    const url = image[0].url;
    console.log(url);
    result.innerHTML = `<h1 class="title">${name}</h1>
    <article class="product">
      <img class="product-img"
      src="${url}"
      alt="${name}"
      />
      <div class="product-info">
        <h5 class="title">${name}</h5>
        <h5 class="price">$${price}</h5>
        <p class="desc">${description}</p>
      </div>
    </article>`;
  } catch (error) {
    result.innerHTML = `<h2>${error.response.data}</h2>`;
  }
};

fetchProduct();
