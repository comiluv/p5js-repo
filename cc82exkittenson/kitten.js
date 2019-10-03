console.log("Kittens of the world, unite as one!");

const kittenpath = "kittens/";

const filenames = [
    "1.jpg",
    "2.jpg",
    "3.jpg",
    "4.jpg",
    "5.jpg",
];

let imgs = document.getElementsByTagName("img");

for (imgElt of imgs)
{
    let r = Math.floor(Math.random() * filenames.length);
    let file = kittenpath + filenames[r];
    let url = chrome.extension.getURL(file);
    imgElt.src = url;
    console.log(url);
}
