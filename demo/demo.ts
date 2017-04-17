import { reducer, epic, store } from '../src/index';

class T1{
    @reducer("r1")
    r1() { console.log("r1") }
    @epic("e1")
    e1() { console.log("e1") }
}

class T2{
    @reducer("r2")
    r2() {
        console.log("r1");
    }
    @epic("e2")
    e2() {
        console.log("e2");
    }
}

const a = store();

