const myCustomLabels = {
  docs: "results",
  page: "currentPage",
};

const info = (paginateResults) => {
  const {
    limit,
    currentPage,
    nextPage,
    prevPage,
    hasPrevPage,
    hasNextPage,
    totalPages,
  } = paginateResults;

  return {
    limit,
    currentPage,
    nextPage,
    prevPage,
    hasPrevPage,
    hasNextPage,
    totalPages,
  };
};

const getQuery = (req) => {
  let { limit = 10 } = req.query;

  if (limit < 0 || limit > 10) {
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
    select: "-password",
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
