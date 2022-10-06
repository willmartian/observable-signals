import { effect, signal } from "@preact/signals-core";
import { Signal } from "@preact/signals-core";
import { BehaviorSubject, OperatorFunction } from "rxjs";

/**
 * converts a Preact Signal into a BehaviorSubject
 * @param signal a Preact Signal of type T
 * @returns a BehaviorSubject of type T
 */
export const fromSignal = <T>(signal: Signal<T>): BehaviorSubject<T> => {
    const bs = new BehaviorSubject(signal.value);
    effect(() => bs.next(signal.value));
    return bs;
}

/**
 * converts a BehaviorSubject into a Preact Signal
 * @param bs a BehaviorSubject of type T
 * @returns a Preact Signal of type T
 */
export const toSignal = <T>(bs: BehaviorSubject<T>): Signal<T> => {
    const _signal = signal(bs.getValue());
    bs.subscribe(value => _signal.value = value);
    return _signal;
}

/**
 * Modifies a Preact Signal by any number of RxJS pipeable operators
 * @param _signal the source Preact Signal
 * @param operations RxJS pipeable operator functions
 * @returns a new Preact Signal
 */
export const pipeSignal = <T>(_signal: Signal<T>, ...operations: OperatorFunction<any, any>[]): Signal<T> => {
    const bs = fromSignal(_signal);
    const retSignal = signal<any>(undefined);

    // TODO: `Observable.pipe` has a complicated type signature. 
    // @ts-ignore
    bs.pipe(...operations).subscribe(value => retSignal.value = value);
    return retSignal;
}
