// https://www.youtube.com/watch?v=E4RyStef-gY

let widthORheight;

function setup()
{
    createCanvas(windowWidth, windowHeight);
    widthORheight = width < height ? width : height;
    angleMode(DEGREES);
}

let date = new Date();
let ms = date.getMilliseconds();
let sc = date.getSeconds() + ms / 1000;
let mn = date.getMinutes() + sc / 60;
let hr = date.getHours() + mn / 60;

function draw()
{
    background(0, 255);
    date = new Date();
    ms = date.getMilliseconds();
    sc = date.getSeconds() + ms / 1000;
    mn = date.getMinutes() + sc / 60;
    hr = date.getHours() + mn / 60;
    push();
    translate(0.5 * width, 0.5 * height);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(widthORheight / 10);
    const digital = [
        [nf(hour(), 2), color(100, 150, 255)],
        [nf(minute(), 2), color(150, 255, 100)],
        [nf(second(), 2), color(255, 100, 150)]
    ];
    noStroke();
    drawText(-widthORheight / 10, 0, digital);

    // text(hr + ":" + mn + ":" + sc, 0, 0);
    rotate(-90);
    strokeWeight(16);
    noFill();
    stroke(255, 100, 150, 255);
    const end1 = map(sc, 0, 60, 0, 360);
    arc(0, 0, 0.8 * widthORheight, 0.8 * widthORheight, 0, end1);

    stroke(150, 255, 100, 255);
    const end2 = map(mn, 0, 60, 0, 360);
    arc(0, 0, 0.7 * widthORheight, 0.7 * widthORheight, 0, end2);

    stroke(100, 150, 255, 255);
    const end3 = map(hr % 12, 0, 12, 0, 360);
    arc(0, 0, 0.6 * widthORheight, 0.6 * widthORheight, 0, end3);
    pop();
}

function drawText(x, y, text_array)
{
    let pos_x = x;
    for (let i = 0; i < text_array.length; i++)
    {
        let part = text_array[i];
        let t = part[0];
        let c = part[1];
        let w = textWidth(t);
        fill(c);
        text(t, pos_x, y);
        pos_x += w;
    }
}