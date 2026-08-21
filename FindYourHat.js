const prompt = require('prompt-sync')({sigint: true}); //เอามาจาก codeacedemy

const hat = "🎩";
const hole = "💥";
const path = "░";
const character = "🐈";

// class Game ห่อฟังชั่นของเกมไว้
class Game {
    constructor(field, startX, startY) {
        this.field = field;
        this.x = startX;
        this.y = startY;
    }


// method .log แผนที่
printField(){
    console.clear(); //ล้างหน้าจอ log
    console.log(this.field.map((row)=>row.join("")).join("\n"));
}

// ทำ method การเดิน
moveDown(){
    this.field[this.y][this.x] = path;
    this.y = this.y + 1;
}
moveUp(){
    this.field[this.y][this.x] = path;
    this.y = this.y - 1;
}
moveLeft(){
    this.field[this.y][this.x] = path;
    this.x = this.x - 1;
}
moveRight(){
    this.field[this.y][this.x] = path;
    this.x = this.x + 1;
}

//ทำ method เงื่อนไขเกม
play(){
    let playing = true;

    while(playing) {
        this.printField(); //สั่งlog แผนที่

        // input ทิศทางเดิน
        const direction = prompt(
            "Input key to move (W=UP, S=DOWN, A=LEFT D=RIGHT)"
        ).toUpperCase(); //ใส่ฟังชั่นแปลงเป็นตัวพิมพ์ใหญ่

//เริ่มทำ key ปุ่ม input
    if(direction === "W"){
        this.moveUp();
    } else if(direction === "S"){
        this.moveDown();
    } else if(direction === "A"){
        this.moveLeft();
    } else if(direction === "D"){
        this.moveRight();
    } else {
        console.log("wrong input");
    }

// เงื่อนไขเกม
        if(
            this.y < 0 || this.y >= this.field.length || 
            this.x < 0 || this.x >= this.field[0].length
        ) {
                console.log("🚫 You went out of bounds! Game over."); // เดินตกขอบ gameover
                playing = false;
                break;
            } else if (this.field[this.y][this.x] === hole){
                console.log("💀 You fell into a hole! Game over."); // ตกหลุม gameover
                playing = false;
                break;
            } else if (this.field[this.y][this.x] === hat){
                console.log("🎉 You found the hat! You win!"); // ชนะเกมจบ
                playing = false;
                break;
            }

            this.field[this.y][this.x] = character; // update ตำแหน่งผู้เล่น
        }
    }

// เขียนการสุ่มแผนที่ Random ได้ทั้ง holes, hat and actor
// ใช้ static method เพื่อฝึกการใช้งาน จริงๆสามารถเขียน function เฉยๆได้
    static generateField(height, width, percentage){
        const newField = [];

        // สร้างmapที่เป็น path เปล่า
        for (let y = 0; y < height; y++){
            const row = [];
            for (let x = 0; x < width; x++){
                row.push(path);
            }
            newField.push(row);
        }

        //สุ่มจุดเกิด
        const startY = Math.floor(Math.random()*height);
        const startX = Math.floor(Math.random()*width);
        newField[startY][startX] = character;

        //สุ่มหลุม
        const holeCount = Math.floor(height*width*percentage);
        for(let i = 0; i<holeCount; i++){
        let randomY = Math.floor(Math.random()*height);
        let randomX = Math.floor(Math.random()*width);

        //เช็คว่าarrayนั้นว่างไหมจะได้ไม่สุ่มทับ
            if (newField[randomY][randomX] === path){
                newField[randomY][randomX] = hole;
            } else {
                i--; //ถ้าสุ่มทับให้ลด i แล้วลูปใหม่
            }
        }

        //สุ่มจุดเกิดHat
        let hatSpot = false;
        while(!hatSpot){
        let randomY = Math.floor(Math.random()*height);
        let randomX = Math.floor(Math.random()*width);

            if (newField[randomY][randomX] === path){
                newField[randomY][randomX] = hat;
                hatSpot = true;
            }
        }
        return { field: newField, startX, startY };
    }
}

//เรียกใช้งานส่วนต่างๆเพื่อเล่นเกม

const {field, startX, startY} = Game.generateField(10, 10, 0.1); //เรียกใช้ method generateField เพื่อสร้างmap หลุม 20%
const playGame = new Game(field, startX, startY);
playGame.play(); //เรียกใช้ method play



    // ลอง log แผนที่
    // const Mymap1 = [
    //     [character, path, path],
    // ];
    //     const Mymap2 = [
    //     [path, hole, path],
    // ];
    //     const Mymap3 = [
    //     [path, hat, path],
    // ];
    // console.log(`${Mymap1}\n${Mymap2}\n${Mymap3}`);
