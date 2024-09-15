import { RestfulType } from './restful';

interface HistoryGraphSave extends Omit<RestfulType, 'method'> {
  method: 'GRAPHQL';
}

type HistorySave = RestfulType | HistoryGraphSave;

type BodyUrlType = Pick<RestfulType, 'body' | 'variables'>;

export { type HistorySave, type HistoryGraphSave, type BodyUrlType };
