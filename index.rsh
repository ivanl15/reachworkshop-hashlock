'reach 0.1';
'use strict';

export const main = Reach.App(
  { deployMode: 'firstMsg' },
  [Participant('Alice', { amt : UInt,
               pass: UInt,
               seeOutcome: Fun([], Null) }),
   Participant('Bob', { getPass: Fun([], UInt),seeOutcome: Fun([], Null) }) ],
  (Alice, Bob) => {
    Alice.only(() => {
      const _pass = interact.pass;
      const [ amt, passDigest ] =
            declassify([ interact.amt,
                         digest(_pass) ]); });
    Alice.publish(passDigest, amt)
      .pay(amt);
    commit();

    unknowable(Bob, Alice(_pass));
    Bob.only(() => {
      const pass = declassify(interact.getPass());
      assume( passDigest == digest(pass) ); });
    Bob.publish(pass);
    //require( passDigest == digest(pass) );
    transfer(amt).to(Bob);
    commit();
    each([Alice,Bob], () => {
      interact.seeOutcome();
    });

    exit(); } );
