const express = require('express');
const router = express.Router();
const {
  getSalaries,
  createSalary,
  updateSalary,
  deleteEarning,
  deleteDeduction,
  resetSalaries,
} = require('../controller/salaryController');

router.get('/posts', getSalaries);
router.post('/posts', createSalary);
router.put('/posts/:id', updateSalary);
router.delete('/posts/:salaryId/earning/:earningId', deleteEarning);
router.delete('/posts/:salaryId/deduction/:deductionId', deleteDeduction);
router.delete('/reset', resetSalaries);

module.exports = router;
