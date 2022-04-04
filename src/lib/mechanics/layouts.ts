type Layout = {
  rows: Array<string>;
};

/*
key:
  _ air
  # unbreakable
  1 blue brick
  2 yellow brick
  3 red brick
*/

const layouts: Array<Layout> = [
  {
    rows: [
      "________",
      "_121121_",
      "_112211_",
      "_211112_",
    ]
  },
  {
    rows: [
      "________",
      "_#1331#_",
      "__1331__",
      "__#11#__",
      "__2222__",
      "__1221__",
      "________",
    ],
  },
  {
    rows: [
      "23_##_32",
      "32_##_23",
      "32_##_23",
      "21_##_12",
      "11_##_11",
      "12_##_21",
      "12_##_21",
    ],
  },
  {
    rows: [
      "________",
      "23####32",
      "12233221",
      "#12__21#",
      "1#1__1#1",
      "11#__#11",
      "________",
    ],
  },
  {
    rows: [
      "________",
      "11111111",
      "11111111",
      "11111111",
      "111#_#11",
      "222#_#22",
      "333#_#33",
      "333#_#33",
      "####_###",
      "________",
    ],
  },
];

export type { Layout };
export { layouts };
