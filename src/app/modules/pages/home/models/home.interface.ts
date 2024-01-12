export interface IndicatorsInterface {
  title: string;
  value: string;
  percent: string;
  count: string;
  interestRate: boolean;
}

export interface MarketIndexInterface {
  dateReceived: string;
  eventDate: string;
  eventTime: number;
  faInsName: string;
  flow: number;
  id: number;
  indexChanges: number;
  insKey: string;
  instrumentId: string;
  lastIndexValue: number;
  percentVariation: number;
  tmcCode: number;
}
