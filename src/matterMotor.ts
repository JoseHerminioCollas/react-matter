import { BehaviorSubject, interval } from 'rxjs';
import { throttle } from 'rxjs/operators';

const strm$ = new BehaviorSubject([0, 0]);
export { strm$ };

const matterMotor = {
  emit: (id: number, coords: number[]) => {
    strm$.next(coords)
  },
  listen: (cb: any) => {
    strm$
      .pipe(throttle(val => interval(500)))
      .subscribe(coords => {
        cb(coords)
      })
  }
}

export default matterMotor;
