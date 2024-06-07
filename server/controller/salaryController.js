import Salary from '../model/Salary';

export async function getSalaries(req, res) {
  try {
    const salaries = await Salary.find();
    res.json({ success: true, existingPosts: salaries });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function createSalary(req, res) {
  const { basicSalary, earnings, deductions } = req.body;

  try {
    const newSalary = new Salary({
      basicSalary,
      earnings,
      deductions,
    });

    await newSalary.save();
    res.json({ success: true, message: 'Salary added successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function updateSalary(req, res) {
  const { id } = req.params;
  const { basicSalary, earnings, deductions } = req.body;

  try {
    const updatedSalary = await Salary.findByIdAndUpdate(
      id,
      { basicSalary, earnings, deductions },
      { new: true }
    );
    res.json({ success: true, message: 'Salary updated successfully', updatedSalary });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function deleteEarning(req, res) {
  const { salaryId, earningId } = req.params;

  try {
    const salary = await Salary.findById(salaryId);
    salary.earnings.id(earningId).remove();
    await salary.save();
    res.json({ success: true, message: 'Earning deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function deleteDeduction(req, res) {
  const { salaryId, deductionId } = req.params;

  try {
    const salary = await Salary.findById(salaryId);
    salary.deductions.id(deductionId).remove();
    await salary.save();
    res.json({ success: true, message: 'Deduction deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

export async function resetSalaries(req, res) {
  try {
    await Salary.deleteMany({});
    res.json({ success: true, message: 'Salaries reset successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}
