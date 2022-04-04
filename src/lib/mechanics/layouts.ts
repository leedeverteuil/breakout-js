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
      "________",
      "________",
      "________",
      "___11___",
    ]
  },
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
      "__3333__",
      "__1221__",
      "________",
    ],
  },
];

export type { Layout };
export { layouts };
