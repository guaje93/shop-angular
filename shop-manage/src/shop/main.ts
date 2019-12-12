import { log } from "util";

let a: number;
let b: boolean;
let c: string;
let d: any;
let e: number[];
let f: any [] = [1, true, 'a', false]

const ColorRed = 0
interface Point {
x:number
y:number
draw: () => void
}

 let drawPoint = (point: {Point}) => {

 }

 class Point2 {
constructor(private x: number, private y?:number){this.x = x, this.y = y};
get X() {return this.x};
draw  = () => {
console.log(this.x+this.y);


}


 }

 let point = new Point2(1,2);
 point.draw();