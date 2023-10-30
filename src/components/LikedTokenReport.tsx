import { BigNumber } from "ethers";

export const LikedTokenReport = ({
  likedTokens,
  tokenPrices,
}: {
  likedTokens: string[];
  tokenPrices: Record<string, BigNumber>;
}) => {
  console.log("render report");

  const winner = likedTokens.reduce<string>((winner, token) => {
    if (winner === "X") return token;
    const _price0 = tokenPrices[winner];
    const _price1 = tokenPrices[token];
    if (!_price0 || !_price1) return winner;
    return _price0.gt(_price1) ? winner : token;
  }, "X");

  const loser = likedTokens.reduce<string>((loser, token) => {
    if (loser === "X") return token;
    const _price0 = tokenPrices[loser];
    const _price1 = tokenPrices[token];
    if (!_price0 || !_price1) return loser;
    return _price0.lt(_price1) ? loser : token;
  }, "X");

  return (
    <div style={{ display: "flex" }}>
      <div style={{ fontWeight: "bold" }}>
        HIGHEST Price liked TOKEN: {winner}
      </div>
      <div style={{ margin: "0 4rem" }}>||||||||</div>
      <div style={{ fontWeight: "bold" }}>
        LOWEST Price liked TOKEN: {loser}
      </div>
    </div>
  );
};
