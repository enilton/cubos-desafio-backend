import Interval from './Interval';

class Rule {
  id: string;

  type: 'unique' | 'daily' | 'weekly';

  date: string;

  intervals: Interval[];

  days: number[];
}

export default Rule;
