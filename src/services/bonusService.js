
export function calculateBonus(betterSalary, entryDate, dateCalculation) {

  // Valido los datos ingresados
  if (!betterSalary || betterSalary <= 0) {
    throw new Error('El sueldo a ingresar debe ser mayor a 0');
  }

  // Valido que las fechas sean validas
  if (!(entryDate instanceof Date) || isNaN(entryDate)) {
    throw new Error('La fecha de ingreso no es válida, intente nuevamente.');
  }

  if (!(dateCalculation instanceof Date) || isNaN(dateCalculation)) {
    throw new Error('La fecha de cálculo no es válida, intente nuevamente.');
  }

  if (entryDate > dateCalculation) {
    throw new Error('La fecha de ingreso no debe ser mayor a la fecha de cálculo, intente nuevamente.');
  }

  // Determino si se trata del primer o segundo semestre
  const monthCalculation = dateCalculation.getMonth();
  const yearCalculation = dateCalculation.getFullYear();

  let startSemester;
  let endSemester;

  if (monthCalculation < 6) {
    startSemester = new Date(yearCalculation, 0, 1);
    endSemester = new Date(yearCalculation, 5, 30);

  } else {
    startSemester = new Date(yearCalculation, 6, 1);
    endSemester = new Date(yearCalculation, 11, 31);
  }


  // Calculo la fecha exacta de inicio, le efectiva
  const effectiveStartDate = entryDate > startSemester ? entryDate : startSemester;


  // Calculo el tiempo trabajado
  const timeWorked = calculateTimeWorked(effectiveStartDate, dateCalculation);

  // Ahora calculo el aguinaldo
  const monthsOfSemester = 6;

  const monthsWorkedDecimal = timeWorked.months + (timeWorked.days / 30);
  const proportion = monthsWorkedDecimal / monthsOfSemester;

  const bonusAmount = (betterSalary / 12) * monthsWorkedDecimal;

  // Retornamos el resultado
  return {
    betterSalary: betterSalary,
    entryDate: entryDate,
    dateCalculation: dateCalculation,

    semester: monthCalculation < 6 ? 1 : 2,
    startSemester: startSemester,
    endSemester: endSemester,

    effectiveStartDate: effectiveStartDate,
    monthsWorked: timeWorked.months,
    daysWorked: timeWorked.days,
    monthsWorkedDecimal: parseFloat(monthsWorkedDecimal.toFixed(2)),

    proportion: parseFloat((proportion * 100).toFixed(2)),
    bonusAmount: parseFloat(bonusAmount.toFixed(2)),

    fullSemesterWork: monthsWorkedDecimal >= monthsOfSemester
  }
}

// Calculamos el tiempo trabajado entre dos fechas retornando meses completos y dias adicionales
function calculateTimeWorked(startDate, endDate) {

  let start = new Date(startDate);
  let end = new Date(endDate);

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    months--;
    const previousMonth = new Date(end.getFullYear(), end.getMonth(), 0);
    days += previousMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const totalMonths = (years * 12) + months;

  return {
    months: totalMonths,
    days: days
  }

}