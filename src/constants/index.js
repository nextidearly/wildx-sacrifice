export const EXPLORER_URL = {
  8453: "https://basescan.org/",
  84531: "https://georli.basescan.org/",
};

export const getSortOptions = () => {
  return [
    {
      label: "Hot",
      value: "hot",
    },
    {
      label: "APR",
      value: "apr",
    },
    {
      label: "Multiplier",
      value: "multiplier",
    },
    {
      label: "Earned",
      value: "earned",
    },
    {
      label: "Liquidity",
      value: "liquidity",
    },
    {
      label: "Deposit fee",
      value: "depositFee",
    },
  ];
};

export const DesktopColumnSchema = [
  {
    id: 1,
    name: "farm",
    sortable: true,
    label: "",
  },
  {
    id: 2,
    name: "apr",
    sortable: true,
    label: "APR",
  },
  {
    id: 3,
    name: "liquidity",
    sortable: true,
    label: "Liquidity",
  },
  {
    id: 4,
    name: "earned",
    sortable: true,
    label: "Earned",
  },
  {
    id: 5,
    name: "multiplier",
    sortable: true,
    label: "Multiplier",
  },
  {
    id: 6,
    name: "details",
    sortable: true,
    label: "",
  },
];
export const MobileColumnSchema = [
  {
    id: 1,
    name: "farm",
    sortable: true,
    label: "",
  },
  {
    id: 2,
    name: "earned",
    sortable: true,
    label: "Earned",
  },
  {
    id: 3,
    name: "apr",
    sortable: true,
    label: "APR",
  },
  {
    id: 6,
    name: "details",
    sortable: true,
    label: "",
  },
];
