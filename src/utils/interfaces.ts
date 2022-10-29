export interface Event {
  _id: number;
  title: string;
  date: string;
  duration: string;
  type: string;
  location: string;
  coordinates: object;
  description: string;
  logo: string;
  guests: object[];
  organizers: object[];
  creator: string;
}

export interface EventHeader {
  _id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  logo: string;
}

export interface EventHeaders {
  headers: EventHeader[];
}

export interface Events {
  data: Event[];
  isLoading: boolean;
  error: boolean | unknown | string;
}
