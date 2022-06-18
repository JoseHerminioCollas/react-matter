import { BehaviorSubject } from 'rxjs';

const strm$ = new BehaviorSubject([0, 0]);
export { strm$ };

const matterMotor = {
    emit: ( id: number, coords: number[]) => {
        strm$.next(coords)
    },
    listen: (cb: any) => {
        strm$.subscribe(coords => {
            cb(coords)
        })
    }
 }

export default matterMotor;
