import { BehaviorSubject, interval } from 'rxjs';
import { throttle } from 'rxjs/operators';

const strm$ = new BehaviorSubject([{
  id: 100, x: 20, y: 20, with: 20, height: 20,
}]);
export { strm$ };

const matterMotor = {
  emit: (bodies: any) => {
    strm$.next(bodies);
  },
  listen: (cb: any) => {
    strm$
      .pipe(throttle(() => interval(10)))
      .subscribe((coords) => {
        cb(coords);
      });
  },
};

export default matterMotor;
