import { Guid } from 'guid-typescript';

import Interval from './Interval';

class Rule {

  id: string;

  type: 'unique | daily | weekly';

  interval: Interval;

}

export default Rule;
