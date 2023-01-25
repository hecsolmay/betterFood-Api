// TODO: implementar sistema de roles

const getOrders = async (req, res) => {
  res.json({ message: "Get Orders" });
};

const getOrder = async (req, res) => {
  const id = req.params;
  res.json({ message: `Get Order ${id}` });
};

const updateOrder = async (req, res) => {
  const id = req.params;
  const updateElements = req.body;
  res.json({
    message: `Update Order ${id} con los elementos ${updateElements}`,
  });
};

const deleteOrder = async (req, res) => {
  const id = req.params;
  res.json({ message: `Delete Order ${id}` });
};

const postOrder = async (req, res) => {
  res.json({ message: `Creating a new Order` });
};

module.exports = {
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
  postOrder,
};
