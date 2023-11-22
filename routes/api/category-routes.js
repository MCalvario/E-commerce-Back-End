const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
    try {
      const categoryData = await Category.findAll({
        include: [{ model: Product }],
      });
      res.status(200).json(categoryData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await category.findbyPk(req.params.id, {
      include: [{ model: Product }],
      where: { id: req.params.id },
    });
    if(!categoryData) {
    res.status(404).json({ message: 'Does not exist'});
    return;
    }
    res.json.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {id: req.params.id },
  })
  .then((updatedCategory) => {
    if (!updatedCategory[0]) {
      res.status(404).json({ message: 'Does not exist'});
      return;
  }
  res.json({message: 'Success!'});
})
.catch((err) => {
  console.log(err);
  res.status(500).json(err);
});
});
router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: { id: req.params.id },
  })
  .then((deletedCategory) => {
    if(!deletedCategory) {
      res
      .status(404)
      .json({ message: 'Does not exists' });
      return;
    }
    res.json({message: 'success!'});
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
