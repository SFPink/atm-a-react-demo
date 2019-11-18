import React, { useContext } from 'react';
import { AtmContext } from 'context/Atm';
import { PersonContext } from 'context/Person';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet } from '@fortawesome/free-solid-svg-icons';

import './Wallet.scss';

export default function Wallet() {
  const { state: atmState } = useContext(AtmContext);
  const { getWalletTotal } = useContext(PersonContext);
  const total = getWalletTotal();

  let title = null;

  // A little worked around to get a number to work in a switch statement
  switch (true) {
    case total === 0:
      title = 'Wallet is empty!';
      break;
    case total >= 270:
      title = `Click here to go buy Pokemon!`;
      break;
    default:
      title = `Wallet currently has ${atmState.currency}${total}`;
      break;
  }

  return (
    <div
      className="wallet"
      title={title}
      onClick={() => {
        if (total >= 270)
          window.open(
            'https://www.currys.co.uk/gbuk/tv-and-home-entertainment/gaming/gaming-consoles/nintendo-switch-pokemon-sword-bundle-10201632-pdt.html?istCompanyId=bec25c7e-cbcd-460d-81d5-a25372d2e3d7&istFeedId=4d7eb93e-055f-499d-8ee5-1cdcc50d67d1&istItemId=iiiamqiim&istBid=tztx&srcid=198&cmpid=ppc~gg~0070%20(PLA)%20Nintendo%20-%20Pokemon~0070%20(PLA)%20Nintendo%20-%20Pokemon%20ad%20group~Exact&mctag=gg_goog_7904&kwid=GOOGLE&device=c&ds_kids=92700049580605450&tgtid=0070%20(PLA)%20Nintendo%20-%20Pokemon&&gclid=Cj0KCQiA2b7uBRDsARIsAEE9XpFWNeEzY9ySGabWrVsONEmGZ42ihn-CKVB5wWqZ7PBCniLAdp3nPg8aAmOlEALw_wcB&gclsrc=aw.ds',
            '_blank'
          );
      }}
    >
      <FontAwesomeIcon className={`${total >= 270 ? 'pulse' : ''}`} icon={faWallet} />
    </div>
  );
}
