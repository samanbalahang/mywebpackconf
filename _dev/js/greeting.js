function sayHello(){
    let website = 'TOSINSO';
    alert(`Hello Webpack! This is from ${website}. I'm watching you!`);
    console.log("This message added for debugging!");
   }
// module.exports = sayHello;
export { sayHello };