import { g } from "@moeki0/gengen";

export const bignumSchema = g.block("bignum", {
  description: "人口: 100,000人",
  trigger:
    "死者数・期間・距離・人口など、数字そのものが規模や衝撃を物語るとき。最も印象的な統計を1〜3つ取り上げる。",
  schema: {
    items: g.list(1).all(g.split(/[:：]\s*/, g.str("label"), g.str("value"))),
  },
});
