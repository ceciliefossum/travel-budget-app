import * as utilitiesMock from '../_mocks/utilities';
import * as utilities from './utilities';



test('calculates day difference between two dates', () => {
    const date1 = new Date('2022-04-30');
    const date2 = new Date('2022-05-02');
    const dayDifference = utilities.getDayDifference(date1, date2);
    expect(dayDifference).toBe(2);
});


test('calculates account balance', () => {
    const accountBalance = utilities.getAccountBalance(utilitiesMock.transactionsMock);
    expect(accountBalance).toBe(50);
});

test('calculates daily budget', () => {

});