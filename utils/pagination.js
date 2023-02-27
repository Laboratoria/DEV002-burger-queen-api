
// Create a helper function buildLink to build the URL of the link
function buildLink(host, path, limit, page) {
  // host: It is the domain name of the server where the application is running
  // path: it is the relative path to which the resources are being requested
  // limit: It is the maximum number of elements thatll be displayed on each page
  // page: It is the page number that is being requested
  return `http://${host}/${path}?limit=${limit}&page=${page}`;
}

module.exports.buildLinks = (host, path, limit, page, totalPages) => {
  const link = {
    // The 'first' property points to the first page of the collection.
    // `http://${host}/${path}?limit=${limit}&page=1`,
    first: buildLink(host, path, limit, 1),
    // The 'last' property points to the last page of the collection
    // `http://${host}/${path}?limit=${limit}&page=${totalPages}`
    last: buildLink(host, path, limit, totalPages),
  };

  // We add 'prev' and 'next' properties if the current page isnt
  // the first or the last page in the collection
  if (page > 1) {
    // `http://${host}/${path}?limit=${limit}&page=${page - 1}`
    link.prev = buildLink(host, path, limit, page - 1);
  }

  if (page < totalPages) {
    // `http://${host}/${path}?limit=${limit}&page=${page + 1}`
    link.next = buildLink(host, path, limit, page + 1);
  }

  return link;
};

/*
const link = buildLinks({
  host: 'localhost:3000',
  path: 'products',
  limit: 10,
  page: 2,
  totalPages: 5,
});

{
  first: 'http://localhost:3000/products?limit=10&page=1',
  last: 'http://localhost:3000/products?limit=10&page=5',
  prev: 'http://localhost:3000/products?limit=10&page=1',
  next: 'http://localhost:3000/products?limit=10&page=3'
}

First es un enlace a la primera página, last es un enlace
a la última página, prev es un enlace a la página anterior y next
es un enlace a la siguiente página.
*/

// limit: number of items per page
// page: page number requested by the user
