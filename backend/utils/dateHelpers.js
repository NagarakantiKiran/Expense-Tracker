// Date range helpers for filtering
function getWeekRange(date = new Date()) {
  const startOfWeek = new Date(date);
  const day = startOfWeek.getDay();
  const diff = startOfWeek.getDate() - day;
  startOfWeek.setDate(diff);
  startOfWeek.setHours(0, 0, 0, 0);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);
  return { startDate: startOfWeek, endDate: endOfWeek };
}

function getMonthRange(date = new Date()) {
  const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  endOfMonth.setHours(23, 59, 59, 999);
  return { startDate: startOfMonth, endDate: endOfMonth };
}

function getYearRange(date = new Date()) {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const endOfYear = new Date(date.getFullYear(), 11, 31);
  endOfYear.setHours(23, 59, 59, 999);
  return { startDate: startOfYear, endDate: endOfYear };
}

module.exports = { getWeekRange, getMonthRange, getYearRange };
