import { BigNumber } from "@ethersproject/bignumber";
import { EvmPriceServiceConnection, PriceFeed } from "@pythnetwork/pyth-evm-js";
import { tokens } from "../constants";
import { useEffect, useState } from "react";

export const useSubPythPrices = (): [
  Record<string, BigNumber>,
  Record<string, BigNumber>
] => {
  const [previousPriceFeed, setPreviousPriceFeed] = useState<
    Record<string, BigNumber>
  >({});
  const [priceFeed, setPriceFeed] = useState<Record<string, BigNumber>>({});

  useEffect(() => {
    const connection = new EvmPriceServiceConnection(
      "https://xc-mainnet.pyth.network"
    );

    connection.subscribePriceFeedUpdates(
      tokens.map((t) => t.priceId),
      (feed) => {
        const tokenName = tokens.find(
          (t) => t.priceId.toLowerCase() === "0x".concat(feed.id)
        )!.name;

        const previous = previousPriceFeed[tokenName];
        const current = parsePriceToIPythPrice(feed);

        if (!previous || previous.isZero()) {
          // to save price first time loaded
          setPreviousPriceFeed((cur) => {
            return {
              ...cur,
              [tokenName]: current,
            };
          });
        }

        setPriceFeed((cur) => {
          return {
            ...cur,
            [tokenName]: current,
          };
        });
      }
    );

    return () => {
      connection.closeWebSocket();
    };
    // eslint-disable-next-line
  }, []);

  return [priceFeed, previousPriceFeed];
};

const parsePriceToIPythPrice = (priceFeed: PriceFeed): BigNumber => {
  const _price = priceFeed.getPriceUnchecked();

  const price = BigNumber.from(_price.price);
  const expoToE30 = BigNumber.from(10).pow(30 + _price.expo);

  return price.mul(expoToE30);
};
