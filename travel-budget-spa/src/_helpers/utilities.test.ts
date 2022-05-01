import * as utilitiesMock from '../_mocks/utilities';
import * as utilities from './utilities';

test('calculates day difference between two dates', () => {
    const date1 = new Date('2022-04-30');
    const date2 = new Date('2022-05-02');
    const dayDifference = utilities.getDayDifference(date1, date2);
    expect(dayDifference).toBe(2);

    const dayDifferenceSameDate = utilities.getDayDifference(date1, date1);
    expect(dayDifferenceSameDate).toBe(0);

    const dayDifferenceNegative = utilities.getDayDifference(date2, date1);
    expect(dayDifferenceNegative).toBe(-2);
});

test('calculates account balance', () => {
    const accountBalance = utilities.getAccountBalance(utilitiesMock.transactionsMockAccountBalance50);
    expect(accountBalance).toBe(50);

    const accountBalanceZero = utilities.getAccountBalance([]);
    expect(accountBalanceZero).toBe(0);

    const accountBalanceNegativeFifty = utilities.getAccountBalance(utilitiesMock.transactionsMockAccountBalanceNegative50);
    expect(accountBalanceNegativeFifty).toBe(-50);

    const accountBalanceWithFuelExpences = utilities.getAccountBalance(utilitiesMock.transactionsMockAccountBalanceWithFuelExpence50);
    expect(accountBalanceWithFuelExpences).toBe(700);
});

test('calculates daily budget', () => {
    const dailyBudget = utilities.getDailyBudget(utilitiesMock.transactionsMockDailyBudget250, utilitiesMock.budgetPeriodDailyBudgetFourDaysTwoDaysLeft);
    expect(dailyBudget).toBe(250);
});

test('calculates todays balance', () => {
    const dailyBudget = utilities.getDailyBudget(utilitiesMock.transactionsMockTodaysBalance150, utilitiesMock.budgetPeriodDailyBudgetFourDaysTwoDaysLeft);
    const todaysBalance = utilities.getTodaysBalance(utilitiesMock.transactionsMockTodaysBalance150, dailyBudget);
    expect(todaysBalance).toBe(150);
});