const ConvertImage = (val) => {
  if (val) {
    const hotname = "http://localhost:3000/";
    // const hotname = "https://node-love-us.onrender.com/";
    // const hotname = "https://api-love-us.herokuapp.com/";
    return hotname + val;
  } else {
    return "https://i.pinimg.com/474x/ec/e2/b0/ece2b0f541d47e4078aef33ffd22777e.jpg";
  }
};

export default ConvertImage;
