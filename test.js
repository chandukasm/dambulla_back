function nmbr(n) {
  var x;
  while (n > 0) {
    x = n % 10;
    console.log(Math.ceil(n % 10));
    n = Math.ceil(n / 10);
  }
}

nmbr(23456);

//   var n = strArr[0];
//   var k = strArr[1];

//   //   for (let index = 0; index < n.length; index++) {
//   //   for (let j = 0; j < n.length; j++) {
//   //         const element = array[index];

//   //   }

//   //   }

//   for (let index = 0; index < n.length; index++) {
//     const element = n[index];
//     console.log(element);
//   }
