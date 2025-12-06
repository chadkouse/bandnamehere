export type EventInfo = {
  id: string;
  eventName: string;
  eventDesc?: string;
  date: string;
  hour?: string;
  eventLink?: string;
  price?: string;
  place?: string;
};

export type ModalData = {
  date: Date;
  events: EventInfo[];
};

export type MonthInfo = {
  startDate: Date;
  events: EventInfo[];
};
