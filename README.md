# Observable Signals

Expiremental interop between RxJS Observables and Preact Signals

## Why?

Preact Signals seem very similar to RxJS Observables, specifically BehaviorSubject, which is an Observable that has a current value.

I am not quite sure about the advantages of using Preact Signals over Observables (are there any?), but in the name of expirementation here are some small utilities for interop. 

## `pipeSignal`

Creates a new Preact Signal by applying RxJS pipeable operators to an existing Preact Signal.

```ts
import { effect, signal } from "@preact/signals-core";
import { pipeSignal } from "observable-signals"

const counter = signal(0);

const doubleCounter = pipeSignal(counter, 
    map(val => val*2)
)

effect(() => console.log(counter.value, doubleCounter.value))

// Write to a signal
counter.value = 1;
counter.value = 2;
counter.value = 3;

/**
 * Output:
 * 
 * 0 0
 * 1 2
 * 2 4
 * 3 6
 */
```

## `fromSignal`

Creates a new BehaviorSubject from a Preact Signal.

## `toSignal`

Creates a new Preact Signal from a BehaviorSubject.