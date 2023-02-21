

const myCustomLabels = {
  docs: "results",
  page: "currentPage",
  hasNextPage: "next",
  hasPrevPage: "prev",
  totalPages: "totalPages",
  totalDocs: "items",
};

const info = (paginateResults, path = "") => {
  let {
    limit,
    currentPage,
    nextPage,
    prevPage,
    next,
    prev,
    totalPages,
    items
  } = paginateResults;

  prevPage = prev ?  `${path}?page=${prevPage}` : null
  nextPage = next ?  `${path}?page=${nextPage}` : null

  return {
    limit,
    currentPage,
    nextPage,
    prevPage,
    next,
    prev,
    totalPages,
    items
  };
};

const getQuery = (req) => {
  let { limit = 10 } = req.query;

  if (limit < 0 || limit > 100) {
    limit = 10;
  }

  let { page = 1 } = req.query;
  if (page <= 0) {
    page = 1;
  }

  return { limit, page };
};

const getOptions = ({ limit, page, select = "", populate = "", sort = {} }) => {
  return {
    select: select,
    populate: populate,
    sort: sort,
    limit: limit,
    page: page,
    customLabels: myCustomLabels,
  };
};

module.exports = {
  success: (res, status = 200, message = "ok", info = {}, results = {}) => {
    return res.status(status).json({ message, info, results });
  },
  info,
  getQuery,
  getOptions,
};
