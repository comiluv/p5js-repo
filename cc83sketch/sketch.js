console.log("sketch blah");
let s = function (sketch)
{
    sketch.setup = function ()
    {
        console.log("Sketch started!");
        document.body.style['userSelect'] = 'none';
        let h = document.body.clientHeight;
        const c = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
        c.position(0, 0);
        c.style('pointer-events', 'none');
        sketch.clear();
    };

    sketch.draw = function ()
    {
        sketch.stroke(0);
        sketch.strokeWeight(4);
        if (sketch.mouseIsPressed)
        {
            sketch.line(sketch.mouseX, sketch.mouseY, sketch.pmouseX, sketch.pmouseY);
        }
    };
};
let myp5 = new p5(s);
